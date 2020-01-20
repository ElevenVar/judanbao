<template>
	<div id="sysNotice">
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
						<Form label-position="right" inline :label-width="110" ref="formDatas" :model="formData" :rules="vailde">
							<FormItem  label="签入时间区间" class="tiemRange" prop="startSignInTime">
								<DatePicker :editable='false' @on-change="dataTimeChange($event,'startSignInTime')" v-model="formData.startSignInTime" type="datetime" placeholder="开始时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label=""  class="tiemRange1" style="margin-left:-110px" prop="endSignInTime">
								<span>-</span>
								<DatePicker :editable='false' @on-change="dataTimeChange($event,'endSignInTime')" v-model="formData.endSignInTime" type="datetime" placeholder="结束时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="签出时间区间" class="tiemRange" prop="startSignOutTime">
								<DatePicker :editable='false' @on-change="dataTimeChange($event,'startSignOutTime')"  v-model="formData.startSignOutTime" type="datetime" placeholder="开始时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label=""  class="tiemRange1" style="margin-left:-110px" prop="endSignOutTime">
								<span>-</span>
								<DatePicker :editable='false' @on-change="dataTimeChange($event,'endSignOutTime')" v-model="formData.endSignOutTime" type="datetime" placeholder="结束时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="坐席工号" prop="seatWorker">
								<Input v-model="formData.seatWorker" placeholder="请输入坐席工号！" size="large"></Input>
							</FormItem>
							<FormItem label="催收团队" prop="urgeTeam">
								<Select v-model="formData.urgeTeam" @on-open-change="getTeamList" placeholder="请选择催收团队！" size="large">
									<Option :value='item.urgeTeamId' v-for="(item,index) in teamList" :key="index">{{item.urgeTeamName}}</Option>
								</Select>
							</FormItem>
							<Button type="primary" @click="getCheckInOutList1()" :disabled="disabled">查询</Button>
							<Button @click="restData" :disabled="disabled">重置</Button>
							<Button v-if="this.getAuth('11000010701')" @click="exportQnSignInOutData" :disabled="disabled">导出数据</Button>
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
	</div>
</template>

<script>
	import store from '../../store'
	import qs from 'qs'
	
	export default{
		data(){
			const startSignInTime1 = (rule, value, callback) => {
				let dateTime = this.formData.endSignInTime;
				if(dateTime != ''){
					if(new Date(value).getTime() >= new Date(dateTime).getTime()) {
						callback(new Error('开始签入时间要小于结束签入时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			const endSignInTime1 = (rule, value, callback) => {
				let dateTime = this.formData.startSignInTime;
				if(dateTime != ''){
					if(new Date(value).getTime() <= new Date(dateTime).getTime()) {
						callback(new Error('结束签入时间要大于开始签入时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			const startSignOutTime1 = (rule, value, callback) => {
				let dateTime = this.formData.endSignOutTime;
				if(dateTime != ''){
					if(new Date(value).getTime() >= new Date(dateTime).getTime()) {
						callback(new Error('开始签出时间要小于结束签出时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			const endSignOutTime1 = (rule, value, callback) => {
				let dateTime = this.formData.startSignOutTime;
				if(dateTime != ''){
					if(new Date(value).getTime() <= new Date(dateTime).getTime()) {
						callback(new Error('结束签出时间要大于开始签出时间！'));
					} else {
						callback();
					}
				}else{
					callback();
				}
			};
			return{
				title:'签入签出清单',
				rotate:true,
				value1:'1',
				totalSize:0,
				disabled:false,
				formData:{
					pageIndex:'1',
					pageSize:'10',
					startSignInTime:'',
					endSignInTime:'',
					startSignOutTime:'',
					endSignOutTime:'',
					urgeTeam:'',
					seatWorker:'',
				},
				vailde:{
					startSignInTime:[{required:false},{validator:startSignInTime1,trigger: 'change'}],
					endSignInTime:[{required:false},{validator:endSignInTime1,trigger: 'change'}],
					startSignOutTime:[{required:false},{validator:startSignOutTime1,trigger: 'change'}],
					endSignOutTime:[{required:false},{validator:endSignOutTime1,trigger: 'change'}]
				},
				columns:[
					{
						type:'index',
						title:'序号',
						minWidth:90,
					},
					{
						title:'坐席工号',
						key:'seatWorker',
						minWidth:100
					},
					{
						title:'聚担保账号',
						key:'userId',
						minWidth:100
					},
					{
						title:'催收团队',
						key:'urgeTeam',
						minWidth:100
					},
					{
						title:'签入时间',
						key:'signInTime',
						minWidth:100
					},
					{
						title:'签出时间',
						key:'signOutTime',
						minWidth:100
					},
					{
						title:'在线时长',
						key:'signTimeLength',
						minWidth:100
					}
				],
				datas:[],
				teamList:[]
			}
		},
		methods:{
			init(){
				const _=this;
				_.getCheckInOutList();
			},//列表查询
			getCheckInOutList1(page,pagesize){
				const _ = this;
				_.$refs['formDatas'].validate((valid) => {
					if(valid){
						_.formData.pageIndex = page || _.formData.pageIndex;
						_.formData.pageSize = pagesize || _.formData.pageSize;
						
						_.HttpAjax('post', 'qnSignInOutStatist', _.formData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data && res.data.status == 200) {
								_.datas = res.data.data.data;
								_.totalSize = res.data.data.dataCount;
							}
						});
					}
				});
			},//列表查询
			getCheckInOutList(page,pagesize){
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				
				_.HttpAjax('post', 'qnSignInOutStatist', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.data.status == 200) {
						_.datas = res.data.data.data;
						_.totalSize = res.data.data.dataCount;
					}
				});
			},//导出数据
			exportQnSignInOutData(){
				const _ = this;
				_.HttpAjax('post', 'qnSignInOutStatistExport',qs.stringify(_.formData),(res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.status == 200) {
						_.downLoadFile(res.data,'签入签出清单.xlsx');
					}
				},'download');
			},//时间格式转换
			dataTimeChange(name,rang) {
				this.formData[rang] = name;
			},//页码跳转
			changePages(name) {
				this.getCheckInOutList(name, '');
			}, //页数切换
			changePagesTotall(name) {
				this.formData.totalSize = name;
				this.getCheckInOutList('', name);
			}, //刷新
			refresh() {
				this.getCheckInOutList();
			},
			restData() { //重置
				const _ = this;
				_.$refs.formDatas.resetFields();
			},//获取电催团队
			getTeamList(val){
				const _=this;
				if(val){
					if(_.teamList.length <= 0){
						_.HttpAjax('post','getTeamInfoList',{},(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
					        if(res && res.data.status == '200') {
					        	_.teamList = res.data.data;
					        }
						});
					}
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
	.tiemRange.ivu-form-item{
		margin-right: 0;
		.ivu-input{
			width: 200px!important;
		}
	}
	.tiemRange1.ivu-form-item{
		.ivu-input{
			width: 200px!important;
		}
		.ivu-form-item-error-tip{
			left: 8px;
		}
	}
</style>