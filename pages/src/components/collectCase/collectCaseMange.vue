<template>
	<div class="collectCaseMange">
		<!-- 公共Header类 -->
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
						<!-- 第0个条件选择框 -->
						<Form label-position="right" inline :model="formData" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange" @on-open-change='ClearVal'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3 '>逾期天数</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4 '>案件分配时间</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7 '>案件状态</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属团队</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9 '>所属组长</Option>
									<Option value="10" v-show='formIndex1 != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex1 != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex1 != 13 && formIndex2 != 13 && formIndex3 != 13 '>产品类型</Option>
									<Option value="14" v-show='formIndex1 != 14 && formIndex2 != 14 && formIndex3 != 14 '>分中心</Option>
									<Option value="15" v-show='formIndex1 != 15 && formIndex2 != 15 && formIndex3 != 15 '>身份证号</Option>
									<Option value="16" v-show='formIndex1 != 16 && formIndex2 != 16 && formIndex3 != 16 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.LoanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="formData.clientName" size="large"></Input>
								<DatePicker v-if="formIndex == 2" @on-change='dateChange($event,"")' v-model="formData.monthPayDateS" format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex == 3" v-model="formData.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex == 3" v-model="formData.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex == 4" @on-change='dateChange1($event,"")' v-model="formData.caseAllotTimeS" format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请选择案件分配日期！" size="large"></DatePicker>
								<Input v-show="formIndex == 5" v-model="formData.foreverUrgeNo" type="text" placeholder="请输入永久催收员！" size="large"></Input>
								<Select v-show="formIndex == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="formData.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="formData.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" v-if='item.type != 6' :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<!-- 所属团队 -->
								<Select v-show="formIndex ==8" @on-open-change="getTeamList($event)" v-model="formData.urgeName" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex == 9" v-model="formData.urgeLeader" type="text" placeholder="请输入所属组长！" size="large"></Input>
								<Select v-show="formIndex ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="formData.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex == 11" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex == 12" @on-open-change="getOrgNO" v-model="formData.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<!-- 产品类型 -->
								<Select filterable v-show="formIndex == 13" @on-open-change="getProductTypeList" v-model="formData.productType"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<!-- 分中心 centerName-->
								<Select filterable v-show="formIndex == 14" @on-open-change="getBrachId" v-model="formData.centerName"
								placeholder="请选择分中心" class="twoSelect" size="large">
									<Option v-for="item in distList.centerName" :key="item.idKey" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex == 15" type="text" placeholder="请输入身份证号" v-model="formData.certNo" size="large"></Input>
								<Input v-show="formIndex == 16" type="text" placeholder="请输入电话号码！" v-model="formData.contactPhoneNo" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个条件选择框 -->
						<Form label-position="right" inline :model="formData1" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange1" @on-open-change='ClearVal1'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3 '>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4 '>案件分配时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7 '>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9 '>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex2 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex2 != 13 && formIndex3 != 13 '>产品类型</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex2 != 14 && formIndex3 != 14 '>分中心</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex2 != 15 && formIndex3 != 15 '>身份证号</Option>
									<Option value="16" v-show='formIndex != 16 && formIndex2 != 16 && formIndex3 != 16 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.LoanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData1.clientName" size="large"></Input>
								<DatePicker v-if="formIndex1 == 2" @on-change='dateChange($event,"1")' v-model="formData1.monthPayDateS" format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex1 == 3" v-model="formData1.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex1 == 3" v-model="formData1.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex1 == 4" @on-change='dateChange1($event,"1")' v-model="formData1.caseAllotTimeS"
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择案件分配日期！" size="large"></DatePicker>
								<Input v-show="formIndex1 == 5" v-model="formData1.foreverUrgeNo" type="text" placeholder="请输入永久催收员！" size="large"></Input>
								<Select v-show="formIndex1 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="formData1.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="formData1.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" v-if='item.type != 6' :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<!-- 所属团队 -->
								<Select v-show="formIndex1 ==8" @on-open-change="getTeamList($event)" v-model="formData1.urgeName" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 9" v-model="formData1.urgeLeader" type="text" placeholder="请输入所属组长！" size="large"></Input>
								<Select v-show="formIndex1 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="formData1.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex1 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="formData1.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex1 == 12" @on-open-change="getOrgNO" v-model="formData1.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<!-- 产品类型 -->
								<Select filterable v-show="formIndex1 == 13" @on-open-change="getProductTypeList" v-model="formData1.productType"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<!-- 分中心 centerName-->
								<Select filterable v-show="formIndex1 == 14" @on-open-change="getBrachId" v-model="formData1.centerName"
								placeholder="请选择分中心" class="twoSelect" size="large">
									<Option v-for="item in distList.centerName" :key="item.idKey" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex1 == 15" type="text" placeholder="请输入身份证号" v-model="formData1.certNo" size="large"></Input>
								<Input v-show="formIndex1 == 16" type="text" placeholder="请输入电话号码！" v-model="formData1.contactPhoneNo" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个条件选择框 -->
						<Form label-position="right" inline :model="formData2" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange2" @on-open-change='ClearVal2'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1 '>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3 '>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4 '>案件分配时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7 '>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8 '>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9 '>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex3 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex3 != 13 '>产品类型</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex3 != 14 '>分中心</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex1 != 15 && formIndex3 != 15 '>身份证号</Option>
									<Option value="16" v-show='formIndex != 16 && formIndex1 != 16 && formIndex3 != 16 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.LoanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData2.clientName" size="large"></Input>
								<DatePicker v-if="formIndex2 == 2" @on-change='dateChange($event,"2")' v-model="formData2.monthPayDateS" format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex2 == 3" v-model="formData2.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex2 == 3" v-model="formData2.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex2 == 4" @on-change='dateChange1($event,"2")' v-model="formData2.caseAllotTimeS"
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择案件分配日期！" size="large"></DatePicker>
								<Input v-show="formIndex2 == 5" v-model="formData2.foreverUrgeNo" type="text" placeholder="请输入永久催收员！" size="large"></Input>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="formData2.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="formData2.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" v-if='item.type != 6' :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<!-- 所属团队 -->
								<Select v-show="formIndex2 ==8" @on-open-change="getTeamList($event)" v-model="formData2.urgeName" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 9" v-model="formData2.urgeLeader" type="text" placeholder="请输入所属组长！" size="large"></Input>
								<Select v-show="formIndex2 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="formData2.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex2 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="formData2.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex2 == 12" @on-open-change="getOrgNO" v-model="formData2.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<!-- 产品类型 -->
								<Select filterable v-show="formIndex2 == 13" @on-open-change="getProductTypeList" v-model="formData2.productType"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<!-- 分中心 centerName-->
								<Select filterable v-show="formIndex2 == 14" @on-open-change="getBrachId" v-model="formData2.centerName"
								placeholder="请选择分中心" class="twoSelect" size="large">
									<Option v-for="item in distList.centerName" :key="item.idKey" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex2 == 15" type="text" placeholder="请输入身份证号" v-model="formData2.certNo" size="large"></Input>
								<Input v-show="formIndex2 == 16" type="text" placeholder="请输入电话号码！" v-model="formData2.contactPhoneNo" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个条件选择框 -->
						<Form label-position="right" inline :model="formData3" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange3" @on-open-change='ClearVal3'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1 '>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2 '>还款日</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3 '>逾期天数</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4 '>案件分配时间</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5 '>永久催收员</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6 '>逾期等级</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7 '>案件状态</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8 '>所属团队</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9 '>所属组长</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10 '>是否特权包</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11 '>主体</Option>
									<Option value="12" v-show='formIndex != 12 && formIndex1 != 12 && formIndex2 != 12 '>营业部</Option>
									<Option value="13" v-show='formIndex != 13 && formIndex1 != 13 && formIndex2 != 13 '>产品类型</Option>
									<Option value="14" v-show='formIndex != 14 && formIndex1 != 14 && formIndex2 != 14 '>分中心</Option>
									<Option value="15" v-show='formIndex != 15 && formIndex1 != 15 && formIndex2 != 15 '>身份证号</Option>
									<Option value="16" v-show='formIndex != 16 && formIndex1 != 16 && formIndex2 != 16 '>电话号码</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.LoanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData3.clientName" size="large"></Input>
								<DatePicker v-if="formIndex3 == 2" @on-change='dateChange($event,"3")' v-model="formData3.monthPayDateS" format="yyyy-MM-dd"
								 type="daterange" placement='bottom' :editable="false" placeholder="请选择还款日！" size="large"></DatePicker>
								<Input class='only' v-show="formIndex3 == 3" v-model="formData3.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex3 == 3" v-model="formData3.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex3 == 4" @on-change='dateChange1($event,"3")' v-model="formData3.caseAllotTimeS"
								 format="yyyy-MM-dd" type="daterange" placement='bottom' :editable="false" placeholder="请选择案件分配日期！" size="large"></DatePicker>
								<Input v-show="formIndex3 == 5" v-model="formData3.foreverUrgeNo" type="text" placeholder="请输入永久催收员！" size="large"></Input>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'OverdueGrade')" v-model="formData3.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.OverdueGrade" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 7" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="formData3.caseType"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option v-for="(item,index) in distList.urgeCaseStatus" v-if='item.type != 6' :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<!-- 所属团队 -->
								<Select v-show="formIndex3 ==8" @on-open-change="getTeamList($event)" v-model="formData3.urgeName" placeholder="请选择所属团队"
								 class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :key="item.urgeTeamId" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 9" v-model="formData3.urgeLeader" type="text" placeholder="请输入所属组长！" size="large"></Input>
								<Select v-show="formIndex3 ==10" @on-open-change="getListDict($event,'isSpecial')" v-model="formData3.isSpecial"
								 placeholder="请选择是否特权包" class="twoSelect" size="large">
									<Option v-for="item in distList.isSpecial" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!-- 主体 -->
								<Select v-show="formIndex3 == 11" @on-open-change="getListDict($event,'mainBody')" v-model="formData3.mainBody"
								 placeholder="请选择主体" class="twoSelect" size="large">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type">{{item.value}}</Option>
								</Select>
								<!--营业部 getOrgNO -->
								<Select filterable v-show="formIndex3 == 12" @on-open-change="getOrgNO" v-model="formData3.belongOrgNo"
								 placeholder="请选择营业部" class="twoSelect" size="large">
									<Option v-for="item in distList.getOrgNO" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<!-- 产品类型 -->
								<Select filterable v-show="formIndex3 == 13" @on-open-change="getProductTypeList" v-model="formData3.productType"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<!-- 分中心 centerName-->
								<Select filterable v-show="formIndex3 == 14" @on-open-change="getBrachId" v-model="formData3.centerName"
								placeholder="请选择分中心" class="twoSelect" size="large">
									<Option v-for="item in distList.centerName" :key="item.idKey" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Input v-show="formIndex3 == 15" type="text" placeholder="请输入身份证号" v-model="formData3.certNo" size="large"></Input>
								<Input v-show="formIndex3 == 16" type="text" placeholder="请输入电话号码！" v-model="formData3.contactPhoneNo" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click.prevent="search" :disabled="this.forecastCaseShow">查询</Button>
								<Button @click="restData()" :disabled="this.forecastCaseShow">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="getAuth('01000010101')" @click="exportExcel" :disabled="this.forecastCaseShow || this.exportOut">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
								<Button @click='CxButton'>撤销预测外呼</Button>
								<Dropdown trigger="click" @on-click='change_Import_type'>
									<Button type="primary">
										导入<Icon type="ios-arrow-down"></Icon>
									</Button>
									<DropdownMenu slot="list">
										<DropdownItem name="导入提前委外">导入提前委外</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="tabChange">
				<TabPane label="当前案件任务" name="tab1">
					<div v-show="tab == 'tab1' ? true : false ">
						<!-- 公共table类-->
						<div class="table-item">
							<Table height="596" border :stripe="true" :columns="columns" :data="datas" @on-selection-change='TableChange'></Table>
						</div>
						<!-- 公共page分页类 -->
						<div class="page-item">
							<span v-if="isShowWait">加载中</span>
							<Page placement="top" :total="totallPages" :show-total="showTotal" show-sizer @on-change="changePages"
							 @on-page-size-change="changePagesTotall"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click="refresh('current')" />
						</div>
					</div>
				</TabPane>
				<TabPane label="历史案件" name="tab2">
					<div v-show="tab == 'tab2' ? true : false ">
						<!-- 公共table类-->
						<div class="table-item">
							<Table height="396" border :stripe="true" :columns="Hcolumns" :data="Hdatas"></Table>
						</div>
						<!-- 公共page分页类 -->
						<div class="page-item">
							<Page placement="top" :total="totallPages1" show-total show-sizer @on-change="changePages1" @on-page-size-change="changePagesTotall1"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click="refresh('history')" />
						</div>
					</div>
				</TabPane>
			</Tabs>
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
	export default {
		data() {
			return {
				title: '催收案件管理',
				rotate: true,
				tab: 'tab1', //默认显示的模块
				forecastCaseShow: false,
				exportOut: false,
				loading: true,
				value1: '1',
				width: {
					'width': '350px'
				},
				CxDatas: [], //撤销预测外呼
				showTotal: true, //是否显示总数
				isShowWait: false, //是否显示加载中
				totallPages: 0,
				totallPages1: 0,
				indexData: '',
				indexSelect: '1',
				formIndex: '0', //第0个下拉选择框
				formIndex1: '1', //第1个下拉选择框
				formIndex2: '2', //第2个下拉选择框
				formIndex3: '3', //第3个下拉选择框
				placeholder: "请输入合同编号！",
				// 筛选字段
				formData: {
					LoanContractNo: '', //证件号码
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					foreverUrgeNo: '', //永久催收员
					caseAllotTimeS: '', //案件分配日期
					overdueGrade: '', //逾期等级
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					urgeName: '', //所属团队
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					caseType: '', //案件状态
					urgeLeader: '', //所属组长
					productType: '', // 产品类型
					timeScope: 'current', //默认查询当前案件
					centerName: '', //分中心
					contactPhoneNo:'', // 电话号码
					certNo:'', //身份证
				},
				formData1: {
					LoanContractNo: '', //证件号码
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					foreverUrgeNo: '', //永久催收员
					caseAllotTimeS: '', //案件分配日期
					overdueGrade: '', //逾期等级
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					urgeName: '', //所属团队
					caseType: '', //案件状态
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					urgeLeader: '', //所属组长
					productType: '', // 产品类型
					timeScope: 'current', //默认查询当前案件
					centerName: '', //分中心
					contactPhoneNo:'', // 电话号码
					certNo:'', //身份证
				},
				formData2: {
					LoanContractNo: '', //证件号码
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					foreverUrgeNo: '', //永久催收员
					caseAllotTimeS: '', //案件分配日期
					overdueGrade: '', //逾期等级
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					urgeName: '', //所属团队
					caseType: '', //案件状态
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					urgeLeader: '', //所属组长
					productType: '', // 产品类型
					timeScope: 'current', //默认查询当前案件
					centerName: '', //分中心
					contactPhoneNo:'', // 电话号码
					certNo:'', //身份证
				},
				formData3: {
					LoanContractNo: '', //证件号码
					clientName: '', //客户姓名
					monthPayDateS: '', //还款日
					foreverUrgeNo: '', //永久催收员
					caseAllotTimeS: '', //案件分配日期
					overdueGrade: '', //逾期等级
					overdueDayStart: '', //逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					urgeName: '', //所属团队
					caseType: '', //案件状态
					isSpecial: '', //是否特权包
					mainBody: '', //主体
					belongOrgNo: '', //营业部
					urgeLeader: '', //所属组长
					productType: '', // 产品类型
					timeScope: 'current', //默认查询当前案件
					centerName: '', //分中心
					contactPhoneNo:'', // 电话号码
					certNo:'', //身份证
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				distList: {
					OverdueGrade: [],
					getTeamList: [], //字典表的团队列表
					teamList: [],
					urgeUserList: [],
					contactType: [], //案件联系人
					urgeCaseStatus: [], //字典表案件状态
					isSpecial: [], // 是否特权包
					getOrgNO: [], // 营业部
					mainBody: [], //主体
					queryProductTypeList: [], // 产品类型
					centerName: [], // 分中心
				},
				columns: [
					{title: '分中心',minWidth:100,key: 'centerName'},
					{title: '进件营业部',minWidth: 100,key: 'orgNo'},
					{title: '归属营业部',minWidth: 100,key: 'belongOrgNo'},
					{title: '合同编号',minWidth: 175,key: 'loanContractNo'},
					{title: '客户姓名',minWidth: 90,key: 'clientName'},
					{title: '产品类型',minWidth: 150,key: 'productType'},
					{title: '还款日',minWidth: 100,key: 'settleTime'},
					{title: '逾期等级',minWidth: 90,key: 'overdueGrade'},
					{title: '逾期天数',minWidth: 90,key: 'overdueDays'},
					{title: '逾期总额',minWidth: 100,key: 'overdueAmount'},
					{title: '案件分配日期',minWidth: 110,key: 'caseAllotTime'},
					{title: '案件状态',minWidth: 90,key: 'caseType'},
					{title: '所属团队',minWidth: 140,key: 'urgeName'},
					{title: '所属组长',minWidth: 100,key: 'urgeLeader'},
					{title: '临时催收员',minWidth: 120,key: 'urgeNo'},
					{title: '临时分案结束时间',minWidth: 140,key: 'caseEndDate'},
					{title: '永久催收员',minWidth: 120,key: 'foreverUrgeNo'},
					{
						title: '操作',
						minWidth: 120,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							//查看详情权限
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.forecastCaseShow
									},
									style: {
										marginRight: '5px',
										display: this.getAuth('01000010103') ? 'inline-block' : 'none'
									},
									on: {
										click: () => {
											if (this.tab == 'tab1') {
												this.setStore('opreateBtn', {
													allINFO: params.row
												})
											} else {
												this.setStore('opreateBtn', {
													allShowBtn: 'private',
													showBtn: 'private',
													allINFO: params.row
												})
											}
											this.$router.push('finishDetail')
										}
									}
								}, '详情')
							])

						}
					},
				],
				Hcolumns: [
					{title: '分中心',minWidth:100,key: 'centerName'},
					{title: '进件营业部',minWidth: 100,key: 'orgNo'},
					{title: '归属营业部',minWidth: 100,key: 'belongOrgNo'},
					{title: '合同编号',minWidth: 140,key: 'loanContractNo'},
					{title: '客户姓名',minWidth: 90,key: 'clientName'},
					{title: '产品类型',minWidth: 150,key: 'productType'},
					{title: '还款日',minWidth: 170,key: 'settleTime'},
					{title: '逾期等级',minWidth: 90,key: 'overdueGrade'},
					{title: '逾期天数',minWidth: 90,key: 'overdueDays'},
					{title: '逾期总额',minWidth: 100,key: 'overdueAmount'},
					{title: '案件分配日期',minWidth: 170,key: 'caseAllotTime'},
					{title: '案件状态',minWidth: 140,key: 'caseType'},
					{title: '所属团队',minWidth: 140,key: 'urgeName'},
					{title: '所属组长',minWidth: 100,key: 'urgeLeader'},
					{title: '临时催收员',minWidth: 120,key: 'urgeNo'},
					{title: '临时分案结束时间',minWidth: 150,key: 'caseEndDate'},
					{title: '永久催收员',minWidth: 120,key: 'foreverUrgeNo'},
					{title: '操作时间',key: 'bukeTime',minWidth: 160},
					{
						title: '操作',
						minWidth: 120,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							//查看详情权限
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.forecastCaseShow
									},
									style: {
										marginRight: '5px',
										display: this.getAuth('01000010103') ? 'inline-block' : 'none'
									},
									on: {
										click: () => {
											if (this.tab == 'tab1') {
												this.setStore('opreateBtn', {
													allINFO: params.row
												})
											} else {
												this.setStore('opreateBtn', {
													allShowBtn: 'private',
													showBtn: 'private',
													allINFO: params.row
												})
											}
											this.$router.push('finishDetail')
										}
									}
								}, '详情')
							])

						}
					},
				],
				datas: [], // 当前案件数据
				Hdatas: [], // 历史案件数据
				// ----------- 导入文件模态框
				ImportFileModal: false, // 导入文件模态框
				ImportTitle: '', //导入提前委外 
				importFile:{}, // 导入的文件
			}
		},
		methods: {
			// 默认查询数据
			init(pageIndex, pageSize, CaseType) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				let datas = JSON.parse(JSON.stringify(this.LastSubmitData));
				datas.timeScope = CaseType;
				this.HttpAjax('post', 'collectCase', datas, (res) => { //查询数据
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						if (CaseType == 'current') {
							this.datas = res.data.data.data;
						} else {
							this.Hdatas = res.data.data.data;
						}
					}
				});
			},
			//查询数据总量
			GetTotall(pageIndex, pageSize, CaseType) {
				if (this.totallPages == 0) {
					this.isShowWait = true;
					this.showTotal = false;
				} else if (this.totallPages1 == 0) {
					this.isShowWait = true;
					this.showTotal = false;
				}
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				let datas = JSON.parse(JSON.stringify(this.LastSubmitData));
				datas.timeScope = CaseType;
				this.HttpAjax('post', 'collectCaseCount', datas, (res) => {
					if (res && res.data.status == '200') {
						if (CaseType == 'current') {
							this.totallPages = res.data.data;
						} else {
							this.totallPages1 = res.data.data;
						}
						this.showTotal = true;
						this.isShowWait = false;
					}
				}, 'count');
			},
			//查询按钮点击
			search() {
				this.ClearObject(this.LastSubmitData)
				this.LastSubmitData.pageIndex = 1
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
				if (this.LastSubmitData.overdueDayStart || this.LastSubmitData.overdueDayEnd) {
					if (this.LastSubmitData.overdueDayStart !== "" || this.LastSubmitData.overdueDayEnd !== "") {
						const overdueDay = /^[0-9]*$/;
						if (!overdueDay.test(this.LastSubmitData.overdueDayStart) || !overdueDay.test(this.LastSubmitData.overdueDayEnd)) {
							this.$layer.msg('逾期天数必须为大于等于0整数');
							return
						} else {
							if (parseInt(this.LastSubmitData.overdueDayStart) > parseInt(this.LastSubmitData.overdueDayEnd)) {
								this.$layer.msg('开始天数不能大于结束天数');
								return
							} else {
								this.SearchCallFunction()
							}
						}
					} else {
						this.SearchCallFunction();
					}
				} else {
					this.SearchCallFunction();
				}
			},
			// 查询时调用的方法
			SearchCallFunction() {
				if (this.tab == 'tab1') {
					this.init('1', '', 'current');
					this.GetTotall('', '', 'current')
				} else {
					this.init('1', '', 'history');
					this.GetTotall('', '', 'history')
				}
			},

			//表格切换
			tabChange(name) {
				const _ = this;
				_.tab = name;
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				if (this.tab == 'tab1') {
					if (this.datas.length == 0) {
						this.init('', '', 'current')
						this.GetTotall('', '', 'current')
					}
				} else {
					if (this.Hdatas.length == 0) {
						this.init('', '', 'history')
						this.GetTotall('', '', 'history')
					}
				}
			},
			// 当前案件
			changePages(name) { // 切换第几页
				this.init(name, '', 'current')
			},
			changePagesTotall(name) { // 切换每页显示几条数据
				this.init('1', name, 'current')
			},
			// 历史案件
			changePages1(name) { // 切换第几页
				this.init(name, '', 'history')
			},
			changePagesTotall1(name) { // 切换每页显示几条数据
				this.init('1', name, 'history')
			},
			//刷新按钮
			refresh(val) {
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				if (val == 'current') {
					this.init('', '', 'current')
				} else if (val == 'history') {
					this.init('', '', 'history')
				}
			},
			//重置
			restData() {
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				if (this.tab == 'tab1') {
					this.init('', '', 'current')
					this.GetTotall('', '', 'current')
				} else {
					this.init('', '', 'history')
					this.GetTotall('', '', 'history')
				}
			},
			// 下拉选择项变化时
			selectChange(val) {
				this.formIndex = val
			},
			selectChange1(val) {
				this.formIndex1 = val
			},
			selectChange2(val) {
				this.formIndex2 = val
			},
			selectChange3(val) {
				this.formIndex3 = val
			},
			//下拉框展开
			ClearVal(val) {
				if (val) {
					this.ClearObject(this.formData)
				}
			},
			ClearVal1(val) {
				if (val) {
					this.ClearObject(this.formData1)
				}
			},
			ClearVal2(val) {
				if (val) {
					this.ClearObject(this.formData2)
				}
			},
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
			//字典表 （逾期等级，案件联系人，案件状态
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
									case 'OverdueGrade': //逾期等级
										_.distList.OverdueGrade = res.data.data;
										break;
									case 'contactType': //案件联系人
										_.distList.contactType = res.data.data;
										break;
									case 'urgeCaseStatus': //案件状态
										_.distList.urgeCaseStatus = res.data.data; //案件状态
										_.distList.urgeCaseStatus.push({
											type: 'ww',
											value: '委外处理'
										});
										break;
									case 'isSpecial':
										_.distList.isSpecial = res.data.data; //是否特权包
										break;
									case 'mainBody':
										_.distList.mainBody = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			//产品类型下拉列表
			getProductTypeList(bol) {
				const _ = this;
				if (bol) {
					if (_.distList.queryProductTypeList.length == 0) {
						_.HttpAjax('post', 'queryProductTypeList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.distList.queryProductTypeList = res.data.data; //产品类型
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
			// 分中心
			getBrachId(val){
				if(val){
					if(this.distList.centerName.length == 0){
						this.HttpAjax('post','getBrachId',{},(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							this.distList.centerName = res.data.data
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
			// 还款日转换
			dateChange(val, index) {
				index = index || '';
				if (index == '') {
					this.formData.monthPayDateS = val
				} else {
					this['formData' + index].monthPayDateS = val;
				}
			},
			//案件分配日期 转换
			dateChange1(val, index) {
				index = index || '';
				if (index == '') {
					this.formData.caseAllotTimeS = val
				} else {
					this['formData' + index].caseAllotTimeS = val;
				}
			},
			// 导出数据 按钮
			exportExcel() { //当前案件任务
				this.HttpAjax('post', 'TestingDownloadCaseExcel', this.LastSubmitData, (res) => { //检测数据量
					if (res && res.data.status == 200) {
						if (this.tab == 'tab1') {
							this.ExportDatas('current', '当前案件任务')
						} else {
							this.ExportDatas('history', '历史案件')
						}
					}
				}, 'count')
			},
			//导出数据
			ExportDatas(caseType, name) {
				this.exportOut = true;
				this.LastSubmitData.timeScope = caseType;
				this.HttpAjax('post', 'downloadCaseExcel', qs.stringify(this.LastSubmitData), (res) => {
					this.exportOut = false;
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, name + '.xlsx');
				}, 'download2');
			},
			// -------------数据导入部分
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
			},
			// 选中数据
			TableChange(val){
				this.CxDatas = []
				for(let i in val){
					this.CxDatas.push(val[i].loanContractNo)
				}
			},
			//撤销预测外呼
			CxButton(){
				if(this.CxDatas.length == 0){
					this.$Notice.error({
						title: '错误',
						desc: '请选择要撤销的数据',
						duration: 0,
					})
				}else {
					this.HttpAjax('post','qingniuRevokeOutbound',this.CxDatas,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == 200){
							this.$Notice.success({
								title:'成功',
								desc:res.data.message,
								duration: 2
							})
							this.init('', '', 'current');
						}
					},'json')
				}
			}
		},
		created() {
			this.init('', '', 'current');
			this.GetTotall('', '', 'current');
			this.getListDict(true, 'urgeCaseStatus')
			this.getListDict(true, 'isSpecial')
		}, //页面缓存模式下 停用当前缓存页面执行
	}
</script>

<style lang="less">
	.collectCaseMange {
		.ivu-table-fixed-body{
			overflow: hidden;
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

	.modalInput {
		.ivu-modal .ivu-modal-body {
			overflow-x: hidden;
		}

		.from-item {
			.tree-item {
				margin-bottom: 20px;

				.checkTitle {
					padding: 10px;
				}
			}

			.ivu-form-item {
				.ivu-form-item-label {
					width: 150px !important;
				}

				.ivu-form-item-content {
					margin-left: 150px !important;
				}
			}
		}
	}

	.ivu-icon:hover {
		cursor: pointer;
	}

	.formGroupItem {
		padding: 7px 10px 0;
		border-bottom: 1px solid #dddee1;

		.groupIndex {
			padding: 7px 0;
			border: none;
		}

		.checkTitle {
			border-bottom: 1px solid #dddee1;
			padding: 7px 0;
		}
	}

	.from-item .ivu-checkbox-group {
		min-height: 36px;
	}

	.teamHeight {
		height: auto !important;
	}
</style>
