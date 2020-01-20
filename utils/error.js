function errorStrFromCode(code) {
  switch (code) {
    case 0:
    return '请求成功';  
      break;
    case 100004:
    return '非法token';
      break;
    case 100005:
    return '用户不存在';
      break;
    case 100006:
      return '账户余额不足';
      break;
    case 100007:
      return '更新用户余额失败';
      break;
    case 200001:
      return '非法红包id';
      break;
    case 200002:
      return '非法红包金额和数量';
      break;
    case 200004:
      return '非法红包难度等级';
      break;
    case 200005:
      return '非法支付类型';
      break;
    case 200008:
      return '调用微信支付失败';
      break;
    case 200009:
      return '订单未支付';
      break;
    case 200010:
      return '红包已经被抢完';
      break; 
    case 200011:
      return '红包已过期';
      break;
    case 200012:
      return '游戏次数已到上限';
      break;
    case 200013:
      return '未参与过游戏';
      break; 
    case 200014:
      return '分配红包失败';
      break;
    case 200015:
      return '已经抽取过红包';
      break;
    case 200016:
       return '红包金额不能小于最小金额';
      break;  
    default:
      return '请求失败';
      break;
  }
}


module.exports = {
  errorStrFromCode: errorStrFromCode
}