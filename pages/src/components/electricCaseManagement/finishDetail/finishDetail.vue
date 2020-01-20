<template>
	<div class="detail">
		<!-- 公共tab样式类 tabs-item -->
		<a href="javascript:;" @click="goBack" style="display:inline-block;margin-bottom: 6px;font-size: 14px;">
			<Icon size="20" type="ios-arrow-back" /> 返回</a>
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="tabActive">
				<TabPane label="重要信息" name="tabpane1">
					<div class="choiceTabs" v-show="showTab == 'tabpane1'">
						<important-info ref="importantInfos" :loanContractNo="loanContractNo"></important-info>
					</div>
				</TabPane>
				<TabPane label="案件详情" name="tabpane7">
					<div class="choiceTabs" v-show="showTab == 'tabpane7'">
						<details-thecase :loanContractNo="loanContractNo"></details-thecase>
					</div>
				</TabPane>
				<TabPane label="贷款信息" name="tabpane2">
					<div class="choiceTabs" v-show="showTab == 'tabpane2'">
						<loan-info :clientInfo="clientInfo" :otherContactDtos="otherContactDtos" :familyInfoDto="familyInfoDto"></loan-info>
					</div>
				</TabPane>
				<TabPane label="资料影像" name="tabpane4">
					<div class="choiceTabs" v-show="showTab == 'tabpane4'">
						<image-data :imageData="imageData"></image-data>
					</div>
					<div class="tabs-item">
						<div class="page-item" style="text-align: right;padding:0;">
							<Page :total="imageDataCount" show-total @on-change="imageDataPage"></Page>
							<Icon type="ios-refresh" style="font-size: 30px" @click="imageDataPageRefresh" />
						</div>
					</div>
				</TabPane>
				<TabPane label="催收记录" name="tabpane3">
					<div class="choiceTabs" v-show="showTab == 'tabpane3'">
						<collection-record :datacs="getUrgeRecord" :datatc="stopUrgeRecordList" :dataTCJHJL="stopUrgeActRecordList"></collection-record>
					</div>
				</TabPane>

				<TabPane label="通知记录" name="tabpane5">
					<div class="choiceTabs" v-show="showTab == 'tabpane5'">
						<notice-record :getNoticeRecord="getNoticeRecord"></notice-record>
					</div>
				</TabPane>
				<TabPane label="分案记录" name="tabpane6">
					<div class="choiceTabs" v-show="showTab == 'tabpane6'">
						<record-cases :getDivisionRecord="getDivisionRecord"></record-cases>
					</div>
				</TabPane>
				<TabPane label="关联案件" name="tabpane8">
					<div class="choiceTabs" v-show="showTab == 'tabpane8'">
						<guanlian-cases :getRelationCase="getRelationCase"></guanlian-cases>
					</div>
				</TabPane>
			</Tabs>
		</div>
		<!--btn 按钮-->
		<div class="btnGroup" v-if="showButton">
			<Button type="primary" :disabled="Recharge"  @click.prevent="RechargeMoney">代充值</Button>
			<Button type="primary" :disabled="disabledMethod1 || letterRepairlButton2" @click="repairTransfer">信修</Button>
			<Button type="primary" :disabled="disabledTQJQ || disabledTQJQ2" @click.prevent="newAddModal">提前结清/减免</Button>
			<Button type="primary" v-if='this.disabledOutboard2Hidden' :disabled="disabledOutboard || disabledOutboard2" @click="TQweiwai">提前委外</Button>
			<Button type="primary" v-if='this.CxdisabledOutboard2Hidden' :disabled="disabledOutboard" @click="CxTQweiwai">撤销提前委外</Button>
			<Button type="primary" :disabled="disabledStopUrging || disabledStopUrging2" @click="tingcui">停催</Button>
			<Button type="primary" :disabled="disabledMethod || disabledMethod2" @click="delimitMethod">划扣</Button>
			<a :href="hrefUrl" target="_blank" ref="hrefOpen" style='display: none'>lianjie</a>
			<Dropdown @on-click="WayNotice" trigger="click">
				<Button :disabled="isdis" type="primary">
					通知方式
					<Icon type="ios-arrow-down"></Icon>
				</Button>
				<DropdownMenu slot="list">
					<DropdownItem :disabled="disabledNotice" name="item1">邮件</DropdownItem>
					<DropdownItem :disabled="disabledNotice" name="item2">信函</DropdownItem>
					<DropdownItem :disabled="disabledNotice" name="item3">短信</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
		<!--通讯信息-->
		<Row class="detail-row tabs-item" style="margin-top:0 ;">
			<Col span="14">
			<div class="wrap-title" style="padding-bottom: 13px;">
				<span class="line">&nbsp;</span>
				<span class="tit">通讯信息</span>
			</div>
			<Tabs :value="tabSr" type="card" @on-click="switchTAB" style="border-top: 1px solid #dddddd;">
				<TabPane label="联系人信息" name="tab1">
					<div v-show="tabSr == 'tab1'">
						<contact-information ref="mychild" :contactINFO="contactINFO" @closeStopadd="closeStopUrging" @addBtnPeo="ALLdisabled"
						 @remarkPeo="remarkPeo" :loanContractNo="loanContractNo" :sessionBtn="sessionBtn"></contact-information>
					</div>
				</TabPane>
				<TabPane label="APP通讯录" name="tab2">
					<div v-show="tabSr == 'tab2'">
						<appmail-list @remarkPeo="remarkPeo" :dataAPP="APPmailList" v-on:OneAgainGetMailList='OneAgainGetMailList'></appmail-list>
					</div>
				</TabPane>
				<TabPane label="APP通话记录" name="tab3">
					<div v-show="tabSr == 'tab3'">
						<app-callrecord @remarkPeo="remarkPeo" :callRecordINFO="callRecordINFO" v-on:OneAgainGetData='OneAgainGetData'></app-callrecord>
					</div>
				</TabPane>
				<TabPane label="电商收货信息" name="tab4">
					<div v-show="tabSr == 'tab4'">
						<online-retailers @remarkPeo="remarkPeo" :OnlineRetailersAddress="OnlineRetailers" v-on:OnlineRetailersAddress='OnlineRetailer'></online-retailers>
					</div>
				</TabPane>
				<TabPane label="运营商通话记录" name="tab5">
					<div v-show="tabSr == 'tab5'">
						<Operator-calls @remarkPeo="remarkPeo" :operatorCall="operatorCallrecords" v-on:operatorCall='operatorCalls'></Operator-calls>
					</div>
				</TabPane>
				<TabPane label="三方信修" name="tab6">
					<div v-show="tabSr == 'tab6'">
						<three-repair @remarkPeo="remarkPeo" :sanfangXX="getThreeLetter"></three-repair>
					</div>
				</TabPane>
			</Tabs>

			</Col>
			<!-- 催收备注 -->
			<Col span="10">
			<div class="wrap">
				<div class="wrap-title">
					<span class="line">&nbsp;</span>
					<span class="tit">催收备注</span>
				</div>
				<div class="from-item">
					<Form ref="cuishoubeizhu" :model="formItem" :rules="cuishouruleValid" :label-width="80">
						<Row>
							<Col span="12">
							<FormItem label="联络人" prop="lianluoren" style="padding-right: 10px;">
								<Input placeholder="请输入联络人！" v-model="formItem.lianluoren" size="large" :maxlength="16"></Input>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem label="联络号码" prop="lianluohaoma">
								<Input placeholder="请输入联络号码！" v-model="formItem.lianluohaoma" size="large" :maxlength='maxPhone'></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12" style="padding-right: 10px;">
							<FormItem class='tips' label="电话码" prop="dianhuama">
								<Select placeholder="请选择电话码！" v-model="formItem.dianhuama" @on-open-change="openDhmList" @on-change="changeDhmList"
								 size="large" :maxlength="60">
									<Option v-for="(item,index) in formItem.dhmList" :value="item.type+'-'+item.idKey" :key="index">{{ item.value }}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col span="12">
							<FormItem class='tips' label="行动码" prop="xingdongma">
								<Select placeholder="请选择行动码！" :disabled="formItem.dianhuama == '' ? true : false" v-model="formItem.xingdongma"
								 @on-open-change="openXdmList" @on-change="changeXdmList" size="large" :maxlength="60">
									<Option v-for="(item,index) in formItem.xdmList" :value="item.type" :key="index">{{ item.value }}</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
						<Row class="ghrq" v-if='formItem.xingdongma == 1'>
							<Col span="12" style="padding-right: 10px;">
								<FormItem label="还款日期" prop ='huankuanriqi'>
									<DatePicker :editable="false" type="date" @on-change='huankuanriqi' v-model = 'formItem.huankuanriqi' placement='top' format="yyyy-MM-dd" placeholder="请选择还款日期" size="large"></DatePicker>
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="还款金额" prop ='huankuanjine'>
									<Input placeholder="请输入还款金额！" v-model = 'formItem.huankuanjine' size="large"></Input>
								</FormItem>
							</Col>
						</Row>
						<!--<Row class="ghrq">-->
						<Row class="ghrq">
							<Col span="24">
							<FormItem label="跟呼日期" prop="genghuriqi">
								<DatePicker :editable="false" v-model="formItem.genghuriqi" :options="disTimme" type="datetime" format="yyyy-MM-dd HH:mm:ss"
								 @on-change="heelDate" placeholder="请选择跟呼日期" size="large"></DatePicker>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="24">
							<FormItem label="备注" prop="beizhu">
								<Input placeholder="请输入备注" :maxlength="200" v-model="formItem.beizhu" type="textarea" :autosize="{minRows: 3,maxRows: 7}"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="24">
							<FormItem label="">
								<Button v-if="disabledCZ" :disabled="disabledchong" type="primary" @click="csRemark('cuishoubeizhu')">重置</Button>
								<Button v-if="disabledTJ" :disabled="disabledtijiao" type="error" @click="csSubmit('cuishoubeizhu')">提交</Button>
							</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
			</Col>
		</Row>
		<!--Modal----邮件通知弹出框-->
		<Modal v-model="MailNotification" :mask="true" :draggable="true" @on-cancel="closeStopUrging('MailNotiRef')"
		 :scrollable="true" :loading="loading" title="邮件通知">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline ref="MailNotiRef">
					<FormItem label="联络人" style="width: 100%;">
						<Input placeholder="请输入联络人！" v-model="allselect.Liaison" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="联络电话" style="width: 100%;">
						<Input placeholder="请输入联络电话！" v-model="allselect.phone" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="邮件通知" style="width: 100%;">
						<Select placeholder="请选择邮件通知！" v-model="allselect.YJnotice" size="large" :maxlength="60">
							<Option value="欺诈">欺诈 </Option>
							<Option value="死亡">死亡 </Option>
						</Select>
					</FormItem>
					<FormItem label="电子签章" style="width: 100%;">
						<Input placeholder="请输入电子签章！" v-model="allselect.Signature" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="邮件内容" style="width: 100%;">
						<Input placeholder="请输入邮件内容！" v-model="allselect.Maicontent" type="textarea" :autosize="{minRows: 3,maxRows: 7}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click="">预览</Button>
				<Button type="text" size="large" @click="Marilyn">取消</Button>
				<Button type="primary" size="large" @click="">确定</Button>
			</div>
		</Modal>

		<!--Modal----信函通知弹出框-->
		<Modal v-model="LetterOfLetter" class-name="modalTip" :mask="true" :draggable="true" :scrollable="true" :loading="loading"
		 title="信函通知" @on-cancel="closeStopUrging('LetterRef')">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline :model="Letterlist" :rules="LetterRule" ref="LetterRef">
					<FormItem label="联络人" prop="Liaison" style="width: 100%;">
						<Input placeholder="请输入联络人！" :disabled="true" v-model="Letterlist.Liaison" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="联络电话" prop="phone" style="width: 100%;">
						<Input placeholder="请输入联络电话！" :disabled="true" v-model="Letterlist.phone" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="信函模板" prop="YJnotice" style="width: 100%;">
						<Select @on-change="viewTemplate" @on-open-change='getXHMB' placeholder="请选择信函模板！" v-model="Letterlist.YJnotice" size="large" :maxlength="60">
							<Option v-for='item in this.xinhanData' :key='item.index' :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="还款专线" prop="Signature" style="width: 100%;">
						<Input placeholder="请输入还款专线！" v-model="Letterlist.Signature" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="信函内容" style="width: 100%;">
						<div class="normalModal">
							<span v-show="MaicontentSrc =='' ? true : false">请先选择信函模板</span>
							<a href="javascript:;" v-show="MaicontentSrc !='' ? true : false" @click="letteModal= true">
								{{MaicontentFile}} (点击查看)
							</a>
						</div>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="xinhanCancel('LetterRef')">取消</Button>
				<Button type="primary" size="large" @click="xinhanconform('LetterRef')">确定</Button>
			</div>
		</Modal>



		<!--Modal----停催申请弹出框-->
		<Modal v-model="StopUrging" @on-cancel="closeStopUrging('StopUrgingTC')" class="StopUrging" class-name="modalTip"
		 :mask="true" :draggable="true" :scrollable="true" :loading="loading" title="停催申请">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form :model="tingCuiLeiXing" :rules="StopUrgingRule" ref="StopUrgingTC" label-position="right" :label-width="90"
				 inline>
					<FormItem label="停催类型" prop="TCtype" style="width: 100%;">
						<Select v-model="tingCuiLeiXing.TCtype" @on-open-change="openStopUrging" @on-change="changeStopUrging" size="large"
						 :maxlength="60">
							<Option v-for="(item,index) in tingCuiLeiXing.TCtypeList" :value="item.type" :key="index">{{ item.value }}</Option>
						</Select>
					</FormItem>
					<FormItem label="停催结束时间" v-if="readPicker" prop="TCtime" style="width: 100%;">
						<DatePicker v-model="tingCuiLeiXing.TCtime" :options="startTime" type="date" format="yyyy-MM-dd" @on-change="changeTCtime"
						 size="large" placeholder="请选择停催结束时间" style="width: 100%;"></DatePicker>
					</FormItem>
					<FormItem label="停催原因" prop="TCReason" style="width: 100%;">
						<Select v-model="tingCuiLeiXing.TCReason" @on-open-change="openTCReason" @on-change="changeTCReason" size="large"
						 :maxlength="60">
							<Option v-for="(item,index) in tingCuiLeiXing.TCReasonList" :value="item.type" :key="index">{{ item.value }}</Option>
						</Select>

					</FormItem>
					<FormItem label="备注" prop="TCremark" style="width: 100%;">
						<Input placeholder="请输入备注！" v-model="tingCuiLeiXing.TCremark" type="textarea" :autosize="{minRows: 3,maxRows: 7}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="TCcancel('StopUrgingTC')">取消</Button>
				<Button type="primary" size="large" @click="SubUrging('StopUrgingTC')">确定</Button>
			</div>
		</Modal>

		<!--Modal----短信通知弹出框-->
		<Modal v-model="SMSNotification" class-name="modalTip" :mask="true" @on-cancel="closeStopUrging('smsNotice')"
		 :draggable="true" :scrollable="true" :loading="loading" title="短信通知">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form :model="smsNotice" :rules="smsNoticeRule" ref="smsNotice" label-position="right" :label-width="90" inline>
					<FormItem label="联络人" prop="Liaison" style="width: 100%;">
						<Input placeholder="请输入联络人！" v-model="smsNotice.Liaison" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="联络电话" prop="phone" style="width: 100%;">
						<Input :disabled="true" placeholder="请输入联络电话！" v-model="smsNotice.phone" type="text" size="large"></Input>
					</FormItem>
					<FormItem label="短信模板" prop="YJnotice" style="width: 100%;">

						<Select placeholder="请选择短信模板！" v-model="smsNotice.YJnotice" @on-change="changeYJnotice" size="large" :maxlength="60">
							<Option v-for="(item,index) in showMSG.SMStemplate" :value="JSON.stringify(item)" :key="index">{{ item.modelName}}</Option>
						</Select>

					</FormItem>
					<FormItem label="短信内容" prop="Maicontent" style="width: 100%;">
						<Input placeholder="请输入短信内容！" class='InputColor' disabled v-model="smsNotice.Maicontent" type="textarea"
						 :autosize="{minRows: 3,maxRows: 7}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="smsNoticeCancel('smsNotice')">取消</Button>
				<Button type="primary" size="large" @click="smsNoticeSub('smsNotice')">确定</Button>
			</div>
		</Modal>

		<!--Modal----提前委外弹出框-->
		<Modal v-model="Outboard" class-name="modalTip" :mask="true" @on-cancel="closeStopUrging('OutboardForm')" :draggable="true"
		 :scrollable="true" :loading="loading" title="提前委外审核">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<!--:model="addCompanyModel" :rules="ruleValidate" ref="addCompanyModel"  prop="resonance"  prop="remark"-->
				<Form :model="OutboardForm" :rules="OutboardFormRule" ref="OutboardForm" label-position="right" :label-width="90"
				 inline>
					<FormItem label="申请原因" prop="SQreason" style="width: 100%;">
						<Select v-model="OutboardForm.SQreason" @on-open-change="openSQreason" @on-change="changeSQreason" size="large"
						 :maxlength="60">
							<Option v-for="(item,index) in OutboardForm.SQreasonList" :value="item.type" :key="index">{{ item.value }}</Option>
						</Select>
					</FormItem>
					<FormItem label="备注" prop="remark" style="width: 100%;">
						<Input placeholder="请输入备注！" :maxlength="500" v-model="OutboardForm.remark" type="textarea" :autosize="{minRows: 3,maxRows: 7}"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="TQcancel('OutboardForm')">取消</Button>
				<Button type="primary" size="large" @click="tiQianWeiWai('OutboardForm')">确定</Button>
			</div>
		</Modal>


		<!--Modal 划扣-->
		<Modal @on-cancel="closeStopUrging('delimitModalForm')" v-model="delimitModal" :mask="true" :draggable="true"
		 :scrollable="true" :loading="loading" class-name="modalTip" title="划扣申请">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="120" :model="delimitModalForm" :rules="ruleValidateDelimit" ref="delimitModalForm">
					<FormItem label="划扣方式" prop="reserverMethod">
						<Select v-model="delimitModalForm.reserverMethod" @on-change="delimitMethod4Time" placeholder="请选择划扣方式！" size="large">
							<Option :key="index" v-for="(item,index) in distList.reserverMethod" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="划扣类型" prop="reserverType">
						<Select :disabled="true" v-model="delimitModalForm.reserverType" placeholder="请选择划扣类型！" size="large">
							<Option :key="index" v-for="(item,index) in distList.reserverType" :value="item.type">{{item.value}}</Option>
						</Select>
					</FormItem>

					<FormItem label="划扣时间" prop="reserverTime" v-if="isshowDelimitTime">
						<DatePicker @on-change='dateChange' format="yyyy-MM-dd" v-model="delimitModalForm.reserverTime" :options="optionsEnd"
						 :editable="false" type="date" placeholder="请选择划扣时间！" size="large" style='width:100%;'></DatePicker>
					</FormItem>
					<FormItem label="划扣金额" prop="reserverAmount">
						<Input type="text" v-model="delimitModalForm.reserverAmount" :maxlength="16" placeholder="请输入划扣金额！" size="large"></Input>
					</FormItem>

					<!--<FormItem label="备注" prop="remarks">-->
					<!--<Input type="text" v-model="delimitModalForm.remarks" maxLength="500" :style="width" placeholder="请输入备注！"   size="large"></Input>-->
					<!--</FormItem>-->
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="delimit('delimitModalForm')">确定</Button>
			</div>
		</Modal>


		<!--提前结清减免-->
		<Modal v-model="add_info" :loading="loading" draggable title="提前结清申请" class-name="addInfo" @on-cancel="cancelu">
			<div class="from-item">
				<Form label-position="right" inline :label-width="95" ref="add_search_data" :model="add_search_data" :rules="ruleValidate">
					<FormItem label="合同编号" prop="loanNos_search">
						<Input :disabled=disabled type="text" placeholder="合同编号" v-model="loanContractNo" :style="width" size="large"></Input>
						<Button v-show="!edit" type="primary" size="large" style="margin-left: 10px;" @click="loanNo_search">查询</Button><br />
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
							<Radio label="1" :disabled='disabled'>是</Radio>
							<Radio label="2" :disabled='disabled'>否</Radio>
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
					<br />
					<FormItem label="申请类型" prop="applyType">
						<RadioGroup :style="width" v-model="add_search_data.applyType" @on-change="queryReceAmtByLoanNo">
							<Radio label="02">提前结清减免</Radio>
							<Radio label="01" :disabled="applyDisable">非提前结清减免</Radio>
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
					<FormItem label="预计还款日" prop="budgetRepaymentDate">
						<DatePicker format="yyyy-MM-dd" :options="options1" type="date" placeholder="请选择时间！" @on-change='dateChange1'
						 :style="width" size="large" placement="top-start" :editable="false" v-model="add_search_data.budgetRepaymentDate">
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
					<FormItem label="责任类型" prop="liabilityType" v-show="disables.showLibType">
						<!-- :disabled="liabilityDisabled" -->
						<Select :disabled="liabilityDisabled" @on-change="deleteSelet" placeholder="请选择责任类型" size="large" :style="width"
						 v-model="add_search_data.liabilityType">
							<Option value="1" v-if="add_search_data.applyDerateType == '01'">有责</Option>
							<Option value="2" v-if="add_search_data.applyDerateType == '01'">无责</Option>
						</Select>
					</FormItem>
					<FormItem label="申请人" prop="applyUser">
						<Input type="text" placeholder="请输入申请人！" :style="width" size="large" v-model="add_search_data.applyUser"></Input>
					</FormItem>
					<FormItem label="减免\提前结清原因" prop="applyReason" class="tips">
						<!-- 是否逾期 是  减免金额大于0 正常减免  有责 -->
						<Select v-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '01' && add_search_data.liabilityType == '1' "
						 placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason" @on-open-change="queryReasonType($event,'responsibility')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.responsibility">{{item.label}}</Option>
						</Select>
						<!-- 是否逾期 是  减免金额大于0  正常减免 无责 -->
						<Select v-else-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '01' && add_search_data.liabilityType == '2' "
						 placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason" @on-open-change="queryReasonType($event,'non_responsibility')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.non_responsibility">{{item.label}}</Option>
						</Select>
						<!-- 是否逾期 是  减免金额大于0 特殊减免 -->
						<Select v-else-if="add_search_data.isOverdue == '1' && add_search_data.applyDerateAmount > 0 && add_search_data.applyDerateType == '02' "
						 placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason" @on-open-change="queryReasonType($event,'special')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.special">{{item.label}}</Option>
						</Select>
						<!--当不满足“是否逾期为是且减免金额大于0”的情况时 -->
						<Select v-else-if="add_search_data.isOverdue != '1' || add_search_data.applyDerateAmount <= 0.00" placeholder="请选择减免\提前结清"
						 size="large" :style="width" v-model="add_search_data.applyReason" @on-open-change="queryReasonType($event,'other')">
							<Option :value="item.value" :key="index" v-for="(item,index) in typeList.other">{{item.label}}</Option>
						</Select>
						<Select v-else placeholder="请选择减免\提前结清" size="large" :style="width" v-model="add_search_data.applyReason">
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
						<Input type="textarea" :maxlength="100" style="width:600px" :autosize="{minRows: 5,maxRows: 6}" placeholder="请输入备注"
						 v-model="add_search_data.remark"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancelu">取消</Button>
				<Button type="primary" size="large" @click="Submit_Info('add_search_data')">提交</Button>
			</div>
		</Modal>
		<!-- 合规 代充值 -->
		<Modal v-model="RechargeModal" title="代充值申请" draggable class-name='RechargeModal' @on-cancel="Reset">
			<div class="from-item">
				<Form label-position="right" :label-width="120" inline :model='SubData' :rules='SubDataRules' ref='SubData'>
					<Button type="primary" icon="plus-circled" @click='SubmitLoanContractNo'>提交</Button>
					<FormItem label="合同编号">
						<Input placeholder="请输入合同编号" v-model='SubData.loanContractNo' disabled size="large"></Input>
					</FormItem>
					<div>
						<FormItem label="身份证号">
							<Input size="large" v-model='SubData.idCard' disabled></Input>
						</FormItem>
						<FormItem label="客户姓名">
							<Input size="large" v-model='SubData.clientName' disabled></Input>
						</FormItem>
						<FormItem label="最近账单日">
							<Input size="large" v-model='SubData.latestBillingDate' disabled></Input>
						</FormItem>
						<FormItem label="还款状态">
							<Input size="large" v-model='SubData.productType' disabled></Input>
						</FormItem>
						<FormItem label="应还总额">
							<Input size="large" v-model='SubData.totalDuetoPayAmt' disabled></Input>
						</FormItem>
						<FormItem label="产品类型">
							<Input size="large" v-model='SubData.productTypeName' disabled></Input>
						</FormItem>
						<FormItem label="充值银行">
							<Select v-model='SubData.bankCode' placement='top' @on-open-change='GetBank' filterable placeholder="请选择！" style="width:230px;" size="large">
								<Option v-for='bank in distList.Bank' :key='bank.idKey' :value="bank.value">{{bank.label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="充值金额" prop='rechargeAmt'>
							<Input size="large" v-model='SubData.rechargeAmt' placeholder="输入金额"></Input>
						</FormItem>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large"  @click="Reset">取消</Button>
				<Button type="primary" size="large" :disabled="disabledRecharge" @click='SubMitRechargeData("SubData")'>确定</Button>
			</div>
		</Modal>
		<!-- 文件上传预览 -->
		<Modal draggable :title="'预览图片'+fileObj.fileName" v-model="fileObj.filesModel">
			<img :src="fileObj.imgName" v-if="fileObj.filesModel" style="width: 100%">
		</Modal>

		<!-- 文件上传预览 -->
		<Modal draggable :title="'预览图片'+this.MaicontentFile" v-model="letteModal">
			<img :src="this.MaicontentSrc" style="width: 100%">
		</Modal>

	</div>

</template>

<script>
	import importantInfo from './detail/importantInfo' //重要信息
	import loanInfo from './detail/loanInfo' //贷款信息
	import imageData from './detail/imageData'
	import noticeRecord from './detail/noticeRecord' //通知记录
	import recordCases from './detail/recordCases' //分案记录
	import contactInformation from './detail/contactInformation' //联系人信息
	import collectionRecord from './detail/collectionRecord' // 催收记录
	import detailsThecase from './detail/DetailsTheCase' // 案件详情
	import guanlianCases from './detail/guanlianCases' // 关联案件
	import appmailList from './detail/APPMailList' // APP 通讯录
	import appCallrecord from './detail/APPCallRecord' // APP 通话记录
	import OnlineRetailers from './detail/OnlineRetailersAddress' //电商收货地址
	import OperatorCalls from './detail/Operatorcallrecord' //运营商通话记录
	import threeRepair from './detail/threeRepair' // 三方信修

	import store from '../../../store/index'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		data() {
			//合规 金额验证
			const rechargeAmts = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入金额'));
				}else{
					const overdueDay = /^[1-9]*$/;
					if(isNaN(value)){
						callback(new Error('只能输入数字'));
					}else if(value < 100){
						callback(new Error('必须要大于等于100'));
					}else{
						callback();
					}
				}
			};
			const nowtimeThen = (rule, value, callback) => { //划扣时间验证
				//获取当前时间
				var date = new Date();
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
			// 验证规则
			const cellNum = (rule, value, callback) => {
				if (value.length > 100) {
					callback(new Error('不能超过100个字符！'));
				} else {
					callback();
				}
			};
			const validateData = (rule, value, callback) => { //划扣金额
				let reg = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/
				if (!reg.test(value)) {
					callback(new Error('划扣金额必须大于0！'));
				} else {
					callback();
				}
			};
			//提前结清减免--S
			const min = (rule, value, callback) => {
				let max = this.add_search_data.receivableAmount;
				if (/^\d+(\.\d{0,2})?$/.test(value)) {
					if (max !== '') {
						if (value > max) {
							callback(new Error('要小于应收客户总额！'));
						} else {
							callback();
						}
					} else {
						callback();
					}
				} else {
					callback(new Error('必须是最多两位小数的数字！'));
				}
			};
			//责任类型
			const zrType = (rule, value, callback) => {
				let jmType = this.add_search_data.applyDerateType; //减免类型
				let isOverdue = this.add_search_data.isOverdue; //是否逾期
				let appType = this.add_search_data.applyDerateAmount; //申请减免金额
				if (jmType != '01') {
					callback();
				} else if (isOverdue != '1' || appType <= 0) {
					callback();
				} else {
					if (value == '' || value == null || value == undefined) {
						callback(new Error('责任类型必填！'));
					} else {
						callback();
					}
				}
			}; //减免类型
			const jmType = (rule, value, callback) => {
				let isOverdue = this.add_search_data.isOverdue; //是否逾期
				let appType = this.add_search_data.applyDerateAmount; //申请减免金额
				if (isOverdue != '1' || appType <= 0) {
					callback();
				} else {
					if (value == '' || value == null || value == undefined) {
						callback(new Error('减免类型必填！'));
					} else {
						callback();
					}
				}
			}; //备注
			const remark = (rule, value, callback) => {
				let isOverdue = this.add_search_data.isOverdue; //是否逾期
				let appType = this.add_search_data.applyDerateAmount; //申请减免金额
				let addType = this.add_search_data.applyDerateType; //特殊减免

				if (isOverdue == '1' && appType > 0 && addType == '02') {
					if (value == '' || value == null || value == undefined) {
						callback(new Error('备注必填！'));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			// 催收备注 还款金额
			const huankuanjine= (rule ,value , callback)=>{
				if(value == ''){
					callback(new Error('请输入还款金额！'));
				}else {
					let regD = /^[0-9]\d*(\.\d+)?$/;
					if(!regD.test(value)){
						callback(new Error('请输入正确的金额！'));
					}else{
						callback();
					}
				}
			};
			// 验证规则 -- 手机号码
			const cellPhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入联络电话！'));
				} else if (!this.expReg.aa.test(value)) {
					callback(new Error('联络电话格式不正确!'));
				} else {
					callback();
				}
			};
			// 验证规则 -- 手机号码
			const cellPhone1 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入还款专线！'));
				} else if (!/^\d{10,15}/.test(value)) {
					callback(new Error('还款专线格式不正确!'));
				} else {
					callback();
				}
			};
			//提前结清减免--E
			return {
				maxPhone:11,//联络号码最大长度（催收备注
				hrefUrl:'', // 合规充值成功
				handleType:'',//分案状态
				disables:{
                	derateTypes:false,
                	derateTypes1:false,
                	showLibType:true,  //责任类型显隐
                },
				applyDisable: false, //申请类型禁用控制
				letteModal: false,
				MaicontentSrc: '', //信函内容图片
				MaicontentFile: '', //信函图片文件名
				appMailList: {
					pageIndex: '1',
					pageSize: '10',
				},
				appCallRecord: {
					pageIndex: '1',
					pageSize: '10',
				},
				tab: 'tabpane1', //tabs切换默认页
				tabSr: 'tab1', //tabs切换默认页
				title: '我的电催案件',
				refdata: 'refdata',
				loanContractNo: '', //接受已完成案件页面传递过来的订单号
				sessionBtn: '', //传递到联系人信息的按钮操作
				caseType: '', //接受已完成案件页面传递过来的停催类型
				showButton: false,
				allShowButtons: false, //隐藏（新增联系，重置，提交 按钮
				readPicker: true, //永久停催禁用选择器
				imageData: [], //传递到资料影像的数据
				imageDataCount: 0, // 资料影像总条数
				getNoticeRecord: [], //传递到通知记录的数据
				getDivisionRecord: [], //传递到分案记录的数据
				getUrgeRecord: [], //案件详情-催收记录的数据(催收备注)
				stopUrgeRecordList: [], //案件详情-催收记录的数据(停催记录)
				stopUrgeActRecordList: [], //案件详情-停催激活记录(停催激活记录)
				clientInfo: {}, //案件详情-贷款信息查询
				otherContactDtos: [], // 案件详情 -贷款信息 - 其他联系人信息
				familyInfoDto: {}, // 案件详情 -贷款信息 - 家庭信息
				caseINFO: {}, //案件详情-案件信息
				getRepayInfoList: [], // 案件详情 -偿清计划
				getReserverRecordList: [], // 案件详情 -交易历史
				getRelationCase: '', //案件详情-关联案件
				userINFO: '', //案件详情中重要信息查询接口--用户信息
				loanINFO: '', //案件详情中重要信息查询接口--借款信息
				overduedata: '', //案件详情中重要信息查询接口--逾期信息
				APPmailList: [], //案件详情--APP通讯录
				contactINFO: {}, //案件详情--联系人信息
				getThreeLetter: [], //案件详情--三方信修
				callRecordINFO: [], //案件详情-APP通话记录
				OnlineRetailers: [], // 案件详情 - 电商收货地址
				operatorCallrecords: [], // 案件详情-运营商报告通话记录
				showTab: 'tabpane1', //tab切换显示与隐藏
				//--------------------------按钮栏禁用操作
				click: 'click',

				isdis: false, //required禁用
				disabledOutboard: false, //提前委外禁用
				disabledStopUrging: false, //停催禁用
				disabledMethod: false, //划扣禁用
				disabledMethod1: false, //信修禁用
				disabledTQJQ: false, //提前结清/减免禁用
				disabledNotice: false, //required下拉列表禁用
				disabledchong: false, //重置禁用
				disabledtijiao: false, //提交禁用

				disabledOutboard2: false, //提前委外禁用
				disabledOutboard2Hidden : true, //提前委外按钮是否显示
				CxdisabledOutboard2Hidden: false , //撤销提前委外 按钮是否显示
				disabledStopUrging2: false, //停催禁用
				disabledMethod2: false, //划扣禁用
				letterRepairlButton2: false, //信修禁用
				disabledTQJQ2: false, //提前结清/减免禁用

				disabledCZ: true,
				disabledTJ: true,
				//------------------------------弹出框
				loading: true,
				Outboard: false, //提前委外
				reduction: false, //提前结清减免
				add_info: false, //提前结清减免
				StopUrging: false,
				MailNotification: false,
				LetterOfLetter: false,
				SMSNotification: false,
				delimitModal: false, //划扣模态框
				//------------------------------弹出框
				liabilityDisabled: false,
				applyDerateDisabled: false,
				width: {
					width: '245px'
				},

				lineData: '',

				delimitModalForm: { //划扣申请
					reserverTime: '',
					reserverAmount: '',
					reserverType: '1',
					reserverMethod: '',
					// remarks:''
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
					}, {
						validator: validateData,
						trigger: 'blur'
					}],
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
				width: {
					'width': '40px'
				},
				optionsEnd: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() + 1 - 86400000;
					}
				},
				isshowDelimitTime: true, //默认划扣时间显示
				distList: {
					reserverType: [], //划扣类型
					reserverMethod: [], //划扣方式
					Bank: [], // 银行信息
				},

				disTimme: {
					disabledDate(date) {
						return date && date.valueOf() > Date.now();
					}
				},
				startTime: {
					disabledDate(date) {
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},

				tingCuiLeiXing: {
					TCtype: '', //停催类型------停催申请
					TCtypeList: [], //停催类型列表
					TCtypeOption: '', //停催类选中项
					TCtime: '', //停催时间
					TCReason: '', //停催原因
					TCReasonList: '', //停催原因列表
					TCReasonOption: '', //停催原因选中项
					TCremark: '', //停催备注
					sdate: '', //设置当前日期
				},

				allselect: {
					WayNotice: 'required', //required
					Signature: '', //电子签章
					Maicontent: '', //邮件内容

				},
				showMSG: { //required-保存的数据
					SMStemplate: [], //短信模板
					clientINFO: '', //保存订单号的客户信息

				},
				OutboardForm: {
					SQreason: '', //
					SQreasonList: [{
							value: '欺诈',
							type: "1"
						},
						{
							value: '死亡',
							type: "2"
						},
						{
							value: '重病',
							type: "3"
						},
						{
							value: '入狱',
							type: "4"
						},
						{
							value: '无力偿还',
							type: "5"
						},
						{
							value: '失联 ',
							type: "6"
						},
						{
							value: '其他 ',
							type: "7"
						},
					],
					SQreasonOption: '',
					remark: '', //提前委外备注
				},
				OutboardFormRule: { //提前委外
					SQreason: [{
						required: true,
						message: '申请原因不能为空',
						trigger: 'change'
					}],
					remark: [{
						required: false,
						message: '备注不能为空',
						trigger: 'blur'
					}],

				},
				smsNotice: {
					Liaison: '', //联络人
					phone: '', //联系电话
					Maicontent: '',
					modelName: '',
					YJnotice: '', //required
					YJnoticeList: [],
					YJnoticeOption: '', //选中项
				},
				Letterlist: {
					Liaison: '',
					phone: '',
					YJnotice: '',
					Signature: '',
					mainBody: ''
				},
				LetterRule: { //信函验证
					Liaison: [{
						required: true,
						message: '联系人不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}, ],
					YJnotice: [{
						required: true,
						message: '信函模板不能为空',
						trigger: 'change'
					}],
					Signature: [{
							required: true,
							message: '还款专线不能为空',
							trigger: 'blur'
						},
						{
							validator: cellPhone1,
							trigger: 'blur'
						}
					],
					mainBody: [{
						required: true,
						message: '主体必须选择',
						trigger: 'change'
					}]

				},
				smsNoticeRule: { //停催类型
					Liaison: [{
						required: true,
						message: '联系人不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '联系电话不能为空',
						trigger: 'blur'
					}, ],
					YJnotice: [{
						required: true,
						message: '短信模板不能为空',
						trigger: 'change'
					}],
					Maicontent: [{
						required: true,
						message: '短信内容不能为空',
						trigger: 'blur'
					}, ],

				},
				StopUrgingRule: { //停催类型
					TCtype: [{
						required: true,
						message: '停催类型不能为空',
						trigger: 'change'
					}],
					TCtime: [{
						required: true,
						type: 'string',
						message: '停催时间不能为空',
						trigger: 'change'
					}, ],
					TCReason: [{
						required: true,
						message: '停催原因不能为空',
						trigger: 'change'
					}],
					TCremark: [{
						required: false,
						message: '备注不能为空',
						trigger: 'blur'
					}, ],

				},

				formItem: {
					lianluoren: '',
					lianluohaoma: '',
					dianhuama: '',
					xingdongma: '',
					genghuriqi: '',
					genghuriqi2: '',
					huankuanriqi: '',
					huankuanjine: '',
					beizhu: '',
					contactType: '', // 客户关系
					dhmList: [],
					dhm: '',
					xdmList: [],
					xdm: '',
				},
				cuishouruleValid: {
					lianluoren: [{
							required: true,
							message: '联系人必须填写',
							trigger: 'blur'
						},
						{
							required: true,
							message: '联系人必须填写',
							trigger: 'change'
						}
					],
					lianluohaoma: [{required: true,message: '电话号码不能为空！',trigger: 'blur'},
												{required: true,message: '电话号码不能为空！',trigger: 'change'},],
					dianhuama: [{
						required: true,
						message: '电话码不能为空',
						trigger: 'change'
					}],
					xingdongma: [{
						required: true,
						message: '行动码不能为空',
						trigger: 'change'
					}],
					huankuanriqi: [
						{required: true,message: '还款日期不能为空',trigger: 'change'},
						{required: true,message: '还款日期不能为空',trigger: 'blur'},
						],
					huankuanjine:[{ validator: huankuanjine, trigger: 'blur' }],
					genghuriqi: [{
						required: true,
						message: '跟呼日期不能为空',
					}],
					beizhu: [{
						required: true,
						message: '备注不能为空',
						trigger: 'blur'
					}],
				},
				//提前结清S-----------------------------
				edit: false,
				disabled: true,
				TQJMloanContractNo: '',
				TQJMdisable: false,
				liabilityDisabled: false,
				applyDerateDisabled: false,
				fileObj: { //新增文件上传返回类
					uploadList: [],
					filesModel: false,
					imgName: ''
				},
				options1: {
					disabledDate(date) {
						let week = new Date().getDay();
						let work = -1;
						/*if(week <=3){
							work = 9;
						}else if(week == 6){
							work = 10;
						}else if(week == 4 || week == 5){
							work = 11;
						}*/
						return date && date.valueOf() < Date.now() + work * 86400000;
					}
				},
				typeList: {
					special: [],
					responsibility: [],
					non_responsibility: [],
					other: []
				},
				width: {
					width: '245px'
				},
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
				ruleValidate: {
					applyType: [{
						required: true,
						message: '申请类型必须选择！'
					}], //申请类型
					isUseSurplusAmount: [{
						required: true,
						message: '是否使用超额金必须选择！'
					}], //
					repaymentType: [{
						required: true,
						message: '还款方式必须选择！'
					}], //还款方式 1：存对公 2 ：划扣 3：账扣
					budgetRepaymentAmount: [{
						required: true,
						message: '预计还款额必须填写！'
					}, {
						validator: min,
						trigger: 'blur'
					}], //预计还款额
					budgetRepaymentDate: [{
						required: true,
						message: '预计还款日期必须选择！'
					}], //预计还款日期
					applyDerateType: [{
						validator: jmType,
						trigger: 'change'
					}], //减免类型
					applyDerateAmountType: [{
						required: true,
						message: '减免类型必须选择！'
					}], //减免类型
					applyDerateAmount: [{
						required: true,
						message: '申请减免金额必须填写！'
					}], //申请减免金额
					receivableAmount: [{
						required: true,
						message: '应收客户总额必须填写！'
					}], //应收客户总额
					liabilityType: [{
						validator: zrType,
						trigger: 'change'
					}], //责任类型
					applyUser: [{
						required: true,
						message: '申请人必须填写！'
					}], //申请人
					applyDepartment: [{
						required: true,
						message: '申请人部门必须填写！'
					}], //申请人部门
					applyReason: [{
						required: true,
						message: '减免提前结清原因必须填写！'
					}], //减免提前结清原因
					applyUser: [{
						required: true,
						message: '申请人必须填写！'
					}],
					remark: [{
						validator: remark,
						trigger: 'blur'
					}], //备注
				},
				//提前结清E--------------------------------------------

				xinhanData :[],  // 信函模板内容
				//代充值 合规
				Recharge: false, // 代充值  按钮
				RechargeModal: false, //代充值 弹窗
				disabledRecharge:true , //确定，取消 按钮 不可以点击
				// 提交的字段
				SubData: {
					loanContractNo: '', // 合同编号
					idCard: '', // 身份证号
					clientName: '', // 客户姓名
					latestBillingDate: '', // 最近账单日
					productType: '', //还款状态
					totalDuetoPayAmt: '', // 应还总额
					productTypeName: '', //产品类型
					bankCode: '', // 所属银行
					rechargeAmt: '', // 充值金额
				},
				// 提交字段验证
				SubDataRules: {
					rechargeAmt: [{
						validator: rechargeAmts,
						trigger: 'blur'
					}]
				},
			}

		},

		computed: {
			...mapState([
				'loadingStateAPP'
			])
		},
		components: {
			importantInfo,
			loanInfo,
			imageData,
			noticeRecord,
			recordCases,
			contactInformation,
			collectionRecord,
			detailsThecase,
			guanlianCases,
			appmailList,
			appCallrecord,
			threeRepair,
			OnlineRetailers,
			OperatorCalls,
		},
		methods: {
			//提前结清减免开始------------------
			newAddModal() {
				const _ = this;
				_.edit = false;
				this.ALLdisabled('alldis')
				_.add_info = true;
				_.TQJMdisable = true;
				_.$refs.add_search_data.resetFields();
				_.fileObj.uploadList = [];
				_.TQJMloanContractNo = '';
			},
			// 提交选择的图片
			getUploadImg(e) {
				const _ = this;
				var File = e.target.files;
				var size = File.size;
				var formdata = new FormData();
				if (File.length > 7 || (_.fileObj.uploadList.length + File.length) > 7) {
					_.$layer.msg('最多只能上传七个文件！');
				} else {
					for (let i = 0; i < File.length; i++) {
						if (File[i].size > 2 * 1024 * 1024) {
							_.$layer.msg('附件大小不能超过2M！');
							return;
						};
						if (File[i].type.indexOf('jpeg') == -1 && File[i].type.indexOf('png') == -1 && File[i].type.indexOf('jpg') == -1) {
							_.$layer.msg('请上传png，jpg，jpeg格式的附件！');
							return;
						}

						formdata.append('files', File[i]);
					}
					_.HttpAjax('post', 'upLoadImg', formdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if (res.data && res.data.status == 200) {
							let len = res.data.data;
							for (let i = 0; i < len.length; i++) {
								_.fileObj.uploadList.push(len[i]);
							}
						}
					}, 'file');
				}
			},
			// 根据合同编号查询信息
			loanNo_search() {
				if (this.loanContractNo != '') {
					this.HttpAjax('post', 'queryInfoByLoanNo', {
						"loanNo": this.loanContractNo,
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.status === 200) {
							this.TQJMloanContractNo = res.data.data.loanContractNo;
							for (let i in res.data.data) {
								if (i != 'receivableAmount' && i != 'isUseSurplusAmount') {
									this.add_search_data[i] = res.data.data[i];
								}
							}
							//最近账单日 如果小于当前时间只能提前结清  不包括委外案件
							this.add_search_data.applyType = ''; //清空申请类型
							let nextTime = res.data.data.nextRepaymentDate;
							if((new Date(nextTime).getTime() < new Date().getTime()) && res.data.data.handleType != '3'){
								this.applyDisable = true;
							} else {
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
				} else {
					this.$layer.msg('请输入合同编号！');
				}
			},
			// 时间格式转换
			dateChange1(val) {
				this.add_search_data.budgetRepaymentDate = val;
			},
			//根据合同编号和减免类型查询贷款金额
			queryReceAmtByLoanNo(val) {
				if (val != undefined) {
					if (this.loanContractNo == '') {
						this.$layer.msg('请先查询合同编号!');
					} else {
						this.add_search_data.applyDerateType = ''; //清空减免类型
						this.HttpAjax('post', 'queryReceAmtByLoanNo', {
							"loanNo": this.loanContractNo,
							"applyDerateType": val
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status === 200) {
								this.add_search_data.receivableAmount = Math.ceil(res.data.data.receivableAmount * 100) / 100;;
								this.add_search_data.surplusAmount = res.data.data.surplusAmount;

								if (this.add_search_data.budgetRepaymentAmount != '') {
									this.add_search_data.applyDerateAmount = (res.data.data.receivableAmount - this.add_search_data.budgetRepaymentAmount)
										.toFixed(2);
								}
								//当不满足“是否逾期为是或者减免金额大于0”的情况时，减免类型、责任类型为空且不可编辑
								if (this.add_search_data.isOverdue != '1' || this.add_search_data.applyDerateAmount <= 0) {
									this.liabilityDisabled = true;
									this.applyDerateDisabled = true;
									this.add_search_data.applyDerateType = '';
									this.add_search_data.liabilityType = '';
								} else {
									this.liabilityDisabled = false;
									this.applyDerateDisabled = false;
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
			deleteSelet(val) {
				const _ = this;
				_.add_search_data.applyReason = '';

				//免类型非“正常减免”时 责任类型为空，不可编辑
				if (_.add_search_data.applyDerateType != '01') {
					_.liabilityDisabled = true;
					_.add_search_data.liabilityType = '';
				} else {
					_.liabilityDisabled = false;
				}
			},
			handleView(name) {
				this.fileObj.imgName = name.imgUrl;
				this.fileObj.fileName = name.fileName;
				this.fileObj.filesModel = true;
			},
			handleRemove(file) {
				this.fileObj.uploadList.splice(file, 1)
			},
			//文件上传类
			uploadsFile() {
				const _ = this;
				let events = _.$refs.uploads;
				events.value = '';
				if (_.fileObj.uploadList.length >= 7) {
					_.$layer.msg('最多只能上传七个文件！');
				} else {
					events.click();
				}
			},
			cancelu() {
				this.add_info = false;
				this.earlyClearanceOpera = false;
				this.TQJMdisable = false;
				this.ALLdisabled()
			},
			// 提交按钮点击事件
			Submit_Info(name) {
				const _ = this;
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
				if (_.loanContractNo == '') {
					_.$layer.msg('请先查询合同编号！！');
				} else {
					_.$refs[name].validate((valid) => {
						if (valid) {
							if (_.fileObj.uploadList.length <= 0) {
								_.$layer.msg('请先选择附件上传！');
							} else {
								let files = JSON.parse(JSON.stringify(_.fileObj.uploadList));
								files.forEach((r, i) => {
									delete r.imgUrl
								});
								Submit_info.fileInfo = JSON.stringify(files);
								_.HttpAjax('post', 'submitRemissionClearance', Submit_info, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if (res.data.status == 200) {
										_.$Notice.success({
											title: '成功',
											desc: '新增信息成功',
											duration: 2
										});
										this.disabledMethod2 = true; //提前结清申请成功后 也不能划扣
										this.disabledTQJQ2 = true; //划扣成功后 也不能提前结清
										this.add_info = false;
										this.TQJMdisable = false;
										this.ALLdisabled();
									}
								})
							}
						}
					});
				}

			},
			queryReasonType(val, ty) {
				const _ = this;
				if (val) {
					_.HttpAjax('post', 'queryReasonType', {
						reasonType: ty
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == 200) {
							_.typeList[ty] = res.data.data;
						}
					});
				}
			},
			jeBlurChange() {
				const _ = this;
				let vals = _.add_search_data.budgetRepaymentAmount;
				if (/^\d+(\.\d{0,2})?$/.test(vals)) {
					if (this.add_search_data.receivableAmount != '') {
						this.add_search_data.applyDerateAmount = (this.add_search_data.receivableAmount - this.add_search_data.budgetRepaymentAmount)
							.toFixed(2);

						//当不满足“是否逾期为是或者减免金额大于0”的情况时，减免类型、责任类型为空且不可编辑
						if (this.add_search_data.isOverdue != '1' || this.add_search_data.applyDerateAmount <= 0) {
							this.liabilityDisabled = true;
							this.applyDerateDisabled = true;
							this.add_search_data.applyDerateType = '';
							this.add_search_data.liabilityType = '';
						} else {
							this.liabilityDisabled = false;
							this.applyDerateDisabled = false;
						}
					}
				}
			},
			//提前结清减免结束---------------------------------------------------------------
			csRemark(name) {
				this.$refs[name].resetFields();
			},
			//催收备注提交
			csSubmit(name) {
				const _this = this
				let followCallTime,repayMoney
				if(this.formItem.genghuriqi2 == ''){
					followCallTime = this.formItem.genghuriqi
				}else {
					followCallTime = this.formItem.genghuriqi2
				}
				if(this.formItem.huankuanjine == ''){
					repayMoney = 0
				}else {
					repayMoney = this.formItem.huankuanjine
				}
				let rdata = {
					loanContractNo: this.loanContractNo,
					contactPerson: this.formItem.lianluoren, //联络人
					contactNumber: this.formItem.lianluohaoma, //联络号码
					actionCode: this.formItem.dhm ? this.formItem.dhm.split('-')[0] : '', //电话码
					resultCode: this.formItem.xdm , //行动码
					followCallTime: followCallTime, //跟呼日期
					remark: this.formItem.beizhu, //备注
					repayTime: this.formItem.huankuanriqi,
					repayMoney: this.formItem.huankuanjine,
					contactRelationship: this.formItem.contactType, //客户关系
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.disabledtijiao = true
						this.HttpAjax('post', 'saveUrgeRemarks', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							this.disabledtijiao = false
							if (res.data.status == '200') {
								
								this.$refs[name].resetFields();
								this.$Notice.success({
									title: '成功',
									desc: '提交成功'
								})
							}
						});
					}
				})
			},

			tabActive(name) {
				this.tab = name;
				this.showTab = name //控制tab切换与隐藏

				if (name == 'tabpane1') {} else if (name == 'tabpane2') {
					if (JSON.stringify(this.clientInfo) == '{}') {
						this.GetLoanInformation();
					}
				} else if (name == 'tabpane3') { // 催收记录
					if (this.stopUrgeActRecordList.length == 0 || this.stopUrgeRecordList.legnth == 0 || this.getUrgeRecord.length ==
						0) {
						this.HttpAjax('post', 'getUrgeRecord', {
							loanContractNo: this.loanContractNo
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.getUrgeRecord = res.data.data.urgeRecordDetailList; //催收备注
								this.stopUrgeRecordList = res.data.data.bcmpStopCurrentUrgeList; //停催记录
								this.stopUrgeActRecordList = res.data.data.stopUrgeActRecordList //停催激活记录
							}
						});
					}
				} else if (name == 'tabpane4') { //资料影像
					if (this.imageData.length == 0) {
						this.GetDataImage();
						this.GetDataImageCount();
					}
				} else if (name == 'tabpane5') { // 通知记录
					if (this.getNoticeRecord.length == 0) {
						this.GetNoticeRecord();
					}
				} else if (name == 'tabpane6') { //分案记录
					if (this.getDivisionRecord.length == 0) {
						this.GetDivisionRecord();
					}
				} else if (name == 'tabpane7') {} else if (name == 'tabpane8') {
					if (this.getRelationCase.length == 0) {
						this.GetRelationCase()
					}
				}
			},

			quit() {
				this.$router.replace('myCase')
			},
			WayNotice(Str) {
				//如果其他页面路由有showDelimitBtn=="private"这个参数就把通知按钮里面的列表项置灰
				let showDelimitBtn = this.getStore('opreateBtn').showDelimitBtn
				if (showDelimitBtn) {
					this.isdis = true
				} else {
					this.isdis = false
				}
				if (Str == 'item1') {
					this.MailNotification = true;
				} else if (Str == 'item2') {
					this.LetterOfLetter = true;
					this.MaicontentSrc = '';
					this.MaicontentFile = '';
					this.showMessage();
				} else {
					this.SMSNotification = true;
					this.showMessage();
				}
				this.ALLdisabled('alldis')
			},
			showMessage() { //required--短信
				this.HttpAjax('post', 'showShortMsg', {
					loanContractNo: this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.showMSG.SMStemplate = res.data.data.bcmpInformModelList;
						this.smsNotice.Liaison = res.data.data.clientName
						this.smsNotice.phone = res.data.data.loanNamePhone
						this.Letterlist.Liaison = res.data.data.clientName;
						this.Letterlist.phone = res.data.data.loanNamePhone;
					}
				});
			},
			switchTAB(tabName) {
				this.tabSr = tabName;
				if (tabName == 'tab1') {
					if (this.contactINFO.length == 0) {
						this.getContactInformation();
					}
				} else if (tabName == 'tab2') { //APP 通讯录
					if (this.APPmailList.length == 0) {
						this.GetMailList();
					}
				} else if (tabName == 'tab3') { // APP 通话记录 
					if (this.callRecordINFO.length == 0) {
						this.earlyClearance();
					}
				} else if (tabName == 'tab4') { // 电商收货地址
					if (this.OnlineRetailers.length == 0) {
						this.OnlineRetailersAddress();
					}
				} else if (tabName == 'tab5') {
					if (this.operatorCallrecords.length == 0) {
						this.OperatorCall()
					}
				} else { // 三方信修
					if (this.getThreeLetter.length == 0) {
						this.HttpAjax('post', 'getThreeLetter', {
							contractNo: this.loanContractNo
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.getThreeLetter = res.data.data;
							}
						});
					}
				}
			},
			init() {
				//				let showBtn=this.$route.params.showBtn;
				//				this.sessionBtn=this.$route.params.hiddenBtn;
				let showBtn = this.getStore('opreateBtn').showBtn
				let sessionBtn = this.getStore('opreateBtn').hiddenBtn
				let showDelimitBtn = this.getStore('opreateBtn').showDelimitBtn
				let allShowButton = this.getStore('opreateBtn').allShowBtn
				if (allShowButton && allShowButton == 'private') {
					this.disabledCZ = false;
					this.disabledTJ = false;
				} else {
					this.disabledCZ = true;
					this.disabledTJ = true;
				}
				//如果其他页面路由有showBtn=="private"这个参数就不显示中间一排按钮
				if (showBtn && showBtn == 'private') {
					this.showButton = false
				} else {
					this.showButton = true
				}
				//如果其他页面路由有showDelimitBtn=="private"这个参数就把中间一排按钮置灰
				if (showDelimitBtn && showDelimitBtn == "private") {
					this.disabledOutboard = true
					this.disabledStopUrging = true
					this.disabledTQJQ = true
					this.isdis = true
					this.disabledMethod = true
					this.disabledMethod1 = true
				}

				//如果其他页面路由有hiddenBtn=='private'这个参数就把新增联系人按钮和操作按钮还有重置提交按钮置灰
				//let sessionBtn=JSON.parse(window.sessionStorage.getItem('hiddenBtn')).hiddenBtn

				if (sessionBtn && sessionBtn == 'private') {
					this.disabledchong = false
					this.disabledtijiao = false
				}
			},
			 //刷新按钮状态
			refreshButtonState() {
				const _this = this;
				this.HttpAjax('post', 'operateButtonStatus', {
					loanContractNo: _this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						let stopUrge = res.data.data.stopUrgeButton //停催
						let sourcingAdvance = res.data.data.sourcingAdvanceButton //提前委外
						let reserverButton = res.data.data.reserverButton //划扣
						let settleButton = res.data.data.settleButton //结清
						let letterRepairlButton = res.data.data.letterRepairlButton //信修
						let revokeAdvanceButton = res.data.data.revokeAdvanceButton // 撤销提前委外
						if (stopUrge == '1') {
							this.disabledStopUrging2 = true;
						}
						if (sourcingAdvance == '1') { // 提前委外是否可以点击
							this.disabledOutboard2 = true;
						}else{
							this.disabledOutboard2 = false;
						}
						if (settleButton == '1') {
							this.disabledTQJQ2 = true;
						}
						if (reserverButton == '1') {
							this.disabledMethod2 = true;
						}
						if (letterRepairlButton == '1') {
							this.letterRepairlButton2 = true;
						}
						if(revokeAdvanceButton == '0'){ // 撤销提前委外
							this.CxdisabledOutboard2Hidden = true //撤销提前委外 显示
							this.disabledOutboard2Hidden = false //提前委外按钮 隐藏
						}else {
							this.CxdisabledOutboard2Hidden = false //撤销提前委外 隐藏
							this.disabledOutboard2Hidden = true //提前委外按钮 显示
						}
					}

				});
			},
			//催收备注
			remarkPeo($event) {
				this.formItem.lianluoren = $event.contactName
				this.formItem.lianluohaoma = $event.contactMobile
				this.formItem.contactType = $event.contactType
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				let genhu = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

				this.formItem.genghuriqi = new Date(genhu)
				this.formItem.genghuriqi2 = genhu
				//this.formItem.genghuriqi = new Date(genhu).format("yyyy-MM-dd hh:mm:ss");
			},
			openDhmList(name) { //获取电话码
				if (name) {
					let len = this.formItem.dhmList
					if (len.length > 0) {
						return;
					} else {
						this.HttpAjax('post', 'distList', {
							label: 'phoneCode'
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.formItem.dhmList = res.data.data;
							}
						});
					}

				}

			},
			changeDhmList(val) {
				this.formItem.dhm = val;
				this.formItem.xingdongma = '';
				this.formItem.xdmList.splice('0');
			},

			changeXdmList(val) {
				this.formItem.xdm = val
			},
			// -----------------催收备注开始
			//还款日期转换
			huankuanriqi(dat){
				this.formItem.huankuanriqi = dat
			},
			//跟呼日期 转换
			heelDate(dat) {
				this.formItem.genghuriqi2 = ''
				this.formItem.genghuriqi = dat
			},
			 //获取行动码
			openXdmList(name) {
				if (name) {
					let len = this.formItem.xdmList;
					let dhm = this.formItem.dhm ? this.formItem.dhm.split('-')[1] : '';
					if (len.length > 0) {
						return;
					} else {
						this.HttpAjax('post', 'distList', {
							label: 'actionCode',
							description: dhm
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.formItem.xdmList = res.data.data;
							}
						});
					}

				}
			},
			// 重置按钮
			csRemark(name) {
				this.$refs[name].resetFields();
			},

			//催收备注提交
			csSubmit(name) {
				const _this = this
				let followCallTime
				if(this.formItem.genghuriqi2 == ''){
					followCallTime = this.formItem.genghuriqi
				}else {
					followCallTime = this.formItem.genghuriqi2
				}
				let rdata = {
					loanContractNo: this.loanContractNo,
					contactPerson: this.formItem.lianluoren, //联络人
					contactNumber: this.formItem.lianluohaoma, //联络号码
					actionCode: this.formItem.dhm ? this.formItem.dhm.split('-')[0] : '', //电话码
					resultCode: this.formItem.xdm, //行动码
					followCallTime: followCallTime, //跟呼日期
					remark: this.formItem.beizhu, //备注
					repayTime: this.formItem.huankuanriqi,
					repayMoney: this.formItem.huankuanjine,
					contactRelationship: this.formItem.contactType //客户关系
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.disabledtijiao = true
						this.HttpAjax('post', 'saveUrgeRemarks', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							this.disabledtijiao = false
							if (res.data.status == '200') {
								this.$refs[name].resetFields();
								this.$Notice.success({
									title: '成功',
									desc: '提交成功'
								})
							}
						});
					}
				})
			},
			//-------------------催收备注结束
			changeTCtime(dat) {
				this.tingCuiLeiXing.TCtime = dat
			},
			 //短信通知
			changeYJnotice(name) {
				this.smsNotice.YJnoticeOption = name
				let jsonData = JSON.parse(name)
				if (jsonData.content && jsonData.modelName) {
					let rdata = {
						loanContractNo: this.loanContractNo,
						selectCntent: jsonData.content,
						modelName: jsonData.modelName
					}
					this.HttpAjax('post', 'generateMsg', rdata, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res.data.status == '200') {
							this.smsNotice.Maicontent = res.data.data.actMsgContent
							this.smsNotice.modelName = res.data.data.modelName
						}
					});
				}
			},
			//短信通知取消
			smsNoticeCancel(name) {
				this.SMSNotification = false
				this.$refs[name].resetFields();
				this.ALLdisabled();
			},
			smsNoticeSub(name) { //短信通知提交
				let rdata = {
					loanContractNo: this.loanContractNo,
					actMsgContent: this.smsNotice.Maicontent,
					clientName: this.smsNotice.Liaison,
					loanNamePhone: this.smsNotice.phone,
					modelName: this.smsNotice.modelName
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'sendMsg', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.SMSNotification = false;
								this.$refs[name].resetFields();
								this.$Notice.success({
									title: '成功',
									desc: '短信通知成功'
								})
								this.GetNoticeRecord();
								this.ALLdisabled();
							}
						});
					}
				});
			},
			 //提前委外
			changeSQreason(name) {
				this.OutboardForm.SQreasonOption = name
			},
			 //提前委外
			openSQreason(name) {
				if (name) {
					let len = this.OutboardForm.SQreasonList.length
					if (len > 0) {
						return;
					} else {
						this.HttpAjax('post', 'sourcingAdvance', {
							loanContractNo: this.loanContractNo
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.OutboardForm.SQreasonList = res.data.data
							}
						});
					}
				}
			},
			//提前委外
			tiQianWeiWai(name) {
				let rdata = {
					loanContractNo: this.loanContractNo,
					reason: this.OutboardForm.SQreasonOption,
					remarks: this.OutboardForm.remark
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'sourcingAdvance', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.$Notice.success({
									title: '成功',
									desc: '提交成功'
								})
								this.Outboard = false
								this.ALLdisabled()
								this.refreshButtonState();
								this.$refs[name].resetFields();
							}
						});
					}
				})

			},
			TQcancel(name) { //提前委外
				this.Outboard = false
				this.$refs[name].resetFields();
				this.ALLdisabled()
			},
			changeTCReason(name) { //停催原因下拉列表查询
				this.tingCuiLeiXing.TCReasonOption = name
			},
			openTCReason(name) { //停催原因下拉列表查询
				if (name) {
					let len = this.tingCuiLeiXing.TCReasonList.length
					if (len > 0) {
						return;
					} else {
						this.HttpAjax('post', 'distList', {
							label: 'stopCause'
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.tingCuiLeiXing.TCReasonList = res.data.data
							}
						});
					}
				}
			},
			tingcui() {
				this.StopUrging = true //打开停催弹出框
				this.ALLdisabled('alldis')
			},
			changeStopUrging(name) { //停催申请下拉列表查询
				this.tingCuiLeiXing.TCtypeOption = name
				if (name == '2') { //永久停催不能选择时间
					this.readPicker = false;
				} else {
					this.readPicker = true;
				}
			},
			openStopUrging(name) { //停催申请下拉列表查询
				if (name) {
					let len = this.tingCuiLeiXing.TCtypeList.length
					if (len > 0) {
						return;
					} else {
						this.HttpAjax('post', 'distList', {
							label: 'stopType'
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.tingCuiLeiXing.TCtypeList = res.data.data
							}
						});
					}
				}
			},
			TCcancel(name) { //停催申请
				this.StopUrging = false
				this.$refs[name].resetFields();
				this.ALLdisabled();
			},
			//提交停催申请
			SubUrging(name) { 
				let rdata = {
					loanContractNo: this.loanContractNo,
					endTime: this.tingCuiLeiXing.TCtime,
					stopUrgingReason: this.tingCuiLeiXing.TCReasonOption,
					type: this.tingCuiLeiXing.TCtypeOption,
					stopUrgingRemarks: this.tingCuiLeiXing.TCremark,

				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'stopUrgeSQ', rdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.$Notice.success({
									title: '成功',
									desc: '停催申请成功'
								})
								this.StopUrging = false //关闭弹窗

								this.ALLdisabled()
								this.refreshButtonState(); //刷新按钮状态
								this.$refs[name].resetFields(); //清空表单

							}
						});
					}
				})
			},

			delimitMethod() { //划扣
				const _ = this;
				_.delimitModal = true;
				_.$refs['delimitModalForm'].resetFields();
				_.delimitModalForm.loanContractNo = this.loanContractNo;
				this.ALLdisabled('alldis')
			},
			delimit(name) { //划扣
				const _ = this;
				_.$refs[name].validate((valid) => {
					if (valid) {
						_.HttpAjax('post', 'addReserver', _.delimitModalForm, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == '200') {
								this.disabledMethod2 = true;
								this.disabledTQJQ2 = true; //划扣成功后 也不能提前结清
								this.$Notice.success({
									title: '成功',
									desc: '划扣申请成功'
								})
								_.delimitModal = false;
								_.init()
								_.ALLdisabled()
							}
						})
					}
				});
			},
			getselectList(label) { //模态框里的下拉数据
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
						}
					}
				});
			},
			delimitMethod4Time(name) { //根据划扣类型判断是否显示时间
				const _ = this;
				if (name == 2) {
					_.isshowDelimitTime = false;
					_.delimitModalForm.reserverTime = ''
				} else {
					_.isshowDelimitTime = true
				}
			},
			cancel() { //取消划扣模态框
				this.delimitModal = false;
				this.ALLdisabled()
			},
			dateChange(val) { //划扣申请时间
				this.delimitModalForm.reserverTime = val;
			},
			TQweiwai() { //提前委外
				this.Outboard = true
				this.ALLdisabled('alldis')
			},
			//撤销提前委外
			CxTQweiwai(){
				this.HttpAjax('post','RevokeAdvance',{loanContractNo: this.loanContractNo,},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.refreshButtonState();
						this.ALLdisabled()
						this.init();
					}
				})
			},
			Marilyn() { //邮件
				this.MailNotification = false
				this.ALLdisabled()
			},
			// 查询信函模板
			getXHMB(val){
				if(val){
					this.HttpAjax('post','getDictionariesByTypeLetterTemplate',{},(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status ==200){
							this.xinhanData = res.data.data
						}
					})
				}
			},
			xinhanCancel(name) { //信函
				this.LetterOfLetter = false
				this.ALLdisabled()
				this.$refs[name].resetFields();
			},
			xinhanconform(name) { //提交信函
				let resdata = {
					loanContractNo: this.lineData.loanContractNo,
					loanName: this.lineData.clientName,
					overdueGrade: this.lineData.overdueGrade,
					repaymentLine: this.Letterlist.Signature,
					letterTemplateName: this.Letterlist.YJnotice
				}
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'beginCheck', resdata, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res.data.status == '200') {
								this.LetterOfLetter = false
								this.ALLdisabled()
								this.$refs[name].resetFields();
								this.$Notice.success({
									title: '成功',
									desc: '操作成功!'
								})
							}
						});
					}
				})
			},
			closeStopUrging(name) { //停催关闭按钮
				this.ALLdisabled();
				if (name == 'lianxiren') {
					return;
				} else {
					this.$refs[name].resetFields();
				}
			},

			//百融信修流转接口
			repairTransfer() {
				let userINFO = this.$refs.importantInfos.propUserINFO;
				let rdata = {
					no: this.loanContractNo,
					id: userINFO.idCard=='无'?'': userINFO.idCard,
					cell: userINFO.phone=='无'? '':userINFO.phone ,
					name: userINFO.clientName=='无'? '': userINFO.clientName
				}
				this.HttpAjax('post', 'transferData', rdata, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.code == '0') {
						this.letterRepairlButton2 = true;
						this.$Notice.success({
							title: '成功',
							desc: '信修申请提交成功'
						})
					}
				});
			},

			phoneZation(phone) {
				return phone.substring(0, 3) + '*****' + phone.substring(8, phone.length);
			},
			ALLdisabled(alldis) {
				if (alldis != undefined) {
					this.Recharge = true //代充值， 合规
					this.disabledMethod1 = true;
					this.disabledTQJQ = true;
					this.disabledOutboard = true;
					this.disabledStopUrging = true;
					this.disabledMethod = true;

					this.isdis = true;
					this.disabledchong = true;
					this.disabledtijiao = true;
					this.$refs.mychild.btnSTATUS("sta"); //新增联系人的禁用
				} else {
					this.Recharge = false //代充值， 合规
					this.disabledMethod1 = false;
					this.disabledTQJQ = false;
					this.disabledOutboard = false;
					this.disabledStopUrging = false;
					this.disabledMethod = false;

					this.isdis = false;
					this.disabledchong = false;
					this.disabledtijiao = false;
					this.$refs.mychild.btnSTATUS();
				}
			},
			// 资料影像切换页码
			imageDataPage(page) {
				this.GetDataImage(page);
			},
			// 资料影像刷新
			imageDataPageRefresh() {
				this.GetDataImage();
			},
			// 贷款信息 数据
			GetLoanInformation() {
				this.HttpAjax('post', 'getLoanInformation', {
					loanContractNo: this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						for (let i in res.data.data.clientInfo) {
							if (res.data.data.clientInfo[i] == null) {
								this.$set(this.clientInfo, i, '无')
							} else {
								this.$set(this.clientInfo, i, res.data.data.clientInfo[i])
							}
						}
						// this.clientInfo=res.data.data.clientInfo
						this.otherContactDtos = res.data.data.otherContactDtos // 其他联系人信息
						this.familyInfoDto = res.data.data.familyInfoDto // 家庭信息
					}
				});
			},
			// 资料影像
			GetDataImage(pageIndex = '1', pageSize = '10') {
				this.HttpAjax('post', 'getDataImage', {
					pageSize: pageSize,
					pageIndex: pageIndex,
					loanContractNo: this.loanContractNo,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.imageData = res.data.data
					}
				});
			},
			//获取资料影像的总条数
			GetDataImageCount() {
				this.HttpAjax('post', 'getDataImageCount', {
					loanContractNo: this.loanContractNo,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.imageDataCount = res.data.data
					}
				});
			},
			// 获取通知记录数据
			GetNoticeRecord() {
				this.HttpAjax('post', 'getNoticeRecord', {
					loanContractNo: this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.getNoticeRecord = res.data.data
					}
				})
			},
			// 分案记录获取数据
			GetDivisionRecord() {
				this.HttpAjax('post', 'getDivisionRecord', {
					loanContractNo: this.loanContractNo,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.getDivisionRecord = res.data.data
					}
				});
			},
			// 关联案件获取数据
			GetRelationCase() {
				this.HttpAjax('post', 'getRelationCase', {
					loanContractNo: this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.getRelationCase = res.data.data
					}
				});
			},
			// 联系人信息查询
			getContactInformation() {
				this.HttpAjax('post', 'getContactInformation', {
					loanContractNo: this.loanContractNo
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.contactINFO = res.data.data.data;
					}
				});
			},
			//APP通讯录查询
			GetMailList() {
				const _ = this;
				_.HttpAjax('post', 'getAppMailList', {
					loanContractNo: this.loanContractNo,
					pageIndex: _.appMailList.pageIndex,
					pageSize: _.appMailList.pageSize,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.APPmailList = res.data.data.data;
					}
				});
			},
			// APP通话记录 查询
			earlyClearance(page, pagesize) {
				const _ = this;
				_.appCallRecord.pageIndex = page || _.appCallRecord.pageIndex;
				_.appCallRecord.pageSize = pagesize || _.appCallRecord.pageSize;
				_.HttpAjax('post', 'getAppCallRecord', {
					loanContractNo: this.loanContractNo,
					pageIndex: _.appCallRecord.pageIndex,
					pageSize: _.appCallRecord.pageSize,
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == '200') {
						this.callRecordINFO = res.data.data.data;
					}
				});
			},
			// 电商收货地址
			OnlineRetailersAddress() {
				this.HttpAjax('post', 'etECommerce', {
					loanContractNo: this.loanContractNo, // '222222222222222'
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.OnlineRetailers = res.data.data
					}
				})
			},
			//运营商报告通话记录
			OperatorCall() {
				this.HttpAjax('post', 'getOperatorCallRecord', {
					loanContractNo: this.loanContractNo, // '70015094209683623164'
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.operatorCallrecords = res.data.data
					}
				})
			},
			// APP 通讯录 子页面 刷新按钮点击事件
			OneAgainGetMailList() {
				this.GetMailList();
			},
			//APP 通话记录 子页面 刷新按钮点击事件
			OneAgainGetData() {
				this.earlyClearance()
			},
			//电商收货地址 子页面 刷新
			OnlineRetailer() {
				this.OnlineRetailersAddress();
			},
			// 运营商报告通话记录
			operatorCalls() {
				this.OperatorCall();
			},
			viewTemplate(name) {
				const _ = this;
				this.MaicontentSrc = '/static/pdf/' + name + ".png";
				this.MaicontentFile = name + ".png";
			},
			goBack() {
				this.$router.go(-1);
			},
			// ----------- 合规 代充值 部分
			// 代充值按钮
			RechargeMoney(){
				this.ALLdisabled('1');
				this.RechargeModal = true;
				for(let i  in  this.SubData){
					this.SubData[i] = ''
				}
				this.SubData.loanContractNo =  this.loanContractNo //'APP64012220161008653500001'  // // '20014924993513938275' 
			},
			// 代充值校验接口(校验合同号)
			SubmitLoanContractNo() {
				this.HttpAjax('post', 'ProxyrechargeCheckProxyRecharge',this.SubData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.SubData = res.data.data
						this.disabledRecharge = false;
					}
				})
			},
			// 弹窗取消按钮点击事件
			Reset(){
				for(let i  in  this.SubData){
					this.SubData[i] = ''
				}
				this.RechargeModal = false;
				this.ALLdisabled();
			},
			// 获取银行
			GetBank(val) {
				if(val){
					this.HttpAjax('post', 'GetBank', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == 200) {
							this.distList.Bank = res.data.data
						}
					})
				}
			},
			// 提交充值
			SubMitRechargeData(name){
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.HttpAjax('post', 'SubmitProxyRecharge', this.SubData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if (res && res.data.status == 200) {
								this.RechargeModal = false;
								this.init();
								this.ALLdisabled();
								this.hrefUrl = res.data.data;
								this.$nextTick(function() {
									this.$refs.hrefOpen.click();
								})
							}
						})
					}
				})
			},
		},
		created() {
			this.init()
			this.loanContractNo = this.getStore('opreateBtn').allINFO.loanContractNo;
			this.caseType = this.getStore('opreateBtn').allINFO.caseType;
			this.lineData = this.getStore('opreateBtn').allINFO;
			this.refreshButtonState(); //刷新按钮状态
		},
		mounted() {
			this.getselectList('reserverType'); //划扣类型
			this.getselectList('reserverMethod'); //划扣方式
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
							this.add_search_data.liabilityType = '';
							this.disables.showLibType = true;
						}
					}
				},
				deep:true
			}
		}

	}
</script>

<style scoped lang="less">
	@import url("../../../assets/css/pubVar.less");

	.detail {
		.detail-row {
			margin-top: 30px;
		}

		.wrap {
			padding-left: 20px;
			padding-top: 2px;

		}

		.disabled {
			background: #f7f7f7 !important;
			color: #c5c8ce !important;
			border: 1px solid #dcdee2 !important;
		}
	}
</style>
<style lang="less">
	.tiqianhetong {
		.ivu-input {
			width: 240px;
		}
	}

	.addInfo {
		.ivu-modal .ivu-modal-content {
			width: 750px !important;
		}
	}

	.ghrq {
		.ivu-date-picker {
			width: 100% !important;
		}
	}

	.modalTip {
		.ivu-modal .ivu-modal-body {
			overflow: visible;
		}

		.InputColor {
			textarea {
				color: black;
			}
		}
	}

	.tips {
		.ivu-select-placeholder {
			text-align: left;
		}
	}
	.RechargeModal {
		.ivu-modal .ivu-modal-content {
			.ivu-modal-body {
				.from-item {
					position: relative;

					.ivu-form-item {
						width: 350px !important;
						margin-bottom: 5px;

						.ivu-input-disabled {
							color: black;
						}
					}

					.ivu-btn {
						position: absolute;
						right: 0;
					}
				}
			}
		}
	}
	.normalModal {
		height: 36px;
		border: solid 1px #dddee1;
		color: #c5c8ce;
		text-indent: 8px;
	}
</style>
