<template>
	<div class="contactInformation">
		<div class="table-item">
			<Table highlight-row border :columns="columns1" :data="contactdata" @on-row-click="clickme"></Table>
		</div>

		<!-- 公共page分页类 -->
		<div class="page-item" :class="showotbn?'betweenAside':'flexRight'">
			<div v-if="showotbn">
				<Button v-if="showPeople" :disabled="disabledxinzen" type="primary" @click="addPeo">新增联系人</Button>
			</div>
			<div>
				<Page placement="top" :total="listpage.pageTotal" :page-size="listpage.pageSize" @on-page-size-change="jumppage"
				 @on-change="jump" show-total show-elevator show-sizer></Page>
			</div>
		</div>


		<!--Modal----新增联系人弹出框-->
		<Modal v-model="addPeople" :mask="true" :draggable="true" @on-cancel="closeAddPeo('addPeopleModel')" :scrollable="true"
		 :loading="loading" title="新增联系人">
			<div class="from-item">
				<Form ref="addPeopleModel" :model="addPeopleModel" :rules="ruleAddPeople" label-position="right" :label-width="90"
				 inline>
					<FormItem label="姓名" prop="addName" style="width: 100%;">
						<Input placeholder="请输入姓名！" v-model="addPeopleModel.addName" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="关系" prop="addRelation" style="width: 100%;">
						<Select v-model="addPeopleModel.addRelation" @on-open-change="openChange" @on-change="changeOption" placeholder="请选择关系！"
						 size="large" :maxlength="60">
							<Option v-for="item in relation" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					<FormItem label="联系电话" prop="addPhone" style="width: 100%;">
						<Input placeholder="请输入联系电话！" v-model="addPeopleModel.addPhone" type="text" size="large"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="addPeopleCancel('addPeopleModel')">取消</Button>
				<Button type="primary" size="large" @click="addPeopleSave('addPeopleModel')">确定</Button>
			</div>
		</Modal>
	</div>

</template>

<script>
	import store from '../../../../store/index'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {

		props: ['contactINFO', 'loanContractNo', 'sessionBtn'],
		data() {
			return {
				disabledAdd: false,
				disabledPhone: false,
				disabledxinzen: false,
				hiddenBtnSion: '',
				listpage: {
					pageTotal: 0, //数据总条数
					pageSize: 10, //每页条数
					totalye: 0, //总共多少页
				},
				htbh: '', //合同编号
				contactdata: [],
				loading: true,
				showPeople: true,
				addPeople: false, //新增联系人
				showotbn: true,

				relation: [], //联系人类型
				//新增联系人 传递给服务器的数据
				addPeopleModel: {
					addName: '', //新增姓名
					addRelation: '', //新增关系
					addPhone: '', //新增联系电话
					// addIDcard:'',  //新增身份证
					options: '', //下拉选中项
				},
				ruleAddPeople: {
					addName: [{
						required: true,
						message: '姓名不能为空',
						trigger: 'blur'
					}],
					addRelation: [{
						required: true,
						message: '关系不能为空',
						trigger: 'change'
					}],
					addPhone: [{
							required: true,
							message: '电话不能为空',
							trigger: 'blur'
						},
						{
							required: true,
							max: 11,
							message: '最大长度为11',
							trigger: 'blur'
						},
					],
				},
				columns1: [{
						title: '姓名',
						minWidth: 100,
						align: 'center',
						key: 'contactName'
					},
					{
						title: '关系',
						minWidth: 100,
						align: 'center',
						key: 'contactType'
					},
					{
						title: '电话',
						minWidth: 120,
						align: 'center',
						key: 'contactMobile'
					},
					{
						title: '最近电话码',
						minWidth: 120,
						align: 'center',
						key: 'lastCallActionNo'
					}, 
					{
						title: '数据来源',
						key: 'dataSource',
						minWidth: 100,
						render: (h, params) => {
							return h('div', [
								h('span',{
									
								}, (params.row.dataSource == null || params.row.dataSource == '')? '聚担保': params.row.dataSource)
							])
						}
					},
					{
						title: '操作',
						align: 'center',
						minWidth: 100,
						render: (h, params) => {
							let hiddenBtnSion = this.getStore('opreateBtn').hiddenBtn
							if (hiddenBtnSion) {
								return;
							} else {
								if (params.row.dataSources == 1) {
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
										h('Icon', {
											props: {
												type: 'ios-trash-outline',
											},
											style: {
												color: 'ios-trash',
												marginLeft: '5px',
												fontSize: '25px'
											},
											class: 'cotectPhone',
											on: {
												click: () => {
													this.DeleteCall(params.row);
												}
											}
										}, '删除')
									])
								} else {
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

						}
					}
				],

			}
		},
		computed: {
			...mapState([
				'qnInfo'
			])
		},
		methods: {
			btnSTATUS(sta) {
				if (sta) {
					this.disabledxinzen = true
				} else {
					this.disabledxinzen = false
				}
			},
			closeAddPeo(name) {
				this.disabledxinzen = false
				this.$refs[name].resetFields();
				this.$emit('closeStopadd', 'lianxiren');
			},
			// 新增按钮点击事件
			addPeo() {
				this.addPeople = true
				this.$emit('addBtnPeo', 'alldis');
				this.disabledxinzen = true
			},
			addPeopleCancel(name) {
				this.addPeople = false
				this.$refs[name].resetFields();
				this.$emit('addBtnPeo');
				this.disabledxinzen = false
			},
			//新增联系人弹窗 确认按钮点击事件
			addPeopleSave(name) {
				const t = this
				let rdata = {
					dataSources: '1', // 判断是否可以删除
					loanContractNo: this.loanContractNo,
					contactName: t.addPeopleModel.addName, //姓名
					contactRelation: t.addPeopleModel.options, //关系 contactType
					contactMobile: t.addPeopleModel.addPhone, //电话
					contactIdcard: t.addPeopleModel.addIDcard, //身份证

				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'saveContactInfo', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.addPeople = false
								this.HttpAjax('post', 'getContactInformation', {
									loanContractNo: this.loanContractNo
								}, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if (res.data.status == '200') {
										this.contactdata = res.data.data.data;
										this.addPeopleCancel('addPeopleModel')
										this.$emit('addBtnPeo');
										this.disabledxinzen = false
										this.init();
									}
								});
							}
						});
					}
				})

			},
			changeOption(name) {
				this.addPeopleModel.options = name
			},

			openChange(name) {
				if (name) {
					let len = this.relation
					if (len > 0) {
						return;
					} else {
						this.HttpAjax('post', 'getContactInfoCfg', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.relation = res.data.data
							}
						});
					}
				}
			},
			clickme(index) { //传递到父组件的自定义事件
				this.$emit('remarkPeo', index);
			},
			init(pageIndex, pageSize) {
				//如果其他页面路由有showPeo=="showContact"这个参数就不显示新增联系人按钮
				let showPeo = this.$route.query.showPeo
				if (showPeo && showPeo == "showContact") {
					this.showPeople = false;
				} else {
					this.showPeople = true;
				}
				let reData = {
					loanContractNo: this.loanContractNo,
					pageSize: pageSize || 10,
					pageIndex: pageIndex || 1
				}
				this.HttpAjax('post', 'getContactInformation', reData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.contactdata = res.data.data.data
						let total = res.data.data.dataCount; //数据总条数
						let pageSize = res.data.data.pageSize; //每页条数
						this.listpage.pageTotal = total
						this.listpage.totalye = Math.ceil(total / pageSize) //总共多少页
					}
				});
			},
			//页码改变的回调
			jump(a) {
				this.current = a
				let cur = this.current
				let size = this.pageSize
				this.init(cur, size)
			},
			//切换每页条数
			jumppage(b) {
				this.pageSize = b
				let cur = this.current
				let size = this.pageSize
				this.init(cur, size)

			},
			//青牛外呼
			WAmakeCall(list) {
				const _ = this;
				if (_.qnInfo.login) {
					let disNumber;
					disNumber= parseInt(Math.random()*_.qnInfo.explicArr.length)
					var result = WA.extend.makeCall({
						outCallNumber: list.contactMobile,
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
			// 删除联系人
			DeleteCall(list) {
				const _ = this;
				_.$Modal.confirm({
					title: '删除用户',
					content: '确定删除 ' + list.contactName + ' 这个联系人吗？',
					onOk: () => {
						_.HttpAjax('post', 'delContactInfo', {
							contractId: list.idKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '删除联系人成功！',
									duration: 2
								});
								this.HttpAjax('post', 'getContactInformation', {
									loanContractNo: this.loanContractNo
								}, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if (res.data.status == '200') {
										this.contactdata = res.data.data.data;
									}
								});
							}
						});
					}
				});
			},
		},
		watch: {
			contactINFO(e, r) {
				if (e) {
					this.contactdata = e;
				}
			},
			loanContractNo: {
				handler(newName, oldName) {
					if (newName) {
						this.htbh = newName
					}
				},
				immediate: true
			},
			sessionBtn: {
				handler(newName, oldName) {
					if (newName) {
						this.hiddenBtnSion = newName
					}
				},
				immediate: true
			},
		},
		created() {
			this.init();
			//如果其他页面路由有hiddenBtn=='private'这个参数就把新增联系人按钮和操作按钮还有重置提交按钮隐藏
			let hiddenBtnSion = this.getStore('opreateBtn').hiddenBtn
			let allShowButton = this.getStore('opreateBtn').allShowBtn
			//if(this.hiddenBtnSion&&this.hiddenBtnSion=='private'){
			if (hiddenBtnSion && hiddenBtnSion == 'private') {
				this.showotbn = false
			}
			if (allShowButton && allShowButton == 'private') {
				this.showotbn = false
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.contactInformation {
		.betweenAside {
			display: flex;
			justify-content: space-between;
		}

		.flexRight {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
