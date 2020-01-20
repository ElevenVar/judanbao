<template>
	<div class="layout" :id="skinShow" @click="hideQnWarp">
		<Layout>
			<Header>
				<div class="left-logo">
					<img src="../../assets/img/logo-m.png" alt="" />
				</div>
				<div class="right-user-item">
					<div class="item-ico" style="padding-right:0;">
						<i class="iconfont" style="font-size:25px" title="头像">&#xe6b0;</i>
					</div>
					<Dropdown class="item-ico" style="padding-left:0;" @on-click="dropSelect">
						<div>
							<span class="userName">{{JSON.parse(userInfo).userBean.name}}</span>
							<Icon type="ios-arrow-down"></Icon>
						</div>
						<DropdownMenu slot="list">
							<DropdownItem name="1">修改密码</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<div class="item-ico">
						<img title="下载使用说明书" @click="helpWord" src="../../assets/img/ico/icon_wt_bottom@2x.png" />
					</div>
					<div class="item-ico" @click="Sign" :class="{onLine:sign}">
						<Icon type="md-calendar" style="font-size:25px;" title="签到" />
					</div>
					<div class="item-ico" :class="{onLine:qnInfo.login}" @click.stop.parvent="qn_warper_show">
						<Icon type="ios-call" style="font-size:25px" title="电话" />
					</div>
					<div class="item-ico">
						<!--<i class="iconfont" style="font-size:25px" title="换肤">&#xe743;</i>-->
						<Dropdown placement="bottom-start" @on-click="showColor">
							<a href="javascript:void(0)">
								<i class="iconfont" style="font-size:25px" title="换肤">&#xe743;</i>
							</a>
							<DropdownMenu slot="list">
								<DropdownItem name="skin">默认&nbsp;&nbsp;
									<Icon type="md-checkmark" v-if="skinShow=='skin'" />
								</DropdownItem>
								<DropdownItem name="skinGreen">绿色&nbsp;&nbsp;
									<Icon type="md-checkmark" v-if="skinShow=='skinGreen'" />
								</DropdownItem>
								<DropdownItem name="skinRed">红色&nbsp;&nbsp;
									<Icon type="md-checkmark" v-if="skinShow=='skinRed'" />
								</DropdownItem>
								<DropdownItem name="skinBlack">黑莓&nbsp;&nbsp;
									<Icon type="md-checkmark" v-if="skinShow=='skinBlack'" />
								</DropdownItem>
								<DropdownItem name="skinOther">灰白&nbsp;&nbsp;
									<Icon type="md-checkmark" v-if="skinShow=='skinOther'" />
								</DropdownItem>
				                <DropdownItem name="skinLightgreen">浅绿
				                  <Icon type="md-checkmark" v-if="skinShow=='skinLightgreen'" />
				                </DropdownItem>
				                <DropdownItem name="skinLightpink">浅粉
				                  <Icon type="md-checkmark" v-if="skinShow=='skinLightpink'" />
				                </DropdownItem>
				                <DropdownItem name="skinPinkgreen">粉绿
				                  <Icon type="md-checkmark" v-if="skinShow=='skinPinkgreen'" />
				                </DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div class="item-ico" v-on:click="goLogin">
						<i class="iconfont" style="font-size:22px" title="退出登录">&#xe6b2;</i>
					</div>
				</div>
				<!-- 青牛电话登录  -->
				<div id="qn_login" v-if="qn_login.show" @click.stop.parvent="">
					<div class="QnLoginHeader">
						<span class="tit">欢迎登录</span><span @click="qn_login.show = false" class="back">返回</span>
					</div>
					<div class="from-item-qn">
						<Form @submit.native.prevent="" label-position="right" :label-width="110" :model="qn_login" ref="formDataLogin" :rules="formDataLogin">
							<FormItem label="企业编号" prop="entId">
								<Input :clearable='true' size="large" placeholder="请输入企业编号！" :maxlength="30" v-model="qn_login.entId"></Input>
							</FormItem>
							<FormItem label="坐席工号" prop="agentId">
								<Input :clearable='true' size="large" placeholder="请输入坐席工号！" :maxlength="20" v-model="qn_login.agentId"></Input>
							</FormItem>
							<FormItem label="坐席密码" prop="agentPassword">
								<Input :clearable='true' type="password" size="large" placeholder="请输入坐席密码！" :maxlength="20" v-model="qn_login.agentPassword"></Input>
							</FormItem>
							<FormItem label="坐席分机" prop="agentNumber">
								<Input :clearable='true' size="large" placeholder="请输入坐席分机！" :maxlength="30" v-model="qn_login.agentNumber"></Input>
							</FormItem>
							<FormItem label="" style="margin-left:-110px">
								<!--<Checkbox v-model="qn_login.isRemeber">记录登录信息</Checkbox>-->
								<Checkbox v-model="qn_login.isForce">强制登录</Checkbox>
							</FormItem>
							<FormItem label="" style="margin-left:-110px">
								<Button ref="qnLoginRef" :disabled="loginLoding" type="primary" size="large" @click="QN_login">登录</Button>
								<span v-if="showErrorMsg" style="color:red;padding-left:20px">{{showMessage}}</span>
							</FormItem>
						</Form>
					</div>
				</div>
				<!-- 青牛电话操作  -->
				<div id="CPhone" v-if="qn.show" @click.stop.parvent="">
					<div class="CpHeader">
						<div class="cpUser">
							<span class="zxNum">{{qnInfo.seatWorker}}</span>
							<span class="zxNum1">{{qn.typeName}}</span>
							<Dropdown trigger="click" @on-click="setUserType">
								<Button type="primary" size="small">
						            	状态
						            <Icon type="ios-arrow-down"></Icon>
						        </Button>
								<DropdownMenu slot="list">
									<DropdownItem name="setReady" :selected="qn.type == 'setReady' ? true :false">置闲</DropdownItem>
									<DropdownItem name="setBusy"  :selected="qn.type == 'setBusy' ? true :false">置忙</DropdownItem>
									<DropdownItem name="setAway" :selected="qn.type == 'setAway' ? true :false">小休</DropdownItem>
									<DropdownItem name="loginout">登出</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>

						<div class="cpTimeMsg">
							<span v-if="qn.login" class="userEnter">已登录</span>
							<span v-else class="userEnter">未登录</span>
							<i class="ico" @click="QN_loginOut">
                <img src="../../assets/img/ico/icon_qn_dl@2x.png" alt="" />
               </i>
						</div>
					</div>
					<div class="from-item-qn">
						<Form @submit.native.prevent="" label-position="right" :label-width="110" :model="qn" ref="formData" :rules="formData">
							<FormItem label="呼叫号码" prop="outCallNumber">
								<Input :clearable='true' size="large" placeholder="请输入呼叫号码！" :maxlength="20" v-model="qn.outCallNumber"></Input>
							</FormItem>
							<FormItem label="外显号码" prop="disNumber">
								<Select :clearable='true' v-model="qn.disNumber" placeholder="请选择外显号码！" size="large">
									<Option v-for="(item,index) in qnInfo.explicArr" :value="item" :key="index">{{item}}</Option>
								</Select>
							</FormItem>
						</Form>
					</div>
					<div class="cpIcoCont">
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.makeCall}" style='position: relative;'>
							<div @click="makeCall">
								<i class="ico">
	          			<img v-if="qnStatus.makeCall" src="../../assets/img/ico/icon_qiniu_wh_nor@2x.png" alt="" />
	          			<img v-else src="../../assets/img/ico/icon_qiniu_wh_pre@2x.png" alt="" />
	          		</i>
							</div>
							<span style='color:#122035;height: 20px;line-height: 20px;position:absolute;top:40px;'>外呼</span>	
							<div v-if="!qnStatus.makeCall" style='width:100%;height:55px;position:absolute;top:0;left:0;'></div>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.makeCallInternal}">
							<i class="ico">
          			<img v-if="qnStatus.makeCallInternal" src="../../assets/img/ico/icon_qiniu_nh_nor@2x.png" alt="" />
          			<img v-else src="../../assets/img/ico/icon_qiniu_nh_pre@2x.png" alt="" />
          		</i>
							<span class="name">内呼</span>
						</div>
						<div class="icoItem" @click="QN_hangup" v-bind:class="{disabled:!qnStatus.hangup}">
							<i class="ico">
	                			<img v-if="qnStatus.hangup" src="../../assets/img/ico/icon_qiniu_hd_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_hd_pre@2x.png" alt="" />
	                		</i>
							<span class="name">挂断</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.hold}">
							<i class="ico">
	                			<img v-if="qnStatus.hold" src="../../assets/img/ico/icon_qiniu_bc_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_bc_pre@2x.png" alt="" />
	                		</i>
							<span class="name">保持</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.consult}">
							<i class="ico">
	                			<img v-if="qnStatus.consult" src="../../assets/img/ico/icon_qiniu_zx_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_zx_pre@2x.png" alt="" />
	                		</i>
							<span class="name">咨询</span>
						</div>

						<div class="icoItem" v-bind:class="{disabled:!qnStatus.transfer}">
							<i class="ico">
	                			<img v-if="qnStatus.transfer" src="../../assets/img/ico/icon_qiniu_zy_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_zy_pre@2x.png" alt="" />
	                		</i>
							<span class="name">转移</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.singleTransfer}">
							<i class="ico">
	                			<img v-if="qnStatus.singleTransfer" src="../../assets/img/ico/icon_qiniu_dbzy_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_dbzy_pre@2x.png" alt="" />
	                		</i>
							<span class="name">单步转移</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.conference}">
							<i class="ico">
	                			<img v-if="qnStatus.conference" src="../../assets/img/ico/icon_qiniu_hy_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_hy_pre@2x.png" alt="" />
	                		</i>
							<span class="name">会议</span>
						</div>

						<div class="icoItem" v-bind:class="{disabled:!qnStatus.observe}">
							<i class="ico">
	                			<img v-if="qnStatus.observe" src="../../assets/img/ico/icon_qiniu_jt_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_jt_pre@2x.png" alt="" />
	                		</i>
							<span class="name">监听</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.forceInsert}">
							<i class="ico">
	                			<img v-if="qnStatus.forceInsert" src="../../assets/img/ico/icon_qiniu_qck_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_qck_pre@2x.png" alt="" />
	                		</i>
							<span class="name">强插</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.forceAbort}">
							<i class="ico">
	                			<img v-if="qnStatus.forceAbort" src="../../assets/img/ico/icon_qiniu_qc_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_qc_pre@2x.png" alt="" />
	                		</i>
							<span class="name">强拆</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.fullAbort}">
							<i class="ico">
	                			<img v-if="qnStatus.fullAbort" src="../../assets/img/ico/icon_qiniu_quc_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_quc_pre@2x.png" alt="" />
	                		</i>
							<span class="name">全拆</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.routerToIVR}">
							<i class="ico">
	                			<img v-if="qnStatus.routerToIVR" src="../../assets/img/ico/icon_qiniu_hzivr_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_hzivr_pre@2x.png" alt="" />
	                		</i>
							<span class="name">回转IVR</span>
						</div>
						<div class="icoItem" v-bind:class="{disabled:!qnStatus.assistIVR}">
							<i class="ico">
	                			<img v-if="qnStatus.assistIVR" src="../../assets/img/ico/icon_qiniu_ivrxz_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_ivrxz_pre@2x.png" alt="" />
	                		</i>
							<span class="name">IVR协助</span>
						</div>
						<div class="icoItem" @click="qn_resert()" v-bind:class="{disabled:!qnStatus.reset}">
							<i class="ico">
	                			<img v-if="qnStatus.reset" src="../../assets/img/ico/icon_qiniu_cz_nor@2x.png" alt="" />
	                			<img v-else src="../../assets/img/ico/icon_qiniu_cz_pre@2x.png" alt="" />
	                		</i>
							<span class="name">重置</span>
						</div>
					</div>
				</div>

			</Header>
			<Layout>
				<Sider hide-trigger style="width:210px;min-width:210px;max-width:210px;">
					<!-- 菜单 -->
					<Menu ref="menuListReq" :accordion="true" :open-names='openName' :active-name="activeName" :style="height1" width="210px" @on-select="menuChange">
						<Submenu name="0">
							<template slot="title">
								<i class="iconfont icon-shouye"></i> {{company}}
							</template>
							<MenuItem name="/index">首页</MenuItem>
						</Submenu>
						<!-- 循环遍历菜单表 -->
						<Submenu v-if="item.selected" :name="index+1" v-for="(item,index) in menu" :key="menu.idKey">
							<template slot="title">
								<i class="iconfont" v-bind:class="item.styleIcon"></i>
								{{item.name}}
								<Badge status="error" v-if="item.name == '系统管理'  && unreadMSG "/>
							</template>
							<MenuItem
								v-if="item1.selected && item1.url != '/doneOutsideCase'"
								v-model="index1"
								:name="item1.url"
								v-for="(item1,index1) in item.childnume"
								:key="item.childnume.idKey">
								{{item1.name}}
								<Badge v-if="item1.url == '/sysNotice' && unreadMSG " status="error" />
							</MenuItem>

						</Submenu>

					</Menu>
				</Sider>
				<Layout class="LayoutContent">
					<Content :style="{padding:'15px 20px 10px', background: '#f7f7f7'}">
						<!--面包屑导航-->
						<div class="breadlink_wrap">
							<div v-for="(item,eq) in routesARR" :key="eq" :class="item.$class">
								<router-link @click.native.prevent="activelink(eq)" :to="item.$url">
									{{item.$name}}
									<Icon @click.prevent.stop="cancelBread(eq)" v-if="item.$url != '/index'" type="ios-close-circle-outline" />
								</router-link>
							</div>
						</div>
						<!--路由出口-->
						<keep-alive>
							<router-view v-if="$route.meta.keepAlive" :style="height" /></router-view>
						</keep-alive>
						<router-view v-if="!$route.meta.keepAlive" :style="height" ></router-view>
						
						<!--/* 全局加载样式  */-->
						<Spin fix v-if="loadingState">
							<Icon type="ios-loading" size='48' class="demo-spin-icon-load"></Icon>
							<div>加载中...</div>
						</Spin>
						<div class="company">
							Copyright © 2018. Judun All rights reserved.
						</div>

					</Content>
				</Layout>
			</Layout>
		</Layout>

		<Modal v-model="editPassword" draggable :mask-closable="false" :scrollable="true" title="修改密码">
			<!-- 公共form表单类 -->
			<div class="from-item">
				<Form label-position="right" :label-width="90" inline :model="editpw" :rules="editPassModal" ref="editPassModal">
					<FormItem label="用户名" prop="name">
						<Input :disabled="true" v-model="editpw.name" :style="width" type="text" placeholder="请输入用户名！" size="large" :maxlength="20"></Input>
					</FormItem>
					<FormItem label="原始密码" prop="oldPassword">
						<Input v-model="editpw.oldPassword" :style="width" type="password" placeholder="请输入原始密码！" size="large" :maxlength="20"></Input>
					</FormItem>
					<FormItem label="新密码" prop="newPassword">
						<Input v-model="editpw.newPassword" :style="width" type="password" placeholder="请输入新密码！" size="large" :maxlength="50"></Input>
					</FormItem>
					<FormItem label="重复新密码" prop="newPasswordTo">
						<Input v-model="editpw.newPasswordTo" :style="width" type="password" placeholder="请再次输入新密码！" size="large" :maxlength="50"></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button type="text" size="large" @click="editPassword = false">取消</Button>
				<Button type="primary" size="large" @click="editEnterPW('editPassModal')">确定</Button>
			</div>
		</Modal>

	</div>
</template>

<script>
	import store from '../../store/index'
	import { mapState, mapMutations } from 'vuex'
	import md5 from 'js-md5'
	import url from '../../service/url_config'

	export default {
		data() {
			// 验证规则
			const password = (rule, value, callback) => {
				if(!this.expReg.pw.test(value)) {
					callback(new Error('密码由8-16英文或数字组成!'));
				} else {
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value !== this.editpw.newPassword) {
					callback(new Error('两次密码不一致！'));
				} else {
					callback();
				}
			};

			return {
				sign: '', //签到
				company: '聚盾贷后系统',
				skinShow: 'skin',
				width: {
					'width': '388px'
				},
				routesARR: [{
					$name: '首页',
					$url: '/index',
					$class: 'comlink isdefault isactive'
				}], //保存点击时候的路由
				childnume: [],
				newRoutes: [], //保存去重之后的路由
				index1: '',
				activeName: '',
				openName: ['0'],
				height1: {
					height: 'auto',
					overflowY: 'auto',
					minHeight: '400px',
				},
				height: {
					height: 'auto',
					overflowY: 'auto',
					minHeight: '400px'
				},
				menu: [],
				qn: {
					show: false,
					login: false,
					type: 'loginout',
					typeName:'登出',
					outCallNumber: '',
					disNumber: '',
				},
				loginLoding: false,
				showErrorMsg: false,
				showMessage: '登录中....',
				qn_login: {
					show: false,
					isForce: false,
					entId: '', //企业编号id
					agentId: '', //坐席工号
					agentPassword: '', //坐席密码
					agentNumber: 'sip:', //坐席分机号
				},
				qnStatus: {
					makeCall: true, //外呼
					makeCallInternal: false, //内呼
					hangup: true, //挂断
					hold: false, //保持
					consult: false, //咨询
					transfer: false, //转移
					singleTransfer: false, //单步转移
					conference: false, //会议
					observe: false, //监听
					forceInsert: false, //强插
					forceAbort: false, //强拆
					fullAbort: false, //全拆
					routerToIVR: false, //回转IVR
					assistIVR: false, //IVR协助
					reset: true //重置
				},
				formData: {
					outCallNumber: [{
						required: true,
						message: '请输入呼叫号码！'
					}],
					disNumber: [{
						required: true,
						message: '请输入外显号码！'
					}],
				},
				formDataLogin: {
					entId: [{
						required: true,
						message: '请输入企业编号码！'
					}],
					agentId: [{
						required: true,
						message: '请输入坐席工号！'
					}],
					agentPassword: [{
						required: true,
						message: '请输入坐席密码！'
					}],
					agentNumber: [{
						required: true,
						message: '请输入坐席分机号！'
					}],
				},
				editPassword: false,
				editpw: {
					name: '',
					oldPassword: '',
					newPassword: '',
					newPasswordTo: ''
				},
				editPassModal: {
					name: [{
						required: true,
						message: '请输入用户名！'
					}],
					oldPassword: [{
						required: true,
						message: '请输入原始密码！'
					}],
					newPassword: [{
						required: true,
						message: '请输入新密码！'
					}, {
						validator: password,
						trigger: 'blur'
					}],
					newPasswordTo: [{
						required: true,
						message: '请再次输入新密码！'
					}, {
						validator: validatePassCheck,
						trigger: 'blur'
					}],
				},
			}
		},
		computed: {
			...mapState([
				'loadingState', 'userInfo', 'menuInfo', 'qnInfo','unreadMSG','autoLogin'
			])
		},
		methods: {
			...mapMutations([
				'DELETE_USERINFORMATION', 'UPDATE_QNUSERINFO', 'UPDATE_QNUSERLOGININFO','UPADTE_QN_EXPLICEARR'
			]),
			init() {
				const _ = this;
				_.menu = _.getStore("menu");
			},
			 //添加导航按钮
			menuChange(name) {
				const _ = this
				_.$router.push(name);
				for(let k = 0; k < _.routesARR.length; k++) {
					let r = _.routesARR[k];
					r.$class = 'comlink isdefault';
				};
				for(let i = 0; i < _.routesARR.length; i++) {
					let r = _.routesARR[i];
					if(r.$url == name) {
						r.$class = 'comlink isdefault isactive';
						break;
					} else {
						if(i == _.routesARR.length - 1) {
							if(_.getMenuObj(name).$name) {
								_.routesARR.push({
									$name: _.getMenuObj(name).$name,
									$url: _.getMenuObj(name).$url,
									$class: 'comlink isdefault isactive',
								});
							}
						}
					}
				};
			},
			// 面包屑点击事件
			activelink(index) {
				const _ = this;
				let len = _.routesARR.length;
				for(let k = 0; k < len; k++) {
					let r = _.routesARR[k];
					r.$class = 'comlink isdefault';
				};
				if(_.routesARR[index]) {
					_.routesARR[index].$class = 'comlink isdefault isactive';
				}
			},
			cancelBread(index) {
				const _ = this;
				let len = _.routesARR.length;
				if(_.routesARR[index].$class.indexOf('isactive') != -1) {
					for(let k = 0; k < len; k++) {
						let r = _.routesARR[k];
						r.$class = 'comlink isdefault';
					};
					if(index == len - 1) {
						_.$router.push(_.routesARR[len - 2].$url);
						_.routesARR[len - 2].$class = 'comlink isdefault isactive';
					} else {
						_.$router.push(_.routesARR[len - 1].$url);
						_.routesARR[len - 1].$class = 'comlink isdefault isactive';
					}
				}

				_.routesARR.splice(index, 1);
			},
			getMenuObj($url) {
				let obj = {};
				this.childnume.forEach((r, i) => {
					if(r.$url == $url) {
						obj = r;
					}
				});
				return obj;
			},
			//  退出登录
			goLogin() {
				this.$Modal.confirm({
					title: '注销登录',
					content: '确定注销登录，返回登录页吗？',
					draggable: true,
					onOk: () => {
						this.HttpAjax('post', 'loginOut', {}, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res) {
								if(this.qnInfo.login){
									this.QN_loginOut(); //青牛登出
									this.qnSingnInAndOut(this.qnInfo,'2');//青牛签出
								}
								store.commit('DELETE_USERINFORMATION');
								this.$router.replace('/login');
							}
						});
					}
				})
			},
			//青牛 --- 外呼
			makeCall() {
				const _ = this;
				if(_.qnStatus.makeCall){
					_.$refs['formData'].validate((valid) => {
						if(valid) {
							var result = WA.extend.makeCall({
								outCallNumber: _.qn.outCallNumber,
								disNumber: _.qn.disNumber
							});
							if(result.code == -1) {
								_.$Notice.error({
									title: '外呼失败！',
									desc: result.msg,
									duration: 1
								})
							}else if(result.code=='-2'){
							    _.$Notice.error({
									title: '外呼失败！',
									desc: '参数不合法！',
									duration: 1
								})
							}
							this.qnStatus.makeCall = false
						}
					});
				}
			}, 
			//青牛 --- 登录
			QN_login() {
				const _ = this;
				_.$refs['formDataLogin'].validate((valid) => {
					if(valid) {
						WA.extend.login({
							isForce: _.qn_login.isForce,
							entId: _.qn_login.entId, //企业ID
							agentId: _.qn_login.agentId, //坐席工号
							agentNumber: _.qn_login.agentNumber, //分机坐席
							agentPassword: _.qn_login.agentPassword //坐席密码
						});
						_.loginLoding = true;
						_.showErrorMsg = true;
						_.showMessage = '登录中....';
						let setTimes = setTimeout(()=>{
							/*_.loginLoding = false;*/
							if(_.showMessage == '登录中....'){
								_.showMessage = '登录中.... 请稍等！';
							}else{
								clearTimeout(setTimes);
							}
						},30000);
					}
				});
			},
			//青牛 --- 退出登录
			QN_loginOut() {
				const _=this;
				_.$Modal.confirm({
					title:'确认登出账号吗？',
					draggable: true,
					onOk: () => {
						let result = WA.extend.logout();
					}
				})
			},
			//青牛 --- 置忙
			QN_setBusy() {
				let result = WA.extend.setBusy();
				if(result.code != 0) {
					this.$Notice.error({
						title: '失败',
						desc: '置忙失败!',
						duration: 0
					})
				}
			},
			//青牛 --- 置闲
			QN_setReady() {
				let result = WA.extend.setReady();
				if(result.code != 0) {
					this.$Notice.error({
						title: '置闲失败',
						desc: '置闲失败!不符合置闲条件',
						duration: 0
					})
				}
			},
			//青牛 --- 小休
			QN_setAway() {
				let result = WA.extend.setAway(1);
				if(result.code != 0) {
					this.$Notice.error({
						title: '失败',
						desc: '小休失败!',
						duration: 0
					});
				}
			},//青牛 挂断
			QN_hangup() {
				if(this.qnStatus.makeCall){
					let result = WA.extend.hangup();
					// console.log(result)
					if(result.code != 0) {
						this.$Notice.error({
							title: '失败',
							desc: '挂断失败，未在通话中!',
							duration: 0
						});
					}
				}else {
					this.qnStatus.makeCall = true; //外呼
				}
			},
			//青牛 ---- 重置
			qn_resert(){
				const _=this;
				var result = WA.extend.reset();
			},
			//青牛 --- 实例化事件
			WAInit() {
				const _ = this;
				WA.init({
					ui: false,
					telVisible: true,
					sipUseCphone:true,
					callback: function(res) {
						//注册自定义事件处理器
						WA.registerEventHandler(function(data) {
							//登录成功
							if(data.type == 'EVENT_WEBAGENT_LOGIN') {
								_.qn.show = true;
								_.qn.login = true;
								_.qn.type = 'setBusy';
								_.qn.typeName = "置忙";
								_.qn_login.show = false;
								_.loginLoding = false;
								_.showErrorMsg = false;
								//更新青牛登录信息
								store.commit('UPDATE_QNUSERLOGININFO', true);
								let objs = {
									enterpriseExplicitNumber: data.ext.outBoundNumList,
									enterpriseNo: data.entId,
									seatWorker: data.agentId,
									seatTel: ''
								}
								
								store.commit('UPDATE_QNUSERINFO',objs);
								//获取青牛自带的外显号码
								let arr = _.getWXqccf(data);
								store.commit('UPADTE_QN_EXPLICEARR',arr);
								//青牛签入
								_.qnSingnInAndOut(objs,'1');
								
								//获取外显号码
								_.getExplicitNoList();
							}
							

							//异常断开
							if(data.type == 'EVENT_SOCKET_ABNORMAL_DISCONNECT') {
								_.loginLoding = false;
								_.showMessage = data.ext.errorMessage;

								store.commit('UPDATE_QNUSERLOGININFO', false);

								//青牛签出
								if(_.qnInfo.login){
									_.qnSingnInAndOut(_.qnInfo,'2');
								}
							}
							//登出
							if(data.type == 'EVENT_WEBAGENT_LOGOUT') {
								var forceLogout = data.ext && data.ext.forceLogout == '1';
								_.qn.show = false;
								_.qn_login.show = true;

								_.showErrorMsg = true;
								_.showMessage = forceLogout ? '异常登出' : '正常登出';

								store.commit('UPDATE_QNUSERLOGININFO', false);
								//青牛签出
								if(_.qnInfo.idKey && _.qnInfo.idKey != ''){
									_.qnSingnInAndOut(_.qnInfo,'2');
								}
							}
							//登出成功！
							if (data.type == 'EVENT_AGENT_LOGOUT') {
						        _.showErrorMsg = true;
						        _.showMessage = '';
								_.qn_login.show = true;
								_.qn.show = false;

								store.commit('UPDATE_QNUSERLOGININFO', false);
								//青牛签出
								if(_.qnInfo.idKey && _.qnInfo.idKey != ''){
									_.qnSingnInAndOut(_.qnInfo,'2');
								}
						    }
							//登出失败！
							if(data.type == 'EVENT_WEBAGENT_LOGOUT_FAIL') {
								_.$Notice.error({
									title: '登出失败！',
	            					desc:data.ext.errorMessage
								})
							}
							//内呼失败
							if(data.type == 'EVENT_CALL_CONTROL_FAIL') {
								_.$Notice.error({
									title: '内呼失败！',
									desc: data.ext.errorMessage,
									duration: 0
								});
							};
							//坐席接通电话 双方通话  预测试外呼
							if(data.type == 'EVENT_INBOUND_CONNECTED') {
								let tall = data.ext.strAni; //主叫号码
								if(_.qn.type != 'setBusy'){
									_.QN_setBusy()
								}
								_.HttpAjax('post', 'qnGetphoneBackCase', {
									phone: tall
								}, (res) => {
									store.commit('UPDATE_LOADINGSTATE', false);
									if(res && res.data.status == 200 && res.data.data != null) {
										_.setStore('opreateBtn', {
											allINFO: {
												loanContractNo: res.data.data
											}
										})
										_.$router.push('finishDetail')
									}
								});
							};
							//置闲事件
							if(data.type == 'EVENT_AGENT_READY'){
								_.qn.type = 'setReady';
								_.qn.typeName = "置闲";
								_.qnStatus.makeCall=false; //外呼
								_.qnStatus.hangup=false; //挂断
							}
							//置忙事件
							if(data.type == 'EVENT_AGENT_NOTREADY'){
								_.qn.type = 'setBusy';
								_.qn.typeName = "置忙";
								_.qnStatus.makeCall=true; //外呼
								_.qnStatus.hangup=true; //挂断
							}
							
							//登录失败
							if(data.type == 'EVENT_AGENT_LOGIN_FAIL') {
								_.loginLoding = false;
								_.showMessage = data.ext.errorMessage;
							}
							if(data.type == 'EVENT_WEBAGENT_LOGIN_FAIL') {
								_.loginLoding = false;
								_.showMessage = data.ext.errorMessage;
							}
						});

						//注册自定义结果处理器
						WA.registerResultHandler(function(data) {
							if(data.type == 'autoLogin' && data.code == '000') {
								_.$Notice.success({
									title: '自动登录成功！',
									desc: data.msg,
									duration: 2
								});
								_.qn.type = 'setBusy';
								_.qn.typeName = "置忙";
								_.qn.login = true;
								_.qn.show = true;
								_.qn_login.show = false;
								//更新青牛登录信息
								store.commit('UPDATE_QNUSERLOGININFO', true);
								let objs = {
									enterpriseExplicitNumber: data.ext.outboundList,
									enterpriseNo: data.ext.entId,
									seatTel: data.ext.agentDn,
									seatWorker: data.ext.agentId,
								}
								store.commit('UPDATE_QNUSERINFO',objs);
								//获取青牛自带的外显号码
								let arr = _.getWXqccf(data);
								store.commit('UPADTE_QN_EXPLICEARR',arr);
								//青牛签入
								_.qnSingnInAndOut(objs,'1');
								
								//获取外显号码
								_.getExplicitNoList();
							}
							if(data.type == 'autoLogin' && data.code == '-1'){
								_.qn_login.show = true;
								if(_.autoLogin && _.qnInfo.userId && _.qnInfo.userId != ''){
									WA.extend.login({
										isForce:_.qn_login.isForce,
										entId: _.qn_login.entId, //企业ID
										agentId: _.qn_login.agentId, //坐席工号
										agentNumber: _.qn_login.agentNumber, //分机坐席
										agentPassword: _.qn_login.agentPassword //坐席密码
									});
									_.qn_login.show = true;_.loginLoding = true;_.showErrorMsg = true;
									_.showMessage = '登录中....';
								}
							};
							//自动登录失败后
							if(data.type == 'autoLogin' && data.code != '000' && data.code != '-1'){
								_.showMessage = data.msg;
							}
							if(data.type == 'setReady' && data.code == '000') {
								_.qn.type = 'setReady';
								_.qn.typeName = "置闲";
								_.qnStatus.makeCall=false; //外呼
								_.qnStatus.hangup=false; //挂断

							}else if(data.type == 'setBusy' && data.code == '000') {
								_.qn.type = 'setBusy';
								_.qn.typeName = "置忙";
								_.qnStatus.makeCall=true; //外呼
								_.qnStatus.hangup=true; //挂断
							} else if(data.type == 'setAway' && data.code == '000') {
								_.qn.type = 'setAway';
								_.qn.typeName = "小休";
								_.qnStatus.makeCall=false; //外呼
								_.qnStatus.hangup=false; //挂断
							}
							
							if(data.type == 'login' && data.code != '000') {
								_.loginLoding = false;
								_.showMessage = data.msg;
							}
							if(data.type == 'forceLogin' && data.code != '000'){
								_.loginLoding = false;
								_.showMessage = data.msg;
							}
							if(data.type == 'logout' && data.code != '000'){
								_.$Notice.error({
									title: '登出失败！',
	            					desc:data.msg
								})
							}
						});

						//注册自定义状态监听器
						WA.registerStateListener(function(data) {
							if(data.key == 'INIT'){
								_.loginLoding = false;
								_.showMessage = '与服务器断开连接，初始化成功，请重新登录！';
							}
						});
					}
				});
			},
			setUserType(val) {
				const _ = this;
				switch(val) {
					case 'setReady':
						_.QN_setReady(); //置闲
						break;
					case 'setBusy':
						_.QN_setBusy(); //置忙
						break;
					case 'setAway':
						_.QN_setAway(); //小休
						break;
					case 'loginout':
						_.QN_loginOut(); //登出
						break;
					default:
						break;
				}

			},
			qn_warper_show() {
				const _ = this;
				if(_.qnInfo.login) {
					_.qn.show = !_.qn.show;
				} else {
					_.qn_login.show = !_.qn_login.show;
				}
			},
			dropSelect(name) {
				if(name == '1') {
					this.editPassword = true;
					this.editpw.name = JSON.parse(this.userInfo).userBean.name
				}
			}, //修改密码
			editEnterPW(name) {
				const _ = this;
				_.$refs[name].validate((valid) => {
					if(valid) {
						let data = {
							name: _.editpw.name,
							oldPassword: md5(_.editpw.oldPassword),
							newPassword: md5(_.editpw.newPassword),
						}
						_.HttpAjax('post', 'editPassWord', data, (res) => {
							store.commit('UPDATE_LOADINGSTATE', false);
							if(res.data.status == 200) {
								_.$Notice.success({
									title: '成功',
									desc: '密码修改成功,请重新登录！',
									duration: 2
								});
								setTimeout(() => {
									store.commit('DELETE_USERINFORMATION');
									_.$router.replace('/login');
								}, 1000);
							}
						});
					}
				});
			},
			 //换肤
			showColor(name) {
				this.skinShow = name;
				this.setCookie('skin', this.skinShow);
			},
			//帮助文档
			helpWord() { 
				let link = document.createElement('a');
				link.style.display = 'none';
				link.href = url.downloadUseGuide;
				document.body.appendChild(link);
				link.click();
			},
			// 签到按钮点击事件
			Sign() {
				let sign = this.getCookie('sign');
				if(!sign) {
					this.HttpAjax('post', 'signIn', {}, (res) => {
						store.commit('UPDATE_LOADINGSTATE', false);
						if(res && res.data.status === 200) {
							this.$Notice.success({
								title: '成功',
								desc: '签到成功',
								duration: 2
							});
							this.sign = true;
							this.setCookie('sign', true, 'today');
						}
					});
				} else {
					this.$Modal.info({
						title: '签到提示',
						content: '您今天已经签到了，明天再来吧！'
					})
				}
			}, 
			//青牛账号获取
			getQnAccoutInfo() {
				const _ = this;
				_.HttpAjax('post', 'qnGetUser', {}, (res) => {
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200 && res.data.data != null) {
						delete res.data.data.idKey;
						store.commit('UPDATE_QNUSERINFO', res.data.data);
						_.qn_login.entId = res.data.data.enterpriseNo;
						_.qn_login.agentId = res.data.data.seatWorker;
						_.qn_login.agentNumber = 'sip:' + res.data.data.seatTel;
						_.qn_login.agentPassword = res.data.data.seatPassword;
					}

				});
			},
			hideQnWarp() {
				const _ = this;
				if(_.qnInfo.login) {
					_.qn.show = false;
				} else {
					_.qn_login.show = false;
				}
			},
			//青牛签入----签出
			qnSingnInAndOut(obj,type){
				const _=this;
				obj = JSON.parse(JSON.stringify(obj))
				delete obj.enterpriseExplicitNumber;
				obj.signType = type;
				if(type == '1'){
					delete obj.idKey;
				}else if(type == '2'){
					obj.idKey = _.qnInfo.idKey;
				}
				_.HttpAjax('post','qnSignInOut',obj,(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						if(type == '1'){
							let token = res.data.data;
							if(token && token != null && token != ''){
								store.commit('UPDATE_QNUSERINFO',{idKey:token});
							}
						}
					}
				});
			},
			//获取青牛外显号码
			getExplicitNoList(){
				const _=this;
				/*_.HttpAjax('post','getExplicitNoList',{},(res)=>{
					store.commit('UPDATE_LOADINGSTATE', false);
					if(res && res.data.status == 200){
						store.commit('UPADTE_QN_EXPLICEARR',res.data.data);
					}
				});*/
			},
			getWXqccf(data){
				let arr = data.ext.outBoundNumList || data.ext.outboundList;
				let arrs = arr.split('|');

				var temp = []; //一个新的临时数组
			    for(var i = 0; i < arrs.length; i++){
			        if(temp.indexOf(arrs[i]) == -1){
			            temp.push(arrs[i]);
			        }
			    }
			    return temp;
			}

		},
		created() {
			const _ = this;
			_.$emit('drag');
			this.init();
			//菜单响应
			_.activeName = _.$route.path == '/' ? '/index' : _.$route.path;
			//保存所有的路由在数组中
			for(let i = 0; i < this.menu.length; i++) {
				for(let j = 0; j < this.menu[i].childnume.length; j++) {
					this.childnume.push({
						$name: this.menu[i].childnume[j].name,
						$url: this.menu[i].childnume[j].url,
						$class: 'btnNavBar'
					});
				}
			}
			//设置签到
			this.sign = this.getCookie('sign');
			//设置皮肤
			this.skinShow = this.getCookie('skin') == '' ? 'skin' : this.getCookie('skin');
			//设置公司
			let companys = JSON.parse(_.userInfo).userBean.companyName;
			if(companys != '' || companys != null) {
				_.company = companys;
			};

			// 判断青牛 WA对项是否找到.
			var times = setInterval(() => {
				let i = 0;
				i++;
				if(WA) {
					_.WAInit();
					clearInterval(times);
				}
				if(i >= 20) {
					clearInterval(times);
				}
			}, 500);
		},
		mounted() {
			const _ = this;
			if(_.$route.path == '/') {
				_.$router.push('/index');
			} else {
				//加载刷新后的导航条
				_.menuChange(_.$route.path)
			}
			_.getQnAccoutInfo(); //获取青牛账号

			_.height.height = (document.documentElement.clientHeight - 64 - 52 - 35) + 'px';
			_.height1.height = (document.documentElement.clientHeight - 45) + 'px';

			window.onresize = () => {
				return(() => {
					_.height.height = (document.documentElement.clientHeight - 64 - 52 - 35) + 'px';
					_.height1.height = (document.documentElement.clientHeight - 45) + 'px';
				})();
			};

			let menu = _.getStore("menu");
			let url = _.$route.path;
			for(let i = 0; i < menu.length; i++) {
				for(let j = 0; j < menu[i].childnume.length; j++) {
					if(menu[i].childnume[j].url == url) {
						_.openName = ['' + (i + 1)];
						_.$nextTick(() => {
							_.$refs.menuListReq.updateOpened();
							_.$refs.menuListReq.updateActiveName();
						});
						break;
					}
				}
			}

		}
	}
</script>

<style scoped lang="less">
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
		.company {
			text-align: center;
			font-size: 12px;
			line-height: 20px;
			height: 20px;
			margin-top: 15px;
		}
		.ivu-layout {
			position: relative;
		}

	}

	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}

	.layout-nav {
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}
	/*取消滚动条*/

	.ivu-menu::-webkit-scrollbar {
		width: 0px;
	}

	.ivu-menu {
		/*隐藏滚动条，当IE下溢出，仍然可以滚动*/
		-ms-overflow-style: none;
		/*火狐下隐藏滚动条*/
		overflow: -moz-scrollbars-none;
	}

	HTML {
		scrollbar-base-color: #fff;
		scrollbar-base-color: #fff;
		scrollbar-3dlight-color: #fff;
		scrollbar-highlight-color: #fff;
		scrollbar-track-color: #fff;
		scrollbar-arrow-color: #fff;
		scrollbar-shadow-color: #fff;
		scrollbar-dark-shadow-color: #fff;
	}
</style>

<style lang="less">
	.layout {
		/*.ivu-menu-vertical .ivu-menu-submenu-title{*/
			/*font-weight:bold;*/
			/*font-size: 15px;*/
		/*}*/
    .ivu-menu-vertical li.ivu-menu-submenu:first-child{
      font-weight:bold;
      font-size: 16px;
    }
		.ivu-layout-sider {
			background-color: #fff;
		}
		.ivu-menu {
			height: 100%;
		}
		.ivu-spin-fix {
			background-color: rgba(255, 255, 255, .5);
		}
		.ivu-dropdown {
			.ivu-dropdown-rel {
				a {
					color: #ffffff;
				}
			}
		}
		#CPhone,
		#qn_login {
			position: absolute;
			top: 45px;
			right: 50px;
			width: 485px;
			height: 420px;
			background-color: #fff;
			padding: 0 15px 15px;
			font-size: 14px;
			color: #000;
			border: solid 1px #D8D8D8;
			border-radius: 4px;
			box-shadow: 5px 5px 5px #DCDCDC;
			.from-item-qn {
				.ivu-form-item-label {
					height: 36px;
					background-color: #f8f8f9;
					border: 1px solid #dcdee2;
					border-right: 0;
					border-radius: 4px 0 0 4px;
					text-align: center;
					font-size: 14px;
					color: #122035;
				}
				.ivu-select-selection,
				.ivu-input {
					border-radius: 0px 4px 4px 0
				}
			}
		}
		#qn_login {
			.QnLoginHeader {
				color: #3F6FB1;
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				line-height: 70px;
				.tit {
					font-size: 20px;
					color: #122035;
					font-weight: bold;
				}
				.back{
					cursor: pointer;
				}
			}
		}
		#CPhone {
			.ico {
				height: 40px;
				width: 40px;
				line-height: 40px;
			}
			.CpHeader {
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.cpUser {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.zxNum {
						font-weight: bold;
						font-size: 16px;
						padding-right: 10px;
						height:60px
					}
					.zxNum1{
						font-weight: bold;
						font-size: 12px;
						padding-right: 10px;
						height:60px
					}
					.cpType.ivu-select {
						width: 68px;
						.ivu-select-item {
							padding: 7px 10px;
						}
					}
				}
				.cpTimeMsg {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.userEnter {
						height: 60px;
						padding-right: 10px;
						cursor: pointer;
					}
					.ico {
						display: flex;
						align-items: center;
						cursor: pointer;
						width: 20px;
						height: 20px;
						img {
							height: 20px;
						}
					}
				}
			}
			.cpIcoCont {
				display: flex;
				flex-wrap: wrap;
				.icoItem {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 15px 15px 0 0;
					cursor: pointer;
					width: 60px;
					border: solid 1px #fff;
					.name {
						color: #122035;
						height: 20px;
						line-height: 20px;
					}
					&:hover {
						border: solid 1px #3F6FB1;
						border-radius: 4px;
					}
					&.disabled {
						&:hover {
							border: solid 1px #B8B8B8;
						}
					}
				}
			}
		}

	}
</style>