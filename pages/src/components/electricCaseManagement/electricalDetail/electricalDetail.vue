<template>
	<div class="detail">
		<!-- 公共tab样式类 tabs-item -->
		<div class="tabs-item">
			<Tabs :value="tab" type="card" @on-click="tabActive">
				<TabPane label="重要信息" name="1">
					<div class="choiceTabs" ref="choiceTabs" id="1">
						<important-info></important-info>
					</div>
				</TabPane>
				<TabPane label="贷款信息"  name="2">
					<div class="choiceTabs" ref="choiceTabs" id="2">
						<loan-info></loan-info>
					</div>
				</TabPane>
				<TabPane label="催收记录"  name="3">
					<div class="choiceTabs" ref="choiceTabs" id="3">
						催收记录
					</div>
				</TabPane>
				<TabPane label="资料影像"  name="4">
					<div class="choiceTabs" ref="choiceTabs" id="4">
						<image-data></image-data>
					</div>
				</TabPane>
				<TabPane label="通知记录"  name="5">
					<div class="choiceTabs" ref="choiceTabs" id="5">
						<notice-record></notice-record>
					</div>
				</TabPane>
				<TabPane label="分案记录"  name="6">
					<div class="choiceTabs" ref="choiceTabs" id="6">
						<record-cases></record-cases>
					</div>
				</TabPane>
				<TabPane label="案件详情"  name="7">
					<div class="choiceTabs" ref="choiceTabs" id="7">
						案件详情
					</div>
				</TabPane>
				<TabPane label="关联案件"  name="8">
					<div class="choiceTabs" ref="choiceTabs" id="8">
						关联案件
					</div>
				</TabPane>
			</Tabs>
			
		</div>
		<div class="btnGroup">
			<Button type="primary"  @click="">提前结清</Button>
			<Button type="primary"  @click="">提前委外</Button>
			<Button type="primary"  @click="">减免</Button>
			<Button type="primary"  @click="">停催</Button>
			<Button type="primary"  @click="">划扣</Button>
			<Button type="primary"  @click="">通知方式</Button>
		</div>
		<Row class="detail-row tabs-item">
	        <Col span="14">
				<Tabs value="tab1" type="card">
					<TabPane label="联系人信息" name="tab1">
						<contact-information></contact-information>
					</TabPane>
					<TabPane label="APP通讯录"  name="tab2">
						APP通讯录
					</TabPane>
					<TabPane label="电商信息"  name="tab3">
						电商信息
					</TabPane>
					<TabPane label="APP通话记录"  name="tab4">
						APP通话记录
					</TabPane>
					<TabPane label="运营商通话记录"  name="tab5">
						<operator-callrecord></operator-callrecord>
					</TabPane>
					<TabPane label="三方信修"  name="tab6">
						三方信修
					</TabPane>
				</Tabs>
	        </Col>
	        <Col span="10">
	        	<div class="wrap">
	        		<div class="wrap-title">
	        			<span class="line">&nbsp;</span>
	        			<span class="tit">催收备注</span>
	        		</div>
	        		<div class="from-item">
	        			<Form :model="formItem"  :label-width="80">
	        				<Row>
        						<Col span="12">
        							<FormItem label="联络人" style="padding-right: 10px;">
        								<Input v-model="formItem.lianluoren" size="large" ></Input>
        							</FormItem>
        						</Col>
						        <Col span="12">
						        	<FormItem label="联络号码">
	    								<Input v-model="formItem.lianluohaoma" size="large" ></Input>
	    							</FormItem>	
	    						</Col>
					        </Row>
					        <Row>
        						<Col span="12" style="padding-right: 10px;">
        							<FormItem label="电话码">
        								<Input v-model="formItem.dianhuama" size="large" ></Input>
        							</FormItem>
        						</Col>
						        <Col span="12" >
						        	<FormItem label="行动码">
	    								<Input v-model="formItem.xingdongma" size="large" ></Input>
	    							</FormItem>	
	    						</Col>
					        </Row>
					        <Row>
        						<Col span="24">
        							<FormItem label="跟呼日期">
        								<Input v-model="formItem.genghuriqi" size="large" ></Input>
        							</FormItem>
        						</Col>
					        </Row>
					        <Row>
        						<Col span="24">
        							<FormItem label="备注">
        								<Input v-model="formItem.beizhu" size="large" ></Input>
        							</FormItem>
        						</Col>
					        </Row>
					        <Row>
        						<Col span="24">
        							<FormItem label="">
        								<Button type="primary"  @click="">重置</Button>
        								<Button type="error"  @click="">提交</Button>
        							</FormItem>
        						</Col>
					        </Row>
	        			</Form>	
	        		</div>
	        	</div>
	        </Col>
	    </Row>
		<!--<div style="text-align: center;padding: 10px 0;">
			<Button style="width: 100px;" type="primary" @click.native="quit">退出</Button>
		</div>-->
	</div>
	
</template>

<script>
	import importantInfo from './detail/importantInfo'
	import loanInfo from './detail/loanInfo'
	import imageData from './detail/imageData'
	import noticeRecord from './detail/noticeRecord'	
	import recordCases from './detail/recordCases'
	import contactInformation from './detail/contactInformation'
	import operatorCallrecord from './detail/Operatorcallrecord'
	export default{
		data(){
			return{
				tab:'1',//tabs切换默认页
				title:'我的电催案件',
				formItem:{
					lianluoren:'',
					lianluohaoma:'',
					dianhuama:'',
					xingdongma:'',
					genghuriqi:'',
					beizhu:''
				},
				allselect:{
					Input:'',
					select1:'',
					select2:'',
					select3:'',
					select4:'',
					select5:'',
					select6:'',
					select7:'',
					select8:'',
					select9:''
				}
			}
		},
		components: {
	      importantInfo,
	      loanInfo,
	      imageData,
	      noticeRecord,
	      recordCases,
	      contactInformation,
	      operatorCallrecord
	    },
		methods:{
			tabActive(name){
				this.tab=name;
				console.log(this.$refs.choiceTabs[name])
			},
			quit(){
				this.$router.replace('myCase')
			}
		},
		created(){

		}
	}
</script>

<style scoped lang="less" >
	@import url("../../../assets/css/pubVar.less");
	.detail{
		.detail-row{
			margin-top: 30px;
		}
		.wrap{
			padding-left: 20px;
			padding-top: 2px;
			
		}
	}
	
</style>