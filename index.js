var Web3 = require('web3');
let wss = 'wss://bsc-ws-node.nariox.org:443';

let rpc1 = 'https://bsc-dataseed.binance.org/';
let rpc2 = 'https://bsc-dataseed1.defibit.io/';
let rpc3 = 'https://bsc-dataseed1.ninicoin.io/';

let options = {
    timeout: 100,
    reconnectDelay: 10,
    reconnect: {
        auto: true,
        delay: 10,
        maxAttempts: 100,
        onTimeout: true,
    },
};

let web3_wss = new Web3(new Web3.providers.WebsocketProvider(wss,options));

let web3_rpc1 = new Web3(new Web3.providers.HttpProvider(rpc1));
let web3_rpc2 = new Web3(new Web3.providers.HttpProvider(rpc2));
let web3_rpc3 = new Web3(new Web3.providers.HttpProvider(rpc3));

let web3s = [
    web3_wss,
    web3_rpc1,
    web3_rpc2,
    web3_rpc3
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let start = async () => {
    for (let i = 0; i < 20; i++) {
        console.log(`---`)

        for (let web3 of web3s) {

            console.time(`${i} getBlock`);
            await web3.eth.getBlock('pending')
            console.timeEnd(`${i} getBlock`);

            console.time(`${i} getBlockNumber`);
            await web3.eth.getBlockNumber()
            console.timeEnd(`${i} getBlockNumber`);
        }
        await sleep(100);
    }

};

start();

