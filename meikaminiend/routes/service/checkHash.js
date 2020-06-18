var scheduler = require("node-schedule");
const task = require("./checkWithdraw-txHash");
scheduler.scheduleJob("*/8 * * * * *", () => {
    task();
});
