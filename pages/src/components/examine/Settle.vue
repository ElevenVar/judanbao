<template>
	<div class="Settle">
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
					<div class="from-items">
						<!--第0个下拉选择框-->
						<Form label-position="right" inline :model="search_data">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="chang_value_one" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="1" v-show='chang_value_two != 1 && chang_value_three != 1 && chang_value_four != 1'>合同编号</Option>
									<Option value="2" v-show='chang_value_two != 2 && chang_value_three != 2 && chang_value_four != 2'>营业部</Option>
									<Option value="3" v-show='chang_value_two != 3 && chang_value_three != 3 && chang_value_four != 3'>客户姓名</Option>
									<Option value="4" v-show='chang_value_two != 4 && chang_value_three != 4 && chang_value_four != 4'>减免类型</Option>
									<Option value="5" v-show='chang_value_two != 5 && chang_value_three != 5 && chang_value_four != 5'>提交人</Option>
								</Select>
								<Input v-show="chang_value_one == 1" type="text" placeholder="请输入合同编号" v-model="search_data.loanContractNo"
								 size="large"></Input>
								<Select filterable v-show="chang_value_one == 2" placeholder="请选择营业部" class="twoSelect" size="large" v-model="search_data.belongOrgNo">
									<Option :key="item.idKey" v-for="item in getCenterName" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="chang_value_one == 3" type="text" placeholder="请输入客户姓名" v-model="search_data.loanName" size="large"></Input>
								<Select v-show="chang_value_one == 4" placeholder="请选择减免类型" class="twoSelect" size="large" v-model="search_data.applyType">
									<Option value="提前结清">提前结清</Option>
									<Option value="非提前结清减免">非提前结清减免</Option>
								</Select>
								<Input v-show="chang_value_one == 5" type="text" placeholder="请输入提交人" v-model="search_data.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!--第1个下拉选择框-->
						<Form label-position="right" inline :model="search_data1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="chang_value_two" @on-change="selectChange($event,'two')" @on-open-change="ClearVal($event,'1')">
									<Option value="1" v-show='chang_value_one != 1 && chang_value_three != 1 && chang_value_four != 1'>合同编号</Option>
									<Option value="2" v-show='chang_value_one != 2 && chang_value_three != 2 && chang_value_four != 2'>营业部</Option>
									<Option value="3" v-show='chang_value_one != 3 && chang_value_three != 3 && chang_value_four != 3'>客户姓名</Option>
									<Option value="4" v-show='chang_value_one != 4 && chang_value_three != 4 && chang_value_four != 4'>减免类型</Option>
									<Option value="5" v-show='chang_value_one != 5 && chang_value_three != 5 && chang_value_four != 5'>提交人</Option>
								</Select>
								<Input v-show="chang_value_two == 1" type="text" placeholder="请输入合同编号" v-model="search_data1.loanContractNo"
								 size="large"></Input>
								<Select filterable v-show="chang_value_two == 2" placeholder="请选择营业部" class="twoSelect" size="large" v-model="search_data1.belongOrgNo">
									<Option :key="item.idKey" v-for="item in getCenterName" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="chang_value_two == 3" type="text" placeholder="请输入客户姓名" v-model="search_data1.loanName" size="large"></Input>
								<Select v-show="chang_value_two == 4" placeholder="请选择减免类型" class="twoSelect" size="large" v-model="search_data1.applyType">
									<Option value="提前结清">提前结清</Option>
									<Option value="非提前结清减免">非提前结清减免</Option>
								</Select>
								<Input v-show="chang_value_two == 5" type="text" placeholder="请输入提交人" v-model="search_data1.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!--第2个下拉选择框-->
						<Form label-position="right" inline :model="search_data2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="chang_value_three" @on-change="selectChange($event,'three')" @on-open-change="ClearVal($event,'2')">
									<Option value="1" v-show='chang_value_one != 1 && chang_value_two != 1 && chang_value_four != 1'>合同编号</Option>
									<Option value="2" v-show='chang_value_one != 2 && chang_value_two != 2 && chang_value_four != 2'>营业部</Option>
									<Option value="3" v-show='chang_value_one != 3 && chang_value_two != 3 && chang_value_four != 3'>客户姓名</Option>
									<Option value="4" v-show='chang_value_one != 4 && chang_value_two != 4 && chang_value_four != 4'>减免类型</Option>
									<Option value="5" v-show='chang_value_one != 5 && chang_value_two != 5 && chang_value_four != 5'>提交人</Option>
								</Select>
								<Input v-show="chang_value_three == 1" type="text" placeholder="请输入合同编号" v-model="search_data2.loanContractNo"
								 size="large"></Input>
								<Select filterable v-show="chang_value_three == 2" placeholder="请选择营业部" class="twoSelect" size="large" v-model="search_data2.belongOrgNo">
									<Option :key="item.idKey" v-for="item in getCenterName" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="chang_value_three == 3" type="text" placeholder="请输入客户姓名" v-model="search_data2.loanName" size="large"></Input>
								<Select v-show="chang_value_three == 4" placeholder="请选择减免类型" class="twoSelect" size="large" v-model="search_data2.applyType">
									<Option value="提前结清">提前结清</Option>
									<Option value="非提前结清减免">非提前结清减免</Option>
								</Select>
								<Input v-show="chang_value_three == 5" type="text" placeholder="请输入提交人" v-model="search_data2.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!--第3个下拉选择框-->
						<Form label-position="right" inline :model="search_data3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="chang_value_four" @on-change="selectChange($event,'four')" @on-open-change="ClearVal($event,'3')">
									<Option value="1" v-show='chang_value_one != 1 && chang_value_two != 1 && chang_value_three != 1'>合同编号</Option>
									<Option value="2" v-show='chang_value_one != 2 && chang_value_two != 2 && chang_value_three != 2'>营业部</Option>
									<Option value="3" v-show='chang_value_one != 3 && chang_value_two != 3 && chang_value_three != 3'>客户姓名</Option>
									<Option value="4" v-show='chang_value_one != 4 && chang_value_two != 4 && chang_value_three != 4'>减免类型</Option>
									<Option value="5" v-show='chang_value_one != 5 && chang_value_two != 5 && chang_value_three != 5'>提交人</Option>
								</Select>
								<Input v-show="chang_value_four == 1" type="text" placeholder="请输入合同编号" v-model="search_data3.loanContractNo"
								 size="large"></Input>
								<Select filterable v-show="chang_value_four == 2" placeholder="请选择营业部" class="twoSelect" size="large" v-model="search_data3.belongOrgNo">
									<Option :key="item.idKey" v-for="item in getCenterName" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="chang_value_four == 3" type="text" placeholder="请输入客户姓名" v-model="search_data3.loanName" size="large"></Input>
								<Select v-show="chang_value_four == 4" placeholder="请选择减免类型" class="twoSelect" size="large" v-model="search_data3.applyType">
									<Option value="提前结清">提前结清</Option>
									<Option value="非提前结清减免">非提前结清减免</Option>
								</Select>
								<Input v-show="chang_value_four == 5" type="text" placeholder="请输入提交人" v-model="search_data3.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!--按钮部分-->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click.prevent="search">查询</Button>
								<Button @click="restData">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button @click="BatchAudit">批量审核</Button>
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

		<!--Modal 拒绝审核-->
		<Modal v-model="refuseModal" :loading="loading" draggable title="回退">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline :model="refuseData">
					<!-- <FormItem label="回退节点">
						<Select v-model="refuseData.nextPermission" placeholder="请选择回退节点！" size="large" :style="width">
							<Option :key="people.idKey" v-for='people in refusePeople' :value="people.idKey">{{people.name}}</Option>
						</Select>
					</FormItem> -->
					<FormItem label="回退原因">
						<Input v-model="refuseData.auditOpinion" type="textarea" placeholder="请输入回退原因" :style="width" size="large"
						 :autosize="{minRows: 5,maxRows: 6}" :maxlength="50">
						</Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="Submint_refus('refuseData')">提交</Button>
			</div>
		</Modal>
		<!--审核信息详情-->
		<Modal v-model="detail_modal" title="审核信息详情" class="sh_detail_modal" draggable :footer-hide="footer_hide">
			<div class="detail-table-wrap">
				<Row class="detail-table-row">
					<Col class="com" span="4">合同编号</Col>
					<Col class="com" span="8">{{details_data.loanContractNo}}</Col>
					<Col class="com" span="4">客户姓名</Col>
					<Col class="com" span="8">{{details_data.loanName}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">总收费率</Col>
					<Col class="com" span="8">{{details_data.totalFeeRadio}}</Col>
					<Col class="com" span="4">销售大区</Col>
					<Col class="com" span="8">{{details_data.saleArea}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">分中心</Col>
					<Col class="com" span="8">{{details_data.slaveCenter}}</Col>
					<Col class="com" span="4">营业部</Col>
					<Col class="com" span="8">{{details_data.saleDepartment}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">团队</Col>
					<Col class="com" span="8">{{details_data.saleTeam}}</Col>
					<Col class="com" span="4">客户代表</Col>
					<Col class="com" span="8">{{details_data.customerName}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">客户代表联系方式</Col>
					<Col class="com" span="8">{{details_data.customerTel}}</Col>
					<Col class="com" span="4">是否逾期</Col>
					<Col class="com" span="8">{{details_data.isOverdue}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">逾期天数</Col>
					<Col class="com" span="8">{{details_data.overdueDay}}</Col>
					<Col class="com" span="4">注册日期</Col>
					<Col class="com" span="8">{{details_data.contractSignDate}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">最近账单日</Col>
					<Col class="com" span="8">{{details_data.nextRepaymentDate}}</Col>
					<Col class="com" span="4">合同额</Col>
					<Col class="com" span="8">{{details_data.loanAmount}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">放款额</Col>
					<Col class="com" span="8">{{details_data.dischargeAmount}}</Col>
					<Col class="com" span="4">当前期数</Col>
					<Col class="com" span="8">{{details_data.term}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">是否满3期</Col>
					<Col class="com" span="8">{{details_data.isThreeTerm}}</Col>
					<Col class="com" span="4">主体</Col>
					<Col class="com" span="8">{{details_data.mainBody}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">超额金</Col>
					<Col class="com" span="8">{{details_data.surplusAmount}}</Col>
					<Col class="com" span="4">申请类型</Col>
					<Col class="com" span="8">{{details_data.applyType}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">是否使用超额金</Col>
					<Col class="com" span="8">{{details_data.isUseSurplusAmount}}</Col>
					<Col class="com" span="4">还款方式</Col>
					<Col class="com" span="8">{{details_data. repaymentType}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">预计还款额</Col>
					<Col class="com" span="8">{{details_data.budgetRepaymentAmount}}</Col>
					<Col class="com" span="4">减免类型</Col>
					<Col class="com" span="8">{{details_data.applyDerateType}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">应收客户总额</Col>
					<Col class="com" span="8">{{details_data.receivableAmount}}</Col>
					<Col class="com" span="4">申请减免金额</Col>
					<Col class="com" span="8">{{details_data.applyDerateAmount}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">责任类型</Col>
					<Col class="com" span="8">{{details_data.liabilityType}}</Col>
					<Col class="com" span="4">申请人</Col>
					<Col class="com" span="8">{{details_data.applyUser}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">申请人部门</Col>
					<Col class="com" span="8">{{details_data.applyDepartment}}</Col>
					<Col class="com" span="4">减免 /提前结清原因</Col>
					<Col class="com" span="8">{{details_data.applyReason}}</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">附件</Col>
					<Col class="com" span="20">
					<div style='height:50px;'>
						<span :key='url.index' v-for='url in details_data.files' style='border:1px solid #dcdcdc;display: inline-block;width:50px;height:50px;margin-right:5px;'>
							<img :src="url" alt="" style='width:100%;height:100%;' @click='Show_Big_Img(url)'>
						</span>
					</div>
					</Col>
				</Row>
				<Row class="detail-table-row">
					<Col class="com" span="4">备注</Col>
					<Col class="com" span="20">
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="">取消</Button>
				<Button type="primary" size="large" @click="">确定</Button>
			</div>
		</Modal>
		<!-- 预览 图片 信息 -->
		<Modal v-model='big_img' title='查看图片' class='Big_Img' draggable :footer-hide="footer_hide">
			<div class='img_box'><img :src=BIG_IMG alt=""></div>
			<div slot="footer">
				<Button type="text" size="large" @click="">取消</Button>
				<Button type="primary" size="large" @click="">确定</Button>
			</div>
		</Modal>
		<!--批量审核-->
		<Modal v-model="batch_modal" draggable :loading="loading" footer-hide title="选择审核状态">
			<!-- 公共form表单类 -->
			<div class="from-item" style="height:100px;">
				<div style="text-align:center;margin-top:22px;">
					<Button type="success" size="large" @click="batch_shenhe('3','批量通过')">通过审核</Button>
					<Button type="error" size="large" @click="batch_shenhe('4','批量拒绝')">拒绝审核</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	import store from '../../store/index'
	import expandTabs from '../common/row-expand.vue'
	export default {
		name: "Settle",
		component: {
			expandTabs
		},
		data() {
			return {
				//查看图片详情
				big_img: false,
				BIG_IMG: '', // 大图
				value1: '1',
				title: '提前结清审核',
				loading: true,
				rotate: true,
				getCenterName: [], // 营业部
				refuseModal: false, // 回退信息填写的弹窗
				// refusePeople: [], // 回退人员列表
				width: {
					'width': '340px'
				},
				edit: false,
				totallPages: 0, // 总页数
				chang_value_one: '1', // 第一个下拉框选中的字段 
				chang_value_two: '2', // 第一个下拉框选中的字段 
				chang_value_three: '3', // 第一个下拉框选中的字段
				chang_value_four: '4', // 第一个下拉框选中的字段
				//筛选字段
				search_data: {
					loanContractNo: '', // 合同编号
					belongOrgNo: '', // 营业部
					loanName: '', // 客户姓名
					applyType: '', //减免类型
					applyUser: '', // 提交人
				},
				search_data1: {
					loanContractNo: '', // 合同编号
					belongOrgNo: '', // 营业部
					loanName: '', // 客户姓名
					applyType: '', //减免类型
					applyUser: '', // 提交人
				},
				search_data2: {
					loanContractNo: '', // 合同编号
					belongOrgNo: '', // 营业部
					loanName: '', // 客户姓名
					applyType: '', //减免类型
					applyUser: '', // 提交人
				},
				search_data3: {
					loanContractNo: '', // 合同编号
					belongOrgNo: '', // 营业部
					loanName: '', // 客户姓名
					applyType: '', //减免类型
					applyUser: '', // 提交人
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				// 审核回退需要传给服务器的字段
				refuseData: {
					"repaySettleId": '',
					"status": "3",
					"loanContractNo": '',
					// "nextPermission": '', //  回退角色ID
					"auditOpinion": '' // 回退原因
				},
				// 表头字段
				columns: [{
						type: 'selection',
						minWidth: 60,
					},
					{
						title: '查看审核流程',
						minWidth: 110,
						type: 'expand',
						render: (h, params) => {
							if (this.getAuth('10000010304')) {
								return h(expandTabs, {
									props: {
										row: params.row
									}
								})
							}
						}
					},
					{
						title: '合同编号',
						minWidth: 180,
						key: 'loanContractNo',
					},
					{
						title: '营业部',
						minWidth: 160,
						key: 'belongOrgNo',
					},
					{
						title: '客户姓名',
						minWidth: 100,
						key: 'loanName',
					},
					{
						title: '产品类型',
						minWidth: 120,
						key: 'productTypeName',
					},
					{
						title: '减免类型',
						minWidth: 120,
						key: 'applyTypeName'
					},
					{
						title: '当前期数',
						minWidth: 120,
						key: 'curentBillTerm',
					},
					{
						title: '逾期天数',
						minWidth: 120,
						key: 'overdueDay',
					},
					{
						title: '提交时间',
						minWidth: 120,
						key: 'applyTime',
					},
					{
						title: '提交人',
						minWidth: 120,
						key: 'applyUser',
					},
					{
						title: '操作',
						minWidth: 240,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('span', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.detail_modal
									},
									style: {
										display: this.getAuth('10000010301') ? 'inline-block' : 'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.adopt(params.row);
										}
									}
								}, '通过'),
								h('Dropdown', {
									props: {
										trigger: 'click',
										placement: "bottom-start",
										transfer: true,
									},
									style: {
										display: this.getAuth('10000010302') || this.getAuth('10000010303') ? 'inline-block' : 'none'
									},
									on: {
										'on-click': (name) => {
											if (name == '1') { //拒绝
												this.refuse(params.row);
											} else if (name == '2') { //详情
												this.details(params.row)
											}
										}
									}
								}, [
									h('Button', {
										props: {
											size: 'small',
											type: 'info',
											disabled: this.detail_modal
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
											},
											style: {
												display: this.getAuth('10000010302') ? 'inline-block' : 'none',
											}
										}, '拒绝'),
										h('DropdownItem', {
											props: {
												name: '2'
											},
											style: {
												display: this.getAuth('10000010303') ? 'inline-block' : 'none',
											}
										}, '详情'),
									])
								])
							])
						}
					},
				],
				// 表格内容
				datas: [],
				/*详情相关*/
				detail_modal: false, // 详细信息的弹窗
				footer_hide: true, // 隐藏底部的操作按钮
				details_data: {}, //单条提前结清审核数据详情
				/*批量审核窗口*/
				batch_modal: false, // 批量审核窗口
				loading: true,
				ChangeTabData: [],
			}
		},
		methods: {
			// 查询提前结清审核数据列表
			init(page, pagesize) {
				this.LastSubmitData.pageIndex = page || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pagesize || this.LastSubmitData.pageSize;
				this.HttpAjax('post', 'EarlyClearList', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						this.datas = res.data.data.data;
						this.totallPages = res.data.data.dataCount
					}
				});
			},
			//通过按钮点击事件
			adopt(row) {
				this.HttpAjax('post', 'EarlyClearCheck', {
					"repaySettleId": row.repaySettleId,
					"checkStatus": "4",
					"loanContractNo": row.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.$Notice.success({
							title: '成功',
							desc: '通过审核!',
							duration: 2
						});
						this.init();
					}
				})
			},
			//拒绝按钮点击事件
			refuse(row) {
				this.refuseModal = true;
				this.refuseData = {
					"repaySettleId": row.repaySettleId,
					"checkStatus": "3",
					"loanContractNo": row.loanContractNo,
					"auditOpinion": '' // 回退原因
				};
			},
			// 提交按钮点击事件(提交拒绝信息)
			Submint_refus() {
				this.HttpAjax('post', 'EarlyClearBack', this.refuseData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.refuseModal = false;
						this.$Notice.success({
							title: '成功',
							desc: '拒绝审核!',
							duration: 2
						});
						this.init();
					}
				})
			},
			//详情按钮点击事件
			details(row) {
				this.HttpAjax('post', 'EarlyClearInfo', {
					"repaySettleId": row.repaySettleId
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						this.detail_modal = true;
						this.details_data = res.data.data
					}
				})
			},
			//翻页-->第几页
			changePages(page) {
				this.init(page);
			},
			//每一页显示多少条数据
			changePagesTotall(pageSize) {
				this.LastSubmitData.pageSize = pageSize;
				this.init('', pageSize);
			},
			//查询
			search() {
				this.ClearObject(this.LastSubmitData)
				for (let i in this.search_data) {
					if (this.search_data[i] != '') {
						this.$set(this.LastSubmitData, i, this.search_data[i])
					}
				}
				for (let i in this.search_data1) {
					if (this.search_data1[i] != '') {
						this.$set(this.LastSubmitData, i, this.search_data1[i])
					}
				}
				for (let i in this.search_data2) {
					if (this.search_data2[i] != '') {
						this.$set(this.LastSubmitData, i, this.search_data2[i])
					}
				}
				for (let i in this.search_data3) {
					if (this.search_data3[i] != '') {
						this.$set(this.LastSubmitData, i, this.search_data3[i])
					}
				}
				this.init();
			},
			//刷新
			refresh() {
				this.init();
			},
			// 第0个下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.chang_value_one = val
				}else {
					this['chang_value_'+ index] = val
				}		
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.search_data)
					}else {
						this.ClearObject(this['search_data'+index])
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
				this.ClearObject(this.search_data)
				this.ClearObject(this.search_data1)
				this.ClearObject(this.search_data2)
				this.ClearObject(this.search_data3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			//批量审核
			BatchAudit() {
				if(this.ChangeTabData.length == 0){
					this.$Notice.error({
						title: '错误',
						desc: '请选择需要批量审核的数据',
						duration: 0,
					})
				}else {
					this.batch_modal = true
				}
			},
			//表格数据选择
			ChangeDatas(val) {
				this.ChangeTabData = []
				for(let i in val){
						this.ChangeTabData.push({
						"repaySettleId": val[i].repaySettleId,
						"checkStatus": "",
						"loanContractNo": val[i].loanContractNo,
						"auditOpinion": '' // 回退原因
					})
				}
			},
			// 批量审核（拒绝，通过
			batch_shenhe(checkStatus,auditOpinion){
				for(let i in this.ChangeTabData){
					this.ChangeTabData[i].checkStatus = checkStatus
					this.ChangeTabData[i].auditOpinion = auditOpinion
				}
				this.HttpAjax('post', 'EarlyClearCheckBatch', this.ChangeTabData, (res) => {
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
			// 取消按钮点击事件
			cancel() {
				this.refuseModal = false;
			},
			// 字典表查询（分中心
			distList(label) {
				this.HttpAjax('post', 'getCenterName', {
					label: label
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						// console.log(res.data.data);
						this.getCenterName = res.data.data
					}
				})
			},
			// 预览图片 （显示大图
			Show_Big_Img(url) {
				this.BIG_IMG = url;
				this.big_img = true;
			}
		},
		created() {
			this.init();
			this.distList();
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.sh_detail_modal {

		.ivu-modal .ivu-modal-body,
		.ivu-modal,
		.ivu-modal .ivu-modal-content {
			width: 725px !important;
		}

		.detail-table-row {
			display: flex;
			border-bottom: 1px solid #e8e8e8;
			font-size: 14px;
		}

		.detail-table-row:last-child {
			border-bottom: none;
		}

		.detail-table-wrap {
			border: 1px solid #e8e8e8;
		}

		.com {
			word-break: break-all;
			box-sizing: border-box;
			min-height: 34px;
			align-items: stretch;
			padding: 5px 10px;
			border-right: 1px solid #e8e8e8;
		}

		.com:last-child {
			border-right: none;
		}

		.com:nth-child(odd) {
			background: #f6f6f6;
		}
	}

	.Settle {
		.ivu-table-fixed-body {
			// overflow: visible;
		}

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

	.Big_Img {
		.img_box {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
