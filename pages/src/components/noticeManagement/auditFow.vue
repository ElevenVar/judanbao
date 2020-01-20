<template>
	<div class="auditFow">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">{{title}}</span>
				<span class="swith head-commom">
                {{rotate ? '收起' : '展开'}}
                <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
              </span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model="formData" :rules="ruleValidate" ref="formData">
							<FormItem label="审核事件" prop="flowType">
								<Select @on-open-change="getListDict($event,'RouteFlowType')" v-model="formData.flowType" placeholder="请选择审核事件！" size="large">
									<Option  v-if="item.type != '5'"  :key="index" v-for="(item,index) in distList.RouteFlowType" :value="item.type">{{item.value}}</Option>
								</Select>
							</FormItem>
							<FormItem label="业务线" prop="serviceLine">
								<Select @on-open-change="getListDict($event,'serviceLine')" v-model="formData.serviceLine" placeholder="请选择业务线！" size="large">
									<Option :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
								</Select>
							</FormItem>
							<FormItem label="产品类型" prop="producType">
								<Select @on-open-change="getProductTypeList" v-model="formData.producType" placeholder="请选择产品类型！" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click="init()" :disabled="addAuditFowModel">查询</Button>
								<Button @click="restData()" icon="plus-circled" :disabled="addAuditFowModel">重置</Button>
								<Button v-if="this.getAuth('08000010701')" icon="plus-circled" @click="addAuditFowData" :disabled="addAuditFowModel">新增</Button>
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
		<!--Modal 添加修改-->
		<Modal v-model="addAuditFowModel" class-name="add-flow" draggable :mask-closable="false" :scrollable="true" :loading="loading" :title="edit ? '修改审核流' : '新增审核流'">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline :model="addAuditFowForm" :rules="ruleValidateAdd" ref="addAuditFowForm">
					<FormItem label="流程名称" prop="flowName">
						<Input type="text" placeholder="请输入流程名称！" :maxlength="50" v-model="addAuditFowForm.flowName" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="审核事件" prop="flowType">
						<Select @on-change="showFlowType" v-model="addAuditFowForm.flowType" placeholder="请选择审核事件！" :style="width" size="large">
							<Option v-if="item.type != '5'" v-for="(item,index) in distList.RouteFlowType" :key="index"  :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="数据来源"  v-if="addAuditFowForm.flowType == 1">
						<Select v-model="addAuditFowForm.dataSource"  placeholder="请选择数据来源！" :style="width" size="large">
							<Option :disabled="item.type =='ALL' && addAuditFowForm.flowType =='1' 	" :key="index" v-for="(item,index) in distList.dataSource" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="业务线" prop="serviceLine" v-if="bairongType">
						<Select v-model="addAuditFowForm.serviceLine" placeholder="请选择业务线！" :style="width" size="large">
							<Option :disabled="item.type =='ALL' && addAuditFowForm.flowType =='1' 	" :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="产品类型" prop="producType" v-if="bairongType">
						<Checkbox :indeterminate="indeterminate" :value="checkAll" class="add-flow-all" @click.prevent.native="handleCheckAll">全选</Checkbox>
						<CheckboxGroup :style="width" size="large" class="teamHeight" placeholder="请选择产品类型！" v-model="addAuditFowForm.producType" @on-change="selectSettleType">
							<Checkbox :label="item.productTypeNo" v-for="(item,index) in distList.queryProductTypeList" :key="index"><span>{{item.productTypeName}}</span></Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem label="减免结清类型" prop="settleType" v-if="showHidden">
						<Select v-model="addAuditFowForm.settleType" placeholder="请选择减免结清类型！" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.RouteSettleType" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="减免分类" prop="opreateType1" v-if="showHidden">
						<Select @on-change="jmTypeChange" v-model="addAuditFowForm.opreateType1" placeholder="请选择减免分类！" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.RouteOpreateTypeOne" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="判断条件" prop="routeRuleType" v-if="showHidden">
						<Select :disabled="true" @on-change="showRouteRule" v-model="addAuditFowForm.routeRuleType" style="width: 142px" size="large">
							<Option :key="index" v-for="(item,index) in distList.RouteAmountJudge" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem class="show-money" v-if="showHidden">
						<div v-if="showMoneyY"><input placeholder="请输入最小值！" :maxlength="16" v-model="addAuditFowForm.minDeductionAmount" />元-<input placeholder="请输入最大值！" :maxlength="16" v-model="addAuditFowForm.maxDeductionAmount" />元</div>
						<div v-if="showMoneyB"><input placeholder="请输入最小值！" :maxlength="16" v-model="addAuditFowForm.minDeductionAmount" />%-<input placeholder="请输入最大值！" :maxlength="16" v-model="addAuditFowForm.maxDeductionAmount" />%</div>
					</FormItem>
					<FormItem label="是否交叉销售" prop="isCrossSale">
						<Select v-model="addAuditFowForm.isCrossSale" placeholder="请选择是否交叉销售！" :style="width" size="large">
							<Option value="0">否</Option>
							<Option value="1">是</Option>
						</Select>
					</FormItem>
					<FormItem label="发起人角色" prop="originator">
						<Select v-model="addAuditFowForm.originator" placeholder="请选择发起人角色！" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.Role" :value="item.idKey">{{item.name}}</Option>
						</Select>
					</FormItem>
					<!--<div class="tree-item">
						<div class="header-tree" prop="roleIds">审核角色</div>
						<Transfer ref="transferModel" :data="targetKeys1" :target-keys="targetKeys2" filterable :filter-method="filterMethod" @on-change="handleChange2"></Transfer>
					</div>-->
					<div class="tree-item">
						<div class="header-tree" prop="roleIds">审核角色</div>
						<div id="transferModal">
							<div class="leftTransfer">
								<div class="transferHead">
									<span>源角色</span>
								</div>
								<div class="transferSearch">
									<Input search placeholder="搜索内容" size="small" @on-search="searchTransfer" v-model="searchLeftContent" />
								</div>
								<div class="transferBody">
									<span v-if="targetKeys1.length <= 0" class="nullData">列表为空</span>
									<CheckboxGroup v-else v-model="transfer.targetKeyArrL" @on-change="checkboxGroup">
										<Checkbox v-if="item.show" :disabled="item.disabled" :label="item.idKey" :key="index" v-for="(item,index) in targetKeys1"><span>{{item.name}}</span></Checkbox>
									</CheckboxGroup>
								</div>
							</div>
							<div class="midTransfer">
								<Button type="primary" :disabled="transfer.targetKeyArrR.length <=0" size="small" @click="toTransfLeft"><Icon type="ios-arrow-back" /></Button>
								<Button type="primary" :disabled="transfer.targetKeyArrL.length <=0" size="small" @click="toTransfRight"><Icon type="ios-arrow-forward"  /></Button>
							</div>
							<div class="rightTransfer">
								<div class="transferHead">
									<span>目的列表</span>
								</div>
								<div class="transferSearch">
									<Input search placeholder="搜索内容" size="small" @on-search="searchTransferR" v-model="searchRightContent" />
								</div>
								<div class="transferBody">
									<span v-if="targetKeys2.length <= 0" class="nullData">列表为空</span>
									<CheckboxGroup v-else v-model="transfer.targetKeyArrR" @on-change="checkboxGroup2">
										<div v-if="item.show" v-for="(item,index) in targetKeys2" class="flextRightCont">
											<Checkbox :disabled="item.disabled" :label="item.idKey" :key="index">
												<span>{{item.name}}</span>
											</Checkbox>
											<Select :disabled="item.disabled" size="small" @on-change="sysTemsChange($event,item)" :value="item.sysTems" class="transfSelec" placeholder="选择">
												<Option value="1">担保</Option>
												<Option value="2">财务</Option>
											</Select>
										</div>
									</CheckboxGroup>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="addAuditFowMethod('addAuditFowForm')">确定</Button>
			</div>
		</Modal>
		<!--Modal 更多产品类型-->
		<Modal v-model="showCard" class-name="cardClass" draggable :mask-closable="false" :scrollable="true" :loading="loading" title="更多产品类型">
			<Card style="width:350px">
				<p slot="title">
					审核流事件： {{this.auditFlow}}
				</p>
				<ul class="productUl">
					<li v-for="(item,index) in this.contentInfo" :key="index">
						<span>{{item}}</span>
					</li>
				</ul>
			</Card>
			<div slot="footer">
				<!--<Button type="text" size="large" @click="cancel">取消</Button>-->
				<!--<Button type="primary" size="large" @click="">确定</Button>-->
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import expandRow from '../common/auditFowExpand.vue'

	export default {
		components: {
			expandRow
		},
		data() {
			return {
				value1: '1',
				title: '流程配置',
				rotate: true,
				totallPages: 0,
				addAuditFowModel: false,
				loading: true,
				edit: false,
				showMoneyY: true,
				showMoneyB: false,
				showHidden: true,
				bairongType: true,
				showCard: false, //显示更多产品类型
				auditFlow: '', //审核流名称
				contentInfo: [], //列表查看产品类型数据
				indeterminate: false, //全选样式
				checkAll: false, //是否全选中
				selectProductLenght: '', //产品类型长度
				transfer: { //穿梭框数据
					targetKeyArrL: [],
					targetKeyArrR: []
				},
				searchLeftContent: '', //穿梭框源角色搜索
				searchRightContent: '', //穿梭框目的列表搜索
				width: {
					'width': '388px'
				},
				authNodeData: [],
				targetKeys: [],
				targetKeys1: [], //左侧所有角色集合
				targetKeys2: [], //右侧角色集合
				distList: {
					serviceLine: [], //产品线
					RouteFlowType: [], //审核事件
					queryProductTypeList: [], //产品类型
					RouteAmountJudge: [], //流程金额判断
					RouteSettleType: [], //流程结清类型
					RouteOpreateTypeOne: [], //减免分类
					Role: [], //角色
					queryProductTypeListLength: '',
					dataSource:[], //数据来源
				},
				formData: { //筛选字段
					pageIndex: '1',
					pageSize: '10',
					flowType: '',
					serviceLine: '',
					producType: ''
				},
				ruleValidate: { //筛选验证
					flowName: [{
						required: false,
						message: '请选择审核事件！'
					}],
					serviceLine: [{
						required: false,
						message: '请选择产品线！'
					}],
					settleType: [{
						required: false,
						message: '请选择减免结清类型！'
					}],
				},
				addAuditFowForm: { //添加修改字段
					flowName: '',
					flowType: '',
					serviceLine: '',
					settleType: '',
					opreateType1: '',
					routeRuleType: '1',
					minDeductionAmount: '',
					maxDeductionAmount: '',
					isCrossSale: '',
					originator: '',
					roleIds: '',
					sysTems: '',
					routeDesc: '',
					producType: [],
					dataSource: '', // 数据来源
				},
				ruleValidateAdd: { //新增修改验证
					flowName: [{
						required: true,
						message: '请输入流程名称！'
					}],
					flowType: [{
						required: true,
						message: '请选择审核事件！'
					}],
					serviceLine: [{
						required: true,
						message: '请选择产品线！'
					}],
					settleType: [{
						required: true,
						message: '请选择减免结清类型！'
					}],
					opreateType1: [{
						required: true,
						message: '请选择减免分类！'
					}],
					routeRuleType: [{
						required: true,
						message: '请选择判断条件！'
					}],
					minDeductionAmount: [{
						required: true,
						message: '请输入减免最小金额！'
					}],
					maxDeductionAmount: [{
						required: true,
						message: '请输入减免最大金额！'
					}],
					isCrossSale: [{
						required: true,
						message: '请选择是否交叉销售！'
					}],
					originator: [{
						required: true,
						message: '请选择发起人角色！'
					}],
					roleIds: [{
						required: true,
						message: '请选择审核角色！'
					}],
					producType: [{
						required: true,
						message: '请选择产品类型！'
					}],
				},
				columns: [{
						title: '查看审核流程',
						type: 'expand',
						width: 120,
						render: (h, params) => {
							return h(expandRow, {
								props: {
									row: params.row
								}
							})
						}
					},
					{
						title: '序号',
						minWidth: 120,
						type: 'index'
					},
					{
						title: '流程名称',
						minWidth: 120,
						key: 'flowName',

					},
					{
						title: '审核事件',
						minWidth: 120,
						key: 'flowTypeName',

					},
					{
						title: '业务线',
						minWidth: 120,
						key: 'serverLineName'
					},
					{
						title: '产品类型',
						minWidth: 300,
						key: 'producType',
						render: (h, params) => {
							return h('div', [
								h('div', {
									style: {
										marginRight: '5px',
										display: 'inline-block'
									},
								}, this.showProduct(params)), //展现列表中产品类型前四个
								h('a', {
									style: {
										marginRight: '5px',
										display: params.row.producType.length > 3 ? 'inline' : 'none'
									},
									on: {
										click: () => {
											this.prodectInfo(params) //查看列表产品类型所有
										}
									}
								}, '更多')
							]);
						}
					},
					{
						title: '操作',
						minWidth: 150,
						key: 'number',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										disabled: this.addAuditFowModel
									},
									style: {
										display:this.getAuth('08000010702') ? 'inline-block' :'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.updataAuditFow(params) //修改
										}
									}
								}, '修改'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.addAuditFowModel
									},
									style: {
										display:this.getAuth('08000010703') ? 'inline-block' :'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.deleteAuditFow(params) //删除
										}
									}
								}, '删除'),
							])
						}
					},
				],
				datas: []
			}
		},
		methods: {
			init() {
				const _ = this;
				_.auditFowList();
				_.getDataSource(); //查询数据来源
			},
			auditFowList(page, pagesize) { //列表初始化
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;

				_.HttpAjax('post', 'aduitFowList', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						_.totallPages = res.data.data.dataCount;
						_.datas = res.data.data.data;
					}
				});
			},
			changePages(name) { //翻页-->第几页
				this.auditFowList(name);
			},
			changePagesTotall(name) { //每一页显示多少条数据
				this.formData.pageSize = name;
				this.auditFowList('', name);
			},
			refresh() { //刷新
				this.auditFowList();
			},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
				for(let i in _.formData) {
					if(i != 'pageIndex' && i != 'pageSize') {
						_.formData[i] = '';
					}
				}
			},
			cancel() { //取消
				this.addAuditFowModel = false
			},
			handleCheckAll() { //全选操作
				let allSelectProduct = this.distList.queryProductTypeList;
				let selectProductLenght = this.distList.queryProductTypeList.length;
				let productData = [];
				for(let i = 0; i < selectProductLenght; i++) {
					productData.push(allSelectProduct[i].productTypeNo)
				}
				if(this.indeterminate) {
					this.checkAll = false;
				} else {
					this.checkAll = !this.checkAll;
				}
				this.indeterminate = false;

				if(this.checkAll) {
					this.addAuditFowForm.producType = productData;
				} else {
					this.addAuditFowForm.producType = [];
				}
			},
			showProduct(row) { //显示隐藏更多按钮
				let partData = [];
				let productTypeList = row.row.productTypeLists;
				for(let i = 0, len = productTypeList.length; i < len; i++) {
					if(productTypeList[i].selected == true) {
						partData.push(productTypeList[i].productTypeName)
					}
				}
				let partDataNow = [];
				for(let k = 0, len = partData.length; k < len; k++) {
					if(k <= 3) {
						partDataNow.push(partData[k])
					}
				}
				return partDataNow.join(',');
			},
			prodectInfo(row) { //查看更多产品类型
				this.showCard = true;
				this.contentInfo = [];
				let showProductTypeLists = [];
				let productTypeLists = row.row.productTypeLists;
				for(let i = 0, len = productTypeLists.length; i < len; i++) {
					if(productTypeLists[i].selected) {
						showProductTypeLists.push(productTypeLists[i].productTypeName)
					}
				}
				this.contentInfo = showProductTypeLists;
				this.auditFlow = row.row.flowTypeName;
			},
			// 流程按钮点击事件
			getCheckPrecess(row) {
				const _ = this;
				//设置流程展开
				_.datas[row._index]._expanded = !_.datas[row._index]._expanded;
				_.datas.reverse().reverse();
			},
			addAuditFowData() { //新增
				this.addAuditFowModel = true;
				this.showHidden = true;
				this.edit = false;
				this.indeterminate = false;
				this.checkAll = false;

				this.$refs['addAuditFowForm'].resetFields();
				this.searchLeftContent = ''; //搜索框源角色搜索清空
				this.searchRightContent = ''; //搜索框目的列表搜索清空
				this.targetKeys2 = [];
				this.addAuditFowForm.settleType = '';
				this.addAuditFowForm.routeRuleType = '1';
				this.addAuditFowForm.opreateType1 = '';
				this.addAuditFowForm.minDeductionAmount = '';
				this.addAuditFowForm.maxDeductionAmount = '';
				this.getRole();
				this.getProductTypeList(); //产品类型
				this.getListDictModel('RouteFlowType'); //审核事件
				this.getListDictModel('serviceLine'); //产品线
				this.getListDictModel('RouteSettleType'); //减免结清类型
				this.getListDictModel('RouteOpreateTypeOne'); //减免分类
				this.getListDictModel('RouteAmountJudge'); //判断条件

			},
			updataAuditFow(row) { //修改
				const _ = this;
				_.addAuditFowModel = true;
				_.$refs['addAuditFowForm'].resetFields();
				_.searchLeftContent = ''; //搜索框源角色搜索清空
				_.searchRightContent = ''; //搜索框目的列表搜索清空
				_.edit = true;
				_.indeterminate = false;
				_.checkAll = false;

				if(row.row.flowType == '1') {
					this.showHidden = true;
					this.bairongType = true;
				} else if(row.row.flowType == '6') {
					this.bairongType = false;
					this.showHidden = false;
					this.addAuditFowForm.settleType = '';
					this.addAuditFowForm.opreateType1 = '';
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
					this.addAuditFowForm.serviceLine = '';
					this.addAuditFowForm.producType = [];
				} else {
					this.showHidden = false;
					this.bairongType = true;
					this.addAuditFowForm.settleType = '';
					this.addAuditFowForm.opreateType1 = '';
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
				}
				// if(row.row.flowType != '1') { //如果审核事件为减免，则显示，否则隐藏，
				// 	this.showHidden = false;
				// 	this.addAuditFowForm.settleType = '';
				// 	this.addAuditFowForm.opreateType1 = '';
				// 	this.addAuditFowForm.minDeductionAmount = '';
				// 	this.addAuditFowForm.maxDeductionAmount = '';
				// } else {
				// 	this.showHidden = true;
				// }
				if(row.row.routeRuleType == '2') { //如果是选择的条件为减免占比，则显示占比范围框
					_.showMoneyY = false;
					_.showMoneyB = true;
				} else { //如果是选择的条件为减免金额，则显示金额范围框
					_.showMoneyY = true;
					_.showMoneyB = false;
				}

				_.targetKeys1 = [];
				_.targetKeys2 = [];
				_.getRole(row, 'edit');
				_.getProductTypeList();
				_.getListDictModel('RouteFlowType'); //审核事件
				_.getListDictModel('serviceLine'); //产品线
				_.getListDictModel('RouteSettleType'); //减免结清类型
				_.getListDictModel('RouteOpreateTypeOne'); //减免分类
				_.getListDictModel('RouteAmountJudge'); //判断条件
				for(let i in _.addAuditFowForm) { //回显列表里的数据
					_.addAuditFowForm[i] = row.row[i];
				}
				_.addAuditFowForm.idKey = row.row.idKey;

			},
			addAuditFowMethod(name) { //确定添加修改
				const _ = this;
				let roleIds = [];
				let sysTems = [];
				let roleName = [];
				for(let i = 0; i < _.targetKeys2.length; i++) {
					roleIds.push(_.targetKeys2[i].idKey);
					sysTems.push(_.targetKeys2[i].sysTems);
					roleName.push(_.targetKeys2[i].name);
				}
				_.addAuditFowForm.roleIds = roleIds.join('--');
				_.addAuditFowForm.sysTems = sysTems.join('--');
				_.addAuditFowForm.routeDesc = roleName.join('--');

				_.$refs[name].validate((valid) => {
					if(valid) {
						//开始   判断范围值是否填写
						/*if(_.addAuditFowForm.settleType == '01' && _.addAuditFowForm.minDeductionAmount == '') {
							_.$layer.msg('请输入最小值！');
							return;
						}*/
						if(_.addAuditFowForm.settleType == '01' && _.addAuditFowForm.maxDeductionAmount == '') {
							_.$layer.msg('请输入最大值！');
							return;
						}
						//结束   判断范围值是否填写

						//开始   判断范围值是否合理
						if(_.addAuditFowForm.flowType == '1') {
							if(_.addAuditFowForm.routeRuleType == '2') {
								let regD = /^(\d?\d(\.\d{1,16})?|100)$/;
								if(!_.addAuditFowForm.minDeductionAmount.match(regD) && _.addAuditFowForm.minDeductionAmount != '') {
									this.$layer.msg('请输入0-100之间的数字！');
									return;
								}
								if(!_.addAuditFowForm.maxDeductionAmount.match(regD)) {
									this.$layer.msg('请输入0-100之间的数字！');
									return;
								}
								if(parseInt(_.addAuditFowForm.maxDeductionAmount) < _.addAuditFowForm.minDeductionAmount) {
									this.$layer.msg('最大值必须大于最小值，请重新输入！');
									return;
								}
							} else {
								let regD = /^[0-9]\d*(\.\d+)?$/;
								if(!regD.test(_.addAuditFowForm.minDeductionAmount) && _.addAuditFowForm.minDeductionAmount != '') {
									this.$layer.msg('请输入大于0的金额！');
									return;
								}
								if(!regD.test(_.addAuditFowForm.maxDeductionAmount)) {
									this.$layer.msg('请输入大于0的金额！');
									return;
								}
								if(parseInt(_.addAuditFowForm.maxDeductionAmount) < _.addAuditFowForm.minDeductionAmount) {
									this.$layer.msg('最大值必须大于最小值，请重新输入！');
									return;
								}
							}
						}
						//结束  判断范围值是否合理

						//开始  判断审核角色是否选择
						if(_.addAuditFowForm.roleIds == '' && _.addAuditFowForm.sysTems == '') {
							_.$layer.msg('请选择审核角色！');
							return;
						}
						//结束  判断审核角色是否选择

						if(!_.edit) { //添加方法
							_.HttpAjax('post', 'aduitFowAdd', _.addAuditFowForm, (res) => { //添加方法
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '添加审核流成功！',
										duration: 2
									});
									_.addAuditFowModel = false;
									_.init();
								}
							})
						} else { //修改方法
							_.HttpAjax('post', 'aduitFowModify', _.addAuditFowForm, (res) => { //修改方法
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '修改审核流成功！',
										duration: 2
									});
									_.addAuditFowModel = false;
									_.init();
								}
							})
						}
					}
				})
			},
			deleteAuditFow(list) { //删除
				const _ = this;
				_.$Modal.confirm({
					title: '删除审核流',
					content: '确定删除流程名称为 ' + list.row.flowName + ' 这个审核流吗？',
					onOk: () => {
						_.HttpAjax('post', 'aduitFowDelete', {
							routeId: list.row.idKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '删除成功！',
									duration: 2
								});
								_.init();
							}
						});
					}
				})
			},
			lookAuditFow(list) { //查看审核流
				const _ = this;
				_.HttpAjax('post', 'aduitFowRouteStep', {
					routeId: list.row.idKey
				}, (res) => { //修改方法
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						let lineData = res.data.data;
						list.row.line = lineData;
					}
				})
			},
			getListDictModel(label) { //模态框下拉列表
				const _ = this;
				_.HttpAjax('post', 'distList', {
					label: label
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						switch(label) {
							case 'serviceLine':
								_.distList.serviceLine = res.data.data; //产品线
								break;
							case 'RouteFlowType': //审核事件
								_.distList.RouteFlowType = res.data.data;
								break;
							case 'RouteAmountJudge': //判断条件
								_.distList.RouteAmountJudge = res.data.data;
								break;
							case 'RouteSettleType': //减免结清类型
								_.distList.RouteSettleType = res.data.data;
								break;
							case 'RouteOpreateTypeOne': //减免分类
								_.distList.RouteOpreateTypeOne = [];
								for(let i = 0, len = res.data.data.length; i < len; i++) {
									if(res.data.data[i].value != '临时停催' && res.data.data[i].value != '永久停催') {
										_.distList.RouteOpreateTypeOne.push(res.data.data[i])
									}
								}
								break;
						}
					}
				});
			},
			getListDict(bol, label) { //筛选所有下拉列表
				const _ = this;
				if(bol) {
					if(_.distList[label].length == 0) {
						_.HttpAjax('post', 'distList', {
							label: label
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								switch(label) {
									case 'serviceLine':
										_.distList.serviceLine = res.data.data;
										break;
									case 'RouteFlowType':
										_.distList.RouteFlowType = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			getProductTypeList(bol) { //产品类型下拉列表
				const _ = this;
				if(bol) {
					if(_.distList.queryProductTypeList.length == 0) {
						_.HttpAjax('post', 'queryProductTypeList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								_.distList.queryProductTypeList = res.data.data; //产品类型
							}
						})
					}
				} else {
					_.HttpAjax('post', 'queryProductTypeList', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == '200') {
							_.distList.queryProductTypeList = res.data.data; //产品类型
							_.distList.queryProductTypeListLength = res.data.data.length; //产品类型长度

							if(_.addAuditFowForm.producType.length == _.distList.queryProductTypeListLength) {
								this.indeterminate = false;
								this.checkAll = true;
							}

						}
					})
				}
			},
			getRole(row, tip) { //获取角色
				const _ = this;
				_.HttpAjax('post', 'userManage', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						let role = res.data.data.allRole;
						_.distList.Role = role;
						for(let i = 0; i < role.length; i++) {
							role[i].show = true;
							role[i].disabled = false;
							role[i].sysTems = '1';
						}
						_.targetKeys = role;
						_.targetKeys1 = role;
						if(tip == 'edit') {
							//开始 --修改审核角色时，赋值角色
							let newRoleIds = row.row.roleIds.split('--');
							let newSysTems = row.row.sysTems.split('--');

							for(let i = 0, len = newRoleIds.length; i < len; i++) {
								for(let j = 0, len = _.targetKeys1.length; j < len; j++) {
									if(newRoleIds[i] == _.targetKeys1[j].idKey) {
										_.targetKeys1[j].sysTems = newSysTems[i];
										_.targetKeys2.push(JSON.parse(JSON.stringify(_.targetKeys1[j])));
										_.targetKeys1[j].show = false;
										_.targetKeys1[j].sysTems = '1';
									}
								}
							}
							//结束 --修改审核角色时，赋值角色
						}
					}
				});
			},
			showRouteRule(name) { //选择判断条件
				if(name == 1) { //如果是选择减免金额
					this.showMoneyY = true;
					this.showMoneyB = false;
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
				} else { //如果是选择减免占比
					this.showMoneyY = false;
					this.showMoneyB = true;
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
				}

			},
			showFlowType(name) {
				if(name == 1) {
					this.showHidden = true;
					this.bairongType = true;
					this.addAuditFowForm.settleType = '';
					this.addAuditFowForm.opreateType1 = '';
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
				} else if(name == undefined) {
					this.showHidden = true;
					this.bairongType = true;
					this.addAuditFowForm.routeRuleType = '1';
					this.showMoneyY = true;
					this.showMoneyB = false;
				} else if(name == 6) {
					this.bairongType = false;
					this.showHidden = false;
					this.addAuditFowForm.settleType = '';
					this.addAuditFowForm.opreateType1 = '';
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
					this.addAuditFowForm.serviceLine = '';
					this.addAuditFowForm.producType = [];
				} else {
					this.showHidden = false;
					this.bairongType = true;
					this.addAuditFowForm.settleType = '';
					this.addAuditFowForm.opreateType1 = '';
					this.addAuditFowForm.minDeductionAmount = '';
					this.addAuditFowForm.maxDeductionAmount = '';
				}
				this.addAuditFowForm.serviceLine = '';
			},
			selectSettleType(name) {
				const _ = this;
				_.addAuditFowForm.producType = name; //选择产品类型

				if(name.length === _.selectProductLenght) { //判断全选是否需要
					this.indeterminate = false;
					this.checkAll = true;
				} else if(name.length > 0 && name.length < _.selectProductLenght) {
					this.indeterminate = true;
					this.checkAll = false;
				} else {
					this.indeterminate = false;
					this.checkAll = false;
				}
			},
			handleChange2(newTargetKeys) { //选择的审核角色
				this.targetKeys2 = newTargetKeys;
				this.addAuditFowForm.roleIds = newTargetKeys.join('--');

			},
			filterMethod(data, query) {
				return data.label.indexOf(query) > -1;
			}, 
			//穿梭框---->向左
			toTransfLeft() {
				const _ = this;
				let rightTransf = _.transfer.targetKeyArrR;
				for(let i = 0; i < _.targetKeys2.length; i++) {
					_.targetKeys2[i].disabled = false;
					for(let j = 0; j < _.targetKeys1.length; j++) {
						if(_.targetKeys1[j].idKey == rightTransf[0]) {
							_.targetKeys1[j].show = true;
							delete _.targetKeys1[j].isSelect;
						}
					}
					if(_.targetKeys2[i].idKey == rightTransf[0]) {
						_.targetKeys2.splice(i, 1);
						i--;
						rightTransf.splice(0, 1);
					}
				}
			}, 
			//穿梭框---->向右
			toTransfRight() {
				
				const _ = this;
				let leftTransf = _.transfer.targetKeyArrL;
				for(let i = 0; i < _.targetKeys1.length; i++) {
					_.targetKeys1[i].disabled = false;
					if(_.targetKeys1[i].idKey == leftTransf[0]) {
						_.targetKeys2.push(JSON.parse(JSON.stringify(_.targetKeys1[i])));
						_.targetKeys1[i].show = false;
						_.targetKeys1[i].isSelect = true;

						leftTransf.splice(0, 1);
					}
				}
			}, 
			//穿梭框---->左边的事件
			checkboxGroup(name) {
				const _ = this;
				if(name.length > 0) {
					for(let i = 0; i < _.targetKeys1.length; i++) {
						_.targetKeys1[i].disabled = true;
						if(_.targetKeys1[i].idKey == name[0]) {
							_.targetKeys1[i].disabled = false;
						}
					}
				} else {
					for(let i = 0; i < _.targetKeys1.length; i++) {
						_.targetKeys1[i].disabled = false;
					}
				}
			}, 
			//穿梭框---->右边的事件
			checkboxGroup2(name) {
				const _ = this;
				if(name.length > 0) {
					for(let i = 0; i < _.targetKeys2.length; i++) {
						_.targetKeys2[i].disabled = true;
						if(_.targetKeys2[i].idKey == name[0]) {
							_.targetKeys2[i].disabled = false;
						}
					}
				} else {
					for(let i = 0; i < _.targetKeys2.length; i++) {
						_.targetKeys2[i].disabled = false;
					}
				}
			},
			 //穿梭狂select事件
			sysTemsChange(val, item) {
				item.sysTems = val;
			}, 
			//穿梭框左边搜索
			searchTransfer(name) {
				const _ = this;
				if(name != '') {
					for(let i = 0; i < _.targetKeys1.length; i++) {
						if(_.targetKeys1[i].name.indexOf(name) != -1 && !_.targetKeys1[i].isSelect) {
							_.targetKeys1[i].show = true;
						} else {
							_.targetKeys1[i].show = false;
						}
					}
				} else {
					for(let i = 0; i < _.targetKeys1.length; i++) {
						_.targetKeys1[i].show = true;
					}
				}
				_.targetKeys1.reverse().reverse();
			}, 
			//穿梭框右边边搜索
			searchTransferR(name) {
				const _ = this;
				if(name != '') {
					for(let i = 0; i < _.targetKeys2.length; i++) {
						if(_.targetKeys2[i].name.indexOf(name) != -1) {
							_.targetKeys2[i].show = true;
						} else {
							_.targetKeys2[i].show = false;
						}
					}
				} else {
					for(let i = 0; i < _.targetKeys2.length; i++) {
						_.targetKeys2[i].show = true;
					}
				}
				_.targetKeys2.reverse().reverse();
			},
			jmTypeChange(val) {
				const _ = this;
				if(val == '5') {
					//当为特殊减免时！
					_.addAuditFowForm.routeRuleType = '2';
					this.showRouteRule('2');
				} else {
					_.addAuditFowForm.routeRuleType = '1';
					this.showRouteRule('1');
				}
			},
			//查询数据来源
			getDataSource(){
					this.HttpAjax('post','getDictionariesByTypes',{type:'data_source'},(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status ==200){
							this.distList.dataSource = res.data.data
						}
					})
			},
		},
		created() {
			
		},
		mounted() {
			this.init(); //初始化列表
			// this.getRole();//获取角色
		}
	}
</script>

<style lang="less">
	.add-flow {
		/*.ivu-checkbox-default{*/
		/*border-color: #dddee1;*/
		/*}*/
		.add-flow-all {
			width: 388px;
			border: 1px solid #dddee1;
			border-bottom: none;
			padding-left: 6px;
			padding-bottom: 2px;
		}
		.show-money {
			.ivu-form-item-content {
				margin-left: 0px !important;
				input {
					width: 100px;
					border: 1px solid #dddee1;
					padding-left: 2px;
				}
				input::-webkit-input-placeholder {
					color: #c5c8ce;
				}
				input::-moz-placeholder {
					color: #c5c8ce;
				}
				input::-moz-placeholder {
					color: #c5c8ce;
				}
				input::-ms-input-placeholder {
					color: #c5c8ce;
				}
			}
		}
	}
	
	.ivu-icon:hover {
		cursor: pointer;
	}
	
	#transferModal {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 15px 2px;
		.leftTransfer {
			width: 170px;
		}
		.rightTransfer {
			width: 240px;
		}
		.leftTransfer,
		.rightTransfer {
			border-radius: 5px;
			border: 1px solid #dcdee2;
			.transferHead {
				display: flex;
				background: #f9fafc;
				align-content: center;
				padding: 10px;
				border-radius: 5px 5px 0 0;
				.ivu-checkbox {
					margin-right: 10px;
				}
			}
			.transferSearch {
				padding: 8px 10px;
			}
			.transferBody {
				height: 150px;
				overflow-y: auto;
				display: flex;
				flex-direction: column;
				.nullData {
					color: #c5c8ce;
					text-align: center;
				}
				.ivu-checkbox-group {
					height: auto!important;
					border: none;
					border-top: 1px solid #dddee1;
					overflow-x: hidden;
					border: none !important;
					overflow-x: hidden;
				}
				.ivu-checkbox-group {
					.ivu-checkbox-wrapper {
						width: 100%;
						padding: 5px 0
					}
				}
				.flextRightCont {
					display: flex;
					align-items: center;
				}
				.transfSelec {
					width: 60px;
					font-size: 12px;
					.ivu-select-placeholder {
						font-size: 12px;
					}
					.ivu-select-selected-value {
						font-size: 12px;
					}
					.ivu-select-item {
						padding: 4px 16px;
					}
				}
			}
		}
		.midTransfer {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 90px 20px 0;
			button {
				margin: 0 0 10px;
			}
		}
	}
	
	.teamHeight {
		height: auto !important;
		min-height: 36px;
	}
	
	.cardClass {
		.ivu-modal-body {
			.ivu-card {
				width: 480px !important;
			}
			.ivu-card-body {
				min-height: 300px;
				ul {
					list-style: none;
					display: flex;
					flex-wrap: wrap;
					li {
						min-width: 100px;
						padding: 0px 6px;
					}
				}
			}
		}
	}
	
	.expand-row .stepsCom .ivu-steps-item .ivu-steps-content {
		left: -6px !important;
	}
</style>