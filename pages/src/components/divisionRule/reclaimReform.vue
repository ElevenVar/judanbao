<template>
	<div class="reclaimReform">
		<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">回收改派</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个下拉选择框 -->
						<Form label-position="right" inline :model='allselect'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange" @on-open-change='ClearVal'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>案件状态</Option>
									<Option value='5' v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>是否特权包</Option>
									<Option value='6' v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>主体</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8'>逾期天数</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9'>案件分配日期</Option>
									<Option value="10" v-show='formIndex1 != 10 && formIndex2 != 10 && formIndex3 != 10'>永久催收员</Option>
									<Option value="11" v-show='formIndex1 != 11 && formIndex2 != 11 && formIndex3 != 11'>所属团队</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.loanName" size="large"></Input>
								<Input v-show="formIndex == 2" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
								<Input v-show="formIndex == 3" type="text" placeholder="请输入联系电话！" v-model="allselect.loanNamePhone" size="large"></Input>
								<Select v-show="formIndex == 4" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect.caseType"
								placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.urgeCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 5" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect.isSpecial"
								placeholder="请选择是否特权包！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 6" @on-open-change="getListDict($event,'mainBody')" v-model="allselect.mainBody"
								placeholder="请选择主体" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade"
								placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex == 8" v-model="allselect.overdueDayStart" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<Input class='only' v-show="formIndex == 8" v-model="allselect.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<DatePicker v-if="formIndex == 9" type="daterange" placement='bottom' placeholder="选择案件分配日期" :editable="false" size="large" @on-change='urgeInTimeChange($event,"")'
								format="yyyy-MM-dd" v-model="allselect.caseAllotTimeS">
								</DatePicker>
								<Input v-show="formIndex == 10" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect.foreverUrgeName"></Input>
								<Select v-show="formIndex == 11" @on-open-change="getTeamList($event,'getTeamList')" v-model="allselect.urgeTeamName"
								placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamName" :key="item.urgeTeamId">{{item.urgeTeamName}}
									</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第1个下拉选择框 -->
						<Form label-position="right" inline :model='allselect1'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange1" @on-open-change='ClearVal1'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>案件状态</Option>
									<Option value='5' v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>是否特权包</Option>
									<Option value='6' v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>主体</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8'>逾期天数</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9'>案件分配日期</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex2 != 10 && formIndex3 != 10'>永久催收员</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex2 != 11 && formIndex3 != 11'>所属团队</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect1.loanName" size="large"></Input>
								<Input v-show="formIndex1 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect1.idCard" size="large"></Input>
								<Input v-show="formIndex1 == 3" type="text" placeholder="请输入联系电话！" v-model="allselect1.loanNamePhone" size="large"></Input>
								<Select v-show="formIndex1 == 4" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect1.caseType"
								placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.urgeCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 5" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect1.isSpecial"
								placeholder="请选择是否特权包！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 == 6" @on-open-change="getListDict($event,'mainBody')" v-model="allselect1.mainBody"
								placeholder="请选择主体" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect1.overdueGrade"
								placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex1 == 8" v-model="allselect1.overdueDayStart" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<Input class='only' v-show="formIndex1 == 8" v-model="allselect1.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<DatePicker v-if="formIndex1 == 9" type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false" size="large"
								@on-change='urgeInTimeChange($event,"1")' format="yyyy-MM-dd" v-model="allselect1.caseAllotTimeS">
								</DatePicker>
								<Input v-show="formIndex1 == 10" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect1.foreverUrgeName"></Input>
								<Select v-show="formIndex1 == 11" @on-open-change="getTeamList($event,'getTeamList')" v-model="allselect1.urgeTeamName"
								placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamName" :key="item.urgeTeamId">{{item.urgeTeamName}}
									</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第2个下拉选择框 -->
						<Form label-position="right" inline :model='allselect2'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange2" @on-open-change='ClearVal2'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>案件状态</Option>
									<Option value='5' v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>是否特权包</Option>
									<Option value='6' v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>主体</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8'>逾期天数</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9'>案件分配日期</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex3 != 10'>永久催收员</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex3 != 11'>所属团队</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect2.loanName" size="large"></Input>
								<Input v-show="formIndex2 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect2.idCard" size="large"></Input>
								<Input v-show="formIndex2 == 3" type="text" placeholder="请输入联系电话！" v-model="allselect2.loanNamePhone" size="large"></Input>
								<Select v-show="formIndex2 == 4" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect2.caseType"
								placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.urgeCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 5" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect2.isSpecial"
								placeholder="请选择是否特权包！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'mainBody')" v-model="allselect2.mainBody"
								placeholder="请选择主体" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect2.overdueGrade"
								placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex2 == 8" v-model="allselect2.overdueDayStart" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<Input class='only' v-show="formIndex2 == 8" v-model="allselect2.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<DatePicker v-if="formIndex2 == 9" type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false" size="large"
								@on-change='urgeInTimeChange($event,"2")' format="yyyy-MM-dd" v-model="allselect2.caseAllotTimeS">
								</DatePicker>
								<Input v-show="formIndex2 == 10" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect2.foreverUrgeName"></Input>
								<Select v-show="formIndex2 == 11" @on-open-change="getTeamList($event,'getTeamList')" v-model="allselect2.urgeTeamName"
								placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamName" :key="item.urgeTeamId">{{item.urgeTeamName}}
									</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第3个下拉选择框 -->
						<Form label-position="right" inline :model='allselect3'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange3" @on-open-change='ClearVal3'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>联系电话</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>案件状态</Option>
									<Option value='5' v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>是否特权包</Option>
									<Option value='6' v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6'>主体</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>逾期等级</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex2 != 8'>逾期天数</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex2 != 9'>案件分配日期</Option>
									<Option value="10" v-show='formIndex != 10 && formIndex1 != 10 && formIndex2 != 10'>永久催收员</Option>
									<Option value="11" v-show='formIndex != 11 && formIndex1 != 11 && formIndex2 != 11'>所属团队</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect3.loanName" size="large"></Input>
								<Input v-show="formIndex3 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect3.idCard" size="large"></Input>
								<Input v-show="formIndex3 == 3" type="text" placeholder="请输入联系电话！" v-model="allselect3.loanNamePhone" size="large"></Input>
								<Select v-show="formIndex3 == 4" @on-open-change="getListDict($event,'urgeCaseStatus')" v-model="allselect3.caseType"
								placeholder="请选择案件状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.urgeCaseStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 5" @on-open-change="getListDict($event,'isSpecial')" v-model="allselect3.isSpecial"
								placeholder="请选择是否特权包！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.isSpecial" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'mainBody')" v-model="allselect3.mainBody"
								placeholder="请选择主体" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.mainBody" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 7" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect3.overdueGrade"
								placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex3 == 8" v-model="allselect3.overdueDayStart" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<Input class='only' v-show="formIndex3 == 8" v-model="allselect3.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								size="large"></Input>
								<DatePicker v-if="formIndex3 == 9" type="daterange" placement='bottom' placeholder="请选择案件分配日期" :editable="false" size="large"
								@on-change='urgeInTimeChange($event,"3")' format="yyyy-MM-dd" v-model="allselect3.caseAllotTimeS">
								</DatePicker>
								<Input v-show="formIndex3 == 10" type="text" placeholder="请输入永久催收员" size="large" v-model="allselect3.foreverUrgeName"></Input>
								<Select v-show="formIndex3 == 11" @on-open-change="getTeamList($event,'getTeamList')" v-model="allselect3.urgeTeamName"
								placeholder="请选择所属团队" class="twoSelect" size="large">
									<Option v-for="item in distList.getTeamList" :value="item.urgeTeamName" :key="item.urgeTeamId">{{item.urgeTeamName}}
									</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search">查询</Button>
								<Button @click="Reset">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('06000010301')" @click="ExportData">
									<Icon type="navicon-round"></Icon> 导出
								</Button>
								<Button v-if="this.getAuth('06000010302')" @click="manualRecovery=true">
									<Icon type="navicon-round"></Icon>手动回收
								</Button>
								<Button v-if="this.getAuth('06000010303')" @click="BatchRecovery">
									<Icon type="navicon-round"></Icon>批量回收
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
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change="selecttabrow"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page show-total show-sizer :total="pageTotal" :page-size="pageSize" :current="current" @on-page-size-change="jumppage"
				 @on-change="jump"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--Modal----手动回收-->
		<Modal v-model="manualRecovery" :mask="true" :draggable="true" :scrollable="true" :loading="loading" title="回收">
			<div class="Recoverytips">是否确认回收已选案件？</div>
			<div slot="footer">
				<Button type="text" size="large" @click="manualRecovery=false">取消</Button>
				<Button type="primary" size="large" @click="manRecovery">确定</Button>
			</div>
		</Modal>
		<!--Modal----自动回收-->
		<Modal v-model="automaticRecovery" :mask="true" :draggable="true" 
		:scrollable="true" :loading="loading" title="回收"  
		>
			<div class="from-item">
				<Form :model="formItem" :rules="usercountValid" ref="autoRecovery" label-position="right" :label-width="90" inline>
					<FormItem label="可回收数量" style="width: 100%;">
						<Input v-model="formItem.allcount" type="text" readonly size="large"></Input>
					</FormItem>
					<FormItem label="自动回收数量" style="width: 100%;" prop="usercount">
						<Input v-model="formItem.usercount" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="" style="width: 100%;" class="sdhsSQ">
						<div class="Recoverytips">是否确认回收已选案件？</div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="delRecovery">取消</Button>
				<Button type="primary" size="large" @click="subRecovery('autoRecovery')">确定</Button>
			</div>
		</Modal>
		<!--Modal----批量回收-->
		<Modal v-model="batchRecovery" class="batchRecovery" :mask="true" :draggable="true" :scrollable="true" :loading="loading"
		 title="回收">
			<div class="from-item">
				<Form ref="Recovery" label-position="right" :label-width="90" inline>
					<FormItem label="电催团队" style="width: 100%;">
						<Select v-model="modeldiancui" @on-open-change="diancuiTEAM" @on-change="teamMenber" size="large">
							<Option v-for="(item,index) in formItem.diancuitt" :key="index" :value="item.urgeTeamId">{{item.urgeTeamName}}</Option>
						</Select>
					</FormItem>
				</Form>
				<div style="margin-top: 20px;margin-bottom:6px;display: flex;justify-content: space-between;">
					<div>成员选择：</div>
					<Checkbox :value="checkAll" @on-change="handleCheckAll">全选</Checkbox>
				</div>
				<CheckboxGroup v-model="checkAllGroup1" @on-change="checkAllGroupChange" style="margin-bottom: 20px;">
					<Checkbox :value="checkAll" v-for="(item,index) in checkAllGroup" :key="index" :label="item.name">{{item.realName}}</Checkbox>
				</CheckboxGroup>
			</div>
			<div slot="footer">
				<Button type="default" size="large" @click="resetBatch">重置</Button>
				<Button type="text" size="large" @click="delBatch">取消</Button>
				<Button type="primary" size="large" @click="subBatch">回收</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import qs from 'qs'
	import Vue from 'vue'
	import store from '../../store/index'
	export default {
		data() {
			let validatenick = (rule, value, callback) => {
				let n = /^[1-9]\d*$/;
				if (value === '') {
					return callback(new Error('自动回收数量不能为空'));
				} else if (!n.test(value)) {
					return callback(new Error('请输入正整数'));
				} else if (value > this.formItem.allcount22) {
					return callback(new Error('自动回收数量不能大于可回收数量'));
				} else {
					callback();
				}
			};
			return {
				zhedie: "收起",
				value1: '1',
				isActive: true,
				loading: true,
				manualRecovery: false,
				automaticRecovery: false,
				batchRecovery: false,
				smsNotice: '',
				Recovery: '',
				modeldiancui: '',
				indeterminate: true,
				checkAll: false,
				checkAllGroup1: [],
				checkAllGroup: [],
				//-------------------------------------------分页
				pageTotal: 2, //数据总条数
				pageSize: 10, //每页条数
				current: 1, //当前页码
				placeholder: '请输入合同编号！', //placeholder
				handList: [], // 分按数据列表
				formIndex: '0',
				formIndex1: '1',
				formIndex2: '2',
				formIndex3: '3',
				selData: [], // 传给服务器的团队名称，校验名称是否一样
				//筛选字段
				allselect: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					loanNamePhone: '', //联系电话
					idCard: '', //证件号码
					isSpecial: '', // 是否特权包
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseType: '', // 案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUrgeName: '', //永久催收员
					overdueGrade: '', //逾期等级
					urgeTeamName: '', //永久催收员
					mainBody: '', //主体
				},
				allselect1: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					loanNamePhone: '', //联系电话
					idCard: '', //证件号码
					isSpecial: '', // 是否特权包
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseType: '', // 案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUrgeName: '', //永久催收员
					overdueGrade: '', //逾期等级
					urgeTeamName: '', //永久催收员
					mainBody: '', //主体
				},
				allselect2: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					loanNamePhone: '', //联系电话
					idCard: '', //证件号码
					isSpecial: '', // 是否特权包
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseType: '', // 案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUrgeName: '', //永久催收员
					overdueGrade: '', //逾期等级
					urgeTeamName: '', //永久催收员
					mainBody: '', //主体
				},
				allselect3: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					loanNamePhone: '', //联系电话
					idCard: '', //证件号码
					isSpecial: '', // 是否特权包
					overdueDayStart: '', // 逾期天数开始
					overdueDayEnd: '', //逾期天数结束
					caseType: '', // 案件状态
					caseAllotTimeS: '', //案件分配日期
					foreverUrgeName: '', //永久催收员
					overdueGrade: '', //逾期等级
					urgeTeamName: '', //永久催收员
					mainBody: '', //主体
				},
				LastSubmitData:{
					pageIndex: '1',
					pageSize: '10',
				},
				distList: {
					mainBody: [],
					overdueGrade: [],
					isSpecial: [],
					urgeCaseStatus: [],
					getTeamList: [], //字典表的团队
				},
				idkeyARR: [], //手工分案保存的数据
				formItem: {
					diancuitt: [],
					dianOption: '',
					iaAll: 'N',
					teamArr: [],
					allcount: '', //可回收总数
					allcount22: '',
					usercount: '',
					teamMembers: []
				},
				usercountValid: {
					usercount: [{
						required: true,
						validator: validatenick,
						trigger: 'blur'
					}],
				},
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '合同编号',
						minWidth: 150,
						align: 'center',
						key: 'loanContractNo'
					}, {
						title: '客户姓名',
						minWidth: 100,
						align: 'center',
						key: 'loanName'

					}, /* {
						title: '证件号码',
						minWidth: 150,
						align: 'center',
						key: 'idCard'

					}, {
						title: '联系电话',
						minWidth: 120,
						align: 'center',
						key: 'loanNamePhone',
					}, */{
						title: '业务线',
						minWidth: 170,
						align: 'center',
						key: 'serverLine',
						render: (h, params) => {
							return h('div', [
								h('span', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
								}, params.row.serverLine === 'XJ' ? '消金' : '信贷'),

							])
						}
					}, {
						title: '产品类型',
						minWidth: 150,
						align: 'center',
						key: 'productTypeName',
					}, {
						title: '还款日',
						minWidth: 100,
						align: 'center',
						key: 'monthPayDate',
					},
					{
						title: '逾期等级',
						minWidth: 100,
						align: 'center',
						key: 'overdueGrade',
					}, {
						title: '逾期天数',
						minWidth: 100,
						align: 'center',
						key: 'overdueDay',
					}, {
						title: '案件分配日期',
						minWidth: 150,
						align: 'center',
						key: 'caseAllotTime',
					},
					{
						title: '所属团队',
						minWidth: 150,
						align: 'center',
						key: 'urgeTeamName',
					}, {
						title: '临时催收员',
						minWidth: 150,
						align: 'center',
						key: 'urgeName',
					},
					{
						title: '永久催收员',
						minWidth: 150,
						align: 'center',
						key: 'foreverUrgeName',
					},
					{
						title: '案件状态',
						minWidth: 150,
						align: 'center',
						key: 'caseType',
					},
				],
				datas: [], //默认显示数据
			}
		},
		components: {

		},
		methods: {
			// 查询案件分配列表
			init(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post', 'queryRecyclableCaseDetails', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.datas = res.data.data.data
						this.pageSize = res.data.data.pageSize; //每页条数
						this.pageTotal = res.data.data.dataCount //  总数据条数
					}
				});
			},
			// 查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData)
				for(let i in this.allselect){
					if(this.allselect[i] != ''){
						this.$set(this.LastSubmitData , i , this.allselect[i])
					}
				}
				for(let i in this.allselect1){
					if(this.allselect1[i] != ''){
						this.$set(this.LastSubmitData , i , this.allselect1[i])
					}
				}
				for(let i in this.allselect2){
					if(this.allselect2[i] != ''){
						this.$set(this.LastSubmitData , i , this.allselect2[i])
					}
				}
				for(let i in this.allselect3){
					if(this.allselect3[i] != ''){
						this.$set(this.LastSubmitData , i , this.allselect3[i])
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
			//页码改变的回调
			jump(a) {
				this.current = a
				let cur = this.current
				let size = this.pageSize
				this.init(a)
			},
			//切换每页条数
			jumppage(b) {
				this.pageSize = b
				let cur = this.current
				let size = this.pageSize
				this.LastSubmitData.pageIndex = 1
				this.init('',b)
			},
			//筛选
			screen() {
				this.init();
			},
			// 头部的折叠
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
			// 条件下拉选择框
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
									case 'isSpecial':
										_.distList.isSpecial = res.data.data;
										break;
									case 'urgeCaseStatus':
										console.log(res.data.data)
										_.distList.urgeCaseStatus = res.data.data;
										break;
								}
							}
						})
					}
				}
			},
			// 案件分配日期时间转换
			urgeInTimeChange(val,index) {
				index = index || '';
				if(index == ''){
					this.allselect.caseAllotTimeS = val
				}else{
					this['allselect'+index].caseAllotTimeS = val;
				}
			},
			//字典表所有团队
			getTeamList(bol) {
				if (bol) {
					this.HttpAjax('post', 'getTeamList', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == 200) {
							console.log(res.data.data);
							this.distList.getTeamList = res.data.data
						}
					})
				}
			},
			// 第0个下拉选择项变化时
			selectChange(val) {
				this.formIndex = val
			},
			// 第1 个下拉选择项变化时
			selectChange1(val) {
				this.formIndex1 = val
			},
			// 第2 个下拉选择项变化时
			selectChange2(val) {
				this.formIndex2 = val
			},
			// 第3个下拉选项变化时
			selectChange3(val) {
				this.formIndex3 = val
			},
			//第0下拉框展开
			ClearVal(val) {
				if (val) {
					this.ClearObject(this.allselect)
				}
			},
			//第1下拉框展开
			ClearVal1(val) {
				if (val) {
					this.ClearObject(this.allselect1)
				}
			},
			//第2下拉框展开
			ClearVal2(val) {
				if (val) {
					this.ClearObject(this.allselect2)
				}
			},
			//第3下拉框展开
			ClearVal3(val) {
				if (val) {
					this.ClearObject(this.allselect3)
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
			// 重置按钮点击事件
			Reset() {
				this.ClearObject(this.allselect)
				this.ClearObject(this.allselect1)
				this.ClearObject(this.allselect2)
				this.ClearObject(this.allselect3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			//刷新按钮点击事件
			refresh() {
				this.init();
			},
			delRecovery() { //自动分案取消
				this.automaticRecovery = false
			},
			diancuiTEAM(name) {
				if (name) {
					let len = this.formItem.diancuitt
					if (len.length > 0) {
						return;
					} else {
						this.HttpAjax('post', 'teamList', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.formItem.diancuitt = res.data.data.data;
							}
						});
					}

				}
			},
			teamMenber(name) { //根据电催团队id查询团队成员
				this.checkAllGroup = []
				this.checkAll = false //清楚全选按钮
				this.formItem.dianOption = name
				let formItem = {
					teamNo: name
				}
				if (name) {
					this.HttpAjax('post', 'getCurrentInfoByTeamNo', formItem, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);

						if (res.data.status == '200') {
							let rarr = res.data.data;
							for (let i = 0; i < rarr.length; i++) {
								this.checkAllGroup.push({
									realName: rarr[i].realName,
									name: rarr[i].name
								})
								//this.checkAllGroup.push(rarr[i].realName)
							}
						}
					});
				}
			},
			subRecovery(name) { //自动回收提交
				let resdata = {
					teamNo: this.formItem.dianOption,
					isAll: this.formItem.iaAll,
					recoveryCount: this.formItem.usercount,
					teamMembers: this.formItem.teamMembers
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'dynamicRecoveryCase', resdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.$Notice.success({
									title:'批量回收成功！',
									desc:res.data.message
								})
								this.automaticRecovery = false; //关闭弹窗
								this.init();

							}
						}, 'json');
					}
				})
			},
			// 批量回收
			BatchRecovery(){
				this.batchRecovery = true
				this.resetBatch()
			},
			manRecovery() { //手动回收提交

				const _this = this
				let keyArr = [];
				for (let i = 0; i < this.idkeyARR.length; i++) {
					keyArr.push({
						idKey: this.idkeyARR[i].idKey
					})
				}
				this.HttpAjax('post', 'manualRecoveryCase', keyArr, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.manualRecovery = false;
						this.init();
					}
				}, 'json');
			},
			delBatch() { //回收取消
				this.batchRecovery = false
			},
			 //确定按钮 （批量回收
			subBatch() {
				let resdata = ''
				if (this.formItem.iaAll == 'Y') {
					resdata = {
						teamNo: this.formItem.dianOption,
						isAll: this.formItem.iaAll
					}
				} else {
					resdata = {
						teamNo: this.formItem.dianOption,
						isAll: this.formItem.iaAll,
						teamMembers: this.formItem.teamMembers
					}
				}
				this.HttpAjax('post', 'getDynamicRecoveryCaseCount', resdata, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						if (res.data.data && res.data.data > 0) {
							this.automaticRecovery = true
							this.batchRecovery = false
							this.formItem.allcount = res.data.data + '条'
							this.formItem.allcount22 = res.data.data
						} else {
							this.$Notice.error({
								desc: '没有查询到可回收案件！',
								duration: 0
							})
						}
					}
				}, 'json');
			},
			resetBatch() { //重置
				this.formItem.diancuitt = [];
				this.modeldiancui = '';
			},
			handleCheckAll(name) { //全选
				this.formItem.isAllchoice = name
				if (name) {
					this.checkAll = true
					this.formItem.iaAll = 'Y'
				} else {
					this.checkAll = false
					this.formItem.iaAll = 'N'
				}
			},
			checkAllGroupChange(name) {
				this.formItem.teamMembers = name
			},
			selecttabrow(selec) {
				this.idkeyARR = selec
			},
			// 导出
			ExportData() {
				this.HttpAjax('post','TestingDownloadRecyclableCaseExcel',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.HttpAjax('post', 'downloadRecyclableCaseExcel', qs.stringify(this.LastSubmitData), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							this.downLoadFile(res.data, '回收改派数据');
						}, 'download')
					}
				})
			}
		},
		created() {
			this.init();
		},
		updated() {

		}
	}
</script>

<style lang="less">
	.sdhsSQ {
		.ivu-form-item-content {
			margin-left: 0 !important;
		}
	}

	.batchRecovery {
		.from-item .ivu-checkbox-group {
			min-height: 36px;
			height: auto !important;
		}
	}

	.reclaimReform {
		/*时间宽度*/

		.ivu-date-picker {
			.ivu-input-wrapper {
				width: 310px;
				display: inline-block;
				position: relative;
				vertical-align: middle;
				line-height: normal;

				.ivu-input-icon-normal+.ivu-input {
					// border: none;
					width: 310px;
					outline: none;
				}
			}
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

		.ivu-icon:hover {
			cursor: pointer;
		}
	}
</style>
<style scoped="scoped" lang="less">
	.Recoverytips {
		height: 100px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 16px;
	}

	.from-item .ivu-checkbox-group {
		padding: 7px 7px;
	}

	.ivu-btn.ivu-btn-default {
		color: #515a6e !important;
	}
</style>
