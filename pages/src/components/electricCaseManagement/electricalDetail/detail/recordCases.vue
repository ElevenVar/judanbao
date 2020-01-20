<template>
	<div class="recordCases">
		<Row>
	        <Col span="12" style="padding-right: 20px;">
	        	<Table border :columns="columns1" :data="data1"></Table>
	        	<div class="tabs-item">
				<!-- 公共page分页类 -->
					<div class="page-item" style="text-align: center;">
						<Page :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer ></Page>
						<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>
					</div>
				</div>
	        </Col>
	        <Col span="12">
	        	<Table border :columns="columns1" :data="data1"></Table>
	        	<div class="tabs-item">
				<!-- 公共page分页类 -->
					<div class="page-item" style="text-align: center;">
						<Page :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer ></Page>
						<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>
					</div>
				</div>
	        </Col>
	    </Row>

	</div>
</template>

<script>
	export default{
		data(){
	      return{
	      	 columns1: [
                    {
                        title: '序号',
                        type:'index',
                        key: 'HTnumber'
                    },
                    {
                        title: '分案时间',
                        key: 'FKmoney'
                    },
                    {
                        title: '催收团队',
                        key: 'HTqishu'
                    },
                    {
                        title: '催收员',
                        key: 'HTsheng'
                    },
                    {
                        title: '逾期等级',
                        key: 'CPtype'
                    }
                ],
                data1: [
                    {

                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈'
                        
                    },
                    {

                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈'
                    },
                    {

                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈'
                        
                    },
                    {

                        FKmoney: '短信',
                        HTqishu: 23,
                        HTsheng: '2016-10-03',
                        CPtype:'哈哈哈哈'
                    }
                ]
	      }
      }
	}
</script>

<style scoped lang="less" >

	
</style>