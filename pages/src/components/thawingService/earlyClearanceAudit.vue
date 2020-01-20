<template>
	<div class="earlyClearanceAudit">
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
						<Form label-position="right" :label-width="110" inline :model="formData" ref="formData">
							<FormItem>
								<Input type="text" :placeholder="placeholder" v-model="indexData" size="large" style="margin-left: -110px">
								<Select slot="prepend" style="width: 110px" v-model="indexSelect" @on-change="clickme">
									<Option value="1">客户姓名</Option>
									<Option value="2">身份证号码</Option>
									<Option value="3">合同号</Option>
								</Select>
								</Input>
							</FormItem>
							<FormItem label="条件一" prop="data1">
								<Select placeholder="请选择！" size="large" v-model="formData.data1">
									<Option value="1">电催团队</Option>
									<Option value="2">电催团队</Option>
								</Select>
							</FormItem>
							<FormItem label="条件二" prop="data2">
								<Select placeholder="请选择！" size="large" v-model="formData.data2">
									<Option value="1">电催小组</Option>
									<Option value="2">电催小组</Option>
								</Select>
							</FormItem>
							<FormItem label="条件三" prop="data3">
								<Select placeholder="请选择！" size="large" v-model="formData.data3">
									<Option value="1">电催专员</Option>
									<Option value="2">电催专员</Option>
								</Select>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click.prevent="">筛选</Button>
								<Button type="primary" icon="plus-circled" @click.prevent="newAddModal">新增申请</Button>
								<Button @click="restData()"><Icon type="navicon-round"></Icon> 重置</Button>
								<Button @click=""><Icon type="navicon-round"></Icon> 导出数据</Button>
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
        <Page :total="totallPages"  show-total  show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
        <Icon type="ios-refresh"  style="font-size: 30px" @click="refresh"/>
      </div>
		</div>

		<!--Modal-->
		<Modal v-model="addApply" :mask-closable="false" :scrollable="true" :loading="loading" :title="edit ? '修改申请' : '新增申请'">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="110" inline :model="formModalData" ref="formModalData">
	        <FormItem label="附件">
						<!--<Upload v-model="formModalData.imgs" multiple action="//jsonplaceholder.typicode.com/posts/">
	        		<Button icon="ios-cloud-upload-outline">Upload files</Button>
	        	</Upload>-->
	        	<input @change="getUploadImg" type="file" accept="image/*" multiple />
					</FormItem>
				</Form>
    </Upload>

			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="cancel">取消</Button>
				<Button type="primary" size="large" @click="getApplyModeTo('formModalData')">确定</Button>
			</div>
		</Modal>

	</div>
</template>

<script>
	import store from '../../store/index'
	export default {
		name: "earlyClearanceAudit",
		data() {
			return {
				value1: '1',
				title: '提前结清审核',
				loading:true,
				rotate: true,
				addApply: false,
        width:{'width':'340px'},
				placeholder: "请输入客户姓名！",
				edit: false,
        totallPages:0,
				indexData: '',
				indexSelect: '1',
				formData: {
          pageIndex:'1',
          pageSize:'10',
				},
				formModalData:{
					imgs:''
				},
				columns: [{
						title: '序号',
						minWidth: 120,
						type: 'index'
					},
					{
						title: '合同编号',
						minWidth: 120,
						key: 'loanContractNo',
					},
					{
						title: '归属营业部',
						minWidth: 120,
						key: 'belongOrgNo',
					},
					{
						title: '客户姓名',
						minWidth: 120,
						key: 'loanName',
					},
					{
						title: '产品类型',
						minWidth: 120,
						key: 'productType',
					},
					{
						title: '申请类型',
						minWidth: 120,
						key: 'applyType',
					},
					{
						title: '当前期数',
						minWidth: 120,
						key: 'curentBillTerm',
					},
					{
						title: '逾期天数',
						minWidth: 120,
						key: 'overdueDay',
					},
					{
						title: '申请时间',
						minWidth: 120,
						key: 'applyTime',
					},
					{
						title: '申请人',
						minWidth: 120,
						key: 'applyUser',
					},
					{
						title: '操作',
						minWidth: 250,
						key: 'number',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
										}
									}
								}, '流程'),
								h('Dropdown', {
									props: {
										trigger: 'click',
										placement: "bottom-end"
									},
									on: {
										'on-click': (name) => {
											if(name == '1') {//通过
                          this.adopt(params);
											} else if(name == '2') {//拒绝
                          this.refuse(params)
											} else if(name == '3') {//回退
                          this.regresses(params)
											}else if(name=='4'){//撤销
                          this.revoke(params)
                      }else{//详情

                      }
										}
									}
								}, [
									h('Button', {
										props: {
											size: 'small',
											type: 'info'
										}
									}, [
										h('span', '更多'),
										h('Icon', {
											props: {
												type: 'ios-arrow-down'
											},
											style: {
												marginLeft: '5px'
											}
										})
									]),
									h('DropdownMenu', {
										slot: 'list'
									}, [
										h('DropdownItem', {
											props: {
												name: '1'
											}
										}, '通过'),
										h('DropdownItem', {
											props: {
												name: '2'
											}
										}, '拒绝'),
										h('DropdownItem', {
											props: {
												name: '3'
											}
										}, '回退'),
                    h('DropdownItem', {
                      props: {
                        name: '4'
                      }
                    }, '撤销'),
                    h('DropdownItem', {
                      props: {
                        name: '5'
                      }
                    }, '详情')
									])

								])
							])
						}
					},

				],
				datas: [],
			}
		},
		methods: {
			init() {
        const _=this;
        _.earlyClearance();
			},
      earlyClearance(page,pagesize){
        const _=this;
        _.formData.pageIndex = page || _.formData.pageIndex;
        _.formData.pageSize = pagesize || _.formData.pageSize;
        _.HttpAjax('post','EarlyClearList', _.formData,(res)=>{
          store.commit('UPDATE_LOADINGSTATE',false);
          // if(res && res.data.status == '200'){
          //
          //   _.totallPages=res.data.data.dataCount;
          //   _.datas = res.data.data.data;
          //
          // }
        });
      },
      adopt(row){//通过
        const _=this;
        let earlyClearanceOperaForm={
          loanContractNo:'',
          handleSystem:'',
          loanName:'',
          status:'',
          updateUser:'',
          updateName:'',
          receiveTime:'',
          updateTime:'',
          auditOpinion:'',
          checkStatus:'',
          checkPost:'',
          nextPermission:'',
          curentRole:''
        };
        _.HttpAjax('post','EarlyClearCheck', earlyClearanceOperaForm,(res)=> {
          store.commit('UPDATE_LOADINGSTATE', false);
          if (res && res.data.status == '200') {
            this.$Notice.success({
              title: '成功',
              desc: '通过成功!',
              duration: 2
            });
            _.init();
          }
        })
      },
      refuse(row){//拒绝
        const _=this;
        let earlyClearanceOperaForm={
          loanContractNo:'',
          handleSystem:'',
          loanName:'',
          status:'',
          updateUser:'',
          updateName:'',
          receiveTime:'',
          updateTime:'',
          auditOpinion:'',
          checkStatus:'',
          checkPost:'',
          nextPermission:'',
          curentRole:''
        };
        _.HttpAjax('post','EarlyClearRefuse', earlyClearanceOperaForm,(res)=> {
          store.commit('UPDATE_LOADINGSTATE', false);
          if (res && res.data.status == '200') {
            this.$Notice.success({
              title: '成功',
              desc: '拒绝成功!',
              duration: 2
            });
            _.init();
          }
        })
      },
      regresses(row){//回退
        const _=this;
        let earlyClearanceOperaForm={
          loanContractNo:'',
          handleSystem:'',
          loanName:'',
          status:'',
          updateUser:'',
          updateName:'',
          receiveTime:'',
          updateTime:'',
          auditOpinion:'',
          checkStatus:'',
          checkPost:'',
          nextPermission:'',
          curentRole:''
        };
        _.HttpAjax('post','EarlyClearBack', earlyClearanceOperaForm,(res)=> {
          store.commit('UPDATE_LOADINGSTATE', false);
          if (res && res.data.status == '200') {
            this.$Notice.success({
              title: '成功',
              desc: '回退成功!',
              duration: 2
            });
            _.init();
          }
        })
      },
      revoke(row){//撤销
        const _=this;
        let earlyClearanceOperaForm={
          loanContractNo:'',
          handleSystem:'',
          loanName:'',
          status:'',
          updateUser:'',
          updateName:'',
          receiveTime:'',
          updateTime:'',
          auditOpinion:'',
          checkStatus:'',
          checkPost:'',
          nextPermission:'',
          curentRole:''
        };
        _.HttpAjax('post','EarlyClearRevoke', earlyClearanceOperaForm,(res)=> {
          store.commit('UPDATE_LOADINGSTATE', false);
          if (res && res.data.status == '200') {
            this.$Notice.success({
              title: '成功',
              desc: '撤销成功!',
              duration: 2
            });
            _.init();
          }
        })
      },
      changePages(name){//翻页-->第几页
        this.earlyClearance(name);
      },
      changePagesTotall(name){//每一页显示多少条数据
        this.formData.pageSize = name;
        this.earlyClearance('',name);
      },
      refresh(){//刷新
        this.earlyClearance();
      },
			clickme(name) {
				const _ = this;
				_.indexData = '';
				switch(name) {
					case '1':
						this.placeholder = '请输入客户姓名！';
						break;
					case '2':
						this.placeholder = '请输入身份证号！';
						break;
					case '3':
						this.placeholder = '请输入合同号！';
						break;
				}
			},
			restData() { //重置
				const _ = this;
				_.$refs['formData'].resetFields();
				_.indexData = '';
			},
			newAddModal() {
				const _ = this;
				_.edit = false;
				_.addApply = true;
			},
			cancel() {
				this.addApply = false;
				this.earlyClearanceOpera=false;
			},
			getApplyModeTo(){
				const _=this;
			},
			getUploadImg(e){
				const _=this;
				var File = e.target.files;
	  		var size=File.size;

	  		var formdata = new FormData();
	  		for(let i=0;i<File.length;i++){
	  			formdata.append('files',File[i]);
	  		}
	  		_.HttpAjax('post','upLoadImg',formdata,(res)=>{
	  			store.commit('UPDATE_LOADINGSTATE',false)
	  		},'file');

			}
		},
		created() {
			this.init();
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	.earlyClearanceAudit {
		.ivu-table-fixed-body {
			overflow: visible;
		}
	}


</style>
