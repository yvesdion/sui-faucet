"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var axios_1 = __importDefault(require("axios"));
var prompt_1 = __importDefault(require("prompt"));
var user_agents_1 = __importDefault(require("user-agents"));
prompt_1["default"].start();
function GetFaucet(walletAddress) {
    console.log("Claiming SUI 0.50000000 ...");
    var userAgent = new user_agents_1["default"]().toString();
    var config = {
        method: "POST",
        url: "https://faucet.devnet.sui.io/gas",
        data: {
            FixedAmountRequest: {
                recipient: walletAddress
            }
        },
        headers: { 'User-Agent': userAgent },
        proxy: false
    };
    (0, axios_1["default"])(config)
        .then(function (res) { return console.log(chalk_1["default"].greenBright("Success claim SUI 0.50000000 to address ".concat(walletAddress))); })["catch"](function (err) {
        console.log(err.cause);
        try {
            var errorCode = err.cause.code;
            switch (errorCode) {
                case 'ECONNRESET':
                    console.log(chalk_1["default"].redBright('Target is closed the connection. Check your proxy!'));
                    break;
                case 'ETIMEDOUT':
                    console.log(chalk_1["default"].redBright('Connection timed out.'));
                    break;
                default:
                    console.log(chalk_1["default"].redBright('You are being rate limited. Change your IP Address!'));
                    break;
            }
        }
        catch (er) {
            console.log(chalk_1["default"].redBright('Something wrong happen.'));
        }
        process.exit();
    });
}
prompt_1["default"].get(['wallet_address'], function (err, result) {
    if (err)
        throw new Error();
    GetFaucet(result.wallet_address);
});
