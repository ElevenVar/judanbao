<template>
	<div class="companyManage">
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
					<div class="from-item">
						<Form @submit.native.prevent="addCompanyMethod()" label-position="right" :label-width="110" inline :model="formData">
							<FormItem label="公司名称">
								<Input type="text" v-model="formData.name" placeholder="请输入公司名称！" size="large" :maxlength="60"></Input>
							</FormItem>
							<FormItem label="" style="margin-left: -110px;">
								<Button type="primary" @click.prevent="addCompanyMethod()" :disabled="this.addCompany">查询</Button>
								<Button v-if="this.getAuth('08000010101')" @click="addCompanyMethods" :disabled="this.addCompany">添加新公司</Button>
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
				<Page :total="totallPages" show-total show-sizer placement="top" @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>

		<!--Modal-->
		<Modal v-model="addCompany" draggable :mask-closable="false" :scrollable="true" :loading="loading" :title="edit ? '修改新公司' : '添加新公司'">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline :model="addCompanyModel" :rules="ruleValidate" ref="addCompanyModel">
					<FormItem label="公司名称" prop="name">
						<Input v-model="addCompanyModel.name" type="text" placeholder="请输入公司名称！" :style="width" size="large" :maxlength="50"></Input>
					</FormItem>
					<FormItem label="公司地址" prop="address">
						<Input v-model="addCompanyModel.address" type="text" placeholder="请输入归属地！" :style="width" size="large" :maxlength="50"></Input>
					</FormItem>
					<FormItem label="公司类型" prop="comType">
						<Select :disabled="dbComPanyAbled" v-model="addCompanyModel.comType" placeholder="请选择公司类型！" size="large" :style="width">
							<Option :disabled="true" value="0">担保公司</Option>
							<Option value="1">甲方公司</Option>
							<Option value="2">委外公司</Option>
						</Select>
					</FormItem>
					<FormItem label="归属地" prop="areaName">
						<Select v-model="addCompanyModel.areaName" placeholder="请选择归属地！" size="large" :style="width">
							<Option :key="index" :value="item.idKey" v-for="(item,index) in addressList">{{item.value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="联系人" prop="linkMan">
						<Input v-model="addCompanyModel.linkMan" type="text" placeholder="请输入联系人！" style="width: 142px" size="large" :maxlength="50"></Input>
					</FormItem>
					<FormItem label="联系人电话" prop="telNumber">
						<Input v-model="addCompanyModel.telNumber" type="text" placeholder="请输入联系人电话！" style="width: 142px" size="large" :maxlength="12"></Input>
					</FormItem>
					<FormItem label="邮箱" prop="email">
						<Input v-model="addCompanyModel.email" type="text" placeholder="请输入邮箱！" style="width: 142px" size="large" :maxlength="30"></Input>
					</FormItem>
					<FormItem label="法人" prop="legalPerson">
						<Input v-model="addCompanyModel.legalPerson" type="text" placeholder="请输入法人！" style="width: 142px" size="large" :maxlength="20"></Input>
					</FormItem>
					<!-- 2018-09-26 新增对公账户 -->
					<div class="openForDG">
						<div v-for="(item,index) in addCompanyModel.list" :key="index">
							<FormItem :label="'对公账户账号'+ (index+1) " prop="toPublicNo">
								<Input v-model="item.toPublicNo" type="text" :placeholder="'请输入对公账户账号'+(index+1)+'!'" style="width: 270px" size="large" :maxlength="20"></Input>
								<Button v-if="index == 0" type="primary" size="large" style="margin-left: 20px;margin-right: 0;" @click="addDgAcount">新增</Button>
								<Button v-else type="error" size="large" style="margin-left: 20px;margin-right: 0;"  @click="deleteDgAcount(index)">删除</Button>
							</FormItem>
							<FormItem label="银行名称" prop="bankCode">
								<Select v-model="item.bankCode" placeholder="银行名称！" size="large" style="width: 142px">
									<Option :key="index" :value="item.type" v-for="(item,index) in BankList">{{item.value}}</Option>
								</Select>
							</FormItem>
							<FormItem label="开户行" prop="depositBank">
								<Input v-model="item.depositBank" type="text" placeholder="开户行！" style="width: 142px" size="large" :maxlength="20"></Input>
							</FormItem>
						</div>
					</div>
					<!-- 2018-09-26 新增对公账户  end-->
					
					
					
					<FormItem label="工商注册号" prop="registNo">
						<Input :maxlength="50" v-model="addCompanyModel.registNo" type="text" placeholder="请输入工商注册号！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="所属行业" prop="industry">
						<Input :maxlength="50" v-model="addCompanyModel.industry" type="text" placeholder="请输入所属行业！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="经营范围" prop="managementScope" class="tipsGroup">
						<Input v-model="addCompanyModel.managementScope" type="textarea" :autosize="true" placeholder="请输入经营范围！" :style="width" size="large" :maxlength="200"></Input>
					</FormItem>
					<FormItem label="公司描述" prop="description" class="tipsGroup">
						<Input v-model="addCompanyModel.description" type="textarea" :autosize="true" placeholder="请输入公司描述！" :style="width" size="large" :maxlength="200"></Input>
					</FormItem>
					<FormItem label="签入时间" prop="moveInDate">
						<DatePicker v-model="addCompanyModel.moveInDate" format="yyyy-MM-dd" type="date" placeholder="请选择签入时间！" @on-change='dateChange' :style="width" size="large" placement="top-start" :editable="false"></DatePicker>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="addCompanyMethod1('addCompanyModel')">确定</Button>
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
			const cellPhone = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入手机号码！'));
				} else if(!this.expReg.aa.test(value)) {
					callback(new Error('手机号码格式不正确!'));
				} else {
					callback();
				}
			};
			return {
				title: '公司管理',
				value1: '1',
				rotate: true,
				edit: false,
				loading: true,
				addCompany: false,
				dbComPanyAbled: false,
				loadSpin: false,
				totallPages: 1,
				width: {
					'width': '388px'
				},
				formData: {
					name: '',
					pageIndex: '1',
					pageSize: '10'
				},
				addCompanyModel: {
					name: '',
					address: '',
					comType: '',
					telNumber: '',
					linkMan: '',
					email: '',
					areaName: '',
					legalPerson: '',
					registNo: '',
					industry: '',
					managementScope: '',
					description: '',
					moveInDate: '',
					list:[
						{
							toPublicNo:'',
							bankCode:'',
							depositBank:'',
							companyNo:''
						}
					]
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '公司名称必填！'
					}],
					address: [{
						required: true,
						message: '公司地址必填！'
					}],
					comType: [{
						required: true,
						message: '公司类型必填！'
					}],
					telNumber: [{
						required: true,
						message: '联系人电话必填！'
					}, {
						validator: cellPhone,
						trigger: 'blur'
					}],
					linkMan: [{
						required: true,
						message: '联系人必填！'
					}],
					email: [{
						required: true,
						message: 'email必填！'
					}, {
						type: 'email',
						message: '输入正确的邮箱！',
						trigger: 'blur'
					}],
					areaName: [{
						required: true,
						message: '归属地必填！'
					}],
					legalPerson: [{
						required: false,
						message: '法人必填！'
					}],
					registNo: [{
						required: false,
						message: '工商注册号必填！'
					}],
					industry: [{
						required: false,
						message: '所属行业必填！'
					}],
					managementScope: [{
						required: false,
						message: '经营范围必填！'
					}],
					description: [{
						required: false,
						message: '公司描述必填！'
					}],
					moveInDate: [{
						required: true,
						message: '签入时间必填！'
					}]
				},
				columns: [{
					type: 'index',
					title: '序号',
					width: 90,
					align: 'center',
					fixed: 'left'
				}, {
					title: '公司名称',
					key: 'name',
					minWidth: 120
				}, {
					title: '公司地址',
					key: 'address',
					minWidth: 120
				}, {
					title: '联系人',
					key: 'linkMan',
					minWidth: 120
				}, /* {
					title: '联系人电话',
					key: 'telNumber',
					minWidth: 120
				}, */ {
					title: '状态',
					key: 'status',
					minWidth: 120,
					render: (h, params) => {
						return h('div', {

						}, params.row.status == 1 ? '启用' : '禁用')
					}
				}, {
					title: '创建时间',
					key: 'createDate',
					minWidth: 120
				}, {
					title: '签入时间',
					key: 'moveInDate',
					minWidth: 120
				}, {
					title: '负责人',
					key: 'legalPerson',
					minWidth: 120
				}, {
					title: '操作',
					key: 'number',
					minWidth: 160,
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
									disabled: this.addCompany
								},
								style: {
									display:this.getAuth('08000010102') ? 'inline-block' :'none',
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.editCompany(params);
									}
								}
							}, '修改'),
							h('i-switch', {
								props: {
									size: 'large',
									value: params.row.status == 1 ? true : false,
									disabled: this.addCompany
								},
								style: {
									display:this.getAuth('08000010103') ? 'inline-block' :'none',
								},
								on: {
									'on-change': (bol) => {
										this.companyDel(bol, params);
									}
								}
							}, [
								h('span', {
									slot: 'open'
								}, '启用'),
								h('span', {
									slot: 'close'
								}, '禁用')
							])
						])
					}
				}, ],
				datas: [],
				addressList: [],
				BankList:[]
			}
		},
		components: {

		},
		methods: {
			init() {
				const _ = this;
				_.addCompanyMethod();
			},
			addCompanyMethod(page, pagesize) {
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				_.HttpAjax('post', 'company', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status == '200') {
						_.totallPages = res.data.data.dataCount;
						_.datas = res.data.data.data;
					}
				});
			},
			addCompanyMethod1(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if(valid) {
						let datas = {};
						let newObj = JSON.parse(JSON.stringify(_.addCompanyModel));
						for(let i in  newObj){
							datas[i] = newObj[i];
						};
						let toData = {
							bcmpCompany:datas,
							list:_.addCompanyModel.list
						};
						if(!_.edit) {
							_.HttpAjax('post', 'companyAdd',toData, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false)
								if(res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '添加新公司成功!',
										duration: 2
									});
									_.addCompany = false;
									_.init();
								}
							},'json')
						} else {
							_.HttpAjax('post', 'companyUpdate',toData, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false)
								if(res && res.data.status == '200') {
									_.$Notice.success({
										title: '成功',
										desc: '修改公司成功!',
										duration: 2
									});
									_.addCompany = false;
									_.init();
								}
							},'json');
						}

					}
				});
			},
			addCompanyMethods() {
				this.addCompany = true;
				this.dbComPanyAbled = false;
				this.edit = false;
				this.getINIT();
				this.addCompanyModel.list.splice(1);
				let list = this.addCompanyModel.list[0];
				for(let i in list){
					list[i] = '';
				}
				this.$refs['addCompanyModel'].resetFields();
				this.RepayOpenBankCode();
			},
			changePages(name) {
				this.addCompanyMethod(name);
			},
			changePagesTotall(name) {
				this.formData.pageSize = name;
				this.addCompanyMethod('', name);
			},
			cancel() {
				this.addCompany = false;
			},
			dateChange(val) {
				this.addCompanyModel.moveInDate = val;
			},
			companyDel(bol, row) {
				const _ = this;
				if(bol) {
					_.HttpAjax('post', 'reDisable', {
						companyId: row.row.idKey
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '公司启用成功!',
								duration: 2
							});

						}
						_.init();
					})
				} else {
					_.HttpAjax('post', 'disable', {
						companyId: row.row.idKey
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '公司禁用成功!',
								duration: 2
							});

						}
						_.init();
					})
				}
			},
			editCompany(row) {
				this.addCompany = true;
				this.getINIT();
				this.edit = true;
				this.RepayOpenBankCode();
				for(let i in this.addCompanyModel) {
					this.addCompanyModel[i] = row.row[i];
				}
				if(this.addCompanyModel.comType == '0') {
					this.dbComPanyAbled = true;
				} else {
					this.dbComPanyAbled = false;
				}
				if(this.addCompanyModel.list.length <=0){
					this.addCompanyModel.list.push({
						toPublicNo:'',
						bankCode:'',
						depositBank:'',
						companyNo:''
					});
				}
				this.addCompanyModel.idKey = row.row.idKey;
			},
			getINIT() {
				const _ = this;
				if(_.addressList.length == 0) {
					_.HttpAjax('post', 'distList', {
						label: 'province'
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == '200') {
							_.addressList = res.data.data;
						}
					});
				}

			},
			refresh() { //刷新
				this.addCompanyMethod();
			},//新增对公账户
			addDgAcount(){
				const _=this;
				_.addCompanyModel.list.push({
					toPublicNo:'',
					bankCode:'',
					depositBank:'',
					companyNo:''
				});
			},
			deleteDgAcount(index){
				const _=this;
				_.addCompanyModel.list.splice(index,1)
			},
			//查询银行名称
			RepayOpenBankCode(){
		    	const _=this;
		    	_.HttpAjax('post','distList',{label:'RepayOpenBankCode'},(res)=>{
		    		store.commit('UPDATE_LOADINGSTATE', false);
		    		if(res && res.data.status == 200){
		    			_.BankList = res.data.data;
		    		}
		    	});
		    },
		},
		created() {
			this.init();
		},//页面缓存模式下 停用当前缓存页面执行
		deactivated(){
			//需要关闭的模态框 
			this.addCompany = false;
		}	
	}
</script>

<style scoped lang="less">
	.openForDG{
		border-top:1px solid #dddee1;
		border-bottom:1px solid #dddee1;
		padding-top: 10px;
		margin-bottom: 10px;
	}
</style>
<style lang="less">
	.tipsGroup {
		.ivu-form-item-label {
			height: 80px;
			line-height: 50px;
		}
		textarea.ivu-input {
			height: 80px!important;
		}
	}

	.ivu-icon:hover {
		cursor: pointer;
	}
</style>
