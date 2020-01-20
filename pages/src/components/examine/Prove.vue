<template>
	<div class="Prove">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">结清证明审核</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" inline :label-width="110" :model="search_data" ref="search_data">
							<FormItem label="合同编号">
								<Input type="text" v-model="search_data.loanContractNo" placeholder="请输入合同编号！" size="large"></Input>
							</FormItem>
							<FormItem label="客户姓名">
								<Input type="text" v-model="search_data.loanName" placeholder="请输入客户姓名！" size="large"></Input>
							</FormItem>
							<FormItem label="主体">
								<Select placeholder="请选择主体" size="large" v-model="search_data.mainBody" @on-open-change="distList($event,'mainBody')">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
							</FormItem>
							<FormItem label="提交人">
								<Input type="text" v-model="search_data.applyer" placeholder="请输入客户姓名！" size="large"></Input>
							</FormItem>
							<!--按钮部分-->
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="init">查询</Button>
								<Button @click="restData">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<!--<Button @click="Show_Modal"><Icon type="navicon-round"></Icon> 批量新增</Button>-->
								<Button @click="exportData">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
								<Button @click='BatchAudit'>批量审核</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change='ChangeDatas'></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--Modal 单条审核-->
		<Modal v-model="one_modal" :loading="loading" draggable :title="this.shenhe_type ===0? '通过':'拒绝'">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem :label="this.shenhe_type ===0? '通过原因':'拒绝原因'">
						<Input type="textarea" :placeholder="this.shenhe_type ===0? '请输入通过原因':'请输入拒绝原因'" :style="width" size="large"
						 :autosize="{minRows: 5,maxRows: 6}" :maxlength="50" v-model="refresh_info">
						</Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="hiddenModel">取消</Button>
				<Button type="primary" size="large" @click="Submit_refuse_info">提交</Button>
			</div>
		</Modal>
		<!--批量审核-->
		<Modal v-model="batch_modal" draggable :loading="loading" footer-hide title="选择审核状态">
			<!-- 公共form表单类 -->
			<div class="from-item" style="height:100px;">
				<div style="text-align:center;margin-top:22px;">
					<Button type="success" size="large" @click="batch_shenhe('0','批量通过')">通过审核</Button>
					<Button type="error" size="large" @click="batch_shenhe('1','批量拒绝')">拒绝审核</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	import expandTabs from '../common/public_liucheng'
	export default {
		name: "Prove",
		data() {
			return {
				value1: '1',
				rotate: true, // 头部是否折叠
				edit: false,
				loading: true,
				width: {
					'width': '340px'
				},
				totallPages: 0,
				/*审核弹窗*/
				one_modal: false,
				shenhe_type: '', // 储存状态（通过，拒绝
				refresh_info: '', // 拒绝通过的理由
				shenhe_row: {}, // 审核传递的数据
				columns: [{
						type: 'selection',
						minWidth: 60,
					},
					{
						title: '查看审核流程',
						minWidth: 110,
						type: 'expand',
						render: (h, params) => {
							return h(expandTabs, {
								props: {
									row: params.row,
									url: 'settleProofGetCheckRoute',
								}
							})
						}
					},
					{
						title: '合同编号',
						minWidth: 180,
						key: 'loanContractNo',
					},
					{
						title: '合同金额',
						minWidth: 120,
						key: 'loanAmount',
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'loanName',
					},
					{
						title: '主体',
						minWidth: 120,
						key: 'mainBody',
					},
					{
						title: '贷款日期',
						minWidth: 120,
						key: 'payDate',
					},
					{
						title: '结清日期',
						minWidth: 120,
						key: 'deductionTime',
					},
					{
						title: '提交时间',
						minWidth: 120,
						key: 'applicationTime',
					},
					{
						title: '提交人',
						minWidth: 120,
						key: 'applyer',
					},
					{
						title: '操作',
						minWidth: 240,
						key: 'number',
						fixed: 'right',
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
									on: {
										click: () => {
											this.one_modal = true;
											this.shenhe_type = 0;
											this.shenhe_row = params.row;
										}
									}
								}, '通过'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.one_modal = true;
											this.shenhe_type = 1;
											this.shenhe_row = params.row;
										}
									}
								}, '拒绝'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.setStore('opreateBtn', {
												hiddenBtn: 'private',
												showBtn: 'private',
												allINFO: params.row
											})
											this.$router.push('finishDetail')
										}
									}
								}, '详情'),
							])
						}
					},
				],
				datas: [],
				distLists: {
					mainBody: [], //所有主体
				}, // 字段表
				/*传递的字段*/
				search_data: {
					loanContractNo: '', // 合同编号
					loanName: '', // 客户姓名
					mainBody: '', // 主体
					applyer: '', // 提交人
					pageIndex: "1",
					pageSize: "10",
				},
				/*批量审核窗口*/
				batch_modal: false, // 批量审核窗口
				loading: true,
				ChangeTabData: [], //选中的数据
			}
		},
		methods: {
			// 默认查询表格信息
			init(pageIndex, pageSize) {
				this.pageIndex = pageIndex || this.pageIndex;
				this.pageSize = pageSize || this.pageSize;
				this.HttpAjax('post', 'settleProofList', this.search_data, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						this.datas = res.data.data.data;
						this.totallPages = res.data.data.dataCount
					}
				})
			},
			//  查看数据详情
			details_info() {},
			//翻页-->第几页
			changePages(name) {
				this.init(name);
			},
			//每一页显示多少条数据
			changePagesTotall(name) {
				this.search_data.pageSize = name;
				this.init('', name);
			},
			//刷新
			refresh() {
				this.init();
			},
			//重置
			restData() {
				for (let i in this.search_data) { //置空，除了pageIndex和pageSize
					if (i !== 'pageIndex' && i !== 'pageSize') {
						this.search_data[i] = '';
					}
				}
				this.init();
			},
			// 导出数据按钮点击事件
			exportData() {
				this.HttpAjax('post', 'exportSettleProof', qs.stringify(this.search_data), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '结清证明审核');
				}, 'download')
			},
			// 批量新增按钮点击事件
			Show_Modal() {
				this.addApply = true;
			},
			//取消按钮点击事件
			hiddenModel() {
				this.one_modal = false;
				this.shenhe_type = '';
				this.refresh_info = '';
				this.idKey = ''
			},
			// 提交按钮点击事件
			Submit_refuse_info() {
				this.HttpAjax('post', 'settleProofToExamine', {
					contractNo: this.shenhe_row.loanContractNo,
					status: this.shenhe_type,
					id: this.shenhe_row.idKey,
					checkRemark: this.refresh_info,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						this.$Notice.success({
							title: '成功',
							desc: '操作成功',
							duration: 2
						});
						this.shenhe_type = '';
						this.refresh_info = '';
						this.shenhe_row = {};
						this.one_modal = false;
						this.init();
					}
				})
			},
			// 选择数据
			ChangeDatas(val){
				this.ChangeTabData = []
				for(let i in val){
					this.ChangeTabData.push({
						contractNo: val[i].loanContractNo,
						status: '',
						id: val[i].idKey,
						checkRemark:'',
					})
				}
			},
			// 批量审核按钮
			BatchAudit() {
				if(this.ChangeTabData.length == 0){
					this.$Notice.error({
						title: '错误',
						desc: '请选择要批量审核的数据',
						duration: 0,
					})
				}else {
						this.batch_modal = true
					}
			},
			// 批量审核（拒绝，通过
			batch_shenhe(status,checkRemark){
				for(let i in this.ChangeTabData){
					this.ChangeTabData[i].status = status
					this.ChangeTabData[i].checkRemark = checkRemark
				}
				this.HttpAjax('post', 'SettleProofTeamLeaderBatchReview', this.ChangeTabData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.$Notice.success({
							title: '成功',
							desc: '审核成功',
							duration: 2
						})
						this.batch_modal = false
						this.init();
						this.ChangeTabData = []
					}
				},'json')
			},
			// 字典表查询
			distList(bol, label) {
				if (bol) {
					if (this.distLists.mainBody.length == 0) {
						this.HttpAjax('post', 'distList', {
							label: label
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status === 200) {
								switch (label) {
									case 'mainBody':
										this.distLists.mainBody = res.data.data;
										break;
								}
							}
						})
					}
				}
			}
		},
		created() {
			this.init();
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.Prove {
		.ivu-table-fixed-body {
			overflow: visible;
		}

		.block-tip.ivu-form-item {
			margin-left: -110px;

			.ivu-select.prepend {
				width: 110px;
				text-align: center;

				.ivu-select-selection {
					width: 110px;
					background-color: #FBFBFB;
				}
			}

			.ivu-input-wrapper,
			.ivu-select {
				width: 250px;
				margin-left: -4px;
			}
		}
	}
</style>
