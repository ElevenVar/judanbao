<template>
	<div class="ProveSettle">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">结清证明申请</span>
				<span class="swith head-commom">
                {{rotate ? '收起' : '展开'}}
                <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
              </span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model="search_data" ref="search_data">
							<FormItem label="合同编号">
								<Input type="text" v-model="search_data.loanContractNo" placeholder="请输入合同编号！" size="large"></Input>
							</FormItem>
							<FormItem label="客户姓名">
								<Input type="text" v-model="search_data.loanName" placeholder="请输入客户姓名！" size="large" :maxlength="60"></Input>
							</FormItem>
							<FormItem label="主体">
								<Select placeholder="请选择主体" size="large" v-model="search_data.mainBody">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
							</FormItem>
							<FormItem label="审核状态">
								<Select placeholder="请选择审核状态" size="large" v-model="search_data.auditStatus">
									<Option value="1">审核拒绝</Option>
									<Option value="0">审核通过</Option>
									<Option value="2">待审核</Option>
									<Option value="3">审核中</Option>
								</Select>
							</FormItem>
							<!--按钮部分-->
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="shaixuan" :disabled="addApply">查询</Button>
								<Button @click="restData()" :disabled="addApply"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button v-if="this.getAuth('10000010401')" @click="Show_Modal" :disabled="addApply"><Icon type="navicon-round"></Icon> 批量新增</Button>
								<Button v-if="this.getAuth('10000010402')" @click="settleProofExport" :disabled="addApply"><Icon type="navicon-round"></Icon> 导出数据</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--批量新增-->
		<Modal v-model="addApply" title="批量新增" draggable>
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" type="file" ref='inputFile' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" multiple />
					</FormItem><br/>
					<span style="color:blue;cursor:pointer;text-decoration: underline" @click="down_Template">结清证明申请模板下载.xlsx</span>
				</Form>

			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="Submit_info">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	import expandTabs from '../common/public_liucheng'
	export default {
		name: "Settle",
		component: {
			expandTabs
		},
		data() {
			return {
				value1: '1',
				loading: true,
				rotate: true,
				addApply: false, // 导入弹窗
				importFile: {}, //存储选择的文件
				width: {
					'width': '340px'
				},
				placeholder: "请输入客户姓名！",
				edit: false,
				distLists: {
					mainBody: [], //所有主体
				}, // 字段表
				totallPages: 0, // 总页数
				expandData: {}, //展开的数据
				columns: [
					{
						type: 'expand',
						width: 110,
						title: '查看审核流程',
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
						minWidth: 100,
						key: 'loanAmount',
					},
					{
						title: '客户姓名',
						minWidth: 100,
						key: 'loanName',
					},
					{
						title: '主体',
						minWidth: 120,
						key: 'mainBody',
					},
					{
						title: '贷款日期',
						minWidth: 130,
						key: 'payDate',
					},
					{
						title: '结清日期',
						minWidth: 130,
						key: 'deductionTime',
					},
					{
						title: '审核状态',
						minWidth: 120,
						key: 'auditStatus',
					},
					{
						title: '提交时间',
						minWidth: 130,
						key: 'applicationTime',
					},
					{
						title: '审核时间',
						minWidth: 130,
						key: 'checkTime',
					},
					{
						title: '审核备注',
						minWidth: 100,
						key: 'checkRemark',
					},
					{
						title: '操作',
						minWidth: 110,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: params.row.auditStatus !== '审核通过' ? true : false || this.addApply
									},
									style: {
										display:this.getAuth('10000010403') ? 'inline-block' : 'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.downLoadJqModel(params.row)
										}
									}
								}, '下载'),
							])
						}
					},

				], // 表头的字段
				datas: [], // 表格展示的数据
				// 查询传的字段
				search_data: {
					loanContractNo: '', // 合同编号
					loanName: '', // 客户姓名
					mainBody: '', // 主体
					auditStatus: '', //审核状态
					pageIndex: '1',
					pageSize: '10',
				},
			}
		},
		methods: {
			init(pageIndex, pageSize) {
				this.search_data.pageIndex = pageIndex || this.search_data.pageIndex;
				this.search_data.pageSize = pageSize || this.search_data.pageSize;
				this.HttpAjax('post', 'settleProofDownLoadList', this.search_data, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status === 200) {
						this.datas = res.data.data.data;
						this.totallPages = res.data.data.dataCount
					}
				})
			},
			// 下载结清证明  合同号:DZ201602170083 用于测试，可以下载
			downLoadJqModel(row) {
				this.HttpAjax('post', 'downLoadJqModel', qs.stringify({contractNo: row.loanContractNo}), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(row.serviceLine == 'XD'){
						this.downLoadFile(res.data,row.loanName + '的结清证明.pdf');
					}else if(row.serviceLine == 'XJ'){
						this.downLoadFile(res.data,row.loanName + '的结清证明.doc');
					}else {
						this.$Notice.error({
								title: '错误',
								desc:'无法确定的内容',
								duration: 0
						});
					}
				},'download');

			},
			//翻页-->第几页
			changePages(pageIndex) {
				this.init(pageIndex);
			},
			//每一页显示多少条数据
			changePagesTotall(pageSize) {
				this.search_data.pageSize = pageSize;
				this.init('', pageSize);
			},
			//刷新
			refresh() {
				this.init();
			},
			restData() { //重置
				const _ = this;
				for(let i in _.search_data) {
					if(i !== 'pageIndex' && i !== 'pageSize') {
						_.search_data[i] = '';
					}
				}
				_.init();
			},
			//筛选按钮点击事件
			shaixuan() {
				this.init();
			},
			// 批量新增按钮点击事件
			Show_Modal() {
				this.$refs.inputFile.value = ''; //清空选中的文件
				this.addApply = true;
			},
			//选择文件
			getUploadExcel(e) {
				const _ = this;
				var File = e.target.files;
				var size = File.size;
				var type = File.type;
				var formdata = new FormData();
				for(let i = 0; i < File.length; i++) {
					formdata.append('file', File[i]);
				}
				_.importFile = formdata;
			},
			// 提交按钮点击事件(导入数据)
			Submit_info() {
				this.HttpAjax('post', 'settleProofCheckImportedData', this.importFile, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.status === 200) {
						if(res.data.status === 200) {
							this.$Notice.success({
								title: '成功',
								desc: '导入数据成功',
								duration: 2
							});
						}
						this.init();
						this.addApply = false;
					}
				}, 'file')
			},
			// 导出数据按钮点击事件(导出结清证明列表数据)
			settleProofExport() {
				this.HttpAjax('post', 'exportActive', qs.stringify(this.search_data), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '结清证明申请');
					this.addApply = false;
				}, 'download');
			},
			// 字典表查询
			distList(label) {
				this.HttpAjax('post', 'distList', {
					label: label
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status === 200) {
						switch(label) {
							case 'mainBody':
								this.distLists.mainBody = res.data.data;
								break;
						}
					}
				})
			},
			// 下载模板按钮点击事件
			down_Template() {
				this.HttpAjax('post', 'exportPoi', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '结清证明申请模板');
				}, 'download')
			},
			// 判断下载可以是否可以点击
			disabled(auditStatus) {

			}
		},
		created() {
			this.init();
			this.distList('mainBody'); //查询主体
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.ProveSettle {
		.ivu-table-fixed-body {
			// overflow: visible;
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