<template>
    <div class="importantInfo">
      <div class="top">
        <div class="btns">
          <a href="javascript:;" @click="backInfo" style="display:inline-block;margin-bottom: 6px;font-size: 14px;"><Icon size="20" type="ios-arrow-back" />  返回</a>
        </div>
      </div>
      <!-- 公共tab样式类 tabs-item -->
      <div class="tabs-item">
        <Tabs :value="tab" type="card" @on-click="tabActive">
          <TabPane label="案件详情" name="tabpane1">
            <div class="choiceTabs" v-if="showTab == 'tabpane1'">
            	<details-thecase :loanContractNo="loanContractNo"></details-thecase>
            </div>
          </TabPane>
          <TabPane label="贷款详情" name="tabpane2">
            <div class="choiceTabs" v-if="showTab == 'tabpane2'">
              <loanCase :loanINFO="loanINFO"></loanCase>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
</template>

<script>
	import store from '../../../store/index'
  	import detailsThecase from './detail/DetailsTheCase' //案件详情
  	import loanCase from './detail/loanCase' // 贷款详情
    export default {
      data(){
          return {
            tab:'tabpane1',//tabs切换默认页
            showTab:'tabpane1',//tab切换显示与隐藏
            importINFO:'',//贷款信息
            loanContractNo:'',//订单号
            loanINFO:'',//传递到子组件的数据
            
            caseINFO:[],//传递到子组件的数据
            
            panlType:'',
						Path: '',//返回的路由
          }
      },
      methods:{
      	init(){
      		
      	},
				//返回
        backInfo(){
        	this.$router.go(-1);
			/*if(this.Path =="businessQuery"){
				this.$router.push({
					path: 'businessQuery'
				})
			}else{
				this.$router.push({
					path: 'finishDetail',
					query: {
						contractNumber:  this.loanContractNo
					}
				})
			}*/
        },
        tabActive(name){//切换tab页
          this.tab=name;
          this.showTab=name//控制tab切换与隐藏
          if(name == 'tabpane1'){

          }else{
			 this.HttpAjax('post','getLoanInformation',{loanContractNo:this.loanContractNo},(res)=>{
					store.commit('UPDATE_LOADINGSTATE',false);
					if(res.data.status=='200'){
						this.loanINFO=res.data.data
					}
	
				});
          }
        }
      },
      created(){
				this.Path = this.getStore('opreate').path
        this.loanContractNo = this.getStore('opreate').allINFO.loanContractNo;
      },
      components:{
        detailsThecase,
        loanCase
      },
      mounted(){

      }
    }
</script>

<style lang="less">

</style>
