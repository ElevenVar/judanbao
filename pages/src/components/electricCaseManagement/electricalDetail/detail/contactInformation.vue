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
                        title: '姓名',
                        minWidth:100,
                        align:'center',
                        key: 'name'
                    },
                    {
                        title: '关系',
                        minWidth:100,
                        align:'center',
                        key: 'relation'
                    },
                    {
                        title: '电话',
                        minWidth:120,
                        align:'center',
                        key: 'phone'
                    },
                    {
                        title: '预约时间',
                        minWidth:120,
                        align:'center',
                        key: 'yuyue'
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
                        name: '刘某某',
                        relation: '父女',
                        phone: '13288889999',
                        yuyue: '2017/7/27 12:30'
                    },
                    {
                        name: '刘某某',
                        relation: '父女',
                        phone: '13288889999',
                        yuyue: '2017/7/27 12:30'
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