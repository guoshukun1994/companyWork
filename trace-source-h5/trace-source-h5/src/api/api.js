import service from "./service";

// 校验验证码的状态
export function getCodeStatu(data){
  return service({
    url: "/origin/checkCode",
    method: "post",
    data,
  });
};

// 获取二维码扫码信息
export function getGoods(data){
  data.openID = "21212112";
  return service({
    url: "/origin/getGoods",
    method: "post",
    data,
  });
};

//查询交易情况列表
export function getTxHashMsg(data){
  return service({
    url: "/origin/getTxHashMsg",
    method: "post",
    data
  })
}

//查询基础链区块情况列表
export function getBlockHashMsg(data){
  return service({
    url: "origin/getBlockHashMsg",
    method: "post",
    data
  })
}

//获取应用链交易情况列表
export function getSubTxHashMsg(data){
  return service({
    url: "origin/getSubTxHashMsg",
    method: "post",
    data
  })
}

//获取应用链区块情况列表
export function getSubBlockHashMsg(data){
  return service({
    url: "origin/getSubBlockHashMsg",
    method: "post",
    data
  })
}

//获取商品信息
export function goodsPhoto(data){
  return service({
    url: "origin/goodsPhoto",
    method: "post",
    data
  })
}

//获取商品信息
export function companyPhoto(data){
  return service({
    url: "origin/companyPhoto",
    method: "post",
    data
  })
}

const APPID = "wx750ad701c12c2a1d";
const APPSECRET = "64b12fc4c753958dce675a8c0c16efbc";

export function getAccessToken(){
  const url = `/wxapi/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  console.log('url----------');
  console.log(url);
  return service({
    url,
    method: "get"
  })
}
