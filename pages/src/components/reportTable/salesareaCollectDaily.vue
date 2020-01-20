<template>
	<div class="salesareaCollectDaily">
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
							<FormItem filterable label="部门" prop="data1">
								<Select placeholder="请选择部门！" v-model="formData.data2" size="large">

								</Select>
							</FormItem>
							<FormItem label="产品线" prop="serviceLine">
								<Select @on-open-change="geReportOrg" placeholder="请选择产品线！" v-model="formData.serviceLine" size="large">
									<Option :value="item.serverLine.toUpperCase()" :key="index" v-for="(item,index) in serviceLineList">{{item.serverLineName}}</Option>
								</Select>
							</FormItem>
							<FormItem label="时间" prop="reportDate">
								<DatePicker @on-change="changeTimes" format="yyyyMM" v-model="formData.reportDate" :editable="false" type="month" placeholder="请选择时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="请选择" prop="isZhCredit">
								<CheckboxGroup v-model="isZhCredit"  style="width: 250px;">
									<Checkbox label='1'>
										<span>是否包含正好微贷数据</span>
									</Checkbox>
								</CheckboxGroup>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="electREeportQueryList()">查询</Button>
								<Button @click="restData()"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button v-if="this.getAuth('11000010401')" @click="reportDownloadList"><Icon type="navicon-round"></Icon> 导出数据</Button>
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
		name: "salesareaCollectDaily",
		data() {
			return {
				value1: '1',
				title: '销售区域催收日报',
				rotate: true,
				totallPages: 0,
				isZhCredit:[],
				formData: {
					pageIndex: '1',
					pageSize: '10',
					deptId:'',
					reportDate: '',
					serviceLine:'XD',
					isZhCredit:'',
					reportId:'SALES_AREA_DAILY_REPORT'
				},
				columns: [{
						title: '分案-对应阶段',
						align: 'center',
						fixed: 'left',
						children: [{
								title: '销售部',
								key: 'deptName',
								align: 'center',
								minWidth: 100,
								fixed: 'left',
							},
							{
								title: '区域',
								key: 'areaName',
								align: 'center',
								minWidth: 100,
								fixed: 'left',
							},
							{
								title: '城市',
								key: 'cityName',
								align: 'center',
								minWidth: 100,
								fixed: 'left',
							},
							{
								title: '产品线',
								key: 'serviceLineName',
								align: 'center',
								minWidth: 90,
								fixed: 'left',
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
										title: '剩余本金',
										key: 'cm1AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'cm1RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'cm1RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'cm1RemainingPrincipalRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},{
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
										title: '剩余本金',
										key: 'm1AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm1RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm1RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm1RemainingPrincipalRecoveryRate',
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
										title: '剩余本金',
										key: 'm2AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm2RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm2RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm2RemainingPrincipalRecoveryRate',
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
										title: '剩余本金',
										key: 'm3AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm3RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm3RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm3RemainingPrincipalRecoveryRate',
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
										title: '剩余本金',
										key: 'm4AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm4RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm4RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm4RemainingPrincipalRecoveryRate',
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
										title: '剩余本金',
										key: 'm5AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm5RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm5RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm5RemainingPrincipalRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},{
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
										title: '剩余本金',
										key: 'm6AllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
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
										title: '剩余本金',
										key: 'm6RecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm6RecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm6RemainingPrincipalRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					},{
						title: 'M7+',
						align: 'center',
						children: [{
								title: '分案',
								align: 'center',
								children: [{
										title: '期初户数',
										key: 'm7PlusAllocateInitCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金',
										key: 'm7PlusAllocateRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收',
								align: 'center',
								children: [{
										title: '回收户数',
										key: 'm7PlusRecycleCount',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金',
										key: 'm7PlusRecycleRemainingPrincipal',
										align: 'center',
										minWidth: 100,
									}
								]
							},
							{
								title: '回收率',
								align: 'center',
								children: [{
										title: '户数回收率',
										key: 'm7PlusRecycleCountRecoveryRate',
										align: 'center',
										minWidth: 100,
									},
									{
										title: '剩余本金回收率',
										key: 'm7PlusRemainingPrincipalRecoveryRate',
										align: 'center',
										minWidth: 130,
									}
								]
							}
						]
					}

				],
				datas: [],
				serviceLineList:[],
			}
		},
		methods: {
			init() {

			}, //查询
			electREeportQueryList(page, pagesize) {
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;

				_.isZhCredit.length <=0 ? _.formData.isZhCredit = '0' : _.formData.isZhCredit = '1';

				_.HttpAjax('post', 'electReportQuery', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == 200) {
						_.datas = res.data.data.data;
						_.totallPages = res.data.data.dataCount;
					}
				});
			},//业务线查询
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
			reportDownloadList() {
				const _ = this;
				_.HttpAjax('post', 'electFileType',_.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == '200'){
						let fileType = res.data.data.fileType;
						
						_.HttpAjax('post', 'reportDownload', qs.stringify(_.formData), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							let data = '';
							if(_.formData.reportDate == '' || _.formData.reportDate == null) {
								let datas = new Date();
								let yeat = datas.getFullYear();
								let mouth = datas.getMonth() + 1 < 10 ? '0' + datas.getMonth() : datas.getMonth();
								data = yeat + mouth;
							} else {
								data = _.formData.reportDate;
							}
							let filename = _.title + '_' + data + fileType;
							_.downLoadFile(res.data, filename);
						}, 'download');
					}
				});
			},//重置
			restData() {
				const _ = this;
				_.$refs['formData'].resetFields();
				_.indexData = '';
			},//时间格式转换
			changeTimes(name) {
				this.formData.reportDate = name;
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
