<template>
	<div class="forget">
		<div class="header">
			<div class="left-logo">
            	<img src="../assets/img/logo-m.png" alt="" />
            </div>
            <div class="logins" @click="goLogin">登录</div>
		</div>
		<div class="forget_pw">
			<div class="steps">
				<Steps :current="steps">
			        <Step content="账号信息"></Step>
			        <Step content="验证码信息"></Step>
			        <Step class="two" content="重置密码"></Step>
			        <Step class="three" content="完成"></Step>
			    </Steps>
			</div>

			<div class="steps_content">
				<div v-if="steps == 0">
					<Form @submit.native.prevent="" label-position="right" :label-width="110" :model="forget_step1" ref="formDataForget" :rules="formDataForget">
						<FormItem label="用户名" prop="name">
							<Input :clearable='true' size="large" placeholder="请输入用户名！" :maxlength="20" v-model="forget_step1.name"></Input>
						</FormItem>
						<Button type="primary" size="large" class="btn-prim" @click="nextStep">下一步</Button>
						<div class="noMyPhone" v-if="showmsg">这不是我的号码？</div>
					</Form>
				</div>
				<div v-if="steps == 1">
					<Form @submit.native.prevent="" label-position="right" :label-width="110" :model="forget_step2" ref="formDataForget2" :rules="formDataForget2">
						<FormItem label="手机号码" prop="desensitizedPhone">
							<Input :disabled="true" size="large" placeholder="请先获取手机号码！" :maxlength="11" v-model="forget_step2.desensitizedPhone"></Input>
						</FormItem>
						<FormItem label="验证码" prop="verificationCode">
							<Input class="codeImgInput" :clearable='true' size="large" placeholder="请输入验证码！" :maxlength="6" v-model="forget_step2.verificationCode"></Input>
							<Button :disabled="scendBol" type="primary" size='large' class="valicodeImg" @click="sendSmsVerificationCode">{{secend}}</Button>
						</FormItem>
						<Button type="primary" size="large" class="btn-prim" @click="nextStep2">下一步</Button>
						<div class="noMyPhone" v-if="showmsg" @click="showMsg">这不是我的手机号码？</div>
					</Form>
				</div>
				<div v-if="steps == 2">
					<Form @submit.native.prevent="" label-position="right" :label-width="110" :model="forget_step3" ref="formDataForget3" :rules="formDataForget3">
						<FormItem label="输入密码" prop="newPassword">
							<Input type="password" :clearable='true' size="large" placeholder="请输入新密码！" :maxlength="20" v-model="forget_step3.newPassword"></Input>
						</FormItem>
						<FormItem label="重复密码" prop="newPassword1">
							<Input type="password" :clearable='true' size="large" placeholder="请再次输入密码！" :maxlength="20" v-model="forget_step3.newPassword1"></Input>
						</FormItem>
						<Button type="primary" size="large" class="btn-prim" @click="nextStep3">下一步</Button>
					</Form>
				</div>
				<div v-if="steps == 3">
					<div class="success">
						<Icon type="md-checkmark" size="40" color="#219B50" />
						恭喜您，重新设置密码成功
					</div>
					<Button type="primary" size="large" class="btn-prim" @click="goLogin">返回登录</Button>
				</div>
			</div>
		</div>
		<div class="fixedBot">copyight 2018 成都聚盾网络科技有限公司 All rights reserved</div>

		<!--/* 全局加载样式  */-->
		<Spin fix v-if="loadingState">
			<Icon type="ios-loading" size='48' class="demo-spin-icon-load"></Icon>
			<div>加载中...</div>
		</Spin>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import store from '../store/index'
	import { mapState, mapMutations } from 'vuex'

	export default{
		data(){
			// 验证规则
			const cellPhone = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请输入手机号码！'));
	            } else if (!this.expReg.aa.test(value)) {
	                callback(new Error('手机号码格式不正确!'));
	            } else {
	                callback();
	            }
	        };
 	        // 密码 验证规则 
			const password = (rule, value, callback) => {
				if(!this.expReg.pw.test(value)) {
					callback(new Error('密码由8-16英文或数字组成!'));
				} else {
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value !== this.forget_step3.newPassword) {
					callback(new Error('两次密码不一致！'));
				} else {
					callback();
				}
			};
			return {
				steps:0,
				time:60,
				showmsg:false,
				secend:'发送短信',
				scendBol:false,
				forget_step1:{
					name:'',
				},
				forget_step2:{
					encodePhone:'',
					verificationCode:'',
					desensitizedPhone:'',
				},
				forget_step3:{
					newPassword:'',
					newPassword1:'',
				},
				formDataForget:{
					name:[{required:true,message:'请输入用户名！'}]
				},
				formDataForget2:{
					verificationCode:[{required:true,message:'请输入验证码！'}],
					desensitizedPhone:[{required:true,message:'请先获取手机号码！'}],
				},
				formDataForget3:{
					newPassword:[{required:true,message:'请输入新密码！',trigger: 'blur'},{validator:password,trigger: 'blur'}],
					newPassword1:[{required:true,message:'请再次输入新密码！',trigger: 'blur'},{validator:validatePassCheck,trigger: 'blur'}],
				}
			}
		},
		computed:{
			...mapState([
				'loadingState'
			])
		},
		methods:{
			goLogin(){
				this.$router.push('/login');
			},
			//第一步
			nextStep(){
				const _= this;
				_.$refs['formDataForget'].validate((valid) => {
					if (valid) {
						_.HttpAjax('post','findPhoneByName',{name:_.forget_step1.name},(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data.status == 200){
								_.forget_step2.desensitizedPhone =  res.data.data.desensitizedPhone;
								_.forget_step2.encodePhone =  res.data.data.encodePhone;

								this.steps += 1;
								_.showmsg = true;
							}
						});
					}
				});
			},
			//第二步
			nextStep2(){
				//this.steps += 1;
				const _= this;
				_.$refs['formDataForget2'].validate((valid) => {
				 	if (valid) {
				 		let data = {
				 			name:_.forget_step1.name,
				 			encodePhone:_.forget_step2.encodePhone,
				 			verificationCode:_.forget_step2.verificationCode,
				 		}
				 		_.HttpAjax('post','checkOutVerificationCode',data,(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data.status == 200){
								this.steps += 1;
							}
						});
				 	}
				});
			},
			//第三步
			nextStep3(){
				const _= this;
				_.$refs['formDataForget3'].validate((valid) => {
					if (valid) {
						let data = {
				 			name:_.forget_step1.name,
				 			encodePhone:_.forget_step2.encodePhone,
				 			verificationCode:_.forget_step2.verificationCode,
				 			newPassword:md5(_.forget_step3.newPassword)
				 		}
				 		_.HttpAjax('post','modifyPwdByVerificationCode',data,(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data.status == 200){
								this.steps += 1;
							}
						});
					}
				});
			},
			//获取验证码
			sendSmsVerificationCode(){
				const _= this;
				if(_.forget_step1.encodePhone != ''){
					let data = {
						name:_.forget_step1.name,
						encodePhone:_.forget_step2.encodePhone
					}
					_.HttpAjax('post','sendSmsVerificationCode',data,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res.data.status == 200){
							_.scendBol = true;
							let clearTime = setInterval(()=>{
								_.time --;
								if(_.time >= 0){
									_.secend = _.time+'s';
								}else{
									_.secend = '获取验证码';
									_.time = 60;
									_.scendBol = false;
									clearInterval(clearTime);
								}

							},1000);
						}
					});
				}else{
					_.$layer.msg('请先获取手机号码！');
				}
			},//显示错误手机号码时的提示
			showMsg(){
				this.$Modal.info({
					title:'提示信息',
					content:'更换手机号请联系管理员！'
				})
			}
		},
		created(){
			store.commit('UPDATE_LOADINGSTATE', false);
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	@import '../assets/css/pubVar.less';
	.forget{
		.header{
			height:60px;
			width: 100%;
			background-color: @bgc-header;
			display:flex;
			justify-content: space-between;
			.left-logo{
				display: flex;
				width: 170px;
    			height: 60px;
				justify-content: center;
				align-items: center;
				img{
					height: 33px;
				}
			}
			.logins{
				display: flex;
				font-size: 14px;
				color: #CBDFF5;
				align-items: center;
				margin-right: 40px;
				cursor: pointer;
			}
		}
		.fixedBot{
			display: flex;
			height: 60px;
			width: 100%;
			align-items: center;
			justify-content: center;
			position:fixed;
			bottom:0;
		}
		.forget_pw{
			.steps{
				width: 50%;
				margin:40px auto;
				.ivu-steps{
					display: flex;
					justify-content: center;
				}
			}
			.steps_content{
				width: 400px;
				margin:90px auto;
				.ivu-form-item-label {
					height: 36px;
					background-color: #f8f8f9;
					border: 1px solid #dcdee2;
					border-right: 0;
					border-radius: 4px 0 0 4px;
					text-align: center;
					font-size: 14px;
					color: #666;
				}
				.ivu-form-item-content{
					display: flex;
					justify-content: space-between;
				}
				.ivu-select-selection,
				.ivu-input {
					border-radius: 0px 4px 4px 0
				}
				.btn-prim{
					width:100%;
					margin-top: 20px;
					background-color: @bgc-header;
				}
				.valicodeImg{
					display: inline-block;
					height: 36px;
    				width: 86px;
    				border: 1px solid #dcdee2;
    				border-radius: 0 4px 4px 0;
    				text-align: center;
    				color: #fff;
    				background-color: @bgc-header;
    				cursor: pointer;
    				font-size: 12px;
				}
				.ivu-btn.valicodeImg[disabled]{
					color: #c5c8ce;
				    background-color: #f7f7f7;
				    border-color: #dcdee2;
				}
				.codeImgInput{
					width:200px;
					.ivu-input{
						border-radius: 0;
					}
				}
				.success{
					font-size: 20px;
					color: #000;
					text-align: center;
					height:100px;
					font-weight: bold;
				}
				.noMyPhone{
					cursor: pointer;
					text-align: right;
					line-height:2.5;
					font-size: 14px;
					color: @bgc-header;
				}
			}
		}

		.ivu-steps .ivu-steps-head-inner{
			width:50px;
			height:50px;
			font-size: 20px;
			line-height:50px;

		}
		.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
			background-color: @bgc-header;
		}
		.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner{
			background-color: #D8D8D8;
			border:none;
			span{
				color: #fff;
			}
		}
		.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner{
			background-color: @bgc-header;
			&>.ivu-steps-icon.ivu-icon{
				color: #fff;
				font-size: 50px;
			}
		}

		.ivu-steps .ivu-steps-tail{
			top:24px;
			&>i{
				height:2px;
			}
		}
		.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
			background-color: @bgc-header;
		}
		.ivu-steps .ivu-steps-tail>i:after{
			background-color: #D8D8D8;
		}
		.ivu-steps-horizontal{
			.two.ivu-steps-item{
				.ivu-steps-content{
					margin-left: -5px;
				}
			}
			.three.ivu-steps-item{
				width:10%!important;
				.ivu-steps-content{
					margin-left: 12px;
				}
			}
			.ivu-steps-content{
				padding-left:0px;
				margin-top: 10px;
				margin-left: -8px;
				color:#3F6FB1;
				font-size: 14px;
			}
			.ivu-steps-status-wait{
				.ivu-steps-content{
					color:#D8D8D8;
				}
			}
		}
	}
</style>
