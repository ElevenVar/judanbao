<template>
	<div class='Recharge'>
		<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">代充值管理</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<div class="from-items">
						<!-- 第0个条件选择框 -->
						<Form label-position="right" inline :model="formData0" ref="formIndex0">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model='formIndex0' @on-change="selectChange($event, '0')"
								 @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>充值日期</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>充值状态</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>进件营业部</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>签约营业部</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7'>归属营业部</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8'>产品线</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9'>产品名称</Option>
								</Select>
								<Input type="text" v-show='formIndex0 == 0' placeholder="请输入合同号！" v-model="formData0.LoanContractNo" size="large"></Input>
								<Input type="text" v-show='formIndex0 == 1' placeholder="请输入客户姓名！" v-model="formData0.clientName" size="large"></Input>
								<Input type="text" v-show='formIndex0 == 2' placeholder="请输入身份证号！" v-model="formData0.idCard" size="large"></Input>
								<DatePicker v-if="formIndex0 == 3" @on-change='rechargeDate($event, "0")' v-model="formData0.rechargeDateS"
								 format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement='bottom' :editable="false" placeholder="请选择充值日期!"
								 size="large"></DatePicker>
								<Select v-show="formIndex0 == 4" @on-open-change='getDictionariesByType' v-model="formData0.rechargeStatus"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key='item.index' v-for='item in distList.rechargeStatus' :value='item.value'>{{item.label}}</Option>
								</Select>
								<Input type="text" v-show='formIndex0 == 5' placeholder="请输入进件营业部！" v-model="formData0.org" size="large"></Input>
								<Input type="text" v-show='formIndex0 == 6' placeholder="请输入签约营业部！" v-model="formData0.signOrg" size="large"></Input>
								<Input type="text" v-show='formIndex0 == 7' placeholder="请输入归属营业部！" v-model="formData0.belongOrg" size="large"></Input>
								<Select v-show="formIndex0 == 8" v-model="formData0.dataSource" placeholder="请选择产品线！" class="twoSelect" size="large">
									<Option value='XD'>信贷</Option>
									<Option value='XJ'>消金</Option>
								</Select>
								<Select filterable v-show="formIndex0 == 9" @on-open-change='getProductTypeList' v-model="formData0.productType"
								 placeholder="请选择产品名称！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第一个下拉选择框 -->
						<Form label-position="right" inline :model="formData1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model='formIndex1' @on-change="selectChange($event, '1')"
								 @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex0 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同号</Option>
									<Option value="1" v-show='formIndex0 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex0 != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号</Option>
									<Option value="3" v-show='formIndex0 != 3 && formIndex2 != 3 && formIndex3 != 3'>充值日期</Option>
									<Option value="4" v-show='formIndex0 != 4 && formIndex2 != 4 && formIndex3 != 4'>充值状态</Option>
									<Option value="5" v-show='formIndex0 != 5 && formIndex2 != 5 && formIndex3 != 5'>进件营业部</Option>
									<Option value="6" v-show='formIndex0 != 6 && formIndex2 != 6 && formIndex3 != 6'>签约营业部</Option>
									<Option value="7" v-show='formIndex0 != 7 && formIndex2 != 7 && formIndex3 != 7'>归属营业部</Option>
									<Option value="8" v-show='formIndex0 != 8 && formIndex2 != 8 && formIndex3 != 8'>产品线</Option>
									<Option value="9" v-show='formIndex0 != 9 && formIndex2 != 9 && formIndex3 != 9'>产品名称</Option>
								</Select>
								<Input type="text" v-show='formIndex1 == 0' placeholder="请输入合同号！" v-model="formData1.LoanContractNo" size="large"></Input>
								<Input type="text" v-show='formIndex1 == 1' placeholder="请输入客户姓名！" v-model="formData1.clientName" size="large"></Input>
								<Input type="text" v-show='formIndex1 == 2' placeholder="请输入身份证号！" v-model="formData1.idCard" size="large"></Input>
								<DatePicker v-if="formIndex1 == 3" @on-change='rechargeDate($event, "1")' v-model="formData1.rechargeDateS"
								 format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement='bottom' :editable="false" placeholder="请选择充值日期!"
								 size="large"></DatePicker>
								<Select v-show="formIndex1 == 4" @on-open-change='getDictionariesByType' v-model="formData1.rechargeStatus"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key='item.index' v-for='item in distList.rechargeStatus' :value='item.value'>{{item.label}}</Option>
								</Select>
								<Input type="text" v-show='formIndex1 == 5' placeholder="请输入进件营业部！" v-model="formData1.org" size="large"></Input>
								<Input type="text" v-show='formIndex1 == 6' placeholder="请输入签约营业部！" v-model="formData1.signOrg" size="large"></Input>
								<Input type="text" v-show='formIndex1 == 7' placeholder="请输入归属营业部！" v-model="formData1.belongOrg" size="large"></Input>
								<Select v-show="formIndex1 == 8" v-model="formData1.dataSource" placeholder="请选择产品线！" class="twoSelect" size="large">
									<Option value='XD'>信贷</Option>
									<Option value='XJ'>消金</Option>
								</Select>
								<Select filterable v-show="formIndex1 == 9" @on-open-change='getProductTypeList' v-model="formData1.productType"
								 placeholder="请选择产品名称！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第二个下拉选择框 -->
						<Form label-position="right" inline :model="formData2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model='formIndex2' @on-change="selectChange($event, '2')"
								 @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex0 != 0 && formIndex1 != 0 && formIndex3 != 0'>合同号</Option>
									<Option value="1" v-show='formIndex0 != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex0 != 2 && formIndex1 != 2 && formIndex3 != 2'>身份证号</Option>
									<Option value="3" v-show='formIndex0 != 3 && formIndex1 != 3 && formIndex3 != 3'>充值日期</Option>
									<Option value="4" v-show='formIndex0 != 4 && formIndex1 != 4 && formIndex3 != 4'>充值状态</Option>
									<Option value="5" v-show='formIndex0 != 5 && formIndex1 != 5 && formIndex3 != 5'>进件营业部</Option>
									<Option value="6" v-show='formIndex0 != 6 && formIndex1 != 6 && formIndex3 != 6'>签约营业部</Option>
									<Option value="7" v-show='formIndex0 != 7 && formIndex1 != 7 && formIndex3 != 7'>归属营业部</Option>
									<Option value="8" v-show='formIndex0 != 8 && formIndex1 != 8 && formIndex3 != 8'>产品线</Option>
									<Option value="9" v-show='formIndex0 != 9 && formIndex1 != 9 && formIndex3 != 9'>产品名称</Option>
								</Select>
								<Input type="text" v-show='formIndex2 == 0' placeholder="请输入合同号！" v-model="formData2.LoanContractNo" size="large"></Input>
								<Input type="text" v-show='formIndex2 == 1' placeholder="请输入客户姓名！" v-model="formData2.clientName" size="large"></Input>
								<Input type="text" v-show='formIndex2 == 2' placeholder="请输入身份证号！" v-model="formData2.idCard" size="large"></Input>
								<DatePicker v-if="formIndex2 == 3" @on-change='rechargeDate($event, "2")' v-model="formData2.rechargeDateS"
								 format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement='bottom' :editable="false" placeholder="请选择充值日期!"
								 size="large"></DatePicker>
								<Select v-show="formIndex2 == 4" @on-open-change='getDictionariesByType' v-model="formData2.rechargeStatus"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key='item.index' v-for='item in distList.rechargeStatus' :value='item.value'>{{item.label}}</Option>
								</Select>
								<Input type="text" v-show='formIndex2 == 5' placeholder="请输入进件营业部！" v-model="formData2.org" size="large"></Input>
								<Input type="text" v-show='formIndex2 == 6' placeholder="请输入签约营业部！" v-model="formData2.signOrg" size="large"></Input>
								<Input type="text" v-show='formIndex2 == 7' placeholder="请输入归属营业部！" v-model="formData2.belongOrg" size="large"></Input>
								<Select v-show="formIndex2 == 8" v-model="formData2.dataSource" placeholder="请选择产品线！" class="twoSelect" size="large">
									<Option value='XD'>信贷</Option>
									<Option value='XJ'>消金</Option>
								</Select>
								<Select filterable v-show="formIndex2 == 9" @on-open-change='getProductTypeList' v-model="formData2.productType"
								 placeholder="请选择产品名称！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第三个下拉选择框 -->
						<Form label-position="right" inline :model="formData3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model='formIndex3' @on-change="selectChange($event, '3')"
								 @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex0 != 0 && formIndex1 != 0 && formIndex2 != 0'>合同号</Option>
									<Option value="1" v-show='formIndex0 != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex0 != 2 && formIndex1 != 2 && formIndex2 != 2'>身份证号</Option>
									<Option value="3" v-show='formIndex0 != 3 && formIndex1 != 3 && formIndex2 != 3'>充值日期</Option>
									<Option value="4" v-show='formIndex0 != 4 && formIndex1 != 4 && formIndex2 != 4'>充值状态</Option>
									<Option value="5" v-show='formIndex0 != 5 && formIndex1 != 5 && formIndex2 != 5'>进件营业部</Option>
									<Option value="6" v-show='formIndex0 != 6 && formIndex1 != 6 && formIndex2 != 6'>签约营业部</Option>
									<Option value="7" v-show='formIndex0 != 7 && formIndex1 != 7 && formIndex2 != 7'>归属营业部</Option>
									<Option value="8" v-show='formIndex0 != 8 && formIndex1 != 8 && formIndex2 != 8'>产品线</Option>
									<Option value="9" v-show='formIndex0 != 9 && formIndex1 != 9 && formIndex2 != 9'>产品名称</Option>
								</Select>
								<Input type="text" v-show='formIndex3 == 0' placeholder="请输入合同号！" v-model="formData3.LoanContractNo" size="large"></Input>
								<Input type="text" v-show='formIndex3 == 1' placeholder="请输入客户姓名！" v-model="formData3.clientName" size="large"></Input>
								<Input type="text" v-show='formIndex3 == 2' placeholder="请输入身份证号！" v-model="formData3.idCard" size="large"></Input>
								<DatePicker v-if="formIndex3 == 3" @on-change='rechargeDate($event, "3")' v-model="formData3.rechargeDateS"
								 format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placement='bottom' :editable="false" placeholder="请选择充值日期!"
								 size="large"></DatePicker>
								<Select v-show="formIndex3 == 4" @on-open-change='getDictionariesByType' v-model="formData3.rechargeStatus"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key='item.index' v-for='item in distList.rechargeStatus' :value='item.value'>{{item.label}}</Option>
								</Select>
								<Input type="text" v-show='formIndex3 == 5' placeholder="请输入进件营业部！" v-model="formData3.org" size="large"></Input>
								<Input type="text" v-show='formIndex3 == 6' placeholder="请输入签约营业部！" v-model="formData3.signOrg" size="large"></Input>
								<Input type="text" v-show='formIndex3 == 7' placeholder="请输入归属营业部！" v-model="formData3.belongOrg" size="large"></Input>
								<Select v-show="formIndex3 == 8" v-model="formData3.dataSource" placeholder="请选择产品线！" class="twoSelect" size="large">
									<Option value='XD'>信贷</Option>
									<Option value='XJ'>消金</Option>
								</Select>
								<Select filterable v-show="formIndex3 == 9" @on-open-change='getProductTypeList' v-model="formData3.productType"
								 placeholder="请选择产品名称！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click='search'>查询</Button>
								<Button @click='ResetData'>重置</Button>
								<Button @click='RechargeMoney'>充值</Button>
								<Button @click='exportData'>导出</Button>
								<a :href="hrefUrl" target="_blank" ref="hrefOpen" style='display: none'>lianjie</a>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="table-warper">
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="columns" :data="data"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page placement="top" :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click='refresh' />
			</div>
		</div>
		<!-- 模态框 -->
		<Modal v-model="RechargeModal" title="代充值申请" draggable class-name='RechargeModal'>
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model='SubData' ref='SubData' :rules='SubDataRules'>
					<Button type="primary" icon="plus-circled" @click='SubmitLoanContractNo'>提交</Button>
					<FormItem label="合同编号">
						<Input placeholder="请输入合同编号" v-model='SubData.loanContractNo' :disabled="loanContractNo" size="large"></Input>
					</FormItem>
					<div>
						<FormItem label="身份证号">
							<Input size="large" v-model='SubData.idCard' disabled></Input>
						</FormItem>
						<FormItem label="客户姓名">
							<Input size="large" v-model='SubData.clientName' disabled></Input>
						</FormItem>
						<FormItem label="最近账单日">
							<Input size="large" v-model='SubData.latestBillingDate' disabled></Input>
						</FormItem>
						<FormItem label="还款状态">
							<Input size="large" v-model='SubData.productType' disabled></Input>
						</FormItem>
						<FormItem label="应还总额">
							<Input size="large" v-model='SubData.totalDuetoPayAmt' disabled></Input>
						</FormItem>
						<FormItem label="产品类型">
							<Input size="large" v-model='SubData.productTypeName' disabled></Input>
						</FormItem>
						<FormItem label="充值银行">
							<Select v-model='SubData.bankCode' placement='top-start' filterable placeholder="请选择！" :style="width" size="large">
								<Option v-for='bank in Bank' :key='bank.idKey' :value="bank.value">{{bank.label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="充值金额" prop='rechargeAmt'>
							<Input size="large" v-model='SubData.rechargeAmt' placeholder="输入金额"></Input>
						</FormItem>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="Reset">取消</Button>
				<Button type="primary" size="large" :disabled="disabled"  @click='SubMitRechargeData("SubData")'>确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import store from '../../store/index'
	import qs from 'qs'
	import url from '../../service/url_config'
	export default {
		name: 'Recharge',
		data() {
			const rechargeAmts = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入金额'));
				}else{
					const overdueDay = /^[1-9]*$/;
					if(isNaN(value)){
						callback(new Error('只能输入数字'));
					}else if(value < 100){
						callback(new Error('必须要大于等于100'));
					}else{
						callback();
					}
				}
			};
			return {
				//----------弹框
				RechargeModal: false,
				loanContractNo: false, // 合同框是否可以点击
				disabled: true, //确定，取消 按钮 不可以点击
				width: '350px',
				value1: '1',
				hrefUrl: '', //跳转的地址
				rotate: true,
				// 提交的字段
				SubData: {
					loanContractNo: '', // 合同编号
					idCard: '', // 身份证号
					clientName: '', // 客户姓名
					latestBillingDate: '', // 最近账单日
					productType: '', //还款状态
					totalDuetoPayAmt: '', // 应还总额
					productTypeName: '', //产品类型
					bankCode: '', // 所属银行
					rechargeAmt: '', // 充值金额
				},
				// 提交字段验证
				SubDataRules: {
					rechargeAmt: [{
						validator: rechargeAmts,
						trigger: 'blur',
					}]
				},
				// 筛选字段
				formData0: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					idCard: '', // 身份证号
					rechargeDateS: '', //充值时间
					rechargeStatus: '', //充值状态
					org: '', //进件营业部
					signOrg: '', //签约营业部
					belongOrg: '', // 归属营业部
					dataSource: '', // 产品线
					productType: '', //产品名称
				},
				formData1: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					idCard: '', // 身份证号
					rechargeDateS: '', //充值时间
					rechargeStatus: '', //充值状态
					org: '', //进件营业部
					signOrg: '', //签约营业部
					belongOrg: '', // 归属营业部
					dataSource: '', // 产品线
					productType: '', //产品名称
				},
				formData2: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					idCard: '', // 身份证号
					rechargeDateS: '', //充值时间
					rechargeStatus: '', //充值状态
					org: '', //进件营业部
					signOrg: '', //签约营业部
					belongOrg: '', // 归属营业部
					dataSource: '', // 产品线
					productType: '', //产品名称
				},
				formData3: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					idCard: '', // 身份证号
					rechargeDateS: '', //充值时间
					rechargeStatus: '', //充值状态
					org: '', //进件营业部
					signOrg: '', //签约营业部
					belongOrg: '', // 归属营业部
					dataSource: '', // 产品线
					productType: '', //产品名称
				},
				LastSubmitData: {
					pageIndex: 1,
					pageSize: 10,
				},
				formIndex0: '0',
				formIndex1: '1',
				formIndex2: '2',
				formIndex3: '3',

				distList: {
					queryProductTypeList: [], //产品列表
					rechargeStatus: [], // 充值状态
				},
				columns: [{
						title: '序号',
						minWidth: 60,
						key : 'rankNo',
					},{
					title: '合同号',
					minWidth: 170,
					key: 'loanContractNo',
				}, {
					title: '客户姓名',
					minWidth: 100,
					key: 'clientName',
				},/* {
					title: '身份证号',
					minWidth: 160,
					key: 'idCard',
				}, {
					title: '手机号',
					minWidth: 100,
					key: 'clientPhone',
				}, */{
					title: '最近账单日',
					minWidth: 100,
					key: 'latestBillingDate',
				}, {
					title: '应还总额',
					minWidth: 100,
					key: 'totalDuetoPayAmt',
				}, {
					title: '进件营业部',
					minWidth: 100,
					key: 'org',
				}, {
					title: '签约营业部',
					minWidth: 100,
					key: 'signOrg',
				}, {
					title: '归属营业部',
					minWidth: 100,
					key: 'belongOrg',
				}, {
					title: '充值流水号',
					minWidth: 200,
					key: 'rechargeSerialNo',
				}, {
					title: '充值金额',
					minWidth: 100,
					key: 'rechargeAmt',
				}, {
					title: '充值时间',
					minWidth: 100,
					key: 'rechargeDate',
				}, {
					title: '充值状态',
					minWidth: 100,
					key: 'rechargeStatusDesc',
				}, {
					title: '失败原因',
					minWidth: 100,
					key: 'failReason',
				}, {
					title: '操作人',
					minWidth: 100,
					key: 'operator',
				}, {
					title: '操作时间',
					minWidth: 100,
					key: 'operateDate',
				}],
				data: [],
				Bank: [], // 银行列表
				totallPages: 0, //总页数
			};
		},
		methods: {
			// 查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData)
				for (let i in this.formData0) {
					if (this.formData0[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData0[i])
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
				this.init();
			},
			//获取数据
			init(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize
				this.HttpAjax('post', 'ProxyrechargeListRechargeManage', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.totallPages = res.data.data.dataCount
						this.data = res.data.data.data
					}
				})
			},
			// 重置
			ResetData() {
				this.ClearObject(this.formData0)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			// 充值按钮
			RechargeMoney() {
				this.$Modal.confirm({
					title: '安装提示',
					content: '充值前，请确认应升级或安装的插件已完成。若没安装，请去各银行官网下载安装最新版本。',
					onOk: () => {
						this.ClearObject(this.SubData)
						this.RechargeModal = true;
						this.loanContractNo = false;
					}
				});
			},
			// 代充值校验接口(校验合同号)
			SubmitLoanContractNo() {
				this.HttpAjax('post', 'ProxyrechargeCheckProxyRecharge', this.SubData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.SubData = res.data.data
						this.loanContractNo = true;
						this.disabled = false;
					}
				})
			},
			// 弹窗取消按钮点击事件
			Reset() {
				for (let i in this.SubData) {
					this.SubData[i] = ''
				}
				this.RechargeModal = false;
				this.loanContractNo = false;
			}, 
			// 提交充值
			SubMitRechargeData(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {+
						this.HttpAjax('post', 'SubmitProxyRecharge', this.SubData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == 200) {
								console.log(res.data.data)
								this.RechargeModal = false;
								this.init();
								this.hrefUrl = res.data.data;
								this.$nextTick(function() {
									this.$refs.hrefOpen.click();
								})
							}
						})
					}
				})
			},
			// 获取银行
			GetBank() {
				this.HttpAjax('post', 'GetBank', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.Bank = res.data.data
					}
				})
			},
			//充值日期的转换
			rechargeDate(val, index) {
				this['formData' + index].rechargeDateS = val
			},
			//下拉选择项变化时
			selectChange(val, index) {
				this['formIndex' + index] = val
			},
			// 下拉选择框展开
			ClearVal(val, index) {
				if (val) {
					this.ClearObject(this['formData' + index])
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
			//产品类型下拉列表
			getProductTypeList(val) {
				if (val) {
					if (this.distList.queryProductTypeList.length == 0) {
						this.HttpAjax('post', 'queryProductTypeList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								this.distList.queryProductTypeList = res.data.data; //产品类型
							}
						})
					}
				}
			},
			// 获取充值状态
			getDictionariesByType(val) {
				if (val) {
					if(this.distList.rechargeStatus.length == 0){
						this.HttpAjax('post', 'getDictionariesByType', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == 200) {
								this.distList.rechargeStatus = res.data.data
							}
						})
					}
				}
			},
			// 页码切换
			changePages(pageIndex) {
				this.init(pageIndex)
			},
			//每页条数切换
			changePagesTotall(pageSize) {
				this.init(1, pageSize)
			},
			//刷新按钮
			refresh() {
				this.init();
			},
			//导出
			exportData() {
				this.HttpAjax('post', 'exportRechargeManageRecord', qs.stringify(this.LastSubmitData), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, '代充值管理.xlsx');
				}, 'download')
			},
		},
		mounted() {
			this.init();
			this.GetBank();
			// this.getProductTypeList();
			// this.getDictionariesByType();
		}
	}
</script>
<style lang="less">
	.Recharge {
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

	.RechargeModal {
		.ivu-modal .ivu-modal-content {
			.ivu-modal-body {
				.from-item {
					position: relative;

					.ivu-form-item {
						width: 350px !important;
						margin-bottom: 5px;

						.ivu-input-disabled {
							color: black;
						}
					}

					.ivu-btn {
						position: absolute;
						right: 0;
					}
				}
			}
		}
	}
</style>
