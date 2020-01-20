<template>
	<div class="collectCaseMange">
		<!-- 公共Header类 -->
		<Collapse v-model="showMe" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">我已完成的案件</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个下拉选择框 -->
						<Form label-position="right" inline :model="allformData" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class='prepend' v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value='2' v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3 '>案件分配日期</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4 '>逾期天数</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7 '>所属团队</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属组长</Option>
									<Option value="9" v-if='tab != "getMyFinishCase"' v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9 '>案件状态</Option>
									<Option value="10" v-show='formIndex1 != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex1 != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex1 != 13 && formIndex2 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex1 != 14 && formIndex2 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allformData.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allformData.clientName" size="large"></Input>
								<DatePicker v-if="formIndex == 2" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="RepaymentDateChange($event,'')" placeholder="请选择还款日!" size="large" v-model="allformData.monthPayDateS"></DatePicker>
								<DatePicker v-if="formIndex == 3" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="caseAllotTimeChange($event,'')" placeholder="请选择案件分配日期!" size="large" v-model="allformData.caseAllotTimeS"></DatePicker>
								<Input class='only' v-show="formIndex == 4" type="text" placeholder="逾期天数开始！" v-model="allformData.overdueDayStart" size="large"></Input>
								<Input class='only' v-show="formIndex == 4" type="text" placeholder="逾期天数结束！" v-model="allformData.overdueDayEnd"
								 size="large"></Input>
								<Input v-show="formIndex == 5" type="text" placeholder="请输入永久催收员!" v-model="allformData.foreverUlgeNo" size="large"></Input>
								<Select v-show="formIndex == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="allformData.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex ==7" @on-open-change="getTeamList($event)" v-model="allformData.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex == 8" type="text" placeholder="请输入所属组长！" v-model="allformData.headmanId" size="large"></Input>
								<Select v-show="formIndex == 9" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allformData.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<!-- 是否特权包 -->
								<Select v-show="formIndex ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allformData.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allformData.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex == 12" @on-open-change="getOrgNO" v-model="allformData.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex == 13" type="text" placeholder="请输入身份证号！" v-model="allformData.idCard" size="large"></Input>
								<Input v-show="formIndex == 14" type="text" placeholder="请输入电话号码！" v-model="allformData.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个下拉选择框 -->
						<Form label-position="right" inline :model="allformData1" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class='prepend' v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value='2' v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3 '>案件分配日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4 '>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7 '>所属团队</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属组长</Option>
									<Option value="9" v-if='tab != "getMyFinishCase"' v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9 '>案件状态</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex2 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex2 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-if="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="allformData1.loanContractNo" size="large"></Input>
								<Input v-if="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="allformData1.clientName" size="large"></Input>
								<DatePicker v-if="formIndex1 == 2" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="RepaymentDateChange($event,'1')" placeholder="请选择还款日!" size="large" v-model="allformData1.monthPayDateS"></DatePicker>
								<DatePicker v-if="formIndex1 == 3" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="caseAllotTimeChange($event,'1')" placeholder="请选择案件分配日期!" size="large" v-model="allformData1.caseAllotTimeS"></DatePicker>
								<Input class='only' v-if="formIndex1 == 4" type="text" placeholder="逾期天数开始！" v-model="allformData1.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-if="formIndex1 == 4" type="text" placeholder="逾期天数结束！" v-model="allformData1.overdueDayEnd"
								 size="large"></Input>
								<Input v-if="formIndex1 == 5" type="text" placeholder="请输入永久催收员!" v-model="allformData1.foreverUlgeNo" size="large"></Input>
								<Select v-if="formIndex1 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="allformData1.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 ==7" @on-open-change="getTeamList($event)" v-model="allformData1.teamNo" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-if="formIndex1 == 8" type="text" placeholder="请输入所属组长！" v-model="allformData1.headmanId" size="large"></Input>
								<Select v-if="formIndex1 == 9" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allformData1.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allformData1.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex1 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allformData1.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex1 == 12" @on-open-change="getOrgNO" v-model="allformData1.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-if="formIndex1 == 13" type="text" placeholder="请输入身份证号！" v-model="allformData1.idCard" size="large"></Input>
								<Input v-if="formIndex1 == 14" type="text" placeholder="请输入电话号码！" v-model="allformData1.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个下拉选择框 -->
						<Form label-position="right" inline :model="allformData2" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class='prepend' v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value='2' v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3 '>案件分配日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4 '>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7 '>所属团队</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8 '>所属组长</Option>
									<Option value="9" v-if='tab != "getMyFinishCase"' v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9 '>案件状态</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex3 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex3 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="allformData2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allformData2.clientName" size="large"></Input>
								<DatePicker v-if="formIndex2 == 2" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="RepaymentDateChange($event,'2')" placeholder="请选择还款日!" size="large" v-model="allformData2.monthPayDateS"></DatePicker>
								<DatePicker v-if="formIndex2 == 3" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="caseAllotTimeChange($event,'2')" placeholder="请选择案件分配日期!" size="large" v-model="allformData2.caseAllotTimeS"></DatePicker>
								<Input class='only' v-show="formIndex2 == 4" type="text" placeholder="逾期天数开始！" v-model="allformData2.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex2 == 4" type="text" placeholder="逾期天数结束！" v-model="allformData2.overdueDayEnd"
								 size="large"></Input>
								<Input v-show="formIndex2 == 5" type="text" placeholder="请输入永久催收员!" v-model="allformData2.foreverUlgeNo" size="large"></Input>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="allformData2.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 ==7" @on-open-change="getTeamList($event)" v-model="allformData2.teamNo"
								 placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 8" type="text" placeholder="请输入所属组长！" v-model="allformData2.headmanId" size="large"></Input>
								<Select v-show="formIndex2 == 9" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allformData2.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 10" @on-open-change="getListDict($event,'isSpecial')" v-model="allformData2.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex2 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allformData2.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex2 == 12" @on-open-change="getOrgNO" v-model="allformData2.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 13" type="text" placeholder="请输入身份证号！" v-model="allformData2.idCard" size="large"></Input>
								<Input v-show="formIndex2 == 14" type="text" placeholder="请输入电话号码！" v-model="allformData2.loanNamePhone" size="large"></Input>

							</FormItem>
						</Form>
						<!-- 第3个下拉选择框 -->
						<Form label-position="right" inline :model="allformData3" :rules="ruleValidate" ref="allselect">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class='prepend' v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1 '>客户姓名</Option>
									<Option value='2' v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3 '>案件分配日期</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4 '>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7 '>所属团队</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8 '>所属组长</Option>
									<Option value="9" v-if='tab != "getMyFinishCase"' v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9 '>案件状态</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex2 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex2 != 13 '>身份证号</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex2 != 14 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="allformData3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allformData3.clientName" size="large"></Input>
								<DatePicker v-if="formIndex == 2" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="RepaymentDateChange($event,'3')" placeholder="请选择还款日!" size="large" v-model="allformData3.monthPayDateS"></DatePicker>
								<DatePicker v-if="formIndex3 == 3" type="daterange" placement='bottom' :editable="false" format="yyyy-MM-dd"
								 @on-change="caseAllotTimeChange($event,'3')" placeholder="请选择案件分配日期!" size="large" v-model="allformData3.caseAllotTimeS"></DatePicker>
								<Input class='only' v-show="formIndex3 == 4" type="text" placeholder="逾期天数开始！" v-model="allformData3.overdueDayStart"
								 size="large"></Input>
								<Input class='only' v-show="formIndex3 == 4" type="text" placeholder="逾期天数结束！" v-model="allformData3.overdueDayEnd"
								 size="large"></Input>
								<Input v-show="formIndex3 == 5" type="text" placeholder="请输入永久催收员!" v-model="allformData3.foreverUlgeNo" size="large"></Input>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="allformData3.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 ==7" @on-open-change="getTeamList($event)" v-model="allformData3.teamNo"
								 placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 8" type="text" placeholder="请输入所属组长！" v-model="allformData3.headmanId" size="large"></Input>
								<Select v-show="formIndex3 == 9" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allformData3.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="allformData3.isSpecial" placeholder="请选择是否特权包"
								class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex3 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="allformData3.mainBody" placeholder="请选择主体"
								class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex3 == 12" @on-open-change="getOrgNO" v-model="allformData3.belongOrgNo" placeholder="请选择营业部"
								class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex13 == 0" type="text" placeholder="请输入身份证号！" v-model="allformData3.idCard" size="large"></Input>
								<Input v-show="formIndex14 == 1" type="text" placeholder="请输入电话号码！" v-model="allformData3.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search">查询</Button>
								<Button @click="reset"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button v-if="this.getAuth('02000010201')" @click="exportExcel"><Icon type="navicon-round"></Icon>导出数据</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="changeCaseType">
				<TabPane label="全部" name="AllgetMyFinishCase">
					<div v-show="tab == 'AllgetMyFinishCase' ? true : false ">
						<div class="table-item">
							<Table height="396" border :stripe="true" :columns="AllTitle" :data="AllData"></Table>
						</div>
						<!-- 公共page分页类 -->
						<div class="page-item">
							<span v-if="isShowWait">加载中</span>
							<Page placement="top" :total="AlltotallPages" :show-total="showTotal" show-sizer @on-change="AllChangePages" @on-page-size-change="AllChangePagesSize"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click='AllCaseRefresh' />
						</div>
					</div>
				</TabPane>
				<TabPane label="已出催" name="getMyFinishCase">
					<div v-show="tab == 'getMyFinishCase' ? true : false ">
						<div class="table-item">
							<Table height="396" border :stripe="true" :columns="AllTitle" :data="CCData"></Table>
						</div>
						<div class="page-item">
							<span v-if="isShowWaitCc">加载中</span>
							<Page placement="top" :total="CctotallPages" :show-total='showTotalCc' show-sizer @on-change="CcChangePages" @on-page-size-change="CcChangePagesSize"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click='CcCaseRefresh' />
						</div>
					</div>
				</TabPane>
				<TabPane label="已结清" name="getSettleCase">
					<div v-show="tab == 'getSettleCase' ? true : false ">
						<div class="table-item">
							<Table height="396" border :stripe="true" :columns="JqTitle" :data="JqData"></Table>
						</div>
						<div class="page-item">
							<span v-if="isShowWaitJq">加载中</span>
							<Page placement="top" :total="JqTotallPages" :show-total='showTotalJq' show-sizer @on-change="JqChangePages" @on-page-size-change="JqChangePagesSize"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click='JqCaseRefresh' />
						</div>
					</div>
				</TabPane>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default {
		data() {
			return {
				showBlock: 'AllgetMyFinishCase', //默认筛选的版块
				zhedie: "收起",
				showMe: '1', //默认展开的
				tab: 'AllgetMyFinishCase', //默认选中的Tab模块
				isActive: true,
				formIndex: '0', //第0个下拉选择框默认选中
				formIndex1: '1', //第1个下拉选择框默认选中
				formIndex2: '2', //第2个下拉选择框默认选中
				formIndex3: '3', //第3个下拉选择框默认选中
				//第0个下拉框的字段
				allformData: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					monthPayDateS: "", //还款日
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					caseType: '', //案件状态
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					loanNamePhone:'', // 电话号码
					idCard:'', //身份证号
				},
				//第1个下拉框的字段
				allformData1: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					monthPayDateS: "", //还款日
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					caseType: '', //案件状态
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					loanNamePhone:'', // 电话号码
					idCard:'', //身份证号
				},
				//第2个下拉框的字段
				allformData2: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					monthPayDateS: "", //还款日
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					caseType: '', //案件状态
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					loanNamePhone:'', // 电话号码
					idCard:'', //身份证号
				},
				//第3个下拉框的字段
				allformData3: {
					loanContractNo: '', //合同号
					clientName: '', //客户姓名
					monthPayDateS: "", //还款日
					caseAllotTimeS: '', //案件分配日期
					foreverUlgeNo: '', //永久催收员
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					overdueGrade: '', //逾期等级
					teamNo: '', //所属团队
					headmanId: '', //所属组长
					caseType: '', //案件状态
					isSpecial:'', //是否特权包
					mainBody:'', //主体
					belongOrgNo:'', //营业部
					loanNamePhone:'', // 电话号码
					idCard:'', //身份证号
				},
				// 提交给服务器的
				LastSubmitData: {
					pageIndex: 1,
					pageSize: 10,
				},
				//全部，已模块的筛选字段
				AlltotallPages: -1, //总页数
				CctotallPages: -1, //出催总页数
				AllData: [], //全部模块数据
				CCData: [], //出催数据
				AllTitle: [{ //已结清和全部数据字段
					title: '进件营业部',
					minWidth: 100,
					key: 'orgNo'
				}, {
					title: '归属营业部',
					minWidth: 100,
					key: 'belongOrgNo'
				}, {
					title: '合同编号',
					minWidth: 175,
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
					minWidth: 150,
					key: 'number',
					fixed: 'right',
					render: (h, params) => {
						if(this.getAuth('02000010202')){
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									on: {
										click: () => {
											this.setStore('opreateBtn', {
												hiddenBtn: 'private',
												showBtn: 'private',
												allINFO: params.row
											})
											this.$router.push('finishDetail')
											//this.$router.push({path:'finishDetail',query: { showBtn: 'private' ,paramsRow:paramsRow}})
											//this.$router.push({path:'finishDetail',query: {contractNumber:contractNumber}})
										}
									}
								}, '详情')
							])
						}
					}
				}],
				// ------------已出催
				JqTotallPages: -1, //已结清总页数
				JqData: [], //已结清数据
				JqTitle: [{
					title: '进件营业部',
					minWidth: 100,
					key: 'orgNo'

				}, {
					title: '归属营业部',
					minWidth: 100,
					key: 'belongOrgNo'

				}, {
					title: '合同编号',
					minWidth: 120,
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
					minWidth: 170,
					key: 'monthPayDate',
				}, {
					title: '逾期等级',
					minWidth: 100,
					key: 'overdueGrade',
				}, {
					title: '逾期天数',
					minWidth: 150,
					key: 'overdueDay',
				}, {
					title: '逾期总额',
					minWidth: 100,
					key: 'overdueAmount',
				}, {
					title: '案件分配日期',
					minWidth: 180,
					key: 'caseAllotTime',
				}, {
					title: '案件状态',
					minWidth: 140,
					key: 'caseType',
				}, {
					title: '所属团队',
					minWidth: 100,
					key: 'teamNo',
				}, {
					title: '永久催收员',
					minWidth: 120,
					key: 'foreverUlgeNo',
				}, {
					title: '客户结清时间',
					minWidth: 120,
					key: 'endPayDate'
				}, {
					title: '操作',
					minWidth: 190,
					key: 'number',
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
									disabled: (params.row.auditStatus == 2 || params.row.auditStatus == 3) ? true : false,
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.settleProofProveApply(params.row)
									}
								}
							}, '申请'),
							h('Button', {
								props: {
									size: 'small',
									type: 'info'
								},
								on: {
									click: () => {
										this.setStore('opreateBtn', {
											showBtn: 'private',
											allINFO: params.row
										})
										this.$router.push('finishDetail')
									}
								}
							}, '详情')
						])
					}
				}], //已结清字段
				distList: {
					OverdueGrade: [], //逾期等级
					getTeamList: [], // 字典表团队查询
					urgeCaseStatus: [], // 案件状态
					isSpecial:[], // 是否特权包
					getOrgNO: [], // 营业部
					mainBody:[], //主体
				},
				isShowWait: false, //是否显示加载中
				showTotal: true, //是否显示总条数
				isShowWaitCc: false, //是否显示加载中
				showTotalCc: true, //是否显示总条数
				isShowWaitJq: false, //是否显示加载中
				showTotalJq: true, //是否显示总条数
				ruleValidate: {},
			}
		},
		methods: {
			//是否加载提示
			isNotice(){
				if(this.AlltotallPages == -1){
					this.isShowWait = true
					this.showTotal = false
				}else{
					this.isShowWait = false
					this.showTotal = true
				}
				if(this.CctotallPages == -1){
					this.isShowWaitCc = true
					this.showTotalCc = false
				}else{
					this.isShowWaitCc = false
					this.showTotalCc = true
				}
				if(this.JqTotallPages == -1){
					this.isShowWaitJq = true
					this.showTotalCcJq = false
				}else{
					this.isShowWaitJq = false
					this.showTotalCcJq = true
				}
			},
			// 页面加载查询（全部和已结清案件
			init(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post', 'getMyFinishCase', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.AllData = res.data.data.data
					}
				});
			},
			// 全部数据（总条数
			initCount(pageIndex, pageSize){
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post','getMyFinishCaseCount',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.AlltotallPages = res.data.data // 总页数
						this.isNotice();
					}
				},'count')
			},
			//已出催
			getCaseType(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				let datas = JSON.parse(JSON.stringify(this.LastSubmitData));
				datas.caseType = '7';
				this.HttpAjax('post', 'getMyFinishCase', datas, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.CCData = res.data.data.data
					}
				});
			},
			//已出催(总条数)
			getCaseTypeCount(pageIndex, pageSize){
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				let datas = JSON.parse(JSON.stringify(this.LastSubmitData));
				datas.caseType = '7';
				this.HttpAjax('post', 'getMyFinishCaseCount', datas, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.CctotallPages = res.data.data // 总页数
						this.isNotice();
					}
				},'count');
			},
			// 已结清案件
			getSettleCase(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post', 'getSettleCase', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.JqData = res.data.data.data
					}
				})
			},
			//已结清案件（总条数
			getSettleCaseCount(pageIndex, pageSize){
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post','getSettleCaseCount',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.JqTotallPages = res.data.data // 已结清总页数 
						this.isNotice();
					}
				},'count')
			},
			//Tab点击时间（切换案件类型）
			changeCaseType(name) {
				this.tab = name;
				this.showBlock = name;
				this.LastSubmitData.pageIndex = 1;
				this.LastSubmitData.pageSize = 10;
				this.ClearObject(this.allformData)
				this.ClearObject(this.allformData1)
				this.ClearObject(this.allformData2)
				this.ClearObject(this.allformData3)
				this.ClearObject(this.LastSubmitData)
				if (name == 'AllgetMyFinishCase') {
					if (this.AllData.length == 0) {
						this.init();
						this.initCount();
					}
				} else if (name == 'getMyFinishCase') {
					if (this.CCData.length == 0) {
						this.getCaseType();
						this.getCaseTypeCount();
					}
				} else {
					if (this.JqData.length == 0) {
						this.getSettleCase();
						this.getSettleCaseCount();
					}
				}
			},
			//查询按钮点击事件(全部，已出催)
			changeWho() {
				if (this.showBlock == 'AllgetMyFinishCase') {
					this.init();
					this.initCount();
				} else if (this.showBlock == 'getMyFinishCase') {
					this.getCaseType();
					this.getCaseTypeCount();
				} else {
					this.getSettleCase();
					this.getSettleCaseCount();
				}
			},
			search() {
				this.ClearObject(this.LastSubmitData);
				for (let i in this.allformData) { //置空，除了pageIndex和pageSize
					if (this.allformData[i] != '') {
						this.$set(this.LastSubmitData, i, this.allformData[i])
					}
				}
				for (let i in this.allformData1) { //置空，除了pageIndex和pageSize
					if (this.allformData1[i] != '') {
						this.$set(this.LastSubmitData, i, this.allformData1[i])
					}
				}
				for (let i in this.allformData2) { //置空，除了pageIndex和pageSize
					if (this.allformData2[i] != '') {
						this.$set(this.LastSubmitData, i, this.allformData2[i])
					}
				}
				for (let i in this.allformData3) { //置空，除了pageIndex和pageSize		
					if (this.allformData3[i] != '') {
						this.$set(this.LastSubmitData, i, this.allformData3[i])
					}
				}
				if (this.LastSubmitData.overdueDayStart || this.LastSubmitData.overdueDayEnd) { //判断有逾期天数字段
					if (this.LastSubmitData.overdueDayStart != '' || this.LastSubmitData.overdueDayEnd != '') {
						const overdueDay = /^[0-9]*$/;
						if (!overdueDay.test(this.LastSubmitData.overdueDayStart) || !overdueDay.test(this.LastSubmitData.overdueDayEnd)) {
							this.$layer.msg('逾期天数必须为大于等于0的整数');
							return
						} else {
							if (parseInt(this.LastSubmitData.overdueDayStart) > parseInt(this.LastSubmitData.overdueDayEnd)) {
								this.$layer.msg('开始天数不能大于结束天数');
								return
							} else {
								this.changeWho()
							}
						}
					} else {
						this.changeWho();
					}
				} else {
					this.changeWho();
				}
			},

			//重置按钮点击事件
			reset() {
				this.ClearObject(this.allformData)
				this.ClearObject(this.allformData1)
				this.ClearObject(this.allformData2)
				this.ClearObject(this.allformData3)
				this.ClearObject(this.LastSubmitData)
				if (this.showBlock == 'AllgetMyFinishCase') {
					this.init()
					this.initCount()
				} else if (this.showBlock == "getMyFinishCase") {
					this.getCaseType();
					this.getCaseTypeCount();
				} else {
					this.getSettleCase();
					this.getSettleCaseCount();
				}
			},

			//每页数据大小
			AllChangePagesSize(PageSize) { // 全部
				this.LastSubmitData.pageIndex = 1;
				this.init('', PageSize)
			},
			CcChangePagesSize(PageSize) { // 已出催
				this.LastSubmitData.pageIndex = 1;
				this.getCaseType('', PageSize)
			},
			JqChangePagesSize(pageSize) { //已结清
				this.LastSubmitData.pageIndex = 1;
				this.getSettleCase('',pageSize)
			},
			//页码切换 
			AllChangePages(pageIndex) { // 全部
				this.init(pageIndex);
			},
			CcChangePages(pageIndex) { // 已出催
				this.getCaseType(pageIndex)
			},
			JqChangePages(pageIndex) { // 已结清
				this.getSettleCase(pageIndex)
			},
			// 刷新 (，已出催)
			AllCaseRefresh() { // 全部
				this.init()
			},
			CcCaseRefresh() { // 出催
				this.getCaseType()
			},
			JqCaseRefresh() { // 已结清
				this.getSettleCase();
			},
			//下拉框选中值改变时
			selectChange(val,index) {
				if(index == 0){
					this.formIndex = val;
				}else{
					this['formIndex'+index] = val;
				}
			},
			//下拉框 展开 （清空数组）
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.allformData)
					}else{
						this.ClearObject(this['allformData'+index])
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
			//折叠、展开
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
			//字典表字段查询
			getListDict(bol, label) {
				if (bol) {
					if (this.distList[label].length == 0) {
						this.HttpAjax('post', 'distList', {
							label: label
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								switch (label) {
									case 'OverdueGrade': //逾期等级
										this.distList.OverdueGrade = res.data.data;
										break;
									case 'urgeCaseStatus': //案件状态
										this.distList.urgeCaseStatus = res.data.data;
										break;
									case 'isSpecial':
										this.distList.isSpecial = res.data.data; //是否特权包
										break;
									case 'mainBody':
										this.distList.mainBody = res.data.data;
										break;
								}
							}
						});
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
			//还款日转换
			RepaymentDateChange(date,index) {
				index = index || '';
				if(index == ''){
					this.allformData.monthPayDateS = date
				}else{
					this['allformData'+index].monthPayDateS = date;
				}
			},
			//案件分配日期
			caseAllotTimeChange(date,index) {
				index = index || '';
				if(index == ''){
					this.allformData.caseAllotTimeS = date
				}else{
					this['allformData'+index].caseAllotTimeS = date;
				}
			},
			// 申请按钮点击事件
			settleProofProveApply(row) {
				this.HttpAjax('post', 'settleProofProveApply', {
					'loanContractNo': row.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						if (res && res.data.status === 200) {
							this.$Notice.success({
								title: '成功',
								desc: '申请成功',
								duration: 2
							})
						}
						this.init();
					}
				})
			},
			// 导出数据 按钮
			exportExcel() {
				if(this.tab == 'AllgetMyFinishCase'){ // 全部
					this.HttpAjax('post','TestingDownloadMyFinishCaseExcel',this.LastSubmitData,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status ==200){// qs.stringify(
							this.HttpAjax('post','downloadMyFinishCaseExcel',qs.stringify(this.LastSubmitData),(res)=>{
								store.commit('UPDATE_LOADINGSTATE', false);
								this.downLoadFile(res.data, '我已完成的案件.xlsx');
							},'download')
						}
					})
				}else if(this.tab == 'getMyFinishCase'){ //出催
					let datas = JSON.parse(JSON.stringify(this.LastSubmitData));
					datas.caseType = '7';
					this.HttpAjax('post','TestingDownloadMyFinishCaseExcel',this.LastSubmitData,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status ==200){
							this.HttpAjax('post','downloadMyFinishCaseExcel',qs.stringify(datas),(res)=>{
								store.commit('UPDATE_LOADINGSTATE', false);
								this.downLoadFile(res.data, '出催案件.xlsx');
							},'download')
						}
					})
				}else {
					this.HttpAjax('post','TestingDownloadSettleCaseExcel',this.LastSubmitData,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status ==200){// 结清
							this.HttpAjax('post','downloadSettleCaseExcel',qs.stringify(this.LastSubmitData),(res)=>{
								store.commit('UPDATE_LOADINGSTATE', false);
								this.downLoadFile(res.data, '结清案件.xlsx');
							},'download')
						}
					})
				}
			}
		},
		created() {
			this.init();
			this.initCount();
			this.isNotice();
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
</style>
