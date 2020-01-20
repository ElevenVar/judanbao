<template>
	<div class="myOutsideCase">
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
						<!-- 第0个 下拉选择框 -->
						<Form label-position="right" inline :model="formData" :rules="ruleValidate" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change='ClearVal($event,"0")'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3!= 1'>姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3!= 2'>主体</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3!= 3'>产品类型</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3!= 4'>所属委外公司</Option>
								</Select>
								<Input v-show="formIndex == 0" type="text" placeholder="请输入合同编号！" v-model="formData.loanContractNo" size="large"></Input>
								<Input v-show="formIndex == 1" type="text" placeholder="请输入姓名！" v-model="formData.loanName" size="large"></Input>
								<Select v-show="formIndex == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex == 3" @on-open-change='getProductTypeList' v-model="formData.productNo" placeholder="请选择产品类型"
								 class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex == 4" @on-open-change='getWwCompanyList' v-model="formData.entrustCompanyNo"
								 placeholder="请选择所属委外公司" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第1个 下拉选择框 -->
						<Form label-position="right" inline :model="formData1" :rules="ruleValidate" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change='ClearVal($event,"1")'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3!= 1'>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3!= 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3!= 3'>产品类型</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3!= 4'>所属委外公司</Option>
								</Select>
								<Input v-show="formIndex1 == 0" type="text" placeholder="请输入合同编号！" v-model="formData1.loanContractNo" size="large"></Input>
								<Input v-show="formIndex1 == 1" type="text" placeholder="请输入姓名！" v-model="formData1.loanName" size="large"></Input>
								<Select v-show="formIndex1 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData1.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex1 == 3" @on-open-change='getProductTypeList' v-model="formData1.productNo" placeholder="请选择产品类型"
								 class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex1 == 4" @on-open-change='getWwCompanyList' v-model="formData1.entrustCompanyNo"
								 placeholder="请选择所属委外公司" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第2个 下拉选择框 -->
						<Form label-position="right" inline :model="formData2" :rules="ruleValidate" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change='ClearVal($event,"2")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3!= 1'>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3!= 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3!= 3'>产品类型</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3!= 4'>所属委外公司</Option>
								</Select>
								<Input v-show="formIndex2 == 0" type="text" placeholder="请输入合同编号！" v-model="formData2.loanContractNo" size="large"></Input>
								<Input v-show="formIndex2 == 1" type="text" placeholder="请输入姓名！" v-model="formData2.loanName" size="large"></Input>
								<Select v-show="formIndex2 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData2.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex2 == 3" @on-open-change='getProductTypeList' v-model="formData2.productNo" placeholder="请选择产品类型"
								 class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex2 == 4" @on-open-change='getWwCompanyList' v-model="formData2.entrustCompanyNo"
								 placeholder="请选择所属委外公司" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
							</FormItem>
						</Form>
						<!-- 第3个 下拉选择框 -->
						<Form label-position="right" inline :model="formData3" :rules="ruleValidate" ref="formData">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change='ClearVal($event,"3")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2!= 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2!= 1'>姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2!= 2'>主体</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2!= 3'>产品类型</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2!= 4'>所属委外公司</Option>
								</Select>
								<Input v-show="formIndex3 == 0" type="text" placeholder="请输入合同编号！" v-model="formData3.loanContractNo" size="large"></Input>
								<Input v-show="formIndex3 == 1" type="text" placeholder="请输入姓名！" v-model="formData3.loanName" size="large"></Input>
								<Select v-show="formIndex3 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData3.mainBody"
								 placeholder="请选择主体！" class="twoSelect" size="large">
									<Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
								</Select>
								<Select v-show="formIndex3 == 3" @on-open-change='getProductTypeList' v-model="formData3.productNo" placeholder="请选择产品类型"
								 class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
								</Select>
								<Select v-show="formIndex3 == 4" @on-open-change='getWwCompanyList' v-model="formData3.entrustCompanyNo"
								 placeholder="请选择所属委外公司" class="twoSelect" size="large">
									<Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
								</Select>
							</FormItem>
						</Form>
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click.prevent="historicalrecords">查询</Button>
								<Button @click="restData">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('03000010401')" @click="exportExcel">
									<Icon type="navicon-round"></Icon> 导出
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="tabChange">
					<TabPane label="分案历史" name="tab1">
						<div v-show='tab =="tab1"'>
							<!-- 公共table类-->
							<div class="table-item">
								<Table height='396' border :stripe="true" :columns="columns" :data="datas"></Table>
							</div>
							<!-- 公共page分页类 -->
							<div class="page-item">
								<Page placement="top" :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
								<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
							</div>
						</div>
					</TabPane>
					<TabPane label="已结清" name="tab2">
						<div v-show='tab =="tab2"'>
							<!-- 公共table类-->
							<div class="table-item">
								<Table height='396' border :stripe="true" :columns="JQcolumns" :data="JQdatas"></Table>
							</div>
							<!-- 公共page分页类 -->
							<div class="page-item">
								<Page placement="top" :total="JQtotallPages" show-total show-sizer @on-change="JQchangePages" @on-page-size-change="JQchangePagesTotall"></Page>
								<Icon type="ios-refresh" style="font-size: 30px" @click="JQrefresh" />
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
		name: 'myOutsideCase',
		data() {
			// 验证规则
			const cellNum = (rule, value, callback) => {
				if (value.length > 60) {
					callback(new Error('不能超过60个字符！'));
				} else {
					callback();
				}
			};
			return {
				// 面包屑切换
				tab: 'tab1',
				value1: '1',
				title: '历史分案记录',
				rotate: true,
				totallPages: 0, // 分案历史总条数
				JQtotallPages: 0, //已结清 总条数
				select3: '',
				maxLength: 60,
				placeholder: "请输入合同编号！",
				formIndex: '0', //第一个下拉框默认选中
				formIndex1: '1', //第二个下拉框默认选中
				formIndex2: '2', //第三个下拉框默认选中
				formIndex3: '3', //第四个下拉框默认选中

				//筛选字段
				formData: {
					loanContractNo: '', // 合同号
					loanName: '', //姓名
					mainBody: '', //主体
					productNo: '', // 产品类型
					entrustCompanyNo: '' //所属委外公司
				},
				formData1: {
					loanContractNo: '', // 合同号
					loanName: '', //姓名
					mainBody: '', //主体
					productNo: '', // 产品类型
					entrustCompanyNo: '' //所属委外公司 entrustCompanyNo
				},
				formData2: {
					loanContractNo: '', // 合同号
					loanName: '', //姓名
					mainBody: '', //主体
					productNo: '', // 产品类型
					entrustCompanyNo: '' //所属委外公司
				},
				formData3: {
					loanContractNo: '', // 合同号
					loanName: '', //姓名
					mainBody: '', //主体
					productNo: '', // 产品类型
					entrustCompanyNo: '' //所属委外公司
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				//下拉菜单数据汇集
				distList: {
					mainBody: [],
					urgeCaseStatus: [],
					queryProductTypeList: [],
					queryWwCompanyList: [],
				},
				ruleValidate: { //筛选验证
					loanName: [
							{required: false, message: '姓名！'},
							{validator: cellNum, trigger: 'blur'},
						],
					loanContractNo: [
						{required: false, message: '编号！'},
						{type: 'number', message: '请输入数字格式', trigger: 'blur',
							transform(value) {
								return Number(value);
							}
						},
					],
				},
				columns: [
					{title: '归属营业部',minWidth: 120,key: 'belongOrgName'},
					{title: '省份',minWidth: 120,key: 'areaName'},
					{title: '合同编号',minWidth: 150,key: 'loanContractNo'},
					{title: '姓名',minWidth: 90,key: 'loanName'},
					{title: '主体',minWidth: 100,key: 'mainBodyName'},
					{title: '产品类型',minWidth: 120,key: 'productTypeName'},
					{title: '合同期数',minWidth: 90,key: 'loanBill'},
					{title: '案件状态',minWidth: 100,key: 'caseStatusName'},
					{title: '逾期天数',minWidth: 90,key: 'overdueDays'}, 
					{title: '期初逾期天数',minWidth: 110,key: 'beginOverdueDays'},
					{title: '已还金额',minWidth: 100,key: 'paidAmount'},
					{title: '应收客户总额',minWidth: 110,key: 'unpaidOverdueFee'},
					{title: '所属委外公司',minWidth: 110,key: 'entrustCompanyName'}, 
					{title: '案件分配日期',minWidth: 130,key: 'allocationCaseDate'},
					{title: '委案结束日期',minWidth: 130,key: 'closureCaseDate'},
					{title: '分案批次',minWidth: 140,key: 'lenth'},
					{title: '案件类型',minWidth: 130,key: 'caseTypeName'},
					{title: '逾期等级',minWidth: 130,key: 'overdueGrade'}
				],
				JQcolumns:[
					{title: '进件营业部',minWidth:120,key:'signOrgName'},
					{title: '归属营业部',minWidth:120,key:'belongOrgName'},
					{title: '合同编号',minWidth:160,key:'loanContractNo'},
					{title: '客户姓名',minWidth:160,key:'loanName'},
					{title: '产品类型',minWidth:160,key:'productTypeName'},
					{title: '还款日',minWidth:160,key:'monthPayDate'},
					{title: '逾期等级',minWidth:160,key:'overdueGrade'},
					{title: '逾期天数',minWidth:160,key:'overdueDays'},
					{title: '逾期总额',minWidth:160,key:'oneSettleAmount'},
					{title: '案件分配日期',minWidth:160,key:'allocationCaseDate'},
					{title: '案件状态',minWidth:160,key:'caseStatus'},
					{title: '委外公司',minWidth:160,key:'entrustCompanyName'},
					{title: '客户结清时间',minWidth:160,key:'lastRepaytime'},
					{title: '操作',minWidth:90,key:'overdueGrade',
						render: (h, params) => {
							return('div',[
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
									},
									on: {
										click:()=>{
											this.downLoadJqModel(params.row)
										}
									}
								},'下载')
							])
						},
					},
					],
				datas: [],
				JQdatas:[],
			}
		},
		methods: {
			//默认查询数据(分案历史)
			init(page, pagesize) {
				const _ = this;
				_.LastSubmitData.pageIndex = page || _.LastSubmitData.pageIndex;
				_.LastSubmitData.pageSize = pagesize || _.LastSubmitData.pageSize;
				_.HttpAjax('post', 'historyCaseList', _.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == '200') {
						_.totallPages = res.data.data.dataCount; //显示数据总条数
						_.datas = res.data.data.data;
					}
				});
			},
			// 已结清
			Jq(page, pagesize){
				this.LastSubmitData.pageIndex = page || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pagesize || this.LastSubmitData.pageSize;
				this.HttpAjax('post','overCaseList',this.LastSubmitData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.JQtotallPages = res.data.data.dataCount
						this.JQdatas = res.data.data.data
					}
				})
			},
			// 表格切换
			tabChange(name){
				this.ClearObject(this.formData)
				this.ClearObject(this.formData1)
				this.ClearObject(this.formData2)
				this.ClearObject(this.formData3)
				this.ClearObject(this.LastSubmitData)
				this.tab = name
				if(name == 'tab1' && this.datas.length == 0){
					this.init()
				}else if(name == 'tab2' && this.JQdatas.length == 0){
					this.Jq()
				}
			},
			// 查询按钮
			historicalrecords() { //列表初始化及筛选
				this.ClearObject(this.LastSubmitData);
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
				if(this.tab == 'tab1'){
					this.init()
				}else{
					this.Jq();
				}
			},
			// 下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.formIndex = val
				}else {
					this['formIndex'+index] = val
				}
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.formData)
					}else {
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
				if(this.tab == 'tab1'){
					this.init();
				}else {
					this.Jq();
				}
				
			},
			//刷新
			refresh() {
				this.init();
			},
			JQrefresh(){
				this.Jq();
			},
			//所有下拉列表
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
										_.distList.mainBody = res.data.data; //主体
										break;
									case 'urgeCaseStatus': //结案状态
										_.distList.urgeCaseStatus = res.data.data;
										break;
								}
							}
						});
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
			//翻页-->第几页
			changePages(name) {
				this.init(name);
			},
			JQchangePages(name) {
				this.Jq(name);
			},
			//每一页显示多少条数据
			changePagesTotall(name) {
				this.LastSubmitData.pageIndex = 1;
				this.init('', name);
			},
			JQchangePagesTotall(name){
				this.LastSubmitData.pageIndex = 1;
				this.Jq('', name);
			},
			// 导出数据 按钮
			exportExcel() { //导出
				if(this.tab == 'tab1'){
					this.HttpAjax('post', 'TestingDownloadWwAccountRecordExcel', this.LastSubmitData, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == 200) {
							this.HttpAjax('post', 'downloadWwAccountRecordExcel', qs.stringify(this.LastSubmitData), (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								//二进制流文件下载
								this.downLoadFile(res.data, '分案历史.xlsx');
							}, 'download');
						}
					})
				}else {
					this.HttpAjax('post', 'downloadOverOutsouringExcel', this.LastSubmitData, (res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status == 200) {
							this.HttpAjax('post', 'MywwcaseDownloadOverOutsouringExcel', qs.stringify(this.LastSubmitData), (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								//二进制流文件下载
								this.downLoadFile(res.data, '已结清.xlsx');
							}, 'download');
						}
					})
				}
			},
			// 下载结清证明  合同号:DZ201602170083 用于测试，可以下载
			downLoadJqModel(row) {
				this.HttpAjax('post', 'downLoadJqModel', qs.stringify({contractNo: row.loanContractNo}), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(row.serviceLine == 'XD'){
						this.downLoadFile(res.data,row.loanName + '的结清证明.pdf');
					}else if(row.serviceLine == 'XJ'){
						this.downLoadFile(res.data,row.loanName + '的结清证明.doc');
					}else {
						this.$Notice.error({
								title: '错误',
								desc:'无法确定的内容',
								duration: 0
						});
					}
				},'download');
			},
		},
		mounted() {
			this.init();
		}
	}
</script>

<style lang="less">
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
	}

	// 	.block-tip.ivu-form-item {
	// 		margin-left: -110px;
	// 		.ivu-select.prepend {
	// 			width: 110px;
	// 			text-align: center;
	// 			.ivu-select-selection {
	// 				width: 110px;
	// 				background-color: #FBFBFB;
	// 			}
	// 		}
	// 		.ivu-input-wrapper,
	// 		.ivu-select {
	// 			width: 250px;
	// 			margin-left: -4px;
	// 		}
	// 	}
	// 
	.ivu-icon:hover {
		cursor: pointer;
	}
</style>
