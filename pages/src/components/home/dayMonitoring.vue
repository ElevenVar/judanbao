<template>
    <div class="dayMonitoring">
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
            <div class="from-item this-from-item">
              <Form label-position="right" :label-width="110" inline  :model="formData" :rules="ruleValidate" ref="formData">
                <FormItem label="电话码" prop="actionCode">
                  <Select  @on-open-change="getListDict($event,'phoneCode')" v-model="formData.actionCode" placeholder="请输入电话码！"  size="large">
                    <Option :key="index" v-for="(item,index) in distList.phoneCode" :value="item.type">{{item.value}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="合同号" prop="loanContractNo">
                  <Input type="text" v-model="formData.loanContractNo" :maxlength="50" placeholder="请输入合同号！" size="large"></Input>
                </FormItem>
                <FormItem label="操作人" prop="creator">
                  <Input  type="text" v-model="formData.creator" :maxlength="16" placeholder="请输入操作人！" size="large"></Input>
                </FormItem>
                <FormItem label="跟呼时间" prop="startFollowCallTime">
                  <DatePicker  type="datetime" :options="disTimme" @on-change='dateChange' :editable="false"  v-model="formData.startFollowCallTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择跟呼开始时间" class="followcallTime"></DatePicker>
                </FormItem>
                <FormItem  prop="endFollowCallTime">
                  -
                  <DatePicker  type="datetime" :options="disTimme" @on-change='dateChange1' :editable="false"  v-model="formData.endFollowCallTime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择跟呼结束时间" class="followcallTime"></DatePicker>
                </FormItem>
                <FormItem style="margin-left: -110px;">
                  <Button type="primary" icon="plus-circled" @click="dayMonitor1()">查询</Button>
                  <Button @click="restData()" icon="plus-circled">重置</Button>
                  <Button v-if="this.getAuth('11000010101')" @click="exportExcel" icon="plus-circled">导出数据</Button>
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
  import qs from 'qs'
    export default {
        name: "dayMonitoring",
      data(){
        // 验证规则
        const disabledChinese = (rule, value, callback) => {
         if(value != ''){
           if (!value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'')) {
             callback(new Error('不能输入中文！'));
           }else{
             callback();
           }
         }else{
           callback();
         }
        };
        const startSignInTime1 = (rule, value, callback) => {
          let dateTime = this.formData.endFollowCallTime;
          if(dateTime != ''){
            if(new Date(value).getTime() >= new Date(dateTime).getTime()) {
              callback(new Error('跟呼开始时间要小于跟呼结束时间！'));
            } else {
              callback();
            }
          }else{
            callback();
          }
        };
        const endSignInTime1 = (rule, value, callback) => {
          let dateTime = this.formData.startFollowCallTime;
          if(dateTime != ''){
            if(new Date(value).getTime() <= new Date(dateTime).getTime()) {
              callback(new Error('跟呼结束时间要大于跟呼开始时间！'));
            } else {
              callback();
            }
          }else{
            callback();
          }
        };

          return {
            value1:'1',
            title:'当日监控',
            rotate:true,
            totallPages:0,
            disTimme:{
              disabledDate (date) {
                return date && date.valueOf() > Date.now();
              }
            },
            formData:{
              pageIndex:'1',
              pageSize:'10',
              loanContractNo:'',
              actionCode:'',
              creator:'',
              startFollowCallTime:'',
              endFollowCallTime:''
            },
            ruleValidate:{
              loanContractNo:[{required:false,message:'请输入合同编号！'},{validator:disabledChinese,trigger: 'blur'}],
              actionCode:[{required:false,message:'请选择电话码！'}],
              creator:[{required:false,message:'请输入操作人！'}],
              startFollowCallTime:[{required:false,message:'请输入开始时间！'},{validator:startSignInTime1,trigger:'change'}],
              endFollowCallTime:[{required:false,message:'请输入结束时间！'},{validator:endSignInTime1,trigger:'change'}],
            },
            distList:{
              phoneCode:[]
            },
            columns:[
              {
                title: '序号',
                minWidth:120,
                type:'index'
              },
              {
                title: '案件合同号',
                minWidth:120,
                key: 'loanContractNo'
              },
              {
                title: '电话码',
                minWidth:120,
                key: 'actionCode'
              },
              {
                title: '行动码',
                minWidth:120,
                key: 'resultCode'
              },
              {
                title: '案件等级',
                minWidth:120,
                key: 'caseGrade'
              },
              /* {
                title: '联络电话',
                minWidth:120,
                key: 'contactNumber'
              }, */
              {
                title: '跟呼时间',
                minWidth:120,
                key: 'followCallTime'
              },
              {
                title: '联络人',
                minWidth:120,
                key: 'contactPerson'
              },
              {
                title: '操作人',
                minWidth:120,
                key: 'creator'
              },
            ],
            datas:[],
          }
      },
      methods:{
          init(){
            const _=this;
            _.dayMonitor();
						this.selectMonitoringRecordCount()
          },
        dayMonitor(page,pagesize){//当日监控list
          const _=this;
          _.formData.pageIndex = page || _.formData.pageIndex;
          _.formData.pageSize = pagesize || _.formData.pageSize;
          _.HttpAjax('post','selectMonitoringRecord', _.formData,(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false);
            if(res && res.data.status == '200'){             
              _.datas = res.data.data.data;
            }
          });
        },
				// 当日监控 查询总条数
				selectMonitoringRecordCount(page,pagesize){
					this.formData.pageIndex = page || this.formData.pageIndex;
					this.formData.pageSize = pagesize || this.formData.pageSize;
					this.HttpAjax('post','selectMonitoringRecordCount',this.formData,(res)=>{
						store.commit('UPDATE_LOADINGSTATE',false);
						if(res && res.data.status == 200){
							this.totallPages=res.data.data
						}
					},'count')
				},
        dayMonitor1(page,pagesize){//当日监控list
          const _=this;
          _.$refs['formData'].validate((valid) => {
            if(valid){
              _.formData.pageIndex = page || _.formData.pageIndex;
              _.formData.pageSize = pagesize || _.formData.pageSize;
              _.HttpAjax('post','selectMonitoringRecord', _.formData,(res)=>{
                store.commit('UPDATE_LOADINGSTATE',false);
                if(res && res.data.status == '200'){
                  _.datas = res.data.data.data;
                }
              });
            }
          });
					this.selectMonitoringRecordCount();
        },
        changePages(name){//翻页-->第几页
          this.dayMonitor(name);
        },
        changePagesTotall(name){//每一页显示多少条数据
          this.formData.pageSize = name;
          this.dayMonitor('',name);
        },
        refresh(){//刷新
          this.dayMonitor();
					this.selectMonitoringRecordCount();
        },
        restData(){//重置
          const _ =this;
          _.$refs['formData'].resetFields();
          for(let i in _.formData){
            if(i != 'pageIndex' && i != 'pageSize'){
              _.formData[i] = '';
            }
          }
        },
        dateChange(val){//跟呼开始时间
          this.formData.startFollowCallTime = val;
        },
        dateChange1(val){//跟呼结束时间
            this.formData.endFollowCallTime = val;
        },
        getListDict(bol,label){//筛选所有下拉列表
          const _=this;
          if(bol){
            if(_.distList[label].length == 0){
              _.HttpAjax('post','distList',{label:label},(res)=>{
                store.commit('UPDATE_LOADINGSTATE',false);
                if(res&&res.data.status=='200'){
                  switch (label){
                    case 'phoneCode':
                      _.distList.phoneCode=res.data.data;
                      break;
                  }
                }
              });
            }
          }
        },
        exportExcel(){//导出
          const _=this;
          _.HttpAjax('post','exportMonitoringRecord', qs.stringify(_.formData),(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false);

            //二进制流文件下载
            this.downLoadFile(res.data,'当日监控.xlsx');

          },'download');
        },
      },
      created(){},
      mounted(){
          this.init()
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
  .followcallTime{
     .ivu-input{
       height: 36px;
       width: 150px !important;
    }

  }
  .this-from-item{
    .ivu-form-item:nth-child(5){
      .ivu-form-item-content{
        margin-left: -10px !important;
      }
    }
  }
</style>
