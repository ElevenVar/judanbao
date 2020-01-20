<template>
	<div class="dataPermConfig">
		<!-- 公共Header类 -->
		<div class="header-item"><Icon type="key"></Icon> {{title}}</div>
		<!-- 公共form表单类 -->
		<div class="from-item">
			<Form label-position="right" :label-width="110" inline class="flex-warpd">
				<div style="max-width:850px">
					<FormItem label="所属机构">
						<Input type="text" placeholder="请输入所属机构！"  size="large" style="width: 300px"></Input>
	   				</FormItem>
	   				<FormItem label="角色名称">
						<Input type="text" placeholder="请输入所属机构！"  size="large" style="width: 300px"></Input>
	   				</FormItem>
	   				<FormItem label="角色代码">
						<Input type="text" placeholder="请输入所属机构！"  size="large" style="width: 300px"></Input>
	   				</FormItem>
	   				<FormItem label="菜单来源">
	   					<Select v-model="select3" placeholder="请选择案件类型！" style="width: 300px" size="large">
	   						<Option value="">1</Option>
	   					</Select>
	   				</FormItem>
	   			</div>
	   			<FormItem label="备注" class="tipsClass">
					<Input type="textarea" :autosize="true" placeholder="请输入备注！" size="large" style="width:300px"></Input>
				</FormItem>
			</Form>
		</div>
		<!-- 权限树tree-item全局样式 -->
		<div class="tree-item">
			<div class="header-tree">角色授权</div>
			<Tree :data="data4" show-checkbox multiple @on-select-change="getSelectedNodes"></Tree>
		</div>
		<div class="btn-item">
			<button class="btn" type="error">取消</button>
			<button class="btn">确认</button>
		</div>
	</div>
</template>


<script>
	export default{
		data(){
			return{
				title:'数据权限配置',
				rotate:true,
				value1:'1',
				select3:'',
				data4:[
					{
						title:'一级菜单1',
						expand: true,
						children:[
							{title:'二级菜单1-1'},
							{
								title:'二级菜单1-2',
								expand: true,
								children:[
									{
										title:'三级菜单1-2-1'
									}
								]
							}
						]
					},{
						title:'一级菜单2',
					},{
						title:'一级菜单3',
					},{
						title:'一级菜单4',
					}
				]
			}
		},
		components:{
			
		},
		methods:{
			init(){
				
			},
			getSelectedNodes(name){
				console.log(name)
			}
		},
		created(){
			this.init();
		}
	}
</script>

<style scoped lang="less">
	.dataPermConfig{
		background-color:#fff;
		padding:15px;
		border:1px solid #e6e6e6;
		.btn-item{
			margin:20px 0;
			display: flex;
			justify-content: center;
			button{
				margin-right:15px;
			}
		}
		.flex-warpd{
			display: flex;
		}
	}
</style>

<style type="text/css" lang="less">
	.dataPermConfig{
		.tipsClass{
			.ivu-form-item-label{
				height:96px;
				line-height: 75px;
			}
			textarea.ivu-input{
				height: 96px!important;
			}
		}
	}
</style>