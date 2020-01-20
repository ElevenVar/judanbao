<template>
	<div class="detail-table">
		<Collapse v-model="value1" class="header-Collapse" accordion @on-change="getChangePan">
			<Panel name="Pane1">
				<span class="head-commom">客户信息</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">客户姓名</Col>
							<Col class="com" span="4">{{propUserINFO.clientName}}</Col>
							<Col class="com" span="2">虚拟账户余额</Col>
							<Col class="com" span="4">{{propUserINFO.amount =='无' ? 0: propUserINFO.amount}}</Col>
							<Col class="com" span="2">所属行业</Col>
							<Col class="com" span="4">{{propUserINFO.industry}}</Col>
							<Col class="com" span="2">QQ号</Col>
							<Col class="com" span="4">{{propUserINFO.qq}}</Col>
						</Row>

						<Row class="detail-table-row">
							<Col class="com" span="2">性别</Col>
							<Col class="com" span="4">{{propUserINFO.clientSex}}</Col>
							<Col class="com" span="2">婚姻状况</Col>
							<Col class="com" span="4">{{propUserINFO.marrySituation}}</Col>
							<Col class="com" span="2">任职部门</Col>
							<Col class="com" span="4">{{propUserINFO.department}}</Col>
							<Col class="com" span="2">微信号码</Col>
							<Col class="com" span="4">{{propUserINFO.weixin}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">年龄</Col>
							<Col class="com" span="4">{{propUserINFO.clientAge}}</Col>
							<Col class="com" span="2">教育程度</Col>
							<Col class="com" span="4">{{propUserINFO.educationType}}</Col>
							<Col class="com" span="2">担任职务</Col>
							<Col class="com" span="4">{{propUserINFO.companyOccupation}}</Col>
							<Col class="com" span="2">电子邮箱</Col>
							<Col class="com" span="4">{{propUserINFO.email}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">证件号码</Col>
							<Col class="com" span="4">{{propUserINFO.idCard}}</Col>
							<Col class="com" span="2">现居住地址</Col>
							<Col class="com" span="4">{{propUserINFO.nowAddr}}</Col>
							<Col class="com" span="2">工作年限(年)</Col>
							<Col class="com" span="4">{{propUserINFO.workYear}}</Col>
							<Col class="com" span="2">审核类型</Col>
							<Col class="com" span="4">{{propUserINFO.auditType}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">户籍地址</Col>
							<Col class="com" span="4">{{propUserINFO.clientAddr}}</Col>
							<Col class="com" span="2">住房性质</Col>
							<Col class="com" span="4">{{propUserINFO.houseType}}</Col>
							<Col class="com" span="2">单位名称</Col>
							<Col class="com" span="4">{{propUserINFO.companyName}}</Col>
							<Col class="com" span="2">单位地址</Col>
							<Col class="com" span="4">{{propUserINFO.companyAddr}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="Pane2">
				<span class="head-commom">借款信息</span>
				<div slot="content">
					<div class="detail-table-wrap">
						<Row class="detail-table-row">
							<Col class="com" span="2">贷款编号</Col>
							<Col class="com" span="4">{{propLoanINFO.loanContractNo}}</Col>
							<Col class="com" span="2">放款金额</Col>
							<Col class="com" span="4">{{propLoanINFO.grantLoanAmount == '无'? 0: propLoanINFO.grantLoanAmount}}</Col>
							<Col class="com" span="2">逾期总额</Col>
							<Col class="com" span="4">{{propLoanINFO.overdueTotal == '无'? 0: propLoanINFO.overdueTotal}}</Col>
							<Col class="com" span="2">分公司</Col>
							<Col class="com" span="4">{{propLoanINFO.branchId}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">合同金额</Col>
							<Col class="com" span="4">{{propLoanINFO.loanAmount=='无'? 0: propLoanINFO.loanAmount}}</Col>
							<Col class="com" span="2">放款日期</Col>
							<Col class="com" span="4">{{propLoanINFO.payDate}}</Col>
							<Col class="com" span="2">逾期期数</Col>
							<Col class="com" span="4">{{propLoanINFO.overdueBill}}</Col>
							<Col class="com" span="2">首次还款日</Col>
							<Col class="com" span="4">{{propLoanINFO.firstMonthPayDate}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">合同期数</Col>
							<Col class="com" span="4">{{propLoanINFO.loanBill}}</Col>
							<Col class="com" span="2">放款渠道</Col>
							<Col class="com" span="4">{{propLoanINFO.payChannel}}</Col>
							<Col class="com" span="2">逾期天数</Col>
							<Col class="com" span="4">{{propLoanINFO.overdueDay}}</Col>
							<Col class="com" span="2">末次还款日</Col>
							<Col class="com" span="4">{{propLoanINFO.lastMonthPayDate}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">注册时间</Col>
							<Col class="com" span="4">{{propLoanINFO.cgRegisterDate}}</Col>
							<Col class="com" span="2">月还款金额</Col>
							<Col class="com" span="4">{{propLoanINFO.monthRtnAmount == '无'? 0: propLoanINFO.monthRtnAmount}}</Col>
							<Col class="com" span="2">逾期等级</Col>
							<Col class="com" span="4">{{propLoanINFO.overdueGrade}}</Col>
							<Col class="com" span="2">还款银行</Col>
							<Col class="com" span="4">{{propLoanINFO.repayOpenBank}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">产品类型</Col>
							<Col class="com" span="4">{{propLoanINFO.productType}}</Col>
							<Col class="com" span="2">月还款日</Col>
							<Col class="com" span="4">{{propLoanINFO.monthPayDate}}</Col>
							<Col class="com" span="2">总罚息</Col>
							<Col class="com" span="4">{{propLoanINFO.overdueAmount == '无' ? 0: propLoanINFO.overdueAmount}}</Col>
							<Col class="com" span="2">银行账号</Col>
							<Col class="com" span="4">{{propLoanINFO.repayAccountNo}}</Col>
						</Row>
						<Row class="detail-table-row">
							<Col class="com" span="2">贷款利率</Col>
							<Col class="com" span="4">{{propLoanINFO.loanRate}}</Col>
							<Col class="com" span="2">已还期数</Col>
							<Col class="com" span="4">{{propLoanINFO.payTerm}}</Col>
							<Col class="com" span="2">剩余本金</Col>
							<Col class="com" span="4">{{propLoanINFO.overplusCorpus =='无'? 0: propLoanINFO.overplusCorpus}}</Col>
							<Col class="com" span="2">主体</Col>
							<Col class="com" span="4">{{propLoanINFO.mainBody}}</Col>
						</Row>
					</div>
				</div>
			</Panel>
			<Panel name="Pane3">
				<span class="head-commom">逾期信息</span>
				<div slot="content" class="table-item">
					<Table border :columns="columns1" :data="data1"></Table>
				</div>
			</Panel>
		</Collapse>
	</div>
</template>

<script>
	import store from '../../../../store/index'
	export default {
		props: ['loanContractNo'],
		data() {
			return {
				htbh: '', //合同编号
				value1: 'Pane3',
				columns1: [{
						title: '合同编号',
						minWidth: 150,
						key: 'loanContractNo',
						render: (h, params) => {
							return h('span', {
								style: {
									color: '#33cde5',
									cursor: 'pointer'
								},
								attrs: {
									style: "text-decoration:underline",
								},
								on: {
									click: () => {
										this.setStore('opreate', {
											path: 'detailImport',
											allINFO: params.row,
											showpanl: 'privite'
										})
										this.$router.push({
											path: 'importantInfo'
										})
									},

								},
							}, params.row.loanContractNo)
						}
					},
					{
						title: '放款金额',
						minWidth: 100,
						key: 'loanAmount'
					},
					{
						title: '合同期数',
						minWidth: 120,
						key: 'loanBill'
					},
					{
						title: '合同生效期',
						minWidth: 120,
						key: 'fullScaleDate'
					},
					{
						title: '产品类型',
						minWidth: 120,
						key: 'productTypeName'
					},
					{
						title: '月还款金额',
						minWidth: 120,
						key: 'monthRtnAmount'
					},
					{
						title: '还款日',
						minWidth: 120,
						key: 'monthPayDate'
					},
					{
						title: '逾期天数',
						minWidth: 100,
						key: 'overdueDays'
					},
					{
						title: '逾期总额',
						minWidth: 120,
						key: 'duetoCain'
					},
					{
						title: '逾期期数',
						minWidth: 100,
						key: 'billTerm'
					},
					{
						title: '罚息',
						minWidth: 120,
						key: 'overdueAmount'
					},
					{
						title: '还款银行',
						minWidth: 120,
						key: 'repayOpenBank'
					},
					{
						title: '还款账号',
						minWidth: 170,
						key: 'repayAccountNo'
					}
				],
				data1: [],
				propUserINFO: {},
				propLoanINFO: {},
				overduedata: {}
			}
		},
		methods: {
			init() {
				this.getOverdueCasebByLoanContractNo();
				this.getClientInformation();
			},
			// 客户信息查询
			getClientInformation() {
				if (JSON.stringify(this.propUserINFO) == '{}')
					//客户信息
					this.HttpAjax('post', 'getClientInformation', {
						loanContractNo: this.loanContractNo
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res.data.status == '200') {
							let propUserINFO= res.data.data.clientInfo
							for(let i in propUserINFO){
								if(propUserINFO[i] == null){
									this.$set(this.propUserINFO , i ,'无')
								}else{
									this.$set(this.propUserINFO , i , propUserINFO[i])
								}
							}
							// this.propUserINFO = res.data.data.clientInfo; //客户信息对象
						}
					});
			},
			//借款信息查询
			getImportantInformation() {
				if (JSON.stringify(this.propLoanINFO) == '{}') {
					//借款信息
					this.HttpAjax('post', 'getImportantInformation', {// getImportantInformation
						loanContractNo: this.loanContractNo
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res.data.status == '200') {
							for(let i in res.data.data.loanInfo){
								if(res.data.data.loanInfo[i] == null){
									this.$set(this.propLoanINFO, i , '无')
								}else {
									this.$set(this.propLoanINFO, i , res.data.data.loanInfo[i])
								}
							}
							// this.propLoanINFO = res.data.data.loanInfo; //借款信息
						}
						// console.log(this.propLoanINFO)
					});
				}
			},
			//逾期信息查询
			getOverdueCasebByLoanContractNo() {
				if (this.data1.length <= 0) {
					//逾期信息
					this.HttpAjax('post', 'getOverdueCasebByLoanContractNo', {
						loanContractNo: this.loanContractNo
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res.data.status == '200') {
							this.data1 = res.data.data;
						}
					});
				}
			},
			// 折叠环境点击事件
			getChangePan(val) {
				if (val[0] == 'Pane1') {
					//客户信息
					this.getClientInformation()
				} else if (val[0] == 'Pane2') {
					//借款信息
					this.getImportantInformation();
				} else if (val[0] == 'Pane3') {
					//逾期信息
					this.getOverdueCasebByLoanContractNo();
				}
			}

		},
		created() {
			this.init();
		}

	}
</script>

<style scoped lang="less">

</style>
