import request from "@/utils/request";
export async function getRingData(data) {
  return await request({
    url: "/display/goodsNumber",
    method: "post",
    data
  });
}
export async function getLineData(data) {
  return await request({
    url: "/display/monthlyConsumeNumber",
    method: "post",
    data
  });
}
export async function getConsumeData(data) {
  return await request({
    url: "/display/consumeList",
    method: "post",
    data
  });
}
export async function getLabelData(data) {
  return await request({
    url: "/display/wholeData",
    method: "post",
    data
  });
}
export async function getCheckCodeDetail(data) {
  return await request({
    url: "/display/details",
    method: "post",
    data
  });
}
export async function getGoodDetail(data) {
  return await request({
    url: "/display/goodsDetails",
    method: "post",
    data
  });
}
export async function getCompanyDetail(data) {
  return await request({
    url: "/display/companyDetails",
    method: "post",
    data
  });
}

export async function getAllCompany() {
  return await request({
    url: "/display/getAllCompany",
    method: "post"
  });
}
