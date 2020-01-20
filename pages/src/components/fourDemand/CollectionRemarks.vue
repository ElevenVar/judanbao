<template>
	<div class='CollectionRemarks'>
		<!-- 公共Header类 -->
		<Collapse v-model="showMe" class="header-Collapse" @on-change="rotate">
			<Panel name="1">
				<span class="head-commom">催收备注明细表</span>
				<span class="swith head-commom">
					{{zhedie}}
					<Icon class="head-Icon" :class="{rotate:isActive}" type="ios-arrow-down"></Icon>
				</span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model='formData'>
							<FormItem label="合同编号">
								<Input type="text" v-model="formData.loanContractNo" placeholder="请输入合同编号！" size="large"></Input>
							</FormItem>
							<FormItem label="时间">
								<DatePicker @on-change='dateChange' v-model="formData.remarkMonth" format="yyyy-MM" type="month" 
								placement='bottom' :editable="false" placeholder="请选择时间！" size="large"></DatePicker>
							</FormItem>
							<FormItem label="轮次">
								<Input type="text" v-model="formData.turnNo" placeholder="请输入轮次！" size="large"></Input>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click='search'>查询</Button>
								<Button @click='restData'><Icon type="navicon-round"></Icon> 重置</Button>
								<Button @click='exportData' :disabled="downloads" :loading="downloads"><Icon></Icon>导出数据</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Panel>
		</Collapse>
		<div class="table-warper">
			<!-- 公共table类-->
			<div class="table-item">
				<Table height="396" border :stripe="true" :columns="columns" :data="datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click='refresh'/>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default{
		name:'CollectionRemarks',
		data (){
			return{
				downloads:false,
				zhedie: "收起",
				showMe: '1', //默认展开
				isActive: true,
				formData:{
					loanContractNo:'', // 合同号
					turnNo:'',//轮次
					remarkMonth:'',//时间
					reportId:'BCMP_URGE_RECORD_REPORT',   //  必传:默认值不可变
					pageIndex:'1',
					pageSize:'10'
				},
				formIndex:'0',
				columns:[
					{title:'月份', minWidth:120 , key:'remarkMonth'},{title:'轮次',minWidth:100,key:'turnNo'},
					{title:'合同编号',minWidth:160,key:'loanContractNo'},{title:'逾期日期',minWidth:100,key:'overdueDate'},
					{title:'催款人',minWidth:100,key:'urgeRealName'},{title:'催款人职位',minWidth:100,key:'urgePosition'},
					{title:'跟呼日期',minWidth:180,key:'followCallTime'},{title:'联络人',minWidth:100,key:'contactPerson'},
					{title:'关系',minWidth:100,key:'contactRelationship'},{title:'联系电话',minWidth:110,key:'contactNumber'},
					{title:'动作代码',minWidth:100,key:'actionName'},{title:'结果代码',minWidth:100,key:'resultName'},
					{title:'备注内容',minWidth:160,key:'remark'},{title:'承诺金额',minWidth:100,key:'repayMoney'},
					{title:'承诺还款日期',minWidth:110,key:'repayTime'},{title:'主体',minWidth:100,key:'mainBodyName'},
				],
				datas:[],
				totallPages:0,
			}
		},
		methods:{
			//默认查询
			init(pageIndex,pageSize){
				this.formData.pageIndex = pageIndex || this.formData.pageIndex
				this.formData.pageSize = pageSize || this.formData.pageSize
				this.HttpAjax('post','reportQueryData',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.datas = res.data.data.data
						this.totallPages = res.data.data.dataCount
					}
				})
			},
			//页码切换
			changePages(pageIndex){
				this.init(pageIndex)
			},
			//每页总数切换
			changePagesTotall(pageSize){
				this.init('1',pageSize)
			},
			//刷新
			refresh(){
				this.init()
			},
			// 查询
			search(){
				this.init()
			},
			restData() { //重置
				for(let i in this.formData) {
					if(i !== 'pageIndex' && i !== 'pageSize' && i != 'reportId') {
						this.formData[i] = ''
					}
				}
				this.init();
			},
			// 时间转化
			dateChange(val) {
				this.formData.remarkMonth = val;
			},
			//导出数据
			exportData(){
				this.downloads = true;
				this.HttpAjax('post','reportGetReortFileType',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					let fileType = res.data.data.fileType
					if(res && res.data.status == 200 ){
						this.HttpAjax('post','reportDownload',qs.stringify(this.formData),(res)=>{
							store.commit('UPDATE_LOADINGSTATE', false);
							this.downLoadFile(res.data,'催收备注明细表'+ fileType);
							this.downloads = false;
						},'download');
					}
				})
			},
			//折叠、展开
			rotate() {
				if (this.isActive) {
					this.isActive = false;
					this.zhedie = "展开"
				} else {
					this.isActive = true;
					this.zhedie = "收起"
				}
			},
		},
		mounted(){
			this.init()
		}
	}
</script>

<style>
	
</style>