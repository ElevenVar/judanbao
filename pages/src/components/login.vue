<template class="all">
  <div class="login">
   		<div class="bg" :style="height" >
   			<img src="../assets/img/bg2.jpg" :style="height" alt="" class="logo" />
   		</div>
   		<div class="LoginWarp">
   			<div class="left common" >
   				<img class="shuiyin" src="../assets/img/shuiyin.png"/>
   				<img class="judanbao" src="../assets/img/bbbb.png"/>
   			</div>
   			<div class="right common">
   				<div class="back"></div>
   				<div class="title">
	   				<span class="welcome">欢迎登录</span>
	   				<span style="color: white;">/</span>
	   				<span class="sub">welcome login</span>
	   			</div>
	   			<Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="50">
	   				<FormItem class="formItem" label="" prop="uname" style="margin-left: -50px;">
	   					<Input type="text" class="samesize" name="uname" :maxlength="maxlength" v-model="formValidate.uname" placeholder="请输入账号"></Input>
	   					<img class="imgsize" src="../assets/img/icon/user.png"/>
	   				</FormItem>
	   				<FormItem class="formItem" label="" prop="upass" style="margin-left: -50px;">
	   					<Input type="password"  class="samesize" name="upass" :maxlength="maxlength" v-model="formValidate.upass" placeholder="请输入密码"></Input>
	   					<img class="imgsize" src="../assets/img/icon/pass.png"/>
	   				</FormItem>
	   				<FormItem class="formItem" label="" prop="recode" style="margin-left:  -50px;">
	   					<Input type="text"  class="samesize recode" name="code"  v-model="formValidate.recode" placeholder="请输入验证码"></Input>
	   					<img class="imgsize" src="../assets/img/icon/recode.png"/>
	   					<span class="recodeImg"><img @click="getValidCode" :src="getCode"/></span>
	   				</FormItem>
	   				<FormItem style="margin-left: -50px;">
	            <button  class="LoginSubmit" @click.prevent="LoginSubmit('formValidate')">登录</button>
	         </FormItem>
	         <a class="forgetpass" @click="forgetpw">忘记密码？</a>
	   			</Form>
		   			<Spin fix v-if="loadingState">
	        		<Icon type="ios-loading" size='48' class="demo-spin-icon-load"></Icon>
	        		<div>登录中...</div>
	    		</Spin>
   			</div>
   		</div>
      <div class="top_text"
           style="position:fixed;bottom:0;color:#fff;line-height:50px;width:100%;text-align: center;"
      >Copyright © 2018. Judun All rights reserved.
      </div>
  </div>
</template>

<script>
	import store from '../store/index'
	import md5 from 'js-md5'
	import url_config from './../service/url_config.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
	  data () {
	    return {
        maxlength:20,
	    	formModal:'',
	    	validUID:'',
	    	getCode:'',//验证码
	    	formModal:{
            // oldPassWord: '',
            newPassWord: '',
            PassWordAgain:''
        },
	    	formValidate: {
            uname: '',
            upass: '',
            recode:''
       },
        ruleValidate: {
        		recode: [
                { required: true, message: '验证码不能为空', trigger: 'blur' }
            ],
            uname: [
                { required: true,message: '账户不能为空', trigger: 'blur' }
            ],
            upass: [
                { required: true, message: '密码不能为空',maxength:16, trigger: 'blur' }
            ]
        },
	      height:{
	      	height:'auto',
	      	overflowY:'hidden'
	      }
	    }
	  },
	  created(){
	  	this.init();
	  	this.getUID();
	  },
	  mounted(){
	  	this.height.height=(document.documentElement.clientHeight)+'px';
			window.onresize = () => {
        return (() => {
            this.height.height=(document.documentElement.clientHeight)+'px';
        })();
    	};
    },
    computed: {
			...mapState([
				'loadingState'
			])
		},
	  methods:{
	  	getValidCode(){
	  		this.getCode=url_config.getValidCode+'?uuid='+this.validUID+'&vvv='+new Date();
	  	},
	  	init(){
				const _=this;
			},
			getUID(){
				const _=this;
				_.HttpAjax('get','getValidUID',{},(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false)
					if(res.status){
						_.validUID = res.data;
						_.getValidCode();
					}
				});
			},
      // 登录按钮点击事件
	  	LoginSubmit(refname){
	  		var da1 =  {
				  name:this.formValidate.uname,
				  code:this.formValidate.recode,
				  uuid:this.validUID,
					password:md5(this.formValidate.upass)
				};
				this.$refs[refname].validate((valid) => {
            if (valid) {
                this.HttpAjax('post','login',da1,(res)=>{
                	store.commit('UPDATE_LOADINGSTATE',false)
					  			if(res.data.status=='200'){
					  				var user=res.data.data;
					  				store.commit('UPDATE_USERINFORMATION',user); //保存用户信息 -> store
					  				this.HttpAjax('post','index','',(res2)=>{
					  					store.commit('UPDATE_LOADINGSTATE',false)
							  			if(res2.data.status=='200'){
							  				let sto=res2.data.data;
							  				this.setStore('menu',sto); //菜单列表
							  				
							  				store.commit('UPDATE_QN_AUTOLOGIN',true); //设置青牛登录第一次自动登录！
							  				this.$router.push("/index");
							  			}
							  		})
					  			}
					  	})
            }
        })
	  	},
	  	forgetpw(){
	  		this.$router.push('/forget');
	  	}
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
		.login{

			overflow-x: hidden;
			.input:-webkit-autofill{
				background-color: white !important;
			}
			.bg{
				position: relative;
				left:50% ;
				margin-left: -960px;
				max-width: 1920px;
				overflow-y: hidden;
				overflow-x: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.LoginWarp{
				/*position: absolute;*/
				z-index: 1;
				width: 825px;
				height: 400px;
				/*top: 257px;
				left: 50%;*/
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin:auto auto;
				display: flex;
				.left{
					width:365px ;
					height: 100%;
					padding-right: 50px;
					box-sizing: border-box;
					position: relative;
					top: 0;
					.shuiyin{
						width: 278px;
						height: 278px;
						position: relative;
						left: 50%;
						margin-left: -139px;
						top: 50%;
						margin-top:-139px ;
					}
					.judanbao{
						width: 320px;
						position: absolute;
						left: 0;
						top: 140px;
					}
					/*img{
						width:350px ;
						position: relative;
						top: 0px;
					}*/
				}
				.right{
					/*box-shadow:0px 0px  40px 5px #aaa;*/
					border-radius: 10px;
					/*border: 1px solid #e1e1e1;*/
					padding: 20px 30px;
					width: 450px;
					height: 100%;
					position: relative;
				}
				.back{
					width: 450px;
					height: 100%;
					border-radius: 10px;
					background: white;
					opacity: 0.2;
					position: absolute;
					top: 0;
					left: 0;
				}
				.common{
					justify-content:flex-start;

				}
				.title{
					margin-bottom: 20px;
					margin-left: 0px;
					font-family:"microsoft yahei" ;

					.welcome{
						font-size: 20px;
						margin-right: 2px;
						color: white;
					}
					.sub{
						font-size: 14px;
						margin-left: 2px;
						color: white;
					}
				}
				.LoginSubmit{
						width: 390px;
						height: 50px;
						background: #4977a3;
						font-size: 20px;
						letter-spacing: 15px;
						border-radius: none;
						color: white;
						font-family: "microsoft yahei";
						outline: none;
						border: 1px solid #749dc4;
						cursor: pointer;
				}
				.forgetpass{
					font-size: 14px;
					position: relative;
					top: -12px;
					left: 325px;
					color: white;
				}
				.formItem{
					position: relative;
					.ivu-form-item-content{
						margin-left: -50px !important;
					}
				}
				.imgsize{
					position: absolute;
			    top: 14px;
			    left: 14px;
			    width: 20px;
			    height: 20px;
				}
				.recodeImg{
					border: 1px solid #dddee1;
					height: 50px;
					width: 140px;
					background: white;
					display: inline-block;
					position: absolute;
					top: 0;
					right: -2px;
					img{
						position: absolute;
						top: 0;
						left: 0;
						z-index: 1;
					}
				}

			}
		}

</style>
<style lang="less">

	.login{

		.recode{
			.ivu-input{
				width: 230px !important;
			}
		}
		.samesize{
				.ivu-input{
					text-indent: 38px;
					width: 390px ;
					height: 50px ;
					font-size: 16px;
					border-radius: 0;
					color: #666666;
					-webkit-box-shadow: 0 0 0px 1000px white inset
				}

				.ivu-input-group-append, .ivu-input-group-prepend{
					font-size: 25px;
					padding: 4px 16px;
					border-radius: 0;
					background: white;
				}

		}

	}
</style>

