<template>
  <div class="detail">
    <div class="detail-table">
      <div class="wrap-title">
        <span class="line">&nbsp;</span>
        <span class="tit">案件信息</span>
      </div>
      <div class="detail-table-wrap">
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
			        <Col class="com"  span="4">{{caseInformationViewDto.overdueAllAmount=='无'?0:caseInformationViewDto.overdueAllAmount}}</Col>
			        <Col class="com"  span="2">逾期本息</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.duotoCapInt=='无'? 0: caseInformationViewDto.duotoCapInt}}</Col>
			        <Col class="com"  span="2">逾期本金</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.duetoCapital =='无'? 0:caseInformationViewDto.duetoCapital}}</Col>
			    </Row>
			    <Row class="detail-table-row">
			        <Col class="com"  span="2">逾期利息</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.duetoInterest=='无' ? 0:caseInformationViewDto.duetoInterest}}</Col>
			        <Col class="com"  span="2">滞纳金合计</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.totalDuetoOverdueFee == '无'? 0 :caseInformationViewDto.totalDuetoOverdueFee}}</Col>
			        <Col class="com"  span="2">服务费合计</Col>
			        <Col class="com"  span="4"></Col>
			        <Col class="com"  span="2">账户管理费合计</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.totalDuetoAccountManage =='无' ? 0:caseInformationViewDto.totalDuetoAccountManage}}</Col>
			    </Row>
			    <Row class="detail-table-row">
			        <Col class="com"  span="2">保险合计</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.totalDuetoPremium == '无'? 0: caseInformationViewDto.totalDuetoPremium}}</Col>
			        <Col class="com"  span="2">已还本金</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.paidCapital =='无'? 0:caseInformationViewDto.paidCapital}}</Col>
			        <Col class="com"  span="2">剩余金额</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderAllDuetoAmount == '无'? 0:caseInformationViewDto.remainderAllDuetoAmount}}</Col>
			        <Col class="com"  span="2">剩余本金</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoCapital=='无'? 0 :caseInformationViewDto.remainderDuetoCapital}}</Col>
			    </Row>
			    <Row class="detail-table-row">
			        <Col class="com"  span="2">剩余利息</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoInterest == '无' ? 0 :caseInformationViewDto.remainderDuetoInterest}}</Col>
			        <Col class="com"  span="2">剩余服务费</Col>
			        <Col class="com"  span="4"></Col>
			        <Col class="com"  span="2">剩余账户管理费</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoAccountManage =='无' ? 0 : caseInformationViewDto.remainderDuetoAccountManage}}</Col>
			        <Col class="com"  span="2">剩余保险费</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoPremium == '无' ? 0: caseInformationViewDto.remainderDuetoPremium}}</Col>
			    </Row>
			    <Row class="detail-table-row">
			        <Col class="com"  span="2">剩余滞纳金</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoOverdueFee =='无' ? 0:caseInformationViewDto.remainderDuetoOverdueFee}}</Col>
			        <Col class="com"  span="2">剩余特权包费用</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.remainderDuetoSpecial == '无'? 0:caseInformationViewDto.remainderDuetoSpecial}}</Col>
			        <Col class="com"  span="2">特权包合计</Col>
			        <Col class="com"  span="4">{{caseInformationViewDto.totalDuetoSpecial == '无' ? 0: caseInformationViewDto.totalDuetoSpecial}}</Col>
			        <Col class="com"  span="2">手续费</Col>
			        <Col class="com"  span="4"></Col>
			    </Row>
			    <Row class="detail-table-row">
			        <Col class="com"  span="2">处理状态</Col>
			        <Col class="com"  span="10"></Col>
			        <Col class="com"  span="2">提前结清金额</Col>
			        <Col class="com"  span="10"></Col>
			    </Row>
			</div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">偿清计划</span>
      </div>
      <div class="table-item">
	      <Table height="260" border :columns="columnsCQJH" :data="rdata"></Table>
	    </div>
      <div class="wrap-title">
        <div style="height: 10px;"></div>
        <span class="line">&nbsp;</span>
        <span class="tit">交易历史</span>
      </div>
      <div class="table-item">
	      <Table border :columns="columnsJYLS" :data="dataJYLS"></Table>
	    </div>

    </div>
  </div>

</template>
<script>
    import store from '../../../../store/index'
    export default {
      props: ['allINFO'],
      data(){
          return {
            columnsCQJH: [
	        		{
                        title: '期号',
                        type: 'index',
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
                        title: '实还总额',
                        minWidth:120,
                        key: 'totalPaidAmt'
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
                    },
                    {
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
                    {
                        title: '期还状态',
                        minWidth:120,
                        key: 'payStatus'
                    },
                    {
                        title: '逾期天数',
                        minWidth:120,
                        key: 'overdueDays'
                    },
                    {
                        title: '实际还款日期',
                        minWidth:120,
                        key: 'settleTime'
                    },
                ],
                columnsJYLS: [
                		{
                        title: '序号',
                        type: 'index',
                        minWidth:80
                    },

                    {
                        title: '贷款合同编号',
                        key: 'loanContractNo'
                    },
                    {
                        title: '交易金额',
                        key: 'reserverAmount'
                    },
                    {
                        title: '交易结果',
                        key: 'reserverStatus'
                    },
                    {
                        title: '失败原因',
                        key: 'result'
                    },
                    {
                        title: '实际收付时间',
                        key: 'reserverTime'
                    },
                    {
                        title: '扣款类型',
                        key: 'reserverMethod'
                    },
                    {
                        title: '支付方式',
                        key: 'repayType'
                    },
                    {
                        title: '操作人',
                        key: 'reserverUser'
                    },
                    {
                        title: '操作发起时间',
                        key: 'createTime'
                    },
                ],
                rdata:[],
                dataJYLS:[],
								caseINFO:'',
								loanINFO:'',
								caseInformationViewDto:{},
            
          }
      },
      watch:{
	    	allINFO:{
     			handler(newName, oldName) {
			     	if(newName){
		    			this.rdata=newName.repayInfoList          
		    			this.caseINFO=newName.clientInfo
		    			this.loanINFO=newName.loanInfo
							for(let i in newName.caseInformationViewDto){
								if(newName.caseInformationViewDto[i] == null || newName.caseInformationViewDto[i] ==""){
									this.$set(this.caseInformationViewDto, i , '无')
								}else {
									this.$set(this.caseInformationViewDto, i , newName.caseInformationViewDto[i])
								}
							}
		    			// this.caseInformationViewDto=newName.caseInformationViewDto
		    			this.dataJYLS=newName.reserverRecordList
		    		}
			    },
			    deep:true 
	     	}
	    },
	    methods:{


	    },
	    created(){
			
			},
    }
</script>

<style lang="less">

</style>
