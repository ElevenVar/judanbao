<template>
	<div class="buckleManage">
		<!-- 公共折叠面板类 -->
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
						<!-- 第0个下拉选择框 -->
						<Form label-position="right" inline :model="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号码</Option>
									<!--<Option value="3">联系电话</Option>-->
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>主体</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>产品线</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>划扣状态</Option>
									<Option value="7" v-show='formIndex1 != 7 && formIndex2 != 7 && formIndex3 != 7'>预约划扣时间</Option>
									<Option value="8" v-show='formIndex1 != 8 && formIndex2 != 8 && formIndex3 != 8'>身份证号</Option>
									<Option value="9" v-show='formIndex1 != 9 && formIndex2 != 9 && formIndex3 != 9'>电话号码</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入客户姓名！" v-model="formData.clientName" size="large"></Input>
								<Input v-show="formIndex == 2" type="text" placeholder="请输入身份证号码！" v-model="formData.idCard" size="large"></Input>
								<!--<Input v-if="formIndex == 3" type="text" placeholder="请输入联系电话！"  v-model="formData.loanNamePhone"  size="large"></Input>-->
								<Select v-show="formIndex == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 5" @on-open-change="getListDict($event,'serviceLine')" v-model="formData.serviceLine"
								 placeholder="请选择产品线" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 6" @on-open-change="getListDict($event,'reserverStatus')" v-model="formData.reserverStatus"
								 placeholder="请选择划扣状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.reserverStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex == 7" v-model="formData.reserverTime" @on-change='dateChange($event,"")' format="yyyy-MM-dd"
								 type="date" :editable="false" placeholder="请输入预约划扣时间！" size="large"></DatePicker>
								<Input v-show="formIndex == 8" type="text" placeholder="请输入身份证号！" v-model="formData.idCard" size="large"></Input>
								<Input v-show="formIndex == 9" type="text" placeholder="请输入电话号码！" v-model="formData.loanNamePhone" size="large"></Input>
							</FormItem>

						</Form>
						<!-- 第1个下拉选择框 -->
						<Form label-position="right" inline :model="formData1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>身份证号码</Option>
									<!--<Option value="3">联系电话</Option>-->
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>产品线</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>划扣状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex2 != 7 && formIndex3 != 7'>预约划扣时间</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex2 != 8 && formIndex3 != 8'>身份证号</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex2 != 9 && formIndex3 != 9'>电话号码</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData1.clientName" size="large"></Input>
								<Input v-show="formIndex1 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData1.idCard" size="large"></Input>
								<!--<Input v-if="formIndex1 == 3" type="text" placeholder="请输入联系电话！"  v-model="formData.loanNamePhone"  size="large"></Input>-->
								<Select v-show="formIndex1 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData1.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 5" @on-open-change="getListDict($event,'serviceLine')" v-model="formData1.serviceLine"
								 placeholder="请选择产品线" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 6" @on-open-change="getListDict($event,'reserverStatus')" v-model="formData1.reserverStatus"
								 placeholder="请选择划扣状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.reserverStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex1 == 7" v-model="formData1.reserverTime" @on-change='dateChange($event,"1")' format="yyyy-MM-dd"
								 type="date" :editable="false" placeholder="请输入预约划扣时间！" size="large"></DatePicker>
								<Input v-show="formIndex1 == 8" type="text" placeholder="请输入身份证号！" v-model="formData1.idCard" size="large"></Input>
								<Input v-show="formIndex1 == 9" type="text" placeholder="请输入电话号码！" v-model="formData1.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第2个下拉选择框 -->
						<Form label-position="right" inline :model="formData2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>身份证号码</Option>
									<!--<Option value="3">联系电话</Option>-->
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>产品线</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>划扣状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex3 != 7'>预约划扣时间</Option>
									<Option value="8" v-show='formIndex != 8 && formIndex1 != 8 && formIndex3 != 8'>身份证号</Option>
									<Option value="9" v-show='formIndex != 9 && formIndex1 != 9 && formIndex3 != 9'>电话号码</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData2.clientName" size="large"></Input>
								<Input v-show="formIndex2 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData2.idCard" size="large"></Input>
								<!--<Input v-if="formIndex2 == 3" type="text" placeholder="请输入联系电话！"  v-model="formData.loanNamePhone"  size="large"></Input>-->
								<Select v-show="formIndex2 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData2.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 5" @on-open-change="getListDict($event,'serviceLine')" v-model="formData2.serviceLine"
								 placeholder="请选择产品线" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 6" @on-open-change="getListDict($event,'reserverStatus')" v-model="formData2.reserverStatus"
								 placeholder="请选择划扣状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.reserverStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex2 == 7" v-model="formData2.reserverTime" @on-change='dateChange($event,"2")' format="yyyy-MM-dd"
								 type="date" :editable="false" placeholder="请输入预约划扣时间！" size="large"></DatePicker>
								<Input v-show="formIndex2 == 8" type="text" placeholder="请输入身份证号！" v-model="formData2.idCard" size="large"></Input>
								<Input v-show="formIndex2 == 9" type="text" placeholder="请输入电话号码！" v-model="formData2.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 第3个下拉选择框 -->
						<Form label-position="right" inline :model="formData3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>身份证号码</Option>
									<!--<Option value="3">联系电话</Option>-->
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>主体</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>产品线</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6'>划扣状态</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>预约划扣时间</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>身份证号</Option>
									<Option value="7" v-show='formIndex != 7 && formIndex1 != 7 && formIndex2 != 7'>电话号码</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入客户姓名！" v-model="formData3.clientName" size="large"></Input>
								<Input v-show="formIndex3 == 2" type="text" placeholder="请输入身份证号码！" v-model="formData3.idCard" size="large"></Input>
								<!--<Input v-if="formIndex3 == 3" type="text" placeholder="请输入联系电话！"  v-model="formData.loanNamePhone"  size="large"></Input>-->
								<Select v-show="formIndex3 == 4" @on-open-change="getListDict($event,'mainBody')" v-model="formData3.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 5" @on-open-change="getListDict($event,'serviceLine')" v-model="formData3.serviceLine"
								 placeholder="请选择产品线" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.serviceLine" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 6" @on-open-change="getListDict($event,'reserverStatus')" v-model="formData3.reserverStatus"
								 placeholder="请选择划扣状态" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.reserverStatus" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex3 == 7" v-model="formData3.reserverTime" @on-change='dateChange($event,"3")' format="yyyy-MM-dd"
								 type="date" :editable="false" placeholder="请输入预约划扣时间！" size="large"></DatePicker>
								<Input v-show="formIndex3 == 8" type="text" placeholder="请输入身份证号！" v-model="formData3.idCard" size="large"></Input>
								<Input v-show="formIndex3 == 9" type="text" placeholder="请输入电话号码！" v-model="formData3.loanNamePhone" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click.prevent="search">查询</Button>
								<Button @click="restData()">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('10000010102')" @click="exportExcel">
									<Icon type="navicon-round"></Icon> 导出数据
								</Button>
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
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default {
		name: "buckleManage",
		data() {
			return {
				value1: '1',
				title: '划扣管理',
				rotate: true,
				placeholder: "请输入合同编号！",
				indexSelect: '1',
				totallPages: 0,
				formIndex: '0',
				formIndex1: '1',
				formIndex2: '2',
				formIndex3: '4',
				// 筛选字段
				formData: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					idCard: '', //证件号码
					loanNamePhone: '', //联系电话
					mainBody: '', //主体
					serviceLine: '', //产品线
					reserverStatus: '', //划扣状态
					reserverTime: '', //预约划扣时间
					loanNamePhone:'',
					idCard:'',
				},
				formData1: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					idCard: '', //证件号码
					loanNamePhone: '', //联系电话
					mainBody: '', //主体
					serviceLine: '', //产品线
					reserverStatus: '', //划扣状态
					reserverTime: '', //预约划扣时间
					loanNamePhone:'',
					idCard:'',
				},
				formData2: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					idCard: '', //证件号码
					loanNamePhone: '', //联系电话
					mainBody: '', //主体
					serviceLine: '', //产品线
					reserverStatus: '', //划扣状态
					reserverTime: '', //预约划扣时间
					loanNamePhone:'',
					idCard:'',
				},
				formData3: {
					loanContractNo: '', //合同编号
					clientName: '', //客户姓名
					idCard: '', //证件号码
					loanNamePhone: '', //联系电话
					mainBody: '', //主体
					serviceLine: '', //产品线
					reserverStatus: '', //划扣状态
					reserverTime: '', //预约划扣时间
					loanNamePhone:'',
					idCard:'',
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				distList: {
					mainBody: [],
					reserverStatus: [],
					serviceLine: []
				},
				ruleValidate: {
					mainBody: [{
						required: false,
						message: '请选择主体！'
					}],
					reserverStatus: [{
						required: false,
						message: '请选择划扣状态！'
					}],
					serviceLine: [{
						required: false,
						message: '请选择产品线！'
					}],
					reserverTime: [{
						required: false,
						message: '请输入划扣预约时间！'
					}],
				},
				columns: [{
						title: '合同编号',
						minWidth: 120,
						key: 'loanContractNo',
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'clientName',
					},
					/* {
						title: '证件号码',
						minWidth: 120,
						key: 'idCard',
					}, */
					{
						title: '主体',
						minWidth: 120,
						key: 'mainBody',
					},
					{
						title: '产品线',
						minWidth: 120,
						key: 'serviceLine',
					},
					{
						title: '合同金额',
						minWidth: 120,
						key: 'loanAmount',
					},
					{
						title: '划扣备注',
						minWidth: 160,
						key: 'result',
					},
					/* {
						title: '联系电话',
						minWidth: 120,
						key: 'loanNamePhone',
					}, */
					{
						title: '案件分配日期',
						minWidth: 120,
						key: 'caseAllotTime',
					},
					{
						title: '预约划扣金额',
						minWidth: 120,
						key: 'reserverAmount',
					},
					{
						title: '预约划扣日期',
						minWidth: 120,
						key: 'reserverTime',
					},
					{
						title: '实扣金额',
						minWidth: 120,
						key: 'actualAmount',
					},
					{
						title: '划扣类型',
						minWidth: 120,
						key: 'reserverType',
					},
					{
						title: '划扣状态',
						minWidth: 120,
						key: 'reserverStatus',
					},
					// {
					//   title: '总服务费',minWidth:120,key: '10',
					// },
					{
						title: '放款日期',
						minWidth: 120,
						key: 'fullScaleDate',
					},
					{
						title: '还款日',
						minWidth: 120,
						key: 'repayDate',
					},
					{
						title: '逾期等级',
						minWidth: 120,
						key: 'overdueGrade',
					},
					{
						title: '逾期天数',
						minWidth: 120,
						key: 'overdueDay',
					},
					{
						title: '申请人',
						minWidth: 120,
						key: 'reserverUser',
					},
					{
						title: '所属团队',
						minWidth: 160,
						key: 'teamNo',
					},
					{
						title: '永久催收员',
						minWidth: 120,
						key: 'foreverUrgeNo',
					},
					{
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
										disabled: params.row.reserverStatus == '待划扣' ? false : true,
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.cancelReserver(params)
										}
									}
								}, '取消预约'),
							])
						}
					},

				],
				datas: [

				],
			}
		},
		methods: {
			init() {
				const _ = this;
				_.reserverList();
			},
			reserverList(page, pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
				_.HttpAjax('post', 'reserverList', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						_.totallPages = res.data.data.dataCount;
						_.datas = res.data.data.data;

					}
				});
			},
			getListDict(bol, label) { //所有下拉列表
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
										_.distList.mainBody = res.data.data;
										break;
									case 'reserverStatus': //划扣状态
										_.distList.reserverStatus = res.data.data;
										break;
									case 'serviceLine': //产品线
										_.distList.serviceLine = res.data.data;
										break;
								}
							}
						});
					}
				}
			},
			cancelReserver(row) { //取消预约方法
				const _ = this;
				_.HttpAjax('post', 'cancleReserver', {
					idKey: row.row.idKey
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						this.$Notice.success({
							title: '成功',
							desc: '已取消预约!',
							duration: 2
						})
						this.init();
					}
				});
			},
			changePages(name) { //翻页-->第几页
				this.reserverList(name);
			},
			changePagesTotall(name) { //翻页-->每一页显示的数据条数
				this.LastSubmitData.pageSize = name;
				this.reserverList('', name);
			},
			dateChange(val, index) { //时间转化
				index = index || '';
				if (index == '') {
					this.formData.reserverTime = val
				} else {
					this['formData' + index].reserverTime = val;
				}
			},
			refresh() { //刷新
				this.reserverList();
			},
			// 查询
			search() {
				this.ClearObject(this.LastSubmitData)
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
				this.reserverList();
			},
			//下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.formIndex = val
				}else{
					this['formIndex'+index] = val
				}
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
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
			restData() { //重置
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.reserverList();
			},
			exportExcel() { //导出
				const _ = this;
				_.HttpAjax('post', 'exportReserverList', qs.stringify(_.LastSubmitData), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);

					//二进制流文件下载
					this.downLoadFile(res.data, '划扣.xlsx');

				}, 'download');
			}
		},
		created() {

		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less">
	.buckleManage {
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
