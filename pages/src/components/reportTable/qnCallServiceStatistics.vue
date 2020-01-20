<template>
	<div id="qnCallServiceStatistics">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">{{title}}</span>
				<span class="swith head-commom">
                {{rotate ? '收起' : '展开'}}
                <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
              </span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" inline :label-width="110" ref="formDatas" :model="formData">
							<FormItem class="block-tip">
								<Select size="large" class="prepend" v-model="formIndex">
									<Option value="0">技能组</Option>
									<Option value="1">坐席工号</Option>
									<Option value="2">呼叫方式</Option>
									<Option value="3">客户号码</Option>
								</Select>
								<Input v-if="formIndex == 0" type="text" placeholder="请输入技能组！" v-model="formData.skillName" size="large" :maxlength="30"></Input>
								<Input v-if="formIndex == 1" type="text" placeholder="请输入坐席工号！" v-model="formData.agentId" size="large" :maxlength="30"></Input>
								<Select v-if="formIndex == 2" size="large" placeholder="请输入呼叫方式！" v-model="formData.callType">
									<Option value="0">呼入</Option>
									<Option value="1">呼出</Option>
									<Option value="3">外拨</Option>
								</Select>
								<Input v-if="formIndex == 3" type="text" placeholder="请选择客户号码！" v-model="formData.remoteUrl" size="large" :maxlength="30"></Input>
							</FormItem>
							<Button type="primary" @click="getQnCallServiceList()" :disabled="disabled">查询</Button>
							<Button type="primary" @click="callTimeLangCongModal" :disabled="disabled">通话时长配置</Button>
							<Button @click="restData" :disabled="disabled">重置</Button>
							<Button  v-if="this.getAuth('11000010801')" @click="exportQnCallServiceData()" :disabled="disabled">导出数据</Button>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>

		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totalSize" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>

		<Modal v-model="callTimeLangCong" draggable title="通话时长配置" @on-cancel="cancel">
			<div>
				<h4>坐席与客户通话时长配置：</h4>
				<Form inline class="callServiceLang" :model="callConfig" ref="fromModal" :rules="validate">
					<FormItem prop='timeLengthMin'>
						<Input @on-blur="inputNumber('timeLengthMin')" size="large" :number="true" placeholder="开始时间" v-model="callConfig.timeLengthMin"></Input>
					</FormItem>
					<span>秒</span>
					<span class="mid">-</span>
					<FormItem prop='timeLengthMax'>
						<Input @on-blur="inputNumber('timeLengthMax')" size="large" number placeholder="结束时间" v-model="callConfig.timeLengthMax"></Input>
					</FormItem>
					<span>秒</span>
				</Form>

				<span>
					说明：仅填写右侧时间，表示<=xx秒,仅填写左侧时间,表示>=xx秒；
				</span>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="Submit_Info()">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store'
	import qs from 'qs'

	export default{
		data(){
			const minSecend = (rule, value, callback) => {
				let max = this.callConfig.timeLengthMax;
				if(max != '' && value != ''){
					if(value >= max) {
						callback(new Error('要小于结束时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			const maxSecend = (rule, value, callback) => {
				let min = this.callConfig.timeLengthMin;
				if(min != '' && value != ''){
					if(value <= min) {
						callback(new Error('要大于开始时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			return{
				title:'通话服务统计',
				rotate:true,
				value1:'1',
				formIndex:'0',
				totalSize:0,
				disabled:false,
				callTimeLangCong:false,
				formData:{
					pageIndex:'1',
					pageSize:'10',
					skillName:'',
					agentId:'',
					callType:'',
					remoteUrl:'',
				},
				callConfig:{
					timeLengthMin:'',
					timeLengthMax:'',
				},
				validate:{
					timeLengthMin:[{required:false},{validator:minSecend,trigger: 'blur'}],
					timeLengthMax:[{required:false},{validator:maxSecend,trigger: 'blur'}]
				},
				columns:[
					{
						type:'index',
						title:'序号',
						minWidth:80,
					},{
						key:'agentId',
						title:'坐席工号',
						minWidth:80,
					},{
						key:'agentName',
						title:'坐席姓名',
						minWidth:80,
					},{
						key:'agentDn',
						title:'坐席分机号',
						minWidth:80,
					},{
						key:'skillId',
						title:'技能组ID',
						minWidth:80,
					},{
						key:'skillName',
						title:'技能组名称',
						minWidth:80,
					},{
						key:'callType',
						title:'呼叫方式',
						minWidth:80,
					},{
						key:'remoteUrl',
						title:'客户号码',
						minWidth:80,
					},{
						key:'talkDuration',
						title:'通话时长',
						minWidth:80,
					},{
						key:'startTime',
						title:'开始时间',
						minWidth:100,
					},{
						key:'endTime',
						title:'结束时间',
						minWidth:110,
					}
				],
				datas:[]

			}
		},
		methods:{
			init(){
				this.getQnCallServiceList();
			},
			getQnCallServiceList(page,pagesize){
				const _=this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;

				_.formData.timeLengthMin = '';
				_.formData.timeLengthMax = '';

				_.HttpAjax('post', 'qnCallServiceList', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.data.status == 200) {
						_.datas = res.data.data.data;
						_.totalSize = res.data.data.dataCount;
					}
				});
			},//导出数据
			exportQnCallServiceData(){
				const _ = this;
				_.HttpAjax('post', 'qnExportCallServiceList',qs.stringify(_.formData),(res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.status == 200) {
						_.downLoadFile(res.data,'通话服务统计.xlsx');
					}
				},'download');
			},
			callTimeLangCongModal(){
				const _=this;
				_.callTimeLangCong = true;
				_.disabled=true;
				_.$refs['fromModal'].resetFields();
			},
			Submit_Info(page,pagesize){
				const _ = this;
				_.$refs['fromModal'].validate((valid) => {
					if(valid){
						_.formData.pageIndex = page || _.formData.pageIndex;
						_.formData.pageSize = pagesize || _.formData.pageSize;

						_.formData.timeLengthMin = _.callConfig.timeLengthMin;
						_.formData.timeLengthMax = _.callConfig.timeLengthMax;

						_.HttpAjax('post', 'qnCallServiceList', _.formData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data && res.data.status == 200) {
								_.datas = res.data.data.data;
								_.totalSize = res.data.data.dataCount;
								_.callTimeLangCong = false;
								_.disabled=false;
							}
						});
					}
				});

			},//页码跳转
			changePages(name) {
				this.getQnCallServiceList(name, '');
			}, //页数切换
			changePagesTotall(name) {
				this.formData.totalSize = name;
				this.getQnCallServiceList('', name);
			}, //刷新
			refresh() {
				this.getQnCallServiceList();
			},
			restData() { //重置
				const _ = this;
				_.$refs.formDatas.resetFields();

				for(let i in _.formData){
					if(i != 'pageIndex' && i!='pageSize'){
						_.formData[i] = '';
					}
				}
			},
			cancel(){
				this.callTimeLangCong = false;
				this.disabled=false;
				this.$refs['fromModal'].resetFields();
			},
			inputNumber(vs){
				if(!/^[0-9]*$/.test(this.callConfig[vs])){
					this.callConfig[vs] = '';
				}
			}
		},
		created(){
			this.init();
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	#qnCallServiceStatistics{
		.block-tip.ivu-form-item {
			margin-left: -110px;
			.ivu-select.prepend {
				width: 110px;
				text-align: center;
				.ivu-select-selection {
					width: 110px;
					background-color: #FBFBFB;
				}
			}
			.ivu-input-wrapper,
			.ivu-select {
				width: 250px;
				margin-left: -4px;
			}
		}
	}
	.callServiceLang{
		width: 300px;
		display: flex;
		margin:10px auto;
		justify-content: center;
		align-items: center;
		.ivu-form-item{
			margin-right: 0;
		}
		span{
			padding:0 5px;
			margin-bottom: 15px;
			&.mid{
				width: 40px;
			}
		}
	}
</style>
