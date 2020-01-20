<template>
  <div class="expand-row" >
    <Steps class="stepsCom">
      <Step status="process" :content="items.roleAndSystem"  v-for="(items,index) in steps" :key="index"></Step>
    </Steps>
  </div>
</template>

<script>
  import store from '../../store/index'

  export default {
    props: {
      row: Object
    },
    data(){
      return{
        steps:[],
        // counts:'0'
      }
    },
    methods:{
      init(){
        const _=this;
        //设置流程展开
        _.HttpAjax('post', 'aduitFowRouteStep',{routeId: _.row.idKey}, (res) => {
          store.commit('UPDATE_LOADINGSTATE', false);
          if(res && res.data.status === 200) {
            _.steps=res.data.data
            // this.counts = res.data.data[res.data.data.length-1].checkStep -1;
          }
        });
      }
    },
    created(){
      this.init();
    }
  };
</script>

<style>
  .expand-row{
    height: 100px;
    margin: 16px 0;
    width: 900px;
    padding-top:20px;
  }
  .expand-row .stepsCom .ivu-steps-item .ivu-steps-content{
    text-align: center;
    position: relative;
    left: -28px
  }
  .expand-row .stepsCom .ivu-steps-head,.expand-row .stepsCom .ivu-steps-title{
    background: none;
  }
</style>
