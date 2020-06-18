var Chain3 = require("chain3");
const vnode = require("../../config/vnode");
var Chain3 = require("chain3");
var chain3 = new Chain3(new Chain3.providers.HttpProvider(vnode.main));
//let nonce = chain3.mc.getTransactionCount("0x51087111f6A48131EF97493e50d0c4cD2AfcA0db");
let nonce = chain3.mc.getTransactionCount("0x51087111f6A48131EF97493e50d0c4cD2AfcA0db");
console.log(nonce);
