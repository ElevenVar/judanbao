<template>
  <div class="accountManage">
  	<!-- 公共Header类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">青牛账号管理</span>
				<span class="swith head-commom">
						{{rotate ? '收起' : '展开'}}
						<Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
					</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model='pageShow'>
							<FormItem label="用户账号">
								<Input type="text" v-model='pageShow.name' placeholder="请输入用户账号!" size="large" :maxlength="60"></Input>
							</FormItem>
							<FormItem label="" style="margin-left: -110px;">
								<Button type="primary" @click='search'>查询</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
    <div class="add_button" v-if="this.getAuth('08000010801')"><Button @click="addAccount" :disabled="this.addAccountModel">新增账号</Button></div>
		<div class="table-warper">
	    <!-- 公共table类-->
	    <div class="table-item">
	      <Table height='396' border :stripe="true" :columns="columns" :data="datas"></Table>
	    </div>
	    <!-- 公共page分页类 -->
	    <div class="page-item">
	      <Page :total="totallPages"  show-total  show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
	      <Icon type="ios-refresh"  style="font-size: 30px" @click="refresh"/>
	    </div>
	  </div>


    <!--Modal 添加编辑-->
    <Modal
      v-model="addAccountModel"
      :mask-closable="false"
      draggable
      :scrollable="true"
      :loading="loading"
      :title="edit ? '编辑账号' : '新增账号'">
      <!-- 公共form表单类 -->
      <div class="from-item">
        <Form label-position="right" :label-width="90" inline :model="formData" :rules="ruleValidate" ref="formData">
          <FormItem label="聚担保账号" prop="userId">
            <Select v-model="formData.userId" filterable placeholder="请选择！" :style="width" size="large">
              <Option :key="index" v-for="(item,index) in distList.accountNumber" :value="item.idKey">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="企业编号" prop="enterpriseNo">
            <Input v-model="formData.enterpriseNo" type="text"  placeholder="请输入企业编号！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="坐席工号" prop="seatWorker">
            <Input v-model="formData.seatWorker" type="text" placeholder="请输入坐席工号！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="坐席密码" prop="seatPassword">
            <Input v-model="formData.seatPassword" type="password" placeholder="请输入坐席密码！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="坐席分机" prop="seatTel">
            <Input v-model="formData.seatTel" type="text" placeholder="请输入坐席分机！" :style="width"  size="large"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="addAccountMethod('formData')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import store from '../../store/index'
    export default {
        name: "accountManage",
      data(){
        // 验证规则
        const disabledChinese = (rule, value, callback) => {
          if (!value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'')) {
            callback(new Error('不能输入中文！'));
          }else{
            callback();
          }
        };
          return {
            value1:'1',
            title:'账号管理',
            rotate:true,
            totallPages:0,
            loading:true,
            edit:false,
            addAccountModel:false,
            width:{'width':'388px'},
            pageShow:{
							name: '', //用户账号
              pageIndex:'1',
              pageSize:'10',
            },
            formData:{//添加修改账号字段
              userId:'',
              enterpriseNo:'',
              seatWorker:'',
              seatPassword:'',
              seatTel:''
            },
            ruleValidate:{//添加修改字段验证
              userId:[{required:true,message:'请选择聚担保账号！'}],
              enterpriseNo:[{required:true,message:'请输入企业编号！'},{validator:disabledChinese,trigger: 'blur'}],
              seatWorker:[{required:true,message:'请输入坐席工号！'},{validator:disabledChinese,trigger: 'blur'}],
              seatPassword:[{required:true,message:'请输入坐席密码！'},{validator:disabledChinese,trigger: 'blur'}],
              seatTel:[{required:true,message:'请输入坐席分机！'},{validator:disabledChinese,trigger: 'blur'}],
            },
            distList:{//下拉菜单数据汇集
              accountNumber:[],//聚担保账号
            },
            columns:[
              {
                title: '企业编号',
                key: 'enterpriseNo',
                minWidth:120
              },
              {
                title: '坐席工号',
                key: 'seatWorker',
                minWidth:120
              },
              {
                title: '坐席密码',
                key: 'seatPassword',
                minWidth:120
              },
              {
                title: '坐席分机',
                key: 'seatTel',
                minWidth:120
              },
              {
                title: '聚担保账号',
                key: 'userId',
                minWidth:120
              },
              {
                title: '操作',
                minWidth:160,
                fixed:'right',
                render:(h,params)=>{
                  return h('div',[
                    h('Button',{
                      props:{
                        size:'small',
                        disabled:this.addAccountModel
                      },
                      style:{
                      	display:this.getAuth('08000010802') ? 'inline-block' :'none',
                        marginRight:'5px'
                      },
                      on:{
                        click:()=>{
                          this.editAccount(params)
                        }
                      }
                    },'编辑'),
                    h('Button',{
                      props:{
                        size:'small',
                        type:'info',
                        disabled:this.addAccountModel
                      },
                      style:{
                      	display:this.getAuth('08000010803') ? 'inline-block' :'none',
                        marginRight:'5px'
                      },
                      on:{
                        click:()=>{
                          this.delAccount(params)
                        }
                      }
                    },'删除')
                  ])
                }
              },
            ],
            datas:[
            ]
          }
      },
      methods:{
        init(){
            const _=this;
            _.userList();//账号列表初始化
        },
        userList(page,pagesize){//账户列表
          const _=this;
          _.pageShow.pageIndex = page || _.pageShow.pageIndex;
          _.pageShow.pageSize = pagesize || _.pageShow.pageSize;
          _.HttpAjax('post','userList',_.pageShow,(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false);
            if(res && res.data.status == '200'){
              _.totallPages = res.data.data.dataCount;//总共显示多少条
              _.datas = res.data.data.data;
            }
          });
        },
				//查询按钮点击事件
				search(){
					this.userList();
				},
        accountNumberList(row){//聚担保账号下拉菜单
          const _=this;
          if(!_.edit){
            _.HttpAjax('post','accountNumberList',{},(res)=>{//点击添加时，获取的聚担保账号下拉菜单
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                _.distList.accountNumber=res.data.data;
              }
            });
          }else{
            _.HttpAjax('post','accountNumberList',{idKey:row.row.idKey},(res)=>{
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                _.distList.accountNumber=res.data.data;//获取编辑时聚担保账号的下拉菜单
                //因为异步执行问题，故将赋值动作放这里
                for(let i in this.formData){//点击编辑时，赋值
                  _.formData[i] = row.row[i];
                }
              }
            });
          }
        },
        addAccount(){//添加账号
          this.addAccountModel = true;
          this.edit =false;
          this.$refs['formData'].resetFields();
          delete this.formData.idKey;
          this.accountNumberList();//获取添加时，聚担保账号的下拉菜单
        },
        editAccount(row){//编辑账号
          this.addAccountModel = true;
          this.edit =true;
          this.$refs['formData'].resetFields();
          this.accountNumberList(row);//获取编辑时，聚担保账号的下拉菜单

          this.formData.idKey = row.row.idKey;
        },
        cancel(){//取消模态框
            this.addAccountModel=false;
        },
        addAccountMethod(name){//添加账号
          const _=this;
          _.$refs[name].validate((valid) => {
            if (valid) {
              if(!_.edit){
                _.HttpAjax('post','saveOrUpdateSeatUser',_.formData,(res)=>{
                  store.commit('UPDATE_LOADINGSTATE',false);
                  if(res && res.data.status == '200'){
                    _.$Notice.success({
                      title:'成功',
                      desc:'添加账号成功！',
                      duration: 2
                    });
                    _.addAccountModel = false;
                    _.init();
                  }
                })
              }else{
                _.HttpAjax('post','saveOrUpdateSeatUser',_.formData,(res)=>{
                  store.commit('UPDATE_LOADINGSTATE',false);
                  if(res && res.data.status == '200'){
                    _.$Notice.success({
                      title:'成功',
                      desc:'编辑账号成功',
                      duration: 2
                    });
                    _.addAccountModel = false;
                    _.init();
                  }
                })
              }
            }
          });

        },
        delAccount(row){//删除账号
          const _=this;
          _.$Modal.confirm({
            title:'删除坐席工号',
            content:'确定删除 '+row.row.seatWorker+' 这个坐席工号吗？',
            onOk:()=>{
              _.HttpAjax('post','removeSeatUser',{idKey:row.row.idKey},(res)=>{
                store.commit('UPDATE_LOADINGSTATE',false);
                if(res && res.data.status == '200'){
                  _.$Notice.success({
                    title:'成功',
                    desc:'删除账号成功！',
                    duration: 2
                  });
                  _.addAccountModel = false;
                  _.init();
                }
              })
            }
          })
        },
        changePages(name){
          this.userList(name);
        },
        changePagesTotall(name){
          this.pageShow.pageSize = name;
          this.userList('',name);
        },
        refresh(){//刷新
          this.userList();
        },

      },
      created(){

      },
      mounted(){
          this.init();
      }
    }
</script>

<style scoped lang="less">
  .content{
    margin:30px 30px 10px;
    .tables{
      margin-top:10px;
    }
  }
  .ivu-icon:hover{
    cursor: pointer;
  }
  .accountManage{
    position:relative;
    .add_button{
      position:absolute;right:15px;top:5px;width:95px;
      .ivu-btn {
        border-radius: 4px;
        outline: none;
        min-width: 90px;
        height: 30px;
      }
    }
  }
</style>
