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
          <div class="from-item">
            <Form label-position="right" :label-width="110" inline :model="formData" :rules="ruleValidateFilter" ref="formData">
              <FormItem label="公司名称" prop="name">
                <Input type="text" v-model="formData.name" :maxLength="maxLength" placeholder="请输入公司名称！" size="large"></Input>
              </FormItem>
              <FormItem label="签入开始时间" prop="moveInDateStart">
                <DatePicker @on-change='dateChange2' v-model="formData.moveInDateStart" type="date" :editable="false" format="yyyy-MM-dd" placement="top-start" placeholder="请输入开始时间！" size="large"></DatePicker>
              </FormItem>
              <FormItem label="签入结束时间" prop="moveInDateEnd">
                <DatePicker @on-change='dateChange3' v-model="formData.moveInDateEnd" type="date" :editable="false" format="yyyy-MM-dd" placement="top-start" placeholder="请输入结束时间！" size="large"></DatePicker>
              </FormItem>
              <FormItem style="margin-left: -110px;">
                <Button type="primary" icon="plus-circled" @click.prevent="outsidecaseData()"
                        :disabled=lookDetails||addOutsideCompany
                >查询</Button>
                <Button  icon="navicon-round" @click="restData()"
                         :disabled=lookDetails||addOutsideCompany
                >重置</Button>
                <Button v-if="this.getAuth('03000010301')"  icon="plus-circled" @click="addoutsidecompany"
                         :disabled=lookDetails||addOutsideCompany
                >添加</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Panel>
    </Collapse>

    <div class="table-warper">
      <!-- 公共table类-->
      <div class="table-item">
        <Table border :stripe="true" :columns="columns" :data="datas"></Table>
      </div>
      <!-- 公共page分页类 -->
      <div class="page-item">
        <Page :total="totallPages"  show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
        <Icon type="ios-refresh"  style="font-size: 30px" @click="refresh"/>
      </div>
    </div>
    <!--Modal 添加修改-->
    <Modal
      v-model="addOutsideCompany"
      draggable
      :mask-closable="false"
      :scrollable="true"
      :loading="loading"
      :title="edit ? '修改委外公司' : '添加委外公司'">
      <!-- 公共form表单类 -->
      <div class="from-item">
        <Form label-position="right" :label-width="90" inline :model="addOutsideCompanyModel" :rules="ruleValidate" ref="addOutsideCompanyModel">

          <FormItem label="公司名称" prop="name">
            <Input v-model="addOutsideCompanyModel.name" type="text" placeholder="请输入公司名称！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="联系人电话" prop="telNumber">
            <Input v-model="addOutsideCompanyModel.telNumber" type="text" placeholder="请输入联系人电话！" :style="width"  size="large"></Input>
          </FormItem>
          <!--<FormItem label="创建时间" prop="createDate">-->
            <!--<DatePicker @on-change='dateChange' v-model="addOutsideCompanyModel.createDate" type="date" :editable="false" format="yyyy-MM-dd"  placeholder="请选择创建时间！" :style="width" size="large"></DatePicker>-->
          <!--</FormItem>-->
          <FormItem label="签入时间" prop="moveInDate">
            <DatePicker @on-change='dateChange1' v-model="addOutsideCompanyModel.moveInDate" type="date" :editable="false" format="yyyy-MM-dd" placeholder="请选择签入时间！" :style="width" size="large"></DatePicker>
          </FormItem>
          <FormItem label="公司属地" prop="areaName">
            <Select v-model="addOutsideCompanyModel.areaName"  placeholder="请选择！" :style="width" size="large">
              <Option :key="index" v-for="(item,index) in distList.province" :value="item.value">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="addOutsideCompanyModel.address" type="text" placeholder="请输入地址！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="账号" prop="openingBankNo">
            <Input v-model="addOutsideCompanyModel.openingBankNo" type="text" placeholder="请输入账号！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="开户名称" prop="openingName">
            <Input v-model="addOutsideCompanyModel.openingName" type="text" placeholder="请输入开户名称！" :style="width"  size="large"></Input>
          </FormItem>
          <FormItem label="开户行" prop="openingBank">
            <Input v-model="addOutsideCompanyModel.openingBank" type="text" placeholder="请输入开户行！" :style="width"  size="large"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="addOutsideCompanyMethod('addOutsideCompanyModel')">确定</Button>
      </div>
    </Modal>
    <!--Modal 查看-->
    <Modal
      v-model="lookDetails"
      draggable
      :mask-closable="false"
      :scrollable="true"
      :loading="loading"
      class-name="modalTip1"
      @on-cancel="closed"
      title="查看详情">
      <!-- 公共form表单类 -->
      <div class="from-item" >
        <Form label-position="right" :label-width="90" inline :model="lookDetailsModel" ref="lookDetailsModel">
          <Tabs :value="tab" type="card" @on-click="tabActive" :animated="false">
            <Tab-pane label="委外公司详情"  name="1" >
              <FormItem label="公司名称" prop="name">
                <Input v-model="lookDetailsModel.name"  type="text" placeholder="请输入公司名称！" :style="width"  size="large"></Input>
              </FormItem>
              <FormItem label="联系人电话" prop="telNumber">
                <Input v-model="lookDetailsModel.telNumber" type="text" placeholder="请输入联系人电话！" :style="width"  size="large"></Input>
              </FormItem>
              <FormItem label="公司属地" prop="areaNo">
                <Select v-model="lookDetailsModel.areaNo"  placeholder="请选择！" :style="width" size="large">
                  <Option :key="index" v-for="(item,index) in distList.province" :value="item.idKey">{{item.value}}</Option>
                </Select>
              </FormItem>
              <FormItem label="地址" prop="address">
                <Input v-model="lookDetailsModel.address" type="text" placeholder="请输入地址！" :style="width"  size="large"></Input>
              </FormItem>
              <FormItem label="签入时间" prop="moveInDate">
                <DatePicker v-model="lookDetailsModel.moveInDate" type="date" :editable="false" placement="top-start" placeholder="请选择签入时间！" :style="width" size="large"></DatePicker>
              </FormItem>
              <FormItem label="账号" prop="openingBankNo">
                <Input v-model="lookDetailsModel.openingBankNo" type="text" placeholder="请输入账号！" :style="width"  size="large"></Input>
              </FormItem>
              <FormItem label="开户名称" prop="openingName">
                <Input v-model="lookDetailsModel.openingName" type="text" placeholder="请输入开户名称！" :style="width"  size="large"></Input>
              </FormItem>
              <FormItem label="开户行" prop="openingBank">
                <Input v-model="lookDetailsModel.openingBank" type="text" placeholder="请输入开户行！" :style="width"  size="large"></Input>
              </FormItem>
            </Tab-pane>
            <Tab-pane label="客户分配记录" name="2" >
              <div class="table-item">
                <Table border :stripe="true" :columns="columns1" :data="data1" ></Table>
                <!-- 公共page分页类 -->
                <div class="page-item">
                  <Page :total="totallPages1"  show-total show-sizer @on-change="changePages1" @on-page-size-change="changePagesTotal2"></Page>
                </div>
              </div>
            </Tab-pane>
          </Tabs>
        </Form>
      </div>
      <div slot="footer">
        <!--<Button type="text" size="large" @click="cancel">取消</Button>-->
        <!--<Button type="primary" size="large" @click="">确定</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
  import store from '../../store/index'
  export default{
    name:'outsideCompanyManage',
    data(){
      // 验证规则
      const cellNum = (rule, value, callback) => {
        if (value.length>60) {
          callback(new Error('不能超过60个字符！'));
        }else{
          callback();
        }
      };
      const cellPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码！'));
        } else if (!this.expReg.aa.test(value)) {
          callback(new Error('手机号码格式不正确!'));
        } else {
          callback();
        }
      };
      return{
        value1:'1',
        title:'委外公司管理',
        rotate:true,
        tab:'1',//tabs切换默认页
        select3:'1',
        totallPages:0,
        totallPages1:0,
        addOutsideCompany:false,
        lookDetails:false, // 查看弹框
        loading:true,
        edit:false,
        width:{'width':'388px'},
        maxLength:60,
        distList:{//下拉菜单数据汇集
          province:[]
        },
        formData:{//筛选字段
          pageIndex:'1',
          pageSize:'10',
          name:'',
          moveInDateStart:'',
          moveInDateEnd:''

        },
        addOutsideCompanyModel:{//添加委外公司和修改委外公司字段
          name:'',
          telNumber:'',
          areaName:'',
          address:'',
          // createDate:'',
          moveInDate:'',
          openingBankNo:'',
          openingName:'',
          openingBank:''
        },
        ruleValidate:{//添加及修改委外公司字段验证
          name:[{required:true,message:'公司名称必填！'},{validator:cellNum,trigger: 'blur'}],
          telNumber:[{required:true,message:'联系人电话必填！'},{validator:cellPhone,trigger: 'blur'}],
          areaName:[{required:true,message:'公司属地必选！'}],
          address:[{required:true,message:'地址必填！'},{validator:cellNum,trigger: 'blur'}],
          createUser:[{required:true,message:'创建人必填！'},{validator:cellNum,trigger: 'blur'}],
          // createDate:[{required:true,message:'创建时间必填！'}],
          moveInDate:[{required:true,message:'签入时间必填！'}],
          openingBankNo:[
            {required:true,message:'账号必填！'},
            { type: 'number', message: '请输入数字格式', trigger: 'blur', transform(value) {
                return Number(value);
              }},
            {validator:cellNum,trigger: 'blur'}
          ],
          openingName:[{required:true,message:'开户名称必填！'},{validator:cellNum,trigger: 'blur'}],
          openingBank:[{required:true,message:'开户行必填！'},{validator:cellNum,trigger: 'blur'}],
        },
        ruleValidateFilter:{//筛选字段验证
          name:[{required:false,message:'公司名称！'},{ validator:cellNum,trigger: 'blur'}],
        },
        lookDetailsModel:{//查看委外公司信息字段
          name:'',
          telNumber:'',
          address:'',
          moveInDate:'',
          areaNo:'',
          openingBankNo:'',
          openingName:'',
          openingBank:'',
        },
        getLookdetails:{//查看委外公司信息-->客户分配记录翻页
          pageIndex:'1',
          pageSize:'10'
        },
        columns:[
          {
            title: '序号',minWidth:80,type:'index'
          },
          {
            title: '公司名称',minWidth:120,key: 'name',
          },{
            title: '地址',minWidth:100,key: 'address',
          },{
            title: '签入时间',minWidth:100,key: 'moveInDate',
          },{
            title: '属地',minWidth:100,key: 'areaName',
          },{
            title: '创建人',minWidth:100,key: 'createUserName',
          },{
            title: '创建时间',minWidth:100,key: 'createDate',
          },{
            title: '操作',
            minWidth:150,
            key: 'number',
            fixed:'right',
            render:(h,params)=>{
            	if(this.getAuth('03000010302')){
              return h('div',[
                h('i-switch',{
                  props:{
                    size:'large',
                    value:params.row.status == 1 ? true : false,
                    disabled:this.lookDetails|| this.addOutsideCompany
                  },
                  style:{
                    marginRight:'5px'
                  },
                  on:{
                    'on-change':(bol)=>{
                      this.outsideCompanyDel(bol,params);
                    }
                  }
                },[
                  h('span',{
                    slot:'open'
                  },'启用'),
                  h('span',{
                    slot:'close'
                  },'禁用')
                ]),])
              }
            	if(this.getAuth('03000010303') || this.getAuth('03000010304') ||this.getAuth('03000010305')){
	             	return h('div',[
	                h('Dropdown',{
	                  props:{
	                    trigger:'click',
	                    placement:"bottom-end",
	                  },
	                  on:{
	                    'on-click':(name)=>{
	                      if(name=='1'){
	                        this.editOutsideCompany(params);
	                      }else if(name=='2'){
	                        this.deleteOutsideCompany(params)
	                      }else{
	                        this.lookdetailsInfo(params);
	                      }
	                    }
	                  }
	                },[
	                  h('Button',{
	                    props:{
	                      size:'small',
	                      type:'info',
	                      disabled:this.lookDetails|| this.addOutsideCompany
	                    }
	                  },[
	                    h('span','更多'),
	                    h('Icon',{
	                      props:{
	                        type:'ios-arrow-down'
	                      },
	                      style:{
	                        marginLeft:'5px'
	                      }
	                    })
	                  ]),
	                  h('DropdownMenu',{
	                    slot:'list'
	                  },[
	                    h('DropdownItem',{
	                      props:{name:'1'},
	                      style:{
	                      	display:this.getAuth('03000010303') ? 'block' : 'none'
	                      }
	                    },'修改'),
	                    h('DropdownItem',{
	                      props:{name:'2'},
	                      style:{
	                      	display:this.getAuth('03000010304') ? 'block' : 'none'
	                      }
	                    },'删除'),
	                    h('DropdownItem',{
	                      props:{name:'3'},
	                      style:{
	                      	display:this.getAuth('03000010305') ? 'block' : 'none'
	                      }
	                    },'查看'),
	                  ])
	
	                ])
	              ])
             	}
            }
          },
        ],
        datas:[

        ],
        columns1: [
          {
            title: '序号',
            minWidth:120,
            type:'index'
          },
          {
            title: '客户姓名',
            minWidth:120,
            key: 'loanName'
          },
          {
            title: '合同金额',
            minWidth:120,
            key: 'loanAmount'
          },
          {
            title: '合同期数',
            minWidth:120,
            key: 'loanTerm'
          },
          {
            title: '产品类型',
            minWidth:120,
            key: 'productType'
          },
          {
            title: '省份',
            minWidth:120,
            key: 'province'
          },
          {
            title: '商户信息',
            minWidth:120,
            key: 'merchantInfo'
          },
          {
            title: '逾期等级',
            minWidth:120,
            key: 'overLevel'
          },
          {
            title: '一次性结清金额',
            minWidth:120,
            key: 'oneceRepay'
          },
          {
            title: '案件状态',
            minWidth:120,
            key: 'caseType'
          },
          {
            title: '委外逾期天数',
            minWidth:120,
            key: 'entrustCompanyName'
          },
          {
            title: '期初逾期天数',
            minWidth:120,
            key: 'entrustOverdueDays'
          },
          {
            title: '案件分配日期',
            minWidth:120,
            key: 'beginOverdueDays'
          },
          {
            title: '委外结束日期',
            minWidth:160,
            key: 'allocationCaseDate'
          }
        ],
        data1: [

        ]
      }
    },
    methods:{
      init(){
        const _=this;
        _.outsidecaseData();//委外公司列表
      },
      outsidecaseData(page,pagesize){//查询列表
        const _=this;
        _.formData.pageIndex = page || _.formData.pageIndex;
        _.formData.pageSize = pagesize || _.formData.pageSize;

        _.HttpAjax('post','listCompany', _.formData,(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          if(res && res.data.status == '200'){
            _.totallPages=res.data.data.dataCount;
            _.datas = res.data.data.data;
          }
        });
      },
      changePages(name){//翻页-->第几页
        this.outsidecaseData(name);
      },
      changePagesTotall(name){//每一页显示多少条数据
        this.formData.pageSize = name;
        this.outsidecaseData('',name);
      },
      changePages1(name){//客户分配记录-->翻页-->第几页
        this.getLookdetailsInfo1(name);
      },
      changePagesTotal2(name){//客户分配记录-->翻页-->每一页显示多少条数据
        this.getLookdetails.pageSize = name;
        this.getLookdetailsInfo1('',name);
      },
      cancel(){//取消
        this.addOutsideCompany = false;
      },
      addoutsidecompany(){//添加委外公司模态框
        this.addOutsideCompany = true;
        this.edit =false;
        this.$refs['addOutsideCompanyModel'].resetFields();
      },
      editOutsideCompany(row){//修改委外公司信息回显
        this.addOutsideCompany = true;
        this.$refs['addOutsideCompanyModel'].resetFields();
        this.edit =true;
        for(let i in this.addOutsideCompanyModel){
          this.addOutsideCompanyModel[i] = row.row[i];
        }
        this.addOutsideCompanyModel.idKey = row.row.idKey;

      },
      addOutsideCompanyMethod(name){//添加/修改方法
        const _=this;
        _.$refs[name].validate((valid) => {
          if (valid) {
            if(!_.edit){
              _.HttpAjax('post','outcompanyAdd',_.addOutsideCompanyModel,(res)=>{//添加方法
                store.commit('UPDATE_LOADINGSTATE',false);
                if(res && res.data.status == '200'){
                  _.$Notice.success({
                    title:'成功',
                    desc:'添加委外公司成功！',
                    duration:2
                  });
                  _.addOutsideCompany = false;
                  _.init();
                }
              })
            }else{
              _.HttpAjax('post','outcompanyUpdate',_.addOutsideCompanyModel,(res)=>{//修改方法
                store.commit('UPDATE_LOADINGSTATE',false)
                if(res && res.data.status == '200'){
                  _.$Notice.success({
                    title:'成功',
                    desc:'修改委外公司成功！',
                    duration:2
                  });
                  _.addOutsideCompany = false;
                  _.init();
                }
              });
            }
          }
        });
      },
      deleteOutsideCompany(list){//删除委外公司
        const _ =this;
        _.$Modal.confirm({
          title:'删除用户',
          content:'确定删除 '+list.row.name+' 这个公司吗？',
          onOk:()=>{
            _.HttpAjax('post','outcompanyDelete',{companyId:list.row.idKey},(res)=>{
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                _.$Notice.success({
                  title:'成功',
                  desc:'删除成功！',
                  duration:2
                });
                _.init();
              }
            });
          }
        })

      },
      outsideCompanyDel(bol,row){//启用禁用
        const _= this;
        if(bol){
          _.HttpAjax('post','outcompanyRedisable',{companyId:row.row.idKey},(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false)
            if(res && res.data.status == '200'){//启用
              _.$Notice.success({
                title:'成功',
                desc:'启用成功！',
                duration:2
              });
              _.init();
            }
          })
        }else{
          _.HttpAjax('post','outcompanyDisable',{companyId:row.row.idKey},(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false)
            if(res && res.data.status == '200'){//禁用
              _.$Notice.success({
                title:'成功！',
                desc:'禁用成功！',
                duration:2
              });
              _.init();
            }
          })
        }
      },
      restData(){//重置
        const _ = this;
        _.$refs['formData'].resetFields();
        for(let i in _.formData) { //置空，除了pageIndex和pageSize
          if(i != 'pageIndex' && i != 'pageSize') {
            _.formData[i] = '';
          }
        }
      },
      lookdetailsInfo(row){//查看委外公司信息模态框
        this.lookDetails=true;
        this.getLookdetailsInfo(row);
        this.saveRow=row;
      },
      getLookdetailsInfo(row) {//查看委外公司信息
        const _ = this;
        // _.HttpAjax('post', 'lookdetailsInfo', {companyId: row.row.idKey}, (res) => {
        //   store.commit('UPDATE_LOADINGSTATE', false)
        //   for (let i in this.lookDetailsModel) {
        //     _.lookDetailsModel[i] = row.row[i];
        //   }
        // })
        for (let i in this.lookDetailsModel) {
          _.lookDetailsModel[i] = row.row[i];
        }
      },
      getLookdetailsInfo1(row,page,pagesize) {//查看委外公司信息-->客户分配表
        const _ = this;
        _.getLookdetails.pageIndex = page || _.getLookdetails.pageIndex;
        _.getLookdetails.pageSize = page || _.getLookdetails.pageSize;
        _.getLookdetails.comId=row.row.idKey;
        _.HttpAjax('post','recordList', _.getLookdetails,(res)=>{//
          store.commit('UPDATE_LOADINGSTATE',false)
          if(res && res.data.status == '200'){
            _.totallPages1=res.data.data.dataCount;
            _.data1 = res.data.data.data;
          }
        })
      },
      tabActive(name){//切换tab页
        const _=this;
        _.tab=name;
        if(name == '1'){

        }else{
          if(_.data1.length==0){
            _.getLookdetailsInfo1(_.saveRow)
          }else{

          }
        }
      },
      closed(){//关闭模态框，数据清空
        this.tab='1';
        this.data1=[];
      },
      getListDict(label){//下拉菜单列表
        const _=this;
        _.HttpAjax('post','distList',{label:label},(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          if(res&&res.data.status=='200'){
            switch (label){
              case 'province':
                _.distList.province=res.data.data;
                break;
            }
          }
        })
      },
      // dateChange(val){
      //   this.addOutsideCompanyModel.createDate = val;
      // },
      dateChange1(val){//签入时间转化
        this.addOutsideCompanyModel.moveInDate = val;
      },
      dateChange2(val){//签入开始时间转化
        this.formData.moveInDateStart = val;
      },
      dateChange3(val){//签入结束时间转化
        this.formData.moveInDateEnd = val;
      },
      refresh(){//刷新
        this.outsidecaseData();
      },
    },
    created(){

    },
    mounted(){
      this.init();
      this.getListDict('province');//属地
    }
  }
</script>

<style lang="less">
  .modalTip1{
    .ivu-modal{
      width: 1200px !important;
      .ivu-modal-content{
        width: 1200px !important;
        .ivu-modal-body{
          overflow: visible;
          .from-item .ivu-tabs{
            overflow: visible;
          }
        }
      }
    }
  }
  .ivu-icon:hover{
    cursor: pointer;
  }

</style>
