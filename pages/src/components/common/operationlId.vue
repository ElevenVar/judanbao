<template>
  <div class="expand-row">
		<div>
			<Steps :current="counts" size="small" class="stepsCom" :status="status">
				<Step :key="index" v-for="(item,index) in steps"
							:title="item.operatTime"
							:content="item.checkName"
				>
				</Step>
			</Steps>
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
        steps:[],
        counts:0,
        status:'process'
      }
    },
    methods:{
      init(){
        const _=this;
        this.HttpAjax('post',this.url,{
          idKey:this.row.idKey,
        }, (res) => {
          store.commit('UPDATE_LOADINGSTATE', false);
          if(res && res.data.status === 200) {
            this.steps = res.data.data;
						for(let i=0,j=res.data.data;i<j.length;i++){
							if(j[i].status == '4'){
								this.counts = i+1;
								this.status = 'process';
								
							} else if(j[i].status =='3'){
								this.counts = i;
								this.status = 'error';
								
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

