<template>
	<div class="myOutsideCase">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">我的委外案件</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个下拉框 -->
						<Form label-position="right" inline :model="formData" :rules="ruleValidateFilter" ref="formData">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange" @on-open-change='ClearVal'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1 '>姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2 '>营业部</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3 '>省份</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4 '>主体</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5 '>产品类型</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6 '>案件状态</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7 '>逾期天数</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属委外公司</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9 '>逾期等级</Option>
									<Option value="10" v-show='formIndex1 != 10 && formIndex2 != 10 && formIndex3 != 10 '>案件类型</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11 '>业务线</Option>
								</Select>
								<Input v-if="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.loanContractNo" size="large"></Input>
								<Input v-if="formIndex == 1" type="text" placeholder="请输入姓名！" v-model="formData.loanName" size="large"></Input>
								<Select filterable v-if="formIndex == 2" @on-open-change='getorgnoData' v-model="formData.subCompanyNo"
								 placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Select v-if="formIndex == 3" @on-open-change="getListDict($event,'province')" v-model="formData.areaName"
								 placeholder="请选择省份！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.province" :value="item.value">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 5" @on-open-change="getProductTypeList" v-model="formData.productTypeNo" placeholder="请选择产品类型！"
								 class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-if="formIndex == 6" @on-open-change="getListDict($event,'OutsourcingCaseStatus')" v-model="formData.caseStatusNo"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.OutsourcingCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class="only" v-if="formIndex == 7" type="text" v-model="formData.overdueDayStart" :maxLength="maxLength"
								 placeholder="逾期天数开始！" size="large"></Input>
								<Input class="only" v-if="formIndex == 7" type="text" v-model="formData.overdueDayEnd" :maxLength="maxLength"
								 placeholder="逾期天数结束！" size="large"></Input>
								<Select v-if="formIndex == 8" @on-open-change="getWwCompanyList" v-model="formData.entrustCompanyNo"
								 placeholder="请选择所属委外公司！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
								<Select v-if="formIndex == 9" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 10" @on-open-change="getListDict($event,'caseType')" v-model="formData.caseType"
								 placeholder="请选择案件类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.caseType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 11" v-model="formData.serviceLine" placeholder="请选择业务线！" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第1个下拉框 -->
						<Form label-position="right" inline :model="formData1" :rules="ruleValidateFilter" ref="formData">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange1" @on-open-change='ClearVal1'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1 '>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2 '>营业部</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3 '>省份</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4 '>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5 '>产品类型</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6 '>案件状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7 '>逾期天数</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8 '>所属委外公司</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9 '>逾期等级</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10 '>案件类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11 '>业务线</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入姓名！" v-model="formData1.loanName" size="large"></Input>
								<Select filterable v-show="formIndex1 == 2" @on-open-change='getorgnoData' v-model="formData1.subCompanyNo"
								 placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Select v-show="formIndex1 == 3" @on-open-change="getListDict($event,'province')" v-model="formData1.areaName"
								 placeholder="请选择省份！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.province" :value="item.value">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData1.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 5" @on-open-change="getProductTypeList" v-model="formData1.productTypeNo"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex1 == 6" @on-open-change="getListDict($event,'OutsourcingCaseStatus')" v-model="formData1.caseStatusNo"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.OutsourcingCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class="only" v-show="formIndex1 == 7" type="text" v-model="formData1.overdueDayStart" :maxLength="maxLength"
								 placeholder="逾期天数开始！" size="large"></Input>
								<Input class="only" v-show="formIndex1 == 7" type="text" v-model="formData1.overdueDayEnd" :maxLength="maxLength"
								 placeholder="逾期天数结束！" size="large"></Input>
								<Select v-show="formIndex1 == 8" @on-open-change="getWwCompanyList" v-model="formData1.entrustCompanyNo"
								 placeholder="请选择所属委外公司！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
								<Select v-show="formIndex1 == 9" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData1.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 10" @on-open-change="getListDict($event,'caseType')" v-model="formData1.caseType"
								 placeholder="请选择案件类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.caseType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 == 11" v-model="formData.serviceLine" placeholder="请选择业务线！" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第2个下拉框 -->
						<Form label-position="right" inline :model="formData" :rules="ruleValidateFilter" ref="formData">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange2" @on-open-change='ClearVal2'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1 '>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2 '>营业部</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3 '>省份</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4 '>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5 '>产品类型</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6 '>案件状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7 '>逾期天数</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8 '>所属委外公司</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9 '>逾期等级</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10 '>案件类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11 '>业务线</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入姓名！" v-model="formData2.loanName" size="large"></Input>
								<Select filterable v-show="formIndex2 == 2" @on-open-change='getorgnoData' v-model="formData2.subCompanyNo"
								 placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Select v-show="formIndex2 == 3" @on-open-change="getListDict($event,'province')" v-model="formData2.areaName"
								 placeholder="请选择省份！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.province" :value="item.value">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData2.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 5" @on-open-change="getProductTypeList" v-model="formData2.productTypeNo"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'OutsourcingCaseStatus')" v-model="formData2.caseStatusNo"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.OutsourcingCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class="only" v-show="formIndex2 == 7" type="text" v-model="formData2.overdueDayStart" :maxLength="maxLength"
								 placeholder="逾期天数开始！" size="large"></Input>
								<Input class="only" v-show="formIndex2 == 7" type="text" v-model="formData2.overdueDayEnd" :maxLength="maxLength"
								 placeholder="逾期天数结束！" size="large"></Input>
								<Select v-show="formIndex2 == 8" @on-open-change="getWwCompanyList" v-model="formData2.entrustCompanyNo"
								 placeholder="请选择所属委外公司！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
								<Select v-show="formIndex2 == 9" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData2.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 10" @on-open-change="getListDict($event,'caseType')" v-model="formData2.caseType"
								 placeholder="请选择案件类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.caseType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex2 == 11" v-model="formData.serviceLine" placeholder="请选择业务线！" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第3个下拉框 -->
						<Form label-position="right" inline :model="formData3" :rules="ruleValidateFilter" ref="formData">
							<FormItem class="block-tips" prop="rulename1">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange3" @on-open-change='ClearVal3'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0 '>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1 '>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2 '>营业部</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3 '>省份</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4 '>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5 '>产品类型</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6 '>案件状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7 '>逾期天数</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8 '>所属委外公司</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9 '>逾期等级</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10 '>案件类型</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11 '>业务线</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入姓名！" v-model="formData3.loanName" size="large"></Input>
								<Select filterable v-show="formIndex3 == 2" @on-open-change='getorgnoData' v-model="formData3.subCompanyNo"
								 placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in getOrgNO" :value="item.idKey">{{item.groupName}}</Option>
								</Select>
								<Select v-show="formIndex3 == 3" @on-open-change="getListDict($event,'province')" v-model="formData3.areaName"
								 placeholder="请选择省份！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.province" :value="item.value">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData3.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 5" @on-open-change="getProductTypeList" v-model="formData3.productTypeNo"
								 placeholder="请选择产品类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'OutsourcingCaseStatus')" v-model="formData3.caseStatusNo"
								 placeholder="请选择案件状态！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.OutsourcingCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class="only" v-show="formIndex3 == 7" type="text" v-model="formData3.overdueDayStart" :maxLength="maxLength"
								 placeholder="逾期天数开始！" size="large"></Input>
								<Input class="only" v-show="formIndex3 == 7" type="text" v-model="formData3.overdueDayEnd" :maxLength="maxLength"
								 placeholder="逾期天数结束！" size="large"></Input>
								<Select v-show="formIndex3 == 8" @on-open-change="getWwCompanyList" v-model="formData3.entrustCompanyNo"
								 placeholder="请选择所属委外公司！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
								<Select v-show="formIndex3 == 9" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData3.overdueGrade"
								 placeholder="请选择逾期等级！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 10" @on-open-change="getListDict($event,'caseType')" v-model="formData3.caseType"
								 placeholder="请选择案件类型！" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.caseType" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex3 == 11" v-model="formData.serviceLine" placeholder="请选择业务线！" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">查询</Button>
								<Button @click="restData" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('03000010101')" @click="outInfo" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate || this.exportOut">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>

								<!-- 数据导入 -->
								<Dropdown v-if="this.getAuth('03000010101')" trigger="click" @on-click='ImportInfoList'>
									<Button type="primary" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">
										导入数据<Icon type="ios-arrow-down"></Icon>
									</Button>
									<DropdownMenu slot="list">
										<DropdownItem name="1">导入分案</DropdownItem>
										<DropdownItem name="2">导入停催</DropdownItem>
										<DropdownItem name="3">导入留案</DropdownItem>
										<DropdownItem name="5">导入激活</DropdownItem>
										<DropdownItem name="6">导入回案</DropdownItem>
										<!-- <DropdownItem name="7">导入提前委外</DropdownItem> -->
									</DropdownMenu>
								</Dropdown>
								<!-- 模板下载 -->
								<Dropdown trigger="click" @on-click='dwnloadTemplate'>
									<Button type="primary" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">
										下载模板<Icon type="ios-arrow-down"></Icon>
									</Button>
									<DropdownMenu slot="list">
										<DropdownItem name="1">分案模板</DropdownItem>
										<DropdownItem name="2">停催模板</DropdownItem>
										<DropdownItem name="3">留案模板</DropdownItem>
										<DropdownItem name="5">激活模板</DropdownItem>
										<DropdownItem name="6">回案模板</DropdownItem>
										<!-- <DropdownItem name="7">提前委外模板</DropdownItem> -->
									</DropdownMenu>
								</Dropdown>

								<!--<Button v-if="this.getAuth('03000010101')" @click="importMethod" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">
									<Icon type="navicon-round"></Icon> 导入数据
								</Button>
								<Button @click="dwnloadTemplate" :disabled="divisionModal ||stopCaseModal||holdCaseModal|| delimitModal||addTemplate">
									<Icon type="navicon-round"></Icon> 下载模板
								</Button>-->
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
		<!--Modal 分案-->
		<Modal v-model="divisionModal" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalTip"
		 title="分案">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model="divisionModalForm" :rules="ruleValidate" ref="divisionModalForm">
					<FormItem label="选择公司" prop="wwCompanyId">
						<Select v-model="divisionModalForm.wwCompanyId" placeholder="请选择" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem label="分案时间" prop="allotCycle">
						<Select v-model="divisionModalForm.allotCycle" placeholder="请选择！" :style="width" size="large">
							<Option value="1">一个月</Option>
							<Option value="2">两个月</Option>
							<Option value="3">三个月</Option>
						</Select>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="allotCase('divisionModalForm')">确定</Button>
			</div>
		</Modal>
		<!--Modal 停案-->
		<Modal v-model="stopCaseModal" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalTip"
		 title="停案">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model="stopCaseModalForm" :rules="ruleValidateStop" ref="stopCaseModalForm">
					<FormItem label="停催类型" prop="stopType">
						<Select v-model="stopCaseModalForm.stopType" placeholder="请选择停催类型！" @on-change="foreveStopcase" :style="width"
						 size="large">
							<Option :key="index" v-for="(item,index) in distList.stopType" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="停催原因" prop="stopCause">
						<Select v-model="stopCaseModalForm.stopCause" placeholder="请选择！" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.stopCause" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="备注" prop="stopRemark">
						<Input v-model="stopCaseModalForm.stopRemark" type="text" placeholder="请输入备注！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="停催结束时间" prop="stopCaseEndTime" v-if="isshowTime">
						<DatePicker @on-change='dateChange2' format="yyyy-MM-dd" v-model="stopCaseModalForm.stopCaseEndTime" :options="optionsEnd"
						 :editable="false" type="date" placement="top-start" placeholder="请选择停催结束时间！" :style="width" size="large"></DatePicker>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="stopCase('stopCaseModalForm')">确定</Button>
			</div>
		</Modal>
		<!--Modal 留案-->
		<Modal v-model="holdCaseModal" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalTip"
		 title="留案">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model="holdCaseModalForm" :rules="ruleValidateHold" ref="holdCaseModalForm">
					<FormItem label="合同编号" prop="LoanContractNo">
						<Input v-model="holdCaseModalForm.LoanContractNo" type="text" placeholder="请输入合同号！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="留案结束日期" prop="allotCycle">
						<Select v-model="holdCaseModalForm.allotCycle" placeholder="请选择！" :style="width" size="large">
							<Option value="1">一个月</Option>
							<Option value="2">两个月</Option>
							<Option value="3">三个月</Option>
						</Select>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="holdCase('holdCaseModalForm')">确定</Button>
			</div>
		</Modal>
		<!--Modal 划扣-->
		<Modal v-model="delimitModal" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalTip"
		 title="划扣申请">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model="delimitModalForm" :rules="ruleValidateDelimit" ref="delimitModalForm">
					<FormItem label="划扣方式" prop="reserverMethod">
						<Select v-model="delimitModalForm.reserverMethod" @on-change="delimitMethod4Time" placeholder="请选择划扣方式！" :style="width"
						 size="large">
							<Option :key="index" v-for="(item,index) in distList.reserverMethod" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="划扣类型" prop="reserverType">
						<Select :disabled="true" v-model="delimitModalForm.reserverType" placeholder="请选择划扣类型！" :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.reserverType" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>

					<FormItem label="划扣时间" prop="reserverTime" v-if="isshowDelimitTime">
						<DatePicker @on-change='dateChange' format="yyyy-MM-dd" v-model="delimitModalForm.reserverTime" :options="optionsEnd"
						 :editable="false" type="date" placeholder="请选择划扣时间！" :style="width" size="large"></DatePicker>
					</FormItem>
					<FormItem label="划扣金额" prop="reserverAmount">
						<Input type="text" v-model="delimitModalForm.reserverAmount" :maxlength="16" :style="width" placeholder="请输入划扣金额！"
						 size="large"></Input>
					</FormItem>
					<!--<FormItem label="备注" prop="remarks">-->
					<!--<Input type="text" v-model="delimitModalForm.remarks" :maxLength="maxLength" :style="width" placeholder="请输入备注！"   size="large"></Input>-->
					<!--</FormItem>-->
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="delimit('delimitModalForm')">确定</Button>
			</div>
		</Modal>
		<!--选择文件-->
		<Modal v-model="addTemplate" draggable :mask-closable="false" :scrollable="true" :loading="loading" :title="ImportTitle">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" ref="uploadFile" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						 multiple />
					</FormItem></br>
					<!-- <span style="color:blue;text-decoration: underline;cursor:pointer;" @click="down_Template">下载导入模板.xlsx</span> -->
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="getApplyModeTo">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import url from '../../service/url_config'
	import qs from 'qs'
	export default {
		name: 'myOutsideCase',
		data() {
			// 验证规则
			const cellNum = (rule, value, callback) => {
				if (value.length > 100) {
					callback(new Error('不能超过100个字符！'));
				} else {
					callback();
				}
			};
			const cellName = (rule, value, callback) => {
				if (value.length > 60) {
					callback(new Error('不能超过60个字符！'));
				} else {
					callback();
				}
			};
			const nowtimeThen = (rule, value, callback) => { //判断所选择时间大于当前时间
				//获取当前时间
				var date = new Date(); //获取当前时间
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				var curDate = year + "-" + month + "-" + day;

				if (value <= curDate) {
					callback(new Error('请选择大于当前日期！'));
				} else {
					callback();
				}
			};
			//金额判断
			const validateData = (rule, value, callback) => { //划扣金额
				let reg = /^[0-9]\d*(\.\d+)?$/;
				if (!reg.test(value)) {
					callback(new Error('划扣金额必须大于0！'));
				} else {
					callback();
				}
			};
			return {
				exportOut: false, // 导出设置
				value1: '1',
				rotate: true,
				select3: '1',
				flag: 1,
				divisionModal: false, //分案模态框
				stopCaseModal: false, //停案模态框
				holdCaseModal: false, //留案模态框
				delimitModal: false, //划扣模态框
				addTemplate: false, //导入模态框
				ImportTitle: '', // 导入数据弹窗提示语
				isshowTime: true, //默认停案结束时间显示
				isshowDelimitTime: true, //默认划扣时间显示
				loading: true,
				placeholder: "请输入合同编号！",
				width: {
					'width': '340px'
				},
				importFile: {},
				maxLength: 60,
				centerName: [], //分中心
				getOrgNO: [], //营业部
				optionsEnd: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 1 - 86400000;
					}
				},
				divisionModalForm: {
					allotCycle: '',
					wwCompanyId: ''
				},
				ruleValidate: { //分案验证
					wwCompanyId: [{
						required: true,
						message: '公司必选！'
					}],
					allotCycle: [{
						required: true,
						message: '分案时间必选！'
					}],
				},
				ruleValidateStop: { //停催验证
					LoanContractNo: [{
						required: true,
						message: '合同号必填！'
					}, ],
					stopType: [{
						required: true,
						message: '停催类型必选！'
					}],
					stopCaseEndTime: [{
						required: true,
						message: '停催结束时间必填！'
					}, {
						validator: nowtimeThen,
						trigger: 'blur'
					}],
					stopCause: [{
						required: true,
						message: '停催原因必选！'
					}],
					stopRemark: [{
						required: false,
						message: '备注必填！'
					}, {
						validator: cellNum,
						trigger: 'blur'
					}],
				},
				ruleValidateHold: { //留案验证
					LoanContractNo: [{
						required: true,
						message: '合同号必填！'
					}, {
						validator: cellName,
						trigger: 'blur'
					}],
					allotCycle: [{
						required: true,
						message: '留案结束日期必选！'
					}],
				},
				ruleValidateFilter: { //筛选验证
					loanContractNo: [{
							required: false,
							message: '合同号！'
						},
						{
							type: 'number',
							message: '请输入数字格式',
							trigger: 'blur',
							transform(value) {
								return Number(value);
							}
						}
					],
					overDay: [{
							required: false,
							message: '逾期天数！'
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
					loanName: [{
						required: false,
						message: '姓名必填！'
					}, {
						validator: cellName,
						trigger: 'blur'
					}],
				},
				ruleValidateDelimit: { //划扣验证
					reserverTime: [{
						required: true,
						message: '划扣时间必填！'
					}, {
						validator: nowtimeThen,
						trigger: 'blur'
					}],
					reserverAmount: [{
							required: true,
							message: '划扣金额必填！'
						},
						{
							validator: validateData,
							trigger: 'blur'
						}
					],
					reserverType: [{
						required: true,
						message: '划扣类型必选！'
					}],
					reserverMethod: [{
						required: true,
						message: '划扣方式必选！'
					}],
					// remarks:[{required:true,message:'备注必填！'},{validator:cellNum,trigger: 'blur'}],
				},
				stopCaseModalForm: { //停案字段
					stopType: '',
					stopCaseEndTime: '',
					stopCause: '',
					stopRemark: ''
				},
				holdCaseModalForm: { //留案字段
					LoanContractNo: '',
					allotCycle: ''
				},
				delimitModalForm: { //划扣字段
					reserverTime: '',
					reserverAmount: '',
					reserverType: '1',
					reserverMethod: '',
					// remarks:''
				},
				totallPages: 0, //总页数
				formIndex: '0', //第0个下来选择框默认选中
				formIndex1: '1', //第1个下来选择框默认选中
				formIndex2: '2', //第2个下来选择框默认选中
				formIndex3: '3', //第3个下来选择框默认选中
				//筛选字段
				formData: {
					subCompanyNo: '', //营业部
					areaName: '', //省份
					loanContractNo: '', //合同编号
					loanName: '', // 姓名
					mainBody: '', // 主体
					productTypeNo: '', // 产品类型
					caseStatusNo: '', //案件状态
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					entrustCompanyNo: '', // 所属委外公司
					overdueGrade: '', //逾期等级
					caseType: '', // 案件类型
					serviceLine: '', //业务线
				},
				formData1: {
					subCompanyNo: '', //营业部
					areaName: '', //省份
					loanContractNo: '', //合同编号
					loanName: '', // 姓名
					mainBody: '', // 主体
					productTypeNo: '', // 产品类型
					caseStatusNo: '', //案件状态
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					entrustCompanyNo: '', // 所属委外公司
					overdueGrade: '', //逾期等级
					caseType: '', // 案件类型
					serviceLine: '', //业务线
				},
				formData2: {
					subCompanyNo: '', //营业部
					areaName: '', //省份
					loanContractNo: '', //合同编号
					loanName: '', // 姓名
					mainBody: '', // 主体
					productTypeNo: '', // 产品类型
					caseStatusNo: '', //案件状态
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					entrustCompanyNo: '', // 所属委外公司
					overdueGrade: '', //逾期等级
					caseType: '', // 案件类型
					serviceLine: '', //业务线
				},
				formData3: {
					subCompanyNo: '', //营业部
					areaName: '', //省份
					loanContractNo: '', //合同编号
					loanName: '', // 姓名
					mainBody: '', // 主体
					productTypeNo: '', // 产品类型
					caseStatusNo: '', //案件状态
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					entrustCompanyNo: '', // 所属委外公司
					overdueGrade: '', //逾期等级
					caseType: '', // 案件类型
					serviceLine: '', //业务线
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				//下拉字段汇集
				distList: {
					mainBody: [], //主体
					overdueGrade: [], //逾期等级
					province: [], //省份
					urgeCaseStatus: [], //案件状态
					caseType: [], //案件类型
					queryProductTypeList: [], //产品类型
					queryWwCompanyList: [], //所属委外公司
					reserverType: [], //划扣类型
					reserverMethod: [], //划扣方式
					stopType: [], //停催类型
					stopCause: [], //停催原因
					OutsourcingCaseStatus: [], //委外案件状态
				},
				columns: [{
						title: '合同编号',
						minWidth: 160,
						key: 'loanContractNo',
					},
					{
						title: '归属营业部',
						minWidth: 100,
						key: 'subCompanyName',
					},
					{
						title: '省份',
						minWidth: 80,
						key: 'areaName'
					}, {
						title: '姓名',
						minWidth: 100,
						key: 'loanName',
					}, {
						title: '主体',
						minWidth: 100,
						key: 'mainBodyName',
					}, {
						title: '产品类型',
						minWidth: 130,
						key: 'productTypeName',
					}, {
						title: '合同期数',
						minWidth: 90,
						key: 'loanBill',
					}, {
						title: '案件状态',
						minWidth: 100,
						key: 'caseStatusName',
					}, {
						title: '逾期天数',
						minWidth: 90,
						key: 'overDay',
					},
					{
						title: '委外逾期天数',
						minWidth: 110,
						key: 'entrustOverdueDays',
					}, {
						title: '期初逾期天数',
						minWidth: 110,
						key: 'beginOverdueDays',
					},
					{
						title: '逾期等级',
						minWidth: 90,
						key: 'overdueGradeName',
					}, {
						title: '已还金额',
						minWidth: 130,
						key: 'paidAllAmount',
					}, {
						title: '逾期总额',
						minWidth: 90,
						key: 'unpaidOverdueFee',
					}, {
						title: '应收客户总额',
						minWidth: 110,
						key: 'paidAmount',
					}, {
						title: '所属委外公司',
						minWidth: 110,
						key: 'entrustCompanyName',
					}, {
						title: '案件分配日期',
						minWidth: 110,
						key: 'allocationCaseDate',
					}, {
						title: '分案结束日期',
						minWidth: 130,
						key: 'closureCaseDate',
					}, {
						title: '案件类型',
						minWidth: 90,
						key: 'caseTypeName',
					},
					{
						title: '操作',
						minWidth: 225,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										disabled: params.row.caseStatusName == '委外停催中' || params.row.caseStatusName == '委外已分案' || params.row.caseStatusName ==
											'委外成功' || params.row.caseStatusName == '委外留案中' || this.divisionModal || this.stopCaseModal || this.holdCaseModal ||
											this.delimitModal || this.addTemplate ? true : false,
									},
									style: {
										marginRight: '2px',
										display: this.getAuth('03000010103') ? 'inline-block' : 'none'
									},
									on: {
										click: () => {
											this.divisionMethod(params)
										}
									}
								}, '分'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '2px',
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
								}, '详情'),
								h('Dropdown', {
									props: {
										trigger: 'click',
										placement: "bottom-end",
										transfer: true,
									},
									style: {
										display: this.getAuth('03000010109') || this.getAuth('03000010104') || this.getAuth('03000010106') ||
											this.getAuth('03000010107') || this.getAuth('03000010108') ? 'inline-block' : 'none',
									},
									on: {
										'on-click': (name) => {
											if (name == '1') {
												this.stopCaseMethod(params) //停催方法
											} else if (name == '2') {
												this.backCaseMethod(params) //回案方法
											} else if (name == '3') {
												this.holdCaseMethod(params) //留案方法
											} else if (name == '4') {
												this.delimitMethod(params) //划扣方法
											} else if (name == '5') {
												this.activationCase(params) //激活方法
											}
										}
									}
								}, [
									h('Button', {
										props: {
											size: 'small',
											type: 'info',
											disabled: this.divisionModal || this.stopCaseModal || this.holdCaseModal || this.delimitModal || this.addTemplate
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
												name: '1',
												disabled: params.row.caseStatusName == '委外停催中' || params.row.caseStatusName == '委外成功' ? true : false,
											},
											style: {
												display: this.getAuth('03000010104') ? 'block' : 'none',
												pointerEvents: params.row.caseStatusName == '委外停催中' || params.row.caseStatusName == '委外成功' ? 'none' :
													'',
											}
										}, '停催'),
										h('DropdownItem', {
											props: {
												name: '2',
												disabled: params.row.caseStatusName == '委外未分案' || params.row.caseStatusName == '委外停催中' || params.row
													.caseStatusName == '委外成功' ? true : false,
											},
											style: {
												display: this.getAuth('03000010109') ? 'block' : 'none',
												pointerEvents: params.row.caseStatusName == '委外未分案' || params.row.caseStatusName == '委外停催中' ||
													params.row.caseStatusName == '委外成功' ? 'none' : '',
											}
										}, '回案'),
										h('DropdownItem', {
											props: {
												name: '3',
												disabled: params.row.caseStatusName == '委外停催中' || params.row.caseStatusName == '委外未分案' || params.row
													.caseStatusName == '委外成功' || params.row.caseStatusName == '委外留案中' ? true : false,
											},
											style: {
												display: this.getAuth('03000010106') ? 'block' : 'none',
												pointerEvents: params.row.caseStatusName == '委外停催中' || params.row.caseStatusName == '委外未分案' ||
													params.row.caseStatusName == '委外成功' || params.row.caseStatusName == '委外留案中' ? 'none' : '',
											}
										}, '留案'),
										h('DropdownItem', {
											props: {
												name: '4',
												disabled: params.row.caseStatusName == '委外成功' || params.row.reserverStatus == 0 ? true : false,
											},
											style: {
												display: this.getAuth('03000010107') ? 'block' : 'none',
												pointerEvents: params.row.caseStatusName == '委外成功' ? 'none' : '',
											}

										}, '划扣'),
										h('DropdownItem', {
											props: {
												name: '5',
												disabled: params.row.caseStatusName == '委外停催中' ? false : true,
											},
											style: {
												display: this.getAuth('03000010108') ? 'block' : 'none',
												pointerEvents: params.row.caseStatusName == '委外停催中' ? '' : 'none',
											}

										}, '激活'),
									])

								])
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
				_.myoutsidecase(); //初始化列表
				this.MywwcaseListwwcaseCount();
			},
			//初始化列表
			myoutsidecase(page, pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
				_.HttpAjax('post', 'outsidecase', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						_.datas = res.data.data.data;
					}
				});
			},
			// 查询数据总条数
			MywwcaseListwwcaseCount(page, pagesize) {
				this.LastSubmitData.pageIndex = page || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pagesize || this.LastSubmitData.pageSize;
				//查询数据总条数
				this.HttpAjax('post', 'MywwcaseListwwcaseCount', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.totallPages = res.data.data;
					}
				},'count')
			},
			//查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData);
				this.LastSubmitData.pageIndex = 1
				for (let i in this.formData) { //置空，除了pageIndex和pageSize
					if (this.formData[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData[i])
					}
				}
				for (let i in this.formData1) { //置空，除了pageIndex和pageSize
					if (this.formData1[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData1[i])
					}
				}
				for (let i in this.formData2) { //置空，除了pageIndex和pageSize
					if (this.formData2[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData2[i])
					}
				}
				for (let i in this.formData3) { //置空，除了pageIndex和pageSize
					if (this.formData3[i] != '') {
						this.$set(this.LastSubmitData, i, this.formData3[i])
					}
				}
				if (this.LastSubmitData.overdueDayStart || this.LastSubmitData.overdueDayEnd) {
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
								this.myoutsidecase();
								this.MywwcaseListwwcaseCount();
							}
						}
					} else {
						this.myoutsidecase()
						this.MywwcaseListwwcaseCount();
					}
				} else {
					this.myoutsidecase()
					this.MywwcaseListwwcaseCount();
				}
			},
			// 第0个下拉框选中值改变时
			selectChange(val) {
				this.formIndex = val;
			},
			//第0个下拉框 展开 （清空数组）
			ClearVal(val) {
				if (val) {
					this.ClearObject(this.formData)
				}
			},
			// 第1个下拉框选中值改变时
			selectChange1(val) {
				this.formIndex1 = val;
			},
			//第1个下拉框 展开 （清空数组）
			ClearVal1(val) {
				if (val) {
					this.ClearObject(this.formData1)
				}
			},
			// 第2个下拉框选中值改变时
			selectChange2(val) {
				this.formIndex2 = val;
			},
			//第2个下拉框 展开 （清空数组）
			ClearVal2(val) {
				if (val) {
					this.ClearObject(this.formData2)
				}
			},
			// 第3个下拉框选中值改变时
			selectChange3(val) {
				this.formIndex3 = val
			},
			//第3个下拉框 展开 （清空数组）
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
			//翻页-->第几页
			changePages(name) {
				this.myoutsidecase(name);
			},
			//每一页显示多少条数据
			changePagesTotall(name) {
				this.LastSubmitData.pageSize = name;
				this.myoutsidecase('', name);
			},
			cancel() { //取消
				this.divisionModal = false;
				this.stopCaseModal = false;
				this.holdCaseModal = false;
				this.delimitModal = false;
				this.addTemplate = false;
			},
			//分案
			divisionMethod(row) {
				const _ = this;
				_.divisionModal = true;
				_.getWwCompanyList(); //所属委外公司
				_.$refs['divisionModalForm'].resetFields();
				_.divisionModalForm.loanContractNo = row.row.loanContractNo;
				_.divisionModalForm.wwAccountId = row.row.wwAccountId;


			},
			//筛选所有下拉列表
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
										_.distList.mainBody = res.data.data;
										break;
									case 'overdueGrade':
										_.distList.overdueGrade = res.data.data;
										break;
									case 'province':
										_.distList.province = res.data.data;
										break;
									case 'urgeCaseStatus':
										_.distList.urgeCaseStatus = res.data.data;
										break;
									case 'caseType':
										_.distList.caseType = res.data.data; // 案件类型
										break;
									case 'OutsourcingCaseStatus': //委外案件状态
										_.distList.OutsourcingCaseStatus = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			//模态框里的下拉数据
			getselectList(label) {
				const _ = this;
				_.HttpAjax('post', 'distList', {
					label: label
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						switch (label) {
							case 'reserverType': //划扣类型
								_.distList.reserverType = res.data.data;
								break;
							case 'reserverMethod': //划扣方式
								_.distList.reserverMethod = res.data.data;
								break;
							case 'stopType': //停催类型
								_.distList.stopType = res.data.data;
								break;
							case 'outSouringStopCause': //停催原因 (这是这个页面改)
								_.distList.stopCause = res.data.data;
								break;
						}
					}
				});
			},
			//分中心
			getCenterName(bol) {
				const _ = this;
				if (bol) {
					if (_.centerName.length == 0) {
						_.HttpAjax('post', 'getCenterName', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.centerName = res.data.data; //分中心
							}
						})
					}
				}

			},
			//营业部
			getorgnoData(bol) {
				const _ = this;
				if (bol) {
					if (_.getOrgNO.length == 0) {
						_.HttpAjax('post', 'getOrgNO', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.getOrgNO = res.data.data; //营业部
							}
						})
					}
				}
			},
			//委外公司下拉列表
			getWwCompanyList(bol) {
				const _ = this;
				if (bol) {
					if (_.distList.queryWwCompanyList.length == 0) {
						_.HttpAjax('post', 'queryWwCompanyList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.distList.queryWwCompanyList = res.data.data; //委外公司管理
							}
						})
					}
				} else {
					_.HttpAjax('post', 'queryWwCompanyList', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == '200') {
							_.distList.queryWwCompanyList = res.data.data; //委外公司管理
						}
					})
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
			// 分案弹窗 确定按钮
			allotCase(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'caseallot', _.divisionModalForm, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '分案成功！',
									duration: 2
								});
								_.divisionModal = false;
								_.init()
							}
						})
					}
				});
			},
			//停催
			stopCaseMethod(row) {
				const _ = this;
				if (row.row.caseStatusNo == 2) { //如果是停催，则置灰
					return;
				}
				_.stopCaseModal = true;
				_.getselectList('outSouringStopCause'); //停催原因
				_.getselectList('stopType'); //停催类型
				_.$refs['stopCaseModalForm'].resetFields();
				_.stopCaseModalForm.loanContractNo = row.row.loanContractNo;
				_.stopCaseModalForm.wwAccountId = row.row.wwAccountId;
			},
			//根据停案类型，判断是否显示停案结束时间
			foreveStopcase(name) {
				const _ = this;
				if (name == 2) {
					_.isshowTime = false;
					_.stopCaseModalForm.stopCaseEndTime = ''
				} else {
					_.isshowTime = true
				}
			},
			//导入数据按钮列表
			ImportInfoList(name) {
				this.addTemplate = true;
				this.$refs['uploadFile'].value = '';
				this.flag = name;
			},
			//停催
			stopCase(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'casestop', _.stopCaseModalForm, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '停催成功！',
									duration: 2
								});
								_.stopCaseModal = false;
								_.init()
							}
						})
					}
				});
			},
			//留案
			holdCaseMethod(row) {
				const _ = this;
				_.holdCaseModal = true;
				_.$refs['holdCaseModalForm'].resetFields();
				_.holdCaseModalForm.LoanContractNo = row.row.loanContractNo;
				_.holdCaseModalForm.wwAccountId = row.row.wwAccountId;
			},
			//留案
			holdCase(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'casehold', _.holdCaseModalForm, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '留案成功！',
									duration: 2
								});
								_.holdCaseModal = false;
								_.init()
							} else {
								_.$Notice.error({
									title: '请求发生错误！',
									desc: res.data.message
								});
							}
						})
					}
				});
			},
			//回案
			backCaseMethod(name) {
				const _ = this;
				_.HttpAjax('post', 'caseback', {
					wwAccountId: name.row.wwAccountId
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if (res && res.data.status == '200') {
						_.$Notice.success({
							title: '成功',
							desc: '回案成功！',
							duration: 2
						});
						_.init()
					}
				})
			},
			//划扣
			delimitMethod(row) {
				const _ = this;
				_.delimitModal = true;
				_.getselectList('reserverType'); //划扣类型
				_.getselectList('reserverMethod'); //划扣方式
				_.$refs['delimitModalForm'].resetFields();
				_.delimitModalForm.loanContractNo = row.row.loanContractNo;
			},
			//划扣
			delimit(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'addReserver', _.delimitModalForm, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '划扣申请成功！',
									duration: 2
								});
								_.delimitModal = false;
								_.init()
							}
						})
					}
				});
			},
			//委外激活
			activationCase(row) {
				const _ = this;
				_.HttpAjax('post', 'activationCase', {
					wwAccountId: row.row.wwAccountId
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
			},
			//根据划扣类型判断是否显示时间
			delimitMethod4Time(name) {
				const _ = this;
				if (name == 2) {
					_.isshowDelimitTime = false;
					_.delimitModalForm.reserverTime = ''
				} else {
					_.isshowDelimitTime = true
				}
			},
			//下载模板
			dwnloadTemplate(name) {
				let arrs = ['委外批量分案导入.xlsx', '委外批量停催导入.xlsx', '委外批量留案导入.xlsx', '', '委外批量激活导入.xlsx', '委外批量回案导入.xlsx']
				let ids = ['2ff80660ea5711e89bcd7cd30ad3acc0', '449af29eea5711e89bcd7cd30ad3acc0',
					'48f38994ea5711e89bcd7cd30ad3acc0', '', '4cf7057eea5711e89bcd7cd30ad3acc0', '53916606ea5711e89bcd7cd30ad3acc0'
				];
				if (name == '7') {
					var formdata = new FormData();
					formdata.append('id', 'ab70115c00ee4436b5737fcd89e9b083');
					this.HttpAjax('post', 'downloadExcelTemp2', formdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						// 二进制流文件下载
						this.downLoadFile(res.data, '批量委外导入模板.xlsx');
					}, 'download');
				} else {
					var formdata = new FormData();
					formdata.append('flag', name);
					formdata.append('id', ids[name - 1]);
					this.HttpAjax('post', 'downloadCurrentExcelTemp1', formdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						//二进制流文件下载
						this.downLoadFile(res.data, arrs[name - 1]);
					}, 'download');
				}
			},
			//导入模态框
			importMethod() {
				this.addTemplate = true;
				this.importFile = {};
				this.$refs['uploadFile'].value = '';
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
			// 下载回案模板
			down_Template() {
				this.HttpAjax('post', 'excelHelpper', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '回案模板');
				}, 'download')
			},
			//导入
			getApplyModeTo() {
				const _ = this;
				if (_.flag == '7') {
					_.HttpAjax('post', 'importWwExcel', _.importFile, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if (res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '导入成功！',
								duration: 2
							});
							_.addTemplate = false;
						}
					}, 'file');
				} else {
					_.HttpAjax('post', 'batchOutsouringExport1', _.importFile, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if (res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '导入成功！',
								duration: 2
							});
							_.addTemplate = false;
						}
					}, 'file');
				}
			},
			// 导出数据 按钮
			outInfo() {
				this.exportOut = true
				this.HttpAjax('post', 'exportInfo', qs.stringify(this.LastSubmitData), (res) => {
					this.exportOut = false
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, '我的委外.xlsx');
				}, 'download2');
				return;
				this.HttpAjax('post', 'TestingExportInfo', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {}
				})
			},
			refresh() { //刷新
				this.myoutsidecase();
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
			dateChange(val) { //划扣时间转化
				this.delimitModalForm.reserverTime = val;
			},
			dateChange2(val) { //停案结束时间转化
				this.stopCaseModalForm.stopCaseEndTime = val;
			},
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less">
	.ivu-dropdown-item-disabled {
		color: #bbbec4 !important;
	}

	.ivu-btn.disabled,
	.ivu-btn[disabled] {
		color: #c5c8ce !important;
		background-color: #f7f7f7 !important;
	}

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

		.table-item {
			.ivu-table-cell {
				padding-left: 5px !important;
				padding-right: 5px !important;
			}
		}
	}

	.ivu-icon:hover {
		cursor: pointer;
	}

	.table-warper {
		padding-bottom: 70px;
	}
</style>
