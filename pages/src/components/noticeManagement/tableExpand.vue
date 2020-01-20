<template>
  <div>
    <Row class="expand-row">
      <Steps :current="0">
        <Step status="process" :key="index" :content="item.roleAndSystem" v-for="(item,index) in row.line"></Step>
      </Steps>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object
    },
    data(){
      return {

      }
    },
    created(){

    },
    mounted(){

    }
  };
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
