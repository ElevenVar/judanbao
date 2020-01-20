<template>
	<div>
		<Table border :columns="columns1" :data="data1"></Table>
	</div>
	
</template>

<script>
	
	export default{
		data(){
	      return{
	        formData: {
	          type: '1', //我是...

	        },
	        
	         columns1: [
                    {
                        title: '电话',
                        minWidth:100,
                        align:'center',
                        key: 'phone'
                    },
                    {
                        title: '主叫/次',
                        minWidth:100,
                        align:'center',
                        key: 'zhujiao'
                    },
                    {
                        title: '被叫/次',
                        minWidth:120,
                        align:'center',
                        key: 'beijiao'
                    },
                    {
                        title: '通话时间',
                        minWidth:120,
                        align:'center',
                        key: 'tonghua'
                    },{
						title: '操作',
						align:'center',
						minWidth:100,
                        render:(h,params)=>{
                        	return h('div',[
                        		h('Button',{
                        			props:{
                        				size:'small',
                        				type:'info'
                        			},
                        			on:{
                        				click:()=>{
                        					
                        				}
                        			}
                        		},'操作')
                        	])
                        }
					}
                ],
                data1: [
                    {
                        phone: '13288889999',
                        zhujiao: 18,
                        beijiao: 23,
                        tonghua: '1小时15分35秒'
                    },
                    {
                        phone: '13288889999',
                        zhujiao: 18,
                        beijiao: 23,
                        tonghua: '1小时15分35秒'
                    }
                    
                ]
	      }
	    },
	    methods:{
			init(){

			}
		},
	    created(){
			this.init();
		}
	}
</script>

<style>
</style>