<template>
  <div class="breakdownLog">
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
            <Form label-position="right" :label-width="110" inline  :model="formData" ref="formData">
              <FormItem >
                <Input type="text" :placeholder="placeholder"  v-model="indexData"  size="large" style="margin-left: -110px">
                <Select slot="prepend" style="width: 110px"  v-model="indexSelect" @on-change="clickme">
                  <Option value="1">姓名</Option>
                  <Option value="2">身份证号码</Option>
                  <Option value="3">合同号</Option>
                </Select>
                </Input>
              </FormItem>
              <FormItem label="部门" prop="data1">
                <Select  placeholder="请选择！"   size="large" v-model="formData.data1">

                </Select>
              </FormItem>
              <FormItem label="团队" prop="data2">
                <Select  placeholder="请选择！"   size="large" v-model="formData.data2">
                  <Option value="1">团队</Option>
                  <Option value="2">团队</Option>
                </Select>
              </FormItem>
              <FormItem label="小组" prop="data3">
                <Select  placeholder="请选择！"   size="large" v-model="formData.data3">

                </Select>
              </FormItem>
              <FormItem label="员工" prop="data4">
                <Select  placeholder="请选择！"   size="large" v-model="formData.data4">
                  <Option value="1">员工</Option>
                  <Option value="2">员工</Option>
                </Select>
              </FormItem>
              <FormItem label="分案开始日期" prop="data5">
                <DatePicker v-model="formData.data5" :editable="false" type="month"  placeholder="请选择分案开始日期！"  size="large"></DatePicker>
              </FormItem>
              <FormItem label="分案结束日期" prop="data6">
                <DatePicker v-model="formData.data6" :editable="false" type="month"  placeholder="请选择分案结束日期！"  size="large"></DatePicker>
              </FormItem>
              <FormItem label="报表统计周期及时效" prop="data7">
                <Select  placeholder="请选择！"   size="large" v-model="formData.data7">
                  <Option value="1">没看懂</Option>
                </Select>
              </FormItem>
              <FormItem style="margin-left: -110px;">
                <Button type="primary" icon="plus-circled" @click.prevent="">筛选</Button>
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
        <Page :total="100" show-sizer></Page>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "breakdownLog",
      data(){
          return {
            value1:'1',
            title:'分案明细日志追踪表',
            rotate:true,
            placeholder:"请输入客户姓名！",
            indexData:'',
            indexSelect:'1',
            formData:{
              data1:'',
              data2:'',
              data3:'',
              data4:'',
              data5:'',
              data6:'',
              data7:'',
            },
            columns:[
              {
                title: '账户合同号',minWidth:120,type:'index'
              },
              {
                title: '分案-对应阶段',minWidth:120,key: '1',
              },
              {
                title: '团队',minWidth:120,key: '2',
              },
              {
                title: '小组',minWidth:120,key: '3',
              },
              {
                title: '员工',minWidth:120,key: '4',
              },
              {
                title: '分案-日期',minWidth:120,key: '5',
              },
              {
                title: '分案-应还款日期',minWidth:120,key: '6',
              },
              {
                title: '分案-逾期期数',minWidth:120,key: '7',
              },
              {
                title: '分案-逾期天数',minWidth:120,key: '8',
              },
              {
                title: '分案-逾期等级',minWidth:120,key: '9',
              },
              {
                title: '分案-应还合同额',minWidth:120,key: '10',
              },
              {
                title: '分案-应还逾期罚息',minWidth:120,key: '11',
              },
              {
                title: '分案-逾期总额',minWidth:120,key: '12',
              },
              {
                title: '分案-剩余本金',minWidth:120,key: '13',
              },
              {
                title: '月还款金额',minWidth:120,key: '14',
              },
              {
                title: '当前-逾期期数',minWidth:120,key: '15',
              },
              {
                title: '当前-逾期天数',minWidth:120,key: '16',
              },
              {
                title: '当前逾期等级',minWidth:120,key: '17',
              },
              {
                title: '是否催收成功',minWidth:120,key: '18',
              },
              {
                title: '催收成功日期',minWidth:120,key: '19',
              },
              {
                title: '实际回收金额',minWidth:120,key: '20',
              },
              {
                title: '实际回收罚息金额',minWidth:120,key: '21',
              },
              {
                title: '是否全款结清',minWidth:120,key: '22',
              },
              {
                title: '产品',minWidth:120,key: '23',
              },
              {
                title: '销售部、区域、城市',minWidth:180,key: '24',
              },



            ],
            datas:[

            ],
          }
      },
      methods:{
        init(){

        },
        clickme(name){
          const _=this;
          _.indexData = '';
          switch(name){
            case '1':
              this.placeholder='请输入姓名！';
              break;
            case '2':
              this.placeholder='请输入身份证号！';
              break;
            case '3':
              this.placeholder='请输入合同号！';
              break;
          }
        },
        restData(){//重置
          const _ = this;
          _.$refs['formData'].resetFields();
          _.indexData = '';
        }
      },
      created(){

      },
      mounted(){
        this.init();
      }
    }
</script>

<style scoped>

</style>
