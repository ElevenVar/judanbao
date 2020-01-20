<template>
	<div class="LetterAudits">
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">信函审核</span>
				<span class="swith head-commom">
					{{rotate ? '收起' : '展开'}}
					<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-items">
						<!--第0个下拉框-->
						<Form label-position="right" inline :model="search_data">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value0" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='change_value_tow != 0 && change_value_three != 0 && change_value_four != 0'>合同编号</Option>
									<Option value="1" v-show='change_value_tow != 1 && change_value_three != 1 && change_value_four != 1'>客户姓名</Option>
									<Option value="2" v-show='change_value_tow != 2 && change_value_three != 2 && change_value_four != 2'>业务类型</Option>
									<Option value="3" v-show='change_value_tow != 3 && change_value_three != 3 && change_value_four != 3'>主体</Option>
									<Option value="4" v-show='change_value_tow != 4 && change_value_three != 4 && change_value_four != 4'>提交人</Option>
								</Select>
								<Input v-show="change_value0 == 0" type="text" placeholder="请输入合同编号" v-model="search_data.loanContractNo" size="large"></Input>
								<Input v-show="change_value0 == 1" type="text" placeholder="请输入客户姓名" v-model="search_data.loanName" size="large"></Input>	
								<Select v-show="change_value0 == 2" class="twoSelect" placeholder="请选择业务类型" v-model="search_data.customerPhone" size="large">
									<Option value="XJ">消金</Option>
									<Option value="XD">信贷</Option>
								</Select>
								<Select v-show="change_value0 == 3" placeholder="请选择主体" v-model="search_data.mainBody" class="twoSelect" size="large">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Input v-show="change_value0 == 4" type="text" placeholder="提交人" v-model="search_data.applyMan" size="large"></Input>
							</FormItem>
						</Form>
						<!--第1个下拉框-->
						<Form label-position="right" inline :model="search_data1">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_tow" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='change_value0 != 0 && change_value_three != 0 && change_value_four != 0'>合同编号</Option>
									<Option value="1" v-show='change_value0 != 1 && change_value_three != 1 && change_value_four != 1'>客户姓名</Option>
									<Option value="2" v-show='change_value0 != 2 && change_value_three != 2 && change_value_four != 2'>业务类型</Option>
									<Option value="3" v-show='change_value0 != 3 && change_value_three != 3 && change_value_four != 3'>主体</Option>
									<Option value="4" v-show='change_value0 != 4 && change_value_three != 4 && change_value_four != 4'>提交人</Option>
								</Select>
								<Input v-show="change_value_tow == 0" type="text" placeholder="请输入合同编号" v-model="search_data1.loanContractNo"size="large"></Input>
								<Input v-show="change_value_tow == 1" type="text" placeholder="请输入客户姓名" v-model="search_data1.loanName" size="large"></Input>
								<Select v-show="change_value_tow == 2" class="twoSelect" placeholder="请选择业务类型" v-model="search_data1.serviceLine" size="large">
									<Option value="XJ">消金</Option>
									<Option value="XD">信贷</Option>
								</Select>
								<Select v-show="change_value_tow == 3" placeholder="请选择主体" v-model="search_data1.mainBody" class="twoSelect" size="large">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Input v-show="change_value_tow == 4" type="text" placeholder="提交人" v-model="search_data1.applyMan" size="large"></Input>
							</FormItem>
						</Form>
						<!--第2个下拉框-->
						<Form label-position="right" inline :model="search_data2">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_three" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='change_value0 != 0 && change_value_tow != 0 && change_value_four != 0'>合同编号</Option>
									<Option value="1" v-show='change_value0 != 1 && change_value_tow != 1 && change_value_four != 1'>客户姓名</Option>
									<Option value="2" v-show='change_value0 != 2 && change_value_tow != 2 && change_value_four != 2'>业务类型</Option>
									<Option value="3" v-show='change_value0 != 3 && change_value_tow != 3 && change_value_four != 3'>主体</Option>
									<Option value="4" v-show='change_value0 != 4 && change_value_tow != 4 && change_value_four != 4'>提交人</Option>
								</Select>
								<Input v-show="change_value_three == 0" type="text" placeholder="请输入合同编号" v-model="search_data2.loanContractNo"
								 size="large"></Input>
								<Input v-show="change_value_three == 1" type="text" placeholder="请输入客户姓名" v-model="search_data2.loanName" size="large"></Input>
								<Select v-show="change_value_three == 2" class="twoSelect" placeholder="请选择业务类型" v-model="search_data2.serviceLine" size="large">
									<Option value="XJ">消金</Option>
									<Option value="XD">信贷</Option>
								</Select>
								<Select v-show="change_value_three == 3" placeholder="请选择主体" v-model="search_data2.mainBody" class="twoSelect" size="large">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Input v-show="change_value_three == 4" type="text" placeholder="提交人" v-model="search_data2.applyMan" size="large"></Input>
							</FormItem>
						</Form>
						<!--第3个下拉框-->
						<Form label-position="right" inline :model="search_data3">
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_four" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='change_value0 != 0 && change_value_tow != 0 && change_value_three != 0'>合同编号</Option>
									<Option value="1" v-show='change_value0 != 1 && change_value_tow != 1 && change_value_three != 1'>客户姓名</Option>
									<Option value="2" v-show='change_value0 != 2 && change_value_tow != 2 && change_value_three != 2'>业务类型</Option>
									<Option value="3" v-show='change_value0 != 3 && change_value_tow != 3 && change_value_three != 3'>主体</Option>
									<Option value="4" v-show='change_value0 != 4 && change_value_tow != 4 && change_value_three != 4'>提交人</Option>
								</Select>
								<Input v-show="change_value_four == 0" type="text" placeholder="请输入合同编号" v-model="search_data3.loanContractNo"
								 size="large"></Input>
								<Input v-show="change_value_four == 1" type="text" placeholder="请输入客户姓名" v-model="search_data3.loanName" size="large"></Input>
								<Select v-show="change_value_four == 2" class="twoSelect" placeholder="请选择业务类型" v-model="search_data3.serviceLine" size="large">
									<Option value="XJ">消金</Option>
									<Option value="XD">信贷</Option>
								</Select>
								<Select v-show="change_value_four == 3" placeholder="请选择主体" v-model="search_data3.mainBody" class="twoSelect" size="large">
									<Option v-for="(item,index) in distLists.mainBody" :value="item.type" :key="index">{{item.value}}</Option>
								</Select>
								<Input v-show="change_value_four == 4" type="text" placeholder="提交人" v-model="search_data3.applyMan" size="large"></Input>
							</FormItem>
						</Form>
						<!-- 按钮 -->
						<Form label-position="right" inline>
							<FormItem>
								<Button type="primary" icon="plus-circled" @click="shaixuan">查询</Button>
								<Button @click="restData">
									<Icon type="navicon-round"></Icon> 重置
								</Button>
								<Button v-if="this.getAuth('05000010305')" @click="show_batch_modal">
									<Icon type="navicon-round"></Icon>批量审核
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
				<Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change="select_change"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePageSize"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--批量审核-->
		<Modal v-model="batch_modal" draggable :loading="loading" footer-hide title="选择审核状态">
			<!-- 公共form表单类 -->
			<div class="from-item" style="height:100px;">
				<div style="text-align:center;margin-top:22px;">
					<Button type="success" size="large" @click="batch_shenhe('batchReview')">通过审核</Button>
					<Button type="error" size="large" @click="batch_shenhe('batchRefuseCheck')">拒绝审核</Button>
				</div>
			</div>
		</Modal>
		<!--Modal 单条审核-->
		<Modal v-model="one_modal" :loading="loading" draggable :title="this.shenhe_type == 5 ? '批量拒绝':'拒绝'">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline>
					<FormItem label="拒绝原因">
						<Input type="textarea" placeholder="请输入拒绝原因" :style="width" size="large"
						 :autosize="{minRows: 5,maxRows: 6}" :maxlength="50" v-model="refresh_info">
						</Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="hiddenModel">取消</Button>
				<Button type="primary" size="large" @click="Submit_refuse_info">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import expandTabs from '../common/public_liucheng'
	export default {
		name: "Letter",
		comment: {
			expandTabs
		},
		data() {
			return {
				loanContractNo:'',
				value1: '1',
				rotate: true,
				width: {
					'width': '340px'
				},
				/*批量审核窗口*/
				batch_modal: false, // 批量审核窗口
				loading: true,
				/*单条审核*/
				one_modal: false,
				shenhe_type: '', //储存状态(选择通过还是拒绝
				refresh_info: '', //拒绝或者通过的理由
				idKey: '', //审核提交的idKey
				totallPages: 0, // 总页数
				datas: [], // 表格展示的数据
				distLists:{ //字典表字段
					mainBody:[], //字典表的主体
				},
				change_value0: '0', // 第一个下拉框的默认值
				change_value_tow: '1', // 第二个下拉框的默认值
				change_value_three: '2', // 第三个下拉框的默认值
				change_value_four: '3', //第四个下拉框的默认值
				/*筛选字段*/
				search_data: {
					loanContractNo: '', //合同编号
					loanName: '', //客户姓名
					serviceLine: '', // 业务类型
					mainBody: '', // 主体
					applyMan: '', //提交人
				},
				search_data1: {
					loanContractNo: '', //合同编号
					loanName: '', //客户姓名
					serviceLine: '', // 业务类型
					mainBody: '', // 主体
					applyMan: '', //提交人
				},
				search_data2: {
					loanContractNo: '', //合同编号
					loanName: '', //客户姓名
					serviceLine: '', // 业务类型
					mainBody: '', // 主体
					applyMan: '', //提交人
				},
				search_data3: {
					loanContractNo: '', //合同编号
					loanName: '', //客户姓名
					serviceLine: '', // 业务类型
					mainBody: '', // 主体
					applyMan: '', //提交人
				},
				LastSubmitData: {
					pageIndex: '1',
					pageSize: '10',
				},
				// 表格展示数据
				columns: [{
						type: 'selection',
						minWidth: 60,
					},
					{
						title: '查看审核流程',
						minWidth: 110,
						type: 'expand',
						render: (h, params) => {
							if(this.getAuth('05000010304')){
								return h(expandTabs, {
									props: {
										row: params.row,
										url: 'processQuery',
									}
								})
							}
						}
					},
					{title: '合同编号',minWidth: 160,key: 'loanContractNo'},
					{title: '客户姓名',minWidth: 120,key: 'loanName'},
					{title: '业务类型',minWidth: 160,key: 'serviceLine',
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
					{title: '主体',minWidth: 120,key: 'mainBody'},
					{title: '逾期等级',minWidth: 120,key: 'overdueGrade'},
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
					{title: '提交时间',minWidth: 120,key: 'operatTime'},
					{title: '提交人',minWidth: 120,key: 'applyMan'},
					{title: '操作',minWidth: 240,key: 'number',fixed: 'right',
						render: (h, params) => {
								return h('div', [
									h('Button', {
										props: {
											size: 'small',
											type: 'info',
											disabled: this.batch_modal || this.one_modal
										},
										style: {
											display:this.getAuth('05000010301') ? 'inline-block' :'none',
											marginRight: '5px'
										},
										on: {
											click: () => {
												this.adopt(params.row)
											}
										}
									}, '通过'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.batch_modal || this.one_modal
									},
									style: {
										display:this.getAuth('05000010302') ? 'inline-block' :'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.shenhe_type = 6;
											this.idKey = params.row.idKey;
											this.one_modal = true;
										}
									}
								}, '拒绝'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.batch_modal
									},
									style: {
										display:this.getAuth('05000010303') ? 'inline-block' :'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.setStore('opreateBtn', {
												hiddenBtn: 'private',
												showBtn: 'private',
												allINFO: params.row
											})
											this.$router.push('finishDetail')
										}
									}
								}, '详情'),
							])
						}
					},
				],
				shenhe_batch_info: [], // 批量审核 提交的数据
			}
		},
		methods: {
			// 默认查询数据
			init(pageIndex, pageSize) {
				this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
				this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
				this.HttpAjax('post', 'letterReviewList', this.LastSubmitData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.status === 200) {
						this.datas = res.data.data.data;
						this.totallPages = res.data.data.dataCount;
					}
				});
			},
			// 选中行发生变化
			select_change(selection) {
				this.shenhe_batch_info = [];
				for (let i = 0; i < selection.length; i++) {
					this.shenhe_batch_info.push({
						idKey: selection[i].idKey,
						reviewRemark: '',
					})
				}
			},
			//批量审核按钮点击事件
			show_batch_modal() {
				if (this.shenhe_batch_info.length === 0) {
					this.$Notice.error({
						title: '错误',
						desc: '请选择要批量审核的数据',
						duration: 0
					})
				} else {
					this.batch_modal = true;
					this.refresh_info = ''; // 输入的备注
				}
			},
			//取消按钮点击事件
			hiddenModel() {
				this.one_modal = false;
				this.shenhe_type = '';
				this.refresh_info = '';
				this.idKey = ''
			},
			// 单条通过
			adopt(row){
				this.HttpAjax('post', 'singleReview', {idKey: row.idKey,reviewRemark: '',loanContractNo:row.loanContractNo}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status === 200) {
						if (res.data.data.status === 1001) {
							this.$Notice.error({ // 通过失败
								title: res.data.data.data,
								desc: res.data.data.message,
								duration: 0
							})
						} else if (res.data.data.status === 200) {
							this.$Notice.success({ // 通过成功
								title: res.data.data.data,
								desc: res.data.data.message,
								duration: 2
							})
						}
						this.init();
					}
				})
			},
			// 提交按钮点击事件
			Submit_refuse_info() {
				if(this.shenhe_type == 6){//单条拒绝
					this.HttpAjax('post', 'refuseCheck', {
						idKey: this.idKey,
						reviewRemark: this.refresh_info,
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.data.status === 200) {
							if (res.data.data.status === 1001) {
								this.$Notice.error({ // 拒绝失败
									title: res.data.data.data,
									desc: res.data.data.message,
									duration: 0
								})
							} else if (res.data.data.status === 200) {
								this.$Notice.success({ // 拒绝成功
									title: res.data.data.data,
									desc: res.data.data.message,
									duration: 2
								})
							}
							this.clear_up();
							this.init();
						}
					})
				}else if (this.shenhe_type == 5){//批量拒绝
					for(let i in this.shenhe_batch_info){
						this.shenhe_batch_info[i].reviewRemark = this.refresh_info
					}
					this.HttpAjax('post', 'batchRefuseCheck', JSON.stringify(this.shenhe_batch_info), (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if (res && res.status === 200) {
								this.$Notice.success({
									title: '成功',
									desc: '审核拒绝成功',
									duration: 2
								})
							this.init();
							this.clear_up();
							this.shenhe_batch_info = []; // 提交的审核信息
							this.batch_modal = false; // 审核信息填写窗口
						}
					}, 'json')
				};
			},
			// 批量审核 (通过
			batch_shenhe(url) {
				if(url == 'batchReview'){ //批量通过
					this.HttpAjax('post', url, JSON.stringify(this.shenhe_batch_info), (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
	
						if (res && res.status === 200) {
							if (res.data.status === 200 && url === 'batchReview') { // 通过
								this.$Notice.success({
									title: '成功',
									desc: '审核通过成功',
									duration: 2
								})
							}
							this.init();
							this.shenhe_batch_info = []; // 提交的审核idKey
							this.batch_modal = false; // 审核信息填写窗口
						}
					}, 'json')
				}else { // 批量拒绝
					this.batch_modal = false
					this.one_modal = true
					this.shenhe_type = 5;
				}
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
			// 查询
			shaixuan() {
				this.ClearObject(this.LastSubmitData)
				for(let i in this.search_data){
					if(this.search_data[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data[i])
					}
				}
				for(let i in this.search_data1){
					if(this.search_data1[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data1[i])
					}
				}
				for(let i in this.search_data2){
					if(this.search_data2[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data2[i])
					}
				}
				for(let i in this.search_data3){
					if(this.search_data3[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data3[i])
					}
				}
				this.init()
			},
			// 第0个下拉选择项变化时
			selectChange(val,index) {
				if(index == 0){
					this.change_value0 = val
				}else {
					this['change_value'+index] = val
				}
			},
			//第0下拉框展开
			ClearVal(val,index) {
				if (val) {
					if(index == 0){
						this.ClearObject(this.search_data)
					}else {
						this.ClearObject(this['search_data'+index])
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
				this.ClearObject(this.search_data)
				this.ClearObject(this.search_data1)
				this.ClearObject(this.search_data2)
				this.ClearObject(this.search_data3)
				this.ClearObject(this.LastSubmitData)
				this.init();
			},
			// 清空一些数据
			clear_up() {
				this.one_modal = false; // 输入备注的弹窗
				this.shenhe_type = ''; // 审核的状态(5；通过 6：拒绝)
				this.refresh_info = ''; // 输入的备注
				this.idKey = ''; // 审核哪条数据
			},
			// 字典表查询
			distList(label) {
				this.HttpAjax('post', 'distList', {
					label: label
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status === 200) {
						switch(label) {
							case 'mainBody':
								this.distLists.mainBody = res.data.data;
								break;
						}
					}
				})
			},
		},
		created() {
			this.init();
			this.distList('mainBody'); //查询主体
		},
	}
</script>

<style lang="less">
	.LetterAudits {

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
