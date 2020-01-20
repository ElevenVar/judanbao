<template>
	<div class="collectCaseMange1">
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
						<!-- 第0个条件选择框 -->
						<Form label-position="right" inline :model="allselect">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event, '0')" @on-open-change='ClearVal($event, "0")'>
									<Option value="0" v-show=' formIndex1 != 0 && formIndex2 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3!= 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3!= 2'>还款日</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3!= 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3!= 4'>案件分配日期</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3!= 5'>永久催收员</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3!= 6'>逾期等级</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3!= 7'>案件状态</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3!= 8'>所属团队</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 8 && formIndex3!= 9'>所属组长</Option>
									<Option value="10" v-show='formIndex1 != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex1 != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex1 != 13 && formIndex2 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex1 != 14 && formIndex2 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.clientName" size="large"></Input>
								<DatePicker v-if="formIndex == 2" v-model="allselect.monthPayDateS" @on-change='dateChange($event,"")' format="yyyy-MM-dd"
								 type="daterange" :editable="false" placement='bottom' placeholder="请选择还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect.overdueDayEnd"></Input>
								<DatePicker v-if="formIndex == 4" @on-change='dateChange1($event,"")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex == 5" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect.foreverUlgeNo"></Input>
								<Select v-show="formIndex == 6" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 8" v-model="allselect.teamNo" @on-open-change="getTeamList($event)" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamId" :key="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect.headmanId"></Input>
								<Select v-show="formIndex ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex == 12" @on-open-change="getOrgNO" v-model="allselect.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex == 13" type="text" placeholder="请输入身份证号！" v-model="allselect.idCard" size="large"></Input>
								<Input v-show="formIndex == 14" type="text" placeholder="请输入电话号码！" v-model="allselect.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个条件选择框 -->
						<Form label-position="right" inline :model="allselect1">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange1($event, '1')" @on-open-change='ClearVal1($event, "1")'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3!= 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3!= 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3!= 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3!= 4'>案件分配日期</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3!= 5'>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3!= 6'>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3!= 7'>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3!= 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3!= 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex2 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex2 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect1.clientName" size="large"></Input>

								<DatePicker v-if="formIndex1 == 2" v-model="allselect1.monthPayDateS" @on-change='dateChange($event,"1")'
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>

								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect1.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex1 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect1.overdueDayEnd"></Input>
								<DatePicker v-if="formIndex1 == 4" @on-change='dateChange1($event,"1")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect1.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex1 == 5" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect1.foreverUlgeNo"></Input>
								<Select v-show="formIndex1 == 6" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect1.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect1.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 8" v-model="allselect1.teamNo" @on-open-change="getTeamList($event)" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamId" :key="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect1.headmanId"></Input>
								<Select v-show="formIndex1 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect1.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex1 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allselect1.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex1 == 12" @on-open-change="getOrgNO" v-model="allselect1.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 13" type="text" placeholder="请输入身份证号！" v-model="allselect1.idCard" size="large"></Input>
								<Input v-show="formIndex1 == 14" type="text" placeholder="请输入电话号码！" v-model="allselect1.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个条件选择框 -->
						<Form label-position="right" inline :model="allselect2">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange2($event, '2')" @on-open-change='ClearVal2($event, "2")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3!= 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3!= 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3!= 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3!= 4'>案件分配日期</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3!= 5'>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3!= 6'>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3!= 7'>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3!= 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3!= 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect2.clientName" size="large"></Input>

								<DatePicker v-if="formIndex2 == 2" v-model="allselect2.monthPayDateS" @on-change='dateChange($event,"2")'
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>

								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect2.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex2 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect2.overdueDayEnd"></Input>
								<DatePicker v-if="formIndex2 == 4" @on-change='dateChange1($event,"2")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect2.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex2 == 5" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect2.foreverUlgeNo"></Input>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect2.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect2.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 8" v-model="allselect2.teamNo" @on-open-change="getTeamList($event)" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamId" :key="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect2.headmanId"></Input>
								<Select v-show="formIndex2 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect2.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex2 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allselect2.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex2 == 12" @on-open-change="getOrgNO" v-model="allselect2.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 13" type="text" placeholder="请输入身份证号！" v-model="allselect2.idCard" size="large"></Input>
								<Input v-show="formIndex2 == 14" type="text" placeholder="请输入电话号码！" v-model="allselect2.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个条件选择框 -->
						<Form label-position="right" inline :model="allselect3">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange3($event, '3')" @on-open-change='ClearVal3($event, "3")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2!= 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2!= 2'>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2!= 3'>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2!= 4'>案件分配日期</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2!= 5'>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2!= 6'>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2!= 7'>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2!= 8'>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9'>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex2 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex2 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex2 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect3.clientName" size="large"></Input>
								<DatePicker v-if="formIndex3 == 2" v-model="allselect3.monthPayDateS" @on-change='dateChange($event,"3")'
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>

								<Input class='only' v-show="formIndex3 == 3" type="text" placeholder="逾期天数开始" size="large" v-model="allselect3.overdueDayStart"></Input>
								<Input class='only' v-show="formIndex3 == 3" type="text" placeholder="逾期天数结束" size="large" v-model="allselect3.overdueDayEnd"></Input>
								<DatePicker v-if="formIndex3 == 4" @on-change='dateChange1($event,"3")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect3.caseAllotTimeS"></DatePicker>
								<Input v-show="formIndex3 == 5" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect3.foreverUlgeNo"></Input>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect3.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect3.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 8" v-model="allselect3.teamNo" @on-open-change="getTeamList($event)" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamId" :key="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 9" type="text" placeholder="请输入所属组长" size="large" v-model="allselect3.headmanId"></Input>
								<Select v-show="formIndex3 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect3.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex3 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allselect3.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex3 == 12" @on-open-change="getOrgNO" v-model="allselect3.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 13" type="text" placeholder="请输入身份证号！" v-model="allselect3.idCard" size="large"></Input>
								<Input v-show="formIndex3 == 14" type="text" placeholder="请输入电话号码！" v-model="allselect3.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<Form label-position="right" inline>
							<!-- 按钮-->
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search">查询</Button>
								<Button @click="MyCase_Reset">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<!-- 数据导入 -->
<!-- 								<Dropdown trigger="click" @on-click='change_Import_type'>
									<Button type="primary">
										导入<Icon type="ios-arrow-down"></Icon>
									</Button>
									<DropdownMenu slot="list">
										<DropdownItem name="导入提前委外">导入提前委外</DropdownItem>
									</DropdownMenu>
								</Dropdown> -->
								<Button v-if="this.getAuth('02000010101')" @click="exportExcel">
									<Icon type="navicon-round"></Icon> 导出数据
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
				<Table height="396" border :stripe="true" :columns="columns" :data="datas" @on-row-click="rowIndex"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<span v-if="isShowWait">加载中</span>
				<Page :total="pageTotal" :show-total="showTotal" show-sizer @on-change="jump" @on-page-size-change="jumppage"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--选择文件-->
		<Modal v-model="ImportFileModal" draggable :title="ImportTitle">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" ref="uploadFile" type="file" 
							accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" multiple 	
						 />
					</FormItem></br>
					<span style="color:blue;text-decoration: underline;cursor:pointer;" @click="down_Template">下载导入模板</span>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="ImportFileModal = false">取消</Button>
				<Button type="primary" size="large" @click="Submit_File">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	//	import electricalDetail from './electricalDetail/electricalDetail'
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
				title: '我的电催案件',
				zhedie: "收起",
				value1: '1',
				showButton: false,
				isActive: true,
				placeholder: '请输入合同编号！', //placeholder
				contractNumber: '', //合同编号
				allselect: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseAllotTimeS: '', // 案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', // 逾期等级
					caseType: '', //案件状态
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					loanNamePhone:'',
					idCard:'',
				},
				allselect1: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseAllotTimeS: '', // 案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', // 逾期等级
					caseType: '', //案件状态
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					loanNamePhone:'',
					idCard:'',
				},
				allselect2: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseAllotTimeS: '', // 案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', // 逾期等级
					caseType: '', //案件状态
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					loanNamePhone:'',
					idCard:'',
				},
				allselect3: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseAllotTimeS: '', // 案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueGrade: '', // 逾期等级
					caseType: '', //案件状态
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					loanNamePhone:'',
					idCard:'',
				},
				LastDataSubmit: { // 最终传递到服务器的数据
					pageIndex: '1',
					pageSize: '10',
				},
				formIndex: '0', //第一个下拉框
				formIndex1: '1', //第二个下拉框
				formIndex2: '2', //第三个下拉框
				formIndex3: '4', //第四个下拉框
				distList: {
					mainBody: [], // 主体
					overdueGrade: [], // 逾期等级
					urgeCaseStatus: [], // 案件状态
					getTeamList: [], // 字典表的所有团队
					isSpecial: [], //是否特权包
					getOrgNO: [], //营业部
				},
				isShowWait: false, //是否显示加载中
				showTotal: true, //是否显示总条数
				cityList: [{
						value: '产品类型',
						label: '产品类型'
					},
					{
						value: '客户姓名',
						label: '客户姓名'
					},
					{
						value: '联系电话',
						label: '联系电话'
					},
					{
						value: '证件号码',
						label: '证件号码'
					}
				],
				columns: [{
					title: '进件营业部',
					minWidth: 100,
					key: 'orgNo'

				}, {
					title: '归属营业部',
					minWidth: 100,
					key: 'belongOrgNo'

				}, {
					title: '合同编号',
					minWidth: 180,
					key: 'loanContractNo'
				}, {
					title: '客户姓名',
					minWidth: 100,
					key: 'clientName'

				}, {
					title: '产品类型',
					minWidth: 120,
					key: 'productTypeName',
				}, {
					title: '还款日',
					minWidth: 110,
					key: 'monthPayDate',
				}, {
					title: '逾期等级',
					minWidth: 100,
					key: 'overdueGrade',
				}, {
					title: '逾期天数',
					minWidth: 90,
					key: 'overdueDay',
				}, {
					title: '逾期总额',
					minWidth: 100,
					key: 'overdueAmount',
				}, {
					title: '案件分配日期',
					minWidth: 120,
					key: 'caseAllotTime',
				}, {
					title: '案件状态',
					minWidth: 90,
					key: 'caseType',
				}, {
					title: '所属团队',
					minWidth: 100,
					key: 'teamNo',
				}, {
					title: '所属组长',
					minWidth: 120,
					key: 'headmanId',
				}, {
					title: '永久催收员',
					minWidth: 120,
					key: 'foreverUlgeNo',
				}, {
					title: '操作',
					fixed: 'right',
					minWidth: 100,
					key: 'number',
					render: (h, params) => {
						if (this.getAuth('02000010102')) {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									on: {
										click: () => {
											this.setStore('opreateBtn', {
												allINFO: params.row
											})
											this.$router.push('finishDetail')
										}
									}
								}, '详情')
							])
						}
					}
				}, ],
				datas: [],
				pageTotal: -1, //数据总条数
				// ----------- 导入文件模态框
				ImportFileModal: false, // 导入文件模态框
				ImportTitle: '', //导入提前委外 
				// importFile:{}, // 导入的文件
			}
		},
		methods: {
			init(pageIndex, pageSize) {
				const _ = this;
				_.LastDataSubmit.pageIndex = pageIndex || _.LastDataSubmit.pageIndex;
				_.LastDataSubmit.pageSize = pageSize || _.LastDataSubmit.pageSize;
				_.HttpAjax('post', 'getMyElectricUrgingCase', _.LastDataSubmit, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						_.datas = res.data.data.data;
					}
				});
			},
			//是否加载提示
			isNotice(){
				if(this.pageTotal == -1){
					this.isShowWait = true
					this.showTotal = false
				}else{
					this.isShowWait = false
					this.showTotal = true
				}
			},
			//数据总条数
			initCount(pageIndex, pageSize){

				this.LastDataSubmit.pageIndex = pageIndex || this.LastDataSubmit.pageIndex;
				this.LastDataSubmit.pageSize = pageSize || this.LastDataSubmit.pageSize;
				this.HttpAjax('post','getMyElectricUrgingCaseCount',this.LastDataSubmit,(res)=>{
					if(res && res.data.status == 200){
						this.pageTotal = res.data.data; //数据总条数
						this.isNotice()
					}
				},'count')
			},
			rowIndex(index) {
				this.contractNumber = index.loanContractNo; //传递合同编号到案件详情页
			},
			//页码改变的回调
			jump(pageIndex) {
				this.init(pageIndex)
			},
			//切换每页条数
			jumppage(pageSize) {
				this.init('1', pageSize)
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
									case 'mainBody': //主体
										console.log(res.data.data);
										_.distList.mainBody = res.data.data;
										break;
									case 'overdueGrade': // 逾期等级
										_.distList.overdueGrade = res.data.data;
										break;
									case 'urgeCaseStatus': // 案件状态
										_.distList.urgeCaseStatus = res.data.data;
										break;
									case 'isSpecial':
										_.distList.isSpecial = res.data.data; //是否特权包
										break;
								}
							}
						})
					}
				}
			},
			// 营业部
			getOrgNO(bol) {
				if (bol) {
					if (this.distList.getOrgNO.length == 0) {
						this.HttpAjax('post', 'getOrgNO', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == 200) {
								this.distList.getOrgNO = res.data.data
							}
						})
					}
				}
			},
			// 字典表的 团队查询
			getTeamList(bol) {
				if (bol) {
					if (this.distList.getTeamList.length == 0) {
						this.HttpAjax('post', 'getTeamList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								this.distList.getTeamList = res.data.data
							}
						})
					}
				}
			},
			//查询按钮点击事件
			search() {
				this.ClearObject(this.LastDataSubmit);
				for (let i in this.allselect) {
					if (this.allselect[i] != '') {
						this.$set(this.LastDataSubmit, i, this.allselect[i])
					}
				}
				for (let i in this.allselect1) {
					if (this.allselect1[i] != '') {
						this.$set(this.LastDataSubmit, i, this.allselect1[i])
					}
				}
				for (let i in this.allselect2) {
					if (this.allselect2[i] != '') {
						this.$set(this.LastDataSubmit, i, this.allselect2[i])
					}
				}
				for (let i in this.allselect3) {
					if (this.allselect3[i] != '') {
						this.$set(this.LastDataSubmit, i, this.allselect3[i])
					}
				}
				if (this.LastDataSubmit.overdueDayStart || this.LastDataSubmit.overdueDayEnd) { //判断有逾期天数字段
					if (this.LastDataSubmit.overdueDayStart != '' || this.LastDataSubmit.overdueDayEnd != '') { //逾期天数不为空
						const overdueDay = /^[0-9]*$/;
						if (!overdueDay.test(this.LastDataSubmit.overdueDayStart) || !overdueDay.test(this.LastDataSubmit.overdueDayEnd)) {
							this.$layer.msg('逾期天数必须为大于等于0的整数');
							return
						} else {
							if (parseInt(this.LastDataSubmit.overdueDayStart) > parseInt(this.LastDataSubmit.overdueDayEnd)) {
								this.$layer.msg('开始天数不能大于结束天数');
								return
							} else {
								this.init();
								this.initCount();
							}
						}
					} else {
						this.init();
						this.initCount();
					}
				} else {
					this.init();
					this.initCount();
				}
			},
			// 重置按钮点击事件
			MyCase_Reset() {
				this.ClearObject(this.allselect);
				this.ClearObject(this.allselect1);
				this.ClearObject(this.allselect2);
				this.ClearObject(this.allselect3);
				this.ClearObject(this.LastDataSubmit);
				this.init();
				this.initCount();
			},
			// 还款日格式转变
			dateChange(val, index) {
				index = index || '';
				if (index == '') {
					this.allselect.monthPayDateS = val
				} else {
					this['allselect' + index].monthPayDateS = val;
				}
			},
			// 案件分配日期格式转变
			dateChange1(val, index) {
				index = index || '';
				if (index == '') {
					this.allselect.caseAllotTimeS = val
				} else {
					this['allselect' + index].caseAllotTimeS = val;
				}
			},
			//刷新
			refresh() {
				this.init();
			},
			//下拉选择项变化时
			selectChange(val,index) {
				this.formIndex = val
				if(index == 0){
					this.formIndex = val
				}else {
					this['formIndex'+ index] =val
				}
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.allselect)
					}else {
						this.ClearObject(this['allselect'+ index])
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
			// 导出数据 按钮
			exportExcel() {
				this.HttpAjax('post', 'TestingDownloadMyCaseExcel', this.LastDataSubmit, (res) => {
					if (res && res.data.status == 200) {
						store.commit('UPDATE_LOADINGSTATE', false);
						this.HttpAjax('post', 'downloadMyCaseExcel', qs.stringify(this.LastDataSubmit), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							//二进制流文件下载
							this.downLoadFile(res.data, '我的电催案件.xlsx');
						}, 'download');
					}
				})
			},
			//选择导入数据类型
			change_Import_type(name) {
				this.ImportFileModal = true
				this.ImportTitle = name
				this.$refs['uploadFile'].value = '';
				this.importFile = {};
			},
			//选择导入的文件
			getUploadExcel(e) {
				const _ = this;
				var File = e.target.files;
				var size = File.size;
				var type = File.type;
				var formdata = new FormData();
				for (let i = 0; i < File.length; i++) {
					formdata.append('file', File[i]);
				}
				formdata.append('flag', _.flag);
				_.importFile = formdata;
			},
			// 下载模板
			down_Template(){
				var formdata = new FormData();
				formdata.append('id', 'ab70115c00ee4436b5737fcd89e9b083');
				this.HttpAjax('post', 'downloadExcelTemp2', formdata, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					// 二进制流文件下载
					this.downLoadFile(res.data, '批量委外导入模板.xlsx');
				}, 'download');
			},
			//确定按钮（提交选中的文件
			Submit_File(){
				this.HttpAjax('post', 'importWwExcel', this.importFile, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if (res && res.data.status == '200') {
						this.$Notice.success({
							title: '成功',
							desc: '导入成功！',
							duration: 2
						});
						this.ImportFileModal = false;
					}
				}, 'file');
			}
		},
		created() {
			this.init();
			this.initCount();
			this.isNotice();
		}
	}
</script>

<style scoped lang="less">
	.vl-notify-content {
		height: auto;
	}

	.ivu-icon:hover {
		cursor: pointer;
	}
</style>

<style lang="less">
	.collectCaseMange1 {
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
</style>
