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
console.time('getBlock');
web3.eth.getBlock('pending').then(block=>{
    console.timeEnd('getBlock');
    // console.log(block);
})

console.time('getBlockNumber');
web3.eth.getBlockNumber().then(block=>{
    console.timeEnd('getBlockNumber');
    // console.log(block);
})
