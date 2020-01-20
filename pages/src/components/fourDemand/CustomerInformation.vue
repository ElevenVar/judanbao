<template>
	<div class='CustomerInformation'>
		<!-- 公共折叠面板类 -->
		<Collapse v-model="value1" class="header-Collapse" @on-change="rotate = !rotate">
			<Panel name="1">
				<span class="head-commom">客户信息表</span>
				<span class="swith head-commom">
	        {{rotate ? '收起' : '展开'}}
	        <Icon class="head-Icon" :class="{rotate:rotate}" type="ios-arrow-down"></Icon>
	      </span>
				<div slot="content">
					<!-- 公共form表单类 -->
					<div class="from-item">
						<Form label-position="right" :label-width="110" inline :model="formData">
							<FormItem label="合同号" prop="reportDate">
								<Input type="text" v-model='formData.loanContractNo' placeholder="请输入合同编号！" size="large"></Input>
							</FormItem>
							<FormItem label="身份证号" prop="serviceLine">
								<Input type="text" v-model='formData.idCard' placeholder="请输入身份证号！" size="large"></Input>
							</FormItem>
							<FormItem label="电话号码" prop="reportDate">
								<Input type="text" v-model='formData.loanNamePhone' placeholder="请输入电话号码！" size="large"></Input>
							</FormItem>
							<FormItem style="margin-left: -110px;">
								<Button type="primary" icon="plus-circled" @click='search'>查询</Button>
								<Button @click='Reset'>重置</Button>
								<Button @click='exportData'><Icon type="navicon-round"></Icon> 导出数据</Button>
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
				<Page :total="totallPages" show-total show-sizer @on-change="changePages" @on-page-size-change="changePagesTotall"></Page>
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../store/index'
	import qs from 'qs'
	export default{
		name:'CustomerInformation',
		data(){
			return{
				value1:'1',
				rotate: true,
				totallPages:10,
				formData:{
					pageIndex: '1',
					pageSize:'10',
					loanContractNo:'',
					idCard:'',
					loanNamePhone:'',
				},
				columns:[
					{title:'合同号',minWidth:160,key:'loanContractNo'},
					/* {title:'身份证号',minWidth:160,key:'idCard'}, */
					{title:'客户姓名',minWidth:160,key:'clientName'},
					/* {title:'电话号码',minWidth:160,key:'loanNamePhone'}, */
				],
				datas:[],
			}
		},
		methods:{
			// 默认数据查询
			init(pageIndex,pageSize){
				this.formData.pageIndex = pageIndex || this.formData.pageIndex
				this.formData.pageSize = pageSize || this.formData.pageSize
				this.HttpAjax('post','ClientIdQuery',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false);
					if(res && res.data.status == 200){
						this.datas = res.data.data.data
					}
				})
			},
			//查询数据总量
			ClientIdQueryCount(pageIndex,pageSize){
				this.formData.pageIndex = pageIndex || this.formData.pageIndex
				this.formData.pageSize = pageSize || this.formData.pageSize
				this.HttpAjax('post','ClientIdQueryCount',this.formData,(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false);
					// console.log(res.data)
					if(res && res.data.status == 200){
						this.totallPages = res.data.data
					}
				})
			},
			//查询
			search(){
				this.init()
				this.ClientIdQueryCount()
			},
			//重置
			Reset(){
          for(let i in this.formData){
            if(i != 'pageIndex' && i != 'pageSize'){
              this.formData[i] = '';
            }
          }
          this.ClientIdQueryCount()
          this.init()
			},
			//导出
			exportData(){
				this.HttpAjax('post', 'ClientIdDownLoad', qs.stringify(this.formData), (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					//二进制流文件下载
					this.downLoadFile(res.data, name + '.xlsx');
				}, 'download');
			},
			//页码切换
			changePages(pageIndex){
				this.init(pageIndex)
			},
			//每页总条数切换
			changePagesTotall(pageSize){
				this.init('1',pageSize)
			},
			//刷新
			refresh(){
				this.init()
			}
		},
		mounted(){
			this.init()
			this.ClientIdQueryCount()
		}
	}
</script>

<style>
	
</style>