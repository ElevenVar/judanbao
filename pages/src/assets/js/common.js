import axios from 'axios';
import qs from 'qs';
import store from '../../store/index'
import u from '../../service/url_config';
import Utils from '@/assets/js/utils.js'

class common {

}
common.install = (Vue) => {
  /**
   * [SEQAjax http请求]
   * @param {[String]}   method   [请求方式]
   * @param {[String]}   url      [url地址]
   * @param {[Object]}   data     [发送参数]
   * @param {Function}   callback [回调函数]
   * @param {[String]}   str      [判断是不是formdata类型]
   */
  //axios.defaults.withCredentials = true;
  Vue.prototype.HttpAjax =  (method,url,data,callback,str)=>{
    if(str != 'count' && str != 'download2'){
      store.commit('UPDATE_LOADINGSTATE',true);
    }


    //访问时间
    let timeOver = 5*60*1000;

    // 拦截器，添加loading效果
    let requestInterceptor = axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      axios.interceptors.request.eject(requestInterceptor);
      return config
    }, function (error) {
      // Do something with request error
      axios.interceptors.request.eject(requestInterceptor);
      return Promise.reject(error)
    });

    let responseInterceptor = axios.interceptors.response.use(function (config) {
    	if(config){
	      // Do something before request is sent
	      if(config.data.status && config.data.status != '200' && config.data.status != '401'){
	        store.commit('UPDATE_LOADINGSTATE',false);
	        Vue.prototype.$Notice.error({
	            title: '错误',
	            desc:config.data.message,
	            duration: 0
	        });
	      }else if(config.data.status == 401){
	      	store.commit('UPDATE_LOADINGSTATE',false);
	      	Vue.prototype.$Notice.error({
	            title: '登录超时！',
	            desc:config.data.message,
	            duration: 0,
	       });
	        setTimeout(()=>{
	        	window.sessionStorage.removeItem('menu');
	        	window.sessionStorage.removeItem('userInfo');
	        	window.location.replace('/login');
	        },1000);
	      }
	    }
    	axios.interceptors.response.eject(responseInterceptor);
      return config
	  },function (error) {
      	store.commit('UPDATE_LOADINGSTATE',false);
	      if (error.message.indexOf('timeout') !== -1) {
	        Vue.prototype.$Notice.error({
            title: '请求超时！',
            desc:'请求超时，请重新请求！',
            duration: 0,
       		});
	      }
	    axios.interceptors.response.eject(responseInterceptor);
      return Promise.reject(error);
  	});

		let outT = ['doLogin','getValidCode','getValidCodeUID','findPhoneByName','sendSmsVerificationCode','checkOutVerificationCode','modifyPwdByVerificationCode'];
		let bol = true;
		outT.forEach((item,index)=>{
			if(u[url].indexOf(item) != -1){
				bol = false;
			}
		});
		if(bol){
				let Token = JSON.parse(store.state.userInfo).Token;
				if(str=='json'){
					axios({
		        method: method,//`headers`选项是需要被发送的自定义请求头信息
		        headers: {
		        	'X-Requested-With':'XMLHttpRequest',
		        	'Content-Type': 'application/json;charset=UTF-8',
		        	'Token':Token
		        },
		        url: u[url],
		        timeout:timeOver,
		        data:data
		      }).then(callback);
				}else if(str == 'file'){
					axios({
			        method: method,//`headers`选项是需要被发送的自定义请求头信息
			        headers: {
			        	'X-Requested-With':'XMLHttpRequest',
			        	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			        	'Token':Token
			        },
			        url: u[url],
			        timeout:timeOver,
			        data:data
			      }).then(callback);
				}else if(str == 'download' || str == 'download2'){
					axios({
			        method: method,//`headers`选项是需要被发送的自定义请求头信息
			        headers: {
			        	'X-Requested-With':'XMLHttpRequest',
			        	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			        	'Token':Token
			        },
			        responseType:'blob',
			        url: u[url],
			        timeout:10*60*1000,
			        data:data
			      }).then(callback);
				}else{
			      	axios({
				        method: method,//`headers`选项是需要被发送的自定义请求头信息
				        headers: {
				        	'X-Requested-With':'XMLHttpRequest',
				        	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				        	'Token':Token
				        },
				        url: u[url],
				        timeout:timeOver,
				        data: qs.stringify(data)
			      	}).then(callback);
		    }
    }else{
    	axios({
	        method: method,//`headers`选项是需要被发送的自定义请求头信息
	        headers: {
	        	'X-Requested-With':'XMLHttpRequest',
	        	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	        },
	        url: u[url],
	        timeout:timeOver,
	        data: qs.stringify(data)
	      }).then(callback);
    }
  };

	/**
	 * 设置localStorage
	 */
	Vue.prototype.setStore = (name, content) => {
			if (!name) return;
			if (typeof content !== 'string') {
				content = Utils.encrypt(JSON.stringify(content));
			}
			window.sessionStorage.setItem(name, content);
	};
	/**
	 * 获取localStorage
	 */
	Vue.prototype.getStore = name => {
		if (!name) return;
		return JSON.parse(Utils.decrypt(window.sessionStorage.getItem(name)));
	};

	/**
	 * 删除localStorage
	 */
	Vue.prototype.removeStore = name => {
		if (!name) return;
		window.sessionStorage.removeItem(name);
	};
	/* 保存cookie信息  */
	Vue.prototype.setCookie = (keys,val,days) =>{
		let day = days || 30;
		var d = new Date();
		if(days == 'today'){
			let today = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1,0,0,0);
      var expires = "expires="+today;
		}else{
			d.setTime(d.getTime()+(day*24*60*60*1000));
			var expires = "expires="+d.toGMTString();
		}

		document.cookie = keys+'='+val+';'+expires;
	}
	/* 获取cookie信息   */
	Vue.prototype.getCookie = cname =>{
		var name = cname + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0; i<ca.length; i++){
	    var c = ca[i].trim();
	    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	  }
	  return "";
	}
	//二进制流文件下载
	Vue.prototype.downLoadFile = (data,fileName)=>{
		let fileNames = fileName || '';
		let blob = new Blob([data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
	  let downloadElement = document.createElement('a');
	  let href = window.URL.createObjectURL(blob); //创建下载的链接
	  downloadElement.href = href;
	  downloadElement.download = fileNames; //下载后文件名
	  document.body.appendChild(downloadElement);
	  downloadElement.click(); //点击下载
	  document.body.removeChild(downloadElement); //下载完成移除元素
	  window.URL.revokeObjectURL(href);
	}

	Vue.prototype.downLoad = (data) =>{
		let strUrl = u.baseUrl+"report/download?";
		let str = '';
		for(let i in data){
			str += '&'+i+'='+data[i];
		}
		window.location.href = strUrl+str;
	}
	/** s*/
	Vue.prototype.getAuth = idKeys =>{
		const _=this;
		let bol = null;
		if(idKeys == undefined){
			return
		}
		let list = JSON.parse(store.state.menuInfo);

		function auth(list){
			list.forEach((item,index)=>{
				if(item.idKey == idKeys){
					bol = item.selected;
					return false;
				}else{
					if(item.childnume || item.fuction){
						if(item.childnume.length >0){
							auth(item.childnume);
						};
						if(item.fuction != null){
							if(item.fuction.length >0){
								auth(item.fuction);
							}
						}
					}
				}
			});
		}
		auth(list);
		return bol;
	}
  /**
   * 正则表达式
   */
  Vue.prototype.expReg = {
    //有区段的手机号
    aa:/^(13[0-9]|14[1456789]|15[012356789]|16[6]|17[01345678]|18[0-9]|19[89])[0-9]{8}$/,
    //6-16位英文+数字密码
    bb:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    //4位字符随机验证码（字母或数字）
    cc:/^[0-9a-zA-Z]{4}$/,
    //数字
    dd:/^[0-9]*$/,
    //1-8位数字
    ee:/^(?!0)\d{1,8}$/,
    //身份证
    idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    pw:/^[0-9A-Za-z]{8,16}$/,
    phone:/^[1][3,4,5,7,8][0-9]{9}$/,
    tall:/^((0\d{2,3}-?\d{7,8})|(1[3584]\d{9})|(\d{7,8}))$/, //包含电话号码和手机号码
  }
};
export default common;
