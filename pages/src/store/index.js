import Vue from 'vue'
import Vuex from 'vuex'
import Utils from '@/assets/js/utils.js'

Vue.use(Vuex);

const state = {
  loadingState:false,
  loading:0,
  userInfo:null,
  menuInfo:null,
  qnInfo:{
  	login:false,
  	explicArr:[],
  },
  unreadMSG:false,
  autoLogin:false,
};

export default new Vuex.Store({
  state,
  mutations: {
    //加载中动画
    UPDATE_LOADINGSTATE (state,bool) {
      if(bool){
      	state.loading ++;
      	state.loadingState = bool;
      }else{
      	state.loading --;
      	if(state.loading <= 0){
      		state.loadingState = bool;
      	}
      }
    },
	//更新用户信息
    UPDATE_USERINFORMATION(state,obj){
    	state.userInfo = JSON.stringify(obj);
    	window.sessionStorage.setItem('userInfo',Utils.encrypt(JSON.stringify(obj)));
    },
	//删除用户信息
    DELETE_USERINFORMATION(state){
    	state.userInfo = null;
    	window.sessionStorage.removeItem("userInfo");
    	window.sessionStorage.removeItem("menu");
    },
	//刷新浏览器自动根据session 更新userINfo
    RELOAD_USERINFO_UPDATE(state){
    	let user = window.sessionStorage.getItem('userInfo');
    	let menu = window.sessionStorage.getItem('menu');
    	if(user != null){
    		state.userInfo = Utils.decrypt(user);
    	}
    	if(menu != null){
    		state.menuInfo = Utils.decrypt(menu);
    	}
    },
		//更新青牛用戶信息
    UPDATE_QNUSERINFO(state,obj){
    	for(let i in obj){
    		state.qnInfo[i] = obj[i]
    	}
    },
	//更新青牛登录状态
    UPDATE_QNUSERLOGININFO(state,bol){
    	state.qnInfo.login = bol;
    },
	//更新未读消息状态
    UPDATE_UNREAD_MESSAGE_STATUS(state,obj){
    	state.unreadMSG = obj;
    },
	//更新外显号码
    UPADTE_QN_EXPLICEARR(state,arr){
    	state.qnInfo.explicArr = arr;
    },
    UPDATE_QN_AUTOLOGIN(state,bol){
    	state.autoLogin = bol;
    }
  }
})
