<template>
	<div class="noticeRecord">
		<Table border :columns="columns1" :data="data1"></Table>
		<div class="tabs-item">
		<!-- 公共page分页类 -->
			<div class="page-item" style="text-align: center;">
				<Page :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer ></Page>
				<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>
			</div>
		</div>
	</div>			
</template>

<script>
	export default{
		data(){
	      return{
	      	 columns1: [
                    {
                        title: '通知时间',
                        key: 'HTnumber'
                    },
                    {
                        title: '通知方式',
                        key: 'FKmoney'
                    },
                    {
                        title: '联络人',
                        key: 'HTqishu'
                    },
                    {
                        title: '联络代码',
                        key: 'HTsheng'
                    },
                    {
                        title: '通知人',
                        key: 'CPtype'
                    },
                    {
                        title: '模板',
                        key: 'YHKamount'
                    },
                    {
                        title: '通知详情',
                        key: 'Repayment'
                    }
                ],
                data1: [
                    {
                        HTnumber: 'John123',
                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈',
                        YHKamount:6666,
                        Repayment: '2016-10-03'
                        
                    },
                    {
                        HTnumber: 'John123',
                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈',
                        YHKamount:6666,
                        Repayment: '2016-10-03'
                    }
                    
                ]
	      }
      }
	}
</script>

<style>
</style>