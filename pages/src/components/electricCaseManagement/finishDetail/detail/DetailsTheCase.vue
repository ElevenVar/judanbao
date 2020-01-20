<template>
	<div class="detail-table">
		<Collapse v-model="value1" class="header-Collapse" accordion @on-change="panelChange">
	        <Panel name="Pane1">
	        	<span class="head-commom">案件信息</span>
	        	<div slot="content">
	        		<div class="detail-table-wrap" style="margin-top:10px">
								<Row class="detail-table-row">
					        <Col class="com"  span="2">贷款申请号</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.loanContractNo}}</Col>
					        <Col class="com"  span="2">客户姓名</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.clientName}}</Col>
					        <Col class="com"  span="2">身份证号</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.idCard}}</Col>
					        <Col class="com"  span="2">逾期开始期数</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.overStartBillTerm}}</Col>

					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">逾期结束期数</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.overEndBillTerm}}</Col>
					        <Col class="com"  span="2">逾期金额</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.overdueAllAmount == '无' ? 0 : caseInformationViewDto.overdueAllAmount}}</Col>
					        <Col class="com"  span="2">逾期本息</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.duotoCapInt == '无' ? 0 : caseInformationViewDto.duotoCapInt}}</Col>
					        <Col class="com"  span="2">逾期本金</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.duetoCapital == '无' ? 0 : caseInformationViewDto.duetoCapital}}</Col>
					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">逾期利息</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.duetoInterest == '无' ? 0: caseInformationViewDto.duetoInterest}}</Col>
					        <Col class="com"  span="2">滞纳金合计</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoOverdueFee == '无'? 0: caseInformationViewDto.remainderDuetoOverdueFee }}</Col>
					        <Col class="com"  span="2">服务费合计</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.surplusServerFee == '无' ? 0 : caseInformationViewDto.surplusServerFee}}</Col>
					        <Col class="com"  span="2">账户管理费合计</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.totalDuetoAccountManage == '无' ? 0 : caseInformationViewDto.totalDuetoAccountManage}}</Col>
					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">保险合计</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoPremium}}</Col>
					        <Col class="com"  span="2">已还本金</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.paidCapital == '无' ? 0 : caseInformationViewDto.paidCapital}}</Col>
					        <Col class="com"  span="2">剩余金额</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderAllDuetoAmount == '无' ? 0 : caseInformationViewDto.remainderAllDuetoAmount}}</Col>
					        <Col class="com"  span="2">剩余本金</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoCapital == '无' ? 0 : caseInformationViewDto.remainderDuetoCapital}}</Col>
					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">剩余利息</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoInterest == '无' ? 0 : caseInformationViewDto.remainderDuetoInterest}}</Col>
					        <Col class="com"  span="2">剩余服务费</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.surplusServerFee == '无' ? 0 : caseInformationViewDto.surplusServerFee}}</Col>
					        <Col class="com"  span="2">剩余账户管理费</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoAccountManage == '无' ? 0 : caseInformationViewDto.remainderDuetoAccountManage}}</Col>
					        <Col class="com"  span="2">剩余保险费</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoPremium == '无' ? 0 : caseInformationViewDto.remainderDuetoPremium}}</Col>
					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">剩余滞纳金</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoOverdueFee == '无' ? 0 : caseInformationViewDto.remainderDuetoOverdueFee}}</Col>
					        <Col class="com"  span="2">剩余特权包费用</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoSpecial == '无' ? 0 : caseInformationViewDto.remainderDuetoSpecial}}</Col>
					        <Col class="com"  span="2">特权包合计</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoSpecial}}</Col>
					        <Col class="com"  span="2">手续费</Col>
					        <Col class="com"  span="4">{{caseInformationViewDto.chargeFee=='无' ? 0 : caseInformationViewDto.chargeFee}}</Col>
					    </Row>
					    <Row class="detail-table-row">
					        <Col class="com"  span="2">处理状态</Col>
					        <Col class="com"  span="10">{{caseInformationViewDto.statusName}}</Col>
					        <Col class="com"  span="2">提前结清金额</Col>
					        <Col class="com"  span="10">{{caseInformationViewDto.earlyClearanceAmt=='无' ? 0: caseInformationViewDto.earlyClearanceAmt}}</Col>
					    </Row>
					</div>
        		</div>
        	</Panel>
        	<Panel name="Pane2">
	        	<span class="head-commom">偿清计划</span>
	        	<div slot="content">
	        		<div class="table-item" style="margin-top:10px">
				      <Table height="260" border :columns="columnsCQJH" :data="getRepayInfoList"></Table>
				    </div>
        		</div>
        	</Panel>
        	<Panel name="Pane3">
	        	<span class="head-commom">交易历史</span>
	        	<div slot="content">
	        		<div class="table-item" style="margin-top:10px">
				      <Table border :columns="columnsJYLS" :data="getReserverRecordList"></Table>
				    </div>
        		</div>
        	</Panel>
    	</Collapse>
	</div>
</template>

<script>
	import store from '../../../../store/index'
	
	export default{
		// props: ['allINFO','getRepayInfoList','getReserverRecordList'],
		props:{
			loanContractNo :String,
		},
		data(){
	      return{
	      	value1:'Pane3',
	      	caseInformationViewDto:{},
	      	getRepayInfoList:[],
	      	getReserverRecordList:[],
	      	
	        columnsCQJH: [
						{
							title: '期号',
							minWidth:80,
							key: 'billTerm'
						},
						{
							title: '到期还款日',
							minWidth:120,
							key: 'monthPayDate'
						},
						{
							title: '应还总额',
							minWidth:120,
							key: 'totalDuetoAmt'
						},
						{
							title: '应还本金',
							minWidth:120,
							key: 'duetoCapital'
						},
						{
							title: '实还本金',
							minWidth:120,
							key: 'paidCapital'
						},
						{
							title: '应还利息',
							minWidth:120,
							key: 'duetoInterest'
						},{
							title: '实还利息',
							minWidth:120,
							key: 'paidInterest'
						},
						{
							title: '应还保险费',
							minWidth:120,
							key: 'duetoPremium'
						},
						{
							title: '实还保险费',
							minWidth:120,
							key: 'paidPremium'
						},
						{
							title: '应还特权包',
							minWidth:120,
							key: 'duetoSpecial'
						},
						{
							title: '实还特权包',
							minWidth:120,
							key: 'paidSpecial'
						},
						{
							title: '应还手续费',
							minWidth:120,
							key: 'duetoPoundage'
						},
						{
							title: '实还手续费',
							minWidth:120,
							key: 'paidPoundage'
						},
						{
							title: '应还滞纳金',
							minWidth:120,
							key: 'duetoOverdueFee'
						},
						{
							title: '实还滞纳金',
							minWidth:120,
							key: 'paidOverdueFee'
						},
						{title: '应还代偿费',key: 'duetoCompensatoryFee',minWidth:120},
						{title: '已还代偿费',key: 'paidCompensatoryFee',minWidth:120},
						{
							title: '期还状态',
							minWidth:120,
							key: 'payStatus'
						},
						{
							title: '逾期天数',
							minWidth:100,
							key: 'overdueDays'
						},
						{
							title: '实际还款日期',
							minWidth:150,
							key: 'settleTime'
						},
						],
	        columnsJYLS: [
							{
									title: '贷款合同编号',
									minWidth:170,
									key: 'loanContractNo'//xxxxx
							},
							{
									title: '交易金额',//xxxxx
									minWidth:90,
									key: 'reserverAmount'
							},
							{
									title: '交易结果',//xxxxx
									minWidth:90,
									key: 'reserverStatus'
							},
							{
									title: '失败原因',//xxxxx
									minWidth:140,
									key: 'result'
							},
							{
									title: '实际收付时间',//xxxxxx
									minWidth:110,
									key: 'reserverTime'
							},
							{
									title: '扣款类型',//xxxxx
									minWidth:100,
									key: 'reserverMethod'
							},
							{
									title: '支付方式',//xxxxx
									minWidth:100,
									key: 'reserverMethod'
							},
							{
									title: '操作人',//xxxxx
									minWidth:110,
									key: 'reserverUser'
							},
							{
									title: '操作发起时间',//xxxxx
									minWidth:150,
									key: 'createTime'
							},
							],
	        rdata:[],
	        dataJYLS:[], //交易历史数据
	      }
	    },
	    methods:{
			getCaseInfoDetail1(){
				if(JSON.stringify(this.caseInformationViewDto) == '{}'){
					// 案件信息
					this.HttpAjax('post','getCaseInfoDetail',{loanContractNo:this.loanContractNo},(res)=>{ //  "20015087347068363045"
						store.commit('UPDATE_LOADINGSTATE',false);
						if(res.data.status=='200'){
							let data = res.data.data.caseInformationViewDto
							for(let i in data){
								if(data[i] == null || data[i] == ''){
									this.$set(this.caseInformationViewDto, i , '无')
								}else {
									this.$set(this.caseInformationViewDto, i , data[i])
								}
							}
							// this.caseInformationViewDto=res.data.data.caseInformationViewDto
						}
					});
				}
			},
			// 偿清计划
			getRepayInfoList1(){
				if(this.getRepayInfoList.length <= 0){
					//偿清计划
					this.HttpAjax('post','getRepayInfoList',{loanContractNo:this.loanContractNo},(res)=>{
						store.commit('UPDATE_LOADINGSTATE',false);
						if(res.data.status=='200'){
							this.getRepayInfoList = res.data.data
						}
					}); 
				}
			},
			//交易历史
			getReserverRecordList1(){
				if(this.getReserverRecordList.length <= 0){
					// 交易历史 getReserverRecordList
					this.HttpAjax('post','getReserverRecordList',{loanContractNo:this.loanContractNo},(res)=>{
						store.commit('UPDATE_LOADINGSTATE',false);
						if(res.data.status=='200'){
							this.getReserverRecordList = res.data.data
						}
					});	
				}
			},
			panelChange(val){
				if(val[0] == 'Pane1'){
					//案件详情
					this.getCaseInfoDetail1();
				}else if(val[0] == 'Pane2'){
					//偿还计划
					this.getRepayInfoList1();
				}else if(val[0] == 'Pane3'){
					//查询交易历史
					this.getReserverRecordList1();
				}
			}
	    },
	    created(){
	    	//查询交易历史
			this.getReserverRecordList1();
	    },
	}
</script>

<style scoped lang="less" >

</style>
