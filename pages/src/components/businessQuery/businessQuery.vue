<template>
	<div class="myOutsideCase">
		<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">业务查询</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<!-- 借款查询头部-->
					<div class="from-items" v-show="type==='getMoney'">
						<!-- 借款查询第0个下拉选择框 -->
						<Form label-position="right" inline :model="GetMoney_search">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>申请日期</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>放款日期</Option>
									<!-- <Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>审批状态</Option> -->
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>营业部</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7'>身份证号</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8'>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="GetMoney_search.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="GetMoney_search.clientName" size="large"></Input>
								<Select v-show="formIndex == 2" @on-open-change="getListDict($event,'mainBody')" v-model="GetMoney_search.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time1($event,'')"
								placeholder="请选择申请日期！" size="large" v-model="GetMoney_search.applyDate"></DatePicker>
								<DatePicker v-if="formIndex == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time2($event,'')"
								placeholder="请选择放款日期！" size="large" v-model="GetMoney_search.fullScaleDate"></DatePicker>
								<Select v-show="formIndex == 5" @on-open-change="getListDict($event,'auditType')" placeholder="请选择审批状态！" v-model="GetMoney_search.auditType"
								class="twoSelect" size="large">
									<Option :key="auditType.index" :value="auditType.type" v-for="auditType in distList.auditType">{{auditType.value}}
									</Option>
								</Select>
								<Select filterable v-show="formIndex == 6" @on-open-change='getOrgNO' placeholder="请选择营业部！" v-model="GetMoney_search.belongOrgNo"
								class="twoSelect" size="large">
									<Option :key="ops.index" v-for="ops in getOrgNOs" :value="ops.shortName">{{ops.groupName}}</Option>
								</Select>
								<Input v-show="formIndex == 7" type="text" placeholder="请输入身份证号！" v-model="GetMoney_search.idCard" size="large"></Input>
								<Input v-show="formIndex == 8" type="text" placeholder="请输入电话号码！" v-model="GetMoney_search.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 借款查询第1个下拉选择框 -->
						<Form label-position="right" inline :model="GetMoney_search1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>申请日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>放款日期</Option>
									<!-- <Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>审批状态</Option> -->
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>营业部</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>身份证号</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8'>电话号码</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="GetMoney_search1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="GetMoney_search1.clientName" size="large"></Input>
								<Select v-show="formIndex1 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="GetMoney_search1.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex1 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time1($event,'1')"
								placeholder="请选择申请日期！" size="large" v-model="GetMoney_search1.applyDate"></DatePicker>
								<DatePicker v-if="formIndex1 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time2($event,'1')"
								placeholder="请选择放款日期！" size="large" v-model="GetMoney_search1.fullScaleDate"></DatePicker>
								<Select v-show="formIndex1 == 5" @on-open-change="getListDict($event,'auditType')" placeholder="请选择审批状态！" v-model="GetMoney_search1.auditType"
								class="twoSelect" size="large">
									<Option :key="auditType.index" :value="auditType.type" v-for="auditType in distList.auditType">{{auditType.value}}
									</Option>
								</Select>
								<Select filterable v-show="formIndex1 == 6" @on-open-change='getOrgNO' placeholder="请选择营业部！" v-model="GetMoney_search1.belongOrgNo"
								class="twoSelect" size="large">
									<Option :key="ops.index" v-for="ops in getOrgNOs" :value="ops.shortName">{{ops.groupName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 7" type="text" placeholder="请输入身份证号！" v-model="GetMoney_search1.idCard" size="large"></Input>
								<Input v-show="formIndex1 == 8" type="text" placeholder="请输入电话号码！" v-model="GetMoney_search1.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 借款查询第2个下拉选择框 -->
						<Form label-position="right" inline :model="GetMoney_search2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>申请日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>放款日期</Option>
									<!-- <Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>审批状态</Option> -->
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>营业部</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7'>身份证号</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8'>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="GetMoney_search2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="GetMoney_search2.clientName" size="large"></Input>
								<Select v-show="formIndex2 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="GetMoney_search2.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex2 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time1($event,'2')"
								placeholder="请选择申请日期！" size="large" v-model="GetMoney_search2.applyDate"></DatePicker>
								<DatePicker v-if="formIndex2 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time2($event,'2')"
								placeholder="请选择放款日期！" size="large" v-model="GetMoney_search2.fullScaleDate"></DatePicker>
								<Select v-show="formIndex2 == 5" @on-open-change="getListDict($event,'auditType')" placeholder="请选择审批状态！" v-model="GetMoney_search2.auditType"
								class="twoSelect" size="large">
									<Option :key="auditType.index" :value="auditType.type" v-for="auditType in distList.auditType">{{auditType.value}}
									</Option>
								</Select>
								<Select filterable v-show="formIndex2 == 6" @on-open-change='getOrgNO' placeholder="请选择营业部！" v-model="GetMoney_search2.belongOrgNo"
								class="twoSelect" size="large">
									<Option :key="ops.index" v-for="ops in getOrgNOs" :value="ops.shortName">{{ops.groupName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 7" type="text" placeholder="请输入身份证号！" v-model="GetMoney_search2.idCard" size="large"></Input>
								<Input v-show="formIndex2 == 8" type="text" placeholder="请输入电话号码！" v-model="GetMoney_search2.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 借款查询第3个下拉选择框 -->
						<Form label-position="right" inline :model="GetMoney_search3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>申请日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>放款日期</Option>
									<!-- <Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>审批状态</Option> -->
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6'>营业部</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>身份证号</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8'>电话号码</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="GetMoney_search3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="GetMoney_search3.clientName" size="large"></Input>
								<Select v-show="formIndex3 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="GetMoney_search3.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex3 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time1($event,'3')"
								placeholder="请选择申请日期！" size="large" v-model="GetMoney_search3.applyDate"></DatePicker>
								<DatePicker v-if="formIndex3 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time2($event,'3')"
								placeholder="请选择放款日期！" size="large" v-model="GetMoney_search3.fullScaleDate"></DatePicker>
								<Select v-show="formIndex3 == 5" @on-open-change="getListDict($event,'auditType')" placeholder="请选择审批状态！" v-model="GetMoney_search3.auditType"
								class="twoSelect" size="large">
									<Option :key="auditType.index" :value="auditType.type" v-for="auditType in distList.auditType">{{auditType.value}}
									</Option>
								</Select>
								<Select filterable v-show="formIndex3 == 6" @on-open-change='getOrgNO' placeholder="请选择营业部！" v-model="GetMoney_search3.belongOrgNo"
								class="twoSelect" size="large">
									<Option :key="ops.index" v-for="ops in getOrgNOs" :value="ops.shortName">{{ops.groupName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 7" type="text" placeholder="请输入身份证号！" v-model="GetMoney_search3.idCard" size="large"></Input>
								<Input v-show="formIndex3 == 8" type="text" placeholder="请输入电话号码！" v-model="GetMoney_search3.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right">
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="queryInitGet">查询</Button>
								<Button @click="getMoney_Reset">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('07000010101')" @click="exportExcel">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
							</FormItem>
						</Form>
					</div>
					<!--还款查询头部-->
					<div class="from-items" v-show="type==='backMoney'">
						<!-- 还款查询第0个下拉选择框 -->
						<Form label-position="right" inline :model="BackMoney_search">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex4" @on-change="selectChange($event,'4')" @on-open-change="ClearVal4($event,'0')">
									<Option value="0" v-show='formIndex5  != 0 && formIndex6 != 0 && formIndex7 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex5  != 1 && formIndex6 != 1 && formIndex7 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex5  != 2 && formIndex6 != 2 && formIndex7 != 2'>主体</Option>
									<Option value="3" v-show='formIndex5  != 3 && formIndex6 != 3 && formIndex7 != 3'>应还日期</Option>
									<Option value="4" v-show='formIndex5  != 4 && formIndex6 != 4 && formIndex7 != 4'>实还日期</Option>
									<Option value="5" v-show='formIndex5  != 5 && formIndex6 != 5 && formIndex7 != 5'>操作时间</Option>
									<Option value="6" v-show='formIndex5  != 6 && formIndex6 != 6 && formIndex7 != 6'>还款方式</Option>
									<Option value="7" v-show='formIndex5  != 7 && formIndex6 != 7 && formIndex7 != 7'>还款状态</Option>
									<Option value="8" v-show='formIndex5  != 8 && formIndex6 != 8 && formIndex7 != 8'>账户状态</Option>
									<Option value="9" v-show='formIndex5  != 9 && formIndex6 != 9 && formIndex7 != 9'>当前期数</Option>
									<Option value="10" v-show='formIndex5  != 10 && formIndex6 != 10 && formIndex7 != 10'>业务线</Option>
								</Select>
								<Input v-show="formIndex4 == 0" type="text" placeholder="请输入合同编号！" v-model="BackMoney_search.loanContractNo" size="large"></Input>
								<Input v-show="formIndex4 == 1" type="text" placeholder="请输入客户姓名！" v-model="BackMoney_search.clientName" size="large"></Input>
								<Select v-show="formIndex4 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="BackMoney_search.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex4 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time3($event,'')"
								placeholder="请选择应还日期！" size="large" v-model="BackMoney_search.monthPayDate"></DatePicker>
								<DatePicker v-if="formIndex4 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time4($event,'')"
								placeholder="请选择实还日期！" size="large" v-model="BackMoney_search.transTime"></DatePicker>
								<DatePicker v-if="formIndex4 == 5" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time5($event,'')"
								placeholder="请选择实操作时间！" size="large" v-model="BackMoney_search.operationTime"></DatePicker>
								<Select v-show="formIndex4 == 6" placeholder="请选择还款方式！" class="twoSelect" size="large" v-model="BackMoney_search.financeType">
									<Option value="T001">存对公</Option>
									<Option value="T002">代扣</Option>
									<Option value="T011">调账</Option>
									<Option value="T019">APP还款</Option>
									<Option value="T022">网关充值</Option>
								</Select>
								<Select v-show="formIndex4 == 7" @on-open-change="getListDict($event,'payStatus')" v-model="BackMoney_search.payStatus"
								placeholder="请选择还款" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.payStatus" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex4 == 8" placeholder="请选择账户状态！" class="twoSelect" size="large" v-model="BackMoney_search.accountStatus">
									<Option value="0">正常还款</Option>
									<Option value="1">已逾期</Option>
									<Option value="2">已结清</Option>
								</Select>
								<Input v-show="formIndex4 == 9" type="text" placeholder="请输入当前期数！" size="large" v-model="BackMoney_search.billTerm"></Input>
								<Select v-show="formIndex4 == 10" placeholder="请选择业务线！" class="twoSelect" size="large" v-model="BackMoney_search.businessLine">
									<Option value="0">消金</Option>
									<Option value="1">信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 还款查询第1个下拉选择框 -->
						<Form label-position="right" inline :model="BackMoney_search1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex5" @on-change="selectChange($event,'5')" @on-open-change="ClearVal4($event,'1')">
									<Option value="0" v-show='formIndex4  != 0 && formIndex6 != 0 && formIndex7 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex4  != 1 && formIndex6 != 1 && formIndex7 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex4  != 2 && formIndex6 != 2 && formIndex7 != 2'>主体</Option>
									<Option value="3" v-show='formIndex4  != 3 && formIndex6 != 3 && formIndex7 != 3'>应还日期</Option>
									<Option value="4" v-show='formIndex4  != 4 && formIndex6 != 4 && formIndex7 != 4'>实还日期</Option>
									<Option value="5" v-show='formIndex4  != 5 && formIndex6 != 5 && formIndex7 != 5'>操作时间</Option>
									<Option value="6" v-show='formIndex4  != 6 && formIndex6 != 6 && formIndex7 != 6'>还款方式</Option>
									<Option value="7" v-show='formIndex4  != 7 && formIndex6 != 7 && formIndex7 != 7'>还款状态</Option>
									<Option value="8" v-show='formIndex4  != 8 && formIndex6 != 8 && formIndex7 != 8'>账户状态</Option>
									<Option value="9" v-show='formIndex4  != 9 && formIndex6 != 9 && formIndex7 != 9'>当前期数</Option>
									<Option value="10" v-show='formIndex4  != 10 && formIndex6 != 10 && formIndex7 != 10'>业务线</Option>
								</Select>
								<Input v-show="formIndex5 == 0" type="text" placeholder="请输入合同编号！" v-model="BackMoney_search1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex5 == 1" type="text" placeholder="请输入客户姓名！" v-model="BackMoney_search1.clientName" size="large"></Input>
								<Select v-show="formIndex5 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="BackMoney_search1.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex5 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time3($event,'1')"
								placeholder="请选择应还日期！" size="large" v-model="BackMoney_search1.monthPayDate"></DatePicker>
								<DatePicker v-if="formIndex5 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time4($event,'1')"
								placeholder="请选择实还日期！" size="large" v-model="BackMoney_search1.transTime"></DatePicker>
								<DatePicker v-if="formIndex5 == 5" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time5($event,'1')"
								placeholder="请选择实操作时间！" size="large" v-model="BackMoney_search1.operationTime"></DatePicker>
								<Select v-show="formIndex5 == 6" placeholder="请选择还款方式！" class="twoSelect" size="large" v-model="BackMoney_search1.financeType">
									<Option value="T001">存对公</Option>
									<Option value="T002">代扣</Option>
									<Option value="T011">调账</Option>
									<Option value="T019">APP还款</Option>
									<Option value="T022">网关充值</Option>
								</Select>
								<Select v-show="formIndex5 == 7" @on-open-change="getListDict($event,'payStatus')" v-model="BackMoney_search1.payStatus"
								placeholder="请选择还款" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.payStatus" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex5 == 8" placeholder="请选择账户状态！" class="twoSelect" size="large" v-model="BackMoney_search1.accountStatus">
									<Option value="0">正常还款</Option>
									<Option value="1">已逾期</Option>
									<Option value="2">已结清</Option>
								</Select>
								<Input v-show="formIndex5 == 9" type="text" placeholder="请输入当前期数！" size="large" v-model="BackMoney_search1.billTerm"></Input>
								<Select v-show="formIndex5 == 10" placeholder="请选择业务线！" class="twoSelect" size="large" v-model="BackMoney_search1.businessLine">
									<Option value="0">消金</Option>
									<Option value="1">信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 还款查询第2个下拉选择框 -->
						<Form label-position="right" inline :model="BackMoney_search2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex6" @on-change="selectChange($event,'6')" @on-open-change="ClearVal4($event,'2')">
									<Option value="0" v-show='formIndex4  != 0 && formIndex5 != 0 && formIndex7 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex4  != 1 && formIndex5 != 1 && formIndex7 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex4  != 2 && formIndex5 != 2 && formIndex7 != 2'>主体</Option>
									<Option value="3" v-show='formIndex4  != 3 && formIndex5 != 3 && formIndex7 != 3'>应还日期</Option>
									<Option value="4" v-show='formIndex4  != 4 && formIndex5 != 4 && formIndex7 != 4'>实还日期</Option>
									<Option value="5" v-show='formIndex4  != 5 && formIndex5 != 5 && formIndex7 != 5'>操作时间</Option>
									<Option value="6" v-show='formIndex4  != 6 && formIndex5 != 6 && formIndex7 != 6'>还款方式</Option>
									<Option value="7" v-show='formIndex4  != 7 && formIndex5 != 7 && formIndex7 != 7'>还款状态</Option>
									<Option value="8" v-show='formIndex4  != 8 && formIndex5 != 8 && formIndex7 != 8'>账户状态</Option>
									<Option value="9" v-show='formIndex4  != 9 && formIndex5 != 9 && formIndex7 != 9'>当前期数</Option>
									<Option value="10" v-show='formIndex4  != 10 && formIndex5 != 10 && formIndex7 != 10'>业务线</Option>
								</Select>
								<Input v-show="formIndex6 == 0" type="text" placeholder="请输入合同编号！" v-model="BackMoney_search2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex6 == 1" type="text" placeholder="请输入客户姓名！" v-model="BackMoney_search2.clientName" size="large"></Input>
								<Select v-show="formIndex6 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="BackMoney_search2.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex6 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time3($event,'2')"
								placeholder="请选择应还日期！" size="large" v-model="BackMoney_search2.monthPayDate"></DatePicker>
								<DatePicker v-if="formIndex6 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time4($event,'2')"
								placeholder="请选择实还日期！" size="large" v-model="BackMoney_search2.transTime"></DatePicker>
								<DatePicker v-if="formIndex6 == 5" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time5($event,'2')"
								placeholder="请选择实操作时间！" size="large" v-model="BackMoney_search2.operationTime"></DatePicker>
								<Select v-show="formIndex6 == 6" placeholder="请选择还款方式！" class="twoSelect" size="large" v-model="BackMoney_search2.financeType">
									<Option value="T001">存对公</Option>
									<Option value="T002">代扣</Option>
									<Option value="T011">调账</Option>
									<Option value="T019">APP还款</Option>
									<Option value="T022">网关充值</Option>
								</Select>
								<Select v-show="formIndex6 == 7" @on-open-change="getListDict($event,'payStatus')" v-model="BackMoney_search2.payStatus"
								placeholder="请选择还款" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.payStatus" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex6 == 8" placeholder="请选择账户状态！" class="twoSelect" size="large" v-model="BackMoney_search2.accountStatus">
									<Option value="0">正常还款</Option>
									<Option value="1">已逾期</Option>
									<Option value="2">已结清</Option>
								</Select>
								<Input v-show="formIndex6 == 9" type="text" placeholder="请输入当前期数！" size="large" v-model="BackMoney_search2.billTerm"></Input>
								<Select v-show="formIndex6 == 10" placeholder="请选择业务线！" class="twoSelect" size="large" v-model="BackMoney_search2.businessLine">
									<Option value="0">消金</Option>
									<Option value="1">信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 还款查询第3个下拉选择框 -->
						<Form label-position="right" inline :model="BackMoney_search3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex7" @on-change="selectChange($event,'7')" @on-open-change="ClearVal4($event,'3')">
									<Option value="0" v-show='formIndex4  != 0 && formIndex5 != 0 && formIndex6 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex4  != 1 && formIndex5 != 1 && formIndex6 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex4  != 2 && formIndex5 != 2 && formIndex6 != 2'>主体</Option>
									<Option value="3" v-show='formIndex4  != 3 && formIndex5 != 3 && formIndex6 != 3'>应还日期</Option>
									<Option value="4" v-show='formIndex4  != 4 && formIndex5 != 4 && formIndex6 != 4'>实还日期</Option>
									<Option value="5" v-show='formIndex4  != 5 && formIndex5 != 5 && formIndex6 != 5'>操作时间</Option>
									<Option value="6" v-show='formIndex4  != 6 && formIndex5 != 6 && formIndex6 != 6'>还款方式</Option>
									<Option value="7" v-show='formIndex4  != 7 && formIndex5 != 7 && formIndex6 != 7'>还款状态</Option>
									<Option value="8" v-show='formIndex4  != 8 && formIndex5 != 8 && formIndex6 != 8'>账户状态</Option>
									<Option value="9" v-show='formIndex4  != 9 && formIndex5 != 9 && formIndex6 != 9'>当前期数</Option>
									<Option value="10" v-show='formIndex4  != 10 && formIndex5 != 10 && formIndex6 != 10'>业务线</Option>
								</Select>
								<Input v-show="formIndex7 == 0" type="text" placeholder="请输入合同编号！" v-model="BackMoney_search3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex7 == 1" type="text" placeholder="请输入客户姓名！" v-model="BackMoney_search3.clientName" size="large"></Input>
								<Select v-show="formIndex7 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="BackMoney_search3.mainBody"
								placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex7 == 3" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time3($event,'3')"
								placeholder="请选择应还日期！" size="large" v-model="BackMoney_search3.monthPayDate"></DatePicker>
								<DatePicker v-if="formIndex7 == 4" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time4($event,'3')"
								placeholder="请选择实还日期！" size="large" v-model="BackMoney_search3.transTime"></DatePicker>
								<DatePicker v-if="formIndex7 == 5" type="date" :editable="false" format="yyyy-MM-dd" @on-change="turn_time5($event,'3')"
								placeholder="请选择实操作时间！" size="large" v-model="BackMoney_search3.operationTime"></DatePicker>
								<Select v-show="formIndex7 == 6" placeholder="请选择还款方式！" class="twoSelect" size="large" v-model="BackMoney_search3.financeType">
									<Option value="T001">存对公</Option>
									<Option value="T002">代扣</Option>
									<Option value="T011">调账</Option>
									<Option value="T019">APP还款</Option>
									<Option value="T022">网关充值</Option>
								</Select>
								<Select v-show="formIndex7 == 7" @on-open-change="getListDict($event,'payStatus')" v-model="BackMoney_search3.payStatus"
								placeholder="请选择还款" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.payStatus" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex7 == 8" placeholder="请选择账户状态！" class="twoSelect" size="large" v-model="BackMoney_search3.accountStatus">
									<Option value="0">正常还款</Option>
									<Option value="1">已逾期</Option>
									<Option value="2">已结清</Option>
								</Select>
								<Input v-show="formIndex7 == 9" type="text" placeholder="请输入当前期数！" size="large" v-model="BackMoney_search3.billTerm"></Input>
								<Select v-show="formIndex7 == 10" placeholder="请选择业务线！" class="twoSelect" size="large" v-model="BackMoney_search3.businessLine">
									<Option value="0">消金</Option>
									<Option value="1">信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 还款查询按钮部分 -->
						<Form  inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="queryInitBack('backMoney')">查询</Button>
								<Button @click="BackMoney_Reset">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button @click="exportExcel1">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
			<Tabs :value="BusinessType" type="card" @on-click="TabList">
				<TabPane label="借款查询" name="getMoney">
					<!-- 公共table类-->
					<div v-if='BusinessType == "getMoney"? true :false'>
						<div class="table-item">
							<Table height='396' border :stripe="true" :columns="LoanQuery" :data="datas"></Table>
						</div>
						<!-- 公共page分页类 -->
						<div class="page-item">
							<span v-if="isShowWait">加载中</span>
							<Page placement="top" :total="totallPages" :show-total="showTotal" show-sizer @on-change="changePages"
							 @on-page-size-change="changePagesTotall"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
						</div>
					</div>
				</TabPane>
				<TabPane label="还款查询" name="backMoney">
					<!-- 公共table类-->
					<div v-if='BusinessType =="backMoney"? true:false'>
						<div class="table-item">
							<Table height='396' border :stripe="true" :columns="RepaymentQuery" :data="datas1"></Table>
						</div>
						<!-- 公共page分页类 -->
						<div class="page-item">
							<span v-if="isShowWait1">加载中</span>
							<Page placement="top" :total="totallPages1" :show-total="showTotal1" show-sizer @on-change="changePages1"
							 @on-page-size-change="changePagesTotall1"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click="refresh1" />
						</div>
					</div>
				</TabPane>
				<!-- 公共table类-->
				<div class="table-item">
					<Table border :stripe="true" :columns="LoanQuery" :data="datas"></Table>
				</div>
				<!-- 公共page分页类 -->
				<!--<div class="page-item">-->
				<!--<Page placement="top" :total="100" :page-size="30" :current="1" show-total show-elevator show-sizer @on-change="jump"></Page>-->
				<!--</div>-->
				</TabPane>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	import url from '../../service/url_config'
	export default {
		name: "businessQuery",
		data() {
			return {
				BusinessType: 'getMoney',
				saveNumbers: 0, //保存借款总数
				getMoney_value: '', //借款查询 多字段查询 区别
				backMoney_value: '', // 还款查询 多字段查询
				getMoney_select: '0', //  借款查询默认选中
				backMoney_select: '0', // 还款查询默认选中
				maxLength: 60, // 输入框最大输入长度
				getOrgNOs: [], // 营业部
				type: 'getMoney', // 筛选类型
				zhedie: "收起",
				value1: '1',
				formIndex: '0', //借款查询第0个下拉框默认选中
				formIndex1: '1', //借款查询第1个下拉框默认选中
				formIndex2: '2', //借款查询第2个下拉框默认选中
				formIndex3: '3', //借款查询第3个下拉框默认选中
				formIndex4: '0', //还款查询第0个下拉框默认选中
				formIndex5: '1', //还款查询第1个下拉框默认选中
				formIndex6: '2', //还款查询第2个下拉框默认选中
				formIndex7: '3', //还款查询第3个下拉框默认选中
				distList: { //下拉菜单数据汇集
					mainBody: [], // 主体下拉选择框字段
					auditType: [], // 审批状态 下拉选择框字段
					payStatus: [], //还款状态
				},
				showTotal: false, //是否显示总数
				isShowWait: false, //是否显示加载中
				showTotal1: false, //是否显示总数
				isShowWait1: false, //是否显示加载中
				//借款查询字段
				GetMoney_search: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'applyDate': '', // 申请日期
					'fullScaleDate': '', // 放款日期
					'auditType': '', //审批状态
					'belongOrgNo': '', // 营业部
					'loanNamePhone':'',
					'idCard':'',
				},
				GetMoney_search1: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'applyDate': '', // 申请日期
					'fullScaleDate': '', // 放款日期
					'auditType': '', //审批状态
					'belongOrgNo': '', // 营业部
					'loanNamePhone':'',
					'idCard':'',
				},
				GetMoney_search2: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'applyDate': '', // 申请日期
					'fullScaleDate': '', // 放款日期
					'auditType': '', //审批状态
					'belongOrgNo': '', // 营业部
					'loanNamePhone':'',
					'idCard':'',
				},
				GetMoney_search3: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'applyDate': '', // 申请日期
					'fullScaleDate': '', // 放款日期
					'auditType': '', //审批状态
					'belongOrgNo': '', // 营业部
					'loanNamePhone':'',
					'idCard':'',
				},
				LastSubmitData:{
					'pageIndex': '1',
					'pageSize': '10',
				},
				// 还款查询字段
				BackMoney_search: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'monthPayDate': '', // 应还日期
					'transTime': '', // 实还日期
					'operationTime': '', // 操作时间
					'financeType': '', // 还款方式
					'payStatus': '', // 还款状态
					'accountStatus': '', //账户状态
					'billTerm': '', // 当前期数
					'businessLine': '', // 业务线
				},
				BackMoney_search1: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'monthPayDate': '', // 应还日期
					'transTime': '', // 实还日期
					'operationTime': '', // 操作时间
					'financeType': '', // 还款方式
					'payStatus': '', // 还款状态
					'accountStatus': '', //账户状态
					'billTerm': '', // 当前期数
					'businessLine': '', // 业务线
				},
				BackMoney_search2: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'monthPayDate': '', // 应还日期
					'transTime': '', // 实还日期
					'operationTime': '', // 操作时间
					'financeType': '', // 还款方式
					'payStatus': '', // 还款状态
					'accountStatus': '', //账户状态
					'billTerm': '', // 当前期数
					'businessLine': '', // 业务线
				},
				BackMoney_search3: {
					'loanContractNo': '', //合同编号
					'clientName': '', // 客户姓名
					'mainBody': '', // 主体
					'monthPayDate': '', // 应还日期
					'transTime': '', // 实还日期
					'operationTime': '', // 操作时间
					'financeType': '', // 还款方式
					'payStatus': '', // 还款状态
					'accountStatus': '', //账户状态
					'billTerm': '', // 当前期数
					'businessLine': '', // 业务线
				},
				LastSubmitData1:{
					'pageIndex': '1',
					'pageSize': '10',
				},
				isActive: true,
				totallPages: 0,
				totallPages1: 0,
				onePage: 0,
				// 借款查询 字段
				LoanQuery: [{
						title: '合同编号',
						minWidth: 170,
						key: 'loanContractNo',
						render: (h, params) => {
							return h('div', [
								h('span', {
									style: {
										cursor: 'pointer',
										color: '#33cde5',
										textDecoration: 'underline'
									},
									on: {
										click: () => {
											this.setStore('opreate', {
												path: 'businessQuery',
												allINFO: params.row,
												showpanl: 'privite',
											}, )
											this.$router.push({
												path: 'importantInfo'
											})
										}
									}
								}, params.row.loanContractNo)
							])
						}
					}, {
						title: '客户姓名',
						minWidth: 100,
						key: 'clientName'

					}, {
						title: '主体',
						minWidth: 85,
						key: 'mainBody'

					}, {
						title: '贷款金额',
						minWidth: 100,
						key: 'grantLoanAmount',
					}, {
						title: '合同金额',
						minWidth: 100,
						key: 'loanAmount',
					},{
						title: '首次还款日',
						minWidth: 105,
						key: 'monthPayDate',
					}, {
						title: '月还款金额',
						minWidth: 105,
						key: 'monthRtnAmount',
					}, {
						title: '分期期数',
						minWidth: 100,
						key: 'loanBill',
					}, {
						title: '商户名称',
						minWidth: 100,
						key: 'merName',
					},
					{title: '销售部门',minWidth: 100,key: 'salesDepartment',},
					{title: '营业部',minWidth: 85,key: 'belongOrgNo'},
					{title: '放款成功时间',minWidth: 120,key: 'fullScaleDate'},
					{title: '已还期数',minWidth: 100,key: 'payTerm',},
				],
				// 还款查询字段
				RepaymentQuery: [
					{
					title: '合同编号',
					minWidth: 170,
					key: 'loanContractNo',
					render: (h, params) => {
						return h('div', [
							h('span', {
								style: {
									cursor: 'pointer',
									color: '#33cde5',
									textDecoration: 'underline'
								},
								on: {
									click: () => {
										this.setStore('opreate', {
											path: 'businessQuery',
											allINFO: params.row,
											showpanl: 'privite',
										}, )
										this.$router.push({
											path: 'importantInfo'
										})
									}
								}
							}, params.row.loanContractNo)
						])
					}
				},
				{title: '客户姓名',minWidth: 100,key: 'clientName'},{title: '甲方公司编码',minWidth: 100,key: 'mainBody'},
				{title: '产品类型',minWidth: 100,key: 'productTypeName'},{title: '当前期数',minWidth: 100,key: 'billTerm',},
				{title: '应还日期',minWidth: 100,key: 'monthPayDate'},{title: '实还日期',minWidth: 100,key: 'transTime'},
				{title: '应还本金',minWidth: 100,key: 'duetoCapital'},{title: '实还本金',minWidth: 100,key: 'paidCapital'},
				{title: '应还利息',minWidth: 100,key: 'duetoInterest'},{title: '实还利息',minWidth: 100,key: 'paidInterest'},
				{title: '应还特权包',minWidth: 100,key: 'duetoSpecial'},{title: '实还特权包',minWidth: 100,key: 'paidSpecial'},
				{title: '应还保险费',minWidth: 100,key: 'duetoPremium'},{title: '实还保险费',minWidth: 100,key: 'paidPremium'},
				{title: '应还滞纳金',minWidth: 100,key: 'duetoOverdueFee'},{title: '实还滞纳金',minWidth: 100,key: 'paidOverdueFee'},
				{title: '应还手续费',minWidth: 100,key: 'duetoPaymentFee'},{title: '实还手续费',minWidth: 100,key: 'paidPaymentFee'},
				{title: '应还账户管理费',minWidth: 125,key: 'duetoAccountManage'},{title: '实还账户管理费',minWidth: 125,key: 'paidAccountManage'},
				{title: '应还总额',minWidth: 100,key: 'loanAmount'},{title: '实还总额',minWidth: 100,key: 'paidAmount'},
				{title: '提前结清应还总额',minWidth: 135,key: 'earlySettleAmount'},{title: '提前结清退费金额',minWidth: 135,key: 'earlySettleRefound'},
				{title:'剩余超额金',minWidth:100,key:'balance'},{title:'结清状态',minWidth:100,key:'isSettle'},
				{title:'还款状态',minWidth:100,key:'payStatus'},{title:'账户状态',minWidth:100,key:'status'},
				{title:'还款方式',minWidth:100,key:'financeType'},{title:'操作时间',minWidth:160,key:'operationTime'},
					],
				datas: [],
				datas1: [],
			}
		},
		methods: {
			 //借款 查询执行
			queryInitGet() {
				this.ClearObject(this.LastSubmitData)
				this.LastSubmitData.pageIndex = 1
				this.LastSubmitData.pageSize = 10
				for(let i in this.GetMoney_search){
					if(this.GetMoney_search[i] != ''){
						this.$set(this.LastSubmitData, i , this.GetMoney_search[i])
					}
				}
				for(let i in this.GetMoney_search1){
					if(this.GetMoney_search1[i] != ''){
						this.$set(this.LastSubmitData, i , this.GetMoney_search1[i])
					}
				}
				for(let i in this.GetMoney_search2){
					if(this.GetMoney_search2[i] != ''){
						this.$set(this.LastSubmitData, i , this.GetMoney_search2[i])
					}
				}
				for(let i in this.GetMoney_search3){
					if(this.GetMoney_search3[i] != ''){
						this.$set(this.LastSubmitData, i , this.GetMoney_search3[i])
					}
				}
				this.init('getMoney');
				this.getMoneyCount();
			},
			 //还款 查询执行
			queryInitBack() {
				this.ClearObject(this.LastSubmitData1)
				this.LastSubmitData1.pageIndex = 1
				this.LastSubmitData1.pageSize = 10
				for(let i in this.BackMoney_search){
					if(this.BackMoney_search[i] != ''){
						this.$set(this.LastSubmitData1, i , this.BackMoney_search[i])
					}
				}
				for(let i in this.BackMoney_search1){
					if(this.BackMoney_search1[i] != ''){
						this.$set(this.LastSubmitData1, i ,  this.BackMoney_search1[i])
					}
				}
				for(let i in this.BackMoney_search2){
					if(this.BackMoney_search2[i] != ''){
						this.$set(this.LastSubmitData1, i ,  this.BackMoney_search2[i])
					}
				}
				for(let i in this.BackMoney_search3){
					if(this.BackMoney_search3[i] != ''){
						this.$set(this.LastSubmitData1, i ,  this.BackMoney_search3[i])
					}
				}
				this.backMoneyCount();
				this.init('backMoney');
			},
			// 默认查询相关数据
			init(name, page, pagesize) {
				const _ = this
				if (name == 'getMoney') { //借款查询列表
					_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
					_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
					_.HttpAjax('post', name, _.LastSubmitData, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if (res.data.status === 200) {
							_.datas = res.data.data.data
						}
					});

					if (_.totallPages == 0) {
						_.isShowWait = true;
					}

				} else if (name == 'backMoney') { //还款查询列表
					_.LastSubmitData1.pageIndex = page || _.LastSubmitData1.pageIndex;
					_.LastSubmitData1.pageSize = pagesize || _.LastSubmitData1.pageSize;
					_.HttpAjax('post', name, _.LastSubmitData1, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if (res.data.status === 200) {
							_.datas1 = res.data.data.data
						}
					});

					if (_.totallPages1 == 0) {
						_.isShowWait1 = true;
					}
				} else {
					//后期写入其他tab里的数据
				}
			},
			 //借款总条数查询
			getMoneyCount() {
				const _ = this;
				_.HttpAjax('post', 'getMoneyCount', this.LastSubmitData, (res) => {
					if (res.data.status === 200) {
						_.showTotal = true;
						_.isShowWait = false;
						_.totallPages = res.data.data;
					}
				}, 'count');
			},
			 //还款总条数查询
			backMoneyCount(page, pagesize) {
				const _ = this;
				_.HttpAjax('post', 'backMoneyCount', this.LastSubmitData1, (res) => {
					if (res.data.status === 200) {
						_.showTotal1 = true;
						_.isShowWait1 = false;
						_.totallPages1 = res.data.data
					}
				}, 'count');
			},
			// 折叠点击事件
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
			//切换tab页，获取对应的数据
			TabList(name) {
				this.ClearObject(this.GetMoney_search)
				this.ClearObject(this.GetMoney_search1)
				this.ClearObject(this.GetMoney_search2)
				this.ClearObject(this.GetMoney_search3)
				this.ClearObject(this.LastSubmitData)
				const _ = this
				_.type = name
				this.BusinessType = name
				if (this.datas.length == 0 || this.datas1.length == 0) {
					this.init(name, 1, 10)
				}
			},
			//------------------------借款查询
			//下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.formIndex = val
				}else {
					this['formIndex'+index] = val
				}
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.GetMoney_search)
					}else{
						this.ClearObject(this['GetMoney_search'+index])
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
			// 重置按钮点击事件（借款查询 重置）
			getMoney_Reset() {
				this.ClearObject(this.GetMoney_search)
				this.ClearObject(this.GetMoney_search1)
				this.ClearObject(this.GetMoney_search2)
				this.ClearObject(this.GetMoney_search3)
				this.ClearObject(this.LastSubmitData)
				this.init('getMoney');
				this.queryInitGet();
			},
			//------------------------还款查询
			//下拉框展开
			ClearVal4(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.BackMoney_search)
					}else{
						this.ClearObject(this['BackMoney_search'+index])
					}
				}
			},
			// 重置按钮点击事件（还款查询）
			BackMoney_Reset() {
				this.ClearObject(this.BackMoney_search)
				this.ClearObject(this.BackMoney_search1)
				this.ClearObject(this.BackMoney_search2)
				this.ClearObject(this.BackMoney_search3)
				this.ClearObject(this.LastSubmitData1)
				this.init('backMoney');
				this.queryInitBack();
			},
			// 申请日期转化
			turn_time1(value,index) {
				index = index || '';
				if(index == ''){
					this.GetMoney_search.applyDate = value
				}else{
					this['GetMoney_search'+index].applyDate = value;
				}
			},
			//放款日期转化
			turn_time2(value,index) {
				index = index || '';
				if(index == ''){
					this.GetMoney_search.fullScaleDate = value
				}else{
					this['GetMoney_search'+index].fullScaleDate = value;
				}
			},
			// 应还日期转化
			turn_time3(value,index) {
				index = index || '';
				if(index == ''){
					this.BackMoney_search.monthPayDate = value
				}else{
					this['BackMoney_search'+index].monthPayDate = value;
				}
			},
			// 实还日期转化
			turn_time4(value,index) {
				index = index || '';
				if(index == ''){
					this.BackMoney_search.transTime = value
				}else{
					this['BackMoney_search'+index].transTime = value;
				}
			},
			// 操作时间转化
			turn_time5(value,index) {
				index = index || '';
				if(index == ''){
					this.BackMoney_search.operationTime = value
				}else{
					this['BackMoney_search'+index].operationTime = value;
				}
			},
			// 下拉菜单查询
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
									case 'mainBody':
										_.distList.mainBody = res.data.data; //主体
										break;
									case 'auditType': //
										_.distList.auditType = res.data.data;
										break;
									case 'payStatus': //还款状态
										_.distList.payStatus = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			// 营业部查询
			getOrgNO(bol) {
				if (bol) {
					if (this.getOrgNOs.length == 0) {
						this.HttpAjax('post', 'getOrgNO', {}, (res => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res.data.status === 200) {
								this.getOrgNOs = res.data.data
							}
						}))
					}
				}
			},
			 //翻页-->第几页
			changePages(name) {
				this.init('getMoney', name);
			},
			 //每一页显示多少条数据
			changePagesTotall(name) {
				this.LastSubmitData.pageSize = name;
				this.init('getMoney', '1', name);
			},
			//翻页-->第几页
			changePages1(name) { 
				this.init('backMoney', name);
			},
			//每一页显示多少条数据
			changePagesTotall1(name) { 
				this.LastSubmitData1.pageSize = name;
				this.init('backMoney', '1', name);
			},
			 //刷新
			refresh() {
				this.init('getMoney');
			},
			//刷新
			refresh1() { 
				this.init('backMoney');
			},
			// 导出数据 按钮( //借款查询)
			exportExcel() {
				const _ = this;
				_.HttpAjax('post', 'downloadLoanListExcel', qs.stringify(_.LastSubmitData), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, '借款查询.xlsx');
				}, 'download');
			},
			// 导出数据 按钮( //还款查询)
			exportExcel1() {
				const _ = this;
				_.HttpAjax('post', 'downloadRepaymentListExcel', qs.stringify(_.LastSubmitData1), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, '还款查询.xlsx');
				}, 'download');
			}
		},
		created() {
			this.init('getMoney');
			this.getMoneyCount();
			this.backMoneyCount();
		}
	}
</script>

<style lang="less">
	.myOutsideCase {
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
</style>
