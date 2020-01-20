<template>
  <div class="Letter">
    <!-- 公共折叠面板类 -->
    <Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
      <Panel name="1">
        <span class="head-commom">信修审核</span>
        <span class="swith head-commom">
                {{rotate ? '收起' : '展开'}}
                <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
              </span>
        <div slot="content">
          <!-- 公共form表单类 -->
          <div class="from-items">
						<!--第0个下拉框-->
						<Form label-position="right" :model='search_data' inline>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value" @on-change="selectChange($event,'0')" @on-open-change="ClearVal($event,'0')">
									<Option value="0" v-show='change_value_tow !=0 && change_value_three!= 0 && change_value_four!= 0'>合同编号</Option>
									<Option value="1" v-show='change_value_tow !=1 && change_value_three!= 1 && change_value_four!= 1'>客户姓名</Option>
									<Option value="2" v-show='change_value_tow !=2 && change_value_three!= 2 && change_value_four!= 2'>联系电话</Option>
									<Option value="3" v-show='change_value_tow !=3 && change_value_three!= 3 && change_value_four!= 3'>证件号码</Option>
									<Option value="4" v-show='change_value_tow !=4 && change_value_three!= 4 && change_value_four!= 4'>停催申请人</Option>
								</Select>
								<Input v-if="change_value === '0'" type="text" placeholder="请输入合同编号"
											v-model="search_data.contractNo" size="large"></Input>
								<Input v-if="change_value === '1'" type="text" placeholder="请输入客户姓名"
											v-model="search_data.customer" size="large"></Input>
								<Input v-if="change_value === '2'" type="text" placeholder="联系电话"
											v-model="search_data.customerPhone" size="large"></Input>
								<Input v-if="change_value === '3'" type="text" placeholder="证件号码"
											v-model="search_data.idNumber" size="large"></Input>
								<Input v-if="change_value === '4'" type="text" placeholder="请输入停催申请人"
											v-model="search_data.creator" size="large"></Input>
							</FormItem>
						</Form>
						<!--第1个下拉框-->
						<Form label-position="right" :model='search_data1' inline>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_tow" @on-change="selectChange($event,'1')" @on-open-change="ClearVal($event,'1')">
									<Option value="0" v-show='change_value !=0 && change_value_three!= 0 && change_value_four!= 0'>合同编号</Option>
									<Option value="1" v-show='change_value !=1 && change_value_three!= 1 && change_value_four!= 1'>客户姓名</Option>
									<Option value="2" v-show='change_value !=2 && change_value_three!= 2 && change_value_four!= 2'>联系电话</Option>
									<Option value="3" v-show='change_value !=3 && change_value_three!= 3 && change_value_four!= 3'>证件号码</Option>
									<Option value="4" v-show='change_value !=4 && change_value_three!= 4 && change_value_four!= 4'>停催申请人</Option>
								</Select>
								<Input v-if="change_value_tow === '0'" type="text" placeholder="请输入合同编号"
																		v-model="search_data1.contractNo" size="large"></Input>
							<Input v-if="change_value_tow === '1'" type="text" placeholder="请输入客户姓名"
										v-model="search_data1.customer" size="large"></Input>
							<Input v-if="change_value_tow === '2'" type="text" placeholder="联系电话"
										v-model="search_data1.customerPhone" size="large"></Input>
							<Input v-if="change_value_tow === '3'" type="text" placeholder="证件号码"
										v-model="search_data1.idNumber" size="large"></Input>
							<Input v-if="change_value_tow === '4'" type="text" placeholder="请输入停催申请人"
										v-model="search_data1.creator" size="large"></Input>
							</FormItem>
						</Form>
						<!--第2个下拉框-->
						<Form label-position="right" :model='search_data2' inline>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_three" @on-change="selectChange($event,'2')" @on-open-change="ClearVal($event,'2')">
									<Option value="0" v-show='change_value_tow !=0 && change_value!= 0 && change_value_four!= 0'>合同编号</Option>
									<Option value="1" v-show='change_value_tow !=1 && change_value!= 1 && change_value_four!= 1'>客户姓名</Option>
									<Option value="2" v-show='change_value_tow !=2 && change_value!= 2 && change_value_four!= 2'>联系电话</Option>
									<Option value="3" v-show='change_value_tow !=3 && change_value!= 3 && change_value_four!= 3'>证件号码</Option>
									<Option value="4" v-show='change_value_tow !=4 && change_value!= 4 && change_value_four!= 4'>停催申请人</Option>
								</Select>
								<Input v-if="change_value_three === '0'" type="text" placeholder="请输入合同编号"
											v-model="search_data2.contractNo" size="large"></Input>
								<Input v-if="change_value_three === '1'" type="text" placeholder="请输入客户姓名"
											v-model="search_data2.customer" size="large"></Input>
								<Input v-if="change_value_three === '2'" type="text" placeholder="联系电话"
											v-model="search_data2.customerPhone" size="large"></Input>
								<Input v-if="change_value_three === '3'" type="text" placeholder="证件号码"
											v-model="search_data2.idNumber" size="large"></Input>
								<Input v-if="change_value_three === '4'" type="text" placeholder="请输入停催申请人"
											v-model="search_data2.creator" size="large"></Input>
							</FormItem>
						</Form>
						<!--第3个下拉框-->
						<Form label-position="right" :model='search_data3' inline>
							<FormItem class="block-tips">
								<Select size="large" class="prepend" v-model="change_value_four" @on-change="selectChange($event,'3')" @on-open-change="ClearVal($event,'3')">
									<Option value="0" v-show='change_value_tow !=0 && change_value_three!= 0 && change_value!= 0'>合同编号</Option>
									<Option value="1" v-show='change_value_tow !=1 && change_value_three!= 1 && change_value!= 1'>客户姓名</Option>
									<Option value="2" v-show='change_value_tow !=2 && change_value_three!= 2 && change_value!= 2'>联系电话</Option>
									<Option value="3" v-show='change_value_tow !=3 && change_value_three!= 3 && change_value!= 3'>证件号码</Option>
									<Option value="4" v-show='change_value_tow !=4 && change_value_three!= 4 && change_value!= 4'>停催申请人</Option>
								</Select>
								<Input v-if="change_value_four === '0'" type="text" placeholder="请输入合同编号"
											v-model="search_data3.contractNo" size="large"></Input>
								<Input v-if="change_value_four === '1'" type="text" placeholder="请输入客户姓名"
											v-model="search_data3.customer" size="large"></Input>
								<Input v-if="change_value_four === '2'" type="text" placeholder="联系电话"
											v-model="search_data3.customerPhone" size="large"></Input>
								<Input v-if="change_value_four === '3'" type="text" placeholder="证件号码"
											v-model="search_data3.idNumber" size="large"></Input>
								<Input v-if="change_value_four === '4'" type="text" placeholder="请输入停催申请人"
											v-model="search_data3.creator" size="large"></Input>
							</FormItem>
						</Form>
            <Form label-position="right" inline>
              <FormItem>
                <Button type="primary" icon="plus-circled" @click="shaixuan" :disabled="refresh_modal||shenhe_modal">查询</Button>
                <Button @click="restData()" :disabled="refresh_modal||shenhe_modal"><Icon type="navicon-round"></Icon> 重置</Button>
                <!--<Button @click="export_info"><Icon type="navicon-round"></Icon>导出数据</Button>-->
                <Button v-if="this.getAuth('05000010401')" @click="batchShenhe" :disabled="refresh_modal||shenhe_modal"><Icon type="navicon-round"></Icon>批量审核</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Panel>
    </Collapse>
    <div class="table-warper">
      <!-- 公共table类-->
      <div class="table-item">
        <Table height='396' border :stripe="true" :columns="columns" :data="datas" @on-selection-change="select_change" ></Table>
      </div>
      <!-- 公共page分页类 -->
      <div class="page-item">
        <Page :total="totallPages"  show-total  show-sizer
              @on-change="changePages"
              @on-page-size-change="changePageSize"
        ></Page>
        <Icon type="ios-refresh"  style="font-size: 30px" @click="refresh"/>
      </div>
    </div>
    <!--Modal 单条审核-->
    <Modal v-model="refresh_modal" :loading="loading" draggable
           :title="this.shenhe_type ===5? '通过':'拒绝'"
    >
      <!-- 公共form表单类 -->
      <div class="from-item">
        <Form label-position="right" :label-width="110" inline>
          <FormItem :label="this.shenhe_type ===5? '通过原因':'拒绝原因'">
            <Input type="textarea" :placeholder="this.shenhe_type ===5? '请输入通过原因':'请输入拒绝原因'"
                   :style="width" size="large"
                   :autosize="{minRows: 5,maxRows: 6}"
                   :maxlength="50"
                   v-model="refresh_info"
            >
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="hiddenModel">取消</Button>
        <Button type="primary" size="large" @click="Submit_refuse_info">提交</Button>
      </div>
    </Modal>
    <!--批量审核-->
    <Modal v-model="shenhe_modal"
           draggable
           :mask-closable="false"
           :scrollable="true"
           :loading="loading" class-name="modalTip" title="选择审核状态"
    >
      <!-- 公共form表单类 -->
      <div class="from-item" style="height:115px;">
        <Form label-position="right" :label-width="120" inline
        >
          <FormItem label="审核状态" prop="status">
            <Select
              @on-change="selectStatus" placeholder="请选择！" :style="width" size="large"
              v-model="shenhe_batch_status"
            >
              <Option value="5">通过</Option>
              <Option value="6">拒绝</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="hidden_batch_modal">取消</Button>
        <Button type="primary" size="large" @click="Submit_batch_info">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import store from '../../store/index'
  import expandTabs from '../common/public_liucheng'
  export default {
    name: "Letter",
    data() {
      return {
        value1: '1',
        rotate: true,
        loading:true,
        width:{'width':'340px'},
        placeholder: "请输入客户姓名！",
        edit: false,
        totallPages:0, //总页数
        datas: [],
        change_value: '0',// 第一个下拉框的默认值
        change_value_tow:'1',// 第二个下拉框的默认值
        change_value_three: '2',// 第三个下拉框的默认值
        change_value_four: '3',//第四个下拉框的默认值
        /*批量审核弹窗*/
        shenhe_modal:false,
        shenhe_info:[], //审核提交的数据
        shenhe_batch_info:[],//批量审核提交的数据
        shenhe_batch_status:'',//审核状态
        /*筛选字段*/
        search_data:{
          contractNo:'',//合同编号
          customer:'', //客户姓名
          customerPhone:'',// 联系电话
          idNumber:'',// 证件号码
          creator: '',//停催申请人
        },
				search_data1:{
					contractNo:'',//合同编号
					customer:'', //客户姓名
					customerPhone:'',// 联系电话
					idNumber:'',// 证件号码
					creator: '',//停催申请人
				},
				search_data2:{
					contractNo:'',//合同编号
					customer:'', //客户姓名
					customerPhone:'',// 联系电话
					idNumber:'',// 证件号码
					creator: '',//停催申请人
				},
				search_data3:{
					contractNo:'',//合同编号
					customer:'', //客户姓名
					customerPhone:'',// 联系电话
					idNumber:'',// 证件号码
					creator: '',//停催申请人
				},
				LastSubmitData:{
					pageIndex:'1',
					pageSize:'10',
				},
        /*拒绝弹窗*/
        refresh_modal:false,// 回退弹窗
        refresh_info: '',// 拒绝理由
        shenhe_info_refuse:{},// 被操作的信息
        shenhe_type: '',
        // 表格展示数据
        columns: [
          {
            type:'selection',
            minWidth:60,
          },
          {
            title: '查看审核流程',
            minWidth: 110,
            type: 'expand',
            render: (h, params) => {
              return h(expandTabs,{
                props:{
                  row:params.row,
                  url:'bcmpBreasySransferData',
                },
              })
            }
          },
          {
            title: '合同编号',
            minWidth: 160,
            key: 'contractNo',
          },
          {
            title: '审核状态',
            minWidth: 120,
            key:'statusOne',
          },
          {
            title: '客户姓名',
            minWidth: 120,
            key: 'customer',
          },
          /* {
            title: '证件号码',
            minWidth: 160,
            key: 'idNumber',
          },
          {
            title: '手机号',
            minWidth: 120,
            key: 'customerPhone',
          }, */
          {
            title: '提交时间',
            minWidth: 120,
            key: 'createTime',
          },
          {
            title: '提交人',
            minWidth: 120,
            key: 'creator',
          },
          {
            title: '操作',
            minWidth: 180,
            key: 'number',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'info',
                    disabled:this.refresh_modal||this.shenhe_modal
                  },
                  style: {
                  	display:this.getAuth('05000010402') ? 'inline-block' :'none',
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.get_refuse_info(params.row,5)
                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'info',
                    disabled:this.refresh_modal||this.shenhe_modal
                  },
                  style: {
                  	display:this.getAuth('05000010403') ? 'inline-block' :'none',
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.get_refuse_info(params.row,6)
                    }
                  }
                }, '拒绝'),
              ])
            }
          },
        ],
      }
    },
    methods: {
      // 默认查询数据
      init(pageIndex,pageSize) {
        this.LastSubmitData.pageSize = pageSize || this.LastSubmitData.pageSize;
        this.LastSubmitData.pageIndex = pageIndex || this.LastSubmitData.pageIndex;
        
        this.HttpAjax('post','queryAuditList',this.LastSubmitData,(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          if(res && res.status ===200){
						this.datas = res.data.data.data;
						this.totallPages= res.data.data.dataCount;
          }
        });
      },
      // 设置要提交的审核数据
      get_refuse_info(row,status){
        this.shenhe_info_refuse= row;
        this.shenhe_type= status;
        this.refresh_modal = true;
      },
      // 提交审核数据（通过，拒绝   单条审核
      Submit_refuse_info(){
        if(this.shenhe_type ===6 && this.refresh_info ===''){
          this.$layer.msg('拒绝原因必填！');
        }else {
          this.shenhe_info.push({
            operationKey:this.shenhe_info_refuse.idKey,
            contractNo:this.shenhe_info_refuse.contractNo,// 合同号
            status:this.shenhe_type.toString(), //状态 （5：通过，6：拒绝
            reasonsRejection:this.refresh_info,//拒绝原因/通过原因
          });
          // console.log(JSON.stringify(this.shenhe_info));
          // return;
          this.HttpAjax('post','bcmpBreasyReview',JSON.stringify(this.shenhe_info),(res)=>{
            store.commit('UPDATE_LOADINGSTATE',false);
            if(res && res.status ===200){
              if(res.data.code ==='405'){
                this.$Notice.error({
                  title:'失败',
                  desc: res.data.msg,
                  duration:0
                })
              }else if(res.data.code==='0'){
                this.$Notice.success({
                  title:'成功',
                  desc: '操作成功',
                  duration:2
                })
              }
              this.init();
              this.refresh_modal=false;// 回退弹窗
              this.refresh_info= '';// 拒绝理由
              this.shenhe_info = [];
            }
          },'json')
        }
      },
      // 选中行发生变化
      select_change(selection){
        this.shenhe_batch_info = [];
        for(let i=0;i<selection.length;i++){
          this.shenhe_batch_info.push({
            operationKey:selection[i].operationKey,
            contractNo:selection[i].contractNo,// 合同号
            status:this.shenhe_batch_status, //状态 （5：通过，6：拒绝
            reasonsRejection:'',//拒绝原因/通过原因
          })
        }
      },
      // 选择通过还是拒绝
      selectStatus(name){
        for(let j=0;j<this.shenhe_batch_info.length;j++){
          this.shenhe_batch_info[j].status = name;
        }
      },
      // 批量审核按钮点击事件(批量通过)
      batchShenhe(){
        if(this.shenhe_batch_info.length ===0){
          this.$Notice.error({
            title:'错误',
            desc:'请选择数据',
            duration:0
          })
        }else {
          this.shenhe_modal = true;
        }
      },
      // 批量审核弹窗（确定按钮点击事件
      Submit_batch_info(){
        this.HttpAjax('post','bcmpBreasyReview',JSON.stringify(this.shenhe_batch_info),(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          if(res && res.status ===200){
            if(res.data.code ==='405'){
              this.$Notice.error({
                title:'失败',
                desc: res.data.msg,
                duration:0
              })
            }else if(res.data.code==='0'){
              this.$Notice.success({
                title:'成功',
                desc: '操作成功',
                duration:2
              })
            }
            this.init();
            this.shenhe_info = [];
            this.shenhe_modal = false;
          }
        },'json')
      },
      //翻页-->第几页
      changePages(pageIndex){
        this.init(pageIndex);
      },
      //每一页显示多少条数据
      changePageSize(pageSize){
        this.LastSubmitData.pageSize = pageSize;
        this.init('',pageSize);
      },
      //刷新
      refresh(){
        this.init();
      },
      // 取消按钮点击事件（单条信息的弹窗）
      hiddenModel(){
        this.refresh_modal =false;
        this.refresh_info = '';//清空输入的理由
      },
      // 批量审核的弹窗
      hidden_batch_modal(){
        this.shenhe_modal = false;
      },
      // 筛选按钮点击事件
      shaixuan(){
				this.ClearObject(this.LastSubmitData)
				for(let i in this.search_data){
					if(this.search_data[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data[i])
					}
				}
				for(let i in this.search_data1){
					if(this.search_data1[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data1[i])
					}
				}
				for(let i in this.search_data2){
					if(this.search_data2[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data2[i])
					}
				}
				for(let i in this.search_data){
					if(this.search_data3[i] != ''){
						this.$set(this.LastSubmitData, i , this.search_data3[i])
					}
				}
				console.log(this.LastSubmitData)
        this.init()
      },
			//下拉选择项变化时
			selectChange(val,index) {
        if(index == 0){
          this.change_value = val
        }else {
          this['change_value'+index] = val
        }
				
			},
			//下拉框展开
			ClearVal(val,index) {
				if (val) {
          if(index == 0){
            this.ClearObject(this.search_data)
          }else {
            this.ClearObject(this['search_data'+index])
          }
					
				}
			},
			// 清空对象
			ClearObject(Object) {
				for (let i in Object) { //置空，除了pageIndex和pageSize
					if (i != 'pageIndex' && i != 'pageSize') {
						Object[i] = '';
					}
				}
			},
      //重置
      restData() {
        this.ClearObject(this.search_data)
				this.ClearObject(this.search_data1)
				this.ClearObject(this.search_data2)
				this.ClearObject(this.search_data3)
				this.ClearObject(this.LastSubmitData)
        this.init();
      },
      // // 导出数据按钮点击事件
      // export_info(){
      //   this.$layer.msg('暂不清楚接口！')
      // }
    },
    created() {
      this.init();
    },
    mounted() {

    }
  }
</script>

<style lang="less">
  .Letter {
				.from-items {
					padding: 10px;
		
					.ivu-form {
						display: inline-block;
		
						.block-tips.ivu-form-item {
							.ivu-form-item-content {
								.prepend.ivu-select {
									width: 110px;
		
									.ivu-select-selection {
										width: 110px;
										border-radius: 0;
									}
								}
		
								.twoSelect.ivu-select {
									width: 250px;
		
									.ivu-select-selection {
										width: 250px;
										margin-left: -4px;
										border-radius: 0;
									}
								}
		
								.ivu-input-wrapper {
									width: 250px;
									margin-left: -4px;
		
									.ivu-input.ivu-input-large {
										border-radius: 0;
									}
								}
							}
						}
					}
				}
  }
</style>
