<template>
	<div class="structureAccountReport">
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
							<FormItem label="统计方式" prop="statisticalType">
								<RadioGroup v-model="formData.statisticalType" style="width: 250px;">
									<Radio label="0">
								    <span>按天数统计</span>
									</Radio>
									<Radio label="1">
								    <span>按期数统计</span>
									</Radio>
								</RadioGroup >
							</FormItem><br>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="electREeportQueryList()">查询</Button>
								<Button v-if="this.getAuth('11000010601')" @click="reportDownloadList"><Icon type="navicon-round"></Icon> 导出数据</Button>
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
		data() {
			return {
				value1: '1',
				title: '账户结构日志报表',
				rotate: true,
				totallPages: 0,
				formData: {
					pageIndex: '1',
					pageSize: '10',
					reportDate: '',
					serviceLine: 'XD',
					statisticalType:'0',
					reportId: 'ACCT_STRUCTURE_LOG_REPORT',
				},
				columns: [
					{
						title: '时间',
						align: 'center',
						key:'reportDate',
						minWidth:130,
						fixed: 'left',
					},
					{
						title: '产品线',
						align: 'center',
						key:'serviceLineName',
						minWidth:90,
						fixed: 'left',
					},
					{
						title: '户数',
						align: 'center',
						children:[
							{
								title: 'M0',
								align: 'center',
								key:'m0Count',
								minWidth:110,
							},{
								title: 'M1',
								align: 'center',
								key:'m1Count',
								minWidth:110,
							},{
								title: 'M2',
								align: 'center',
								key:'m2Count',
								minWidth:110,
							},{
								title: 'M3',
								align: 'center',
								key:'m3Count',
								minWidth:110,
							},{
								title: 'M4',
								align: 'center',
								key:'m4Count',
								minWidth:110,
							},{
								title: 'M5',
								align: 'center',
								key:'m5Count',
								minWidth:110,
							},{
								title: 'M6',
								align: 'center',
								key:'m6Count',
								minWidth:110,
							},{
								title: 'M7+',
								align: 'center',
								key:'m7PlusCount',
								minWidth:110,
							}
						]
					},{
						title: '剩余合同金额',
						align: 'center',
						children:[
							{
								title: 'M0',
								align: 'center',
								key:'m0ContractAmt',
								minWidth:110,
							},{
								title: 'M1',
								align: 'center',
								key:'m1ContractAmt',
								minWidth:110,
							},{
								title: 'M2',
								align: 'center',
								key:'m2ContractAmt',
								minWidth:110,
							},{
								title: 'M3',
								align: 'center',
								key:'m3ContractAmt',
								minWidth:110,
							},{
								title: 'M4',
								align: 'center',
								key:'m4ContractAmt',
								minWidth:110,
							},{
								title: 'M5',
								align: 'center',
								key:'m5ContractAmt',
								minWidth:110,
							},{
								title: 'M6',
								align: 'center',
								key:'m6ContractAmt',
								minWidth:110,
							},{
								title: 'M7+',
								align: 'center',
								key:'m7PlusContractAmt',
								minWidth:110,
							}
						]
					}
					
				],
				datas: [],
				serviceLineList: [],
			}
		},
		methods: {
			init() {
				
			},
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
			}, //报表导出数据
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
			}, //时间格式转换
			changeTimes(name) {
				this.formData.reportDate = name;
			},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
			}, //页码跳转
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