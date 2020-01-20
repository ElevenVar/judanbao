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
            <Form label-position="right" :label-width="110" inline :model="formData" :rules="ruleValidate" ref="formData">
              <FormItem class="block-tip">
                <Select size="large" class="prepend" v-model="formIndex">
                  <Option value="0">合同编号</Option>
                  <Option value="1">姓名</Option>
                  <Option value="2">主体</Option>
                  <Option value="3">产品类型</Option>
                  <Option value="4">逾期等级</Option>
                  <Option value="5">所属委外公司</Option>
                </Select>
                <Input v-if="formIndex == 0" type="text" placeholder="请输入合同编号！"  v-model="formData.loanContractNo"  size="large"></Input>
                <Input v-if="formIndex == 1" type="text" placeholder="请输入姓名！"  v-model="formData.loanName"  size="large"></Input>
                <Select v-if="formIndex == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody" placeholder="请选择主体！" size="large">
                  <Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex == 3" @on-open-change='getProductTypeList' v-model="formData.productTypeNo" placeholder="请选择产品类型！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
                </Select>
                <Select v-if="formIndex == 4" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData.overdueGrade" placeholder="请选择逾期等级！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex == 5" @on-open-change='getWwCompanyList' v-model="formData.entrustCompanyNo" placeholder="请选择所属委外公司！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
                </Select>
              </FormItem>

              <FormItem class="block-tip">
                <Select size="large" class="prepend" v-model="formIndex1">
                  <Option value="0">合同编号</Option>
                  <Option value="1">姓名</Option>
                  <Option value="2">主体</Option>
                  <Option value="3">产品类型</Option>
                  <Option value="4">逾期等级</Option>
                  <Option value="5">所属委外公司</Option>
                </Select>
                <Input v-if="formIndex1 == 0" type="text" placeholder="请输入合同编号！"  v-model="formData.loanContractNo"  size="large"></Input>
                <Input v-if="formIndex1 == 1" type="text" placeholder="请输入姓名！"  v-model="formData.loanName"  size="large"></Input>
                <Select v-if="formIndex1 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody" placeholder="请选择主体！" size="large">
                  <Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex1 == 3" @on-open-change='getProductTypeList' v-model="formData.productTypeNo" placeholder="请选择产品类型！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
                </Select>
                <Select v-if="formIndex1 == 4" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData.overdueGrade" placeholder="请选择逾期等级！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex1 == 5" @on-open-change='getWwCompanyList' v-model="formData.entrustCompanyNo" placeholder="请选择所属委外公司！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
                </Select>
              </FormItem>

              <FormItem class="block-tip">
                <Select size="large" class="prepend" v-model="formIndex2">
                  <Option value="0">合同编号</Option>
                  <Option value="1">姓名</Option>
                  <Option value="2">主体</Option>
                  <Option value="3">产品类型</Option>
                  <Option value="4">逾期等级</Option>
                  <Option value="5">所属委外公司</Option>
                </Select>
                <Input v-if="formIndex2 == 0" type="text" placeholder="请输入合同编号！"  v-model="formData.loanContractNo"  size="large"></Input>
                <Input v-if="formIndex2 == 1" type="text" placeholder="请输入姓名！"  v-model="formData.loanName"  size="large"></Input>
                <Select v-if="formIndex2 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody" placeholder="请选择主体！" size="large">
                  <Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex2 == 3" @on-open-change='getProductTypeList' v-model="formData.productTypeNo" placeholder="请选择产品类型！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
                </Select>
                <Select v-if="formIndex2 == 4" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData.overdueGrade" placeholder="请选择逾期等级！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex2 == 5" @on-open-change='getWwCompanyList' v-model="formData.entrustCompanyNo" placeholder="请选择所属委外公司！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
                </Select>
              </FormItem>

              <FormItem class="block-tip">
                <Select size="large" class="prepend" v-model="formIndex3">
                  <Option value="0">合同编号</Option>
                  <Option value="1">姓名</Option>
                  <Option value="2">主体</Option>
                  <Option value="3">产品类型</Option>
                  <Option value="4">逾期等级</Option>
                  <Option value="5">所属委外公司</Option>
                </Select>
                <Input v-if="formIndex3 == 0" type="text" placeholder="请输入合同编号！"  v-model="formData.loanContractNo"  size="large"></Input>
                <Input v-if="formIndex3 == 1" type="text" placeholder="请输入姓名！"  v-model="formData.loanName"  size="large"></Input>
                <Select v-if="formIndex3 == 2" @on-open-change="getListDict($event,'mainBody')" v-model="formData.mainBody" placeholder="请选择主体！" size="large">
                  <Option :value="item.type" v-for="(item,index) in distList.mainBody" :key="index">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex3 == 3" @on-open-change='getProductTypeList' v-model="formData.productTypeNo" placeholder="请选择产品类型！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryProductTypeList" :value="item.productTypeNo">{{item.productTypeName}}</Option>
                </Select>
                <Select v-if="formIndex3 == 4" @on-open-change="getListDict($event,'overdueGrade')" v-model="formData.overdueGrade" placeholder="请选择逾期等级！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.overdueGrade" :value="item.type">{{item.value}}</Option>
                </Select>
                <Select v-if="formIndex3 == 5" @on-open-change='getWwCompanyList' v-model="formData.entrustCompanyNo" placeholder="请选择所属委外公司！"   size="large">
                  <Option :key="index" v-for="(item,index) in distList.queryWwCompanyList" :value="item.idKey">{{item.name}}</Option>
                </Select>
              </FormItem>

              <FormItem style="margin-left: -110px;">
                <Button type="primary" icon="plus-circled" @click.prevent="doneoutsidecase()">查询</Button>
                <Button  @click="restData()"><Icon type="navicon-round"></Icon> 重置</Button>
                <Button  @click=""><Icon type="navicon-round"></Icon> 导出数据</Button>
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
  </div>
</template>

<script>
  import store from '../../store/index'
  export default{
    name:'doneOutsideCase',
    data(){
      // 验证规则
      const cellName = (rule, value, callback) => {
        if (value.length>60) {
          callback(new Error('不能超过60个字符！'));
        }else{
          callback();
        }
      };
      return{
        value1:'1',
        title:'我已完成的案件',
        rotate:true,
        select3:'1',
        totallPages:0,
        maxLength:60,
        formIndex:'0',
        formIndex1:'0',
        formIndex2:'0',
        formIndex3:'0',
        placeholder:"请输入合同编号！",
        formData:{//筛选字段
          pageIndex:'1',
          pageSize:'10',
          loanContractNo:'',
          loanName:'',
          mainBody:'',
          productTypeNo:'',
          overdueGrade:'',
          entrustCompanyNo:''
        },
        distList:{//下拉菜单数据汇集
          mainBody:[],
          overdueGrade:[],
          queryProductTypeList:[],
          queryWwCompanyList:[],
        },
        ruleValidate:{//筛选验证
          loanContractNo:[
            {required:false,message:'合同编号！'},
            { type: 'number', message: '请输入数字格式', trigger: 'blur', transform(value) {
                return Number(value);
              }},
          ],
          loanName:[
            {required:false,message:'姓名！'},
            { validator:cellName,trigger: 'blur'}
          ],
        },
        columns:[
          // {
          //   title: '全选',type: 'selection',Width:50,fixed:'left',align:'center',
          // },
          {
            title: '合同编号',minWidth:120,key: 'loanContractNo',
          },{
            title: '所属营业部',minWidth:120,key: 'subCompanyNo'
          },{
            title: '省份',minWidth:100,key: 'areaName'
          },{
            title: '姓名',minWidth:100,key: 'loanName',
          },{
            title: '主体',minWidth:100,key: 'mainBody',
          },{
            title: '产品类型',minWidth:100,key: 'productTypeNo',
          },{
            title: '合同期数',minWidth:100,key: 'loanBill',
          },{
            title: '案件状态',minWidth:150,key: 'caseStatusNo',
          },{
            title: '逾期等级',minWidth:100,key: 'overdueGrade',
          },{
            title: '已还金额',minWidth:130,key: 'paidAllAmount',
          },{
            title: '所属委外公司',minWidth:150,key: 'entrustCompanyNo',
          },{
            title: '案件分配日期',minWidth:140,key: 'allocationCaseDate',
          },{
            title: '委案结束日期',minWidth:140,key: 'closureCaseDate',
          },{
            title: '操作',
            minWidth:100,
            key: 'number',
            fixed:'right',
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                  props:{
                    size:'small',
                    type:'info',
                  },
                  on:{
                    click:()=>{
                      this.$router.push({path:'finishDetail',query: { showBtn: 'private'}})
                    }
                  }
                },'详情')
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
        _.doneoutsidecase();//列表初始化
      },
      doneoutsidecase(page,pagesize){//列表初始化及筛选
        const _=this;
        _.formData.pageIndex = page || _.formData.pageIndex;
        _.formData.pageSize = pagesize || _.formData.pageSize;

        _.HttpAjax('post','listOverCase', _.formData,(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          if(res && res.data.status == '200'){
            _.totallPages=res.data.data.dataCount;
            _.datas = res.data.data.data;
          }else{
            _.$Notice.error({
              title:'请求发生错误！',
              desc:res.data.message
            })
          }
        });
      },
      changePages(name){//翻页-->第几页
        this.doneoutsidecase(name);
      },
      changePagesTotall(name){//每一页显示多少条数据
        this.formData.pageSize = name;
        this.doneoutsidecase('',name);
      },
      refresh(){//刷新
        this.doneoutsidecase();
      },
      restData(){//重置
        const _ = this;
        _.$refs['formData'].resetFields();

        for(let i in _.formData){
          if(i != 'pageIndex' && i != 'pageSize'){
            _.formData[i] = '';
          }
        }
      },
      getListDict(bol,label){//所有下拉列表
        const _=this;
        if(bol){
          if(_.distList[label].length == 0){
            _.HttpAjax('post','distList',{label:label},(res)=>{
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                switch(label){
                  case 'mainBody'://主体
                    _.distList.mainBody = res.data.data;
                    break;
                  case 'overdueGrade'://逾期等级
                    _.distList.overdueGrade = res.data.data;
                    break;
                }
              }
            });
          }
        }
      },
      getWwCompanyList(bol){//委外公司下拉列表
        const _=this;
        if(bol){
          if(_.distList.queryWwCompanyList.length == 0){
            _.HttpAjax('post','queryWwCompanyList',{},(res)=>{
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                _.distList.queryWwCompanyList = res.data.data;//委外公司管理
              }
            })
          }
        }

      },
      getProductTypeList(bol){//产品类型下拉列表
        const _=this;
        if(bol){
          if(_.distList.queryProductTypeList.length == 0){
            _.HttpAjax('post','queryProductTypeList',{},(res)=>{
              store.commit('UPDATE_LOADINGSTATE',false);
              if(res && res.data.status == '200'){
                _.distList.queryProductTypeList = res.data.data;//产品类型
              }
            })
          }
        }
      },
    },
    created(){

    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang="less">
  .block-tip.ivu-form-item{
    margin-left: -110px;
    .ivu-select.prepend{
      width:110px;
      text-align: center;
      .ivu-select-selection{
        width: 110px;
        background-color: #FBFBFB;
      }
    }
    .ivu-input-wrapper,.ivu-select{
      width:250px;
      margin-left: -4px;
    }
  }
  .ivu-icon:hover{
    cursor: pointer;
  }
</style>
