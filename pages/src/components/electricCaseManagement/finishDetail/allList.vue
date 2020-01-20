<template>
	<div class="APPCallRecord">
		<!-- 公共table类-->
		<div class="table-item">
			<Table border :stripe="true" :columns="columns" :data="datas" ></Table>
		</div>
		<!-- 公共page分页类 -->
		<div class="page-item">
			<Page placement="top" :total="listpage.pageTotal" :page-size="listpage.pageSize"  @on-page-size-change="jumppage" @on-change="jump" show-total  show-sizer></Page>
			<Icon type="ios-refresh"  style="font-size: 30px" @click="refresh"/>

			<!--<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">{{listpage.totalye}}</span>页</span>-->
		</div>
	</div>
</template>

<script>
	import store from '../../../store/index'
	export default{
		props: ['callRecordINFO','allListTotal'],
		data(){
	      return{
			chaildData:null,
			contractNumber:"",
	      	listpage:{
	      		pageTotal:0,//数据总条数
				pageSize:10,//每页条数
				totalye:0,//总共多少页
	      	},

	      	columns:[
					{
						title: '进件营业部',
						minWidth:100,
                        key: 'orgNo'

					},{
						title: '归属营业部',
						minWidth:100,
                        key: 'belongOrgNo'

					},{
						title: '合同编号',
						minWidth:120,
                        key: 'loanContractNo'
					},{
						title: '客户姓名',
						minWidth:100,
                        key: 'clientName'

					},{
						title: '产品类型',
						minWidth:120,
                        key: 'productTypeName',
					},{
						title: '还款日',
						minWidth:170,
                        key: 'monthPayDate',
					},{
						title: '逾期等级',
						minWidth:100,
                        key: 'overdueGrade',
					},{
						title: '逾期天数',
						minWidth:150,
                        key: 'overdueDay',
					},{
						title: '逾期总额',
						minWidth:100,
                        key: 'overdueAmount',
					},{
						title: '案件分配日期',
						minWidth:180,
                        key: 'caseAllotTime',
					},{
						title: '处理状态',
						minWidth:140,
                        key: 'caseType',
					},{
						title: '所属团队',
						minWidth:100,
                        key: 'teamNo',
					},{
						title: '所属组长',
						minWidth:120,
                        key: 'headmanId',
					},{
						title: '永久催收员',
						minWidth:120,
                        key: 'foreverUlgeNo',
					},{
						title: '操作',
						minWidth:150,
                        key: 'number',
                        fixed:'right',
                        render:(h,params)=>{
                        	return h('div',[
                        		h('Button',{
                        			props:{
                        				size:'small',
                        				type:'info'
                        			},
                        			on:{
                        				click:()=>{
                        					this.setStore('opreateBtn',{hiddenBtn:'private',showBtn: 'private',allINFO:params.row})
                        					this.$router.push('finishDetail')
  											//this.$router.push({path:'finishDetail',query: { showBtn: 'private' ,paramsRow:paramsRow}})
                        					//this.$router.push({path:'finishDetail',query: {contractNumber:contractNumber}})
                        				}
                        			}
                        		},'详情')
                        	])
                        }
					}
				],
				datas:[

				],

	      }
        },

	    watch:{
	    	callRecordINFO(e,r){
	    		if(e){
	    			this.datas=e
	    		}
	    	},
	    	allListTotal(e,r){
	    		if(e){
	    			this.listpage.pageTotal=e
	    			//this.init();
	    		}
	    	}
	    },

	    methods:{

	    	init(pageIndex,pageSize){
				let rData={
					pageIndex:pageIndex || 1,//当前页码
					pageSize:pageSize || 10,//每页条数
				}
				this.HttpAjax('post','getMyFinishCase',rData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false);

					if(res.data.status=='200'){
						this.datas=res.data.data.data
						this.listpage.pageTotal=res.data.data.dataCount;//数据总条数

					}

				});
			},
			jump(a){//页码改变的回调
				this.current=a
				let cur=this.current
				let size=this.pageSize
				this.init(cur,size)
			},
			jumppage(b){//切换每页条数
				this.pageSize=b
				let cur=this.current
				let size=this.pageSize
				this.init(cur,size)

			},
			refresh(){
				this.init(this.pageIndex,this.pageSize);
			}

	    },
		created(){
			this.init()
		}
	}
</script>

<style>
</style>
