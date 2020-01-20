<template>
	<div class="collectCaseMange">
		<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">{{title}}</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个下拉筛选框 -->
						<Form label-position="right" inline :model="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange" @on-open-change='ClearVal'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>申请时间</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>申请人</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="formData.clientName" size="large"></Input>
								<Select v-show="formIndex == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody"
								 placeholder="请选择主体!" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数开始！" v-model="formData.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数结束！" v-model="formData.overdueDayEnd"
								 size="large"></Input>
								<DatePicker v-if="formIndex == 4" format="yyyy-MM-dd" type="date" :editable="false" placeholder="请选择申请时间！" size="large"
								 @on-change='applicationTime($event,"")' v-model="formData.applicationTime">
								</DatePicker>
								<Input v-show="formIndex == 5" type="text" placeholder="请输入申请人！" v-model="formData.applicantor" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个下拉筛选框 -->
						<Form label-position="right" inline :model="formData1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange1" @on-open-change='ClearVal1'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>申请时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>申请人</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData1.clientName" size="large"></Input>
								<Select v-show="formIndex1 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData1.mainBody"
								 placeholder="请选择主体!" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数开始！" v-model="formData1.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数结束！" v-model="formData1.overdueDayEnd"
								 size="large"></Input>
								<DatePicker v-if="formIndex1 == 4" format="yyyy-MM-dd" type="date" :editable="false" placeholder="请选择申请时间！"
								 size="large" @on-change='applicationTime($event,"1")' v-model="formData1.applicationTime">
								</DatePicker>
								<Input v-show="formIndex1 == 5" type="text" placeholder="请输入申请人！" v-model="formData1.applicantor" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个下拉筛选框 -->
						<Form label-position="right" inline :model="formData2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange2" @on-open-change='ClearVal2'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>申请时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>申请人</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData2.clientName" size="large"></Input>
								<Select v-show="formIndex2 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData2.mainBody"
								 placeholder="请选择主体!" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数开始！" v-model="formData2.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数结束！" v-model="formData2.overdueDayEnd"
								 size="large"></Input>
								<DatePicker v-if="formIndex2 == 4" format="yyyy-MM-dd" type="date" :editable="false" placeholder="请选择申请时间！"
								 size="large" @on-change='applicationTime($event,"2")' v-model="formData2.applicationTime">
								</DatePicker>
								<Input v-show="formIndex2 == 5" type="text" placeholder="请输入申请人！" v-model="formData2.applicantor" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个下拉筛选框 -->
						<Form label-position="right" inline :model="formData3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange3" @on-open-change='ClearVal3'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>申请时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>申请人</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData3.clientName" size="large"></Input>
								<Select v-show="formIndex3 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData3.mainBody"
								 placeholder="请选择主体!" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex3 == 3" type="text" placeholder="逾期天数开始！" v-model="formData3.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex3 == 3" type="text" placeholder="逾期天数结束！" v-model="formData3.overdueDayEnd"
								 size="large"></Input>
								<DatePicker v-if="formIndex3 == 4" format="yyyy-MM-dd" type="date" :editable="false" placeholder="请选择申请时间！"
								 size="large" @on-change='applicationTime($event,"3")' v-model="formData3.applicationTime">
								</DatePicker>
								<Input v-show="formIndex3 == 5" type="text" placeholder="请输入申请人！" v-model="formData3.applicantor" size="large"></Input>
							</FormItem>
						</Form>
						<Form label-position="right">
							<!-- 按钮部分 -->
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search" :disabled="examineStatus">查询</Button>
								<Button @click="restData()" :disabled="examineStatus">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('05000010205')" @click="exportExcel" :disabled="examineStatus">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
								<Button  v-if="this.getAuth('05000010206')" @click="examineShow" :disabled="examineStatus">
									<Icon type="ios-browsers-outline"></Icon> 批量审核
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="table-warper">
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change="selectData"></Table>
			</div>
			<!-- 公共page分页类 show-elevator show-sizer-->
			<div class="page-item">
				<Page :total="dataCount" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--Modal 审核状态-->
		<Modal v-model="examineStatus" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalTip"
		 title="选择审核状态">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model="examineStatusModel" :rules="ruleValidateStatus" ref="examineStatusModel">
					<FormItem label="审核状态" prop="status">
						<Select v-model="examineStatusModel.status" @on-change="selectStatus" placeholder="请选择！" :style="width" size="large">
							<Option value="1">通过</Option>
							<Option value="2">拒绝</Option>
						</Select>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="updateBatch('examineStatusModel')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	import expandTabs from '../common/public_liucheng'
	export default {
		data() {
			return {
				dataCount: 0, //总页数
				title: '提前委外审核',
				zhedie: "收起",
				value1: '1',
				isActive: true,
				select3: '',
				stepShow: false,
				selectdata: [],
				formIndex: '0', //第零个下拉框默认选中
				formIndex1: '1', //第一个下拉框默认选中
				formIndex2: '2', //第二个下拉框默认选中
				formIndex3: '4', //第三个下拉框默认选中
				examineStatus: false,
				loading: true,
				width: {
					'width': '340px'
				},
				placeholder: "请输入合同编号！",
				//筛选字段
				formData: {
					loanContractNo: '', // 合同编号
					clientName: '', //客户姓名
					mainBody: '', //主体
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					applicantor: '', //申请人
					applicationTime: '', //申请时间
				},
				formData1: {
					loanContractNo: '', // 合同编号
					clientName: '', //客户姓名
					mainBody: '', //主体
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					applicantor: '', //申请人
					applicationTime: '', //申请时间
				},
				formData2: {
					loanContractNo: '', // 合同编号
					clientName: '', //客户姓名
					mainBody: '', //主体
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					applicantor: '', //申请人
					applicationTime: '', //申请时间
				},
				formData3: {
					loanContractNo: '', // 合同编号
					clientName: '', //客户姓名
					mainBody: '', //主体
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					applicantor: '', //申请人
					applicationTime: '', //申请时间
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				examineStatusModel: { //选择审核状态
					status: ''
				},
				ruleValidateStatus: { //审核状态字段验证
					status: [{
						required: true,
						message: '审核状态必选！'
					}],
				},
				distList: {
					mainBody: [], //主体
					// productType: [], //产品类型
					applyType: [], //提前委外类型
				},
				columns: [{
						title: '全选',
						type: 'selection',
						minWidth: 80,
						align: 'center',
					},
					{
						type: 'expand',
						title: '查看审核流程',
						minWidth: 120,
						render: (h, params) => {
							if(this.getAuth('05000010204')){
								return h(expandTabs, {
									props: {
										row: params.row,
										url: 'outSourcingAdvanceGetCheckRoute',
									}
								})
							}
						}
					},
					{
						title: '合同编号',
						minWidth: 120,
						key: 'loanContractNo'
					},
					{
						title: '客户姓名',
						minWidth: 100,
						key: 'loanName'

					}, {
						title: '主体',
						minWidth: 170,
						key: 'mainBody',
					}, {
						title: '逾期天数',
						minWidth: 100,
						key: 'overdueDays',
					}, {
						title: '逾期等级',
						minWidth: 100,
						key: 'overdueGrade',
					}, {
						title: '逾期总额',
						minWidth: 100,
						key: 'overdueTotalFee',
					}, {
						title: '所属团队',
						minWidth: 100,
						key: 'teamName',
					}, {
						title: '申请人',
						minWidth: 140,
						key: 'applicantor',
					}, {
						title: '申请时间',
						minWidth: 100,
						key: 'applyDate',
					},

					{
						title: '审核状态',
						minWidth: 100,
						key: 'status',
					},
					{
						title: '操作',
						minWidth: 100,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							if(this.getAuth('05000010201') || this.getAuth('05000010202') || this.getAuth('05000010203')){
								return h('div', [
									h('Dropdown', {
										props: {
											trigger: 'click',
											placement: "bottom-end"
										},
										on: {
											'on-click': (name) => {
												if (name == '1') {
													this.outSourcingAdvanceUpdate('1', params.row.idKey)
												} else if (name == '2') {
													this.outSourcingAdvanceUpdate('2', params.row.idKey)
												} else if (name == '3') {
													this.$router.push('finishDetail')
													this.setStore('opreateBtn', {
														showDelimitBtn: 'private',
														allINFO: params.row
													})
												}
											}
										}
									}, [
										h('Button', {
											props: {
												size: 'small',
												type: 'info',
												disabled: this.examineStatus
											}
										}, [
											h('span', '更多'),
											h('Icon', {
												props: {
													type: 'ios-arrow-down'
												},
												style: {
													marginLeft: '5px'
												}
											})
										]),
										h('DropdownMenu', {
											slot: 'list'
										}, [
											h('DropdownItem', {
												props: {
													name: '1'
												},style:{
													display:this.getAuth('05000010201') ? 'block' : 'none'
												}
											}, '通过'),
											h('DropdownItem', {
												props: {
													name: '2'
												},style:{
													display:this.getAuth('05000010202') ? 'block' : 'none'
												}
											}, '拒绝'),
											h('DropdownItem', {
												props: {
													name: '3'
												},style:{
													display:this.getAuth('05000010203') ? 'block' : 'none'
												}
											}, '详情')
										])
	
									])
								])
							}
						}
					},
				],
				datas: [],
				lists: [], // 批量审核传的数据
			}
		},
		components: {

		},
		methods: {
			init(page, pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
				this.HttpAjax('post', 'outSourcingAdvance', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						this.datas = res.data.data.data
						this.dataCount = res.data.data.dataCount
					}
				});
			},
			//查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData);
				for (let i in this.formData) {
					if (this.formData[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData[i])
					}
				}
				for (let i in this.formData1) {
					if (this.formData1[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData1[i])
					}
				}
				for (let i in this.formData2) {
					if (this.formData2[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData2[i])
					}
				}
				for (let i in this.formData3) {
					if (this.formData3[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData3[i])
					}
				}
				if (this.LastSubmitData.overdueDayStart || this.LastSubmitData.overdueDayEnd) { //判断有逾期天数字段
					if (this.LastSubmitData.overdueDayStart != '' || this.LastSubmitData.overdueDayEnd != '') { //逾期天数不为空
						const overdueDay = /^[0-9]*$/;
						if (!overdueDay.test(this.LastSubmitData.overdueDayStart) || !overdueDay.test(this.LastSubmitData.overdueDayEnd)) {
							this.$layer.msg('逾期天数必须为大于等于0的整数');
							return
						} else {
							if (parseInt(this.LastSubmitData.overdueDayStart) > parseInt(this.LastSubmitData.overdueDayEnd)) {
								this.$layer.msg('开始天数不能大于结束天数');
								return
							} else {
								this.init();
							}
						}
					} else {
						this.init();
					}
				} else {
					this.init();
				}
			},
			changePages(name) { //翻页-->第几页
				this.init(name);
			},
			changePagesTotall(name) { //每一页显示多少条数据
				this.LastSubmitData.pageSize = name;
				this.init('', name);
			},
			refresh() { //刷新
				this.init();
			},
			// 第0个下拉选择项变化时
			selectChange(val) {
				this.formIndex = val
			},
			// 第1 个下拉选择项变化时
			selectChange1(val) {
				this.formIndex1 = val
			},
			// 第2 个下拉选择项变化时
			selectChange2(val) {
				this.formIndex2 = val
			},
			// 第3个下拉选项变化时
			selectChange3(val) {
				this.formIndex3 = val
			},
			//第0下拉框展开
			ClearVal(val) {
				if (val) {
					this.ClearObject(this.formData)
				}
			},
			//第1下拉框展开
			ClearVal1(val) {
				if (val) {
					this.ClearObject(this.formData1)
				}
			},
			//第2下拉框展开
			ClearVal2(val) {
				if (val) {
					this.ClearObject(this.formData2)
				}
			},
			//第3下拉框展开
			ClearVal3(val) {
				if (val) {
					this.ClearObject(this.formData3)
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
			restData() { //重置
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			// 审核数据
			outSourcingAdvanceUpdate(status, idKey) {
				this.HttpAjax('post', 'outSourcingAdvanceUpdate', {
					"status": status,
					"idKey": idKey
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						if (status == '1') {
							this.$Notice.success({
								title: '成功',
								desc: '已通过!',
								duration: 2
							})
							this.init()
						} else {
							this.$Notice.success({
								title: '成功',
								desc: '已拒绝!',
								duration: 2
							})
							this.init()
						}

					}
				})
			},
			selectData(row) { //所选需要的批量审核的数据
				let Arr = [];
				for (var i = 0, len = row.length; i < len; i++) {
					Arr.push({
						idKey: row[i].idKey,
					})
				}
				this.selectdata = Arr;
			},

			// 批量审核数据
			updateBatch(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'updateBatch', JSON.stringify(this.selectdata), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status === 200) {
								this.$Notice.success({
									title: '成功',
									desc: '批量审核成功!',
									duration: 2
								})
								_.examineStatus = false;
								_.init();
							}
						}, 'json')
					}
				})

			},
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
			//所有下拉列表（字典表查询下拉条件
			getListDict(bol, label) {
				const _ = this;
				if (bol) {
					if (_.distList[label].length == 0) {
						_.HttpAjax('post', 'distList', {
							label: label
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								switch (label) {
									case 'mainBody':
										_.distList.mainBody = res.data.data; //主体
										break;
									case 'caseType':
										_.distList.caseType = res.data.data; //产品类型
								}
							}
						});
					}
				}
			},
			// 			// 产品类型列表（字典表里查询
			// 			queryProductTypeList(bol){
			// 				if(bol){
			// 					if(this.distList.productType.length ==0){
			// 						this.HttpAjax('post','queryProductTypeList',{},(res)=>{
			// 							store.commit('UPDATE_LOADINGSTATE',false);
			// 							if(res&&res.data.status==200){
			// 								this.distList.productType=res.data.data
			// 							}
			// 						})
			// 					}
			// 				}
			// 			},
			// 申请时间转换
			applicationTime(val,index) {
				index = index || '';
				if(index == ''){
					this.formData.applicationTime = val
				}else{
					this['formData'+index].applicationTime = val;
				}
			},
			examineShow() { //批量审核选择审核状态
				const _ = this;
				if (_.selectdata == '') {
					_.$Notice.error({
						title: '请选择要审核的记录',
						desc: '您还未选择要审核的记录',
						duration: 0
					});
					return
				}
				this.examineStatus = true;
			},
			selectStatus(name) { //判断审核状态选择的类型
				for (var i = 0, len = this.selectdata.length; i < len; i++) {
					this.selectdata[i].status = name;
				}
			},
			cancel() { //取消
				this.examineStatus = false
			},
			// 导出数据
			exportExcel() {
				this.HttpAjax('post', 'TestingDownloadOutsourcingAdvanceExcel', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.HttpAjax('post', 'downloadOutsourcingAdvanceExcel', qs.stringify(this.LastSubmitData), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							this.downLoadFile(res.data, '提前委外审核.xlsx');
						}, 'download')
					}
				})
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="less">
	.collectCaseMange {
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

	.ivu-icon:hover {
		cursor: pointer;
	}

	.modalTip {
		.ivu-modal .ivu-modal-body {
			overflow: visible;
		}
	}
</style>
