<template>
	<div class="expand-row">
		<Steps v-if="steps.length>0" :current="counts" size="small" class="stepsCom">
	        <Step :key="index" v-for="(item,index) in steps"
	        	:title="item.updateTime"
	        	:content="item.nameAndSystem"
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
				counts:0
			}
		},
		methods:{
			init(){
				const _=this;
				//设置流程展开
				_.HttpAjax('post', 'getCheckPrecess',{"repaySettleId": _.row.repaySettleId}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status === 200) {
						this.steps = res.data.data;
						let len =res.data.data.length;
						if(len > 0){
							this.counts = res.data.data[len-1].checkStep -1;
						}
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
		margin: 10px 0 10px 80px;
		width: 900px;
		padding-top:30px;
		overflow-x: auto;
	}
	.expand-row .stepsCom .ivu-steps-item .ivu-steps-content{
		text-align: center;
		position: relative;
		left: -28px
	}
	.expand-row .stepsCom .ivu-steps-head,.expand-row .stepsCom .ivu-steps-title{
		background: none;
	}
	.expand-row .stepsCom .ivu-steps-status-finish .ivu-steps-content{
		color: #000;
	}
</style>
