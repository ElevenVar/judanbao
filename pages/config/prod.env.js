'use strict'
const configArgv  = process.env.npm_lifecycle_event;
let url = '';
switch (configArgv){
  case 'build':
    url = 'http://119.23.242.238:8080/';
    break;
  case 'sit2':
    url = 'http://47.106.145.191:8080/';
    break;
  case 'prod':
    url = 'http://jdmp.jdunet.com/api/';
    break;
}
console.log("打包地址----------:"+url)
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"'+url+'"'
}
