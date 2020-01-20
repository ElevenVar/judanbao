<template>
	<div class="noticeManagement">
		<!-- 公共Header类 -->
		<Collapse class="header-Collapse">
			<Panel>
				<span class="head-commom">通知管理</span>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
<!-- 			<div class="add_btn" v-on:click.prevent="add_btn" :disabled="showModal||details_modal">
				<Button v-if="this.getAuth('08000010604')" style="height:30px;" :disabled=showModal||details_modal>新增</Button>
			</div> -->
			<Tabs value="1" type="card" @on-click="Change_Tab">
				<TabPane label="短信模板" name="1">
					<!-- 公共table类-->
					<div class="table-item">
						<Table height='396' border :stripe="true" :columns="ShortMessageTitle" :data="ShortMessageInfo"></Table>
					</div>
					<!-- 公共page分页类  show-elevator-->
					<div class="page-item">
						<Page placement="top" :total="totalPage" :page-size="10" :current="ShortMessagePage" show-total show-sizer
						 @on-page-size-change="change_size" @on-change="change_page"></Page>
						<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
						<!--<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">34</span>页</span>-->
					</div>
				</TabPane>
				<TabPane label="信函模板" name="3" disabled>
					<!-- 公共table类-->
					<div class="table-item">
						<Table border :stripe="true" :columns="LetterMessageTitle" :data="LetterMessageInfo"></Table>
					</div>
					<!-- 公共page分页类 -->
					<div class="page-item">
						<Page placement="top" :total="totalPage" :page-size="10" :current="1" show-total show-sizer @on-change="change_page"
						 @on-page-size-change="change_size"></Page>
					</div>
				</TabPane>
			</Tabs>
		</div>
		<!--新增通知管理-->
		<Modal v-model="showModal" draggable title="通知管理">
			<!-- 公共form表单类  :rules="ruleValidate"-->
			<div class="from-item">
				<Form label-position="right" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90"
				 inline>
					<FormItem label="模板名称" prop="modelName">
						<Input type="text" placeholder="请输入模板名称" style="width: 304px" size="large" v-model="formValidate.modelName"
						 :maxlength="maxLength_name"></Input>
					</FormItem>
					<FormItem label="模板类型" prop="modelType">
						<Select v-model="formValidate.modelType" placeholder="请选择模板类型" style="width: 100px" size="large">
							<Option value='1'>短信模板</Option>
							<!--<Option value='2'>邮件模板</Option>-->
							<!--<Option value='3'>信函模板</Option>-->
						</Select>
					</FormItem>
					<FormItem label="业务线" prop="serviceLine">
						<Select v-model="formValidate.serviceLine" placeholder="请选择业务线" style="width: 100px" size="large">
							<Option value='XJ'>消金</Option>
							<Option value='XD'>信贷</Option>
							<Option value='/'>/</Option>
						</Select>
					</FormItem>
					<FormItem label="产品类型" prop="productType">
						<Select v-model="formValidate.productType" placeholder="请选择产品类型" style="width: 100px" size="large">
							<Option value='1101'>品质花</Option>
							<Option value='0000'>其他</Option>
							<Option value='/'>/</Option>
						</Select>
					</FormItem>
					<FormItem label="逾期等级" prop="overdueStg">
						<Select v-model="formValidate.overdueStg" placeholder="请选择逾期等级！" style="width: 100px" size="large">
							<Option value='M0'>M0</Option>
							<Option value='M1'>M1</Option>
							<Option value='M2'>M2</Option>
							<Option value='M3'>M3</Option>
							<Option value='M4'>M4</Option>
							<Option value='M5'>M5</Option>
							<Option value='M6'>M6</Option>
							<Option value='M7'>M7</Option>
							<Option value='M7+'>M7+</Option>
							<Option value='/'>/</Option>
						</Select>
					</FormItem>
					<FormItem label="发送方式" prop="sendType">
						<Select v-model="formValidate.sendType" placeholder="请选择发送方式！" style="width: 304px" size="large">
							<Option value='0'>手动</Option>
							<Option value='1'>自动</Option>
						</Select>
					</FormItem>
					<FormItem label="特权包" prop="isSpecial" v-show="formValidate.sendType ==1">
						<Select v-model="formValidate.isSpecial" placeholder="请选择特权包！" style="width: 100px" size="large">
							<Option value=1>有</Option>
							<Option value=2>无</Option>
							<Option value=3>/</Option>
						</Select>
					</FormItem>
					<FormItem label="时间节点" prop="timeNode" v-show="formValidate.sendType ==1">
						<Select v-model="formValidate.timeNode" placeholder="请选择时间节点！" id="special" style="width: 100px;" size="large">
							<Option value=1>T+1</Option>
							<Option value=2>T+2</Option>
							<Option value=3>T+3</Option>
							<Option value=4>T+4</Option>
							<Option value=5>T+5</Option>
							<Option value=6>T+6</Option>
						</Select>
					</FormItem>
					<FormItem label="短信内容" prop="content">
						<Input v-model="formValidate.content" placeholder="输入模板内容" type="textarea" :autosize="{minRows: 5,maxRows: 6}"
						 style="width:304px;" :maxlength="maxLength_content"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="hidden_modal">取消</Button>
				<Button type="primary" size="large" @click="Submit1('formValidate')">确定</Button>
			</div>
		</Modal>
		<!-- 通知管理详情 -->
		<Modal v-model="details_modal" title="通知管理详情" draggable footer-hide class-name="Message">
			<div class="details_content">
				<ul>
					<li>
						<span class="s_left">模板名称</span>
						<p class="s_right">{{details_Info.modelName}}</p>
					</li>
					<li>
						<span class="s_left">模板类型</span>
						<span class="s_right">{{details_Info.modelType}}</span>
						<span class="s_right" v-if="details_Info.modelType ==='1'">短信模板</span>
						<span class="s_right" v-if="details_Info.modelType ==='2'">邮件模板</span>
						<span class="s_right" v-if="details_Info.modelType ==='3'">信函模板</span>
					</li>
					<li>
						<span class="s_left">业务线</span>
						<!--<span class="s_right">{{details_Info.serviceLine}}</span>-->
						<span class="s_right" v-if="details_Info.serviceLine ==='XJ'">消金</span>
						<span class="s_right" v-if="details_Info.serviceLine ==='XD'">信贷</span>
					</li>
					<li>
						<span class="s_left">产品类型</span>
						<!--<span class="s_right">{{details_Info.productType}}</span>-->
						<span class="s_right" v-if="details_Info.productType ==='1101'">品质花</span>
						<span class="s_right" v-if="details_Info.productType ==='0000'">其他</span>
					</li>
					<li>
						<span class="s_left">逾期等级</span>
						<span class="s_right">{{details_Info.overdueStg}}</span>
					</li>
					<li>
						<span class="s_left">发送方式</span>
						<!--<span class="s_right">{{details_Info.sendType}}</span>-->
						<span class="s_right" v-if="details_Info.sendType ==='1'">自动</span>
						<span class="s_right" v-if="details_Info.sendType ==='0'">手动</span>
					</li>
					<li>
						<span class="s_left">特权包</span>
						<!--<span class="s_right">{{details_Info.isSpecial}}</span>-->
						<span class="s_right" v-if="details_Info.isSpecial ==='1'">有特权包</span>
						<span class="s_right" v-if="details_Info.isSpecial ==='2'">无特权包</span>
					</li>
					<li>
						<span class="s_left">时间节点</span>
						<span class="s_right">{{details_Info.timeNode}}</span>
					</li>
					<li style="height:70px;">
						<span class="s_left">短信内容</span>
						<span class="last_s_right">{{details_Info.content}}</span>
					</li>
				</ul>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	export default {
		name: "noticeManagement",
		data() {
			return {
				maxLength_name: 20, // 名称
				maxLength_content: 300, // 内容的字数限制
				showModal: false, // 判断弹窗是否显示
				details_modal: false, // 详情按钮点击显示的弹窗
				editInfos: false, // 编辑
				details_Info: {}, // 详细信息渲染
				totalPage: 0, // 总页数
				thisPage: 1, //记录当前是第几页
				ShortMessagePage: 0, // 短信模板 第几页
				ShortMessageTitle: [
					{title: '序号',minWidth: 60,type: 'index'},
					{title: '模板名称',minWidth: 100,key: 'modelName'},
					{title: '业务线',minWidth: 100,key: 'serviceLine',
						render: (h, params) => {
							return h('span', [
								h('span', {}, params.row.serviceLine === 'XJ' ? '消金' : '信贷')
							])
						}
					},
					{
						title: '产品类型',
						minWidth: 100,
						key: 'productType',
						render: (h, params) => {
							if (params.row.productType === '1101') {
								return h('span', [
									h('span', {}, '品质花')
								])
							} else if (params.row.productType === '0000') {
								return h('span', [
									h('span', {}, '其他')
								])
							} else {
								return h('span', [
									h('span', {}, '/')
								])
							}
						}
					},
					{title: '发送方式',minWidth: 100,key: 'sendType',
						render: (h, params) => {
							return h('span', [
								h('span', {}, params.row.sendType === '1' ? '自动' : '手动')
							])
						}
					},
					{title: '特权包',minWidth: 100,key: 'isSpecial',
						render: (h, params) => {
							return h('span', [
								h('span', {}, params.row.isSpecial === '1' ? '是' : '否')
							])
						}
					},
					{title: '逾期等级',minWidth: 100,key: 'overdueStg'},
					{title: '时间节点',minWidth: 100,key: 'timeNode'},
					{title: '操作',minWidth: 90,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
									},
									style:{
										display:this.getAuth('08000010603') ? 'inline-block' :'none'
									},
									on: {
										click: ()=>{
											this.details_informManage(params.row)
										}
									}
								},'详情'),
// 								h('Button', {
// 									props: {
// 										size: 'small',
// 										type: 'info',
// 										disabled: this.showModal || this.details_modal,
// 									},
// 									style:{
// 										display:this.getAuth('08000010602') ? 'inline-block' :'none',
// 										marginRight:'5px'
// 									},
// 									on: {
// 										click: () => {
// 											this.Dell_informManage(params.row.informModelId)
// 										}
// 									}
// 								}, '删除'),
// 								h('Dropdown', {
// 									props: {
// 										trigger: 'click',
// 										placement: "bottom-end"
// 									},
// 									style:{
// 										display:this.getAuth('08000010601') || this.getAuth('08000010603')  ? 'inline-block' :'none',
// 									},
// 									on: {
// 										'on-click': (name) => {
// 											if (name == '1') {
// 												this.edit_informManage(params.row)
// 											} else if (name == '2') {
// 												this.details_informManage(params.row)
// 											}
// 										}
// 									}
// 								}, [
// 									h('Button', {
// 										props: {
// 											size: 'small',
// 											type: 'info',
// 											disabled: this.showModal || this.details_modal,
// 										}
// 									}, [
// 										h('span', '更多'),
// 										h('Icon', {
// 											props: {
// 												type: 'ios-arrow-down',
// 											},
// 											style: {
// 												marginLeft: '5px'
// 											}
// 										})
// 									]),
// 									h('DropdownMenu', {
// 										slot: 'list'
// 									}, [
// 										h('DropdownItem', {
// 											props: {
// 												name: '1'
// 											},style:{
// 												display:this.getAuth('08000010601') ? 'inline-block' :'none'
// 											}
// 										}, '编辑'),
// 										h('DropdownItem', {
// 											props: {
// 												name: '2'
// 											},style:{
// 												display:this.getAuth('08000010603') ? 'inline-block' :'none'
// 											}
// 										}, '详情'),
// 									])
// 
// 								]),
							])
						}
					},
				], // 短信模板标题
				ShortMessageInfo: [], // 短信模板数据
				LetterMessageTitle: [
					{title: '序号', minWidth: 60 , key: 'index'},
					{title: '模板名称',minWidth: 120,key: 'modelName'},
					{title: '发送方式',minWidth: 100,key: 'content'},
					{title: '操作',minWidth: 100,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
								}, '详情'),
							])
						}
					},
				], //信函模板标题
				LetterMessageInfo: [], // 信函模板内容
				 // 上传的新增数据
				formValidate: {
					informModelId: '', // 模板ID
					modelName: '', // 模板名称
					modelType: '1', // 模板类型
					sign: '', // 电子签章
					content: '', // 模板内容
					serviceLine: '', // 业务线
					productType: '', // 产品类型
					sendType: '', // 发送方式
					applyReason: '', //申请理由
					timeNode: '', // 时间节点
					overdueStg: '', //  逾期等级
					isSpecial: '', // 是否购买特权包
					pageIndex: 1,
					pageSize: 10,
				},
				ruleValidate: { // 表单验证规则
					modelName: [{
						required: true,
						message: '模板名称不能为空！'
					}],
					content: [{
						required: true,
						message: '内容不能为空！'
					}],
					modelType: [{
						required: true,
						message: '类型不能为空！'
					}],
					// :[{required:true, message:'请选择是否有特权包'}],
					productType: [{
						required: true,
						message: '请选择产品类型'
					}],
					sendType: [{
						required: true,
						message: '请选择发送方式'
					}],
					serviceLine: [{
						required: true,
						message: '请选择业务线'
					}],
					overdueStg: [{
						required: true,
						message: '请选择逾期等级'
					}]
				},
			}
		},
		methods: {
			// 默认加载
			init(page, pageSize) {
				const _ = this
				this.formValidate.pageIndex = page || this.formValidate.pageIndex;
				this.formValidate.pageSize = pageSize || this.formValidate.pageSize;
				this.HttpAjax('post', 'Get_informManage', this.formValidate, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if (res && res.data.status === 200) { //接口访问成功
						this.ShortMessagePage = res.data.data.pageIndex //显示第几页
						this.ShortMessageInfo = res.data.data.data
						this.totalPage = res.data.data.dataCount
					}
				});
			},
			// 表格切换
			Change_Tab(name) {
				console.log(name)
			},
			// 新增按钮点击事件
			add_btn() {
				this.showModal = true
				this.editInfos = false;
				this.$refs['formValidate'].resetFields();
			},
			// 确定按钮点击事件（提交新增信息
			Submit1(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						if (this.editInfos) { // 编辑
							_.HttpAjax('post', 'UpdateInformManage', _.formValidate, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if (res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '编辑模板成功',
										duration: 2
									});
									this.$refs['formValidate'].resetFields();
									_.showModal = false;
									_.init();
								}
							})
						} else { // 新增
							_.HttpAjax('post', 'AddInformManage', _.formValidate, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if (res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '添加模板成功',
										duration: 2
									});
									this.$refs['formValidate'].resetFields();
									_.showModal = false;
									_.init();
								}
							})
						}
					} else {}
				})
			},
			// 取消按钮点击事件
			hidden_modal() {
				this.showModal = false
			},
			// 删除模板信息
			Dell_informManage(informModelId) {
				const _ = this;
				_.$Modal.confirm({
					title: '删除模板',
					content: '确定删除这条模板吗？',
					onOk: () => {
						_.HttpAjax('post', 'Dell_informManage', {
							"informModelId": informModelId
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status === 200) {
								_.$Notice.success({
									title: '成功',
									desc: '模板删除成功',
									duration: 2
								});
								_.init()
							}
						})
					}
				});
			},
			// 编辑模板信息
			edit_informManage(row) {
				this.showModal = true;
				this.editInfos = true;
				for (let i in this.formValidate) {
					this.formValidate[i] = row[i];
				}
				this.formValidate.idKey = row.idKey;
			},
			// 详情按钮点击事件
			details_informManage(row) {
				this.details_Info = row;
				this.details_modal = true;
			},
			// 页码改变
			change_page(page) {
				this.init(page)
			},
			// 每页显示数量变化
			change_size(pageSize) {
				this.init('', pageSize)
			},
			// 刷新按钮
			refresh() {
				this.init()
			}
		},
		created() {

		},
		mounted() {
			this.init();
		}
	}
</script>
<style scoped lang="less">
	.tabs-item {
		position: relative;

		.add_btn {
			position: absolute;
			right: 30px;
			width: 90px;
			height: 30px;
			z-index: 3;
		}
	}
</style>
<style lang="less">
	.noticeManagement {
		.ivu-table-fixed-body {
			overflow: visible;
		}
	}

	.Message {
		.details_content {
			height: 450px;

			ul {
				width: 450px;
				margin: 0 auto;

				li {
					list-style: none;
					height: 35px;
					border: 1px solid #dcdcdc;
					margin-bottom: 12px;
					display: flex;

					.s_left {
						display: inline-block;
						width: 110px;
						border-right: 1px solid #dcdcdc;
						text-align: center;
						line-height: 34px;
					}

					.s_right {
						text-indent: 15px;
						display: inline-block;
						line-height: 35px;
					}

					.last_s_right {
						flex: 1;
						overflow: auto;
					}
				}
			}
		}
	}

	#special {
		.ivu-select-dropdown {
			height: 73px;
		}
	}
</style>
