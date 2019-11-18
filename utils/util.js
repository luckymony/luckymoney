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
  console.log(date);
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
  var h = date.getHours();
  var m = date.getMinutes(); 
  var newTimeStr = M +"-"+ D +" "+ h + ":" + m;
  return newTimeStr;
}

module.exports = {
  formatTime: formatTime,
  getTimeStrFromTimeStamp: getTimeStrFromTimeStamp
}
