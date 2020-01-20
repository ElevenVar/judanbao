<template>
	<div class="productRules">
		<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">案件分配</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个条件选择框 -->
						<Form label-position="right" inline :model="allselect">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>逾期等级</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>逾期天数</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>还款日</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>业务线</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7'>案件分配日期</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="allselect.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect.loanName" size="large"></Input>
								<Input v-show="formIndex == 2" type="text" placeholder="请输入证件号码！" v-model="allselect.idCard" size="large"></Input>
								<Select v-show="formIndex == 3" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex == 4" v-model="allselect.overdueDayStart" type="text" placeholder="请输入逾期天数" size="large"></Input>
								<Input class='only' v-show="formIndex == 4" v-model="allselect.overdueDayEnd" type="text" placeholder="请输入逾期天数" size="large"></Input>
								<DatePicker v-if="formIndex == 5" @on-change='monthPayDateChange($event,"")' type="daterange" placement='bottom'
								 placeholder="请选择还款日" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.monthPayDateS"></DatePicker>
								<Select v-show="formIndex == 6" v-model="allselect.serverLine" placeholder="请选择业务线" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
								<DatePicker v-if="formIndex == 7" @on-change='caseAllotTimeChange($event,"")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect.caseAllotTimeS"></DatePicker>
							</FormItem>
						</Form>
						<!-- 第1个条件选择框 -->
						<Form label-position="right" inline :model="allselect1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>逾期等级</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>还款日</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>业务线</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>案件分配日期</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect1.loanName" size="large"></Input>
								<Input v-show="formIndex1 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect1.idCard" size="large"></Input>
								<Select v-show="formIndex1 == 3" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect1.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex1 == 4" v-model="allselect1.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex1 == 4" v-model="allselect1.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex1 == 5" @on-change='monthPayDateChange($event,"1")' type="daterange" placement='bottom'
								 placeholder="请选择还款日" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect1.monthPayDateS"></DatePicker>
								<Select v-show="formIndex1 == 6" v-model="allselect1.serverLine" placeholder="请选择业务线" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
								<DatePicker v-show="formIndex1 == 7" @on-change='caseAllotTimeChange($event,"1")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect1.caseAllotTimeS"></DatePicker>
							</FormItem>
						</Form>
						<!-- 第2个条件选择框 -->
						<Form label-position="right" inline :model="allselect2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>逾期等级</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>还款日</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>业务线</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>案件分配日期</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect2.loanName" size="large"></Input>
								<Input v-show="formIndex2 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect2.idCard" size="large"></Input>
								<Select v-show="formIndex2 == 3" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect2.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex2 == 4" v-model="allselect2.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex2 == 4" v-model="allselect2.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex2 == 5" @on-change='monthPayDateChange($event,"2")' type="daterange" placement='bottom'
								 placeholder="请选择还款日" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect2.monthPayDateS"></DatePicker>
								<Select v-show="formIndex2 == 6" v-model="allselect2.serverLine" placeholder="请选择业务线" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
								<DatePicker v-show="formIndex2 == 7" @on-change='caseAllotTimeChange($event,"2")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect2.caseAllotTimeS"></DatePicker>
							</FormItem>
						</Form>
						<!-- 第3个条件选择框 -->
						<Form label-position="right" inline :model="allselect3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex1 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex1 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex1 != 2'>证件号码</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex1 != 3'>逾期等级</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex1 != 4'>逾期天数</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex1 != 5'>还款日</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex1 != 6'>业务线</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex1 != 7'>案件分配日期</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="allselect3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="allselect3.loanName" size="large"></Input>
								<Input v-show="formIndex3 == 2" type="text" placeholder="请输入证件号码！" v-model="allselect3.idCard" size="large"></Input>
								<Select v-show="formIndex3 == 3" @on-open-change="getListDict($event,'overdueGrade')" v-model="allselect3.overdueGrade"
								 placeholder="请选择逾期等级" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
								</Select>
								<Input class='only' v-show="formIndex3 == 4" v-model="allselect3.overdueDayStart" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<Input class='only' v-show="formIndex3 == 4" v-model="allselect3.overdueDayEnd" type="text" placeholder="请输入逾期天数"
								 size="large"></Input>
								<DatePicker v-if="formIndex3 == 5" @on-change='monthPayDateChange($event,"3")' type="daterange" placement='bottom'
								 placeholder="请选择还款日" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect3.monthPayDateS"></DatePicker>
								<Select v-show="formIndex3 == 6" v-model="allselect3.serverLine" placeholder="请选择业务线" class="twoSelect" size="large">
									<Option value='XJ'>消金</Option>
									<Option value='XD'>信贷</Option>
								</Select>
								<DatePicker v-if="formIndex3 == 7" @on-change='caseAllotTimeChange($event,"3")' type="daterange" placement='bottom'
								 placeholder="请选择案件分配日期" :editable="false" format="yyyy-MM-dd" size="large" v-model="allselect3.caseAllotTimeS"></DatePicker>
							</FormItem>
						</Form>
						<!-- 按钮部分 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="search" :disabled="forecastCaseShow || hand_division ||batch_division ">查询</Button>
								<Button @click="Reset" :disabled="forecastCaseShow || hand_division ||batch_division ">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Dropdown v-if="this.getAuth('06000010201') || this.getAuth('06000010202') || this.getAuth('06000010203')" trigger="click" @on-click='showforecast'>
									<Button type="primary" :disabled="forecastCaseShow || hand_division ||batch_division ">
										分案<Icon type="ios-arrow-down"></Icon>
									</Button>
									<DropdownMenu slot="list">
										<DropdownItem name="1" v-if="this.getAuth('06000010201')">预测分案</DropdownItem>
										<DropdownItem name="2" v-if="this.getAuth('06000010202')">手工分案</DropdownItem>
										<DropdownItem name="3" v-if="this.getAuth('06000010203')">批量分案</DropdownItem>
									</DropdownMenu>
								</Dropdown>
								<Button v-if="this.getAuth('06000010204')" @click="import_files" :disabled="forecastCaseShow || hand_division ||batch_division ">
									<Icon type="navicon-round"></Icon> 导入数据
								</Button>
								<Button v-if="this.getAuth('06000010205')" @click="export_info" :disabled="forecastCaseShow || hand_division ||batch_division ">
									<Icon type="navicon-round"></Icon>导出数据
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
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change="select_me"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page show-total show-sizer :total="pageTotal" :page-size="pageSize" :current="current" @on-page-size-change="jumppage"
				 @on-change="jump"></Page>
				<!--<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">{{totalye}}</span>页</span>-->
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--手动分案弹窗-->
		<Modal v-model="hand_division" title="手动分案" :loading="loading" draggable @on-cancel='Close_Hand' class-name="batch_division_class">
			<div class="hand_content">
				<ul>
					<li>
						<span class="s_left">催收团队</span>
						<span class="s_right" v-if="select_data.length !== 0" style="line-height:35px;text-indent: 15px;">
							{{select_data[0].urgeTeamName}}
						</span>
					</li>
					<li class="special">
						<span class="s_left">催收员</span>
						<div class="s_right">
							<!-- 全选按钮 -->
							<p>
								<Checkbox :indeterminate="HandIndeterminate" :value="HandCheckAll" @click.prevent.native="checkAllGroupChangeAll">全选</Checkbox>
							</p>
							<p>
								<CheckboxGroup v-model="checkPeople" @on-change="checkAllGroupChange">
									<Checkbox :key="select_people.idKey" :label="select_people.name" v-for="select_people in select_Team_people">
										{{select_people.realName}}
									</Checkbox>
								</CheckboxGroup>
							</p>
						</div>
					</li>
					<li>
						<span class="s_left">分案类型</span>
						<div class="s_right">
							<Select v-model="add_team_info.executeType" @on-change='Clear' placeholder="请选择分案类型" size="large">
								<Option value="1">临时分案</Option>
								<Option value="2">永久分案</Option>
							</Select>
						</div>
					</li>
					<li v-if="add_team_info.executeType === '1'">
						<span class="s_left">临时分案结束时间</span>
						<DatePicker v-model="add_team_info.currentEndDate" placeholder="请选择结束时间" format="yyyy-MM-dd" type="date" size="large"
						 placement="top-start" :editable="false" @on-change='dateChange_hand'>
						</DatePicker>
					</li>
				</ul>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="Close_Hand">取消</Button>
				<Button type="primary" size="large" @click="Submit_info">保存</Button>
			</div>
		</Modal>
		<!--批量分案窗口-->
		<Modal v-model="batch_division" title="批量分案" :loading="loading" draggable @on-cancel='Close_Batch' class-name="batch_division_class">
			<div class="batch_content">
				<ul>
<!-- 					<li>
						<span class="s_left">入催团队:</span>
						<div class="s_right" style="line-height:35px;text-indent: 5px;">
							<RadioGroup @on-change="change_serverLine">
								<Radio label="XJ">消金</Radio>
								<Radio label="XD">信贷</Radio>
							</RadioGroup>
						</div>
					</li> -->
					<li>
						<span class="s_left">电催团队</span>
						<span class="s_right">
							<Select v-model="batch_info.teamNo" placeholder="请选择团队" size="large" style="" @on-change="changeTeam">
								<Option value="1" :key="item.urgeTeamId" :value="item.urgeTeamId" v-for="item in allTeams">
									{{item.urgeTeamName}}
								</Option>
							</Select>
						</span>
					</li>
					<li class="special" style="height:auto;">
						<span class="s_left">成员选择</span>
						<div class="s_right">
							<!-- 全选按钮 -->
							<p>
								<Checkbox :indeterminate="BatchIndeterminate" :value="BatchCheckAll" @click.prevent.native="BatchCheckAllGroupChangeAll">全选</Checkbox>
							</p>
							<p>
								<CheckboxGroup v-model="batch_checkPeople" @on-change="team_people">
									<Checkbox :key="select_peoples.idKey" :label="select_peoples.name" v-for="select_peoples in this_team_people">
										{{select_peoples.realName}}
									</Checkbox>
								</CheckboxGroup>
							</p>
						</div>
					</li>
					<li>
						<span class="s_left">可分案数量</span>
						<span class="s_right" style="line-height:35px;text-indent:20px;background: #f2f2f2;margin:2px;">{{sure_batch}}</span>
					</li>
					<li>
						<span class="s_left">分案规则</span>
						<span class="s_right">
							<Select v-model="batch_type" placeholder="请选择分案规则" size="large">
								<Option value="1">配额分配</Option>
								<Option value="2">累计均分</Option>
								<Option value="3">平均分配</Option>
							</Select>
						</span>
					</li>
					<li v-if="batch_type!=='2'">
						<span class="s_left">分配方式</span>
						<div class="s_right" style="line-height:35px;text-indent: 5px;">
							<RadioGroup v-model="batch_typs">
								<Radio label="4">户数</Radio>
								<Radio label="5">逾期金额</Radio>
								<Radio label="6">剩余本金</Radio>
							</RadioGroup>
						</div>
					</li>
					<li>
						<span class="s_left">分案模式</span>
						<span class="s_right">
							<Select v-model="batch_info.executeType" placeholder="请选择分案模式" size="large" @on-change='deletTime'>
								<Option value="1">临时分案</Option>
								<Option value="2">永久分案</Option>
							</Select>
						</span>
					</li>
					<li v-if="batch_info.executeType==='1'">
						<span class="s_left">临时分案结束时间</span>
						<span class="s_right">
							<DatePicker v-model="batch_info.currentEndDate" class="only" placeholder="请选择时间" format="yyyy-MM-dd" type="date"
							 size="large" placement="top-start" :editable="false" @on-change='dateChange_batch'>
							</DatePicker>
						</span>
					</li>
					<li v-if="batch_type !=='1'">
						<span class="s_left">自选分案数量</span>
						<span class="s_right">
							<input type="text" class="start" v-model="batch_info.quotaCount" onkeyup="value=value.replace(/[^\d]/g,'')"
							 maxlength="6">
						</span>
					</li>
					<li v-if="batch_type==='1'">
						<span class="s_left">配额数量</span>
						<span class="s_right">
							<input type="text" class="start" v-model="batch_info.quotaCount">
						</span>
					</li>
				</ul>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="Close_Batch">取消</Button>
				<Button type="primary" size="large" @click="Submit_batch_info">保存</Button>
			</div>
		</Modal>
		<!--Modal 预测分案-->
		<Modal v-model="forecastCaseShow" draggable :mask-closable="false" :scrollable="true" :loading="loading" class-name="modalInput"
		 title="预测分案">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline :model="forecastCaseModel" :rules="ruleValidateFore" ref="forecastCaseModel">
					<FormItem label="案件联系人" prop="contactType">
						<Select @on-open-change="getListDict($event,'contactType')" v-model="forecastCaseModel.contactType" placeholder="请选择案件联系人！"
						 :style="width" size="large">
							<Option :key="index" v-for="(item,index) in distList.contactType" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="选择团队" prop="teamNo">
						<CheckboxGroup :style="width" size="large" placeholder="请选择团队！" class="teamHeight" v-model="forecastCaseModel.teamNo"
						 @on-change="selectTeam">
							<Checkbox :label="item.urgeTeamId" v-for="(item,index) in distList.teamList" :key="index"><span>{{item.urgeTeamName}}</span></Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem label="可分配案件数量" prop="caseTotalNo">
						<Input v-model="forecastCaseModel.caseTotalNo" type="text" disabled :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="选择本次分配案件数量" prop="caseNo">
						<Input v-model="forecastCaseModel.caseNo" type="text" placeholder="请输入本次分配案件数量！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="选择本次催收人员" prop="urgeUserList">
						<CheckboxGroup :style="width" size="large" placeholder="请选择本次催收人员！" class="teamHeight" v-model="forecastCaseModel.urgeUserList"
						 @on-change="selectPerpeo">
							<Checkbox :label="item.name" v-for="(item,index) in distList.urgeUserList" :key="index"><span>{{item.realName}}</span></Checkbox>
						</CheckboxGroup>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="saveOutbound('forecastCaseModel')">保存配置</Button>
			</div>
		</Modal>
		<!--批量新增-->
		<Modal v-model="add_file" :mask-closable="false" :scrollable="true" :loading="loading" title="批量新增" @on-cancel="cancel_file">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" type="file" ref='inputFile' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						 multiple />
					</FormItem><br />
					<span style="color:blue;text-decoration: underline;cursor:pointer;" @click="down_Template">下载案件分配模板.xlsx</span>
				</Form>

			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel_file">取消</Button>
				<Button type="primary" size="large" @click="import_file">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default {
		data() {
			// 验证规则
			const n = /^[1-9]\d*$/;
			const cellnumber = (rule, value, callback) => {
				if (value <= 0) {
					callback(new Error('请输入大于0的案件数量！'));
				} else if (value > this.forecastCaseModel.caseTotalNo) {
					callback(new Error('已超过可分配案件数量的最大值，请重新输入'));
				} else if (!n.test(value)) {
					callback(new Error('请输入正整数'));
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
			return {
				zhedie: "收起",
				value1: '1',
				width: {
					'width': '350px'
				},
				/*批量新增*/
				add_file: false, // 批量新增弹窗
				importFile: {}, // 存储选中的文件
				//----手动分案-------
				HandIndeterminate: true, // 手动分案的选样式控制
				HandCheckAll: false, // 手动分案的全选数据控制
				isActive: true,
				forecastCaseShow: false, //案件分配弹框
				hand_division: false, // 手动分案弹窗
				loading: true,
				checkPeople: [], // 手动分案选中的人员
				batch_checkPeople: [], // 批量分案选中的人员
				batch_division: false, // 批量分案弹窗
				select_data: [], // 选中的数据
				select_Team_people: [], // 选中数据团队下面的人员
				// 手动分案传给服务器的数据
				add_team_info: {
					"executeType": "", // 分案类型
					"currentEndDate": "", // 分案结束时间
					"userList": [
						// {"userName":"","userNo":""}
					], // 选中的催收员列表
					"currentList": [{
						// "idKey": ""
					}] // 表格中选中数据的idKey
				},
				//----批量分案----
				allTeams: [], // 所有团队
				batch_info: {
					"quotaCount": "", // 案件数量
					"executeType": "", // 分案模式 1临时2永久
					"currentEndDate": "", //临时分案结束时间
					"teamNo": "-1",
					"userList": [
						// {
						//   "userNo":"",
						//   "userName":""
						// }
					]
				}, // 批量分案传给服务器的数据
				BatchIndeterminate: true, // 批量分案的全选样式控制
				BatchCheckAll: false, // 批量分啊的全选数据控制
				this_team_people: [], // 查询选中团队下面的所有人员
				sure_batch: '', // 选中团队下面可以 分配的案件
				batch_type: '-1', // 批量分案方式
				batch_typs: '', // 次级分案方式
				//-------------------------------------------分页
				pageTotal: 2, //数据总条数
				pageSize: 10, //每页条数
				totalye: 1, //总共多少页
				current: 1, //当前页码
				placeholder: '请输入合同编号！', //placeholder
				handList: [], // 分按数据列表
				formIndex: '0', // 第一个下拉选择框选中的值
				formIndex1: '1', // 第二个下拉选择框选中的值
				formIndex2: '2', // 第三个下拉选择框选中的值
				formIndex3: '3', // 第四个下拉选择框选中的值
				selData: [], // 传给服务器的团队名称，校验名称是否一样
				//给服务器的筛选字段
				allselect: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					idCard: '', //证件号码
					overdueGrade: '', //逾期等级
					overdueDayStart: '', // 逾期天数开始
					overdueDayStart: '', //逾期天数结束
					monthPayDateS: '', // 还款日
					serverLine: '', // 业务线
					caseType: '', // 案件分配状态
					caseAllotTimeS: '', //案件分配日期
				},
				allselect1: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					idCard: '', //证件号码
					overdueGrade: '', //逾期等级
					overdueDayStart: '', // 逾期天数开始
					overdueDayStart: '', //逾期天数结束
					monthPayDateS: '', // 还款日
					serverLine: '', // 业务线
					caseType: '', // 案件分配状态
					caseAllotTimeS: '', //案件分配日期
				},
				allselect2: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					idCard: '', //证件号码
					overdueGrade: '', //逾期等级
					overdueDayStart: '', // 逾期天数开始
					overdueDayStart: '', //逾期天数结束
					monthPayDateS: '', // 还款日
					serverLine: '', // 业务线
					caseType: '', // 案件分配状态
					caseAllotTimeS: '', //案件分配日期
				},
				allselect3: {
					loanContractNo: '', //编号
					loanName: '', //客户姓名
					idCard: '', //证件号码
					overdueGrade: '', //逾期等级
					overdueDayStart: '', // 逾期天数开始
					overdueDayStart: '', //逾期天数结束
					monthPayDateS: '', // 还款日
					serverLine: '', // 业务线
					caseType: '', // 案件分配状态
					caseAllotTimeS: '', //案件分配日期
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				forecastCaseModel: { //预测分案
					teamNo: [], //选择团队
					caseTotalNo: '', //可分配案件数量
					caseNo: '', //选择本次分配案件数量
					urgeUserList: [], //本次催收人员
					contactType: '', //案件联系人
				},
				//预测分案字段验证
				ruleValidateFore: {
					teamNo: [{
						required: true,
						message: '请选择团队！'
					}],
					caseTotalNo: [{
						required: true,
						message: '请选择团队后自动带出可分配案件数量'
					}],
					caseNo: [{
						required: true,
						message: '请输入选择本次分配案件数量！'
					}, {
						validator: cellnumber,
						trigger: 'blur'
					}],
					urgeUserList: [{
						required: true,
						message: '请选择本次催收人员！'
					}],
					contactType: [{
						required: true,
						message: '请选择案件联系人！'
					}],
				},
				//查询到的字段
				distList: {
					overdueGrade: [],
					teamList: [], //团队列表
					urgeUserList: [], //催收人员列表
					contactType: [], //案件联系人
					teamperpeoName: [], //催收人员name
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
						},
						{
							validator: cellName,
							trigger: 'blur'
						},
					],
					foreverUlgeNo: [{
							required: false,
							message: '请输入永久催收员！'
						},
						{
							validator: cellName,
							trigger: 'blur'
						},
					],
				},
				panduan: {
					arg1: '',
				},
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center',
					},
					{
						title: '合同编号',
						minWidth: 170,
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
						key: 'idCard',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.idCard))
						}
					}, {
						title: '联系电话',
						minWidth: 120,
						align: 'center',
						key: 'loanNamePhone',
						render: (h, params) => {
							return h('span', {}, this.phoneZation(params.row.loanNamePhone))
						}
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
						minWidth: 100,
						align: 'center',
						key: 'productTypeName',
					}, {
						title: '还款日',
						minWidth: 100,
						align: 'center',
						key: 'monthPayDate',
					}, {
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
						title: '分到团队日期',
						minWidth: 150,
						align: 'center',
						key: 'caseAllotTeamTime',
					},
					{
						title: '所属团队',
						minWidth: 150,
						align: 'center',
						key: 'urgeTeamName',
					},
					{
						title: '分配状态',
						minWidth: 150,
						align: 'center',
						key: 'caseType',
						render: (h, params) => {
							if (params.row.caseType === '3') {
								return h('div', [
									h('span', {}, '已分配团队')
								])
							} else if (params.row.caseType === '2') {
								return h('div', [
									h('span', {}, '未处理')
								])
							} else if (params.row.caseType === '1') {
								return h('div', [
									h('span', {}, '未分配')
								])
							} else {
								return h('div', [
									h('span', {}, '审核中')
								])
							}
						}
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
				const _ = this;
				_.LastSubmitData.pageIndex = pageIndex || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pageSize || _.LastSubmitData.pageSize;
				this.HttpAjax('post', 'HandleCurrentInfoList', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.datas = res.data.data.data
						this.total = res.data.data.dataCount; //数据总条数
						this.pageSize = res.data.data.pageSize; //每页条数
						this.pageTotal = res.data.data.dataCount //  总数据条数
						// this.stopTypeList=res.data.data.data
					}
				});
			},
			// 查询按钮点击事件
			search() {
				this.ClearObject(this.LastSubmitData)
				for (let i in this.allselect) {
					if (this.allselect[i] != '') {
						this.$set(this.LastSubmitData, i, this.allselect[i])
					}
				}
				for (let i in this.allselect1) {
					if (this.allselect1[i] != '') {
						this.$set(this.LastSubmitData, i, this.allselect1[i])
					}
				}
				for (let i in this.allselect2) {
					if (this.allselect2[i] != '') {
						this.$set(this.LastSubmitData, i, this.allselect2[i])
					}
				}
				for (let i in this.allselect3) {
					if (this.allselect3[i] != '') {
						this.$set(this.LastSubmitData, i, this.allselect3[i])
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
			// 分案模式改变
			deletTime(value) {
				this.batch_info.currentEndDate = ''
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
									case 'contactType': //案件联系人
										_.distList.contactType = res.data.data;
										break;
								}
							}
						})
					}
				}
			},
			// 案件分配日期
			caseAllotTimeChange(val,index) {
				index = index || '';
				if(index == ''){
					this.allselect.caseAllotTimeS = val
				}else{
					this['allselect'+index].caseAllotTimeS = val;
				}
			},
			// 选择还款日
			monthPayDateChange(val,index) {
				index = index || '';
				if(index == ''){
					this.allselect.monthPayDateS = val
				}else{
					this['allselect'+index].monthPayDateS = val;
				}
			},
			//下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.formIndex = val
				}else{
					this['formIndex'+index] = val
				}
			},
			//第0下拉框展开
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
			// 重置按钮点击事件
			Reset() {
				this.ClearObject(this.allselect)
				this.ClearObject(this.allselect1)
				this.ClearObject(this.allselect2)
				this.ClearObject(this.allselect3)
				this.ClearObject(this.LastSubmitData)
				this.init()
			},
			// 导出按钮点击事件
			export_info() {
				this.HttpAjax('post', 'TestingCurrentExport', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.HttpAjax('post', 'currentExport', qs.stringify(this.LastSubmitData), (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							this.downLoadFile(res.data, '待分配案件数据');
						}, 'download')
					}
				})
			},
			//刷新按钮点击事件
			refresh() {
				this.init();
			},
			// 手动分案(催收员的选择)
			checkAllGroupChange(data) {
				if (data.length === this.select_Team_people.length) {
					this.HandIndeterminate = false;
					this.HandCheckAll = true;
				} else if (data.length > 0) {
					this.HandIndeterminate = true;
					this.HandCheckAll = false;
				} else {
					this.HandIndeterminate = false;
					this.HandCheckAll = false;
				}
				this.add_team_info.userList = [];
				for (let i = 0; i < data.length; i++) {
					this.add_team_info.userList.push({
						"userName": "",
						"userNo": data[i]
					})
				}
			},
			// 手工分案，分案类型变化时
			Clear(val){
				this.add_team_info.currentEndDate = ''
			},
			// 手工分案 催收员 全选按钮
			checkAllGroupChangeAll() {
				if (this.HandIndeterminate) {
					this.HandCheckAll = false;
				} else {
					this.HandCheckAll = !this.HandCheckAll;
				}
				this.HandIndeterminate = false;
				if (this.HandCheckAll) {
					this.add_team_info.userList = []; // 添加选中人员
					for (let i = 0, j = this.select_Team_people; i < j.length; i++) {
						this.checkPeople.push(j[i].name)
						this.add_team_info.userList.push({
							"userName": "",
							"userNo": j[i].name
						})
					}
				} else {
					this.checkPeople = [];
				}
			},
			// 手工分案 按钮点击事件
			hand_button() {
				this.clean_hand();
				this.add_team_info.currentList = [];
				if (this.select_data.length === 0) {
					this.$Notice.error({
						title: '失败',
						desc: '没有选择要分案的数据',
						duration: 0
					});
				} else {
					this.selData = [];
					// 判断是否选择一样的团队
					for (let i = 0; i < this.select_data.length; i++) {
						this.selData.push(this.select_data[i].teamNo)
						this.add_team_info.currentList.push(this.select_data[i].idKey)
					}
					this.selData = this.selData.join('#');
					this.HttpAjax('post', 'checkTeam', {
						"teamNos": this.selData
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res.data.status !== 1001) {
							this.HttpAjax('post', 'getCurrentInfoByTeamNo', {
									'teamNo': this.select_data[0].teamNo
								},
								(res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if (res && res.data.status === 200) {
										this.hand_division = true;
										this.select_Team_people = res.data.data
									}
								}
							)
						}
					})
				}
			},
			// 选中表格数据
			select_me(selection, row) {
				this.select_data = [];
				this.select_data = selection
			},
			// 手动分案结束时间转换
			dateChange_hand(val) {
				this.add_team_info.currentEndDate = val
			},
			// 手动分案 保存按钮点击事件
			Submit_info() {
				if (this.add_team_info.userList.length === 0) {
					this.$layer.msg('请选择催收员')
				} else if (this.add_team_info.executeType === '') {
					this.$layer.msg('请选择分案类型')
				} else if (this.add_team_info.currentEndDate === '' && this.add_team_info.executeType == 1) {
					this.$layer.msg('请选择结束时间')
				} else {
					this.HttpAjax('post', 'HandleCurrentInfoManual', {
						"currentInfo": JSON.stringify(this.add_team_info)
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status === 200) {
							this.$Notice.success({
								title: '成功',
								desc: '分案成功',
								duration: 2
							});
							this.hand_division = false;
							this.init();
						}
					})
				}
			},
			/*批量分案方法部分*/
			//批量分案点击事件
			// 分案模式的切换

			batch_button() {
				this.batch_division = true;
				this.batch_clear();
				this.change_serverLine();
			},
			// 查询可以配置规则的团队（单选框点击事件）
			change_serverLine() {
				this.batch_clear();
				this.HttpAjax('post', 'teamList', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if (res && res.data.status === 200) {
						this.batch_info.teamNo = '-1',
						this.allTeams = res.data.data.data
					}
				})
			},
			// 团队筛选事件
			changeTeam() {
				if (this.batch_info.teamNo != undefined) {
					const _ = this;
					// 查询此团队下面的所有人员
					this.HttpAjax('post', 'getCurrentInfoByTeamNo', {
						"teamNo": this.batch_info.teamNo
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						this.this_team_people = [];
						if (res && res.data.status === 200) {
							if (res.data.data.length !== 0) {
								this.this_team_people = res.data.data
							} else {
								_.$Notice.error({
									title: '失败',
									desc: '此团队下面没有人员',
									duration: 0
								});
							}

						}
					})
					// 查询此团队下面所有可以分案的数量
					this.HttpAjax('post', 'getCurrentCountByTeamNo', {
						"teamNo": this.batch_info.teamNo
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.status === 200) {
							this.sure_batch = res.data.data;
						}
					})
				}
			},
			// 批量分案（选中人员
			team_people(data) {
				// BatchIndeterminate: true,
				// BatchCheckAll
				if (data.length === this.this_team_people.length) {
					this.BatchIndeterminate = false;
					this.BatchCheckAll = true;
				} else if (data.length > 0) {
					this.BatchIndeterminate = true;
					this.BatchCheckAll = false;
				} else {
					this.BatchIndeterminate = false;
					this.BatchCheckAll = false;
				}
				// 选人员
				this.batch_info.userList = [];
				for (let i = 0; i < data.length; i++) {
					this.batch_info.userList.push({
						"userNo": data[i],
						"userName": ""
					})
				}
			},
			//批量分案 全选人员
			BatchCheckAllGroupChangeAll() {
				if (this.BatchIndeterminate) {
					this.BatchCheckAll = false;
				} else {
					this.BatchCheckAll = !this.BatchCheckAll
				}
				this.BatchIndeterminate = false;
				if (this.BatchCheckAll) {
					this.batch_info.userList = [];
					for (let i = 0, j = this.this_team_people; i < j.length; i++) {
						this.batch_checkPeople.push(j[i].name)
						this.batch_info.userList.push({
							"userNo": j[i].name,
							"userName": ""
						})
					}
				} else {
					this.batch_checkPeople = [];
				}
			},
			// 批量分案时间转换
			dateChange_batch(val) {
				this.batch_info.currentEndDate = val
			},
			// 提交批量审核的数据
			Submit_batch_info() {
				let url;
				if (this.batch_type == 2) {
					url = 'CurrentInfoByTotal'
				} else if (this.batch_type == 1 && this.batch_typs == 4) {
					url = 'CurrentInfoByQuotaHs'
				} else if (this.batch_type == 1 && this.batch_typs == 5) {
					url = 'CurrentInfoByQuotaOverDue'
				} else if (this.batch_type == 1 && this.batch_typs == 6) {
					url = 'CurrentInfoByQuotaCapital'
				} else if (this.batch_type == 3 && this.batch_typs == 4) {
					url = 'CurrentInfoByAvgHs'
				} else if (this.batch_type == 3 && this.batch_typs == 5) {
					url = 'CurrentInfoByAvgOverDue'
				} else if (this.batch_type == 3 && this.batch_typs == 6) {
					url = 'CurrentInfoByAvgCapital';
				}
				this.add_barch_info(url)
			},
			add_barch_info(url) {
				if (this.batch_type == 2) {
					if (this.batch_info.teamNo == -1) {
						this.$layer.msg('请选择电催团队')
					} else if (this.batch_info.userList.length == 0) {
						this.$layer.msg('请选择分案成员')
					} else if (this.batch_type == -1) {
						this.$layer.msg('请选择分案规则')
					} else if (this.batch_info.executeType == '') {
						this.$layer.msg('请选择分案模式')
					} else if (this.batch_info.quotaCount == '') {
						this.$layer.msg('请输入案件数量')
					} else {
						const _ = this;
						this.HttpAjax('post', url, {
							currentInfo: JSON.stringify(this.batch_info)
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status === 200) {
								_.$Notice.success({
									title: '成功',
									desc: '分案成功',
									duration: 2
								});
								this.batch_division = false;
								this.init();
							}
						})
					}
				} else {
					if (this.batch_info.teamNo == -1) {
						this.$layer.msg('请选择电催团队')
					} else if (this.batch_info.userList.length == 0) {
						this.$layer.msg('请选择分案成员')
					} else if (this.batch_type == -1) {
						this.$layer.msg('请选择分案规则')
					} else if (this.batch_typs == '') {
						this.$layer.msg('请选择分配方式')
					} else if (this.batch_info.executeType == '') {
						this.$layer.msg('请选择分案模式')
					} else if (this.batch_info.quotaCount == '') {
						this.$layer.msg('请输入案件数量')
					} else {
						const _ = this;
						this.HttpAjax('post', url, {
							currentInfo: JSON.stringify(this.batch_info)
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if (res && res.data.status === 200) {
								_.$Notice.success({
									title: '成功',
									desc: '分案成功',
									duration: 2
								});
								this.batch_division = false;
								this.init();
							}
						})
					}
				};
				return;

			},
			// 批量分案取消按钮点击事件
			Close_Batch() {
				this.batch_division = false;
				this.batch_clear(); // 清空批量分案的数据
			},
			// 手动分案取消按钮点击事件
			Close_Hand() {
				this.hand_division = false;
				this.clean_hand();
			},
			cancel() { //案件分配模态框
				this.forecastCaseShow = false;
			},
			showforecast(name) { //青牛--获取团队
				if (name == '1') {
					this.forecastCaseShow = true;
					this.$refs['forecastCaseModel'].resetFields();
					this.distList.urgeUserList = [];
					this.getTeamList();
				} else if (name === '2') {
					this.hand_button();
				} else if (name === '3') {
					this.batch_button();
				}
			},
			getTeamList() { //青牛-->团队列表
				const _ = this;
				_.HttpAjax('post', 'getTeamInfoList', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						_.distList.teamList = res.data.data;
					}
				});
			},
			//选择团队
			selectTeam(name) {
				const _ = this;
				_.forecastCaseModel.teamNo = name;
				_.HttpAjax('post', 'selectCaseNoByTeamNo', _.forecastCaseModel.teamNo, (res) => { //青牛预测式外呼-->根据团队查询可可分配案件数，团队人员
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						if (_.forecastCaseModel.teamNo.length > 0) {
							_.forecastCaseModel.caseTotalNo = res.data.data.caseTotalNo; //总可分配数量
							_.distList.urgeUserList = res.data.data.urgeUserList; //催收人员list

							//将所选的团队下面的催收人员name保存，后面对比和选择时的催收人员
							let teamperpeo = [];
							for (let i = 0, len = _.distList.urgeUserList.length; i < len; i++) {
								teamperpeo.push(_.distList.urgeUserList[i].name);
							}
							_.distList.teamperpeoName = teamperpeo;

							// var newArr=[];//将去除团队后催收人员也相应删除的数据放入新数组
							//当去掉团队时，相应选中的催收人员也要删除
							for (let i = 0, len = _.forecastCaseModel.urgeUserList.length; i < len; i++) {
								for (let j = 0, len = _.distList.teamperpeoName.length; j < len; j++) {
									if (_.forecastCaseModel.urgeUserList[i] != _.distList.teamperpeoName[j]) {
										// newArr.push(_.forecastCaseModel.urgeUserList[i])
										_.forecastCaseModel.urgeUserList = [];
									}
								}
							}
							//将新的催收人员新数组赋值
							// _.forecastCaseModel.urgeUserList=newArr;

						} else { //若没有选中团队时，总可分配数量为空，催收人员list为空
							_.forecastCaseModel.caseTotalNo = '';
							_.distList.urgeUserList = [];
						}
					}
				}, 'json');
			},
			//选择催收人员
			selectPerpeo(name) {
				const _ = this;
				_.forecastCaseModel.urgeUserList = name;
			},
			//青牛预测式外呼-->保存信息
			saveOutbound(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'saveOutbound', _.forecastCaseModel, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '保存成功！',
									duration: 2
								});
								_.forecastCaseShow = false;
								_.init()
							}
						});
					}
				})

			},
			/*导入数据*/
			// 下载模板
			down_Template() {
				this.HttpAjax('post', 'downloadCurrentExcelTemp', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '案件分配模板');
				}, 'download')
			},
			// 导入按钮点击事件
			import_files() {
				this.$refs.inputFile.value = ''
				this.add_file = true;
			},
			//选择文件
			getUploadExcel(e) {
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
			// 提交选中的文件
			import_file() {
				this.HttpAjax('post', 'currentImport', this.importFile, (res) => {
					if (res && res.data.status === 200) {
						store.commit('UPDATE_LOADINGSTATE', false);
						this.$Notice.success({
							title: '成功',
							desc: '导入成功',
							duration: 2
						})
					}
					this.init();
					this.add_file = false;
				}, 'file')
			},
			// 取消按钮(导入数据弹窗)
			cancel_file() {
				this.add_file = false;
				this.importFile = {};
			},
			//清空批量分案的数据
			batch_clear() {
				this.BatchIndeterminate = true, // 批量分案的全选样式控制
				this.BatchCheckAll = false, // 批量分啊的全选数据控制
				this.batch_checkPeople = []; // 清空全选
				this.batch_info.teamNo = '-1'; //清空选择的团队
				this.batch_checkPeople = []; //清空选中的人员
				this.this_team_people = []; //清空团队
				this.sure_batch = ''; //清空可分案数量
				this.batch_type = '-1'; //清空分案规则
				this.batch_typs = ''; // 清空次级分案规则
				this.batch_info.quotaCount = ''; //清空自选分案数量
				this.batch_info.executeType = ''; //清空分案模式
			},
			// 手动分案弹窗关闭，清空一切数据
			clean_hand() {
				this.HandIndeterminate = true, // 手动分案的选样式控制
					this.HandCheckAll = false, // 手动分案的全选数据控制
					this.checkPeople = []; //取消全选
				this.checkPeople = [];
				this.add_team_info.currentEndDate = ''; // 清空选中的时间
				this.add_team_info.executeType = ''; // 清空选中的类型
				this.add_team_info.executeType = '',
					this.add_team_info.currentEndDate = ''
				this.add_team_info.userList = [];
				this.add_team_info.currentList = [];
			},
			//电话脱敏
			phoneZation(phone) {
				if(phone != '' && phone != null && phone != undefined){
					return phone.substring(0, 3) + '*****' + phone.substring(8, phone.length);
				}
			},
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="less">
	.productRules {
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

	/*手工分案*/

	.batch_division_class {
		.hand_content {
			ul {
				li {
					list-style: none;
					height: 40px;
					display: flex;
					border: 1px solid #dcdcdc;
					margin-bottom: 10px;

					.s_left {
						display: inline-block;
						width: 100px;
						text-align: center;
						line-height: 34px;
						border-right: 1px solid #dcdcdc;
					}

					.s_right {
						flex: 1;

						.select_one {
							display: inline-block;
							width: 100%;
							height: 100%;
							border: 0;
							outline: none;
							text-indent: 15px;
						}

						.start {
							display: inline-block;
							width: 70px;
							text-align: center;
							line-height: 34px;
						}

						.input {
							display: inline-block;
							width: 200px;
						}

						.ivu-select-dropdown-list {
							.ivu-select-item {
								padding: 7px 16px 8px;
								font-size: 14px !important;
								border: 0;
								margin: 0;
								backgrdoun: #fbfbfb;
							}
						}

						.ivu-select-large.ivu-select-single .ivu-select-selection {
							border: none;
						}

						.ivu-select-selection {
							.ivu-select-placeholder {
								border: none;
							}
						}
					}
				}

				.special {
					height: auto;

					.s_left {
						line-height: 99px;
					}

					.s_right {
						text-indent: 5px;

						p {
							margin-top: 5px;
						}
					}
				}
			}
		}
	}

	/*批量分案*/

	.batch_division_class {
		.batch_content {
			ul {
				li {
					list-style: none;
					height: 40px;
					display: flex;
					border: 1px solid #dcdcdc;
					margin-bottom: 10px;

					.s_left {
						display: inline-block;
						width: 120px;
						text-align: center;
						line-height: 34px;
						border-right: 1px solid #dcdcdc;
						background: #fbfbfb;
					}

					.s_right {
						flex: 1;

						.select_one {
							display: inline-block;
							width: 100%;
							height: 100%;
							border: 0;
							outline: none;
							text-indent: 15px;
							vertical-align: middle;

							option {
								height: 40px;
								font-size: 15px;
								background: #fff;
								text-indent: 20px;
							}

							option:hover {
								background: #fff;
								color: royalblue;
							}
						}

						.start {
							display: inline-block;
							width: 100%;
							text-indent: 10px;
							line-height: 29px;
							outline: none;
							border: 0;
						}

						.input {
							display: inline-block;
							width: 100px;
						}

						.ivu-select-dropdown-list {
							.ivu-select-item {
								padding: 7px 16px 8px;
								font-size: 14px !important;
								border: 0;
								margin: 0;
								backgrdoun: #fbfbfb;
							}
						}

						.ivu-select-large.ivu-select-single .ivu-select-selection {
							border: none;
						}

						.ivu-select-selection {
							.ivu-select-placeholder {
								border: none;
							}
						}
					}
				}

				.special {
					min-height: auto;

					.s_left {
						line-height: 35px;
					}

					.s_right {
						text-indent: 5px;

						p {
							margin-top: 5px;
						}
					}
				}
			}
		}
	}

	.batch_division_class {
		.hand_content {
			.ivu-input-wrapper {
				width: 395px;

				.ivu-input {
					border: none
				}
			}
		}

		.batch_content {
			.ivu-input-wrapper {
				width: 360px;

				.ivu-input {
					border: none
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

	.from-item .ivu-checkbox-group {
		min-height: 36px;
	}

	.teamHeight {
		height: auto !important;
	}
</style>
