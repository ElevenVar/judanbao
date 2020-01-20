<template>
	<div class="APPCallRecord">
		<!--<div>{{datas}}</div>-->
		<div class="table-item">
			<Table height="220" border :columns="columns1" :data="data3" @on-row-click="clickme"></Table>
			<div class="tabs-item">
				<div class="page-item" style="text-align: center;">
					<Page :total="callRecordINFO.length" :current=pageIndex show-total show-sizer @on-change="changePages"
					 @on-page-size-change="changePagesTotall"></Page>
					<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../../../store/index'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['callRecordINFO'],
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				columns1: [{
						title: '姓名',
						key: 'callName'
					},
					{
						title: '电话',
						key: 'callMobile'
					},
					{
						title: '拨打时长',
						key: 'callLong'
					},
					{
						title: '拨打时间',
						key: 'callDate'
					},
					{
						title: '通话类型',
						key: 'callType',
					},
					{
						title: '操作',
						align: 'center',
						minWidth: 50,
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										size: 'small',
										type: 'ios-call'
									},
									style: {
										cursor: 'pointer'
									},
									class: 'cotectPhone',
									on: {
										click: () => {
											this.WAmakeCall(params.row);
										}
									}
								}, '电话'),
							])
						}
					}
				],
				data2: [],
				data3: [],
			}
		},
		computed: {
			...mapState([
				'qnInfo'
			])
		},
		watch: {
			callRecordINFO(e, r) {
				if (e) {
					this.data2 = e
					this.data3 = e.slice(0, 10)
				}
			}
		},

		methods: {
			init() {
				this.$nextTick(() => {
					this.data2 = this.datas;
				})
			},
			// APP通话记录 翻页-->第几页
			changePages(name) {
				this.pageIndex = name
				this.GetData(name, this.pageSize)
			},
			// APP通话记录 每一页显示多少条数据
			changePagesTotall(name) {
				this.pageSize = name
				this.GetData(this.pageIndex, name)
			},
			// APP通话记录 刷新
			refresh() {
				this.pageIndex = 1
				this.pageSize = 10
				this.$emit('OneAgainGetData')
			},
			//获取数据
			GetData(PageIndex, PageSize) {
				this.data3 = []
				this.data3 = this.data2.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
			},
			//青牛外呼
			WAmakeCall(list) {
				const _ = this;
				if (_.qnInfo.login) {
					let disNumber;
					disNumber = parseInt(Math.random()*_.qnInfo.explicArr.length)
					var result = WA.extend.makeCall({
						outCallNumber: list.callMobile,
						disNumber: _.qnInfo.explicArr[disNumber]
					});
					if (result.code == -1) {
						_.$Notice.error({
							title: '外呼失败！',
							desc: result.msg,
							duration: 1
						})
					}
				} else {
					_.$Modal.info({
						title: '提示',
						content: '您还没有登录电话系统账号，请先登录！'
					})
				}

			},
			clickme(index) { //传递到父组件的自定义事件
				console.log(index)
				index.contactMobile = index.callMobile;
				index.contactName = index.callName;
				this.$emit('remarkPeo', index);
			},
		},
		mounted() {
			// console.log(this.data2)
		}

	}
</script>

<style>
</style>
