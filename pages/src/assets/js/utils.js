/*
 AES加密！ 
 2018-11-23
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'

export default {
 	/*前端AES加密*/
	encrypt(word, keyStr){ 
	    keyStr = keyStr ? keyStr : 'Ah4QRc3T96msZdFX';
	    var key  = CryptoJS.enc.Utf8.parse(keyStr);
	    var srcs = CryptoJS.enc.Utf8.parse(word);
	    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	    return encrypted.toString();
	},
	//AES解密
	decrypt(word, keyStr){
	    keyStr = keyStr ? keyStr : 'Ah4QRc3T96msZdFX';
	    var key  = CryptoJS.enc.Utf8.parse(keyStr);
	    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
}