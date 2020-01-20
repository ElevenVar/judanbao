<template>
	<div class="detail-table">
		<Collapse v-model="value1" class="header-Collapse">
			<Panel name="1">
				<span class="head-commom">身份信息</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">姓名</Col>
							<Col class="com" span="4">{{clientInfo.clientName}}</Col>
							<Col class="com" span="2">性别</Col>
							<Col class="com" span="4">{{clientInfo.clientSex}}</Col>
							<Col class="com" span="2">证件类型</Col>
							<Col class="com" span="4">{{clientInfo.certType}}</Col>
							<Col class="com" span="2">证件号码</Col>
							<Col class="com" span="4">{{clientInfo.idCard}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">有效日期</Col>
							<Col class="com" span="4">{{clientInfo.effDate}}</Col>
							<Col class="com" span="2">发证机关</Col>
							<Col class="com" span="4">{{clientInfo.certIssuOrg}}</Col>
							<Col class="com" span="2">户籍类型</Col>
							<Col class="com" span="4">{{clientInfo.regType}}</Col>
							<Col class="com" span="2">民族</Col>
							<Col class="com" span="4">{{clientInfo.clientNation}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="2">
				<span class="head-commom">申请人联系方式</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">手机号码</Col>
							<Col class="com" span="4">{{clientInfo.clientPhoneOne}}</Col>
							<Col class="com" span="2">手机使用年限(月)</Col>
							<Col class="com" span="4">{{clientInfo.mobileTimeSpan}}</Col>
							<Col class="com" span="2">每月平均消费话费</Col>
							<Col class="com" span="4">{{clientInfo.mthTelBill}}</Col>
							<Col class="com" span="2">住宅电话</Col>
							<Col class="com" span="4">{{clientInfo.nowAddrTel}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">住宅电话登记人</Col>
							<Col class="com" span="4">{{clientInfo.ownerHomePhone}}</Col>
							<Col class="com" span="2">QQ</Col>
							<Col class="com" span="4">{{clientInfo.qq}}</Col>
							<Col class="com" span="2">微信</Col>
							<Col class="com" span="4">{{clientInfo.weixin}}</Col>
							<Col class="com" span="2">是否实名登记</Col>
							<Col class="com" span="4">无</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="3">
				<span class="head-commom">户籍地址</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">省/直辖市</Col>
							<Col class="com" span="4">{{clientInfo.clientProvince}}</Col>
							<Col class="com" span="2">市</Col>
							<Col class="com" span="4">{{clientInfo.clientCity}}</Col>
							<Col class="com" span="2">区县</Col>
							<Col class="com" span="4">{{clientInfo.clientConty}}</Col>
							<Col class="com" span="2">详细地址</Col>
							<Col class="com" span="4">{{clientInfo.clientAddr}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="4">
				<span class="head-commom">居住地址</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">居住地址是否同户籍</Col>
							<Col class="com" span="4">{{clientInfo.isRegLive}}</Col>
							<Col class="com" span="2">住房性质</Col>
							<Col class="com" span="4">{{clientInfo.liveType}}</Col>
							<Col class="com" span="2">现地址居住时间(月)</Col>
							<Col class="com" span="4">{{clientInfo.nowAddrYear}}</Col>
							<Col class="com" span="2">省/直辖市</Col>
							<Col class="com" span="4">{{clientInfo.nowProvince}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">市</Col>
							<Col class="com" span="4">{{clientInfo.nowCity}}</Col>
							<Col class="com" span="2">区/县</Col>
							<Col class="com" span="4">{{clientInfo.nowConty}}</Col>
							<Col class="com" span="2">详细地址</Col>
							<Col class="com" span="4">{{clientInfo.nowAddr}}</Col>
							<Col class="com" span="2">月租金</Col>
							<Col class="com" span="4">{{clientInfo.mthAmtHouse}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="5">
				<span class="head-commom">家庭信息</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">婚姻状况</Col>
							<Col class="com" span="4">{{maritalStatus.maritalStatus}}</Col>
							<Col class="com" span="2">配偶姓名</Col>
							<Col class="com" span="4">{{maritalStatus.spouseName}}</Col>
							<Col class="com" span="2">配偶电话</Col>
							<Col class="com" span="4">{{maritalStatus.spouseTel}}</Col>
							<Col class="com" span="2">地址</Col>
							<Col class="com" span="4">{{maritalStatus.address}}</Col>
						</Row>
						<Row class="detail-table-row" v-for="items in familys" :key='items.relashionNo'>
							<Col class="com" span="2">关系</Col>
							<Col class="com" span="4">{{items.relashion}}</Col>
							<Col class="com" span="2">姓名</Col>
							<Col class="com" span="4">{{items.familyName}}</Col>
							<Col class="com" span="2">联系电话</Col>
							<Col class="com" span="4">{{items.familyTel}}</Col>
							<Col class="com" span="2">家庭地址</Col>
							<Col class="com" span="4">{{items.address}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="6">
				<span class="head-commom">其他联系人信息</span>
				<div slot="content" class="table-item">
					<Table border :columns="columns1" :data="data1"></Table>
				</div>
			</Panel>
		</Collapse>
	</div>
</template>

<script>
	export default {
		props: ['clientInfo', 'otherContactDtos','familyInfoDto'],
		data() {
			return {
				value1: '',
				columns1: [{
						title: '联系人姓名',
						key: 'otherContactMame'
					},
					{
						title: '关系',
						key: 'otherContactRelation'
					},
					{
						title: '电话',
						key: 'otherContactMobill'
					}
				],
				data1: [],
				familys:[],//  家庭信息基本栏,
				maritalStatus:{}, // 家庭信息 关系栏
			}
		},
		watch: {
			otherContactDtos(e, r) {
				if (e) {
					this.data1 = e
				}
			},
			familyInfoDto(e,r){
				if(e){
					this.familys = e.familys
					// this.maritalStatus = e.maritalStatus
					for(let i in e.maritalStatus){
						if(e.maritalStatus[i] == null || e.maritalStatus[i] == ''){
							this.$set(this.maritalStatus , i , '无')
						}else{
							this.$set(this.maritalStatus , i , e.maritalStatus[i])
						}
					}
				}
			}
		},
		methods: {
			init() {

			},
			created() {
				this.init()
			}

		}
	}
</script>

<style scoped lang="less">

</style>
