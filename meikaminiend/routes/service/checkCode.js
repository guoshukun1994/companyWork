var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://node.moacchina.info")); //http://node.moacchina.info
var contractAddress = require("../../config/contract").address; //智能合约地址
var abiString = require("../../config/contract").abi; //智能合约的abi
var abi = JSON.parse(abiString);
var contract = chain3.mc.contract(abi);
var Contract = contract.at(contractAddress);
let checkMethod = function(code) {
    //根据传入Code调取智能合约中对应产品的状态
    console.log(code);
    try {
        var data = Contract.handle.call(code);
        console.log("data", data);
        return { code: 200, data: data, msg: "类型查询成功" };
    } catch (e) {
        console.log(e);
        return { code: 500, data: "", msg: "类型查询异常" };
    }
};
exports.checkMethod = checkMethod;
