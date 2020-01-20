<template>
	<div class="electricRate">
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
						<Form label-position="right" :label-width="110" inline :model="formData" ref="formData">
							<FormItem label="部门" prop="deptId">
								<Select filterable size="large" placeholder="请选择部门！" @on-change="departChange" @on-open-change="geReportOrg" v-model="formData.deptId">
									<Option :value="item.deptId" :key="index" v-for="(item,index) in reportOrgList">{{item.deptName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="团队" prop="teamId" v-if="showTeam">
								<Select size="large" placeholder="请选择团队！" @on-change="teamChange" v-model="formData.teamId" @on-open-change="getReportTeamListQuery">
									<Option :value="item.teamId" v-for="(item,index) in getReportTeam" :key="index">{{item.teamName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="小组" prop="groupId" v-if="showGroup">
								<Select size="large" placeholder="请选择小组！" v-model="formData.groupId" @on-open-change="getReportGroupListQuery">
									<Option :value="item.groupId" :key="index" v-for="(item,index) in getReportGroup">{{item.groupName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="员工姓名" prop="foreverUrgeName">
								<Input v-model="formData.foreverUrgeName" type="text" placeholder="请输入员工姓名！" size="large"></Input>
							</FormItem>
							<FormItem label="产品线" prop="serviceLine">
								<Select size="large" placeholder="请选择产品线！" v-model="formData.serviceLine">
									<Option :value="item.serverLine.toUpperCase()" :key="index" v-for="(item,index) in serviceLineList">{{item.serverLineName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="时间" prop="reportDate">
								<DatePicker v-model="formData.reportDate" @on-change="changeTimes" format="yyyyMM" :editable="false" type="month" placeholder="请选择时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="electREeportQueryList()">筛选</Button>
								<Button @click="restData()"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button v-if="this.getAuth('11000010301')" @click="reportDownloadList"><Icon type="navicon-round"></Icon> 导出数据</Button>
							</FormItem>

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
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs';

	export default {
		name: "electricRate",
		data() {
			return {
				value1: '1',
				title: '电催回报率报表',
				rotate: true,
				showTeam:false,
				showGroup:false,
				formIndex: '0',
				totallPages:0,
				formData: {
					pageIndex: '1',
					pageSize: '10',
					reportId: 'ELECTRIC_REPORT',
					reportDate: '',
					serviceLine: 'XD',
					deptId:'',
					teamId:'',
					groupId:'',
					foreverUrgeName:'',
				},
				reportOrgList:[],
				serviceLineList:[],
				getReportTeam:[],
				getReportGroup:[],
				columns: [{
						title: '部门',
						minWidth: 100,
						key: 'deptName',
						fixed: 'left'
					},
					{
						title: '团队',
						minWidth: 100,
						key: 'teamName',
						fixed: 'left'
					},
					{
						title: '小组',
						minWidth: 100,
						key: 'groupName',
						fixed: 'left'
					},
					{
						title: '员工',
						minWidth: 100,
						key: 'foreverUrgeName',
						fixed: 'left'
					},
					{
						title: '产品线',
						minWidth: 100,
						key: 'serviceLineName',
					},
					{
						title: '期初户数',
						minWidth: 120,
						key: 'intitCount',
					},
					{
						title: '回收户数',
						minWidth: 120,
						key: 'paidSuccessCount',
					},
					{
						title: '户数回收率',
						minWidth: 120,
						key: 'paidSuccessRate',
					},
					{
						title: '全款回收户数',
						minWidth: 120,
						key: 'paidAllCount',
					},
					{
						title: '全款户数回收率',
						minWidth: 130,
						key: 'paidAllRate',
					},
					{
						title: '期初逾期金额',
						minWidth: 120,
						key: 'totalOverdueAmt',
					},
					{
						title: '实际回收金额',
						minWidth: 120,
						key: 'totalPaidAmt',
					},
					{
						title: '逾期金额回收率',
						minWidth: 130,
						key: 'totalPaidAmtRate',
					},
					{
						title: '全款回收金额',
						minWidth: 120,
						key: 'totalPaidAllAmt',
					},
					{
						title: '全款金额回收率',
						minWidth: 130,
						key: 'totalPaidAllAmtRate',
					}, {
						title: '期初逾期罚息',
						minWidth: 120,
						key: 'totalDuetoPenaltyAmt',
					}, {
						title: '实际回收罚息',
						minWidth: 120,
						key: 'totalPaidPenaltyAmt',
					}, {
						title: '罚息回收率',
						minWidth: 120,
						key: 'totalPaidPenaltyAmtRate',
					}
				],
				datas: [],
			}
		},
		methods: {
			init() {

			}, //查询列表
			electREeportQueryList(page,pagesize) {
				const _ = this;

				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				if(_.formData.teamId == undefined){
					_.formData.teamId = '';
				}
				if(_.formData.groupId == undefined){
					_.formData.groupId = '';
				}
				_.HttpAjax('post', 'electReportQuery', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == 200){
						_.datas = res.data.data.data;
						_.totallPages = res.data.data.dataCount;
					}
				});
			},
			//查询机构
			geReportOrg(){
				const _ = this;
				if(_.reportOrgList.length <=0){
					_.HttpAjax('post', 'electReport',{}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res.data.status == 200){
							_.reportOrgList = res.data.data.deptInfo;
							_.serviceLineList = res.data.data.serverLineInfo;
						}
					});
				}
			},//部门change事件
			departChange(name){
				const _= this;
				_.getReportTeam = [];
				_.formData.teamId = '';
				_.getReportGroup = [];
				_.formData.groupId = '';
				
				_.showTeam = true;_.showGroup = false;
			},
			//查询团队
			getReportTeamListQuery(name){
				const _ = this;
				if(name){
					if(_.getReportTeam.length <=0 && _.formData.deptId != ''){
						_.HttpAjax('post', 'getReportTeamList',{deptId:_.formData.deptId}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if(res.data.status == 200){
								_.getReportTeam = res.data.data.teamInfo;
							}
						});
					}
				}
			},
			//团队change事件
			teamChange(name){
				const _= this;
				_.getReportGroup = [];
				_.formData.groupId = '';
				
				_.showGroup = true;
				if(name == undefined){
					_.showGroup = false;
				}
			},
			//查询组长
			getReportGroupListQuery(name){
				const _ = this;
				if(name){
					if(_.getReportGroup.length <=0 && _.formData.teamId != ''){
						_.HttpAjax('post', 'getReportGroupList',{teamId:_.formData.teamId}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if(res.data.status == 200){
								_.getReportGroup = res.data.data.groupInfo;
							}
						});
					};
				}
			},
			reportDownloadList(){
				const _ = this;
				_.HttpAjax('post', 'electFileType',_.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == '200'){
						let fileType = res.data.data.fileType;
						
						_.HttpAjax('post', 'reportDownload',qs.stringify(_.formData), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							let data = '';
							if(_.formData.reportDate == '' || _.formData.reportDate == null){
								let datas = new Date();
								let yeat = datas.getFullYear();
								let mouth = datas.getMonth()+1 < 10 ? '0'+datas.getMonth() : datas.getMonth();
								data = yeat+mouth;
							}else{
								data = _.formData.reportDate;
							}
							let filename = _.title+'_'+data+fileType;
							
							_.downLoadFile(res.data,filename);
						},'download');
					}
				});
				
				
			},
			changeTimes(name){
				this.formData.reportDate = name;
			},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
				_.showTeam = false;
				_.showGroup = false;
			}, //页码切换
			changePages(name) {
				this.electREeportQueryList(name,'');
			}, //页数切换
			changePagesTotall(name) {
				this.formData.pageSize = name;
				this.electREeportQueryList('',name);
			},
			refresh(){
				this.electREeportQueryList();
			}
		},
		created() {
			this.geReportOrg();
			this.electREeportQueryList();
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less">
	.electricRate {
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
</style>