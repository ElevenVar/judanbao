<template>
	<div class='CollectionCase'>
		<!-- 公共Header类 -->
		<Collapse v-model="showMe" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">催收案件管理报表</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model='formData'>
							<FormItem label="还款日">
								<DatePicker @on-change='monthPayDateRange' v-model="formData.monthPayDateRange" format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="案件分配日期">
								<DatePicker @on-change='caseAllotDay' v-model="formData.caseAllotDay" format="yyyy-MM-dd" type="date" placement='bottom' :editable="false" placeholder="请选择案件分配日期！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="永久催收员">
								<Input type="text" v-model="formData.foreverUrgeName" placeholder="请输入永久催收员！" size="large"></Input>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click='search'>查询</Button>
								<Button @click='restData'><Icon type="navicon-round"></Icon> 重置</Button>
								<Button @click='exportData'><Icon></Icon>导出数据</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height="396" border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click='refresh'/>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default{
		name:'CollectionCase',
		data (){
			return{
				zhedie: "收起",
				showMe: '1', //默认展开
				isActive: true,
				formData:{
					monthPayDateRange:[], // 还款日
				  caseAllotDay:'',//分配日期  YYYY-MM-DD
				  foreverUrgeName:'',//永久催收员姓名
					reportId:'BCMP_URGE_CURRENT_REPORT'   //  必传:默认值不可变	
				},
				formIndex:'0',
				columns:[
					{title:'分中心',minWidth:120,key:'branchName'},{title:'进件营业部',minWidth:120,key:'orgName'},
					{title:'签约营业部',minWidth:120,key:'signOrgName'},{title:'归属营业部',minWidth:120,key:'belongOrgName'},
					{title:'合同编号',minWidth:180,key:'loanContractNo'},{title:'客户姓名',minWidth:120,key:'loanName'},
					{title:'特权包',minWidth:120,key:'isSpecial'},{title:'借款金额',minWidth:120,key:'loanAmount'},
					{title:'合同期数',minWidth:120,key:'loanBill'},{title:'产品类型',minWidth:120,key:'productType'},
					{title:'产品名称',minWidth:120,key:'productTypeName'},{title:'放款金额',minWidth:120,key:'grantLoanAmount'},
					{title:'放款日期',minWidth:120,key:'payDate'},{title:'放款渠道',minWidth:120,key:'payChannelName'},
					{title:'总服务费',minWidth:120,key:'totalServerFee'},{title:'主体',minWidth:120,key:'mainBodyName'},
					{title:'还款日',minWidth:120,key:'monthPayDate'},{title:'已还期数',minWidth:120,key:'repayContractCot'},
					{title:'剩余本金',minWidth:120,key:'overplusCorpus'},{title:'逾期期数',minWidth:120,key:'overduePeriods'},
					{title:'逾期等级',minWidth:120,key:'overdueGrade'},{title:'逾期天数',minWidth:120,key:'overdueDay'},
					{title:'逾期本金',minWidth:120,key:'overdueCapital'},{title:'逾期利息',minWidth:120,key:'overdueInterest'},
					{title:'罚息',minWidth:120,key:'overdueAmount'},{title:'逾期特权包',minWidth:120,key:'overdueSpecial'},
					{title:'逾期保险费',minWidth:120,key:'overduePremium'},{title:'账户管理费',minWidth:120,key:'overdueAccountManage'},
					{title:'逾期总额',minWidth:120,key:'overdueAllAmt'},{title:'案件分配日期',minWidth:120,key:'caseAllotTimeStr'},
					{title:'处理状态',minWidth:120,key:'handleType'},{title:'案件状态',minWidth:120,key:'status'},
					{title:'所属团队',minWidth:120,key:'urgeTeamName'},{title:'所属组长',minWidth:120,key:'leaderName'},
					{title:'永久催收员',minWidth:120,key:'foreverUrgeName'},{title:'临时催收员',minWidth:120,key:'urgeName'},
				],
				datas:[],
				totallPages:0,
			}
		},
		methods:{
			//默认查询
			init(pageIndex,pageSize){
				this.formData.pageIndex = pageIndex || this.formData.pageIndex
				this.formData.pageSize = pageSize || this.formData.pageSize
				this.HttpAjax('post','reportQueryData',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.datas = res.data.data.data
						this.totallPages = res.data.data.dataCount
					}
				})
			},
			//查询
			search(){
				this.init()
			},
			// 重置
			restData(){
				for(let i in this.formData){
					if(i != 'pageIndex' && i != 'pageSize' && i != 'reportId'){
						this.formData[i] = ''
					}
				}
				this.init()
			},
			// 页码切换
			changePages(pageIndex){
				this.init(pageIndex)
			},
			// 每页条数切换
			changePagesTotall(pageSize){
				this.init('1', pageSize)
			},
			// 刷新
			refresh(){
				this.init()
			},
			// 还款日转换
			monthPayDateRange(val){
				this.formData.monthPayDateRange = val
			},
			// 案件分配日期转换
			caseAllotDay(val){
				this.formData.caseAllotDay = val
			},
			//导出
			exportData(){
				this.HttpAjax('post','reportGetReortFileType',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						let fileType = res.data.data.fileType
						this.HttpAjax('post','reportDownload',qs.stringify(this.formData),(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							this.downLoadFile(res.data,'催收案件管理表'+fileType);
						},'download')
					}
				})
			},
			//折叠、展开
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
		},
		mounted(){
			this.init()
		}
	}
</script>

<style>
	
</style>