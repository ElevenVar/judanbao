<template>
	<div class="noticeRecord">
		<!-- 通知记录 -->
		<!--<div>{{datas}}</div>-->
    <div class="table-item">
      <Table border :columns="columns1" :data="data2"></Table>
    </div>

		<!--<div class="tabs-item">
			<div class="page-item" style="text-align: center;">
				<Page :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer ></Page>
				<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>
			</div>
		</div>-->
	</div>
</template>

<script>
	import store from '../../../../store/index'
	export default{
		props: ['getNoticeRecord'],
		data(){
	      return{
					loanContractNo: '',//传入的合同号
	      	columns1: [
                    {
                        title: '通知时间',
                        key: 'sendTime'
                    },
                    {
                        title: '通知方式',
                        key: 'messageType'
                    },
                    {
                        title: '联络人',
                        key: 'receievName'
                    },
                    {
                        title: '联络号码',
                        key: 'receievPhoneNo'
                    },
                    {
                        title: '通知人',
                        key: 'sendPerson'
                    },
                    {
                        title: '模板',
                        key: 'subject'
                    },
                    {
                        title: '通知详情',
                        key: 'messageInfo'
                    },
										{
											title: '数据来源',
											key: 'dataSource',
											minWidth: 100,
											render: (h, params) => {
												return h('div', [
													h('span',{
													}, (params.row.dataSource == null || params.row.dataSource == '') ? '聚担保': params.row.dataSource)
												])
											}
										},
                ],
              data2:[]
	      }
        },

	    watch:{
	    	getNoticeRecord(e,r){
	    		if(e){
	    			this.data2=e
	    		}
	    	}
	    },
	}
</script>

<style>
</style>
