import request from "@/utils/request";

export function getUserList(data, token) {
  return request({
    url: "/api/listUsers",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function addManager(data, token) {
  return request({
    url: "/api/addManager",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function updateManagerMsg(data, token) {
  return request({
    url: "/api/updateManagerMsg",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delManager(data, token) {
  return request({
    url: "/api/delManager",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function searchManagers(data, token) {
  return request({
    url: "/api/searchManagers",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function searchGoods(data, token) {
  return request({
    url: "/api/searchGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delGoods(data, token) {
  return request({
    url: "/api/delGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function addGoods(data, token) {
  return request({
    url: "/api/addGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function addCompany(data, token) {
  return request({
    url: "/api/addCompany",
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data"
    },
    data
  });
}
export function searchBar(data, token) {
  return request({
    url: "/api/searchBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delBar(data, token) {
  return request({
    url: "/api/delBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function search(data, token) {
  return request({
    url: "/api/search",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function inputBar(data, token) {
  return request({
    url: "/api/inputBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function compDetails(data, token) {
  return request({
    url: "/api/compDetails",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delComp(data, token) {
  return request({
    url: "/api/delComp",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function inputHash(data, token) {
  return request({
    url: "/api/inputHash",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function dataDetails(data, token) {
  return request({
    url: "/api/dataDetails",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function inputDataHash(data, token) {
  return request({
    url: "/api/inputDataHash",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function inputGoodsHash(data, token) {
  return request({
    url: "/api/inputGoodsHash",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function goodsDataDetails(data, token) {
  return request({
    url: "/api/goodsDataDetails",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allBar(data, token) {
  return request({
    url: "/api/allBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allComp(params) {
  return request({
    url: "/api/allComp",
    method: "get",
    headers: {
      "Cache-Control": "no-cache"
    },
    params
  });
}
export function allGoods(data, token) {
  return request({
    url: "/api/allGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allGoodsData(data, token) {
  return request({
    url: "/api/allGoodsData",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function inputgoodsDataHash(data, token) {
  return request({
    url: "/api/inputgoodsDataHash",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allCompData(params, token) {
  return request({
    url: "/api/allCompData",
    method: "get",
    headers: {
      Authorization: "Bearer " + token
    },
    params
  });
}
export function resetOthersPSW(data, token) {
  return request({
    url: "/api/resetOthersPSW",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function dataForCD(data, token) {
  return request({
    url: "/api/dataForCD",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function exit(data, token) {
  return request({
    url: "/api/exit",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function userMsgFromToken(token) {
  return request({
    url: "/api/userMsgFromToken",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function goodsDataGoods(data, token) {
  return request({
    url: "/api/goodsDataGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allGoodsForCompCD(data, token) {
  return request({
    url: "/api/allGoodsForCompCD",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delGoodsData(data, token) {
  return request({
    url: "/api/delGoodsData",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function compDataComp(data, token) {
  return request({
    url: "/api/compDataComp",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function modifyPSW(data, token) {
  return request({
    url: "/api/modifyPSW",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delData(data, token) {
  return request({
    url: "/api/delData",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function goodsDetails(data, token) {
  return request({
    url: "/api/goodsDetails",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function allGoodsByUser(token) {
  return request({
    url: "/api/allGoodsByUser",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function createCode(data, token) {
  return request({
    url: "/api/createCode",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function checkMsgValue(data, token) {
  return request({
    url: "/api/checkMsgValue",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showNewBar(data, token) {
  return request({
    url: "/api/showNewBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function searchLabel(data, token) {
  return request({
    url: "/api/searchLabel",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function synLabelToGoods(data, token) {
  return request({
    url: "/api/synLabelToGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delLabelMsg(data, token) {
  return request({
    url: "/api/delLabelMsg",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showAllCompNameID(token) {
  return request({
    url: "/api/showAllCompNameID",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function searchCodePool(data, token) {
  return request({
    url: "/api/searchCodePool",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showLableCode(token) {
  return request({
    url: "/api/showLableCode",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function generateBars(data, token) {
  return request({
    url: "/api/generateBars",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function searchBinding(data, token) {
  return request({
    url: "/api/searchBinding",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function delBindingBar(data, token) {
  return request({
    url: "/api/delBindingBar",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showAllGoodsName(data, token) {
  return request({
    url: "/api/showAllGoodsName",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showGoodsMsg(data, token) {
  return request({
    url: "/api/showGoodsMsg",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function searchLabels(data, token) {
  return request({
    url: "/api/searchLabels",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function synLabels(data, token) {
  return request({
    url: "/api/synLabels",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}

export function exportLabelNum(data, token) {
  return request({
    url: "/api/exportLabelNum",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}

export function synInput(data, token) {
  return request({
    url: "/api/synInput",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function synLabelsOne(data, token) {
  return request({
    url: "/api/synLabelsOne",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function AllGoodsNameCD(token) {
  return request({
    url: "/api/AllGoodsNameCD",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function register(data) {
  return request({
    url: "/api/register",
    method: "post",
    data
  });
}
export function checkComp(data, token) {
  return request({
    url: "/api/checkComp",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function checkStatus(data, token) {
  return request({
    url: "/api/checkStatus",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function editCompany(data, token) {
  return request({
    url: "/api/editCompany",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function editGoods(data, token) {
  return request({
    url: "/api/editGoods",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function showUserMsgNotSuper(token) {
  return request({
    url: "/api/showUserMsgNotSuper",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}
export function exitHashComp(data, token) {
  return request({
    url: "/api/exitHashComp",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
export function loginSecond(data) {
  return request({
    url: "/api/loginSecond",
    method: "post",
    data
  });
}
export function searchNewBindingPool(data, token) {
  return request({
    url: "/api/searchNewBindingPool",
    method: "post",
    headers: {
      Authorization: "Bearer " + token
    },
    data
  });
}
