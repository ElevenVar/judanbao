<template>
	<div class="expand-row">
		<Steps :status="status" :current="counts" size="small" class="stepsCom">
	        <Step :key="index" v-for="(item,index) in steps"
	        	:title="item.time"
	        	:content="item.roleName"
	        >
	        </Step>
	    </Steps>
	</div>
</template>

<script>
	import store from '../../store/index'

	export default {
		props: {
			row: Object,
		},
		data(){
			return{
				steps:[],
				stepsTitle:[],
				counts:0,
				status:'process'
			}
		},
		methods:{
			init(){
				// status:1:审核中 2:拒绝 3:回退 4:通过 5:撤销"
				const _=this;
				this.HttpAjax('post','queryRoutInfoById',{'idKey':this.row.repaySettleId},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						this.steps = res.data.data
						if(this.row.status == '撤销'){
							this.counts = -1;
							return
						}
						for(let  j=res.data.data,i =j.length-1;i>=0;i--){
							if(j[i].status == 2){
								this.counts = i
								this.status ='error'
								return;
							}else if(j[i].status == 4){
								this.counts = i+1;
								return;
								
							}
						}
					}
				})
			}
		},
		created(){
			this.init();
		}
	};
</script>

<style>
	.expand-row{
		height: 110px;
		margin: 10px 0 10px 80px;
		width: 900px;
		padding-top:30px;
		overflow-x: auto;
	}
	.expand-row .stepsCom .ivu-steps-item .ivu-steps-content{
		text-align: center;
		position: relative;
		left: -40px
	}
	.expand-row .stepsCom .ivu-steps-head,.expand-row .stepsCom .ivu-steps-title{
		background: none;
	}
	.expand-row .stepsCom .ivu-steps-status-finish .ivu-steps-content{
		color: #000;
	}
	.expand-row .stepsCom .ivu-steps-icon.ivu-icon.ivu-icon-ios-close{
		left:-6px;
		top:-7px;
	}
</style>