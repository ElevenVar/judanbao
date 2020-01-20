<template>
	<div class='OnlineRetailersAddress'>
		<div class="table-item">
			<Table height="220" border :columns="columns1" :data="data3" @on-row-click="clickme"></Table>
			<div class="tabs-item">
				<div class="page-item" style="text-align: center;">
					<Page :total="OnlineRetailersAddress.length" :current=pageIndex show-total show-sizer @on-change="changePages"
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
		name: 'OnlineRetailersAddress', // 电商收货地址
		props: ['OnlineRetailersAddress'],
		computed: {
			...mapState([
				'qnInfo'
			])
		},
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				columns1: [
					{
					title: '收货人',
					key: 'receiveName',
				}, {
					title: '收货电话',
					key: 'mobilePhone',
				}, {
					title: '收货地址',
					key: 'address',
				},{
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
				 }],
				data: [],
				data3: []
			};
		},
		watch: {
			OnlineRetailersAddress(e, r) {
				if (e) {
					this.data = e
					this.data3 = e.slice(0, 10)
				}
			}
		},
		methods: {
			//页码改变
			changePages(pageIndex) {
				this.pageIndex = pageIndex
				this.GetData(pageIndex, this.pageSize)
			},
			//每页条数改变
			changePagesTotall(pageSize) {
				this.pageSize = pageSize
				this.GetData(this.pageIndex, pageSize)
			},
			//刷新按钮
			refresh() {
				this.pageIndex = 1
				this.pageSize = 10
				this.$emit('OnlineRetailersAddress')
			},
			//获取数据
			GetData(PageIndex, PageSize) {
				this.data3 = []
				this.data3 = this.data.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
			},
			//传递到父组件的自定义事件
			clickme(index) {
				console.log(index)
				index.contactMobile = index.mobilePhone;
				index.contactName = index.receiveName;
				this.$emit('remarkPeo', index);
			},
			//青牛外呼
			WAmakeCall(list) {
				const _ = this;
				if (_.qnInfo.login) {
					let disNumber;
					disNumber = parseInt(Math.random()*_.qnInfo.explicArr.length)
					var result = WA.extend.makeCall({
						outCallNumber: list.mobilePhone,
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
		},
		mounted() {
			// console.log(this.OnlineRetailersAddress)
		}
	}
</script>

<style>

</style>
