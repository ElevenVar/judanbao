<template>
	<div class="recordCases">
		<Table border :columns="columns1" :data="rdata"></Table>
		<!--<div class="tabs-item">
			<div class="page-item" style="text-align: center;">
				<Page :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer ></Page>
				<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>
			</div>
		</div>-->
	</div>
</template>

<script>
	export default{
		props: ['dataGLAJ'],
		data(){
	      return{
	      	 rdata:[],
	      	 columns1: [
                    {
                        title: '合同编号',
						minWidth:120,
						align:'center',
                        key: 'loanContractNo'
                    },
                    {
                        title: '产品类型',
                        minWidth:120,
                        align:'center',
                        key: 'productType'
                    },
                    {
                        title: '产品名称',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'HTqishu'
                    },
                    {
                        title: '客户姓名',
                        align:'center',
                        minWidth:100,
                        key: 'clientName'
                    },
                    {
                        title: '证件号码',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'CPtype'
                    },
                    {
                        title: '借款金额',//xxxx
                        align:'center',
						minWidth:120,
                        key: 'loanAmount'
                    },
                    {
                        title: '合同期数',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'distributionDate'
                    },
                    {
                        title: '借款期限',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'HTqishu'
                    },
                    {
                        title: '总服务费',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'ulgeName'
                    },
                    {
                        title: '放款日期',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'grantLoanDate'
                    },
                    {
                        title: '应还款日期',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'HTqishu'
                    },
                    {
                        title: '逾期等级',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'ulgeName'
                    },
                    {
                        title: '逾期天数',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'CPtype'
                    },
                    {
                        title: '逾期期数',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'ulgeName'
                    },
                    {
                        title: '关系',//xxxx
                        align:'center',
                        minWidth:120,
                        key: 'CPtype'
                    }
                ],

	      }
     	},
     	watch:{
	    	dataGLAJ(e,r){
	    		console.log(e,r,'------')
	    		if(e){
	    			this.rdata=e
	    		}
	    	}
	    },
	}
</script>

<style scoped lang="less" >

	
</style>