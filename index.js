var Web3 = require('web3');
let wss = 'wss://bsc-ws-node.nariox.org:443';
let wss1 = 'ws://bsc.getblock.io/mainnet/?api_key=c7d17503-99e5-489f-9a9d-3673b9494b63';

let rpc = 'https://bsc.getblock.io/mainnet/?api_key=c7d17503-99e5-489f-9a9d-3673b9494b63';
let rpc1 = 'https://bsc-dataseed.binance.org/';
let rpc2 = 'https://bsc-dataseed1.defibit.io/';
let rpc3 = 'https://bsc-dataseed1.ninicoin.io/';
let rpc4 = 'https://bsc-dataseed1.binance.org/';

let wss_options = {
    timeout: 1000,
    reconnectDelay: 10,
    reconnect: {
        auto: true,
        delay: 10,
        maxAttempts: 100,
        onTimeout: true,
    },
};

let rpc_options = {
    timeout: 1000,
    keepAlive: true,
};

let web3_wss = new Web3(new Web3.providers.WebsocketProvider(wss, wss_options));
let web3_wss1 = new Web3(new Web3.providers.WebsocketProvider(wss1, wss_options));

let web3_rpc = new Web3(new Web3.providers.HttpProvider(rpc, rpc_options));
let web3_rpc1 = new Web3(new Web3.providers.HttpProvider(rpc1, rpc_options));
let web3_rpc2 = new Web3(new Web3.providers.HttpProvider(rpc2, rpc_options));
let web3_rpc3 = new Web3(new Web3.providers.HttpProvider(rpc3, rpc_options));
let web3_rpc4 = new Web3(new Web3.providers.HttpProvider(rpc4, rpc_options));

let web3s = [
    web3_wss,
    // web3_wss1,
    // web3_rpc,
    // web3_rpc1,
    // web3_rpc2,
    // web3_rpc3,
    // web3_rpc4
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let start = async () => {
    for (let i = 0; i < 200; i++) {
        console.log(`---`)

        for (let web3 of web3s) {

            let provider = web3.currentProvider;

            let url = provider.url;
            let host = provider.host;

            let xurl;
            if (url) {
                xurl = url;
            }
            if (host) {
                xurl = host;
            }


            // for (let j = 0; j < 20; j++) {
            //     for (let k = 0; k < 20; k++) {
            //         console.time(`${j} ${k} ${xurl} getBlock 延迟`);
            //         web3.eth.getBlock('pending').then(async block => {
            //             console.timeEnd(`${j} ${k} ${xurl} getBlock 延迟`);
            //             await sleep(3000 * Math.floor(Math.random() * 5));
            //             console.log(`block ${j} ${k} ${xurl} `);
            //         });
            //         await sleep(3000 / 20);
            //     }
            // }

            console.time(`${i} ${xurl} getBlock 延迟`);
            await web3.eth.getBlock('pending')
            console.timeEnd(`${i} ${xurl} getBlock 延迟`);

            console.time(`${i} ${xurl} getBlockNumber 延迟`);
            await web3.eth.getBlockNumber()
            console.timeEnd(`${i} ${xurl} getBlockNumber 延迟`);
        }
        await sleep(100);
    }
};

start();

