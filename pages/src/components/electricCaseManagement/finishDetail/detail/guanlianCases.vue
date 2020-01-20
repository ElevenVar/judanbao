<template>
	<div class="table-item">
		<!-- 关联案件 -->
		<Table border :columns="columns1" :data="newdata"></Table>
	</div>

</template>

<script>
	import store from '../../../../store/index'
	export default {
		props: ['getRelationCase'],
		data() {
			return {
				loanContractNo: '', //传入的合同号
				columns1: [{
						title: '合同编号',
						minWidth: 120,
						align: 'center',
						key: 'loanContractNo'
					},
					{
						title: '产品类型',
						minWidth: 120,
						align: 'center',
						key: 'productTypeName'
					},
					{
						title: '产品名称',
						align: 'center',
						minWidth: 120,
						key: 'productName'
					},
					{
						title: '客户姓名',
						align: 'center',
						minWidth: 100,
						key: 'clientName'
					},
					{
						title: '证件号码',
						align: 'center',
						minWidth: 180,
						key: 'idCard'
					},
					{
						title: '借款金额',
						align: 'center',
						minWidth: 120,
						key: 'loanAmount'
					},
					{
						title: '合同期数',
						align: 'center',
						minWidth: 120,
						key: 'loanBill'
					},
					{
						title: '借款期限', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'HTqishu'
					},
					{
						title: '总服务费', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'ulgeName'
					},
					{
						title: '放款日期',
						align: 'center',
						minWidth: 120,
						key: 'fullScaleDate'
					},
					{
						title: '应还款日期', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'HTqishu'
					},
					{
						title: '逾期等级', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'ulgeName'
					},
					{
						title: '逾期天数',
						align: 'center',
						minWidth: 120,
						key: 'overdueDay'
					},
					{
						title: '逾期期数', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'ulgeName'
					},
					{
						title: '关系', //xxxx
						align: 'center',
						minWidth: 120,
						key: 'CPtype'
					}
				],
				newdata: [],
			}
		},		
		watch: {
			getRelationCase(e,r){
				if(e){
					this.newdata = e
				}
			}
// 			getRelationCase: {
// 				handler(newName, oldName) {
// 					if (newName) {
// 						this.newdata = newName
// 					}
// 				},
// 				deep: true,
// 				immediate: true
// 			}
		},
	}
</script>

<style scoped lang="less">


</style>
