<template>
		<div class="recordCases">
			<!-- 分案记录 -->
			<div  class="table-item">
				<Table border :columns="columns1" :data="rdata"></Table>
			</div>
		</div>
</template>

<script>
	// import store from '../../../../store/index'
	export default{
		props:['getDivisionRecord'],
		data(){
	      return{
					loanContractNo: '', //传入的合同号
	      	 columns1: [
                    {
                        title: '序号',
                        type:'index',
                        key: 'HTnumber'
                    },
                    {
                        title: '分案时间',
                        key: 'distributionDateStr',
                    },
                    {
                        title: '催收团队',
                        key: 'teamNo'
                    },
                    {
                        title: '催收员',
                        key: 'urgeName'
                    },
                    {
                        title: '逾期等级',
                        key: 'overdueGrade'
                    }
                ],
              rdata: [] ,
	      }
     	},
			watch:{
				getDivisionRecord(e,r){
					if(e){
						this.rdata = e
					}
				}
			},
	}
</script>

<style scoped lang="less" >


</style>
