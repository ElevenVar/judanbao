<template>
	<div class='operatorcallrecord'>
		<div class="table-item">
			<Table height="220" border :columns="columns1" :data="data3" @on-row-click="clickme"></Table>
			<div class="tabs-item">
				<div class="page-item" style="text-align: center;">
					<Page :total="operatorCall.length" :current=pageIndex show-total show-sizer @on-change="changePages"
					 @on-page-size-change="changePagesTotall"></Page>
					<Icon class='zhang1' type="ios-refresh" style="font-size: 31px" @click="refresh" />
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
		name: 'operatorcallrecord', // 运营商通话记录
		props: ['operatorCall'],
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
						title: '号码',
						key: 'log_phone',
					},{
						title : '互联网表示',
						key : 'phone_info',
					},{
						title: '类别标签',
						key : 'phone_label',
					},{
						title:'号码归属',
						key: 'phone_location'
					},{
						title: '主叫/次',
						key: 'call_cnt'
					},{
						title: '被叫/次',
						key: 'called_cnt',
					},{
						title: '联系时间/分',
						key: 'talk_seconds',
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
				 }
				],
				data: [],
				data3: []
			}
		},
		watch: {
			operatorCall(e, r) {
				if (e) {
					this.data = e
					this.data3 = e.slice(0, 10)
				}
			}
		},
		methods: {
			// 页码切换
			changePages(name) {
				this.pageIndex = name
				this.GetData(name, this.pageSize)
			},
			// 每页数据条数切换
			changePagesTotall(name) {
				this.pageSize = name
				this.GetData(this.pageIndex, name)
			},
			// 刷新
			refresh() {
				this.pageIndex = 1
				this.pageSize = 10
				this.$emit('operatorCall')
			},
			//获取数据
			GetData(PageIndex, PageSize) {
				this.data3 = []
				this.data3 = this.data.slice((PageIndex - 1) * PageSize, PageIndex * PageSize)
			},
			//传递到父组件的自定义事件
			clickme(index) {
				index.contactMobile = index.log_phone; //号码
				index.contactName = index.phone_info; //姓名
				this.$emit('remarkPeo', index);
			},
			//青牛外呼
			WAmakeCall(list) {
				const _ = this;
				if (_.qnInfo.login) {
					let disNumber;
					disNumber = parseInt(Math.random()*_.qnInfo.explicArr.length)
					var result = WA.extend.makeCall({
						outCallNumber: list.contactMobile || list.log_phone,
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
		created() {
			// console.log(this.operatorCall)
		}
	}
</script>

<style>
</style>
