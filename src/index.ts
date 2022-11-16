import chalk from 'chalk'
import axios from 'axios'
import UserAgent from 'user-agents';
import config from '../config.json';

function GetFaucet(walletAddress: string){
    console.log(`Wallet Address: ${walletAddress}\nClaiming SUI 0.05000000 ...`);
    const userAgent = new UserAgent().toString();

    const config: any = {
        method: "POST",
        url: "https://faucet.devnet.sui.io/gas",
        data: {
            FixedAmountRequest: {
                recipient: walletAddress
            }
        },
        headers: { 'User-Agent': userAgent },
        proxy: false
    }

    axios(config)
        .then((res) => console.log(chalk.greenBright(`Success claim SUI 0.05000000 -> ${walletAddress}`)))
        .catch((err) => {
            console.log(err.cause);

            try {
                const errorCode = err.cause.code;
                
    
                switch(errorCode){
                    case 'ECONNRESET':
                        console.log(chalk.redBright('Target is closed the connection. Check your internet connection/proxy!'));
                        break;

                    case 'ETIMEDOUT':
                        console.log(chalk.redBright('Connection timed out.'));
                        break;
                }

            } catch(er){
                console.log(chalk.redBright('You are being rate limited. Change your IP Address!'));
            }

            process.exit();
        })
}

GetFaucet(config.wallet_address);