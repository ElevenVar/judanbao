<template>
	<div id="organiManage">
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
						<Form @submit.native.prevent="organListDataQuery()" label-position="right" :label-width="110" inline :model="formData">
			   				<FormItem label="选择公司">
						        <Select @on-open-change="getINIT" v-model="formData.comId" size="large" :filterable="true">
						            <Option :value="item.idKey" v-for="(item,index) in companyList" :key="item.idkey">{{item.name}}</Option>
						        </Select>
			   				</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click="organListDataQuery()" :disabled="addOrganModal">查询</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div>
	    	<Row>
		        <Col span="5" class="allwraper">
		        	<Input :disabled="addOrganModal"  @on-search="organListDataQueryOrg" v-model="groupName" placeholder="请输入机构名称" size="large" search enter-button="查询机构" ></Input>
		        	<div class="dataTree" >
		        		<Tree  :data="dataTree" @on-select-change="getTreeOrg"></Tree>
		        	</div>
		        </Col>
		        <Col span="19">
		        	<div class="allwraper" style="margin-left: 15px;">
			            <div class="groupOrg">
			            	<Button v-if="this.getAuth('08000010201')" type="primary" @click="addOranModal" :disabled="edited || addOrganModal" size="large" style="margin-right: 20px;">新增</Button>
			            	<Button v-if="this.getAuth('08000010202')"  type="primary" @click="editModalOrg" :disabled="edited || addOrganModal" size="large">修改</Button>
			            	<Button v-if="this.getAuth('08000010203')"  type="primary" @click="deleteOrg" :disabled="edited || addOrganModal" size="large" style="float: right;">删除</Button>
			            </div>
			            <!-- 公共form表单类 -->
						<div class="showOrmInformation">
							<div v-if="showOrg">
								<div class="item-org">
									<div class="item-tit">部门编号</div>
									<div class="item-content">{{treeSelectArr[0].comId}}</div>
								</div>
								<div class="item-org tip">
									<div class="item-tit">部门名称</div>
									<div class="item-content">{{treeSelectArr[0].groupName}}</div>
								</div>

								<div class="item-org">
									<div class="item-tit">业务线</div>
									<div class="item-content" v-if="treeSelectArr[0].serviceLine == 'XD'">信贷</div>
									<div class="item-content" v-else-if="treeSelectArr[0].serviceLine == 'XJ'">消分</div>
									<div class="item-content" v-else></div>
								</div>
								<div class="item-org tip">
									<div class="item-tit">上级部门</div>
									<div class="item-content">{{treeSelectArr[0].parentName}}</div>
								</div>
								<div class="item-org">
									<div class="item-tit">创建人</div>
									<div class="item-content">{{treeSelectArr[0].createUser}}</div>
								</div>
								<div class="item-org tip">
									<div class="item-tit">创建日期</div>
									<div class="item-content">{{treeSelectArr[0].createDate}}</div>
								</div>
								<div class="item-org">
									<div class="item-tit tips">备注</div>
									<div class="item-content tips">{{treeSelectArr[0].description}}</div>
								</div>
							</div>
						</div>
					</div>
		        </Col>
	    	</Row>
	    </div>
	    <!--Modal-->
		<Modal
			v-model="addOrganModal"
      		draggable
			:mask-closable="false"
			:scrollable="true"
			:title="edit ? '修改新机构' : '添加新机构'"
			>
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" :rules="ruleValidate" :model="userFromList" ref="userFromList">
					<FormItem label="上级部门">
						<div class="form-item-msg" v-if="edit">
							<span v-if="treeSelectArr.length > 0">{{treeSelectArr[0].parentName}}</span>
						</div>
						<div class="form-item-msg" v-else>
							<span v-if="treeSelectArr.length > 0">{{treeSelectArr[0].groupName}}</span>
						</div>
					</FormItem>
					<FormItem label="部门名称" prop="groupName">
						<Input size="large" v-model="userFromList.groupName" placeholder="请输入部门名称!" :maxlength="20"></Input>
					</FormItem>
					<FormItem label="是否催收团队" prop="isCollectionTeam">
						<RadioGroup @on-change="changeVal" v-model="userFromList.isCollectionTeam" style="width:100%">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="选择组长" prop="headmans" class="tipsItemForm">
						<!--<Select @on-open-change="getINIO" v-model="userFromList.headmans" size="large" :filterable="true" placeholder="请选择部门类别!">
							<Option value="0">普通部门</Option>
						</Select>-->
						<CheckboxGroup  v-model="userFromList.headmans">
							<Checkbox :disabled="userFromList.isCollectionTeam == 0"  v-for="(item,index) in GroupList" :key="index" :label="item.idKey">{{item.name}}</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem label="业务线" prop="serviceLine">
						<Select  :disabled="userFromList.isCollectionTeam == 0"  v-model="userFromList.serviceLine" size="large"  placeholder="请选择业务线!">
							<Option value="XD">信贷</Option>
							<Option value="XJ">消分</Option>
							<Option value="ALL">/</Option>
						</Select>
					</FormItem>
					<FormItem label="备注" prop="description" class="tipsGroup1">
	   					<Input v-model="userFromList.description" type="textarea" :autosize="true" placeholder="请输入备注！"  size="large" :maxlength="100"></Input>
	   				</FormItem>
		   		</Form>
		   	</div>
		   	<div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="addOrganMethod('userFromList')">确定</Button>
            </div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	export default{
		data(){
			// 验证规则
			const xzzz = (rule, value, callback) => {
				if(this.userFromList.isCollectionTeam == '1') {
					if(value.length <= 0){
						callback(new Error('请选择组长!'));
					}else{
						callback();
					}
				} else {
					callback();
				}
			};
			return{
				title:'机构管理',
				value1:'1',
				rotate:true,
				showOrg:false,
				addOrganModal:false,
				edit:false,
				edited:true,
				companyList:[],
				groupName:'',
				formData:{
					comId:'',
				},
				userFromList:{
					comId:'',
					parentId:'0',
					groupName:'',
					isCollectionTeam:'0',
					headmans:[],
					serviceLine:'',
					description:'',
				},
				ruleValidate:{
					groupName:[{required:true,message:'请输入部门名称！'}],
					isCollectionTeam:[{required:true,message:'请选择是否催收团队！'}],
					headmans:[{validator:xzzz,trigger: 'change'}],
					serviceLine:[{required:false,message:'请选择业务线！'}],
					description:[{required:true,message:'请输入备注！'}],
				},
				dataTree:[],
				dataTree2:[],
				treeSelectArr:[],
				GroupList:[]
			}
		},
		methods:{
			organListDataQuery(){
				const _=this;
				_.HttpAjax('post','orgQuery',_.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false)
					if(res && res.data.status == '200'){
						this.dataTree = _.getTreeDataFormat(res.data.data);
						this.dataTree2 = _.getTreeDataFormat(res.data.data);
						_.showOrg = false;
						_.edited = true;
					}
				});
			},
			addOranModal(){
				const _=this;
				_.addOrganModal = true;
				_.edit = false;
				_.$refs['userFromList'].resetFields();
				_.getINIO();
			},
			editModalOrg(){
				const _=this;
				_.addOrganModal = true;
				_.edit = true;
				_.getINIO();
				for(let i in _.userFromList){
					if(i== 'headmans'){
						if(_.treeSelectArr[0][i] == null){
							_.userFromList[i] = [];
						}else{
							_.userFromList[i] = _.treeSelectArr[0][i];
						}
					}else{
						_.userFromList[i] = _.treeSelectArr[0][i];
					}
				}
			},
			addOrganMethod(name){
				const _=this;
				_.$refs[name].validate((valid) => {
				 	if (valid) {
				 		let datas ={
				 			groupName:_.userFromList.groupName,
							headmans:_.userFromList.headmans,
							isCollectionTeam:_.userFromList.isCollectionTeam,
							serviceLine:_.userFromList.serviceLine,
							description:_.userFromList.description
				 		};
				 		if(!_.edit){
				 			datas.parentId=_.treeSelectArr[0].idKey,
				 			datas.comId = _.treeSelectArr[0].comId;
				 			_.HttpAjax('post','orgAdd',datas,(res)=>{
								store.commit('UPDATE_LOADINGSTATE',false);
								if(res && res.data.status == '200'){
									_.$Notice.success({
										title:'成功',
										desc:'新增机构成功',
                      					duration: 2
									});
									_.addOrganModal = false;
									_.organListDataQuery();
								}
							});
				 		}else{
				 			datas.idKey=_.treeSelectArr[0].idKey,
				 			_.HttpAjax('post','orgUpdate',datas,(res)=>{
								store.commit('UPDATE_LOADINGSTATE',false);
								if(res && res.data.status == '200'){
									_.$Notice.success({
										title:'成功',
										desc:'修改机构成功',
                      					duration: 2
									});
									_.addOrganModal = false;
									_.organListDataQuery();
								}
							});
				 		}
				 	}
				});
			},
			deleteOrg(){
				const _=this;
				let comId = _.treeSelectArr[0].idKey;
				_.$Modal.confirm({
					title:'确定删除！',
					content:'确定删除  '+_.treeSelectArr[0].groupName+' 这个机构吗？',
					onOk:()=>{
						_.HttpAjax('post','orgDelete',{orgId:comId},(res)=>{
							store.commit('UPDATE_LOADINGSTATE',false);
							if(res && res.data.status == '200'){
								_.$Notice.success({
									title:'成功',
									desc:'删除机构成功',
                      				duration: 2
								});
								_.organListDataQuery();
							}
						});
					}
				});
			},
			getINIT(){
				const _=this;
				if(_.companyList.length <= 0){
					_.HttpAjax('post','getUCList',{},(res)=>{
			 			store.commit('UPDATE_LOADINGSTATE',false)
						if(res && res.data.status == '200'){
							_.companyList = res.data.data;
						}
			 		});
			 	}
			},
			getINIO(){
				const _=this;
				let val  = _.treeSelectArr[0].idKey;

				_.HttpAjax('post','queryAllCollectionGroupRole',{teamId:val},(res)=>{
		 			store.commit('UPDATE_LOADINGSTATE',false)
					if(res && res.data.status == '200'){
						_.GroupList = res.data.data;
					}
		 		});

			},
			getTreeDataFormat(list){
				const _=this;
				list.forEach(function (r,i) {
			    	list[i].title = r.groupName;
			      	list[i].children = r.childList;
			      	list[i].expand =true;
	              	if(r.children.length>0){
	                	_.getTreeDataFormat(r.childList);
	      			}
		       });
				return list;
			},
			getTreeOrg(arr){
				this.treeSelectArr = arr;
				if(arr.length >0){
					this.showOrg = true;
					this.edited = false;
				}else{
					this.showOrg = false;
					this.edited = true;
				}
			},
			changeVal(val){
				if(val == '0'){
					this.userFromList.headmans = [];
					this.userFromList.serviceLine = '';
				}
			},
			cancel(){
				this.addOrganModal = false;
			},
			organListDataQueryOrg(){
				const _= this;
				if(_.groupName == '' || _.dataTree2.length == 0){
					_.organListDataQuery();
				}else{
					_.dataTree = [];
					_.showOrg = false;
					_.edited = true;
					_.getGroupName(_.dataTree2);
				}
			},
			getGroupName(list){
				const _=this;
				
				for(let i=0;i<list.length;i++){
					if(list[i].groupName.indexOf(_.groupName) != -1){
						list[i].selected = false;
						_.dataTree.push(list[i]);
						break;
					}else{
						if(list[i].children.length > 0){
							_.getGroupName(list[i].children);
						}
					}
				}

			}
		},
		mounted(){

		},
		created(){

		}
	}
</script>

<style lang="less">

#organiManage{
	.allwraper{
		background: #fff;
		padding:15px;
		margin-top: 15px;
		.dataTree{
			margin-top: 10px;
			padding: 15px;
			max-height: 620px;
			min-height:400px;
			border: 1px solid lightgray;
			box-sizing: border-box;
			overflow-y:auto;
			.ivu-tree{
				margin-top: 10px;
			}
		}
		.groupOrg{
			padding-top: 2px;
		}
	}
	.showOrmInformation{
		margin-top: 10px;
		padding: 0 15px 15px 0;
		min-height:400px;
		.item-org{
			display:flex;
			margin-bottom: 10px;
			font-size: 14px;
			line-height:40px;
			.item-tit{
				height: 40px;
				width: 155px;
				margin-right: 10px;
				text-align: center;
				background-color: #ecfdfd;
				&.tips{
					height: 84px;
					line-height:84px;
				}
			}
			.item-content{
				height: 40px;
				width:100%;
				text-indent: 20px;
				background-color: #ecfdfd;
				&.tips{
					height: 84px;
				}
			}
			&.tip{
				.item-tit{
					background-color: #f2f2f2;
				}
				.item-content{
					background-color: #f2f2f2;
				}
			}
		}
	}

}
.tipsGroup1{
	.ivu-form-item-label{
		height: 80px;
		line-height: 50px;
	}
	textarea.ivu-input{
		height: 80px!important;
	}
}
.tipsItemForm{
	.ivu-checkbox-group{
		height:auto;
		min-height: 36px;
	}
}
</style>
