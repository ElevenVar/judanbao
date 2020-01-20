 <template>
	<div class="userManage">
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
						<Form @submit.native.prevent="getUserListData()" label-position="right" :label-width="110" inline v-model="formData">
							<FormItem>
								<Input v-model="info" type="text" placeholder="请输入相关信息" size="large" style="margin-left: -110px;">
								<Select v-model="selected" slot="prepend" style="width: 110px">
									<Option value="1">用户姓名</Option>
									<Option value="2">联系电话</Option>
									<Option value="3">用户账号</Option>
								</Select>
								</Input>
							</FormItem>
							<FormItem label="所属部门">

								<Cascader change-on-select :render-format="format" @on-change="orgChangeList" v-model="orgNos" :data="orgLists" @on-visible-change="getINIT" clearable size="large"></Cascader>
							</FormItem>


							<FormItem label="" style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click="getUserListData()" :disabled="this.addUserModal">查询</Button>
								<Button v-if="this.getAuth('08000010401')" @click="addUserModalOpen" :disabled="this.addUserModal"><Icon type="navicon-round"></Icon> 添加新用户</Button>
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
				<Page :total="totalPageSize" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>

		<!--新增用户弹窗-->
		<Modal class="userManage" v-model="addUserModal" transfer draggable :mask-closable="false" :scrollable="true" :title="edit ? '修改新用户' : '添加新用户'" @on-cancel='cancel'>
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="100" inline :rules="ruleValidate" :model="userFromList" ref="userFromList">
					<FormItem label="是否催收专员" prop="isCollection">
						<RadioGroup v-model="userFromList.isCollection" :style="width" @on-change="getIsColl">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="所属部门" prop="orgNo">
						<Cascader v-model="userFromList.orgNo" @on-change="orgChangeList1" change-on-select :render-format="format" :style="width" :data="orgLists" @on-visible-change="getINIT" clearable size="large"></Cascader>
					</FormItem>
					<FormItem label="所属组长" prop="headManNo">
						<Select :disabled="userFromList.isCollection == '0'" ref="userSelect1" :style="width" size="large" v-model="userFromList.headManNo" placeholder="请选择所属组长！">
							<Option :value="item.idKey" v-for="(item,index) in headManLists" :key="index">{{item.name}}</Option>
						</Select>
					</FormItem>

					<FormItem label="用户姓名" prop="realName">
						<Input v-model="userFromList.realName" type="text" placeholder="请输入用户姓名！" style="width: 137px" size="large"></Input>
					</FormItem>
					<FormItem label="手机号码" prop="phone">
						<Input v-model="userFromList.phone" type="text" placeholder="请输入手机号码！" style="width: 137px" size="large"></Input>
					</FormItem>
					<FormItem label="账号状态" prop="status">
						<Select v-model="userFromList.status" :style="width" size="large" placeholder="请选择账号状态！">
							<Option value="0">离职</Option>
							<Option value="1">在职</Option>
							<Option value="2">小休</Option>
						</Select>
					</FormItem>
					<FormItem label="用户账号" prop="name">
						<Input :disabled="edit" v-model="userFromList.name" type="text" placeholder="请输入用户账户！" :style="width" size="large"></Input>
					</FormItem>
					<!--<FormItem label="用户密码" prop="password">
						<Input v-model="userFromList.password" type="password" placeholder="请输入用户密码！" :style="width" size="large"></Input>
					</FormItem>-->
					<FormItem label="对应角色" prop="roleIds" class="tipsClass">
						<CheckboxGroup :style="width" size="large" placeholder="请选择对应角色！" v-model="userFromList.roleIds">
							<Checkbox :label="item.idKey" v-for="(item,index) in roleList" :key="index"><span>{{item.name}}</span></Checkbox>
						</CheckboxGroup>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="addModalInfomation('userFromList')">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	import md5 from 'js-md5'
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
			// 验证规则
			const password = (rule, value, callback) => {
				if(!this.expReg.pw.test(value)) {
					callback(new Error('密码由8-16英文和数字组成!'));
				} else {
					callback();
				}
			};
			// 验证规则
			const xzzz = (rule, value, callback) => {
				if(this.userFromList.isCollection == '1') {
					if(value == ''){
						callback(new Error('请选择组长!'));
					}else{
						callback();
					}
				} else {
					callback();
				}
			};
			return {
				title: '用户管理',
				value1: '1',
				rotate: true,
				addUserModal: false,
				edit: false,
				totalPageSize: 1,
				width: {
					'width': '388px'
				},
				info: '',
				selected: '1',
				orgNos:[],
				formData: {
					pageIndex: '1',
					pageSize: '10',
					orgNo: '',
					userName: '',
					userPhone: '',
					userNo: ''
				},
				userFromList: {
					isCollection: '1', //是否催收团队
					orgNo: [], //所属部门
					headManNo: '', //组长
					realName: '',
					phone: '',
					status: '1',
					name: '',
					roleIds: []
				},
				ruleValidate: {
					isCollection: [{required: true,message: '是否催收专员必选！'}],
					orgNo: [{required: true,message: '所属部门必填！'}],
					headManNo:[{validator:xzzz,trigger: 'change'}],
					realName: [{required: true,message: '用户姓名必填！'}],
					phone: [{required: true,message: '手机号码必填必填！'}, {validator: cellPhone,trigger: 'blur'}],
					status: [{required: true,message: '账户状态必填！'}],
					name: [{required: true,message: '用户账户必填！'}],
					roleIds: [{required: true,message: '请选择用户角色！'}]
				},
				columns: [{
					title: '用户姓名',
					key: 'realName',
					fixed: 'left',
					minWidth: 120
				}, {
					title: '用户账号',
					key: 'name',
					minWidth: 120
				}, {
					title: '部门',
					key: 'orgName',
					minWidth: 120
				}, {
					title: '最近修改时间',
					key: 'updateDate',
					minWidth: 120
				}, {
					title: '用户状态',
					key: 'status',
					minWidth: 120,
					render: (h, params) => {
						return h('div', {
						}, params.row.status == '0' ? '离职' : params.row.status == '1'?"在职":params.row.status == '2'?"休假":"未知")
					}
				}, {
					title: '操作',
					key: 'number',
					fixed: 'right',
					minWidth: 120,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
                  					disabled:this.addUserModal
								},
								style: {
									display:this.getAuth('08000010402') ? 'inline-block' :'none',
									marginRight: '10px'
								},
								on: {
									click: () => {
										this.editUserMes(params);
									}
								}
							}, '修改'),
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
                  					disabled:this.addUserModal
								},
								style:{
									display:this.getAuth('08000010403') ? 'inline-block' :'none',
								},
								on: {
									click: () => {
										this.deleteUserMes(params);
									}
								}
							}, '删除'),
						])
					}
				}, ],
				datas: [],
				roleList: [],
				orgLists: [],
				headManLists:[],
				editListGet:[],   //修改用户时 查询出组织的所有父机构
			}
		},
		components: {

		},
		methods: {
			init() {
				const _ = this;
				_.getUserListData();
			},
			getUserListData(page, pagesize) {
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				switch(_.selected) {
					case '1':
						_.formData.userName = _.info;
						_.formData.userPhone = '';
						_.formData.userNo = '';
						break;
					case '2':
						_.formData.userName = '';
						_.formData.userPhone = _.info;
						_.formData.userNo = '';
						break;
					case '3':
						_.formData.userName = '';
						_.formData.userPhone = '';
						_.formData.userNo = _.info;
						break;
				}
				_.HttpAjax('post', 'userQuery', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						_.totalPageSize = res.data.data.dataCount;
						_.datas = res.data.data.data;
					}
				});
			},
			addModalInfomation(name){
				const _ = this;
				_.$refs[name].validate((valid) => {
					if(valid) {
						if(_.userFromList.isCollection == '1'){
							if(_.userFromList.headManNo == '' || _.userFromList.headManNo == null){
								_.$layer.msg('请选择所属组长！');
							}else{
								_.addUserMethod(name);
							}
						}else{
							_.addUserMethod(name);
						}
					}
				});
			},
			addUserMethod(name) {
				const _ = this;

				let data = JSON.parse(JSON.stringify(_.userFromList));

				let len = _.userFromList.orgNo.length;
				if(len > 0){
					data.orgNo = _.userFromList.orgNo[len-1];
				}

				if(!_.edit) {
					data.password = md5('123456');
					_.HttpAjax('post', 'addUser', data, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '新增用户成功！',
								duration: 2
							});
							_.init();
							_.addUserModal = false;
						}
					});
				} else {
					_.HttpAjax('post', 'updateUser',data, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '修改用户成功！',
								duration: 2
							});
							_.init();
							_.addUserModal = false;
						}
					});
				}
			},
			getUserListData1(userid) {
				const _ = this;
				let user = userid || '';
				_.HttpAjax('post', 'userManage', {
					userId: user
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status == '200') {
						_.roleList = res.data.data.allRole;

						let roleList = res.data.data.allRole;
						if(roleList.length > 0) {
							for(let i = 0; i < roleList.length; i++) {
								if(roleList[i].selected) {
									_.userFromList.roleIds.push(roleList[i].idKey);
								}
							}
						}

					}
				});
			},
			cancel() {
				const _ = this;
				_.addUserModal = false;
				_.$refs['userFromList'].resetFields();
			},
			changePages(name) {
				this.getUserListData(name);
			},
			changePagesTotall(name) {
				this.formData.pageSize = name;
				this.getUserListData('', name);
			},
			addUserModalOpen() {
				const _ = this;
				_.getUserListData1();
				_.userFromList.headManNo = '';
				_.addUserModal = true;
				_.edit = false;
				_.$refs['userFromList'].resetFields();

				_.userFromList.roleIds = [];
				_.headManLists = [];
				_.abled = true;
			},
			editUserMes(list) {
				const _ = this;
				_.addUserModal = true;
				_.roleList = [];
				_.userFromList.roleIds = [];
				this.userFromList.orgNo = [];
				_.edit = true;
				if(list.row.isCollection == 1){
					_.abled = false;
					_.queryCollectionGroupById(list.row.orgNo);
				}else{
					_.abled = true;
				}

				for(let i in this.userFromList) {
					if(i == 'roleIds') {

					}else if(i== 'orgNo'){
						this.userFromList[i] = [list.row[i]];

						_.getUserOrg();
					}else{
						this.userFromList[i] = list.row[i];
					}
				}
				this.userFromList.idKey = list.row.idKey;

				_.getUserListData1(list.row.idKey);

			},
			deleteUserMes(list) {
				const _ = this;
				_.$Modal.confirm({
					title: '删除用户',
					content: '确定删除 ' + list.row.realName + ' 这个用户吗？',
					onOk: () => {
						_.HttpAjax('post', 'deleteUser', {
							userId: list.row.idKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res && res.data.status == '200') {
								_.$Notice.success({
									title: '成功',
									desc: '删除用户成功！',
									duration: 2
								});
								//_.$layer.msg("删除成功");
								_.init();
							}
						});
					}
				});
			},
			//部门选择框（展开，关闭
			getINIT(bol) {
				const _ = this;
				if(_.orgLists.length == 0) {
					_.HttpAjax('post', 'getUJSelete', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == '200') {
							_.orgLists = _.getTreeDataFormat(res.data.data);
						}
					});
				}

			},
			refresh() { //刷新
				this.getUserListData();
			},
			// 切换是否催收专员
			getIsColl(val){
				this.userFromList.orgNo = []
				if(this.userFromList.isCollection == '1'){
					if(this.userFromList.orgNo  != ''){
						this.queryCollectionGroupById(this.userFromList.orgNo);
					}
				}else{
					this.userFromList.headManNo = '';
				}
			},
			// 查询组长
			queryCollectionGroupById(val){
				const _=this;
				if(val){
					_.HttpAjax('post', 'queryCollectionGroupById', {teamId:val}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false)
						if(res && res.data.status == '200') {
							_.headManLists = res.data.data;
						}else{
							_.headManLists = [];
							this.userFromList.headManNo = '';
						}
					});
				}
			},
			getTreeDataFormat(list){
				const _=this;
				list.forEach(function (r,i) {
			    	list[i].value = r.idKey;
			    	list[i].label = r.groupName;
			      	list[i].children = r.childList;
	              	if(r.children.length>0){
	                	_.getTreeDataFormat(r.childList);
	      			}
		       });
				return list;
			},
			orgChangeList(name){

				let len = name.length;
				if(len > 0){
					this.formData.orgNo = name[len-1];
				}else if(len == 0){
					this.formData.orgNo ='';
				}
			},
			orgChangeList1(name){
				let len = name.length;
				if(len > 0){
					if(this.userFromList.isCollection == '1'){
						this.queryCollectionGroupById(name[len-1]);
					}else{
						this.userFromList.headManNo = '';

					}
				}else if(len == 0){
					this.headManLists = [];
				}
			},
			format(labels, selectedData){
				const index = labels.length - 1;
                const data = selectedData[index] || false;
                if (data && data.code) {
                    return labels[index] + ' - ' + data.code;
                }
                return labels[index];
			},
			getUserOrg(){
				const _=this;
				let val = this.userFromList.orgNo[0];
				_.editListGet = [];
				_.editListGet.unshift(val);

				_.listFormdat(_.orgLists);
				_.editListGet;

				_.userFromList.orgNo = _.editListGet;
			},
			listFormdat(list,pid){
				const _=this;
				list.forEach((r,i)=>{
					if(pid){
						if(r.value == pid){
							if(r.parentId != '0' && r.parentId != null){
								_.editListGet.unshift(r.parentId);
								_.listFormdat(_.orgLists,r.parentId);
							}
						}else{
							if(r.childList.length >0){
								_.listFormdat(r.childList,pid)
							}
						}
					}else{
						if(r.value == this.userFromList.orgNo[0]){
							if(r.parentId != '0' && r.parentId != null){
								_.editListGet.unshift(r.parentId);
								_.listFormdat(_.orgLists,r.parentId);
							}
						}else{
							if(r.childList.length >0){
								_.listFormdat(r.childList)
							}
						}
					}
				});

			}
		},
		created() {
			this.init();
			this.getINIT();
		}
	}
</script>

<style lang="less">
	.from-item .tipsClass .ivu-checkbox-group {
		height: auto
	}

	.ivu-icon:hover {
		cursor: pointer;
	}
	.userManage{
		.ivu-modal .ivu-modal-content{
			width: 540px!important;
		}
	}
</style>
