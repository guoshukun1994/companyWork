import Axios from "./index";

export const getCodeStatu = (data) => {
  return Axios({
    url: "/origin/checkCode",
    method: "post",
    data,
  });
};

export const getGoods = (data) => {
  data.openID = "21212112";
  return Axios({
    url: "/origin/getGoods",
    method: "post",
    data,
  });
};

export const getGoodsPhotos = (data) => {
  return Axios({
    url: "/origin/goodsPhoto",
    method: "post",
    data,
  });
};

export const getCompanyPhotos = (data) => {
  return Axios({
    url: "/origin/companyPhoto",
    method: "post",
    data,
  });
};

export const getCheckHash = (data) => {
  return Axios({
    url: "/origin/checkHash",
    method: "post",
    data,
  });
};

export const getTxHashMsg = (data) => {
  return Axios({
    url: "/origin/getTxHashMsg",
    method: "post",
    data,
  });
};

export const getSubTxHashMsg = (data) => {
  return Axios({
    url: "/origin/getSubTxHashMsg",
    method: "post",
    data,
  });
};

export const getBlockHashMsg = (data) => {
  return Axios({
    url: "/origin/getBlockHashMsg",
    method: "post",
    data,
  });
};
export const getSubBlockHashMsg = (data) => {
  return Axios({
    url: "/origin/getSubBlockHashMsg",
    method: "post",
    data,
  });
};
