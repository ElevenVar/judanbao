<template>
	<div id="home">
		<div class="header-top">
			<div class="top-title">待审批案件</div>
			<div class="home_card">
				<Tabs type="card">
					<TabPane label="收到"  v-if="this.getAuth('050000102') || this.getAuth('050000101') || this.getAuth('100000103')|| this.getAuth('050000104')|| this.getAuth('050000103')|| this.getAuth('100000105')">
						<div class="content-item" v-if="this.getAuth('050000102')">
							<router-link to="/outboardReview">
								<div class="itmeTops">
									<span class="count">{{home.entrustApplyCount}}</span>
									<img src="../../assets/img/ico/index1.png" alt="" />
								</div>
								<span class="test-emit">提前委外案件审核</span>
							</router-link>
						</div>
						<div class="content-item item2" v-if="this.getAuth('050000101')">
							<router-link to="/stopPressing">
								<div class="itmeTops">
									<span class="count">{{home.stopUrgeApplyCount}}</span>
									<img src="../../assets/img/ico/index2.png" alt="" />
								</div>
								<span class="test-emit">停催案件审核</span>
							</router-link>
						</div>
						<div class="content-item item3" v-if="this.getAuth('100000103')">
							<router-link to="/Settle">
								<div class="itmeTops">
									<span class="count">{{home.reductionSettleApplyCount}}</span>
									<img src="../../assets/img/ico/index3.png" alt="" />
								</div>
								<span class="test-emit">提前结清案件审核</span>
							</router-link>
						</div>
						<div class="content-item item4" v-if="this.getAuth('050000104')">
							<router-link to="/Letter">
								<div class="itmeTops">
									<span class="count">{{home.thirdPartyApplyCount}}</span>
									<img src="../../assets/img/ico/index4.png" alt="" />
								</div>
								<span class="test-emit">信修案件审核</span>
							</router-link>
						</div>
						<div class="content-item item5" v-if="this.getAuth('050000103')">
							<router-link to="/letterAudits">
								<div class="itmeTops">
									<span class="count">{{home.letterApplicationCount}}</span>
									<img src="../../assets/img/ico/index6.png" alt="" />
								</div>
								<span class="test-emit">信函案件审核</span>
							</router-link>
						</div>
						<div class="content-item item6" v-if="this.getAuth('100000105')">
							<router-link to="/Prove">
								<div class="itmeTops">
									<span class="count">{{home.settleProofCount}}</span>
									<img src="../../assets/img/ico/index5.png" alt="" />
								</div>
								<span class="test-emit">结清证明案件审核</span>
							</router-link>
						</div>
					</TabPane>
					<TabPane label="发起">
						<div class="content-item" v-if="this.getAuth('020000101')"> 
							<div class="itmeTops">
								<span class="count">{{statisticsApplyInfo.entrustApplyCount}}</span>
								<img src="../../assets/img/ico/index1.png" alt="" />
							</div>
							<span class="test-emit">提前委外案件申请</span>
						</div>
						<div class="content-item item2" v-if="this.getAuth('020000101')">
							<div class="itmeTops">
								<span class="count">{{statisticsApplyInfo.stopUrgeApplyCount}}</span>
								<img src="../../assets/img/ico/index2.png" alt="" />
							</div>
							<span class="test-emit">停催案件申请</span>
						</div>
						<div class="content-item item3" v-if="this.getAuth('100000102')">
							<router-link to="/FrontsSet">
								<div class="itmeTops">
									<span class="count">{{statisticsApplyInfo.reductionSettleApplyCount}}</span>
									<img src="../../assets/img/ico/index3.png" alt="" />
								</div>
								<span class="test-emit">提前结清案件申请</span>
							</router-link>
						</div>
						<div class="content-item item4" v-if="this.getAuth('090000101')">
							<router-link to="/thawingEasySearch">
								<div class="itmeTops">
									<span class="count">{{statisticsApplyInfo.thirdPartyApplyCount}}</span>
									<img src="../../assets/img/ico/index4.png" alt="" />
								</div>
								<span class="test-emit">三方信修申请</span>
							</router-link>
						</div>
						<div class="content-item item5" v-if="this.getAuth('120000101')">
							<router-link to="/LetterManagement">
								<div class="itmeTops">
									<span class="count">{{statisticsApplyInfo.letterApplicationCount}}</span>
									<img src="../../assets/img/ico/index6.png" alt="" />
								</div>
								<span class="test-emit">信函申请案件</span>
							</router-link>
						</div>
						<div class="content-item item6" v-if="this.getAuth('100000104')">
							<router-link to="/ProveSettle">
								<div class="itmeTops">
									<span class="count">{{statisticsApplyInfo.settleProofCount}}</span>
									<img src="../../assets/img/ico/index5.png" alt="" />
								</div>
								<span class="test-emit">结清证明案件</span>
							</router-link>
						</div>
					</TabPane>
				</Tabs>
			</div>
		</div>
		<div class="echar-warper">
			<Row>
				<Col :lg="{span:10}">
				<div class="pub spActive">
					<div class="header">
						<span class='span_left'>审批动态</span>
						<span class='span_right' @click='showModal'>更多申请</span>
					</div>
					<div class="noAuditCase" v-if="HomeAuditList.length <= 0">
						<div class="no">
							<img src="../../assets/img/ico/null.png" alt="" />
							<span>目前还没有审批动态</span>
						</div>
					</div>
					<ul v-else>
						<li v-if="item != null" v-for="(item,index) in HomeAuditList" :class="index % 2 == 0 ? 'pics' : '' ">
							<div>
								{{item.caseDescription}}
							</div>
						</li>
					</ul>
				</div>
				</Col>
				<Col :lg="{span:14}">
				<div class="pub caseDel" style="margin-left:15px">
					<Row>
						<Col :lg="{span:10}">
						<div class="caseHead">案件处理情况</div>
						<div class="case-content">
							<div class="case-item">
								<span class="counts">{{cased.allUrgeCount}}件</span>
								<span class="tipod">总案件数</span>
							</div>
							<div class="case-item">
								<span class="counts">{{cased.commitmentRepayUrgeCount}}件</span>
								<span class="tipod">承诺还款案件数</span>
							</div>
							<div class="case-item">
								<span class="counts">{{cased.accountPaidUrgeCount}}件</span>
								<span class="tipod">已还款案件数</span>
							</div>
							<div class="case-item">
								<span class="counts">{{cased.accountPaidUrgeAmt}}元</span>
								<span class="tipod">已还款案件金额</span>
							</div>
						</div>
						</Col>
						<Col :lg="{span:14}">
						<div class="echartPie" ref="myEchartPie"></div>
						</Col>
					</Row>
				</div>
				</Col>
				<Col :lg="{span:24}">
				<div class="pub echartLine" ref="myEchartLine"></div>
				</Col>
			</Row>
		</div>
		<!-- 系统通知消息  -->
		<div class="fixedMessage" v-if="newMessge.length > 0 && closeMsg">
			<div class="messageTop">
				<h3>系统通知</h3>
				<Icon size="22" type="md-close" @click="closeMsgFun" />
			</div>
			<div class="msgContent">
				<div class="item" v-for="(item,index) in newMessge" :key="index">{{item.title}}</div>
			</div>
		</div>
		<!-- 更多申请弹窗 -->
		<Modal v-model='More_Modal' title='更多申请' class='More_Modal_type'>
			<div class="from-items">
				<Form inline label-position="right">
					<FormItem label="审核事件" class="block-tips">
						<Select v-model='search_data.auditType' @on-change='shenheType' @on-open-change = 'ClearshenheType' placeholder="请选择审核事件">
							<Option value="1">停催申请</Option>
							<Option value="2">提前委外申请</Option>
							<Option value="3">结清证明申请</Option>
							<Option value="4">提前结清申请</Option>
							<Option value="5">百融信修申请</Option>
							<Option value="6">信函申请</Option>
						</Select>
					</FormItem>
					<FormItem label="合同编号" class="block-tips">
						<Input placeholder="请输入合同编号" v-model='search_data.loanContractNo'></Input>
					</FormItem>
					<FormItem label="审核状态" class="block-tips">
						<Select v-model='search_data.auditStatus':disabled="this.shenheTypeData.length == 0 ? true : false" placeholder="请选择审核状态">
							<Option v-for='item in this.shenheTypeData' :key='item.index' :value= 'item.value'>{{item.description}}</Option>
						</Select>
					</FormItem>
					<FormItem>
						<Button type="primary" @click='search'>查询</Button>
						<Button style="margin-left: 8px" @click='Reset'>重置</Button>
					</FormItem>
				</Form>
			</div>
			<!-- 公共tab样式类 tabs-item -->
			<div class="table-warper">
				<div class="table-item">
					<Table border :columns="columns" :data="datas"></Table>
				</div>
				<!-- 公共page分页类 -->
				<div class="page-item">
					<Page placement="top" :total="pageTotal" show-total show-sizer @on-change="jump" @on-page-size-change="jumppage"></Page>
					<Icon type="ios-refresh" style="font-size: 30px" @click="refresh" />
				</div>
			</div>
			<div slot="footer">
				<Button type="primary" size="large" @click='More_Modal = false'>关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import store from '../../store/index'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				// ---------更多申请 弹窗
				More_Modal: false,
				search_data: {//筛选字段
					pageIndex: '1',
					pageSize: '10',
					auditType: '', //审批类型
					loanContractNo: '', //合同号
					auditStatus: '',// 审批状态
				},
				columns: [{
						title: '申请事件',
						minWidth: 110,
						key: 'auditTypeName'
					},
					{
						title: '合同编号',
						minWidth: 160,
						key: 'loanContractNo'
					},
					{
						title: '客户姓名',
						minWidth: 100,
						key: 'loanName'
					},
					{
						title: '申请人',
						minWidth: 100,
						key: 'applicantor'
					},
					{
						title: '申请时间',
						minWidth: 110,
						key: 'applyTime'
					},
					{
						title: '最近审核人',
						minWidth: 90,
						key: 'auditor'
					},
					{
						title: '最近审核时间',
						minWidth: 130,
						key: 'auditTime'
					},
					{
						title: '审核状态',
						minWidth: 90,
						key: 'auditStatusName'
					},
					{
						title: '操作',
						minWidth: 100,
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										size: 'small',
										type: 'info',
									},
									on: {
									click: () => {
										this.setStore('opreateBtn', {
											showBtn: 'private',
											allINFO: params.row
										})
										this.$router.push('finishDetail')
									}
									}
								}, '详情')
							])
						}
					},
				],
				datas: [],
				shenheTypeData:[],
				pageTotal: 0, //数据总条数
				// ----------------
				title: '首页',
				home: {
					entrustApplyCount: '0', //提前委外
					letterApplicationCount: '0', //信函申请
					reductionSettleApplyCount: '0', //减免提前结清
					stopUrgeApplyCount: '0', //停催
					thirdPartyApplyCount: '0', //三方信修
					settleProofCount: '0', //结清证明审核
				},
				statisticsApplyInfo: {
					entrustApplyCount: '0', //提前委外申请
					letterApplicationCount: '0', //信函申请
					reductionSettleApplyCount: '0', //减免提前结清申请
					stopUrgeApplyCount: '0', //停催申请
					thirdPartyApplyCount: '0', //三方信修申请
					settleProofCount: '0', //结清证明申请
				},
				cased: {
					allUrgeCount: '0', //宗案件数
					commitmentRepayUrgeCount: '0', //承诺还款案件数量
					accountPaidUrgeCount: '0', //已还款案件数量
					accountPaidUrgeAmt: '0', //已还款金额
				},
				cover: {
					dateTime: [], //日期
					notRemarksMoreThanThreeDaysRatio: [], //3+未开案率
					notRemarksWithinThreeDaysRatio: [], //1-3日未开案率
					remarksCaseRatio: [], //开案率
				},
				HomeAuditList: [], //审批动态
				newMessge: [], //通知信息
				closeMsg: false
			}
		},
		components: {

		},
		computed: {
			...mapState([
				'unreadMSG'
			])
		},
		methods: {
			...mapMutations([
				'UPDATE_UNREAD_MESSAGE_STATUS'
			]),
			//审批案件查询
			getHomeToBeAudit() {
				const _ = this;
				// 待审批案件（收到
				_.HttpAjax('post', 'homeToBeAudit', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == 200) {
						for (let i in _.home) {
							_.home[i] = res.data.data[i];
						}
					}
				});
				//  申请 （发起
				_.HttpAjax('post', 'statisticsApplyInfo', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == 200) {
						for (let i in _.home) {
							_.statisticsApplyInfo[i] = res.data.data[i];
						}
					}
				});
				//审批动态
				_.HttpAjax('post', 'homeAuditDy', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == 200) {
						_.HomeAuditList = res.data.data;
					}
				});
				//案件处理情况
				_.HttpAjax('post', 'homeCaseSit', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == 200) {
						for (let i in _.cased) {
							_.cased[i] = res.data.data[i];
						}
						_.initeEchartPie();
					}
				}, 'count');
				//案件覆盖情况
				_.HttpAjax('post', 'homeCaseCov', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data.status == 200) {
						let len = res.data.data;
						for (let i = 0; i < len.length; i++) {
							_.cover.dateTime.push(len[i].date); //日期
							_.cover.notRemarksMoreThanThreeDaysRatio.push(len[i].notRemarksMoreThanThreeDaysRatio); //3+未开案率
							_.cover.notRemarksWithinThreeDaysRatio.push(len[i].notRemarksWithinThreeDaysRatio); //1-3日未开案率
							_.cover.remarksCaseRatio.push(len[i].remarksCaseRatio); //开案率
						}
						_.initeEchartLine();
					}
				});

			},
			initeEchartPie() {
				let _ = this;
				_.chart = echarts.init(_.$refs.myEchartPie);
				// 把配置和数据放这里
				_.chart.setOption({
					title: {
						textStyle: {
							fontSize: 16
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						x: 'right',
						y: '300',
						data: ['总案件数', '承诺还款案件数'],
						width: '20%'
					},
					color: [
						'#FFB128', '#7460EE'
					],
					series: [{
						name: '案件处理情况',
						type: 'pie',
						radius: ['50%', '85%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: _.cased.allUrgeCount,
								name: '总案件数'
							},
							{
								value: _.cased.commitmentRepayUrgeCount,
								name: '承诺还款案件数'
							},
						]
					}]
				})
			},
			initeEchartLine() {
				let _ = this;
				_.chart = echarts.init(_.$refs.myEchartLine);
				// 把配置和数据放这里
				_.chart.setOption({
					title: {
						text: '案件覆盖情况',
						textStyle: {
							fontSize: 16
						}
					},
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						data: ['开案率', '1-3日未触碰率', '3日+未触碰率'],
						width: '100%'
					},
					color: [
						'#FD6D64', '#7465EB', '#FAD352'
					],
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: _.cover.dateTime
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '开案率',
							type: 'line',
							data: _.cover.remarksCaseRatio
						},
						{
							name: '1-3日未触碰率',
							type: 'line',
							data: _.cover.notRemarksWithinThreeDaysRatio
						},
						{
							name: '3日+未触碰率',
							type: 'line',
							data: _.cover.notRemarksMoreThanThreeDaysRatio
						}
					]
				});
			},
			//获取用户最近的三条通知  是否有新通知
			getSysNoticeUserCounts() {
				const _ = this;
				_.HttpAjax('post', 'getNoticeByHome', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res.data && res.data.status == 200) {
						if (res.data.data.length > 0) {
							_.newMessge = res.data.data;
							this.closeMsg = true;
							store.commit('UPDATE_UNREAD_MESSAGE_STATUS', true);
						} else {
							store.commit('UPDATE_UNREAD_MESSAGE_STATUS', false);
						}
					}
				});
			},
			closeMsgFun() {
				this.closeMsg = false;
			},
			openNoMsg(authId) {
				const _ = this;
				if (!_.getAuth(authId)) {
					_.$Modal.info({
						title: '权限',
						content: '没有权限查看当前页面',
					})
				}
			},
			// 查询更多申请
			getMoreData(pageIndex , pageSize){
				this.search_data.pageIndex = pageIndex || this.search_data.pageIndex
				this.search_data.pageSize = pageSize || this.search_data.pageSize
				this.HttpAjax('post', 'auditedDynamicsDetails', this.search_data, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if (res && res.data.status == 200) {
						this.datas = res.data.data.data
						this.pageTotal = res.data.data.dataCount
					}
				})
			},
			//更多申请
			showModal() {
				this.More_Modal = true;
				this.getMoreData()
			},
			// 查询
			search(){
				this.getMoreData();
			},
			//重置
			Reset(){
				this.shenheTypeData = []
				for(let i in this.search_data){
					if (i != 'pageIndex' && i != 'pageSize') {
						this.search_data[i] = '';
					}
				}
				this.getMoreData();
			},
			// 页码切换
			jump(page) {
				this.getMoreData(page)
			},
			// 每页条数切换
			jumppage(pageSize) {
				this.getMoreData('', pageSize)
			},
			// 刷新按钮
			refresh() {
				this.getMoreData();
			},
			//获取审核状态
			shenheType(val){
				if(val != undefined){
					this.HttpAjax('post','DictionaryGetDictionariesByLabel',{
						label: val,
						type: 'audit_status'
					},(res)=>{
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status == 200){
							this.shenheTypeData = res.data.data
						}
					})
				}
			},
			//审核时间展开
			ClearshenheType(val){
				if(val){
					this.shenheTypeData = [];
				}
			}
		},
		created() {
			this.getHomeToBeAudit();

			//获取用户最近的三条通知  是否有新通知
			this.getSysNoticeUserCounts();
		},
		mounted() {
			let _ = this;
			_.$nextTick(() => {
				_.initeEchartLine();
			});
		}
	}
</script>

<style scoped lang="less">
	#home {
		.header-top {
			border: solid 1px #E6E6E6;
			border-radius: 6px;
			background: #fff;
			padding: 20px 20px 30px;

			.top-title {
				color: #1C2B36;
				font-size: 18px;
				font-weight: bold;
			}
		}

		.echar-warper {
			margin-top: 20px;

			.caseDel {
				.caseHead {
					font-size: 18px;
					font-weight: bold;
					color: #1C2B36;
					line-height: 35px;
				}

				.case-content {
					display: flex;
					flex-wrap: wrap;
					padding-left: 10px;

					.case-item {
						width: 45%;
						display: flex;
						flex-direction: column;
						margin-top: 30px;

						.counts {
							font-size: 24px;
							color: #2D3B45;
						}

						.tipod {
							font-size: 14px;
							color: #A6B8C1;
						}
					}
				}
			}

			.pub {
				padding: 10px;
				height: 400px;
				background-color: #fff;
				border: solid 1px #ececec;
				border-radius: 4px;
				box-shadow: 5px 5px 5px #ececec;
			}

			.echartPie {
				margin-left: 30px;
				height: 380px;
			}

			.echartLine {
				margin: 20px 0;
				height: 346px;
			}

			.spActive {
				.noAuditCase {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 320px;

					.no {
						display: flex;
						flex-direction: column;

						span {
							margin-top: 20px;
							font-size: 14px;
							color: #333;
						}
					}
				}

				.header {
					height: 30px;

					.span_left {
						color: #1C2B36;
						font-size: 18px;
						font-weight: bold;
					}

					.span_right {
						float: right;
						margin-top: 5px;
						cursor: pointer;
						text-decoration: underline;
					}
				}

				ul {
					height: 320px;
					overflow-y: auto;

					li {
						height: 40px;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.tips {
							color: #1C2B36;
							margin-right: 15px;
						}

						&.pics {
							background-color: #F9F9F9;
						}
					}
				}

				.more {
					float: right;
					width: 70px;
					text-align: right;
					color: #3F6FB1;
					line-height: 35px;
					padding-right: 20px;
				}
			}
		}

		.fixedMessage {
			position: fixed;
			bottom: 45px;
			right: 30px;
			width: 470px;
			background-color: #FFF;
			border: solid 1px #dedede;
			border-radius: 5px;
			padding: 10px;

			.messageTop {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1px #dedede;

				h3 {
					font-size: 18px;
				}

				.ivu-icon {
					cursor: pointer;
				}
			}

			.msgContent {
				height: 100px;

				.item {
					height: 30px;
				}
			}
		}
	}
</style>
<style lang="less">
	.More_Modal_type {
		.ivu-modal {
			min-width: 1500px !important;

			.ivu-modal-content {
				width: 1500px !important;

				.ivu-modal-body {
					max-height: 650px !important;

					.from-items {
						padding: 10px;

						.ivu-form {
							display: inline-block;

							.block-tips.ivu-form-item {
								.ivu-form-item-label {
									border: 1px solid #dddee1;
									display: inline-block;
									line-height: 13px;
									border-right: 0;
									width: 110px;
									text-align: center;
								}

								.ivu-form-item-content {
									border: 1px solid #dddee1;
									display: inline-block;
									width: 250px;

									/* 下拉选择框 */
									.ivu-select {
										.ivu-select-selection {
											width: 100%;
											border: none;
											border-radius: 0;
										}
									}

									/* 输入框 */
									.ivu-input-wrapper {
										width: 250px;
										margin: 0;

										.ivu-input {
											border: none !important;
											width: 99% !important;
										}
									}
								}
							}
						}
					}

					.table-warper {
						padding: 5px;
						padding-bottom: 0;
					}
				}

			}
		}
	}

	.header-top {
		.home_card {
			padding: 10px;
			margin-top: 10px;
			border: 1px solid #dcdcdc;

			.ivu-tabs .ivu-tabs-content-animated {
				.ivu-tabs-tabpane {
					display: flex;
					justify-content: space-between;

					.content-item {
						width: 15%;
						height: 120px;
						background: #47B0F7;
						border-radius: 12px;

						.itmeTops {
							display: flex;
							margin: 20px 20px 0;
							justify-content: space-between;
							align-items: center;
							color: #fff;

							.count {
								font-size: 36px;
							}

							img {
								width: 70px;
								height: 70px;
							}
						}

						.test-emit {
							padding-left: 20px;
							font-size: 16px;
							color: #fff;
						}

						&.item2 {
							background-color: #10CFBD;
						}

						&.item3 {
							background-color: #7460EE;
						}

						&.item4 {
							background-color: #EF6E6E;
						}

						&.item5 {
							background-color: #3F51B5;
						}

						&.item6 {
							background-color: #FFC108;
						}
					}
				}
			}
		}
	}
</style>
