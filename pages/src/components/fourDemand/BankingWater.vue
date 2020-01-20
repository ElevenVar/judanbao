<template>
	<div class="BankingWater">
		<!-- 公共Header类 -->
		<Collapse v-model="showMe" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">网银流水匹配</span>
				<span class="swith head-commom">
					{{rotate ? '展开' : '折叠'}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<Form label-position="right" inline :model='formData' ref="formData">
							<!-- 第0个下拉筛选栏 -->
							<FormItem class="block-tips">
								<Select size="large" v-model="formIndex" class="prepend" @on-change="selectChange($event,'0')" @on-open-change="clearVal($event,'0')">
									<Option value="0" v-show="formIndex1 !=0 && formIndex2 !=0 && formIndex3 !=0">合同编号</Option><Option value="1" v-show="formIndex1 !=1 && formIndex2 !=1 && formIndex3 !=1">客户姓名</Option>
									<Option value="2" v-show="formIndex1 !=2 && formIndex2 !=2 && formIndex3 !=2">身份证号</Option><Option value="3" v-show="formIndex1 !=3 && formIndex2 !=3 && formIndex3 !=3">金额范围</Option>
									<Option value="4" v-show="formIndex1 !=4 && formIndex2 !=4 && formIndex3 !=4">对方户名</Option><Option value="5" v-show="formIndex1 !=5 && formIndex2 !=5 && formIndex3 !=5">对方账户</Option>
									<Option value="6" v-show="formIndex1 !=6 && formIndex2 !=6 && formIndex3 !=6">申请人</Option><Option value="7" v-show="formIndex1 !=7 && formIndex2 !=7 && formIndex3 !=7">状态</Option>
									<Option value="8" v-show="formIndex1 !=8 && formIndex2 !=8 && formIndex3 !=8">营业部</Option><Option value="9" v-show="formIndex1 !=9 && formIndex2 !=9 && formIndex3 !=9">渠道</Option>
									<Option value="10" v-show="formIndex1 !=10 && formIndex2 !=10 && formIndex3 !=10">存入银行</Option><Option value="11" v-show="formIndex1 !=11 && formIndex2 !=11 && formIndex3 !=11">主体</Option>
									<Option value="12" v-show="formIndex1 !=12 && formIndex2 !=12 && formIndex3 !=12">到账时间</Option><Option value="13" v-show="formIndex1 !=13 && formIndex2 !=13 && formIndex3 !=13">申请时间</Option>
									<Option value="14" v-show="formIndex1 !=14 && formIndex2 !=14 && formIndex3 !=14">审核时间</Option><Option value="15" v-show="formIndex1 !=15 && formIndex2 !=15 && formIndex3 !=15">手机号</Option>
									<Option value="16" v-show="formIndex1 !=16 && formIndex2 !=16 && formIndex3 !=16">流水号</Option><Option value="17" v-show="formIndex1 !=17 && formIndex2 !=17 && formIndex3 !=17">类型</Option>
								</Select>
								<Input v-model="formData.loanContractNo" type="text" v-if="formIndex == 0" placeholder="请输入合同编号！" size="large"></Input>
								<Input v-model="formData.clientName" type="text" v-if="formIndex == 1" placeholder="请输入客户姓名！" size="large"></Input>
								<Input v-model="formData.clientIdCard" type="text" v-if="formIndex == 2" placeholder="请输入身份证号！" size="large"></Input>
								<Input v-model="formData.amountMin" class='only' v-show="formIndex == 3"  type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData.amountMax" class='only' v-show="formIndex == 3" type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData.clientBankName" type="text" v-if="formIndex == 4" placeholder="请输入对方户名！" size="large"></Input>
								<Input v-model="formData.clientBankNo" type="text" v-if="formIndex == 5" placeholder="请输入对方账户！" size="large"></Input>
								<Input v-model="formData.commitPeople" type="text" v-if="formIndex == 6" placeholder="请输入申请人！" size="large"></Input>
								<Select v-model="formData.status" v-if="formIndex == 7" placeholder="请选择状态！" size="large" class="twoSelect">
									<Option value="1">通过</Option>
									<Option value="2">未匹配</Option>
									<Option value="3">拒绝</Option>
									<Option value="4">审核中</Option>
								</Select>
								<Select v-model="formData.belongOrgNo" @on-open-change="getDictList($event,'belongOrgNoList')" v-if="formIndex == 8" placeholder="请选择营业部！" size="large" class="twoSelect">
									<Option v-for="item in distList.belongOrgNoList" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-model="formData.channelName" type="text" v-if="formIndex == 9" placeholder="请输入渠道！" size="large"></Input>
								<Input v-model="formData.bankNoSelf" type="text" v-if="formIndex == 10" placeholder="请输入存入银行！" size="large"></Input>
								<Select v-model="formData.mainBody" @on-open-change="getDictList($event,'mainBody')" v-if="formIndex == 11" placeholder="请选择主体！" size="large" class="twoSelect">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type.toUpperCase()">{{item.value}}</Option>
								</Select>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startTradeTime","0")' v-model="formData.startTradeTime" class='only' v-if="formIndex == 12" placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endTradeTime","0")' v-model="formData.endTradeTime" class='only' v-if="formIndex == 12"  placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeStart","0")' v-model="formData.createTimeStart" class='only' v-if="formIndex == 13"  placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeEnd","0")' v-model="formData.createTimeEnd" class='only' v-if="formIndex == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startAuditorTime","0")' v-model="formData.startAuditorTime" class='only' v-if="formIndex == 14"  placeholder="请输入审核时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endAuditorTime","0")' v-model="formData.endAuditorTime" class='only' v-if="formIndex == 14" placeholder="请输入审核时间" size="large"></DatePicker>
								<Input v-model="formData.clientPhone" type="text" v-if="formIndex == 15" placeholder="请输入手机号！" size="large"></Input>
								<Input v-model="formData.bankWaterId" type="text" v-if="formIndex == 16" placeholder="请输入流水号！" size="large"></Input>
								<Select v-model="formData.typeName" v-if="formIndex == 17" placeholder="请选择类型！" size="large" class="twoSelect">
									<Option value="退款">退款</Option>
									<Option value="存对公">存对公</Option>
								</Select>
							</FormItem>
							<!-- 第一个下来筛选栏 -->
							<FormItem class="block-tips">
								<Select size="large" v-model="formIndex1" class="prepend" @on-change="selectChange($event,'1')" @on-open-change="clearVal($event,'1')">
									<Option value="0" v-show="formIndex !=0 && formIndex2 !=0 && formIndex3 !=0">合同编号</Option><Option value="1" v-show="formIndex1 !=1 && formIndex2 !=1 && formIndex3 !=1">客户姓名</Option>
									<Option value="2" v-show="formIndex !=2 && formIndex2 !=2 && formIndex3 !=2">身份证号</Option><Option value="3" v-show="formIndex1 !=3 && formIndex2 !=3 && formIndex3 !=3">金额范围</Option>
									<Option value="4" v-show="formIndex !=4 && formIndex2 !=4 && formIndex3 !=4">对方户名</Option><Option value="5" v-show="formIndex1 !=5 && formIndex2 !=5 && formIndex3 !=5">对方账户</Option>
									<Option value="6" v-show="formIndex !=6 && formIndex2 !=6 && formIndex3 !=6">申请人</Option><Option value="7" v-show="formIndex1 !=7 && formIndex2 !=7 && formIndex3 !=7">状态</Option>
									<Option value="8" v-show="formIndex !=8 && formIndex2 !=8 && formIndex3 !=8">营业部</Option><Option value="9" v-show="formIndex1 !=9 && formIndex2 !=9 && formIndex3 !=9">渠道</Option>
									<Option value="10" v-show="formIndex !=10 && formIndex2 !=10 && formIndex3 !=10">存入银行</Option><Option value="11" v-show="formIndex1 !=11 && formIndex2 !=11 && formIndex3 !=11">主体</Option>
									<Option value="12" v-show="formIndex !=12 && formIndex2 !=12 && formIndex3 !=12">到账时间</Option><Option value="13" v-show="formIndex1 !=13 && formIndex2 !=13 && formIndex3 !=13">申请时间</Option>
									<Option value="14" v-show="formIndex !=14 && formIndex2 !=14 && formIndex3 !=14">审核时间</Option><Option value="15" v-show="formIndex1 !=15 && formIndex2 !=15 && formIndex3 !=15">手机号</Option>
									<Option value="16" v-show="formIndex !=16 && formIndex2 !=16 && formIndex3 !=16">流水号</Option><Option value="17" v-show="formIndex1 !=17 && formIndex2 !=17 && formIndex3 !=17">类型</Option>
								</Select>
								<Input v-model="formData1.loanContractNo" type="text" v-if="formIndex1 == 0" placeholder="请输入合同编号！" size="large"></Input>
								<Input v-model="formData1.clientName" type="text" v-if="formIndex1 == 1" placeholder="请输入客户姓名！" size="large"></Input>
								<Input v-model="formData1.clientIdCard" type="text" v-if="formIndex1 == 2" placeholder="请输入身份证号！" size="large"></Input>
								<Input v-model="formData1.amountMin" class='only' v-show="formIndex1 == 3"  type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData1.amountMax" class='only' v-show="formIndex1 == 3" type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData1.clientBankName" type="text" v-if="formIndex1 == 4" placeholder="请输入对方户名！" size="large"></Input>
								<Input v-model="formData1.clientBankNo" type="text" v-if="formIndex1 == 5" placeholder="请输入对方账户！" size="large"></Input>
								<Input v-model="formData1.commitPeople" type="text" v-if="formIndex1 == 6" placeholder="请输入申请人！" size="large"></Input>
								<Select v-model="formData1.status" v-if="formIndex1 == 7" placeholder="请选择状态！" size="large" class="twoSelect">
									<Option value="1">通过</Option>
									<Option value="2">未匹配</Option>
									<Option value="3">拒绝</Option>
									<Option value="4">审核中</Option>
								</Select>
								<Select v-model="formData1.belongOrgNo" @on-open-change="getDictList($event,'belongOrgNoList')" v-if="formIndex1 == 8" placeholder="请选择营业部！" size="large" class="twoSelect">
									<Option v-for="item in distList.belongOrgNoList" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-model="formData1.channelName" type="text" v-if="formIndex1 == 9" placeholder="请输入渠道！" size="large"></Input>
								<Input v-model="formData1.bankNoSelf" type="text" v-if="formIndex1 == 10" placeholder="请输入存入银行！" size="large"></Input>
								<Select v-model="formData1.mainBody" @on-open-change="getDictList($event,'mainBody')" v-if="formIndex1 == 11" placeholder="请选择主体！" size="large" class="twoSelect">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type.toUpperCase()">{{item.value}}</Option>
								</Select>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startTradeTime","1")' v-model="formData1.startTradeTime" class='only' v-if="formIndex1 == 12"  placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endTradeTime","1")' v-model="formData1.endTradeTime" class='only' v-if="formIndex1 == 12" placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeStart","1")' v-model="formData1.createTimeStart" class='only' v-if="formIndex1 == 13"  placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeEnd","1")' v-model="formData1.createTimeEnd" class='only' v-if="formIndex1 == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startAuditorTime","1")' v-model="formData1.startAuditorTime" class='only' v-if="formIndex1 == 14"  placeholder="请输入审核时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endAuditorTime","1")' v-model="formData1.endAuditorTime" class='only' v-if="formIndex1 == 14" placeholder="请输入审核时间" size="large"></DatePicker>
								
								<Input v-model="formData1.clientPhone" type="text" v-if="formIndex1 == 15" placeholder="请输入手机号！" size="large"></Input>
								<Input v-model="formData1.bankWaterId" type="text" v-if="formIndex1 == 16" placeholder="请输入流水号！" size="large"></Input>
								<Select v-model="formData1.typeName" v-if="formIndex1 == 17" placeholder="请选择类型！" size="large" class="twoSelect">
									<Option value="退款">退款</Option>
									<Option value="存对公">存对公</Option>
								</Select>
							</FormItem>
							<!-- 第二个下拉筛选栏 -->
							<FormItem class="block-tips">
								<Select size="large" v-model="formIndex2" class="prepend" @on-change="selectChange($event,'2')" @on-open-change="clearVal($event,'2')">
									<Option value="0" v-show="formIndex1 !=0 && formIndex !=0 && formIndex3 !=0">合同编号</Option><Option value="1" v-show="formIndex1 !=1 && formIndex2 !=1 && formIndex3 !=1">客户姓名</Option>
									<Option value="2" v-show="formIndex1 !=2 && formIndex !=2 && formIndex3 !=2">身份证号</Option><Option value="3" v-show="formIndex1 !=3 && formIndex2 !=3 && formIndex3 !=3">金额范围</Option>
									<Option value="4" v-show="formIndex1 !=4 && formIndex !=4 && formIndex3 !=4">对方户名</Option><Option value="5" v-show="formIndex1 !=5 && formIndex2 !=5 && formIndex3 !=5">对方账户</Option>
									<Option value="6" v-show="formIndex1 !=6 && formIndex !=6 && formIndex3 !=6">申请人</Option><Option value="7" v-show="formIndex1 !=7 && formIndex2 !=7 && formIndex3 !=7">状态</Option>
									<Option value="8" v-show="formIndex1 !=8 && formIndex !=8 && formIndex3 !=8">营业部</Option><Option value="9" v-show="formIndex1 !=9 && formIndex2 !=9 && formIndex3 !=9">渠道</Option>
									<Option value="10" v-show="formIndex1 !=10 && formIndex !=10 && formIndex3 !=10">存入银行</Option><Option value="11" v-show="formIndex1 !=11 && formIndex2 !=11 && formIndex3 !=11">主体</Option>
									<Option value="12" v-show="formIndex1 !=12 && formIndex !=12 && formIndex3 !=12">到账时间</Option><Option value="13" v-show="formIndex1 !=13 && formIndex2 !=13 && formIndex3 !=13">申请时间</Option>
									<Option value="14" v-show="formIndex1 !=14 && formIndex !=14 && formIndex3 !=14">审核时间</Option><Option value="15" v-show="formIndex1 !=15 && formIndex2 !=15 && formIndex3 !=15">手机号</Option>
									<Option value="16" v-show="formIndex1 !=16 && formIndex !=16 && formIndex3 !=16">流水号</Option><Option value="17" v-show="formIndex1 !=17 && formIndex2 !=17 && formIndex3 !=17">类型</Option>
								</Select>
								<Input v-model="formData2.loanContractNo" type="text" v-if="formIndex2 == 0" placeholder="请输入合同编号！" size="large"></Input>
								<Input v-model="formData2.clientName" type="text" v-if="formIndex2 == 1" placeholder="请输入客户姓名！" size="large"></Input>
								<Input v-model="formData2.clientIdCard" type="text" v-if="formIndex2 == 2" placeholder="请输入身份证号！" size="large"></Input>
								<Input v-model="formData2.amountMin" class='only' v-show="formIndex2 == 3"  type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData2.amountMax" class='only' v-show="formIndex2 == 3" type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData2.clientBankName" type="text" v-if="formIndex2 == 4" placeholder="请输入对方户名！" size="large"></Input>
								<Input v-model="formData2.clientBankNo" type="text" v-if="formIndex2 == 5" placeholder="请输入对方账户！" size="large"></Input>
								<Input v-model="formData2.commitPeople" type="text" v-if="formIndex2 == 6" placeholder="请输入申请人！" size="large"></Input>
								<Select v-model="formData2.status" v-if="formIndex2 == 7" placeholder="请选择状态！" size="large" class="twoSelect">
									<Option value="1">通过</Option>
									<Option value="2">未匹配</Option>
									<Option value="3">拒绝</Option>
									<Option value="4">审核中</Option>
								</Select>
								<Select v-model="formData2.belongOrgNo" @on-open-change="getDictList($event,'belongOrgNoList')" v-if="formIndex2 == 8" placeholder="请选择营业部！" size="large" class="twoSelect">
									<Option v-for="item in distList.belongOrgNoList" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-model="formData2.channelName" type="text" v-if="formIndex2 == 9" placeholder="请输入渠道！" size="large"></Input>
								<Input v-model="formData2.bankNoSelf" type="text" v-if="formIndex2 == 10" placeholder="请输入存入银行！" size="large"></Input>
								<Select v-model="formData2.mainBody" @on-open-change="getDictList($event,'mainBody')" v-if="formIndex2 == 11" placeholder="请选择主体！" size="large" class="twoSelect">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type.toUpperCase()">{{item.value}}</Option>
								</Select>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startTradeTime","2")' v-model="formData2.startTradeTime" class='only' v-if="formIndex2 == 12"  placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endTradeTime","2")' v-model="formData2.endTradeTime" class='only' v-if="formIndex2 == 12" placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeStart","2")' v-model="formData2.createTimeStart" class='only' v-if="formIndex2 == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeEnd","2")' v-model="formData2.createTimeEnd" class='only' v-if="formIndex2 == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startAuditorTime","2")' v-model="formData2.startAuditorTime" class='only' v-if="formIndex2 == 14" placeholder="请输入审核时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endAuditorTime","2")' v-model="formData2.endAuditorTime" class='only' v-if="formIndex2 == 14" placeholder="请输入审核时间" size="large"></DatePicker>
								
								<Input v-model="formData2.clientPhone" type="text" v-if="formIndex2 == 15" placeholder="请输入手机号！" size="large"></Input>
								<Input v-model="formData2.bankWaterId" type="text" v-if="formIndex2 == 16" placeholder="请输入流水号！" size="large"></Input>
								<Select v-model="formData2.typeName" v-if="formIndex2 == 17" placeholder="请选择类型！" size="large" class="twoSelect">
									<Option value="退款">退款</Option>
									<Option value="存对公">存对公</Option>
								</Select>
							</FormItem>
							<!-- 第三个下拉筛选框 -->
							<FormItem class="block-tips">
								<Select size="large" v-model="formIndex3" class="prepend" @on-change="selectChange($event,'3')" @on-open-change="clearVal($event,'3')">
									<Option value="0" v-show="formIndex1 !=0 && formIndex2 !=0 && formIndex !=0">合同编号</Option><Option value="1" v-show="formIndex1 !=1 && formIndex2 !=1 && formIndex3 !=1">客户姓名</Option>
									<Option value="2" v-show="formIndex1 !=2 && formIndex2 !=2 && formIndex !=2">身份证号</Option><Option value="3" v-show="formIndex1 !=3 && formIndex2 !=3 && formIndex3 !=3">金额范围</Option>
									<Option value="4" v-show="formIndex1 !=4 && formIndex2 !=4 && formIndex !=4">对方户名</Option><Option value="5" v-show="formIndex1 !=5 && formIndex2 !=5 && formIndex3 !=5">对方账户</Option>
									<Option value="6" v-show="formIndex1 !=6 && formIndex2 !=6 && formIndex !=6">申请人</Option><Option value="7" v-show="formIndex1 !=7 && formIndex2 !=7 && formIndex3 !=7">状态</Option>
									<Option value="8" v-show="formIndex1 !=8 && formIndex2 !=8 && formIndex !=8">营业部</Option><Option value="9" v-show="formIndex1 !=9 && formIndex2 !=9 && formIndex3 !=9">渠道</Option>
									<Option value="10" v-show="formIndex1 !=10 && formIndex2 !=10 && formIndex !=10">存入银行</Option><Option value="11" v-show="formIndex1 !=11 && formIndex2 !=11 && formIndex3 !=11">主体</Option>
									<Option value="12" v-show="formIndex1 !=12 && formIndex2 !=12 && formIndex !=12">到账时间</Option><Option value="13" v-show="formIndex1 !=13 && formIndex2 !=13 && formIndex3 !=13">申请时间</Option>
									<Option value="14" v-show="formIndex1 !=14 && formIndex2 !=14 && formIndex !=14">审核时间</Option><Option value="15" v-show="formIndex1 !=15 && formIndex2 !=15 && formIndex3 !=15">手机号</Option>
									<Option value="16" v-show="formIndex1 !=16 && formIndex2 !=16 && formIndex !=16">流水号</Option><Option value="17" v-show="formIndex1 !=17 && formIndex2 !=17 && formIndex3 !=17">类型</Option>
								</Select>
								<Input v-model="formData3.loanContractNo" type="text" v-if="formIndex3 == 0" placeholder="请输入合同编号！" size="large"></Input>
								<Input v-model="formData3.clientName" type="text" v-if="formIndex3 == 1" placeholder="请输入客户姓名！" size="large"></Input>
								<Input v-model="formData3.clientIdCard" type="text" v-if="formIndex3 == 2" placeholder="请输入身份证号！" size="large"></Input>
								<Input v-model="formData3.amountMin" class='only' v-show="formIndex3 == 3"  type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData3.amountMax" class='only' v-show="formIndex3 == 3" type="text" placeholder="请输入金额范围" size="large"></Input>
								<Input v-model="formData3.clientBankName" type="text" v-if="formIndex3 == 4" placeholder="请输入对方户名！" size="large"></Input>
								<Input v-model="formData3.clientBankNo" type="text" v-if="formIndex3 == 5" placeholder="请输入对方账户！" size="large"></Input>
								<Input v-model="formData3.commitPeople" type="text" v-if="formIndex3 == 6" placeholder="请输入申请人！" size="large"></Input>
								<Select v-model="formData3.status" v-if="formIndex3 == 7" placeholder="请选择状态！" size="large" class="twoSelect">
									<Option value="1">通过</Option>
									<Option value="2">未匹配</Option>
									<Option value="3">拒绝</Option>
									<Option value="4">审核中</Option>
								</Select>
								<Select v-model="formData3.belongOrgNo" @on-open-change="getDictList($event,'belongOrgNoList')" v-if="formIndex3 == 8" placeholder="请选择营业部！" size="large" class="twoSelect">
									<Option v-for="item in distList.belongOrgNoList" :key="item.idKey" :value="item.shortName">{{item.groupName}}</Option>
								</Select>
								<Input v-model="formData3.channelName" type="text" v-if="formIndex3 == 9" placeholder="请输入渠道！" size="large"></Input>
								<Input v-model="formData3.bankNoSelf" type="text" v-if="formIndex3 == 10" placeholder="请输入存入银行！" size="large"></Input>
								<Select v-model="formData3.mainBody" @on-open-change="getDictList($event,'mainBody')" v-if="formIndex3 == 11" placeholder="请选择主体！" size="large" class="twoSelect">
									<Option v-for="item in distList.mainBody" :key="item.idKey" :value="item.type.toUpperCase()">{{item.value}}</Option>
								</Select>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startTradeTime","3")' v-model="formData3.startTradeTime" class='only' v-if="formIndex3 == 12"  placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endTradeTime","3")' v-model="formData3.endTradeTime" class='only' v-if="formIndex3 == 12" placeholder="请输入到账时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeStart","3")' v-model="formData3.createTimeStart" class='only' v-if="formIndex3 == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"createTimeEnd","3")' v-model="formData3.createTimeEnd" class='only' v-if="formIndex3 == 13" placeholder="请输入申请时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"startAuditorTime","3")' v-model="formData3.startAuditorTime" class='only' v-if="formIndex3 == 14"  placeholder="请输入审核时间" size="large"></DatePicker>
								<DatePicker type="date" format="yyyy-MM-dd" @on-change='dateChange($event,"endAuditorTime","3")' v-model="formData3.endAuditorTime" class='only' v-if="formIndex3 == 14" placeholder="请输入审核时间" size="large"></DatePicker>
								
								<Input v-model="formData3.clientPhone" type="text" v-if="formIndex3 == 15" placeholder="请输入手机号！" size="large"></Input>
								<Input v-model="formData3.bankWaterId" type="text" v-if="formIndex3 == 16" placeholder="请输入流水号！" size="large"></Input>
								<Select v-model="formData3.typeName" v-if="formIndex3 == 17" placeholder="请选择类型！" size="large" class="twoSelect">
									<Option value="退款">退款</Option>
									<Option value="存对公">存对公</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search">查询</Button>
								<Button @click="resert()"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button @click="importData()"><Icon></Icon>导出数据</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height="396" border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" :current="LastSubmitData.pageIndex" :page-size="LastSubmitData.pageSize"
				
				show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click='Refresh'/>
			</div>
		</div>
		<!-- 匹配弹窗 -->
		<Modal v-model='matching' draggable :mask-closable="false" :scrollable="true" class='matching' :title="titleModal">
			<div class='d-content'>
				<p class='P-title'>流水信息</p>
				<div class="table-item">
					<Table border :stripe="true" :columns="columnsWaterInfo" :data="datasWaterInfo"></Table>
				</div>
			</div>
			
			<div class='d-content d-contents'>
				<p class='P-title'>合同信息</p>
				<div class="from-items">
					<Form inline label-position="right">
						<FormItem label="合同编号" class="blocks-tips">
							<Input :disabled="look_modal" placeholder="请输入合同编号" v-model="LonSubmitData.loanContractNo"></Input>
						</FormItem>
						<FormItem>
							<Button :disabled="look_modal" type="primary" @click='Modal_Search'>查询</Button>
						</FormItem>
					</Form>
				</div>
				<!-- 公共tab样式类 tabs-item -->
				<div class="table-warper">
					<div class="table-item">
						<Table border :columns="columnsWaterLonInfo" :data="dataLonInfoData"></Table>
					</div>
				</div>
			</div>
			
			<div class='d-content d-contents'>
				<p class='P-title'>上传支付凭证</p>
				<div class="from-items">
					<Form inline label-position="right">
						<FormItem label="支付凭证" class="upLoad blocks-tips">
							<!-- 文件上传类 -->
							<div id="uploadFile">
								<input :disabled="look_modal" class="file" @change="getUploadImg" type="file" accept="image/*" multiple ref="uploads" />
								<div class="upload-drag" @click="uploadsFile">
									<Icon type="ios-camera" size="26" />
								</div>
							</div>
						</FormItem>
					</Form>
				</div>
				<div class="table-warper">
					<div class="table-item">
						<Table border :columns="columnsPayment" :data="dataPayment"></Table>
					</div>
				</div>
			</div>
			
			<div class='d-content' v-if='Edit_Modal'>
				<p class='P-title'>处理意见</p>
				<div class="table-item">
					<Table border :stripe="true" :columns="columnsOpinion" :data="dataOpinion"></Table>
				</div>
			</div>
			
			<div class='d-content d-contents'>
				<p class='P-title'>备注</p>
				<div class="from-items textareaTip">
					<Form inline label-position="right">
						<FormItem label="备注" class="blocks-tips">
							<Input style="width:330px!important"
							:disabled="look_modal" type="textarea" :autosize="{minRows: 4,maxRows: 5}" :maxlength="500"
							placeholder="请输入备注" v-model="flowMatchSubmitDto.remarks"></Input>
						</FormItem>
					</Form>
				</div>
			</div>
			
			<div slot="footer">
				<Button type="text" size="large" @click="matching = false">取消</Button>
				<Button type="primary" size="large" @click="Submit_File" v-show="!look_modal">保存</Button>
			</div>
		</Modal>
		<!-- 文件上传预览 -->
		<Modal draggable :title="'预览图片'+fileObj.fileName" v-model="fileObj.filesModel">
	     <img :src="fileObj.imgName" v-if="fileObj.filesModel" style="width: 100%">
	   </Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default{
		data(){
			return{
				titleModal:'匹配',
				rotate: true,
				showMe: '1', //默认展开
				isActive: true,
				formData:{
					loanContractNo:"", //合同号
					clientName:"",//客户姓名
					clientIdCard:"",//身份证号
					amountMin:"", //金额-小
					amountMax:"", //金额-大
					clientBankName:"",//对方账户名
					clientBankNo:"",//对方账号
					commitPeople:"", //申请人
					status:"",//状态
					belongOrgNo:"",//营业部
					channelName:"",//渠道
					bankNoSelf:"",//存入银行
					mainBody:"",//主体
					startTradeTime:'', // 开始到账时间
					endTradeTime:'',	// 结束到账时间
					createTimeStart:'', //开始提交时间
					createTimeEnd:'',	//结束提交时间
					startAuditorTime:'', //开始审核时间
					endAuditorTime:'',	//结束审核时间
					clientPhone:'', //客户手机号码
					typeName:'',//类型
					bankWaterId:'',
				},
				formData1:{
					loanContractNo:"", //合同号
					clientName:"",//客户姓名
					clientIdCard:"",//身份证号
					amountMin:"", //金额-小
					amountMax:"", //金额-大
					clientBankName:"",//对方账户名
					clientBankNo:"",//对方账号
					commitPeople:"", //申请人
					status:"",//状态
					belongOrgNo:"",//营业部
					channelName:"",//渠道
					bankNoSelf:"",//存入银行
					mainBody:"",//主体
					startTradeTime:'', // 开始到账时间
					endTradeTime:'',	// 结束到账时间
					createTimeStart:'', //开始提交时间
					createTimeEnd:'',	//结束提交时间
					startAuditorTime:'', //开始审核时间
					endAuditorTime:'',	//结束审核时间
					clientPhone:'', //客户手机号码
					typeName:'',//类型
					bankWaterId:'',
				},
				formData2:{
					loanContractNo:"", //合同号
					clientName:"",//客户姓名
					clientIdCard:"",//身份证号
					amountMin:"", //金额-小
					amountMax:"", //金额-大
					clientBankName:"",//对方账户名
					clientBankNo:"",//对方账号
					commitPeople:"", //申请人
					status:"",//状态
					belongOrgNo:"",//营业部
					channelName:"",//渠道
					bankNoSelf:"",//存入银行
					mainBody:"",//主体
					startTradeTime:'', // 开始到账时间
					endTradeTime:'',	// 结束到账时间
					createTimeStart:'', //开始提交时间
					createTimeEnd:'',	//结束提交时间
					startAuditorTime:'', //开始审核时间
					endAuditorTime:'',	//结束审核时间
					clientPhone:'', //客户手机号码
					typeName:'',//类型
					bankWaterId:'',
				},
				formData3:{
					loanContractNo:"", //合同号
					clientName:"",//客户姓名
					clientIdCard:"",//身份证号
					amountMin:"", //金额-小
					amountMax:"", //金额-大
					clientBankName:"",//对方账户名
					clientBankNo:"",//对方账号
					commitPeople:"", //申请人
					status:"",//状态
					belongOrgNo:"",//营业部
					channelName:"",//渠道
					bankNoSelf:"",//存入银行
					mainBody:"",//主体
					startTradeTime:'', // 开始到账时间
					endTradeTime:'',	// 结束到账时间
					createTimeStart:'', //开始提交时间
					createTimeEnd:'',	//结束提交时间
					startAuditorTime:'', //开始审核时间
					endAuditorTime:'',	//结束审核时间
					clientPhone:'', //客户手机号码
					typeName:'',//类型
					bankWaterId:'',
				},
				LastSubmitData:{
					pageIndex:1,
					pageSize:10,
				},
				formIndex:'0',
				formIndex1:'1',
				formIndex2:'2',
				formIndex3:'3',
				distList:{
					mainBody:[],
					belongOrgNoList:[]
				},
				columns:[
					{title:'序号',minWidth:70,type:'index'},{title:'主体',minWidth:70,key: 'waterMainBody'},{title:'到账时间',minWidth:150,key: 'tradeTime'},
					{title:'存入银行',minWidth:160,key: 'bankNoSelf'},{title:'合同号',minWidth:160,key: 'loanContractNo'},{title:'客户姓名',minWidth:90,key: 'clientName'},
					{title:'归属营业部',minWidth:100,key: 'belongOrgNo'},{title:'渠道',minWidth:100,key: 'channelName'},{title:'金额',minWidth:100,key: 'amount'},
					{title:'对方账户',minWidth:170,key: 'clientBankNo'},{title:'对方户名',minWidth:140,key: 'clientBankName'},{title:'存入银行',minWidth:140,key: 'openOrgBank'},
					{title:'摘要',minWidth:150,key: 'remarks'},{title:'提交人',minWidth:90,key: 'commitPeople'},{title:'提交时间',minWidth:100,key: 'createTime'},
					{title:"审核人",key:'auditorPeople',minWidth:100},
					{title:"审核时间",key:'auditorTime',minWidth:100},
					{title:"匹配方式",key:'matchType',minWidth:100},
					{title:"类型",key:'typeName',minWidth:100},
					{title:"申请部门",key:'jobNo',minWidth:100},
					{title:"账单日",key:'monthPayDate',minWidth:100},
					{title:"应还总额",key:'overdueAllAmt',minWidth:100},
					{title:"商户名称",key:'merchantName',minWidth:170},
					{title:'附件',minWidth:120,key: 'accessory'},
					{title:'状态',minWidth:100,key: 'status'},
					{title: '操作',minWidth:100,fixed:'right',render:(h,params)=>{
						return h('div',[
								h('Button',{
									props:{
										size:'small',type: 'info',
										disabled:this.matching
									},
									style:{
										display:params.row.status == '未匹配'? 'inline-block' : 'none'
									},
									on:{
										click:()=>{
											this.titleModal = '匹配';
											this.SetData(params,'pipei');
											this.Edit_Modal = false;
										}
									},
								},'匹配'),
								h('Button',{
									props:{size:'small',type: 'info',disabled:this.matching},
									style:{
										margin:'0 5px',
										display:( params.row.status == '审核中' || params.row.status == '通过') ? 'inline-block' : 'none',
									},
									on:{
										click:()=>{
											this.titleModal = '详情';
											this.SetData(params,'chakan');
											this.Edit_Modal = false;
										}
									}
								},'详情'),
								h('Button',{
									props:{
										size:'small',type: 'info',disabled:this.matching
									},
									style:{
										display:params.row.status == '拒绝'? 'inline-block' : 'none'
									},
									on:{
										click:()=>{
											this.titleModal = '修改';
											this.SetData(params,'xiugai')
											this.Edit_Modal = true
										}
									}
								},'修改')
							])
					}}
				],
				datas:[],
				// -----------------弹窗数据(匹配)
				columnsWaterInfo:[ //流水信息
					{title:'主体',minWidth:100,key: 'waterMainBody'},{title:'到账日期',minWidth:150,key: 'tradeTime'},
					{title:'渠道',minWidth:100,key: 'channelName'},
					{title:'对方户名',minWidth:100,key: 'clientBankName'},{title:'对方账户',minWidth:190,key: 'clientBankNo'},
					{title:'金额',minWidth:100,key: 'amount'},{title:'摘要',minWidth:100,key: 'remarks'},
				],
				datasWaterInfo:[],
				columnsWaterLonInfo:[//合同信息
					{title:'主体',minWidth:100,key: 'mainBody'},{title:'营业部',minWidth:100,key: 'belongOrgNo'},
					{title:'合同号',minWidth:160,key: 'loanContractNo'},{title:'客户姓名',minWidth:100,key: 'clientName'},
					{title:'身份证号码',minWidth:100,key: 'clientIdCard',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.clientIdCard))
						}
					},{title:'手机号',minWidth:100,key: 'clientPhone',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.clientPhone))
						}
					}
				],
				dataLonInfoData:[],
				columnsPayment:[//支付凭证
					{title:'附件名称',minWidth:100,key: 'fileName'},
					{
						title:'附件大小',minWidth:100,render:(h,params)=>{
							return h('div',[
								h('span',{},(params.row.fileSize/1024) < 1 ? '1kb' : (params.row.fileSize/1024).toFixed(2)+'kb')
							]);
						}
					},
					{title:'上传时间',minWidth:160,key: 'uploadTime'},{title:'申请人',minWidth:100,key: 'createName'},
					{title:'申请人编码',minWidth:100,key: 'createId'},
					{title:'操作',minWidth:100,render:(h,params)=>{
						return h('div',[
							h('Button',{
								props:{size:'small',type: 'info'},
								on:{
									click:()=>{
										this.fileObj.imgName = params.row.filePath
										this.fileObj.fileName = params.row.fileName;
										this.fileObj.filesModel = true
										}
									},
								},'预览'),
							h('Button',{
								props:{size:'small',type: 'error'},
								style:{
									marginLeft:'5px',
									display:this.titleModal == '详情'  ? 'none' : 'inline-block'
								},
								on:{
									click:()=>{
											this.deleteListUpload(params.row.fileKey);
										}
									},
								},'删除')
							])
						}
					}
				],
				dataPayment1:[],
				dataPayment:[],
				
				columnsOpinion:[//处理意见
					{title:'处理结果',minWidth:100,key: 'handleOpinion'},{title:'备注',minWidth:100,key: 'remarks'},
					{title:'处理人',minWidth:100,key: 'auditorPeople'},{title:'处理时间',minWidth:100,key: 'auditorTime'},
				],
				dataOpinion:[],
				totallPages: 10,
				matching:false,
				LonSubmitData:{ //根据合同号查询信息
					"loanContractNo":"",
					"serialNumber":""
				},
				fileObj:{//新增文件上传返回类
					uploadList: [],
					filesModel:false,
					imgName:'',
				},
				flowMatchSubmitDto:{
					  "fileInfo":[],
					  "loanContractNo": "",
						"serialNumber": "",
						"remarks":"",//备注
				},
				Edit_Modal: false, //是否编辑
				look_modal:false, //查看
				maxlength:500, //备注的最大长度
				ifOpenLoan:false,//是否查询匹配
			}
		},
		methods:{
			//列表数据默认查询
			init(pageIndex,pageSize){
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post','flowMatchingFlowMatchList',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res&& res.data.status == 200){				
						this.datas = res.data.data.data
					}
				});
			},
			//数据总条数查询
			DataCount(pageIndex,pageSize){
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize
				this.HttpAjax('post','flowMatchingFlowMatchListCount',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.totallPages = res.data.data
					}
				},'count')
			},
			//列表查询（筛选
			search(){
				this.LastSubmitData = {}
				this.LastSubmitData.pageIndex = 1;
				this.LastSubmitData.pageSize = 10;
				for(let i in  this.formData){//第0个对象
					if(this.formData[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData[i])
					}
				}
				for(let i in  this.formData1){//第1个对象
					if(this.formData1[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData1[i])
					}
				}
				for(let i in  this.formData2){//第2对象
					if(this.formData2[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData2[i])
					}
				}
				for(let i in  this.formData3){//第3个对象
					if(this.formData3[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData3[i])
					}
				}

				if(this.LastSubmitData.amountMin && this.LastSubmitData.amountMax){
					if(this.LastSubmitData.amountMin != '' && this.LastSubmitData.amountMax !== ''){
						if(parseInt(this.LastSubmitData.amountMin) > parseInt(this.LastSubmitData.amountMax)){
							this.$layer.msg('最小金额必须小于最大金额');
							return false;
						}
					}
				}

				if(this.LastSubmitData.startTradeTime && this.LastSubmitData.endTradeTime){
					if(this.LastSubmitData.startTradeTime != '' && this.LastSubmitData.endTradeTime !== ''){
						if(parseInt(this.LastSubmitData.startTradeTime.split('-').join('')) > parseInt(this.LastSubmitData.endTradeTime.split('-').join(''))){
							this.$layer.msg('开始到账时间必须小于结束到账时间');
							return false;
						}
					}
				}
				if(this.LastSubmitData.createTimeStart && this.LastSubmitData.createTimeEnd){
					if(this.LastSubmitData.createTimeStart != '' && this.LastSubmitData.createTimeEnd !== ''){
						if(parseInt(this.LastSubmitData.createTimeStart.split('-').join('')) > parseInt(this.LastSubmitData.createTimeEnd.split('-').join(''))){
							this.$layer.msg('开始申请时间必须小于结束申请时间');
							return false;
						}
					}
				}
				if(this.LastSubmitData.startAuditorTime && this.LastSubmitData.endAuditorTime){
					if(this.LastSubmitData.startAuditorTime != '' && this.LastSubmitData.endAuditorTime !== ''){
						if(parseInt(this.LastSubmitData.startAuditorTime.split('-').join('')) > parseInt(this.LastSubmitData.endAuditorTime.split('-').join(''))){
							this.$layer.msg('开始审核时间必须小于结束审核时间');
							return false;
						}
					}
				};
				
				this.init()
				this.DataCount();
			},
			//页码改变
			changePages(pageIndex){
				this.LastSubmitData.pageIndex = pageIndex;
				this.init()
			},
			//每页总条数切换
			changePagesTotall(pageSize){
				this.LastSubmitData.pageSize = pageSize;
				this.init()
			},
			// 刷新按钮
			Refresh(){
				this.init()
				this.DataCount();
			},
			//重置
			resert(refs){
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.init();
				this.DataCount();
			},
			// 清空对象
			ClearObject(Object) {
				for (let i in Object) { //置空，除了pageIndex和pageSize
					if (i != 'pageIndex' && i != 'pageSize') {
						Object[i] = '';
					}
				}
			},
			// ------------------弹窗
			// 按钮点击
			SetData(params,type){
				this.look_modal = false
				this.datasWaterInfo=[];this.dataLonInfoData=[];this.dataOpinion = [];
				this.flowMatchSubmitDto.remarks = params.row.remarks;
				this.LonSubmitData.serialNumber = params.row.bankWaterId // params.row.bankWaterId
				this.datasWaterInfo.push(params.row)
				this.matching = true;
				this.LonSubmitData.loanContractNo = params.row.loanContractNo;
				if(type== 'xiugai'){
					this.GetImgTitle(params.row.bankWaterId); //查询附件
					this.Modal_Search();
					this.dataOpinion.push(params.row)
				}else if(type== 'chakan'){
					this.look_modal = true
					this.GetImgTitle(params.row.bankWaterId); //查询附件
					this.dataLonInfoData.push(params.row)
					this.dataOpinion.push(params.row)
				}else if(type == 'pipei'){
					this.dataPayment = []
				};
			},
			//弹窗查询
			Modal_Search(){
				this.ifOpenLoan = false;
				this.dataLonInfoData.splice(0);
				if(this.LonSubmitData.loanContractNo != '' && this.LonSubmitData.loanContractNo != null){
					this.HttpAjax('post','flowMatchingCheckFlowMatching',this.LonSubmitData,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == 200){
							this.dataLonInfoData.push(res.data.data);
							this.ifOpenLoan = true;
						}
					},'json');
				}
			},
			//附件信息查询
			GetImgTitle(serialNumber){
				this.HttpAjax('post','flowMatchingSelectMatchFile',{'serialNumber':serialNumber},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.dataPayment = res.data.data
					}
				})
			},
			// 选择图片
			getUploadImg(e) {
				this.dataPayment1.splice(0)
				var File = e.target.files;
				var size = File.size;
				var formdata = new FormData();
				if(File.length > 10 || (this.dataPayment.length+File.length) >10){
					this.$layer.msg('最多只能上传10个文件！');
				}else{
					for(let i = 0; i < File.length; i++) {
						if(File[i].size > 20*1024*1024){
							this.$layer.msg('附件大小不能超过20M！');
							return;
						};
						if(File[i].type.indexOf('jpeg') == -1  && File[i].type.indexOf('png') == -1 && File[i].type.indexOf('jpg')==-1){
							this.$layer.msg('请上传png，jpg，jpeg格式的附件！');
							return;
						}
						formdata.append('files', File[i]);
						this.dataPayment1.push({
							edit:true,
							fileName:File[i].name,
							fileSize:File[i].size,
							uploadTime:new Date().getFullYear() +'年-' + (new Date().getMonth()+1) +'月-' + new Date().getDate()+'日'
						})
					};
					this.HttpAjax('post', 'upLoadImg', formdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res.data && res.data.status == 200) {
							for(let i=0;i<res.data.data.length;i++){
								if(res.data.data[i].fileName == File[i].name){
									this.$set(this.dataPayment1[i], 'fileKey' ,res.data.data[i].fileKey)
									this.$set(this.dataPayment1[i],'filePath',res.data.data[i].imgUrl)
								}
							}
						}else{
							this.dataPayment1 = []
						};
						this.toPushData(this.dataPayment1);
					}, 'file');
				}
			},
			//文件上传类
			uploadsFile() {
				const _ = this;
				if(this.titleModal == '详情'){
					return false;
				}
				if(!this.ifOpenLoan){
					this.$Notice.error({
						title:'错误',
						desc:'请先匹配合同信息'
					});
					return false;
				}
				let events = _.$refs.uploads;
				events.value = '';
				events.click();
			},//合并两个数组
			toPushData(row){
				for(let i in row){
					this.dataPayment.push(row[i]);
				}
			},//删除当前文件
			deleteListUpload(key){
				for(let i in this.dataPayment){
					if(this.dataPayment[i].fileKey == key){
						this.dataPayment.splice(i,1);
					}
				}
			},
			//提交按钮（匹配信息
			Submit_File(){
				let SubmitData={}
				SubmitData = {
					loanContractNo:this.LonSubmitData.loanContractNo,
					serialNumber:this.LonSubmitData.serialNumber,
					fileInfo: this.dataPayment,
					remarks: this.flowMatchSubmitDto.remarks
				}
				this.SubMit(SubmitData)
			},
			SubMit(SubmitData){
				if(SubmitData.fileInfo.length <= 0){
					this.$Notice.error({
						title:'错误',
						desc:'您至少得上传一条支付凭证！'
					});
					return false;
				}
				this.HttpAjax('post','flowMatchingSubmitFlowMatching',SubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status == 200){
						this.Edit_Modal = false;
						this.matching = false;
						this.$Notice.success({
							title:'成功',
							desc:this.titleModal == '匹配' ? '匹配成功！' : '修改匹配成功！'
						});
						this.search();
					}
				},'json')
			},
			//情况选中的值 @on-change="selectChange($event,'0')" @on-open-change="clearVal($event,'0')"
			clearVal(val,index){
				if(val){
					if(index == 0){
						this.ClearObject(this.formData)
					}else{
						this.ClearObject(this['formData'+index])
					}
				}
			},
			//选中值切换
			selectChange(val,index){
				if(index == 0){
					this.formIndex = val
				}else{
					this['formIndex'+index] = val
				}
			},
			dateChange(val,label,index){
				if(index == 0){
					this.formData[label] = val
				}else{
					this['formData'+index][label] = val
				}
				console.log(this['formData'+index][label])
			},
			getDictList(bol,label){
				const _=this;
				if(bol){
					if(_.distList[label].length <= 0){
						if(label != 'belongOrgNoList'){
							_.HttpAjax('post', 'distList', {
									label: label
								}, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									_.distList[label] = res.data.data;
							})
						}else{
							this.HttpAjax('post', 'getOrgNO', {}, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if (res && res.data.status == 200) {
									this.distList.belongOrgNoList = res.data.data
								}
							})
						}
					}
				}
			},
			//电话脱敏
			phoneZation(phone) {
				if(phone != '' && phone != null && phone != undefined){
					return phone.substring(0, 3) + '*****' + phone.substring(8, phone.length);
				}
			},//导出数据
			importData(){
				const _=this;
				this.LastSubmitData = {}
				for(let i in  this.formData){//第0个对象
					if(this.formData[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData[i])
					}
				}
				for(let i in  this.formData1){//第1个对象
					if(this.formData1[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData1[i])
					}
				}
				for(let i in  this.formData2){//第2对象
					if(this.formData2[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData2[i])
					}
				}
				for(let i in  this.formData3){//第3个对象
					if(this.formData3[i] != ''){
						this.$set(this.LastSubmitData, i, this.formData3[i])
					}
				}
				_.HttpAjax('post','flowMatchingFlowMatchListCount',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						if(res.data.data > 50000){
							_.$Notice.error({
								title:'导出失败',
								desc:"导出数量大于50000条，请筛选后再导出！"
							});
						}else{
							_.HttpAjax('post','flowMatchingExport',qs.stringify(this.LastSubmitData),(res)=>{
								store.commit('UPDATE_LOADINGSTATE', false);
								// 二进制流文件下载
								_.downLoadFile(res.data, '网银流水匹配数据.xlsx');
							}, 'download');
						}
					}
				},'count');
			}
		},
		mounted(){
			this.init();
			this.DataCount();
		}
	}
</script>

<style lang="less">
.BankingWater{
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
						.only.ivu-date-picker{
							.ivu-input-wrapper {
								width: 125px;
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
.matching{
	.P-title{
		font-size:15px;font-weight: bold;margin:10px 0 0 10px;
	}
	.d-content{
		border:1px solid #e2e2e2;
		margin-bottom:10px;
	}
	.d-content:first-child{
		margin-top:20px;
	}
	.table-item{
		margin:10px !important;
	}

	.ivu-modal{
		.ivu-modal-body .d-contents .from-items .ivu-form .upLoad{
			.ivu-form-item-label{
				height: 42px;width:;
				line-height: 20px !important;
			}
			.ivu-form-item-content{
				/* 文件上传类  */
				#uploadFile {
				  display: flex;
				  width: 100%;
				  min-width: 200px;
				}
				#uploadFile input.file {
				  display: none;
				}
				#uploadFile .upload-drag {
				  display: flex;
				  cursor: pointer;
				  width: 100px;
				  height: 40px;
				  border: 1px dashed #dcdee2;
				  justify-content: center;
				  align-items: center;
				}
				#uploadFile .upload-drag:hover {
				  border: 1px dashed #2d8cf0;
				}
				#uploadFile .upload-drag:hover .ivu-icon {
				  color: #2d8cf0;
				}
			}
		}
		min-width: 1600px !important;
		position: relative;
			.look_div{
				left:0;top:0;
				background: #dcdcdc;
				opacity: 0.3;
				position:absolute;
				width:80%;height:100%;
				z-index:100;
			}
			.ivu-modal-content {
				width: 1600px !important;
				.ivu-modal-body {
					max-height: 650px !important;
					.d-contents{
						.from-items {
							&.textareaTip {
								.ivu-form {
									.blocks-tips.ivu-form-item {
										.ivu-form-item-content {
											width: 330px!important
										}
									}
								}
							}
									
							padding-top: 10px;
							.ivu-form {
								display: inline-block;
								.blocks-tips.ivu-form-item {
									.ivu-form-item-label {
										border: 1px solid #dddee1;
										display: inline-block;
										line-height: 13px;
										border-right: 0;
										width: 100px;
										text-align: center;
									}
									.ivu-form-item-content {
										border: 1px solid #dddee1;
										display: inline-block;
										width: 190px!important;
										/* 下拉选择框 */
										.ivu-select {
											.ivu-select-selection {
												width: 100%;
												border: none;
												border-radius: 0;
											}
										}

										/* 输入框 */
										.ivu-input-wrapper {
											width: 190px!important;
											margin: 0;

											.ivu-input {
												border: none !important;
												width: 99% !important;
											}
										}
									}
								}
							}
						}
					}
					.table-warper {
						padding: 5px;
						padding-bottom: 0;
					}
				}

			}
	}
}
</style>