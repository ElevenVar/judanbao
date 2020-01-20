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
						<!-- 第0个下拉选择框 -->
						<Form label-position="right" inline :model="allselect" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show=' formIndex1 != 0 && formIndex2 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show=' formIndex1 != 1 && formIndex2 != 1 && formIndex3!= 1'>客户姓名</Option>
									<Option value="2" v-show=' formIndex1 != 2 && formIndex2 != 2 && formIndex3!= 2'>还款日</Option>
									<Option value="3" v-show=' formIndex1 != 3 && formIndex2 != 3 && formIndex3!= 3'>逾期天数</Option>
									<Option value="4" v-show=' formIndex1 != 4 && formIndex2 != 4 && formIndex3!= 4'>案件状态</Option>
									<Option value="5" v-show=' formIndex1 != 5 && formIndex2 != 5 && formIndex3!= 5'>案件分配日期</Option>
									<Option value="6" v-show=' formIndex1 != 6 && formIndex2 != 6 && formIndex3!= 6'>永久催收员</Option>
									<Option value="7" v-show=' formIndex1 != 7 && formIndex2 != 7 && formIndex3!= 7'>逾期等级</Option>
									<Option value="8" v-show=' formIndex1 != 8 && formIndex2 != 8 && formIndex3!= 8'>所属团队</Option>
									<Option value="9" v-show=' formIndex1 != 9 && formIndex2 != 0 && formIndex3!= 9'>所属组长</Option>
									<Option value="10" v-show=' formIndex1 != 10 && formIndex2 != 10 && formIndex3!= 10'>停催类型</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11 '>是否特权包</Option>
									<Option value="12" v-show='formIndex1 != 12 && formIndex2 != 12 && formIndex3 != 12 '>主体</Option>
									<Option value="13" v-show='formIndex1 != 13 && formIndex2 != 13 && formIndex3 != 13 '>营业部</Option>
									<Option value="14" v-show='formIndex1 != 14 && formIndex2 != 14 && formIndex3 != 14 '>身份证号</Option>
									<Option value="15" v-show='formIndex1 != 15 && formIndex2 != 15 && formIndex3 != 15 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientNme" size="large"></Input>
								<DatePicker v-if="formIndex == 2" v-model="allselect.monthPayDateS" @on-change='dateChangesettleTime($event,"")' format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect.overdueDayEnd"></Input>
								<Select v-show="formIndex == 4" v-model="allselect.handleType" placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option value='2'>电催停催</Option>
									<Option value='3'>委外停催</Option>
								</Select>
								<DatePicker v-if="formIndex == 5" @on-change='dateChange1($event,"")' type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false"
								 format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex == 6" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
								<Select v-show="formIndex == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>

								<Select v-show="formIndex == 8" @on-open-change="getTeamList" v-model="allselect.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option :key="item.urgeTeamId" v-for="item in distList.teamList" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
								<Select v-show="formIndex == 10" @on-open-change="getListDict($event,'stopType')" v-model="allselect.stopType"
								 placeholder="请选择停催类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.stopType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 11" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex == 12" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex == 13" @on-open-change="getOrgNO" v-model="allselect.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex == 14" type="text" placeholder="请输入身份证号！" v-model="allselect.certNo" size="large"></Input>
								<Input v-show="formIndex == 15" type="text" placeholder="请输入电话号码！" v-model="allselect.phone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个下拉选择框 -->
						<Form label-position="right" inline :model="allselect1" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>案件状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>案件分配日期</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>永久催收员</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10'>停催类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11 '>是否特权包</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex2 != 12 && formIndex3 != 12 '>主体</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex2 != 13 && formIndex3 != 13 '>营业部</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex2 != 14 && formIndex3 != 14 '>身份证号</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex2 != 15 && formIndex3 != 15 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect1.clientNme" size="large"></Input>
								<DatePicker v-if="formIndex1 == 2" v-model="allselect1.monthPayDateS" @on-change='dateChangesettleTime($event,"1")' format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect1.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect1.overdueDayEnd"></Input>
								<Select v-show="formIndex1 == 4" v-model="allselect1.handleType" placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option value='2'>电催停催</Option>
									<Option value='3'>委外停催</Option>
								</Select>
								<DatePicker v-if="formIndex1 == 5" @on-change='dateChange1($event,"1")' type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false"
								 format="yyyy-MM-dd" size="large" v-model="allselect1.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex1 == 6" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect1.foreverUlgeNo"></Input>
								<Select v-show="formIndex1 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect1.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>

								<Select v-show="formIndex1 == 8" @on-open-change="getTeamList" v-model="allselect1.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option :key="item.urgeTeamId" v-for="item in distList.teamList" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect1.headmanId"></Input>
								<Select v-show="formIndex1 == 10" @on-open-change="getListDict($event,'stopType')" v-model="allselect1.stopType"
								 placeholder="请选择停催类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.stopType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 11" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect1.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex1 == 12" @on-open-change="getListDict($event,'mainBody')" v-model="allselect1.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex1 == 13" @on-open-change="getOrgNO" v-model="allselect1.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 14" type="text" placeholder="请输入身份证号！" v-model="allselect1.certNo" size="large"></Input>
								<Input v-show="formIndex1 == 15" type="text" placeholder="请输入电话号码！" v-model="allselect1.phone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个下拉选择框 -->
						<Form label-position="right" inline :model="allselect2" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>案件状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>案件分配日期</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>永久催收员</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10'>停催类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11 '>是否特权包</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex3 != 12 '>主体</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex3 != 13 '>营业部</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex3 != 14 '>身份证号</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex1 != 15 && formIndex3 != 15 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect2.clientNme" size="large"></Input>
								<DatePicker v-if="formIndex2 == 2" v-model="allselect2.monthPayDateS" @on-change='dateChangesettleTime($event,"2")' format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect2.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect2.overdueDayEnd"></Input>
								<Select v-show="formIndex2 == 4" v-model="allselect2.handleType" placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option value='2'>电催停催</Option>
									<Option value='3'>委外停催</Option>
								</Select>
								<DatePicker v-if="formIndex2 == 5" @on-change='dateChange1($event,"2")' type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false"
								 format="yyyy-MM-dd" size="large" v-model="allselect2.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex2 == 6" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect2.foreverUlgeNo"></Input>
								<Select v-show="formIndex2 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect2.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>

								<Select v-show="formIndex2 == 8" @on-open-change="getTeamList" v-model="allselect2.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option :key="item.urgeTeamId" v-for="item in distList.teamList" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect2.headmanId"></Input>
								<Select v-show="formIndex2 == 10" @on-open-change="getListDict($event,'stopType')" v-model="allselect2.stopType"
								 placeholder="请选择停催类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.stopType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 11" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect2.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex2 == 12" @on-open-change="getListDict($event,'mainBody')" v-model="allselect2.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex2 == 13" @on-open-change="getOrgNO" v-model="allselect2.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 14" type="text" placeholder="请输入身份证号！" v-model="allselect2.certNo" size="large"></Input>
								<Input v-show="formIndex2 == 15" type="text" placeholder="请输入电话号码！" v-model="allselect2.phone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个下拉选择框 -->
						<Form label-position="right" inline :model="allselect3" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>案件状态</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>案件分配日期</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6'>永久催收员</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10'>停催类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11 '>是否特权包</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex2 != 12 '>主体</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex2 != 13 '>营业部</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex2 != 14 '>身份证号</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex1 != 15 && formIndex2 != 15 '>电话号码</Option>
								</Select>
								<Input v-if="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect3.loanContractNo" size="large"></Input>
								<Input v-if="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect3.clientNme" size="large"></Input>
								<DatePicker v-if="formIndex3 == 2" v-model="allselect3.monthPayDateS" @on-change='dateChangesettleTime($event,"3")' format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请输入还款日！" size="large"></DatePicker>
								<Input class='only' v-if="formIndex3 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect3.overdueDayStart"></Input>
								<Input class='only' v-if="formIndex3 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect3.overdueDayEnd"></Input>

								<Select v-if="formIndex3 == 4" v-model="allselect3.handleType" placeholder="请选择案件状态" class="twoSelect" size="large">
								 	<Option value='2'>电催停催</Option>
									<Option value='3'>委外停催</Option>
								</Select>
								<DatePicker v-if="formIndex3 == 5" @on-change='dateChange1($event,"3")' type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false"
								 format="yyyy-MM-dd" size="large" v-model="allselect3.caseAllotTimeS"></DatePicker>
								<Input v-if="formIndex3 == 6" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect3.foreverUlgeNo"></Input>
								<Select v-if="formIndex3 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect3.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>

								<Select v-if="formIndex3 == 8" @on-open-change="getTeamList" v-model="allselect3.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option :key="item.urgeTeamId" v-for="item in distList.teamList" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-if="formIndex3 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect3.headmanId"></Input>
								<Select v-if="formIndex3 == 10" @on-open-change="getListDict($event,'stopType')" v-model="allselect3.stopType"
								 placeholder="请选择停催类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.stopType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 11" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect3.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex3 == 12" @on-open-change="getListDict($event,'mainBody')" v-model="allselect3.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex3 == 13" @on-open-change="getOrgNO" v-model="allselect3.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 14" type="text" placeholder="请输入身份证号！" v-model="allselect3.certNo" size="large"></Input>
								<Input v-show="formIndex3 == 15" type="text" placeholder="请输入电话号码！" v-model="allselect3.phone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search" :disabled="addTemplate">查询</Button>
								<Button @click="Reset" :disabled="addTemplate">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="getAuth('04000010103')" @click="exportStopCase" :disabled="addTemplate">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
								<Button v-if="getAuth('04000010104')" @click="importMethod" :disabled="addTemplate">
									<Icon type="navicon-round"></Icon> 导入数据
								</Button>
								<Button @click="dwnloadTemplate" :disabled="addTemplate">
									<Icon type="navicon-round"></Icon> 下载模板
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
				<Table height='396' border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<div class="page-item">
				<Page :total="pageTotal" :page-size="pageSize" :current="current" @on-page-size-change="jumppage" @on-change="jump"
				 show-total show-sizer></Page>
				<!--<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">{{totalye}}</span>页</span>-->
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--选择文件-->
		<Modal v-model="addTemplate" draggable :mask-closable="false" :scrollable="true" :loading="loading" title="导入">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" ref="uploadFile" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						 multiple />
					</FormItem>
				</Form>

			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="getApplyModeTo()">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import axios from 'axios'
	import qs from 'qs'
	import url from '../../service/url_config'
	export default {
		data() {
			const cellName = (rule, value, callback) => {
				if (value.length > 60) {
					callback(new Error('不能超过60个字符！'));
				} else {
					callback();
				}
			};
			return {
				title: '停催案件管理',
				zhedie: "收起",
				value1: '1',
				isActive: true,
				loading: true,
				addTemplate: false, //导入模态框
				importFileL: {}, //选择的Excel文件
				//-------------------------------------------分页
				pageTotal: 2, //数据总条数
				pageSize: 10, //每页条数
				totalye: 1, //总共多少页
				current: 1, //当前页码
				placeholder: '请输入合同编号！', //placeholder
				stopTypeList: [],
				formIndex: '0', //第0个下拉选择框
				formIndex1: '1', //第1个下拉选择框
				formIndex2: '2', //第2个下拉选择框
				formIndex3: '4', //第3个下拉选择框
				// ----------------筛选条件
				allselect: {
					loanContractNo: '', //编号
					clientNme: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					handleType: '', //案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', // 所属组长
					stopType: '', //停催类型
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					phone: '',
					certNo:'',
				},
				allselect1: {
					loanContractNo: '', //编号
					clientNme: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					handleType: '', //案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', // 所属组长
					stopType: '', //停催类型
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					phone: '',
					certNo:'',
				},
				allselect2: {
					loanContractNo: '', //编号
					clientNme: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					handleType: '', //案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', // 所属组长
					stopType: '', //停催类型
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					phone: '',
					certNo:'',
				},
				allselect3: {
					loanContractNo: '', //编号
					clientNme: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					handleType: '', //案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', // 所属组长
					stopType: '', //停催类型
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					phone: '',
					certNo:'',
				},
				LastSubmitData:{
					pageIndex: '1',
					pageSize: '10',
				},
				distList: {
					overdueGrade: [],
					teamList: [], //所属团队
					stopType: [], //停催类型
					isSpecial:[], // 是否特权包
					getOrgNO: [], // 营业部
					mainBody:[], //主体
				},
				ruleValidate: {
					overdueDay: [{
							required: false,
							message: '请输入逾期天数！'
						},
						{
							type: 'number',
							message: '请输入数字格式',
							trigger: 'blur',
							transform(value) {
								return Number(value);
							}
						},
					],

					headmanId: [{
						required: false,
						message: '请输入所属组长！'
					}, {
						validator: cellName,
						trigger: 'blur'
					}],
					foreverUlgeNo: [{
						required: false,
						message: '请输入永久催收员！'
					}, {
						validator: cellName,
						trigger: 'blur'
					}],
				},
				panduan: {
					arg1: '',
				},
				stepShow: true,
				columns: [{
						title: '进件营业部',
						minWidth: 120,
						key: 'orgNo'
					}, {
						title: '归属营业部',
						minWidth: 100,
						key: 'belongOrgNo'

					},
					{
						title: '合同编号',
						minWidth: 150,
						key: 'loanContractNo'

					}, {
						title: '客户姓名',
						minWidth: 120,
						key: 'clientName',
					}, {
						title: '产品类型',
						minWidth: 170,
						key: 'productType',
					}, {
						title: '还款日',
						minWidth: 100,
						key: 'settleTime',
					}, {
						title: '逾期等级',
						minWidth: 100,
						key: 'overdueGrade',
					}, {
						title: '逾期天数',
						minWidth: 100,
						key: 'overdueDays',
					}, {
						title: '逾期总额',
						minWidth: 100,
						key: 'overdueAmount',
					}, {
						title: '案件分配日期',
						minWidth: 150,
						key: 'caseAllotTime',
					}, {
						title: '停催类型',
						minWidth: 100,
						key: 'stopType',
						render: (h, params) => {
							if (params.row.stopType == '2') {
								return h('div', [
									h('span', {}, '永久停催')
								])
							} else if (params.row.stopType == '1') {
								return h('div', [
									h('span', {}, '临时停催')
								])
							} else {
								return h('div', [
									h('span', {}, '激活')
								])
							}
						}
					}, {
						title: '停催开始时间',
						minWidth: 150,
						key: 'stopBeginTime',
					}, {
						title: '停催结束时间',
						minWidth: 150,
						key: 'stopEndTime',
					}, {
						title: '审核状态',
						minWidth: 100,
						key: 'status',
						render: (h, params) => {
							if (params.row.status == '0') {
								return h('div', [
									h('span', {}, '审核中')
								])
							} else if (params.row.status == '1') {
								return h('div', [
									h('span', {}, '审核通过')
								])
							} else if (params.row.status == '2') {
								return h('div', [
									h('span', {}, '审核拒绝')
								])
							} else if (params.row.status == '3') {
								return h('div', [
									h('span', {}, '激活')
								])
							}
						}
					},{
						title : '案件状态',
						minWidth: 100,
						key: 'caseType',
					},{
						title: '操作',
						minWidth: 200,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.addTemplate
									},
									style: {
										marginRight: '5px',
										display: this.getAuth('4000010101') ? 'inline-block' : 'none'
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
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: params.row.status != '1' || this.addTemplate ? true : false
									},
									style: {
										marginRight: '5px',
										display: this.getAuth('04000010102') ? 'inline-block' : 'none'
									},
									on: {
										click: () => {
											this.activationCase(params)
										}
									}
								}, '激活')
							])
						}
					},
				],
				datas: []
			}
		},
		components: {},
		methods: {
			// 默认数据查询
			init(pageIndex, pageSize) {
				const _ = this;
				_.LastSubmitData.pageIndex = pageIndex || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pageSize || _.LastSubmitData.pageSize;
				this.HttpAjax('post', 'stopUrgeList', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.datas = res.data.data.data
						let total = res.data.data.dataCount; //数据总条数
						let pageSize = res.data.data.pageSize; //每页条数
						this.pageTotal = total
						this.stopTypeList = res.data.data.data
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
			//查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData)
				for(let i in this.allselect){
					if(this.allselect[i] !=''){
						this.$set(this.LastSubmitData, i ,this.allselect[i])
						
					}
				}
				for(let i in this.allselect1){
					if(this.allselect1[i] !=''){
						this.$set(this.LastSubmitData, i ,this.allselect1[i])
						
					}
				}
				for(let i in this.allselect2){
					if(this.allselect2[i] !=''){
						this.$set(this.LastSubmitData, i ,this.allselect2[i])
						
					}
				}
				for(let i in this.allselect3){
					if(this.allselect3[i] !=''){
						this.$set(this.LastSubmitData, i ,this.allselect3[i])
						
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
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
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
									case 'mainBody': // 主体
										_.distList.mainBody = res.data.data;
										break;
									case 'overdueGrade':
										_.distList.overdueGrade = res.data.data;
										break;
									case 'stopType':
										_.distList.stopType = res.data.data;
										break;
									case 'isSpecial': // 是否特权包
										_.distList.isSpecial = res.data.data; //是否特权包
										break;
								}
							}
						})
					}
				}
			},
			// 营业部
			getOrgNO(bol){
				if(bol){
					if(this.distList.getOrgNO.length == 0){
						this.HttpAjax('post','getOrgNO',{},(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == 200){
								this.distList.getOrgNO = res.data.data
							}
						})
					}
				}
			},
			//字典表查询团队列表
			getTeamList(bol) {
				if (bol) {
					if (this.distList.teamList.length == 0) {
						this.HttpAjax('post', 'getTeamList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == 200) {
								this.distList.teamList = res.data.data
							}
						})
					}
				}
			},
			//还款日转换
			dateChangesettleTime(val,index) {
				index = index || '';
				if(index == ''){
					this.allselect.monthPayDateS = val
				}else{
					this['allselect'+index].monthPayDateS = val;
				}
			},
			//案件分配日期转换
			dateChange1(val,index) {
				index = index || '';
				if(index == ''){
					this.allselect.caseAllotTimeS = val
				}else{
					this['allselect'+index].caseAllotTimeS = val;
				}
			},
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
						this.ClearObject(this.allselect)
					}else {
						this.ClearObject(this['allselect'+index])
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
			// 重置
			Reset() {
				this.ClearObject(this.allselect)
				this.ClearObject(this.allselect1)
				this.ClearObject(this.allselect2)
				this.ClearObject(this.allselect3)
				this.ClearObject(this.LastSubmitData)
				this.init()
			},
			refresh() { //刷新
				this.init();
			},
			activationCase(row) { //停催激活
				const _ = this;
				_.$Modal.confirm({
					title:'确认激活嘛？',
					onOk:()=>{
						_.HttpAjax('post', 'activationStop', {
							idKey: row.row.idKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								this.$Notice.success({
									title: '成功',
									desc: '激活成功!',
									duration: 2
								})
								_.init()
							}
						})
					}
				});
			},
			cancel() {
				this.addTemplate = false;
			},

			//下载模板
			dwnloadTemplate() {
				var formdata = new FormData();
				formdata.id = 'b92501fbbd74490aab51dfb52dcd8e69';
				this.HttpAjax('post', 'downloadExcelTemp', formdata, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					var blob = new Blob([res.data], {
						type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
					}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
					var downloadElement = document.createElement('a');
					var href = window.URL.createObjectURL(blob); //创建下载的链接
					downloadElement.href = href;
					downloadElement.download = '停催模板.xlsx'; //下载后文件名
					document.body.appendChild(downloadElement);
					downloadElement.click(); //点击下载
					document.body.removeChild(downloadElement); //下载完成移除元素
					window.URL.revokeObjectURL(href);

				}, 'download');
			},
			//停催数据导出
			exportStopCase() {
				this.HttpAjax('post','exportStopUrgeExcel',qs.stringify(this.LastSubmitData),(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data,'停催案件管理.xlsx');
				},'download');
			},
			//导入模态框
			importMethod() {
				this.addTemplate = true;
				this.importFile = {};
				this.$refs['uploadFile'].value = '';
			},
			getUploadExcel(e) { //选择导入的文件
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
			//导入
			getApplyModeTo() {
				const _ = this;
				_.HttpAjax('post', 'importStopUrgeExcel', _.importFile, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if (res && res.data.status == '200') {
						_.$Notice.success({
							title: '成功',
							desc: '导入成功！',
							duration: 2
						});
						this.addTemplate = false;
					}
				}, 'file');
			},
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
</style>
