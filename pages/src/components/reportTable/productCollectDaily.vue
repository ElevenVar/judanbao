<template>
	<div class="productCollectDaily">
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
							<FormItem label="产品线" prop="serviceLine">
								<Select @on-open-change="geReportOrg" size="large" placeholder="请选择产品线！" v-model="formData.serviceLine">
									<Option :value="item.serverLine.toUpperCase()" :key="index" v-for="(item,index) in serviceLineList">{{item.serverLineName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="时间" prop="reportDate">
								<DatePicker @on-change="changeTimes" v-model="formData.reportDate" format="yyyyMM" :editable="false" type="month" placeholder="请选择时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="electREeportQueryList()">查询</Button>
								<Button v-if="this.getAuth('11000010501')" @click="reportDownloadList"><Icon type="navicon-round"></Icon> 导出数据</Button>
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
		name: "productCollectDaily",
		data() {
			return {
				value1: '1',
				title: '产品催收日报',
				rotate: true,
				totallPages: 0,
				formData: {
					pageIndex: '1',
					pageSize: '10',
					reportDate: '',
					serviceLine: 'XD',
					reportId: 'PRODUCT_DAILY_REPORT',
				},
				columns: [{
						title: '分案-对应阶段',
						align: 'center',
						fixed: 'left',
						children: [{
								title: '产品类型',
								key: 'productTypeName',
								align: 'center',
								minWidth: 120,
								fixed: 'left'
							},
							{
								title: '产品线',
								key: 'serviceLineName',
								align: 'center',
								minWidth: 90,
								fixed: 'left'
							}

						]
					},
					{
						title: 'C-M1',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'cm1AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'cm1AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'cm1RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'cm1RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'cm1RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'cm1OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					}, {
						title: 'M1',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm1AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm1AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm1RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm1RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm1RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm1OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},
					{
						title: 'M2',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm2AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm2AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm2RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm2RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm2RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm2OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},
					{
						title: 'M3',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm3AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm3AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm3RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm3RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm3RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm3OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},
					{
						title: 'M4',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm4AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm4AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm4RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm4RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm4RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm4OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},
					{
						title: 'M5',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm5AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm5AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm5RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm5RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm5RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm5OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					}, {
						title: 'M6',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm6AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm6AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm6RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm6RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm6RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm6OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					}, {
						title: 'M7+',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm7AllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '期初逾期金额',
										key: 'm7AllocateOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm7RecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '回收逾期金额',
										key: 'm7RecycleOverdueAmt',
										align: 'center',
										minWidth: 110,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm7RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '逾期金额回收率',
										key: 'm7OverdueAmtRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					}

				],
				datas: [],
				serviceLineList: [],
			}
		},
		methods: {
			init() {},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
				_.indexData = '';
			},
			electREeportQueryList(page, pagesize) {
				const _ = this;

				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;

				_.HttpAjax('post', 'electReportQuery', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == 200) {
						_.datas = res.data.data.data;
						_.totallPages = res.data.data.dataCount;
					}
				});
			},
			geReportOrg() {
				const _ = this;
				if(_.serviceLineList.length <= 0) {
					_.HttpAjax('post', 'reportServiceLine', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res.data.status == 200) {
							_.serviceLineList = res.data.data.serverLine;
						}
					});
				}
			},//报表导出数据
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
			}, //时间格式转换
			changeTimes(name) {
				this.formData.reportDate = name;
			},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
			},//页码跳转
			changePages(name) {
				this.electREeportQueryList(name, '');
			}, //页数切换
			changePagesTotall(name) {
				this.formData.pageSize = name;
				this.electREeportQueryList('', name);
			}, //刷新
			refresh() {
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

<style scoped>

</style>