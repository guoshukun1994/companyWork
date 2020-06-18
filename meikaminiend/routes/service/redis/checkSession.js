const redisHelper = require("./redis");
async function checkSession(session) {
    //console.log(session);
    try {
        let openID = await redisHelper.getString(session);
        // console.log(openID);
        if (!openID) {
            console.log(false);
            return { result: false };
        }
        //console.log("openID123", openID);
        return { result: true, openID: openID };
    } catch (e) {
        console.log(e);
        return false;
    }
}
exports.checkSession = checkSession;
//checkSession("4f56d520-0681-11ea-85dd-ff2c0516f5cd1573696303986");
