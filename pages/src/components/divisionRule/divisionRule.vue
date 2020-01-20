<template>
	<div class="recoveryRule">
		<!-- 公共Header类 -->
		<Collapse class="header-Collapse">
			<Panel name="1">
				<span class="head-commom">策略配置</span>
			</Panel>
		</Collapse>
		<div class="add_button">
			<Button v-if="this.getAuth('06000010101')" @click="add_button" :disabled=add_rule||detail_rule||showCard>新增分案</Button>
		</div>
		<!-- 公共tab样式类 tabs-item -->
		<div class="table-warper">
			<div class="table-item">
				<Table border :stripe="true" :columns="rules" :data="rule_datas"></Table>
			</div>
			<!-- 公共page分页类 -->
			<div class="page-item">
				<Page height='396' :total="pageTotal" :current="current" :page-size="pageSize" show-total show-sizer @on-change="change_page" @on-page-size-change="change_pageSize"></Page>
				<!--<span style="margin-left: 5px;">共<span style="margin-left: 3px;margin-right: 3px;">{{totalye}}</span>页</span>-->
				<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
			</div>
		</div>
		<!--新增分案弹窗-->
		<Modal v-model="add_rule" :loading="loading" :title="edit_ === false ? '新增分案配置':'编辑分案配置'" class-name="addRules" draggable @on-cancel='Close_Modal'>
			<div class="rule_content">
				<ul>
					<li class="first">
						<span class="first_s_left">团队分案配置</span>
						<div class="first_d_right">
							<Form label-position="right" inline :model='add_list' :rules="ruleValidate" ref="add_list">
								<FormItem label="方案名称" prop="ruleName">
									<Input type="text" v-model='add_list.ruleName' placeholder="请输入方案名称" size="large" :maxlength="50"></Input>
								</FormItem>
								<FormItem label="入催时间" prop="intoCurrinfoDay">账单前
									<Input type="text" v-model="add_list.intoCurrinfoDay" class='timeFront' placeholder="输入数字" size="large" :maxlength="50"></Input>日入催
								</FormItem>
								<FormItem label= '催收团队' class='team_box'>
									<CheckboxGroup v-model="CheckTeam" @on-change="Check_Team">
										<Checkbox :key="team.urgeTeamId" :label=JSON.stringify(team) v-for="team in teamlists">
											{{team.urgeTeamName}}
										</Checkbox>
									</CheckboxGroup>
								</FormItem>
								<div v-for="(f,index) in add_list.teamList" :key="index" style='background:#f2f2f2;margin-bottom:5px;'>
									<FormItem class='teanName'>
										<Input type="text" disabled size="large" :maxlength="50" :value='f.teamName'></Input>
									</FormItem>
									<FormItem class='beginDays' label="入催时间">
										<Input type="text" v-model="f.beginDays" class='timeFront' placeholder="输入数字" size="large" :maxlength="50"></Input>天至
									</FormItem>
									<FormItem class='endDays'>
										<Input type="text" v-model="f.endDays" class='timeFront' placeholder="输入数字" size="large" :maxlength="50"></Input>天
									</FormItem>
									<FormItem label="案件进入团队时间">
										<RadioGroup v-model='f.inExecuteType'>
											<Radio label="2">按日</Radio>
											<Radio label="1">按月</Radio>
										</RadioGroup>
									</FormItem>
									<FormItem label="案件离开团队时间">
										<RadioGroup v-model="f.outExecuteType">
											<Radio label="2">按日</Radio>
											<Radio label="1">按月</Radio>
										</RadioGroup>
									</FormItem>
								</div>
							</Form>
						</div>
					</li>
					<li class="last">
						<span class="last_s_left">委外配置</span>
						<div class="last_d_right">
							逾期大于 <input class='weiwaiInput' v-model="add_list.outSideDay" type="text">&nbsp;天,案件自动进入委外
						</div>
					</li>
					<li class="last">
						<span class="last_s_left">产品类型选择</span>
						<div class="last_d_right">
							<CheckboxGroup v-model="productList" @on-change="check_productList">
								<Checkbox :key="product.productTypeNo" v-for="product in all_productList" :label="product.productTypeNo">
									{{product.productTypeName}}
								</Checkbox>
							</CheckboxGroup>
						</div>
					</li>
				</ul>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="Close_Modal">取消</Button>
				<Button type="primary" size="large" :disabled="doNotSubmit" @click="Submit_Rule('add_list')">保存</Button>
			</div>
		</Modal>
		<!--查看分案详情弹窗-->
		<Modal v-model='detail_rule' :loading="loading" footer-hide draggable title="分案配置详情" class-name="addRules">
			<div class="rule_content">
				<ul>
					<li class="first">
						<span class="first_s_left">团队分案配置</span>
						<div class="first_d_right">
							<ul>
								<li class="f_d_r_content">
									<span class="s_left">方案名称：</span>
									<span class="s_right">{{details_info.ruleName}}</span>
								</li>
								<li class="f_d_r_content">
									<span class="s_left">入催时间：</span>
									<span class="s_right"> 账单前 {{details_info.intoCurrinfoDay}} 日入催
									</span>
								</li>
								<li class="f_d_r_content">
									<span class="s_left">催收团队：</span>
<!-- 									<div class="s_right" style="line-height:30px;" v-if="details_info.serverLineEn === 'XD'">信贷</div>
									<div class="s_right" style="line-height:30px;" v-if="details_info.serverLineEn==='XJ'">
										消金
									</div> -->
								</li>
								<li class="special" style="height:auto;" v-for="team in details_info.teamList">
									<div style="width:100%;" class="special_div">
										<p>
											<span class="little_span_left" style="text-indent:15px;">{{team.teamName}}</span>
										</p>
										<p>
											<span class="little_span_left">入催时间：</span>
											<span class="time_rule">{{team.beginDays}}&nbsp;天至{{team.endDays}}天</span>
										</p>
										<p>
											<span class="little_span_left">案件进入团队时间:</span>
											<span v-if="team.inExecuteType == 2">按日</span>
											<span v-if="team.inExecuteType == 1">按月</span>
										</p>
										<p>
											<span class="little_span_left">案件离开团队时间:</span>
											<span v-if='team.outExecuteType ==2'>按日</span>
											<span v-if='team.outExecuteType ==1'>按月</span>
										</p>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li class="last">
						<span class="last_s_left">委外配置</span>
						<div class="last_d_right">
							逾期大于 <span style='padding: 0 10px;'>{{details_info.outSideDay}}</span>&nbsp;天,案件自动进入委外
						</div>
					</li>
					<li class="last">
						<span class="last_s_left">产品类型选择</span>
						<div class="last_d_right">
							<span v-for="prod in details_info.productList">
								{{prod.productTypeName}}
							</span>
						</div>
					</li>
				</ul>
			</div>
		</Modal>
		<!--Modal 更多产品类型-->
		<Modal v-model="showCard" draggable :mask-closable="false" :scrollable="true" :loading="loading" title="更多产品类型">
			<div>{{productTypeNameMost}}</div>
			<div slot="footer">
				<!--<Button type="text" size="large" @click="cancel">取消</Button>-->
				<!--<Button type="primary" size="large" @click="">确定</Button>-->
			</div>
		</Modal>
	</div>
</template>

<script>
	import store from '../../store/index'
	export default {
		name: "recoveryRule",
		data() {
			//入催时间
			const intoCurrinfoDay = (rule, value, callback) => {
				const intoCurrinfoDay = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
				if(value === '') {
					callback(new Error('入催时间不能为空'));
					return;
				} else if(!intoCurrinfoDay.test(value)) {
					callback(new Error('入催时间只能为整数'));
					return;
				} else {
					callback();
				}
			}
			return {
				showCard: false, //更多产品类型显示框
				productTypeNameMost: '', //全部的产品类型
				// 查询数据时传递给服务器的
				search_data: {
					pageSize: '10',
					pageIndex: '1',
				},
				/*新增规则配置弹窗部分的数据*/
				doNotSubmit: false, //点击以后，没有提交成功，就不能再点击
				loading: true, // 开启弹窗的样式
				add_rule: false, // 是否显示弹窗
				CheckTeam: [], // 选择的团队
				productList: [], // 选择的产品类型（选中的产品类型）
				entry_time_rule: '', // 进入团队时间
				live_time_rule: '', // 离开团队时间
				edit_: false,
				/*查看规则配置详情 弹窗*/
				detail_rule: false,
				details_info: {},
				/*表格部分的数据*/
				rules: [{
						title: '方案名称',
						key: 'ruleName',
					},
					{
						title: '产品类型',
						key: 'productTypeName',
						render: (h, parms) => {
							return h('div', [
								h('div', {
									style: {
										marginRight: '5px',
										display: 'inline-block'
									}
								}, this.productTypeNameList(parms.row)),
								h('span', {
									style: {
										marginRight: '5px',
										color: 'blue',
										cursor: 'pointer',
										display: parms.row.productTypeName != null ? 'inline' : 'none'
									},
									on: {
										click: () => {
											this.productTypeNameShow(parms.row)
										}
									}
								}, '更多>>')
							])
						}
					},
					{
						title: '操作',
						key: 'action',
						render: (h, parms) => {

							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.detail_rule || this.add_rule || this.showCard
									},
									style: {
										display: this.getAuth('06000010102') ? 'inline-block' : 'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.details_rule(parms.row)
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.detail_rule || this.add_rule || this.showCard
									},
									style: {
										display: this.getAuth('06000010103') ? 'inline-block' : 'none',
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.edit_rule(parms.row.idKey)
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
										disabled: this.detail_rule || this.showCard || this.add_rule || parms.row.productTypeName != undefined ?
											true : false
									},
									style: {
										display: this.getAuth('06000010104') ? 'inline-block' : 'none',
									},
									on: {
										click: () => {
											this.deleteRule(parms.row.idKey)
										}
									}
								}, '删除')
							])
						}
					}
				],
				rule_datas: [], // 表格显示的数据
				pageTotal: 1, // 总页数
				current: 1, // 显示第几页
				pageSize: 10, //每页显示多少条数据
				/*传给服务器的数据*/
				add_list: {
					"pageIndex": 1,
					"pageSize": 10,
					"ruleName": "", // 策略名称
					"outSideDay": "", // 进入委外的天数
					"idKey": "", // 编辑的数据
					"intoCurrinfoDay": '', // 入催时间
					"productList": [
						// {
						//   "idKey":"",
						//   "productNo":"",
						//   "productType":"35",
						//   "ruleId":""
						// }
					], // 产品类型
					"teamList": [
						// 						{
						// 						  "beginDays":'', // 开始时间
						// 						  "endDays":'', // 结束时间
						// 						  "idKey":"", // 编辑的时候 信息ID
						// 						  "inExecuteType":'', // 入团方式( 1 按月  2 按日
						// 						  "outExecuteType":'',// 出团方式( 1 按月  2 按日
						// 						  "ruleId":"",  //不传
						// 						  "teamNo":"",//  团队的id
						// 						}
					] // 团队ID
				},
				ruleValidate: { //必填验证
					ruleName: [{
						required: true,
						message: '方案名称不能为空',
						trigger: 'blur'
					}],
					intoCurrinfoDay: [{
						validator: intoCurrinfoDay,
						trigger: 'blur'
					}],
					beginDays: [{
						required: true,
						message: '入催开始时间不能为空',
						trigger: 'blur'
					}],
					endDays: [{
						required: true,
						message: '入催结束时间不能为空',
						trigger: 'blur'
					}],
					inExecuteType: [{
						required: true,
						message: '进入团队方式不能为空',
						trigger: 'blur'
					}],
					outExecuteType: [{
						required: true,
						message: '离开团队方式不能为空',
						trigger: 'blur'
					}]
				},
				check_add_list: {
					intoCurrinfoDay: '', //入催时间
				},
				teamlists: [], //可以进行规则配置的团队
				all_productList: [], //从服务器获取的全部产品类型
			}
		},
		methods: {
			// 默认查询显示的数据
			init(pageIndex,pageSize) {
				this.search_data.pageIndex =pageIndex|| this.search_data.pageIndex
				this.search_data.pageSize = pageSize || this.search_data.pageSize
				this.HttpAjax('post', 'getAllRule', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res.data.status === 200) {
						this.rule_datas = res.data.data.data
						this.pageTotal = res.data.data.dataCount
					}
				})
			},
			// 新增分案
			add_button() {
				this.add_list.outSideDay = '';
				// 查询所有的产品类型
				this.HttpAjax('post', 'productTypeServerLineList', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status === 200) {
						this.all_productList = res.data.data
						this.add_rule = true
					}
				});
				this.change_serverLine();
			},
			// 查看按钮点击事件
			details_rule(row) {
				this.HttpAjax('post', 'getRuleEdit', {
					"idKey": row.idKey
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status === 200) {
						this.details_info = res.data.data
						this.detail_rule = true;
					}
				})
			},
			// 编辑按钮点击事件(查询需要编辑的信息)
			edit_rule(idKey) {
				this.edit_ = true;
				this.add_button(); // 查询所有产品线
				this.HttpAjax('post', 'getRuleEdit', {
					"idKey": idKey
				}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status === 200) {
						this.add_rule = true;
						this.add_list = res.data.data
						res.data.data.teamList.forEach((itm, index) => {
							itm.inExecuteType = itm.inExecuteType.toString();
							itm.outExecuteType = itm.outExecuteType.toString();
						});
						for(let i = 0; i < res.data.data.productList.length; i++) {
							this.productList.push(res.data.data.productList[i].productType)
						}
					}
				})
			},
			// 切换页码
			change_page(page) {
				this.init(page)
			},
			// 切换每页显示数据条数
			change_pageSize(pageSize) {
				this.search_data.pageSize = pageSize;
				this.init('', pageSize);
			},
			// 刷新按钮点击事件
			refresh() {
				this.init()
			},
			// 取消按钮点击事件
			Close_Modal() {
				this.add_rule = false
				this.clean_arry();
			},
			// 保存按钮点击事件
			Submit_Rule(name) {
				const _ = this;
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.add_list.teamList.length === 0) {
							this.$layer.msg('请选择催收团队');
							return
						} else if(this.add_list.outSideDay === '') {
							this.$layer.msg('案件自动进入委外的时间不能为空');
							return
						} else {
							const outTime = /^[0-9]+$/;
							if(!outTime.test(this.add_list.outSideDay)) {
								this.$layer.msg('案件自动进入委外的时间只能为正整数');
								return
							}
							for(let i = 0, j = this.add_list.teamList; i < j.length; i++) {
								if(j[i].beginDays !== '' && j[i].endDays !== '' && j[i].inExecuteType !== '' && j[i].outExecuteType !== '') { // 入催时间段不为空
									const beginDays1 = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
									if(!beginDays1.test(j[i].beginDays) || !beginDays1.test(j[i].endDays)) {
										this.$layer.msg('请确保第"' + i + '"行的团队入催时间为整数');
										return
									} else {
										if(parseInt(j[i].beginDays) > parseInt(j[i].endDays)) {
											this.$layer.msg('前面时间不能大于后面时间');
											return
										}
									}
								} else {
									this.$layer.msg('请确保必填项不为空');
									return
								}
							}
						}
						this.doNotSubmit = true;
						// 新增分案规则
						if(this.edit_ === false) {
							this.HttpAjax('post', 'saveOrUpdateRule', {
								jsonStr: JSON.stringify(this.add_list)
							}, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false);
								if(res && res.data.status === 200) {
									_.$Notice.success({
										title: '成功',
										desc: '分案策略配置成功',
										duration: 2
									});
									this.clean_arry();
									this.add_rule = false;
									this.init();
								}
								this.doNotSubmit = false;
							})
						} else {
							// 编辑分案规则
							this.HttpAjax('post', 'saveOrUpdateRule', {
								jsonStr: JSON.stringify(this.add_list)
							}, (res) => {
								store.commit('UPDATE_LOADINGSTATE', false)
								if(res && res.data.status === 200) {
									_.$Notice.success({
										title: '成功',
										desc: '分案策略配置修改成功',
										duration: 2
									});
									this.edit_ = false;
									this.clean_arry();
									this.add_rule = false;
									this.init();
								}
								this.doNotSubmit = false;
							})
						}
					} else {
						// this.$Message.error('请输入信息');
					}
				})
			},
			//删除配置规则
			deleteRule(idKey) {
				const _ = this;
				_.$Modal.confirm({
					title: '删除模板',
					content: '确定删除这条策略配置吗？',
					onOk: () => {
						_.HttpAjax('post', 'deleteRule', {
							"idKey": idKey
						}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false)
							if(res && res.data.status === 200) {
								_.$Notice.success({
									title: '成功',
									desc: '模板策略配置成功',
									duration: 2
								});
								_.init()
							}
						})
					}
				});
			},
			// 查询可以配置规则的团队（业务线点击事件 （消金，信贷））
			change_serverLine() {
				const _ = this
				this.add_list.teamList = [];
				this.CheckTeam = [];
				this.HttpAjax('post', 'teamList', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false)
					if(res && res.data.status === 200) {
						if(res.data.data.data.length === 0) {
							_.$Notice.error({
								title: '失败',
								desc: '此业务线下面没有团队',
								duration: 0
							});
						}
						this.teamlists = res.data.data.data
					}
				})
			},
			// 多选框选择产品类型
			check_productList(productList) {
				if(productList.length !== 0) {
					this.add_list.productList = [];
					for(let j = 0; j < productList.length; j++) {
						this.add_list.productList.push({
							"idKey": "",
							"productNo": "",
							"productType": productList[j],
							"ruleId": ""
						})
					}
				} else if(productList.length === 0) {
					this.add_list.productList = [];
				}
			},
			// 多选框选择团队
			Check_Team(team) {
				this.add_list.teamList = [];
				team.forEach((r, i) => {
					r = JSON.parse(r)
					this.add_list.teamList.push({
						"teamName": r.urgeTeamName, //  团队名称
						"beginDays": '', // 开始时间
						"endDays": '', // 结束时间
						"idKey": '', // 编辑的时候 信息ID
						"inExecuteType": '', // 入团方式( 1 按月  2 按日
						"outExecuteType": '', // 出团方式( 1 按月  2 按日
						"ruleId": "", //不传
						"teamNo": r.urgeTeamId, //  团队的id
					})
				});
			},
			// 清空一切数组
			clean_arry() {
				this.edit_ = false;
				this.add_list.ruleName = ''; // 清空输入的名字
				this.add_list.intoCurrinfoDay = ''; // 清空如催时间
				this.add_list.idKey = ''; // 情况idKey
				this.teamlists = []; //  清空存储团队的数组
				this.add_list.teamList = []; // 清空调教给服务器的团队
				this.CheckTeam = []; //清空选中的团队
				this.productList = []; // 清空选中的 产品类型
				this.add_list.productList = []; // 清空传递的产品类型
				this.doNotSubmit = false; // 让按钮可以点击
			},
			//显示少量的产品类型(多余的隐藏)
			productTypeNameList(row) {
				let nameList = [],
					nameListShow = [];
				if(row.productTypeName != null) {
					nameList = row.productTypeName.split(',')
					for(let i = 0; i < nameList.length; i++) {
						if(i < 3) {
							nameListShow.push(nameList[i])
						}
					}
					return nameListShow.join(',')
				}
			},
			// 显示产品类型(显示隐藏的)
			productTypeNameShow(row) {
				this.showCard = true;
				this.productTypeNameMost = row.productTypeName
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style scoped lang="less">
	.recoveryRule {
		position: relative;
		.add_button {
			position: absolute;
			right: 15px;
			top: 5px;
			width: 95px;
			.ivu-btn {
				border-radius: 4px;
				outline: none;
				min-width: 90px;
				height: 30px;
			}
		}
	}
</style>
<style lang="less">
	.addRules {
		li {
			list-style: none;
			height: auto;
			border-radius: 4px;
			display: flex;
		}
		.rule_content {
			.first {
				height: auto;
				border: 1px solid #dcdcdc;
				border-radius: 4px;
				display: flex;
				.first_s_left {
					display: inline-block;
					width: 100px;
					height: auto;
					border-right: 1px solid #dcdcdc;
					line-height: 40px;
					text-align: center;
				}
				/*右边部分*/
				.first_d_right {
					flex: 1;
					margin-top: 10px;
					.f_d_r_content {
						display: flex;
						.s_left {
							display: inline-block;
							width: 100px;
							text-align: center;
							line-height: 35px;
						}
						.s_right {
							flex: 1;
							margin-top: 2px;
							line-height: 35px;
							.input {
								width: 200px;
								height: 30px;
								outline: none;
								border: 1px solid #dcdcdc;
								text-indent: 10px;
							}
							.start {
								width: 70px;
								height: 30px;
								margin: 0 5px;
								outline: none;
								border: 1px solid #dcdcdc;
								text-indent: 10px;
							}
							.xindai_button {
								.ivu-radio {
									.ivu-radio-inner {
										.ivu-radio-inner {
											.ivu-radio-input {
												display: inline-block;
												width: 14px;
												height: 14px;
												background: red !important;
											}
										}
									}
								}
							}
						}
					}
					.special {
						margin-top: 15px;
						.special_div {
							margin: 0 15px;
							background: #f2f2f2;
							p {
								margin-top: 10px;
							}
						}
						.little_span_left {
							display: inline-block;
							width: 115px;
							margin-right: 5px;
						}
						.time_rule {
							input {
								display: inline-block;
								width: 60px;
								height: 28px;
								text-indent: 5px;
								outline: none;
							}
						}
					}
				}
			}
			.last {
				height: auto;
				margin-top: 15px;
				border-radius: 3px;
				border: 1px solid #dcdcdc;
				display: flex;
				.last_s_left {
					display: inline-block;
					width: 100px;
					line-height: 40px;
					border-right: 1px solid #dcdcdc;
					text-align: center;
				}
				.last_d_right {
					flex: 1;
					line-height: 35px;
					margin-left: 15px;
					.weiwaiInput {
						height: 30px;
						margin-top: 2px;
						border: none;
						border: 1px solid #dcdcdc;
						border-radius: 3px;
						text-indent: 5px;
					}
				}
			}
		}
	}
</style>
<style lang='less'>
	.addRules {
		.rule_content {
			.first {
				.first_d_right {
					.ivu-form-inline {
						.ivu-form-item {
							margin-bottom: 15px !important;
							.ivu-form-item-label {
								text-align: center;
								width: 120px;
							}
							.ivu-form-item-content {
								margin-left: 120px;
								.ivu-input-wrapper {
									.ivu-input-large {
										font-size: 14px;
										height: 30px;
										padding: 6px 7px;
									}
								}
								.timeFront {
									width: 80px;
									margin: 0 4px;
								}
							}
						}
						.team_box{
							.ivu-form-item-content{
								/* height:110px !important;
								overflow: auto; */
							}
						}
						.teanName {
							.ivu-form-item-label {
								text-align: center;
								width: 0;
							}
							.ivu-form-item-content {
								margin-left: 2px !important;
								.ivu-input-large {
									height: 25px !important;
									font-size: 12px;
									border: none;
								}
							}
						}
						.allTeamList {
							.ivu-form-item-content {
								margin-left: 15px;
							}
						}
						.endDays {
							width: 100px;
							.ivu-form-item-content {
								width: 110px;
								margin-left: -15px;
								.ivu-input-wrapper {
									width: 70px;
								}
							}
							.ivu-form-item-error-tip {
								left: -10px !important;
							}
						}
						.beginDays {
							.ivu-form-item-label {
								text-align: center;
							}
							.ivu-form-item-content {
								width: 110px;
								.ivu-input-wrapper {
									width: 70px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>