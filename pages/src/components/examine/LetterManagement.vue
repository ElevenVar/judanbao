<template>
	<div class="LetterManagement">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">信函管理</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!--第0个下拉框-->
						<Form label-position="right" inline :model='formData'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex" @on-change="selectChange($event,'0')" @on-open-change='ClearVal($event,"0")'>
									<Option value="0" v-show='formIndex1 != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex1 != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex1 != 2 && formIndex2 != 2 && formIndex3 != 2'>业务类型</Option>
									<Option value="3" v-show='formIndex1 != 3 && formIndex2 != 3 && formIndex3 != 3'>主体</Option>
									<Option value="4" v-show='formIndex1 != 4 && formIndex2 != 4 && formIndex3 != 4'>逾期等级</Option>
									<Option value="5" v-show='formIndex1 != 5 && formIndex2 != 5 && formIndex3 != 5'>审核状态</Option>
									<Option value="6" v-show='formIndex1 != 6 && formIndex2 != 6 && formIndex3 != 6'>提交时间</Option>
								</Select>
								<Input v-if="formIndex == 0" type="text" placeholder="请输入合同编号" v-model="formData.loanContractNo" size="large"></Input>
								<Input v-if="formIndex == 1" type="text" placeholder="请输入客户姓名" v-model="formData.loanName" size="large"></Input>
								<Select v-if="formIndex == 2" class="twoSelect" @on-open-change="getListDict($event,'ServiceLine')"  placeholder="请选择业务类型" v-model="formData.serviceLine" size="large">
									<Option v-for="(item,index) in this.distList.ServiceLine" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 3" class="twoSelect" @on-open-change="getListDict($event,'MainBody')"  placeholder="请选择主体" v-model="formData.mainBody" size="large">
									<Option v-for="(item,index) in this.distList.MainBody" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 4" class="twoSelect" @on-open-change="getListDict($event,'OverdueGrade')"  placeholder="请选择逾期等级" v-model="formData.overdueGrade" size="large">
									<Option v-for="(item,index) in this.distList.OverdueGrade" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex == 5" class="twoSelect" placeholder="请选择审核状态" v-model="formData.status" size="large">
									<Option v-for="(item,index) in this.distList.Status" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex == 6" type="datetimerange" placement="bottom-end" placeholder="请选择提交时间" size="large"
									format="yyyy-MM-dd HH:mm:ss" @on-change='operatTime($event,"0")' v-model='formData.operatTimeS'
									></DatePicker>
							</FormItem>
						</Form>
						<!--第1个下拉框-->
						<Form label-position="right" inline :model='formData1'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex1" @on-change="selectChange($event,'1')" @on-open-change='ClearVal($event,"1")'>
									<Option value="0" v-show='formIndex != 0 && formIndex2 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex2 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex2 != 2 && formIndex3 != 2'>业务类型</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex2 != 3 && formIndex3 != 3'>主体</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex2 != 4 && formIndex3 != 4'>逾期等级</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex2 != 5 && formIndex3 != 5'>审核状态</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex2 != 6 && formIndex3 != 6'>提交时间</Option>
								</Select>
								<Input v-if="formIndex1 == 0" type="text" placeholder="请输入合同编号" v-model="formData1.loanContractNo" size="large"></Input>
								<Input v-if="formIndex1 == 1" type="text" placeholder="请输入客户姓名" v-model="formData1.loanName" size="large"></Input>
								<Select v-if="formIndex1 == 2" class="twoSelect" @on-open-change="getListDict($event,'ServiceLine')"  placeholder="请选择业务类型" v-model="formData1.serviceLine" size="large">
									<Option v-for="(item,index) in this.distList.ServiceLine" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 == 3" class="twoSelect" @on-open-change="getListDict($event,'MainBody')"  placeholder="请选择主体" v-model="formData1.mainBody" size="large">
									<Option v-for="(item,index) in this.distList.MainBody" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 == 4" class="twoSelect" @on-open-change="getListDict($event,'OverdueGrade')"  placeholder="请选择逾期等级" v-model="formData1.overdueGrade" size="large">
									<Option v-for="(item,index) in this.distList.OverdueGrade" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex1 == 5" class="twoSelect" placeholder="请选择审核状态" v-model="formData1.status" size="large">
									<Option v-for="(item,index) in this.distList.Status" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex1 == 6" type="datetimerange" placement="bottom-end" placeholder="请选择提交时间" size="large"
									format="yyyy-MM-dd HH:mm:ss" @on-change='operatTime($event,"1")' v-model='formData1.operatTimeS'
									></DatePicker>
							</FormItem>
						</Form>
						<!--第2个下拉框-->
						<Form label-position="right" inline :model='formData2'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex2" @on-change="selectChange($event,'2')" @on-open-change='ClearVal($event,"2")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex3 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex3 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex3 != 2'>业务类型</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex3 != 3'>主体</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex3 != 4'>逾期等级</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex3 != 5'>审核状态</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex3 != 6'>提交时间</Option>
								</Select>
								<Input v-if="formIndex2 == 0" type="text" placeholder="请输入合同编号" v-model="formData2.loanContractNo" size="large"></Input>
								<Input v-if="formIndex2 == 1" type="text" placeholder="请输入客户姓名" v-model="formData2.loanName" size="large"></Input>
								<Select v-if="formIndex2 == 2" class="twoSelect" @on-open-change="getListDict($event,'ServiceLine')"  placeholder="请选择业务类型" v-model="formData2.serviceLine" size="large">
									<Option v-for="(item,index) in this.distList.ServiceLine" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex2 == 3" class="twoSelect" @on-open-change="getListDict($event,'MainBody')"  placeholder="请选择主体" v-model="formData2.mainBody" size="large">
									<Option v-for="(item,index) in this.distList.MainBody" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex2 == 4" class="twoSelect" @on-open-change="getListDict($event,'OverdueGrade')"  placeholder="请选择逾期等级" v-model="formData2.overdueGrade" size="large">
									<Option v-for="(item,index) in this.distList.OverdueGrade" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex2 == 5" class="twoSelect" placeholder="请选择审核状态" v-model="formData2.status" size="large">
									<Option v-for="(item,index) in this.distList.Status" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex2 == 6" type="datetimerange" placement="bottom-end" placeholder="请选择提交时间" size="large"
									format="yyyy-MM-dd HH:mm:ss" @on-change='operatTime($event,"2")' v-model='formData2.operatTimeS'
									></DatePicker>
							</FormItem>
						</Form>
						<!--第3个下拉框-->
						<Form label-position="right" inline :model='formData3'>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="formIndex3" @on-change="selectChange($event,'3')" @on-open-change='ClearVal($event,"3")'>
									<Option value="0" v-show='formIndex != 0 && formIndex1 != 0 && formIndex2 != 0'>合同编号</Option>
									<Option value="1" v-show='formIndex != 1 && formIndex1 != 1 && formIndex2 != 1'>客户姓名</Option>
									<Option value="2" v-show='formIndex != 2 && formIndex1 != 2 && formIndex2 != 2'>业务类型</Option>
									<Option value="3" v-show='formIndex != 3 && formIndex1 != 3 && formIndex2 != 3'>主体</Option>
									<Option value="4" v-show='formIndex != 4 && formIndex1 != 4 && formIndex2 != 4'>逾期等级</Option>
									<Option value="5" v-show='formIndex != 5 && formIndex1 != 5 && formIndex2 != 5'>审核状态</Option>
									<Option value="6" v-show='formIndex != 6 && formIndex1 != 6 && formIndex2 != 6'>提交时间</Option>
								</Select>
								<Input v-if="formIndex3 == 0" type="text" placeholder="请输入合同编号" v-model="formData3.loanContractNo" size="large"></Input>
								<Input v-if="formIndex3 == 1" type="text" placeholder="请输入客户姓名" v-model="formData3.loanName" size="large"></Input>
								<Select v-if="formIndex3 == 2" class="twoSelect" @on-open-change="getListDict($event,'ServiceLine')"  placeholder="请选择业务类型" v-model="formData3.serviceLine" size="large">
									<Option v-for="(item,index) in this.distList.ServiceLine" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex3 == 3" class="twoSelect" @on-open-change="getListDict($event,'MainBody')"  placeholder="请选择主体" v-model="formData3.mainBody" size="large">
									<Option v-for="(item,index) in this.distList.MainBody" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex3 == 4" class="twoSelect" @on-open-change="getListDict($event,'OverdueGrade')"  placeholder="请选择逾期等级" v-model="formData3.overdueGrade" size="large">
									<Option v-for="(item,index) in this.distList.OverdueGrade" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<Select v-if="formIndex3 == 5" class="twoSelect" placeholder="请选择审核状态" v-model="formData3.status" size="large">
									<Option v-for="(item,index) in this.distList.Status" :key="index" :value="item.type">{{item.value}}</Option>
								</Select>
								<DatePicker v-if="formIndex3 == 6" type="datetimerange" placement="bottom-end" placeholder="请选择提交时间" size="large"
									format="yyyy-MM-dd HH:mm:ss" @on-change='operatTime($event,"3")' v-model='formData3.operatTimeS'
									></DatePicker>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="shaixuan" :disabled="batch_import">查询</Button>
								<Button @click="restData" :disabled="batch_import">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('12000010101')" @click="Batch_Button" :disabled="batch_import">
									<Icon type="navicon-round"></Icon>批量申请
								</Button>
								<Button :disabled="batch_import" @click='BatchDownload'><Icon type="navicon-round"></Icon>批量下载</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-select = 'SelectMe'></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePageSize"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!-- 批量申请 -->
		<Modal v-model="batch_import" draggable :loading="loading" :mask-closable="false">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="附件">
						<input @change="getUploadExcel" ref="uploadFile" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
						 multiple />
					</FormItem><br />
					<!--<Button @click="down_Template" type="primary"><Icon type="navicon-round"></Icon>下载模板</Button>-->
					<span style="color:blue;cursor:pointer;" @click="down_Template">下载批量信函模板.xlsx</span>
				</Form>
			</div>
			<div slot="footer">
				<Button type="error" size="large" @click="batch_import = false">取消</Button>
				<Button type="primary" size="large" @click="Submit_info">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	import expandTabs from '../common/operationlId'
	export default {
		name: "Letter",
		component: {
			expandTabs
		},
		data() {
			return {
				value1: '1',
				rotate: true,
				/*批量导入*/
				batch_import: false, //批量导入弹窗
				importFile: {}, //选择的文件
				loading: true,
				totallPages: 0, // 总页数
				datas: [],
				formIndex: '0', // 第一个下拉框的默认值
				formIndex1: '1', // 第二个下拉框的默认值
				formIndex2: '2', // 第三个下拉框的默认值
				formIndex3: '3', //第四个下拉框的默认值
				/*筛选字段*/
				formData: {
					loanContractNo: '', //合同编号
					loanName: '', 	//客户姓名
					serviceLine:'', //业务线
					mainBody:'',	//主体
					status:'',		//审核状态
					overdueGrade:'',//逾期等级
					operatTimeS: '', // 提交时间
				},
				formData1: {
					loanContractNo: '', //合同编号
					loanName: '', 	//客户姓名
					serviceLine:'', //业务线
					mainBody:'',	//主体
					status:'',		//审核状态
					overdueGrade:'',//逾期等级
					operatTimeS: '', // 提交时间
				},
				formData2: {
					loanContractNo: '', //合同编号
					loanName: '', 	//客户姓名
					serviceLine:'', //业务线
					mainBody:'',	//主体
					status:'',		//审核状态
					overdueGrade:'',//逾期等级
					operatTimeS: '', // 提交时间
				},
				formData3: {
					loanContractNo: '', //合同编号
					loanName: '', 	//客户姓名
					serviceLine:'', //业务线
					mainBody:'',	//主体
					status:'',		//审核状态
					overdueGrade:'',//逾期等级
					operatTimeS: '', // 提交时间
				},
				LastSubmitData:{
					pageIndex: '1',
					pageSize: '10',
				},
				distList: {
					OverdueGrade: [],
					MainBody:[], //主体
					ServiceLine:[],
					Status:[
						{value:'待审核',type:'1'},
						{value:'审核中',type:'2'},
						{value:'审核拒绝',type:'3'},
						{value:'审核通过',type:'4'},
					]
				},
				// 表格展示数据
				columns: [
					{
						type: 'selection',
						minWidth: 60,
					},
					{
						title: '查看审核流程',
						minWidth: 110,
						type: 'expand',
						render: (h, params) => {
							return h(expandTabs, {
								props: {
									row: params.row,
									url: 'processQuery',
								}
							})
						}
					},
					{
						title: '合同编号',
						minWidth: 160,
						key: 'loanContractNo',
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'loanName',
					},
					{
						title: '业务类型',
						minWidth: 100,
						key: 'serviceLine',
						render: (h, params) => {
							if (params.row.serviceLine === 'XJ') {
								return h('div', [
									h('span', {}, '消金')
								])
							} else if (params.row.serviceLine === 'XD') {
								return h('div', [
									h('span', {}, '信贷')
								])
							}
						}
					},
					{
						title: '主体',
						minWidth: 80,
						key: 'mainBody',
					},
					{
						title: '逾期等级',
						minWidth: 100,
						key: 'overdueGrade',
					},
					{
						title: '审核状态',
						minWidth: 120,
						key: 'status',
						render: (h, params) => {
							if (params.row.status === '1') {
								return h('div', [
									h('span', {}, '待审核'),
								])
							} else if (params.row.status === '2') {
								return h('div', [
									h('span', {}, '审核中'),
								])
							} else if (params.row.status === '3') {
								return h('div', [
									h('span', {}, '审核拒绝'),
								])
							} else if (params.row.status === '4') {
								return h('div', [
									h('span', {}, '审核通过'),
								])
							}
						}
					},
					{
						title: '备注',
						minWidth: 160,
						key: 'reviewRemark',
					},
					{
						title: '提交时间',
						minWidth: 160,
						key: 'operatTime',
					},
					{
						title: '审核时间',
						minWidth: 160,
						key: 'auditTime'
					},
					{
						title: '操作',
						minWidth: 100,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: params.row.status !== '4' || this.batch_import
									},
									style: {
										display:this.getAuth('12000010102') ? 'inline-block' :'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.singleDownLoadPDF(params.row)
										}
									}
								}, '下载'),
							])
						}
					},
				],
				// --------------- 批量下载
				SelectData: [], //
			}
		},
		methods: {
			// 默认查询数据
			init(pageIndex, pageSize) {
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.HttpAjax('post', 'letterManagementList', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						this.datas = res.data.data.data;
						this.totallPages = res.data.data.dataCount; 
						for(let i in res.data.data.data){
							if(res.data.data.data[i].reviewRemark=="导入数据"){
								res.data.data.data[i]._disableExpand = true
							}
						}
					}
				});
			},
			// 信函管理下载
			singleDownLoadPDF(row) {
				this.HttpAjax('post', 'singleDownLoadPDF', qs.stringify({
					idKey: row.idKey
				}), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, row.loanName + '的信函管理.pdf');
				}, 'download')
			},
			//翻页-->第几页
			changePages(pageIndex) {
				this.init(pageIndex);
			},
			//每一页显示多少条数据
			changePageSize(pageSize) {
				this.LastSubmitData.pageSize = pageSize;
				this.init('', pageSize);
			},
			//刷新
			refresh() {
				this.init();
			},
			// 筛选按钮点击事件
			shaixuan() {
				this.ClearObject(this.LastSubmitData)
				for(let i in this.formData){
					if(this.formData[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData[i])
					}
				}
				for(let i in this.formData1){
					if(this.formData1[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData1[i])
					}
				}
				for(let i in this.formData2){
					if(this.formData2[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData2[i])
					}
				}
				for(let i in this.formData3){
					if(this.formData3[i] != ''){
						this.$set(this.LastSubmitData, i , this.formData3[i])
					}
				}
				this.init()
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
				this.init();
			},
			// 下载模板按钮点击事件
			down_Template() {
				this.HttpAjax('post', 'letterManagementExport', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					this.downLoadFile(res.data, '信函审核模板');
				}, 'download')
			},
			// 批量申请按钮点击事件
			Batch_Button() {
				this.batch_import = true;
				this.importFile = {};
				this.$refs['uploadFile'].value = '';
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
			// 提交按钮（上传选择的文件
			Submit_info() {
				this.HttpAjax('post', 'batchBeginCheck', this.importFile, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						if (res && res.data.status === 200) {
							this.$Notice.success({
								title: '成功',
								desc: '操作成功',
								duration: 2
							})
						}
						this.init();
						this.batch_import = false;
					}
				}, 'file')
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
									case 'ServiceLine': //业务类型
										_.distList.ServiceLine = res.data.data;
										break;
									case 'MainBody':	//主体
									   _.distList.MainBody = res.data.data;
									   break;
								}
							}
						});
					}
				}
			},
			// 提交时间转换
			operatTime(val,index){
				if(index == 0){
					this.formData.operatTimeS = val
				}else {
					this['formData'+index].operatTimeS = val
				}
			},
			//选中某一行
			SelectMe(val){
				this.SelectData = [];
				this.SelectData = val
			},
			// 批量下载 
			BatchDownload(){
				if(this.SelectData.length == 0){
					this.$Notice.error({
	            title: '错误',
	            desc:'请选择需要下载的数据',
	            duration: 0
	        })
				}else {
					let idkeys = [];
					for(let i in  this.SelectData){
					   idkeys.push(
							 this.SelectData[i].idKey
						 )
					}
					this.HttpAjax('post','batchDownloadLetterFile',qs.stringify({
						 idKeys:JSON.stringify(idkeys)
					}) ,(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						this.downLoadFile(res.data, '信函文件.zip');
					},'download')
				}
				
			},
		},
		created() {
			this.init();
		},
	}
</script>

<style lang="less">
	.LetterManagement {

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
