<template>
	<div>
		<div class="table-item">
			<Table border :columns="columns1" :data="rdata" @on-row-click="clickme"></Table>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import store from '../../../../store/index'
	export default {
		props: ['sanfangXX'],
		data() {
			return {
				columns1: [{
						title: '关系',
						key: 'relation'
					},
					{
						title: '联系方式',
						key: 'contactWay',
						render: (h, params) => {
							return h('div', [
								h('div', {

								}, params.row.mail),
								h('div', {

								}, params.row.num)
							])
						}
					},
					{
						title: '操作',
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
								}, '电话')
							])
						},
					}
				],
				rdata: []
			}
		},
		computed: {
			...mapState([
				'qnInfo'
			])
		},
		methods: { //青牛外呼
			WAmakeCall(list) {
				if(list.swiftNum == undefined){
					this.$Notice.error({
						title: '错误',
						desc: '信修数据有误',
						duration: 0
					})
				}else{
					const _ = this;
					if (_.qnInfo.login) {
						let datas = {
							swift_number: list.swiftNum,
							ckey: list.ckey,
						};
						_.HttpAjax('post', 'thirdCall', datas, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								this.WAmakeCall1(res.data.data)
							}
						});
					} else {
						_.$Modal.info({
							title: '提示',
							content: '您还没有登录电话系统账号，请先登录！'
						});
					}
				}
			},
			//青牛外呼
			WAmakeCall1(list) {
				const _ = this;
				if (_.qnInfo.login) {
					let disNumber;
					disNumber= parseInt(Math.random()*_.qnInfo.explicArr.length)
					var result = WA.extend.makeCall({
						outCallNumber: list,
						disNumber: _.qnInfo.explicArr[disNumber],
						callNumType:"aes",
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
				index.contactMobile = index.contactWay;
				index.contactName = index.relation;
				this.$emit('remarkPeo', index);
			},
		},
		watch: {
			sanfangXX(e, r) {
				if (e) {
					this.rdata = e
				}
			}
		},
	}
</script>

<style>
</style>
