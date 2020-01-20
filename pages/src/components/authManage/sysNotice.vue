<template>
	<div id="sysNotice">
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
						<Button v-if="getAuth('08000010901') || getAuth('08000010902')" type="primary" @click="openModelMSG" :disabled="disabled">新增通知</Button>
					</div>
				</div>
			</Panel>
		</Collapse>

		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="tabChange">
				<TabPane label="创建人" name="tab1" v-if="getAuth('08000010902')">
					<!-- 公共table类-->
					<div class="table-item">
						<Table border :stripe="true" :columns="columns" :data="datas"></Table>
					</div>
					<!-- 公共page分页类 -->
					<div class="page-item">
						<Page :total="totalSize" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
						<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
					</div>
				</TabPane>
				<TabPane label="接收人" name="tab2" v-if="getAuth('08000010903')">
					<!-- 公共table类-->
					<div class="table-item">
						<Table border :stripe="true" :columns="columns1" :data="datas1"></Table>
					</div>
					<!-- 公共page分页类 -->
					<div class="page-item">
						<Page :total="totalSize" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
						<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
					</div>
				</TabPane>
			</Tabs>
		</div>

		<Modal v-model="newAddIndex" draggable :title="modalTitle" @on-cancel="cancel">
			<div class="from-item">
				<Form label-position="right" :label-width="95" ref="add_notice_data" :model="add_notice_data" :rules="ruleValidate">
					<FormItem label="催收团队" prop="serviceLine">
						<RadioGroup @on-change="getNoticeServiceLine" v-model="add_notice_data.serviceLine">
							<Radio label="XJ">消金</Radio>
							<Radio label="XD">信贷</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="" prop="urgeTeamList" class="allCheck">
						<CheckboxGroup @on-change="getUrgeUserByTeam" v-model="add_notice_data.urgeTeamList">
							<Checkbox v-for="(item,index) in serviceLineList" :key="index" :label="item.urgeTeamId">{{item.urgeTeamName}}</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem label="催收人员" prop="urgeUserList" class="allCheck">
						<CheckboxGroup v-model="add_notice_data.allSelect" @on-change="allSelectBox"> 
							<Checkbox :disabled="urgeTeamList.length <= 0" label='all'>全选</Checkbox >
						</CheckboxGroup>
						
						<CheckboxGroup v-model="add_notice_data.urgeUserList">
							<Checkbox v-for="(item,index) in urgeTeamList" :label="item.name" :key="index">{{item.realName}}</Checkbox>
						</CheckboxGroup>
					</FormItem>
					<FormItem label="通知内容" prop="content">
						<Input v-model="add_notice_data.content" type="textarea" placeholder="请输入通知内容！" :autosize="{minRows: 5,maxRows: 6}" :maxlength="300"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="Submit_Info('add_notice_data')">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store'
	import qs from 'qs'

	export default{
		data(){
			return{
				title:'系统通知',
				modalTitle: '新增通知',
				user:true,
				rotate:true,
				newAddIndex:false,
				disabled:false,
				totalSize:0,
				edit:false,
				tab:'tab1',
				value1:'1',
				formData:{
					page:'1',
					pagesize:'10'
				},
				editIdKey:'',
				add_notice_data:{
					serviceLine:'',
					urgeTeamList:[],
					urgeUserList:[],
					allSelect:[],
					content:''
				},
				columns:[{
					type:'index',
					title:'序号',
					width:90
				},{
					key:'createTime',
					title:'通知时间',
					width:150
				},{
					key:'createUser',
					title:'发起人',
					width:150
				},{
					key:'content',
					title:'内容'
				},{
					title:'操作',
					width:250,
					render:(h,params)=>{
						return h('div',[
							h('Button',{
								props:{
									type:'primary',
									size:'small',
									disabled:this.disabled
								},
								style:{
									marginRight:'5px'
								},
								on:{
									click:()=>{
										this.openNoticeMsg(params);
									}
								}
							},'查看'),
							h('Button',{
								props:{
									type:'primary',
									size:'small',
									disabled:this.disabled
								},
								style:{
									display:this.getAuth('08000010904') ? 'inline-block' :'none',
									marginRight:'5px'
								},
								on:{
									click:()=>{
										this.noticeEditOpen(params);
									}
								}
							},'修改'),
							h('Button',{
								props:{
									type:'primary',
									size:'small',
									disabled:this.disabled
								},
								style:{
									display:this.getAuth('08000010905') ? 'inline-block' :'none',
								},
								on:{
									click:()=>{
										this.noticeDeleteMsg(params);
									}
								}
							},'删除'),
						]);
					}
				}],
				columns1:[{
					type:'index',
					title:'序号',
					width:90
				},{
					key:'createTime',
					title:'通知时间',
					width:150
				},{
					key:'createUser',
					title:'发起人',
					width:150
				},{
					key:'content',
					title:'内容'
				},{
					title:'操作',
					width:100,
					render:(h,params)=>{
						return h('div',[
							h('Button',{
								props:{
									type:'primary',
									size:'small',
									disabled:this.disabled
								},
								style:{
									marginRight:'5px'
								},
								on:{
									click:()=>{
										this.openNoticeMsg(params);
									}
								}
							},'查看'),
						]);
					}
				}],
				datas:[],
				datas1:[],
				ruleValidate:{
					serviceLine:[{required:true,message:'业务线必须选择！'}],
					urgeTeamList:[{required:true,message:'催收团队必须选择！'}],
					urgeUserList:[{required:true,message:'催收人员必须选择！'}],
					content:[{required:true,message:'通知内容必填！'}]
				},
				serviceLineList:[],
				urgeTeamList:[]
			}
		},
		methods:{
			init(){
				const _=this;
				_.getSysNoticeList();
			},
			getSysNoticeList(page,pagesize){
				const _ = this;
				_.formData.pageIndex = page || _.formData.pageIndex;
				_.formData.pageSize = pagesize || _.formData.pageSize;
				if(_.user){
						_.HttpAjax('post', 'getNoticeList', _.formData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data && res.data.status == 200) {
								_.datas = res.data.data.data;
								_.totalSize = res.data.data.dataCount;
							}
						});		
				}else{
						_.HttpAjax('post', 'getReviceNoticeList', _.formData, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data && res.data.status == 200) {
								_.datas1 = res.data.data.data;
								_.totalSize = res.data.data.dataCount;
							}
						});
				}

			},//时间格式转换
			dataTimeChange(name,rang) {
				this.formData[rang] = name;
			},//页码跳转
			changePages(name) {
				this.getSysNoticeList(name, '');
			}, //页数切换
			changePagesTotall(name) {
				this.formData.totalSize = name;
				this.getSysNoticeList('', name);
			}, //刷新
			refresh() {
				this.getSysNoticeList();
			},
			cancel(){
				this.newAddIndex = false;
				this.disabled = false;
			},
			openModelMSG(){
				this.modalTitle = '新增通知';
				this.newAddIndex = true;
				this.disabled = true;
				this.edit = false;
				this.$refs.add_notice_data.resetFields();
			},
			noticeEditOpen(parm){
				const _=this;
				_.modalTitle = '修改通知';
				_.newAddIndex = true;
				_.edit = true;
				_.disabled = true;
				_.editIdKey = parm.row.idKey;
				_.HttpAjax('post','getNoticeById',{idKey:parm.row.idKey}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.data.status == 200) {
						_.add_notice_data.serviceLine = res.data.data.serviceLine;
						_.add_notice_data.urgeTeamList = res.data.data.urgeTeamList;
						_.add_notice_data.urgeUserList = res.data.data.urgeUserList;
						_.add_notice_data.content = res.data.data.content;

						_.getNoticeServiceLine(res.data.data.serviceLine,'tip');
						_.getUrgeUserByTeam('','tip');
					}
				});
			},
			Submit_Info(name){
				const _=this;
				_.$refs[name].validate((valid) => {
					if(valid){
						let datas = {
							serviceLine:_.add_notice_data.serviceLine,
							urgeTeamList:_.add_notice_data.urgeTeamList.join(','),
							urgeUserList:_.add_notice_data.urgeUserList.join(','),
							content:_.add_notice_data.content
						}
						if(!_.edit){
							_.HttpAjax('post', 'saveNotice',datas, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res.data && res.data.status == 200) {
									_.$Notice.success({
										title:'成功！',
										desc:'新增通知成功！',
									});
									this.newAddIndex = false;
									this.disabled = false;
									_.init();
								}
							});
						}else{
							datas.idKey = _.editIdKey;
							_.HttpAjax('post', 'saveNotice',datas, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res.data && res.data.status == 200) {
									_.$Notice.success({
										title:'成功！',
										desc:'修改通知成功！',
									});
									this.newAddIndex = false;
									this.disabled = false;
									_.init();
								}
							});
						}
					}
				});
			},
			getNoticeServiceLine(val,tip){
				const _=this;
				_.HttpAjax('post', 'getNoticeServiceLine',{serviceLine:val}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.data.status == 200) {
						_.serviceLineList = res.data.data;

						_.urgeTeamList.splice(0);
						if(!tip){
							_.add_notice_data.urgeTeamList.splice(0);
							_.add_notice_data.urgeUserList.splice(0);
						}
					}
				});
			},
			getUrgeUserByTeam(val,tip){
				const _=this;
				_.add_notice_data.allSelect.splice(0);
				if(_.add_notice_data.urgeTeamList.length <= 0){
					_.urgeTeamList.splice(0);
				}else{
					_.HttpAjax('post', 'getUrgeUserByTeam',{urgeTeamList:_.add_notice_data.urgeTeamList.join(',')}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res.data && res.data.status == 200) {
							_.urgeTeamList = res.data.data;
							if(!tip){
								_.add_notice_data.urgeUserList.splice(0);
							}
						}
					});
				}
			},//查看通知信息
			openNoticeMsg(parm){
				const _=this;
				_.disabled = true;
				_.HttpAjax('post','seeNotice',{idKey:parm.row.idKey}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res.data && res.data.status == 200) {
						_.$Modal.info({
							title:'查看通知！',
							content:parm.row.content,
							onOk:()=>{
								_.disabled = false;
							}
						});
					}
				});
			},
			noticeDeleteMsg(parm){
				const _=this;
				_.$Modal.confirm({
					title:'删除',
					content:'确定删除这条通知吗?',
					onOk:() => {
						_.HttpAjax('post','deleteByIdkey',{idKey:parm.row.idKey}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data && res.data.status == 200) {
								_.$Notice.success({
									title:'成功！',
									desc:'删除成功！'
								});
								_.init();
							}
						});
					}
				})
			},
			tabChange(val){
				const _=this;
				val == 'tab1' ? _.user = true : _.user = false;
				_.getSysNoticeList();
			},
			allSelectBox(val){
				const _=this;
				if(val.length > 0){
					_.add_notice_data.urgeUserList.splice(0);
					let list = _.urgeTeamList;
					for(let i=0;i<list.length;i++){
						_.add_notice_data.urgeUserList.push(list[i].name)
					}
					
				}else{
					_.add_notice_data.urgeUserList.splice(0);
				}
				console.log(this.add_notice_data.allSelect);
				console.log(this.add_notice_data.urgeUserList);
				
			}
		},
		created(){
			this.init();
		},
		mounted(){

		}
	}
</script>

<style lang="less">
	.from-item .allCheck .ivu-checkbox-group{
		min-height: 36px;
		height: auto;
	}
</style>
