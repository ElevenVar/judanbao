<template>
	<div class="thawingEasySearch">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">百融信修</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0下拉选择框 -->
						<Form label-position="right" inline :model="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号码</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>审核状态</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>是否有信修数据</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.contractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="formData.customer" size="large"></Input>
								<Input v-show="formIndex == 2" type="text" placeholder="请输入身份证号码！" v-model="formData.idNumber" size="large"></Input>
								<Input v-show="formIndex == 3" type="text" placeholder="请输入联系电话！" v-model="formData.customerPhone" size="large"></Input>
								<Select v-show="formIndex == 4" @on-open-change="getListDict($event,'auditType')" v-model="formData.status"
								placeholder="请选择审核状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.auditType" :value="parseInt(item.type)+4">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 5" v-model="formData.isXx" placeholder="请选择是否有信修数据" class="twoSelect" size="large">
									<Option value="1">是</Option>
									<Option value="0">否</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第1下拉选择框 -->
						<Form label-position="right" inline :model="formData1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>审核状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>是否有信修数据</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.contractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData1.customer" size="large"></Input>
								<Input v-show="formIndex1 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData1.idNumber" size="large"></Input>
								<Input v-show="formIndex1 == 3" type="text" placeholder="请输入联系电话！" v-model="formData1.customerPhone" size="large"></Input>
								<Select v-show="formIndex1 == 4" @on-open-change="getListDict($event,'auditType')" v-model="formData1.status"
								placeholder="请选择审核状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.auditType" :value="parseInt(item.type)+4">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 5" v-model="formData1.isXx" placeholder="请选择是否有信修数据" class="twoSelect" size="large">
									<Option value="1">是</Option>
									<Option value="0">否</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第2下拉选择框 -->
						<Form label-position="right" inline :model="formData2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>身份证号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>审核状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>是否有信修数据</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.contractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData2.customer" size="large"></Input>
								<Input v-show="formIndex2 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData2.idNumber" size="large"></Input>
								<Input v-show="formIndex2 == 3" type="text" placeholder="请输入联系电话！" v-model="formData2.customerPhone" size="large"></Input>
								<Select v-show="formIndex2 == 4" @on-open-change="getListDict($event,'auditType')" v-model="formData2.status"
								placeholder="请选择审核状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.auditType" :value="parseInt(item.type)+4">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 5" v-model="formData2.isXx" placeholder="请选择是否有信修数据" class="twoSelect" size="large">
									<Option value="1">是</Option>
									<Option value="0">否</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第3下拉选择框 -->
						<Form label-position="right" inline :model="formData3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>身份证号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>审核状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>是否有信修数据</Option>
								</Select>
								<Input v-if="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.contractNo" size="large"></Input>
								<Input v-if="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData3.customer" size="large"></Input>
								<Input v-if="formIndex3 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData3.idNumber" size="large"></Input>
								<Input v-if="formIndex3 == 3" type="text" placeholder="请输入联系电话！" v-model="formData3.customerPhone" size="large"></Input>
								<Select v-if="formIndex3 == 4" @on-open-change="getListDict($event,'auditType')" v-model="formData3.status"
								placeholder="请选择审核状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.auditType" :value="parseInt(item.type)+4">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex3 == 5" v-model="formData3.isXx" placeholder="请选择是否有信修数据" class="twoSelect" size="large">
									<Option value="1">是</Option>
									<Option value="0">否</Option>
								</Select>
							</FormItem>
						</Form>
						<Form label-position="right"  inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click.prevent="search">查询</Button>
								<Button @click="restData()">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('09000010101')" @click="addBatch">
									<Icon type="navicon-round"></Icon> 批量新增
								</Button>
								<Button v-if="this.getAuth('09000010102')" @click="exportExcl">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="table_title" :data="table_data"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--批量新增-->
		<Modal v-model="addApply" :mask-closable="false" :scrollable="true" draggable :loading="loading"
		 title="批量新增">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" ref="uploadFile" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						 multiple />
					</FormItem>
					<Button type="primary" @click="getApplyModeTo">检测文件</Button><br />
					<span style="color:blue;cursor:pointer;text-decoration: underline" @click="down_Template">百融信修模板下载.xlsx</span>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" :disabled="Start_button" @click="Start_xinxiu">{{titles}}</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import qs from 'qs'
	import store from '../../store/index'
	export default {
		name: "thawingEasySearch",
		data() {
			return {
				value1: '1',
				Start_button: true, // 是否显示底部
				operationKey: '', // 保存上传信修列表的 idKey
				titles: '开始信修',
				rotate: true,
				addApply: false,
				loading: true,
				formIndex: '0', // 第0个下拉框
				formIndex1: '1',// 第1个下拉框
				formIndex2: '2',// 第2个下拉框
				formIndex3: '3',// 第3个下拉框
				totallPages: 0,
				importFile: {},
				distList: {
					auditType: []
				},
				//筛选字段
				formData: {
					contractNo: '',
					customer: '',
					idNumber: '',
					customerPhone: '',
					status: '',
					isXx: ''
				},
				formData1: {
					contractNo: '',
					customer: '',
					idNumber: '',
					customerPhone: '',
					status: '',
					isXx: ''
				},
				formData2: {
					contractNo: '',
					customer: '',
					idNumber: '',
					customerPhone: '',
					status: '',
					isXx: ''
				},
				formData3: {
					contractNo: '',
					customer: '',
					idNumber: '',
					customerPhone: '',
					status: '',
					isXx: ''
				},
				LastSubmitData: {
          pageIndex: '1',
					pageSize: '10',
				},
				ruleValidate: {

				},
				table_title: [{
						title: '合同编号',
						minWidth: 150,
						key: 'contractNo'
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'customer',
					},
					/* {
						title: '身份证号码',
						minWidth: 160,
						key: 'idNumber',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.idNumber))
						}
					},
					{
						title: '本人手机号',
						minWidth: 160,
						key: 'customerPhone',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.customerPhone))
						}
					}, */
					{
						title: '提交时间',
						minWidth: 160,
						key: 'createTime',
					},
					{
						title: '审核状态',
						minWidth: 120,
						key: 'shenheType',
					},
					{
						title: '反馈时间',
						minWidth: 120,
						key: 'finishTime',
					},
					{
						title: '是否有信修数据',
						minWidth: 130,
						key: 'isXxStr',
					},
					{
						title: '信修计数',
						minWidth: 100,
						key: 'countXx',
					},
				], // 表头字段
				table_data: [], // 表格显示数据
			}
		},
		methods: {
			//列表
			init(page, pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
				this.HttpAjax('post', 'bcmpBreasy_query', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						_.totallPages = res.data.count;
						_.table_data = res.data.data;
					}
				})
			},
			//翻页-->第几页
			changePages(name) {
				this.init(name);
			},
			//翻页-->每一页显示的数据条数
			changePagesTotall(name) {
				this.LastSubmitData.pageSize = name;
				this.init('', name);
			},
			//刷新
			refresh() {
				this.init();
			},
			// 查询
			search(){
				this.ClearObject(this.LastSubmitData)
				for(let i  in this.formData){
					if(this.formData[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData[i])
					}
				}
				for(let i  in this.formData1){
					if(this.formData1[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData1[i])
					}
				}
				for(let i  in this.formData2){
					if(this.formData2[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData2[i])
					}
				}
				for(let i  in this.formData3){
					if(this.formData3[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData3[i])
					}
				}
				this.init()
			},
			//下拉选择项变化时
			selectChange(val,index) {
				if(index ==0){
					this.formIndex = val
				}else{
					this['formIndex'+index] = val
				}
			},
			//第0下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.formData)
					}else{
						this.ClearObject(this['formData'+index])
					}
				}
			},
			// 清空对象
			ClearObject(Object) {
				for (let i in Object) { //置空，除了pageIndex和pageSize
					if (i != 'pageIndex' && i != 'pageSize') {
						Object[i] = '';
					}
				}
			},
			//重置
			restData() {
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			//批量新增按钮点击事件
			addBatch() {
				this.titles = '开始信修'
				this.importFile = {};
				this.$refs['uploadFile'].value = '';
				this.addApply = true
				this.Start_button = true
			},
			//选择文件
			getUploadExcel(e) {
				const _ = this;
				var File = e.target.files;
				var size = File.size;
				var type = File.type;
				var formdata = new FormData();
				for (let i = 0; i < File.length; i++) {
					formdata.append('file', File[i]);
				}
				_.importFile = formdata;
			},
			//检测文件按钮点击事件
			getApplyModeTo() {
				const _ = this;
				_.HttpAjax('post', 'checkImportedData', _.importFile, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						if(res.data.stauts == 500){
							this.Start_button = true
						}
						this.operationKey = res.data.data;
						if (res.data.code === '0') { // 检测文件成功
							_.$Notice.success({
								title: '成功',
								desc: res.data.msg,
								duration: 2
							});
							this.titles = '开始信修'
							this.Start_button = false; // 按钮可以点击
						} else if (res.data.code === '1') { // 检测文件失败
							_.$Notice.error({
								title: '失败',
								desc: res.data.msg,
								duration: 0
							});
							this.titles = '导出错误'
							this.Start_button = false
						}
					}
				}, 'file');
			},
			// 开始信修按钮点击事件
			Start_xinxiu() {
				if (this.titles === '开始信修') {
					if(this.operationKey != null){
						this.HttpAjax('post', 'repairImportedData', {
							"operationKey": this.operationKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.status === 200) {
								if(res.data.status == 200){
									this.$Notice.success({
										title: '成功',
										desc: res.data.message,
										duration:2
									})
								}
								this.addApply = false;
								this.init();
							}
						})
				}
				} else if (this.titles === '导出错误') {
					this.HttpAjax('post', 'exportCheckFailedList', qs.stringify({
						"operationKey": this.operationKey
					}), (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						this.addApply = false;
						this.init();
						this.titles = '开始信修';
						this.downLoadFile(res.data);
					}, 'download')
				}
			},
			getListDict(bol, label) { //所有下拉列表
				const _ = this;
				if (bol) {
					if (_.distList[label].length == 0) {
						_.HttpAjax('post', 'distList', {
							label: label
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								switch (label) {
									case 'auditType': //审核状态
										_.distList.auditType = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			//电话脱敏
			phoneZation(phone) {
				return phone.substring(0, 3) + '*****' + phone.substring(8, phone.length);
			},
			//导出按钮点击事件
			exportExcl() {
				this.HttpAjax('post', 'bcmpBreasyExport', qs.stringify(this.LastSubmitData), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '百融信修数据列表');
				}, 'download')
			},
			// 下载模板按钮点击事件
			down_Template() {
				this.HttpAjax('post', 'bcmpBreasyDownloadTemplet', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '百融信修模板');
					this.addApply = false;
				}, 'download')
			},
		},
		mounted() {
			this.init();
		}
	}
</script>
<style lang="less">
	.thawingEasySearch {
		.from-items {
			padding: 10px;

			.ivu-form {
				display: inline-block;

				.block-tips.ivu-form-item {
					.ivu-form-item-content {
						.prepend.ivu-select {
							width: 110px;

							.ivu-select-selection {
								width: 110px;
								border-radius: 0;
							}
						}

						.twoSelect.ivu-select {
							width: 250px;

							.ivu-select-selection {
								width: 250px;
								margin-left: -4px;
								border-radius: 0;
							}
						}

						.ivu-input-wrapper {
							width: 250px;
							margin-left: -4px;

							.ivu-input.ivu-input-large {
								border-radius: 0;
							}
						}
					}
				}
			}
		}
	}

	.modalTip {
		.ivu-modal .ivu-modal-body {
			overflow: visible;
		}
	}

	.ivu-upload {
		display: inline-block;
		margin-left: -3px;
	}

	.import-input {
		border: 1px solid #eee;
		border-radius: 4px 0px 0px 4px;
	}
	.ivu-icon:hover {
		cursor: pointer;
	}
</style>
