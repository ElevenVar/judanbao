<template>
	<div class="detail-table">
		<div class="wrap-title">
			<span class="line">&nbsp;</span>
			<span class="tit">身份信息</span>
		</div>
		<div class="detail-table-wrap">
			<Row class="detail-table-row">
		        <Col class="com"  span="2">姓名</Col>
		        <Col class="com"  span="4">陈亚梦</Col>
		        <Col class="com"  span="2">性别</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">证件类型</Col>
		        <Col class="com"  span="4">金融</Col>
		        <Col class="com"  span="2">证件号码</Col>
		        <Col class="com"  span="4">545645</Col>
		    </Row>
		    <Row class="detail-table-row">
		        <Col class="com"  span="2">有效日期</Col>
		        <Col class="com"  span="4">男</Col>
		        <Col class="com"  span="2">婚姻状况</Col>
		        <Col class="com"  span="4">已婚有子女</Col>
		        <Col class="com"  span="2">任职部门</Col>
		        <Col class="com"  span="4">总裁办</Col>
		        <Col class="com"  span="2">微信号码</Col>
		        <Col class="com"  span="4">试试还</Col>
		    </Row>
		    
		</div>
		<div class="wrap-title">
			<div style="height: 10px;"></div>
			<span class="line">&nbsp;</span>
			<span class="tit">申请人联系方式</span>
		</div>
		<div class="detail-table-wrap">
			<Row class="detail-table-row">
		        <Col class="com"  span="2">手机号码</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">手机使用年限(月)</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">每月平均消费话费</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">住宅电话</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		    <Row class="detail-table-row">
		        <Col class="com"  span="2">住宅电话登记人</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">QQ</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">微信</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">是否实名登记</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		</div>
		<div class="wrap-title">
			<div style="height: 10px;"></div>
			<span class="line">&nbsp;</span>
			<span class="tit">户籍地址</span>
		</div>
		<div class="detail-table-wrap">
			<Row class="detail-table-row">
		        <Col class="com"  span="2">省/直辖市</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">市</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">区县</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">详细地址</Col>
		        <Col class="com"  span="4"></Col>
		   </Row>
		</div>
		<div class="wrap-title">
			<div style="height: 10px;"></div>
			<span class="line">&nbsp;</span>
			<span class="tit">居住地址</span>
		</div>
		<div class="detail-table-wrap">
			<Row class="detail-table-row">
		        <Col class="com"  span="2">居住地址是否同户籍</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">住房性质</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">现地址居住时间(月)</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">省/直辖市</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		    <Row class="detail-table-row">
		        <Col class="com"  span="2">市</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">区/县</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">详细地址</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">月租金</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		</div>
		<div class="wrap-title">
			<div style="height: 10px;"></div>
			<span class="line">&nbsp;</span>
			<span class="tit">家庭信息</span>
		</div>
		<div class="detail-table-wrap">
			<Row class="detail-table-row">
		        <Col class="com"  span="2">婚姻状况</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">配偶姓名</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">配偶电话</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">家庭成员姓名</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		    <Row class="detail-table-row">
		        <Col class="com"  span="2">关系</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">联系电话</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">家庭成员居住地址是否同户籍</Col>
		        <Col class="com"  span="4"></Col>
		        <Col class="com"  span="2">家庭地址</Col>
		        <Col class="com"  span="4"></Col>
		    </Row>
		</div>
		<div class="wrap-title">
			<div style="height: 10px;"></div>
			<span class="line">&nbsp;</span>
			<span class="tit">其他联系人信息</span>
		</div>
		<Table border :columns="columns1" :data="data1"></Table>
	</div>
</template>

<script>
	export default{
		data(){
	      return{
	        formData: {
	          type: '1', //我是...
	          loanAm:'', //借款金额
	          repayAm:'', //还款额
	          loanIntent:'', //借款意向
	        },
	         columns1: [
                    {
                        title: '联系人姓名',
                        type: 'index',
                        key: 'HTnumber'
                    },
                    {
                        title: '关系',
                        key: 'FKmoney'
                    },
                    {
                        title: '电话',
                        key: 'HTqishu'
                    }
                ],
                data1: [
                    {
                       
                        FKmoney: 18,
                        HTqishu: 23,
                        HTsheng: '2016-10-03'
                    }
                ]
	      }
	    }
	}
</script>

<style scoped lang="less" >

</style>