var Web3 = require('web3');
let wss = 'wss://bsc-ws-node.nariox.org:443';
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
let web3 = new Web3(new Web3.providers.WebsocketProvider(wss, options));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let start = async () => {
    for (let i = 0; i < 100; i++) {
        console.log(`---`)

        console.time(`${i} getBlock`);
        await web3.eth.getBlock('pending')
        console.timeEnd(`${i} getBlock`);

        console.time(`${i} getBlockNumber`);
        await web3.eth.getBlockNumber()
        console.timeEnd(`${i} getBlockNumber`);

        await sleep(100);
    }

};

start();

