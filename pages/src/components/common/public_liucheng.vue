<template>
  <div class="expand-row">
		<!-- //信修审核  -->
   <div v-if="url==='bcmpBreasySransferData'">
     <Steps :current="bcmpBreasySransferData" size="small" class="stepsCom">
       <Step :key="index" v-for="(item,index) in steps"
             :title="item.time"
             :content="item.roleName"
       >
       </Step>
     </Steps>
   </div>
	 <!-- 停催申请审核，提前委外审核-->
	 <div v-else-if="url==='stopUrgeCheckGetCheckRoute' || url==='outSourcingAdvanceGetCheckRoute'">
		 <div>
			 <Steps :current="getCheckRoute" size="small" class="stepsCom" :status='status'>
			 	<Step :key="index" v-for="(item,index) in steps"
			 				:title="item.time"
			 				:content="item.roleName"
			 	>
			 	</Step>
			 </Steps>
		 </div>
	 </div>
	<!-- 信函审核-->
	<div v-else-if="url ==='processQuery'">
		<div v-if='row.status ==3'>
			<Steps :current="processQuery" size="small" class="stepsCom" status='error'>
				<Step :key="index" v-for="(item,index) in processQuery"
							:title="item.operatTime"
							:content="item.checkName"
				>
				</Step>
			</Steps>
		</div>
		<div v-else>
			<Steps :current="count" size="small" class="stepsCom">
				<Step :key="index" v-for="(item,index) in processQuery"
							:title="item.operatTime"
							:content="item.checkName"
				>
				</Step>
			</Steps>
		</div>
	</div>
	 <!-- 结清证明申请-->
    <div v-else>
			<div v-if="row.auditStatus =='审核拒绝'">
				<Steps :current="ProveSettle" size="small" class="stepsCom" status="error">
					<Step :key="index" v-for="(item,index) in steps"
								:title="item.operatTime"
								:content="item.checkName"
					>
					</Step>
				</Steps>
			</div>
			<div v-else>
				<Steps :current="ProveSettle" size="small" class="stepsCom" status="finish">
					<Step :key="index" v-for="(item,index) in steps"
								:title="item.operatTime"
								:content="item.checkName"
					>
					</Step>
				</Steps>
			</div>
    </div>
  </div>
</template>

<script>
  import store from '../../store/index'
  export default {
    name:'expand-row',
    props: {
      row: Object,
      url:String,
    },
    data(){
      return{
				status: 'process',
        steps:[],
				ProveSettle:0,//结清证明申请进行步骤
				getCheckRoute:0, //停催申请审核,提前委外审核 进行步骤
				bcmpBreasySransferData:0, //信修审核 
				
				processQuery:[], //信函审核
				count:0
      }
    },
    methods:{
      init(){
        const _=this;
        this.HttpAjax('post',this.url,{
          "idKey": this.row.idKey,
        }, (res) => {
          store.commit('UPDATE_LOADINGSTATE', false);
          if(res && res.data.status === 200) {
            if(this.url ==='settleProofGetCheckRoute'){ //结清证明申请0、审核通过 1、审核拒绝 2、待审核 
              this.steps = res.data.data;
							for(let j=res.data.data,i=j.length -1 ;i>= 0;i--){
								if(res.data.data[i].status == 1){ // 审核通过
									this.ProveSettle = i;
									return;
								}else if(res.data.data[i].status ==0){
									this.ProveSettle = i+1
									return;
								}
							}
            }else if(this.url ==='processQuery'){// 信函审核 1:待审核、2:审核中、3:审核拒绝、4:审核通过
              this.steps = res.data.data.data;
              console.info(res.data.data)
              let len =res.data.data.length;
              this.processQuery=res.data.data;
              
							for(let i=0,j=res.data.data;i<j.length;i++){
								if(j[i].status ==4 || j[i].status ==3){
									this.count= i+1;
								}
							}
            }else if(this.url ==='stopUrgeCheckGetCheckRoute'){//停催申请审核 0：待审核，1：通过，2：拒绝
							this.steps = res.data.data;
							for(let j=res.data.data,i=j.length -1;i>=0;i--){
								if(j[i].status == 1){ // 通过
									this.getCheckRoute= i
									return;
								}else if(j[i].status == 2){
									this.getCheckRoute= i
									this.status = 'error'
									return;
								}
							}
						}else if(this.url ==='outSourcingAdvanceGetCheckRoute'){ //提前委外审核
							this.steps = res.data.data;
							for(let j=res.data.data,i=j.length -1;i>=0;i--){
								if(j[i].status == 1){ // 通过
									this.getCheckRoute= i
									return;
								}else if(j[i].status == 2){
									this.getCheckRoute= i
									this.status = 'error'
									return;
								}
							}
						}else if(this.url ==='bcmpBreasySransferData'){// 查看信修审核  审核流程(全部是待审核)
							this.steps = res.data.data;
							for(let i=0,j=res.data.data;i<j.length;i++){
								if(j[i].status ==0){//待审核
									this.bcmpBreasySransferData = i;
								}else if(j[i].status ==2){// 审核通过
									this.bcmpBreasySransferData = i;
								}
							}
						}
          }
        });
      },
    },
    mounted(){
      this.init();
    }
  };
</script>

<style lang='less'>
  .expand-row{
    height: 100px;
    margin: 10px 0 10px 80px;
    padding-top:30px;
    overflow-x: auto;
  }
 .expand-row .stepsCom .ivu-steps-item .ivu-steps-content{
    text-align: center;
    position: relative;
    left: -30px;
  }
	.ivu-steps.ivu-steps-small .ivu-steps-status-finish .ivu-steps-head-inner>.ivu-steps-icon.ivu-icon{
		font-size:25px;
		top:-4px;
		left:-4px;
	}
	.ivu-steps.ivu-steps-small .ivu-steps-status-error .ivu-steps-head-inner>.ivu-steps-icon.ivu-icon{
		font-size:20px;
		top:-6px;
		left:-6px;
	}
  .expand-row .stepsCom .ivu-steps-head,.expand-row .stepsCom .ivu-steps-title{
    background: none;
  }
  .expand-row .stepsCom .ivu-steps-status-finish .ivu-steps-content{
    color: #000;
  }
</style>

