const http = require('http');

function Order(how_much) {//创建订单
    if (global.settings["订单创建地址"].slice(-1) !== '/')
        global.settings["订单创建地址"] += '/';
    let url = global.settings["订单创建地址"] + how_much;
    return new Promise((resolve, reject) => {
        http.get(url, function (req) {
            let s = '';
            req.on('data', (data) => {
                s += data;
            });
            req.on('end', () => {
                let data = JSON.parse(s);
                resolve(data);
            });
        });
    });
}

function QueryLoop(url, during, times, resolve, reject) {
    http.get(url, function (req) {
        let s = '';
        req.on('data', (data) => {
            s += data;
        });
        req.on('end', () => {
            if (s === 'yes')
                return resolve();
            if (times <= 0) return reject('支付超时');
            setTimeout(() => QueryLoop(url, during, times - 1, resolve, reject), during);
        });
    });
}

function isPay(id, during, times) {//轮询订单支付状态
    if (global.settings["订单查询地址"].slice(-1) !== '/')
        global.settings["订单查询地址"] += '/';
    let url = global.settings["订单查询地址"] + id;
    return new Promise((resolve, reject) => {
        QueryLoop(url, during, times, resolve, reject);
    })
}

module.exports = {Order: Order, isPay: isPay};