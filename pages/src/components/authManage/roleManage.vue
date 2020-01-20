<template>
	<div class="roleManage">
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
						<Form @submit.native.prevent="getRoleListDate()" label-position="right" :label-width="110" inline :model="formData">
							<FormItem label="角色名称">
								<Input :maxlength="20" v-model="formData.roleName" type="text" placeholder="请输入角色名称！" size="large"></Input>
							</FormItem>
							<FormItem label="角色状态">
								<Select v-model="formData.roleStatus" placeholder="请选择角色状态！" size="large">
									<Option value="0">启用</Option>
									<Option value="1">禁用</Option>
								</Select>
							</FormItem>
							<FormItem label="" style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click="getRoleListDate()" :disabled="disabled">查询</Button>
								<Button v-if="this.getAuth('08000010301')"  @click="addRoleModalMethod" :disabled="disabled"><Icon type="navicon-round"></Icon> 添加新角色</Button>
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
				<Page :total="totalSize" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>

		<!--Modal-->
		<Modal v-model="addRole" draggable :mask-closable="false" :title="edit ? '修改新角色' : '添加新角色'" :loading="true"  @on-cancel="cancel">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="80" inline :model="addRoleModel" :rules="ruleValidate" ref="addRoleModel">
					<FormItem label="角色名称" prop="name">
						<Input :maxlength="20" v-model="addRoleModel.name" type="text" placeholder="请输入角色名称！" :style="width" size="large"></Input>
					</FormItem>
					<FormItem label="角色状态" prop="isDelete">
						<Select v-model="addRoleModel.isDelete" :style="width" size="large">
							<Option value="0">启用</Option>
							<Option value="1">禁用</Option>
						</Select>
					</FormItem>
					<!-- 权限树tree-item全局样式 -->
					<div class="tree-item">
						<div class="header-tree">角色授权</div>
						<span v-if="!authNodeData" style="text-align:center;line-height: 22px;">暂无数据！</span>
						<div class="formGroupItem" v-for="(item,index) in authNodeData">
							<div class="checkTitle">
								<Checkbox @on-change="parentCheck($event,item)" :value="item.selected">{{item.name}}</Checkbox>
							</div>
							<div class="groupIndex">
								<span v-for="(item1,index1) in item.childnume">
							        <Checkbox @on-change="childCheckbox($event,item,item1)" :value="item1.selected">{{item1.name}}</Checkbox>
							        <span v-if="item1.fuction.length >0">
							        	( &nbsp;&nbsp;<span v-for="(item2,index2) in item1.fuction" style="color: red;">
							        		<Checkbox @on-change="childrenCheck($event,item1,item2,item)" :value="item2.selected">{{item2.name}}</Checkbox>
							        	</span> )</br>
								</span>
								</span>
							</div>
						</div>
					</div>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="addRoleMethodEvent('addRoleModel')">确定</Button>
			</div>
		</Modal>
		
		<!-- 数据权限配置 -->
		<Modal v-model="dataConfig" draggable :mask-closable="false" title="数据权限配置"  @on-cancel="cancel">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<h3 style="padding-bottom:6px">{{roleName}}</h3>
				<div class="groupWarp"v-for="(item,index) in groupListArr" :key="index" >
					<div class="groupTips"><span>{{item.menuName}}</span></div>
					<div class="groupCheck">
						<Checkbox 
							v-if="items.menuId == item.menuId"
							 v-for="(items,index) in groupListArrCheck"
							  :key="index" :value="items.status == 'Y' ? true : false"
							  @on-change="dataConfigCheck($event,items)">
							{{items.authName}}
						</Checkbox>
					</div>
				</div>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="operateDataAuth()">确定</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'

	export default {
		data() {
			return {
				title: '角色管理',
				value1: '1',
				rotate: true,
				addRole: false,
				dataConfig:false,
				edit: false,
				disabled:false,
				width: {
					'width': '388px'
				},
				authNodeData: [],
				formData: {
					pageIndex: '1',
					pageSize: '10',
					roleName: '',
					roleStatus: ''
				},
				addRoleModel: {
					name: '',
					isDelete: '0',
				},
				dataConfigData:{
					dateconf:[]
				},
				totalSize: 0,
				columns: [{
					title: '角色名称',
					key: 'name',
				}, {
					title: '状态',
					key: 'isDelete',
					render: (h, params) => {
						return h('span', {

						}, params.row.isDelete == '0' ? '启用' : '禁用')
					}
				}, {
					title: '创建时间',
					key: 'createDate',
				}, {
					title: '创建人',
					key: 'createUser',
				}, {
					title: '角色状态',
					key: 'isDelete',
					render: (h, params) => {
						return h('div', {

						}, params.row.isDelete == '0' ? '启用' : '禁用')
					}
				}, {
					title: '操作',
					key: 'number',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
									disabled: this.disabled
								},
								style: {
									display:this.getAuth('08000010302') ? 'inline-block' : 'none',
									marginRight: '10px'
								},
								on: {
									click: () => {
										this.editRoleAuthTree(params);
									}
								}
							}, '修改'),
							h('Button', {
								props: {
									size: 'small',
									type: 'info',
									disabled: this.disabled
								},
								style: {
									display:this.getAuth('08000010304') ? 'inline-block' : 'none',
									marginRight: '10px'
								},
								on: {
									click: () => {
										this.dateAnthoiConfig(params);
									}
								}
							}, '数据权限配置'),
							h('i-switch', {
								props: {
									size: 'large',
									value: params.row.isDelete == '0' ? true : false,
									disabled: this.disabled
								},
								style:{
									display:this.getAuth('08000010303') ? 'inline-block' : 'none',
								},
								on: {
									'on-change': (bol) => {
										this.roleSwitchChange(bol, params);
									}
								}
							}, [
								h('span', {
									slot: 'open'
								}, '启用'),
								h('span', {
									slot: 'close'
								}, '禁用')
							]),
						])
					}
				}, ],
				datas: [],
				ruleValidate: {
					name: [{
						required: true,
						message: '角色名称必填！'
					}],
					isDelete: [{
						required: true,
						message: '角色状态必选！'
					}]
				},
				roleName:'',
				groupListArr:[],
				groupListArrCheck:[],
				roleId:''
			}
		},
		components: {

		},
		methods: {
			init() {
				const _ = this;
				_.getRoleListDate();
			},
			addRoleMethod() {
				const _ = this;
			}, //查询角色列表
			getRoleListDate(page, pagesize) {
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				_.HttpAjax('post', 'roleQuery', _.formData, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status == '200') {
						_.totalSize = res.data.data.dataCount;
						_.datas = res.data.data.data;
					}
				});
			},
			changePages(page) {
				this.getRoleListDate(page);
			},
			changePagesTotall(page) {
				this.formData.pageSize = page;
				this.getRoleListDate('', page);
			},
			cancel() {
				this.addRole = false;
				this.dataConfig = false;
				this.disabled = false;
			}, //弹出新增角色对话框
			addRoleModalMethod() {
				this.disabled = true;
				this.addRole = true;
				this.edit = false;
				this.$refs['addRoleModel'].resetFields();
				/*查询权限*/
				this.getQueryRoleMF();
			}, //查询角色权限
			getQueryRoleMF(roleId) {
				const _ = this;
				let roleid = roleId || '';
				_.HttpAjax('post', 'queryJur', {
					roleId: roleid
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == '200') {
						_.authNodeData = res.data.data;
					}
				});
			}, //添加修改角色
			addRoleMethodEvent(name) {
				const _ = this;
				_.$refs['addRoleModel'].validate((valid) => {
					if(valid) {
						let listJur = _.getRoleJurList();
						_.addRoleModel.menuId = listJur.menuId;
						_.addRoleModel.functionId = listJur.functionId;
						if(listJur.menuId.length <= 0 && listJur.functionId.length <= 0) {
							_.$layer.msg("请选择角色授权！")
						} else {
							if(!_.edit) {
								_.HttpAjax('post', 'addJur', _.addRoleModel, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if(res && res.data.status == '200') {
										_.$Notice.success({
											title: '成功',
											desc: '新增成功',
											duration: 2
										});
										_.init();
										_.addRole = false;
										_.disabled = false;
									}
								});
							} else {
								_.HttpAjax('post', 'updateRole', _.addRoleModel, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if(res && res.data.status == '200') {
										_.$Notice.success({
											title: '成功',
											desc: '修改成功',
											duration: 2
										});
										_.init();
										_.addRole = false;
										_.disabled = false;
									}
								});
							}
						}
					}
				})
			}, 
			//一级权限操作
			parentCheck(name, key) {
				let child = key.childnume;
				if(name) {
					key.selected = true;
					for(let i = 0; i < child.length; i++) {
						child[i].selected = true;
						if(child[i].fuction.length > 0) {
							for(let k = 0; k < child[i].fuction.length; k++) {
								child[i].fuction[k].selected = true;
							}
						}
					}
				} else {
					key.selected = false;
					for(let i = 0; i < child.length; i++) {
						child[i].selected = false;
						if(child[i].fuction.length > 0) {
							for(let k = 0; k < child[i].fuction.length; k++) {
								child[i].fuction[k].selected = false;
							}
						}
					}
				}
			},
			//二级权限操作
			childCheckbox(name, key, val) {
				let child = key.childnume;
				let children = val.fuction;
				if(name) {
					key.selected = true;
					val.selected = true;
					for(let i = 0; i < children.length; i++) {
						children[i].selected = true;
					}
				} else {
					val.selected = false;
					let bol = true;
					for(let i = 0; i < children.length; i++) {
						children[i].selected = false;
					}
					for(let i = 0; i < child.length; i++) {
						if(child[i].selected == true) {
							bol = false;
						}
					}
					if(bol) {
						key.selected = false;
					}
				}
			}, 
			//功能权限操作
			childrenCheck(name, key, val, pre) {
				let prevent = key.fuction;
				if(name) {
					val.selected = true;
					key.selected = true;
					pre.selected = true;
				} else {
					let bol = true;
					val.selected = false;
					for(let i = 0; i < prevent.length; i++) {
						if(prevent[i].selected == true) {
							bol = false;
						}
					}
					if(bol) {
						//key.selected = false;
						//pre.selected = false;
					}
				}
			}, 
			//角色启用禁用
			roleSwitchChange(bol, row) {
				const _ = this;
				if(bol) {
					_.HttpAjax('post', 'roleRedisable', {
						roleId: row.row.idKey
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '角色启用成功',
								duration: 2
							});
						}
						_.init();
					});
				} else {
					_.HttpAjax('post', 'roleDisable', {
						roleId: row.row.idKey
					}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == '200') {
							_.$Notice.success({
								title: '成功',
								desc: '角色禁用成功',
								duration: 2
							});
						}
						_.init();
					});
				}
			}, //角色权限修改
			editRoleAuthTree(row) {
				const _ = this;
				this.disabled = true;
				_.edit = true;
				_.addRole = true;
				this.getQueryRoleMF(row.row.idKey);

				for(let i in this.addRoleModel) {
					this.addRoleModel[i] = row.row[i];
				}
				this.addRoleModel.idKey = row.row.idKey;
			},
			getRoleJurList() {
				const _ = this;
				let list = _.authNodeData;10
				let callList = {};
				callList.menuId = [];
				callList.functionId = [];
				for(let i = 0; i < list.length; i++) {
					if(list[i].selected == true) {
						callList.menuId.push(list[i].idKey);
					}
					if(list[i].childnume.length > 0) {
						let row = list[i].childnume;
						for(let r = 0; r < row.length; r++) {
							if(row[r].selected == true) {
								callList.menuId.push(row[r].idKey);
							}
							if(row[r].fuction.length > 0) {
								let col = row[r].fuction;
								for(let c = 0; c < col.length; c++) {
									if(col[c].selected == true) {
										callList.functionId.push(col[c].idKey);
									}
								}
							}
						}
					}
				}

				return callList;
			},
			refresh() { //刷新
				this.getRoleListDate();
			},//数据权限配置
			dateAnthoiConfig(list){
				const _=this;
				_.dataConfig = true;
				_.disabled= true;
				_.edit = false;
				_.roleName = list.row.name;
				_.roleId = list.row.idKey;
				
				_.HttpAjax('post','findDataList',{roleId:list.row.idKey},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data.status == 200){
						let arr = [];
						let len = res.data.data;
						_.groupListArrCheck = len;

						for(let i=0;i<len.length;i++){
							for(let j = i + 1; j < len.length; j++){
								if(len[i].menuId === len[j].menuId){
									j = ++i;
								}
							}
							arr.push({menuId:len[i].menuId,menuName:len[i].menuName});
						}
						
						_.groupListArr = arr;
					}
				});
			},//数据权限配置 checkbox事件
			dataConfigCheck(val,item){
				if(val){
					item.status = 'Y';
				}else{
					item.status = 'N';
				}
			},//保存角色数据权限
			operateDataAuth(){
				const _=this;
				let datas = [];
				let len = _.groupListArrCheck;
				for(let i=0;i<len.length;i++){
					if(len[i].status == 'Y'){
						len[i].roleId = _.roleId;
						datas.push(len[i])
					}
				};
			
				if(datas.length <=0){
					_.$layer.msg('您还没有选择角色数据权限！')
				}else{
					_.HttpAjax('post','operateDataAuth',JSON.stringify(datas),(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res.data.status == 200){
							_.$Notice.success({
								title:'成功',
								desc:'数据权限配置成功！'
							});
							_.dataConfig = false;
							_.disabled = false;
						}
					},'json');
				}
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style scoped lang="less">
	.formGroupItem {
		padding: 7px 10px 0;
		border-bottom: 1px solid #dddee1;
		.groupIndex {
			padding: 7px 0;
			border: none;
		}
		.checkTitle {
			border-bottom: 1px solid #dddee1;
			padding: 7px 0;
		}
	}
	
	.ivu-icon:hover {
		cursor: pointer;
	}
	.from-item{
		.groupWarp{
			display: flex;
			margin-bottom: 10px;
			min-height:60px;
			.groupTips{
				width: 120px;
				background: #fbfbfb;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.groupCheck{
				width: 100%;
				background: #fbfbfb;
				margin-left: 10px;
				padding:5px;
			}
		}
	}
</style>