const formatTime = date => {
  const year  = date.getFullYear()
  const month = date.getMonth() + 1
  const day   = date.getDate()
  const hour  = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getTimeStrFromTimeStamp(time) {
  var n = time * 1000;
  var date = new Date(n);  
  // console.log(date);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
  var newTimeStr = M +"-"+ D +" "+ h + ":" + m;
  return newTimeStr;
}

function getStartDate() {
  var date = new Date();  
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
  var timeStr = Y + "-" + M + "-" + D;
  return timeStr;
}

function getEndDate() {
  var date = new Date();
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1);
  var timeStr = Y + "-" + M + "-" + D;
  return timeStr;
}

function getCurrentStartTime() {
  var date = new Date();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return h + ':' + m;
}

function getStartTime(value) {
  var date = new Date();
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var timeStr = Y + "-" + M + "-" + D;
  console.log('timestr == ' + timeStr);
  console.log('value == ' + value);
  if(timeStr == value) {
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
    return h + ':' + m;
  }
  return '00:00'
}

function moneyFormat(value) {
  if (value.indexOf(".") < 0) {
     return value + '.' + '00';
  } else if (value.indexOf(".") == (value.length - 1)){
     return value + '00';
  } else if (value.indexOf(".") == (value.length - 2)) {
    return value + '0';
  } else if (value == '') {
    return '0.00';
  } 
  return value;
}

function isNumber(val) {
    var  regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var  regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val)||regNeg.test(val)) {
     return  true;
    }else{
     return  false;
    }
}

function pointNumer(obj) {
  obj = obj.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  obj = obj.replace(/^\./g, ""); //验证第一个字符是数字
  obj = obj.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  return obj;
}

function getServiceFee(value) {
  if (value <= 0) {
    return '0.00';
  } else if (value < 1) {
    return '0.01';
  }
  var serviceFee = this.moneyFormat((value * 0.02).toString());
  var fee = parseFloat(serviceFee);
  if (fee <= 0.01) {
    return '0.01';
  }else {
    return fee.toFixed(2).toString();
  }
}

module.exports = {
  formatTime: formatTime,
  getTimeStrFromTimeStamp: getTimeStrFromTimeStamp,
  moneyFormat: moneyFormat,
  isNumber: isNumber,
  pointNumer: pointNumer,
  getServiceFee: getServiceFee,
  getStartDate: getStartDate,
  getEndDate: getEndDate,
  getCurrentStartTime: getCurrentStartTime,
  getStartTime: getStartTime
}
