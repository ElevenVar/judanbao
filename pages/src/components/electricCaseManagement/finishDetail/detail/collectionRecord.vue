<template>
	<div class="detail-table">

		<Collapse v-model="value1" class="header-Collapse">
			<Panel name="Pane1">
				<span class="head-commom">催收备注</span>
				<div slot="content">
					<!-- columnscs -->
					<div class="table-item">
						<Table height="260" border :columns="columnscs" :data="Rdatacs"></Table>
					</div>
				</div>
			</Panel>
			<Panel name="Pane2">
				<span class="head-commom">停催记录</span>
				<div slot="content">
					<div class="table-item">
						<Table height="260" border :columns="columnstc" :data="Rdatatc"></Table>
					</div>
				</div>
			</Panel>
			<Panel name="Pane3">
				<span class="head-commom">停催激活记录</span>
				<div slot="content">
					<div class="table-item">
						<Table height="260" border :columns="columnsTCJH" :data="dataTCJH"></Table>
					</div>
				</div>
			</Panel>
		</Collapse>
	</div>
</template>

<script>
	export default {
		props: ['datacs', 'datatc', 'dataTCJHJL'],
		data() {
			return {
				value1: '',
				Rdatacs: [],
				Rdatatc: [],
				columnscs: [{
						title: '序号',
						type: 'index',
						minWidth: 50,
					},
					{
						title: '创建时间',
						minWidth: 120,
						key: 'createTime'
					},
					{
						title: '联络人',
						minWidth: 120,
						key: 'contactPerson'
					},
					{
						title: '联络号码',
						minWidth: 120,
						key: 'contactNumber'
					},
					{
						title: '电话码',
						minWidth: 120,
						key: 'actionName'
					},
					{
						title: '行动码',
						minWidth: 120,
						key: 'resultName'
					},
					{
						title: '创建人',
						minWidth: 120,
						key: 'creator'
					},
					{
						title: '备注',
						minWidth: 120,
						key: 'remark'
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
				columnstc: [

					{
						title: '停催申请时间',
						key: 'applicationTime'
					},
					{
						title: '停催申请人',
						key: 'applicantor'
					},
					{
						title: '停催原因',
						key: 'stopCause'
					},
					{
						title: '停催备注', //xxxxx
						key: 'stopRemarks'
					},
					{
						title: '停催审核状态', //xxxxxx
						key: 'status'
					},
					{
						title: '停催类型',
						key: 'stopType'
					},
					{
						title: '停催开始时间',
						key: 'stopBeginTime'
					}
				],
				columnsTCJH: [{
						title: '停催申请时间',
						key: 'applicationTime'
					},
					{
						title: '停催申请人',
						key: 'applicantor'
					},
					{
						title: '停催激活时间',
						key: 'activeTime'
					},
					{
						title: '停催激活人',
						key: 'activer'
					},
					{
						title: '停催激活原因',
						key: 'activeCause'
					},
					{
						title: '停催激活备注',
						key: 'activeRemark'
					}
				],
				dataTCJH: []

			}
		},

		methods: {


		},
		watch: {
			datatc(e, r) {
				if (e) {
					this.Rdatatc = e
				}
			},
			datacs(e, r) {
				if (e) {
					this.Rdatacs = e
				}
			},
			dataTCJHJL(e, r) {
				if (e) {
					this.dataTCJH = e
				}
			},
		},
	}
</script>

<style scoped lang="less">

</style>
