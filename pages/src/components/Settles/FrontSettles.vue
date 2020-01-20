<template>
	<div class="FrontSettles">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">提前结清申请</span>
				<span class="swith head-commom">
                {{rotate ? '收起' : '展开'}}
                <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
              </span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!-- 第0个下拉选择框 -->
						<Form label-position="right" inline :model="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value" @on-change="selectChange($event,'-1')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='change_value0 != 0 && change_value1 != 0 && change_value2 != 0'>合同编号</Option>
									<Option value="1" v-show='change_value0 != 1 && change_value1 != 1 && change_value2 != 1'>客户姓名</Option>
									<!-- <Option value="2" v-show='change_value0 != 2 && change_value1 != 2 && change_value2 != 2'>申请状态</Option> -->
									<Option value="3" v-show='change_value0 != 3 && change_value1 != 3 && change_value2 != 3'>审核状态</Option>
									<Option value="4" v-show='change_value0 != 4 && change_value1 != 4 && change_value2 != 4'>营业部</Option>
									<Option value="5" v-show='change_value0 != 5 && change_value1 != 5 && change_value2 != 5'>提交人</Option>
								</Select>
								<Input v-show="change_value == 0" type="text" placeholder="请输入合同编号！" v-model="formData.loanNo" size="large"></Input>
								<Input v-show="change_value == 1" type="text" placeholder="请输入客户姓名！" v-model="formData.loanName" size="large"></Input>
<!-- 								<Select v-show="change_value == 2" v-model="formData.applyType" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option value="1">通过</Option>
									<Option value="0">不通过</Option>
								</Select> -->
								<Select v-show="change_value == 3" v-model="formData.status" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.statusList" :key="index">{{item.value}}</Option>
								</Select>
								<Select filterable v-show="change_value == 4" @on-open-change="getOrgNOList" v-model="formData.saleDepartment" placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :value="item.idKey" v-for="(item,index) in distList.OrgNOList" :key="index">{{item.groupName}}</Option>
								</Select>
								<Input v-show="change_value == 5" type="text" placeholder="请输入提交人！" v-model="formData.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第1个下拉选择框 -->
						<Form label-position="right" inline :model="formData1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value0" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='change_value != 0 && change_value1 != 0 && change_value2 != 0'>合同编号</Option>
									<Option value="1" v-show='change_value != 1 && change_value1 != 1 && change_value2 != 1'>客户姓名</Option>
									<!-- <Option value="2" v-show='change_value != 2 && change_value1 != 2 && change_value2 != 2'>申请状态</Option> -->
									<Option value="3" v-show='change_value != 3 && change_value1 != 3 && change_value2 != 3'>审核状态</Option>
									<Option value="4" v-show='change_value != 4 && change_value1 != 4 && change_value2 != 4'>营业部</Option>
									<Option value="5" v-show='change_value != 5 && change_value1 != 5 && change_value2 != 5'>提交人</Option>
								</Select>
								<Input v-show="change_value0 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.loanNo" size="large"></Input>
								<Input v-show="change_value0 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData1.loanName" size="large"></Input>
<!-- 								<Select v-show="change_value0 == 2" v-model="formData1.applyType" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option value="1">通过</Option>
									<Option value="0">不通过</Option>
								</Select> -->
								<Select v-show="change_value0 == 3" v-model="formData1.status" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.statusList" :key="index">{{item.value}}</Option>
								</Select>
								<Select filterable v-show="change_value0 == 4" @on-open-change="getOrgNOList" v-model="formData1.saleDepartment" placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :value="item.idKey" v-for="(item,index) in distList.OrgNOList" :key="index">{{item.groupName}}</Option>
								</Select>
								<Input v-show="change_value0 == '5'" type="text" placeholder="请输入提交人！" v-model="formData1.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个下拉选择框 -->
						<Form label-position="right" inline :model="formData2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='change_value != 0 && change_value0 != 0 && change_value2 != 0'>合同编号</Option>
									<Option value="1" v-show='change_value != 1 && change_value0 != 1 && change_value2 != 1'>客户姓名</Option>
									<!-- <Option value="2" v-show='change_value != 2 && change_value0 != 2 && change_value2 != 2'>申请状态</Option> -->
									<Option value="3" v-show='change_value != 3 && change_value0 != 3 && change_value2 != 3'>审核状态</Option>
									<Option value="4" v-show='change_value != 4 && change_value0 != 4 && change_value2 != 4'>营业部</Option>
									<Option value="5" v-show='change_value != 5 && change_value0 != 5 && change_value2 != 5'>提交人</Option>
								</Select>
								<Input v-show="change_value1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.loanNo" size="large"></Input>
								<Input v-show="change_value1 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData2.loanName" size="large"></Input>
<!-- 								<Select v-show="change_value1 == 2" v-model="formData2.applyType" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option value="1">通过</Option>
									<Option value="0">不通过</Option>
								</Select> -->
								<Select v-show="change_value1 == 3" v-model="formData2.status" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.statusList" :key="index">{{item.value}}</Option>
								</Select>
								<Select filterable v-show="change_value1 == 4" @on-open-change="getOrgNOList" v-model="formData2.saleDepartment" placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :value="item.idKey" v-for="(item,index) in distList.OrgNOList" :key="index">{{item.groupName}}</Option>
								</Select>
								<Input v-show="change_value1 == '5'" type="text" placeholder="请输入提交人！" v-model="formData2.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个下拉选择框 -->
						<Form label-position="right" inline :model="formData3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='change_value != 0 && change_value0 != 0 && change_value1 != 0'>合同编号</Option>
									<Option value="1" v-show='change_value != 1 && change_value0 != 1 && change_value1 != 1'>客户姓名</Option>
									<!-- <Option value="2" v-show='change_value != 2 && change_value0 != 2 && change_value1 != 2'>申请状态</Option> -->
									<Option value="3" v-show='change_value != 3 && change_value0 != 3 && change_value1 != 3'>审核状态</Option>
									<Option value="4" v-show='change_value != 4 && change_value0 != 4 && change_value1 != 4'>营业部</Option>
									<Option value="5" v-show='change_value != 5 && change_value0 != 5 && change_value1 != 5'>提交人</Option>
								</Select>
								<Input v-show="change_value2 == '0'" type="text" placeholder="请输入合同编号！" v-model="formData3.loanNo" class="twoSelect" size="large"></Input>
								<Input v-show="change_value2 == '1'" type="text" placeholder="请输入客户姓名！" v-model="formData3.loanName" class="twoSelect" size="large"></Input>
<!-- 								<Select v-show="change_value2 == 2" v-model="formData3.applyType" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option value="1">通过</Option>
									<Option value="0">不通过</Option>
								</Select> -->
								<Select v-show="change_value2 == 3" v-model="formData3.status" placeholder="请选择审核状态！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.statusList" :key="index">{{item.value}}</Option>
								</Select>
								<Select filterable v-show="change_value2 == 4" @on-open-change="getOrgNOList" v-model="formData3.saleDepartment" placeholder="请选择营业部！" class="twoSelect" size="large">
									<Option :value="item.idKey" v-for="(item,index) in distList.OrgNOList" :key="index">{{item.groupName}}</Option>
								</Select>
								<Input v-show="change_value2 == '5'" type="text" placeholder="请输入提交人！" v-model="formData3.applyUser" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button :disabled="disable" type="primary" icon="plus-circled" @click.prevent="search">查询</Button>
								<Button :disabled="disable" @click="restData()"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button v-if="this.getAuth('10000010201')" :disabled="disable" type="primary" icon="plus-circled" @click.prevent="newAddModal">新增申请</Button>	
								<Button v-if="this.getAuth('10000010202')" :disabled="disable" @click="exportExcel"><Icon type="navicon-round"></Icon> 导出数据</Button>
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
		<!--新增信息弹窗-->
		<Modal v-model="add_info" :loading="loading" draggable title="新增信息" class-name="addInfo" @on-cancel="cancel">
			<div class="from-item">
				<Form label-position="right" inline :label-width="95" ref="add_search_data" :model="add_search_data" :rules="ruleValidate">
					<FormItem label="合同编号" prop="loanNos_search">
						<Input :disabled="edit" type="text" placeholder="合同编号" v-model="add_search_data.loanNos_search" :style="width" size="large"></Input>
						<Button v-show="!edit" type="primary" size="large" @click="loanNo_search">查询</Button><br/>
					</FormItem>
					
					<FormItem label="客户姓名" prop="loanName">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.loanName"></Input>
					</FormItem>
					
					<FormItem label="总收费率" prop="acountRate">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.acountRate"></Input>
					</FormItem>
					
					<FormItem label="销售大区" prop="saleArea">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.saleArea"></Input>
					</FormItem>
					
					<FormItem label="分中心" prop="slaveCenter">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.slaveCenter"></Input>
					</FormItem>
					
					<FormItem label="营业部" prop="saleDepartment">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.saleDepartment"></Input>
					</FormItem>
					<FormItem label="是否逾期" prop="isOverdue">
						<RadioGroup :style="width" v-model="add_search_data.isOverdue">
							<Radio label="1" :disabled= 'disabled'>是</Radio>
							<Radio label="2" :disabled= 'disabled'>否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="逾期天数" prop="overdueDay">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.overdueDay"></Input>
					</FormItem>
					<FormItem label="注册日期" prop="contractSignDate">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.contractSignDate"></Input>
					</FormItem>
					<FormItem label="最近账单日" prop="nextRepaymentDate">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.nextRepaymentDate"></Input>
					</FormItem>
					<FormItem label="合同额" prop="loanAmount">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.loanAmount"></Input>
					</FormItem>
					<FormItem label="放款额" prop="dischargeAmount">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.dischargeAmount"></Input>
					</FormItem>
					<FormItem label="当前期数" prop="term">
						<Input v-model="add_search_data.term" type="text" :disabled=disabled :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="是否满三期" prop="isThreeTerm">
						<RadioGroup :style="width" v-model="add_search_data.isThreeTerm">
							<Radio label="1" :disabled= 'disabled'>是</Radio>
							<Radio label="0" :disabled= 'disabled'>否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="主体" prop="mainBody">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.mainBody"></Input>
					</FormItem>
					<FormItem label="超额金" prop="surplusAmount">
						<Input type="text" :disabled=disabled :style="width" size="large" v-model="add_search_data.surplusAmount"></Input>
					</FormItem>
					<hr>
					<br/>
					<FormItem label="申请类型" prop="applyType">
						<RadioGroup :style="width" v-model="add_search_data.applyType"  @on-change="queryReceAmtByLoanNo">
							<Radio label="02">提前结清减免</Radio>
							<Radio label="01" :disabled="applyDisable">非提前结清减免</Radio>
							<!--<Radio :key="index" :label="item.type" v-for="(item,index) in distList.jqList">{{item.value}}</Radio>-->
						</RadioGroup>
					</FormItem>
					<FormItem label="是否使用超额金" prop="isUseSurplusAmount">
						<RadioGroup :style="width" v-model="add_search_data.isUseSurplusAmount">
							<Radio label="1" :disabled="true">是</Radio>
							<Radio label="0" :disabled="true">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="还款方式" prop="repaymentType">
						<Select placeholder="请选择还款方式！" size="large" :style="width" v-model="add_search_data.repaymentType">
							<Option value="T002">财务划扣</Option>
							<Option value="N002">网关充值</Option>
							<Option value="N003">app在线还款</Option>
							<Option value="N004">其他</Option>
						</Select>
					</FormItem>
					<FormItem label="预计还款额" prop="budgetRepaymentAmount">
						<Input @on-blur="jeBlurChange" type="text" :style="width" size="large" placeholder="请输入预计还款额！" v-model="add_search_data.budgetRepaymentAmount"></Input>
					</FormItem>
					<FormItem label="预计还款日"  prop="budgetRepaymentDate">
						<DatePicker format="yyyy-MM-dd" :options="options1" type="date" placeholder="请选择时间！" @on-change='dateChange' :style="width" size="large" placement="top-start" :editable="false" v-model="add_search_data.budgetRepaymentDate">
						</DatePicker>
					</FormItem>
					<FormItem label="减免类型" prop="applyDerateType">
						<!-- :disabled="applyDerateDisabled" -->
						<Select  @on-change="deleteSelet" placeholder="请选择减免类型" size="large" :style="width" v-model="add_search_data.applyDerateType">
							<Option value="01">正常减免</Option>
							<Option value="02" :disabled="disables.derateTypes || disables.derateTypes1">特殊减免</Option>
						</Select>
					</FormItem>
					<FormItem label="申请减免金额" prop="applyDerateAmount">
						<Input type="text" :disabled="true"  placeholder="请输入申请减免金额！" :style="width" size="large" v-model="add_search_data.applyDerateAmount"></Input>
					</FormItem>
					<FormItem label="应收客户总额" prop="receivableAmount">
						<Input type="text" :disabled="true" placeholder="请输入应收客户总额！"  :style="width" size="large" v-model="add_search_data.receivableAmount"></Input>
					</FormItem>
					<FormItem label="责任类型" prop="liabilityType" v-if="disables.showLibType">
						<!-- :disabled="liabilityDisabled" -->
						<Select :disabled="liabilityDisabled"  placeholder="请选择责任类型" size="large" :style="width" 
						v-model="add_search_data.liabilityType"	
						>
							<Option value="1"  v-if="add_search_data.applyDerateType == '01'">有责</Option>
							<Option value="2"  v-if="add_search_data.applyDerateType == '01'">无责</Option>
						</Select>
					</FormItem>
					<FormItem label="申请人" prop="applyUser">
						<Input type="text" placeholder="请输入申请人！" :style="width" size="large" v-model="add_search_data.applyUser"></Input>
					</FormItem>
					<FormItem label="减免\提前结清原因" prop="applyReason" class="tips">
						<!-- 是否逾期 是  减免金额大于0 正常减免  有责 -->
						<Select
							v-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '01' && add_search_data.liabilityType == '1' "
							placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason"
							@on-open-change="queryReasonType($event,'responsibility')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.responsibility">{{item.label}}</Option>
						</Select>
						<!-- 是否逾期 是  减免金额大于0  正常减免 无责 -->
						<Select
							v-else-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '01' && add_search_data.liabilityType == '2' "
							placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason"
							@on-open-change="queryReasonType($event,'non_responsibility')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.non_responsibility">{{item.label}}</Option>
						</Select>
						<!-- 是否逾期 是  减免金额大于0 特殊减免 -->
						
						
						<Select
							v-else-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '02' "
							placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason"
							@on-open-change="queryReasonType($event,'special')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.special">{{item.label}}</Option>
						</Select>
						<!--当不满足“是否逾期为是且减免金额大于0”的情况时 -->
						<Select v-else-if="add_search_data.isOverdue != '1' || add_search_data.applyDerateAmount <= 0.00"
							placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason"
							@on-open-change="queryReasonType($event,'other')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.other">{{item.label}}</Option>
						</Select>
						<Select v-else
							placeholder="请选择减免\提前结清5" size="large" :style="width" v-model="add_search_data.applyReason">
						</Select>
					</FormItem>
					<FormItem label="申请人部门" prop="applyDepartment">
						<Input type="text" placeholder="请输入申请人部门！" :style="width" size="large" v-model="add_search_data.applyDepartment"></Input>
					</FormItem><br>
					<FormItem label="附件" class="upLoad">
						<!-- 文件上传类 -->
						<div id="uploadFile">
							<div class="demo-upload-list" v-for="(item,index) in fileObj.uploadList">
								<template>
									<img :src="item.imgUrl">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
									</div>
								</template>
							</div>
							<input class="file" @change="getUploadImg" type="file" accept="image/*" multiple ref="uploads" />
							<div class="upload-drag" @click="uploadsFile">
								<Icon type="ios-camera" size="26" />
							</div>
						</div>
					</FormItem><br>
					<FormItem label="备注" prop="remark">
						<Input type="textarea" :maxlength="100" style="width:600px" :autosize="{minRows: 5,maxRows: 6}" placeholder="请输入备注" v-model="add_search_data.remark"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large"  v-if="!edit" @click="Submit_Info('add_search_data')">提交</Button>
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
	import rowExpand from '../common/row-expand.vue'
  import qs from 'qs'
	export default {
		components: { rowExpand },
		name: "Settle",
		data() {
			const min = (rule, value, callback) => {
				let max = this.add_search_data.receivableAmount;
				if(/^\d+(\.\d{0,2})?$/.test(value)){
					if(max !== ''){
						if(value > max) {
							callback(new Error('要小于应收客户总额！'));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}else{
					callback(new Error('必须是最多两位小数的数字！'));
				}
			};
			//责任类型
			const zrType = (rule, value, callback)=>{
				let jmType = this.add_search_data.applyDerateType; //减免类型
				let isOverdue = this.add_search_data.isOverdue; //是否逾期
				let appType = this.add_search_data.applyDerateAmount;	//申请减免金额
				if(jmType != '01'){
					callback();
				}else if(isOverdue !='1' || appType <= 0){
					callback();
				}else{
					if(value == '' || value == null || value == undefined){
						callback(new Error('责任类型必填！'));
					}else{
						callback();
					}
				}
			};
			//减免类型
			const jmType = (rule, value, callback)=>{
				let isOverdue = this.add_search_data.isOverdue; //是否逾期
				let appType = this.add_search_data.applyDerateAmount;	//申请减免金额
				if(isOverdue !='1' || appType <= 0){
					callback();
				}else{
					if(value == '' || value == null || value == undefined){
						callback(new Error('减免类型必填！'));
					}else{
						callback();
					}
				}
			};
			//备注
			const remark = (rule, value, callback)=>{
				let isOverdue = this.add_search_data.isOverdue ; //是否逾期
				let appType = this.add_search_data.applyDerateAmount;	//申请减免金额
				let addType = this.add_search_data.applyDerateType;	//特殊减免

				if(isOverdue == '1' && appType >0 && addType =='02'){
					if(value == '' || value == null || value == undefined){
						callback(new Error('备注必填！'));
					}else{
						callback();
					}
				}else{
					callback();
				}
			};
			return {
				options1: {
                    disabledDate (date) {
                    	let week = new Date().getDay();
                    	let work = -1;
                    	/*if(week <=3){
                    		work = 9;
                    	}else if(week == 6){
                    		work = 10;
                    	}else if(week == 4 || week == 5){
                    		work = 11;
                    	}*/
                        return date && date.valueOf() < Date.now() + work*86400000;
                    }
                },
                handleType:'', // 分案类型
                disables:{
                	derateTypes:false,
                	derateTypes1:false,
                	showLibType:true,  //责任类型显隐
                },
				loanContractNo:'',
				disable:false,
				applyDisable:false,  //申请类型禁用控制
				liabilityDisabled:false,
				applyDerateDisabled:false,
				value1: '1',
				loading: true,
				rotate: true,
				addApply: false,
				placeholder: "请输入客户姓名！",
				edit: false,
				totallPages: 0,
				change_value: '0',
				change_value0: '1',
				change_value1: '4',
				change_value2: '3',
				//筛选字段
				formData:{
					loanNo:'',		//合同编号
					loanName:'',		//客户姓名
					applyType:'',	//申请类型
					status:'',		//审核状态
					saleDepartment:'',//营业部
					applyUser:'',		//申请人
				},
				formData1:{
					loanNo:'',		//合同编号
					loanName:'',		//客户姓名
					applyType:'',	//申请类型
					status:'',		//审核状态
					saleDepartment:'',//营业部
					applyUser:'',		//申请人
				},
				formData2:{
					loanNo:'',		//合同编号
					loanName:'',		//客户姓名
					applyType:'',	//申请类型
					status:'',		//审核状态
					saleDepartment:'',//营业部
					applyUser:'',		//申请人
				},
				formData3:{
					loanNo:'',		//合同编号
					loanName:'',		//客户姓名
					applyType:'',	//申请类型
					status:'',		//审核状态
					saleDepartment:'',//营业部
					applyUser:'',		//申请人
				},
				LastSubmitData:{
					pageIndex:1,
					pageSize:10,
				},
				formModalData: {},
				columns: [
					{
						type:'expand',
						title:'查看审核流程',
						minWidth:120,
						render: (h, params) => {
							if(this.getAuth('10000010206')){
								return h(rowExpand, {
									props: {
										row: params.row
									}
								})
							}
						}
					},
					{
						title: '合同编号',
						minWidth: 180,
						key: 'loanNo',
					},
					{
						title: '营业部',
						minWidth: 120,
						key: 'saleDepartment',
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'loanName',
					},
					{
						title: '主体',
						minWidth: 120,
						key: 'mainBody',
					},
					{
						title: '申请类型',
						minWidth: 130,
						key: 'applyType',
					},
					{
						title: '当前期数',
						minWidth: 120,
						key: 'term',
					},
					{
						title: '逾期天数',
						minWidth: 120,
						key: 'overdueDay',
					},
					{
						title: '审核状态',
						minWidth: 130,
						key: 'status',
					},
					{
						title: '原因',
						minWidth: 120,
						key: 'remark',
					},
					{
						title: '提交时间',
						minWidth: 120,
						key: 'applyDate',
					},
					{
						title: '审核时间',
						minWidth: 120,
						key: 'updateTime',
					},
					{
						title: '提交人',
						minWidth: 120,
						key: 'applyUser',
					},
					{
						title: '操作',
						minWidth: 250,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',type: 'info',disabled:this.disable
									},
									style: {
										marginRight: '5px',
										display:this.getAuth('10000010203') ? 'inline-block' : 'none'
									},
									on: {
										click: () => {
											this.editEarlyClearanceAudit(params);
										}
									}
								}, '详情'),
								h('Button', {
									props: {
										size: 'small',type: 'info',disabled:this.disable
									},
									style: {
										marginRight: '5px',
										display:(params.row.status == '审核中' && this.getAuth('10000010204')) ?  'inline-block' :'none' ,
									},
									on: {
										click: () => {
											this.EarlyClearRevoke(params);
										}
									}
								}, '撤销'),
								h('Button', {
									props: {
										size: 'small',type: 'info',disabled:this.disable,
									},
									style: {
										display:(params.row.status == '审核通过未冲抵' && this.getAuth('10000010205')) ? 'inline-block' : 'none',
									},
									on: {
										click: () => {
											this.EarlyClearRevokeHk(params);
										}
									}
								}, '划扣')
							])
						}
					},
				],
				datas: [],
				/*新增申请的弹窗内容*/
				add_info: false,
				width: {
					width: '245px'
				},
				fileObj:{//新增文件上传返回类
					uploadList: [],
					filesModel:false,
					imgName:''
				},
				disabled: true,
				/*新增申请传递给服务器的数据*/
				add_search_data: {
					loanNos_search: '', // 合同编号
					loanName: '', // 客户姓名
					saleArea: '', // 销售大区
					acountRate: '', //总费率
					slaveCenter: '', // 分中心
					saleDepartment: '', // 营业部
					applyDerateType: '', // 减免类型 ------------
					overdueDay: '', //逾期天数
					loanAmount: '', // 合同额
					dischargeAmount: '', // 放款额
					surplusAmount: '', // 超额金
					isOverdue: '', // 是否逾期 1：逾期 0： 没有
					isUseSurplusAmount: '1', // 是否使用超额金 1：是 0： 否
					isThreeTerm: '', // 是否满三期
					contractSignDate: '', // 注册日期
					createUserDepartment: '', //申请人部门
					createName: '', //申请人
					mainBody: '', // 主体
					nextRepaymentDate: '', // 最近账单日
					term: '', //当前期数

					//回传字段
					applyType: '', //申请类型
					repaymentType: '', //还款方式 1：存对公 2 ：划扣 3：账扣
					budgetRepaymentAmount: '', //预计还款额
					budgetRepaymentDate: '', //预计还款日期
					applyDerateAmountType: '', //减免类型
					applyDerateAmount: '', //申请减免金额
					receivableAmount: '', //应收客户总额
					liabilityType: '', //责任类型
					applyUser: '', //申请人
					applyDepartment: '', //申请人部门
					applyReason: '', //减免提前结清原因
					remark: '', //备注
					fileInfo: '', //附件
				},
				ruleValidate:{
					applyType: [{required:true,message:'申请类型必须选择！'}], //申请类型
					isUseSurplusAmount:[{required:true,message:'是否使用超额金必须选择！'}], //
					repaymentType: [{required:true,message:'还款方式必须选择！'}], //还款方式 1：存对公 2 ：划扣 3：账扣
					budgetRepaymentAmount:[{required:true,message:'预计还款额必须填写！'},{validator:min,trigger: 'blur'}], //预计还款额
					budgetRepaymentDate:[{required:true,message:'预计还款日期必须选择！'}], //预计还款日期
					applyDerateType:[{validator:jmType,trigger: 'change'}],//减免类型
					applyDerateAmountType: [{required:true,message:'减免类型必须选择！'}], //减免类型
					applyDerateAmount: [{required:true,message:'申请减免金额必须填写！'}], //申请减免金额
					receivableAmount: [{required:true,message:'应收客户总额必须填写！'}], //应收客户总额
					liabilityType: [{validator:zrType,trigger: 'change'}], //责任类型
					applyUser: [{required:true,message:'申请人必须填写！'}], //申请人
					applyDepartment: [{required:true,message:'申请人部门必须填写！'}], //申请人部门
					applyReason: [{required:true,message:'减免提前结清原因必须填写！'}], //减免提前结清原因
					applyUser:[{required:true,message:'申请人必须填写！'}],
					remark: [{validator:remark,trigger: 'blur'}], //备注
				},
				distList:{
					OrgNOList:[],
					statusList:[],
					jqList:[]
				},
				typeList:{
					special:[],
		    		responsibility:[],
		    		non_responsibility:[],
		    		other:[]
				}
			}
		},
		methods: {
			init() {
				const _ = this;
				_.earlyClearance();
			},
			// 默认查询数据
			earlyClearance(page,pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;

				_.HttpAjax('post', 'queryRepaySettleInfo', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200'){
					  _.totallPages=res.data.data.dataCount;
					  _.datas = res.data.data.data;
					}
				});
			},
			//翻页-->第几页
			changePages(name) {
				this.earlyClearance(name);
			},
			//每一页显示多少条数据
			changePagesTotall(name) {
				this.LastSubmitData.pageSize = name;
				this.earlyClearance('', name);
			},
			//查询
			search(){
				this.ClearObject(this.LastSubmitData)
				for(let i in this.formData){
					if(this.formData[i] != ''){
						this.$set(this.LastSubmitData, i ,this.formData[i])
					}
				}
				for(let i in this.formData1){
					if(this.formData1[i] != ''){
						this.$set(this.LastSubmitData, i ,this.formData1[i])
					}
				}
				for(let i in this.formData2){
					if(this.formData2[i] != ''){
						this.$set(this.LastSubmitData, i ,this.formData2[i])
					}
				}
				for(let i in this.formData3){
					if(this.formData3[i] != ''){
						this.$set(this.LastSubmitData, i ,this.formData3[i])
					}
				}
				this.earlyClearance();
			},
			//刷新
			refresh() {
				this.earlyClearance();
			},
			//下拉选择项变化时
			selectChange(val,index) {
				if(index == -1){
					this.change_value = val
				}else{
					this['change_value'+index] = val
				}
			},
			//第0下拉框展开
			ClearVal(val,index) {
				if (val){
					if(index == 0){
						this.ClearObject(this.formData)
					}else{
						this.ClearObject(this['formData'+index])
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
			 //重置
			restData() {
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.earlyClearance()
			},
			newAddModal() {
				const _ = this;
				_.edit = false;
				_.add_info = true;
				_.disable=true;
				_.$refs.add_search_data.resetFields();
				_.fileObj.uploadList = [];
				_.loanContractNo = '';
			},
			cancel() {
				this.add_info = false;
				this.earlyClearanceOpera = false;
				this.disable=false;
			},
			getApplyModeTo() {
				const _ = this;
			},
			// 时间格式转换
			dateChange(val) {
				this.add_search_data.budgetRepaymentDate = val;
			},
			// 根据合同编号查询信息
			loanNo_search() {
				if(this.add_search_data.loanNos_search != ''){
					this.HttpAjax('post', 'queryInfoByLoanNo', {
						"loanNo": this.add_search_data.loanNos_search,
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						this.loanContractNo = res.data.data.loanContractNo;
						if(res && res.status === 200) {
							for(let i in res.data.data) {
								if(i != 'receivableAmount' && i != 'isUseSurplusAmount'){
									this.add_search_data[i] = res.data.data[i];
								}
							}
							
							//最近账单日 如果小于当前时间只能提前结清  不包括委外案件
							this.add_search_data.applyType = '';//清空申请类型
							let nextTime = res.data.data.nextRepaymentDate;
							if((new Date(nextTime).getTime() < new Date().getTime()) && res.data.data.handleType != '3'){
								this.applyDisable = true;
							}else{
								this.applyDisable = false;
							};
							this.handleType  = res.data.data.handleType;
							//如果是委外案件 不能够做非提前减免
							if(res.data.data.handleType == '3'){
								this.applyDisable = true;
							}else{
								this.applyDisable = false;
							}
						}
					});
				}else{
					this.$layer.msg('请输入合同编号！');
				}
			},
			//根据合同编号和减免类型查询贷款金额
			queryReceAmtByLoanNo(val) {
				if(val != undefined){
					if(this.loanContractNo == ''){
						this.$layer.msg('请先查询合同编号!');
					}else{
						this.add_search_data.applyDerateType = ''; //清空减免类型
						this.HttpAjax('post', 'queryReceAmtByLoanNo', {
							"loanNo": this.add_search_data.loanNos_search,
							"applyDerateType": val
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status === 200) {
								this.add_search_data.receivableAmount = Math.ceil(res.data.data.receivableAmount*100)/100;
								this.add_search_data.surplusAmount = res.data.data.surplusAmount;

								if(this.add_search_data.budgetRepaymentAmount != ''){
									this.add_search_data.applyDerateAmount = (res.data.data.receivableAmount - this.add_search_data.budgetRepaymentAmount).toFixed(2);
								}
								//当不满足“是否逾期为是或者减免金额大于0”的情况时，减免类型、责任类型为空且不可编辑
								if(this.add_search_data.isOverdue != '1' || this.add_search_data.applyDerateAmount <= 0){
									this.liabilityDisabled = true; this.applyDerateDisabled = true;
									this.add_search_data.applyDerateType = '';
									this.add_search_data.liabilityType = '';
								}else{
									this.liabilityDisabled = false; this.applyDerateDisabled = false;
								}
								
								//如果超额金小于等于0   是否使用超额金为否
								/*if(res.data.data.surplusAmount <= 0){
									this.add_search_data.isUseSurplusAmount = '0';
								}else{
									this.add_search_data.isUseSurplusAmount = '1';
								}*/
							}
						});
						// 未分案 和  电催处理 的 非提前结清 不能特殊减免  委外的非提前可以特殊减免
						if(this.handleType != '3' && this.add_search_data.applyType == '01'){
							this.disables.derateTypes1 = true;
						}else{
							this.disables.derateTypes1 = false;
						}
					}
				}
			},
			//详情
			editEarlyClearanceAudit(list){
				const _ = this;
				_.edit = true;
				_.add_info = true;
				_.disable=true;
				_.$refs.add_search_data.resetFields();
				_.fileObj.uploadList = [];
				_.loanContractNo = '';

				_.HttpAjax('post','EarlyClearInfo',{repaySettleId:list.row.repaySettleId},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						for(let i in _.add_search_data){
							_.add_search_data[i] = res.data.data[i];
						}
						_.loanContractNo = res.data.data.loanContractNo;
						
						let filed = res.data.data.files;
						for(let i=0;i<filed.length;i++){
							_.fileObj.uploadList.push({imgUrl:filed[i]});
						}
						
						if(_.add_search_data.isOverdue == '1' && _.add_search_data.applyDerateAmount > 0 && _.add_search_data.applyDerateType == '01' && _.add_search_data.liabilityType == '1'){
							// 是否逾期 是  减免金额大于0 正常减免  有责
							_.queryReasonType(true,'responsibility');
						}else if(_.add_search_data.isOverdue == '1' && _.add_search_data.applyDerateAmount > 0 && _.add_search_data.applyDerateType == '01' && _.add_search_data.liabilityType == '1'){
							// 是否逾期 是  减免金额大于0 正常减免  无责
							_.queryReasonType(true,'non_responsibility');
						}else if(_.add_search_data.isOverdue == '1' && _.add_search_data.applyDerateAmount > 0 && _.add_search_data.applyDerateType == '02'){
							// 是否逾期 是  减免金额大于0 特殊减免
							_.queryReasonType(true,'special');
						}else if(_.add_search_data.isOverdue != '1' || _.add_search_data.applyDerateAmount <= 0){
							//非 是否逾期 是  减免金额大于0
							_.queryReasonType(true,'other')
						}
					}
				});
			},
			// 提交按钮点击事件
			Submit_Info(name) {
				const _=this;
				let Submit_info = {
					loanName: this.add_search_data.loanName, // 客户姓名
					loanNo: this.loanContractNo, // 合同号
					saleAreaId: this.add_search_data.saleArea, //销售大区
					slaveCetnerId: this.add_search_data.slaveCenter, //分中心

					saleDepartmentId: this.add_search_data.saleDepartment, // 营业部
					// saleTeamId: this.add_search_data.saleTeamId,//团队
					isOverdue: this.add_search_data.isOverdue, //是否逾期
					overdueDay: this.add_search_data.overdueDay, //逾期天数
					loanAmount: this.add_search_data.loanAmount, //合同额
					dischargeAmount: this.add_search_data.dischargeAmount, //放款额
					mainBody: this.add_search_data.mainBody, // 主体
					surplusAmount: this.add_search_data.surplusAmount, // 超额金
					applyType: this.add_search_data.applyType, //申请类型
					receivableAmount: this.add_search_data.receivableAmount, //应收客户总额
					budgetRepaymentAmount: this.add_search_data.budgetRepaymentAmount, //预计还款额
					budgetRepaymentDate: this.add_search_data.budgetRepaymentDate, //预计还款日期
					applyDerateAmount: this.add_search_data.applyDerateAmount, //申请减免金额
					repaymentType: this.add_search_data.repaymentType, //还款方式
					applyDerateAmountType: this.add_search_data.applyDerateType, //减免类型
					liabilityType: this.add_search_data.liabilityType, //责任类型
					applyUser: this.add_search_data.applyUser, //申请人
					applyDepartment: this.add_search_data.applyDepartment, //申请人部门
					applyReason: this.add_search_data.applyReason, //减免提前结清原因
					term: this.add_search_data.term, //当前期数
					isThreeTerm: this.add_search_data.isThreeTerm, //是否满三期
					nextRepaymentDate: this.add_search_data.nextRepaymentDate, // 最近账单日
					remark: this.add_search_data.remark, //备注
					fileInfo: '', //附件
				};				
				if(_.loanContractNo == ''){
					_.$layer.msg('请先查询合同编号！！');
				}else{
					_.$refs[name].validate((valid) => {
						if(valid){
							if(_.fileObj.uploadList.length <= 0){
								_.$layer.msg('请先选择附件上传！');
							}else{
								let files = JSON.parse(JSON.stringify(_.fileObj.uploadList));
								files.forEach((r,i)=>{
									delete r.imgUrl
								});
								Submit_info.fileInfo = JSON.stringify(files);
								_.HttpAjax('post', 'submitRemissionClearance',Submit_info, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if(res.data.status == 200){
										_.$Notice.success({
											title: '成功',
											desc: '新增信息成功',
											duration: 2
										});
										this.add_info = false;
										this.disable=false;
										this.init();
									}
								})
							}
						}
					});
				}

			},
			// 提交选择的图片
			getUploadImg(e) {
				const _ = this;
				var File = e.target.files;
				var size = File.size;
				var formdata = new FormData();
				if(File.length > 7 || (_.fileObj.uploadList.length+File.length) >7){
					_.$layer.msg('最多只能上传七个文件！');
				}else{
					for(let i = 0; i < File.length; i++) {
						if(File[i].size > 2*1024*1024){
							_.$layer.msg('附件大小不能超过2M！');
							return;
						};
						if(File[i].type.indexOf('jpeg') == -1  && File[i].type.indexOf('png') == -1 && File[i].type.indexOf('jpg')==-1){
							_.$layer.msg('请上传png，jpg，jpeg格式的附件！');
							return;
						}

						formdata.append('files', File[i]);
					}
					_.HttpAjax('post', 'upLoadImg', formdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res.data && res.data.status == 200) {
							let len = res.data.data;
							for(let i=0;i<len.length;i++){
								_.fileObj.uploadList.push(len[i]);
							}
						}
					}, 'file');
				}
			},//文件上传类
			uploadsFile() {
				const _ = this;
				let events = _.$refs.uploads;
				events.value = '';
				if(_.fileObj.uploadList.length >=7){
					_.$layer.msg('最多只能上传七个文件！');
				}else{
					events.click();
				}
			},
			handleView(name) {
				this.fileObj.imgName = name.imgUrl;
				this.fileObj.fileName = name.fileName;
				this.fileObj.filesModel = true;
			},
			handleRemove(file){
				this.fileObj.uploadList.splice(file,1)
			},
			//字典表查询
			getOrgNOList(bol) {
				const _ = this;
				if(bol) {
					if(_.distList.OrgNOList.length == 0) {
						_.HttpAjax('post', 'getOrgNO', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								_.distList.OrgNOList = res.data.data;
							}
						});
					}
				}
			},
			jeBlurChange(){
				const _=this;
				let vals = _.add_search_data.budgetRepaymentAmount;
				if(/^\d+(\.\d{0,2})?$/.test(vals)){
					if(this.add_search_data.receivableAmount != ''){
						this.add_search_data.applyDerateAmount = (this.add_search_data.receivableAmount - this.add_search_data.budgetRepaymentAmount).toFixed(2);

						//当不满足“是否逾期为是或者减免金额大于0”的情况时，减免类型、责任类型为空且不可编辑
						if(this.add_search_data.isOverdue != '1' || this.add_search_data.applyDerateAmount <= 0){
							this.liabilityDisabled = true; this.applyDerateDisabled = true;
							this.add_search_data.applyDerateType = '';
							this.add_search_data.liabilityType = '';
						}else{
							this.liabilityDisabled = false; this.applyDerateDisabled = false;
						}
					}
				}
			},
		    // 导出数据 按钮
		    exportExcel() {//导出
		        const _ = this;
		        _.HttpAjax('post', 'downloadRepaySettleInfoExcel', qs.stringify(_.LastSubmitData), (res) => {
		          store.commit('UPDATE_LOADINGSTATE', false);

		          //二进制流文件下载
		          this.downLoadFile(res.data, '提前结清申请.xlsx');

		        }, 'download');
		    },
				// 字典表查询状态
		    EarlyClearanceApplyStatus(value){
		    	const _=this;
		    	_.HttpAjax('post','distList',{label:value},(res)=>{
		    		store.commit('UPDATE_LOADINGSTATE', false);
		    		if(res && res.data.status == 200){
		    			if(value == 'EarlyClearanceApplyStatus'){
		    				_.distList.statusList = res.data.data;
		    			}else if(value == 'RouteSettleType'){
		    				_.distList.jqList =  res.data.data;
		    			}
		    		}
		    	});
		    },
		    deleteSelet(val){
		    	const _=this;
		    	_.add_search_data.applyReason = '';

		    	//减免类型非“正常减免”时 责任类型为空，不可编辑
		    	if(_.add_search_data.applyDerateType != '01'){
		    		_.liabilityDisabled = true;
		    		_.add_search_data.liabilityType = '';
		    	}else{
		    		_.liabilityDisabled = false;
		    	}
		    },
		    queryReasonType(val,ty){
		    	const _=this;
		    	if(val){
						///if(_.typeList[ty].length <= 0){
							_.HttpAjax('post','queryReasonType',{reasonType:ty},(res)=>{
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res && res.data.status == 200){
									_.typeList[ty] = res.data.data;
								}
							});
						//}
					}
		    },
				// 撤销按钮点击事件
		    EarlyClearRevoke(list){
		    	const _=this;
		    	_.HttpAjax('post','EarlyClearRevoke',{
		    		handsystem:"1",
		    		checkStatus:"5",
		    		loanContractNo:list.row.loanNo,
		    		repaySettleId:list.row.repaySettleId
		    	},(res)=>{
		    		store.commit('UPDATE_LOADINGSTATE', false);
			    		if(res && res.data.status == 200){
			    			_.$Notice.success({
			    				title:'撤销',
			    				desc:'撤销成功！'
			    			});
								this.init();
			    		}
		    	})
		    },
				//划扣按钮点击事件
		    EarlyClearRevokeHk(list){
		    	const  _=this;
		    	_.HttpAjax('post','EarlyClearInfo',{
		    		repaySettleId:list.row.repaySettleId
		    	},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						let much = res.data.data.budgetRepaymentAmount;
						_.HttpAjax('post', 'addReserver', {
							reserverAmount: much,
							reserverType: '2', //减免划扣
							reserverMethod: '2',//实时划扣
							loanContractNo:list.row.loanNo,
							applyType:list.row.applyType,   //减免类型
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								this.$Notice.success({
									title: '成功',
									desc: '划扣成功'
								});
								this.init();
							}
						})
					}
				});
		    }
		},
		created() {
			this.init();
			this.EarlyClearanceApplyStatus('EarlyClearanceApplyStatus');
			this.EarlyClearanceApplyStatus('RouteSettleType');
		},
		mounted() {

		},
		watch:{
			add_search_data:{
				handler(n,o){
					if(this.add_search_data.applyType == '02'){ //当为  提前结清减免时
						if(o.applyDerateAmount === '0.00'){
							this.disables.derateTypes = true;
							this.add_search_data.liabilityType = '1';  //有责 不能选择
							this.disables.showLibType = false;
						}else{
							this.disables.derateTypes = false;
							this.disables.showLibType = true;
						}
					}
				},
				deep:true
			}
		}
	}
</script>

<style lang="less">
	.FrontSettles {
		.ivu-table-fixed-body {
			// overflow: visible;
		}
		.tips.ivu-form-item .ivu-select-large.ivu-select-single .ivu-select-selection{
			height:48px;
			.ivu-select-selected-value{
				line-height: 48px;
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
	}

	.addInfo {
		.ivu-modal .ivu-modal-content {
			width: 750px !important;
		}
	}
</style>
