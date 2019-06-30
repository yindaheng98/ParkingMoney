const http = require('http');
const con = require('../controllers/connections');

function Order(id, how_much) {//创建订单
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
                //将车牌放入一个‘付款中’队列从而记录下正在付款的订单
                con.redis.hset('PayingCar', id, data['id'], (error) => {
                    if (error != null) console.log(error);
                    global.updated = true;
                    resolve(data);
                });
            });
        });
    });
}

function QueryLoop(url, car_id, order_id, during, times, resolve, reject) {
    http.get(url, function (req) {
        let s = '';
        req.on('data', (data) => {
            s += data;
        });
        req.on('end', () => {
            if (s === 'yes') return resolve();
            if (times <= 0) return reject('timeout');
            con.redis.hget('PayingCar', car_id, (error, response) => {
                if (error !== null) return reject(error);
                if (response !== order_id) return reject('abort');//如果记录的订单被改了说明取消了订单
                setTimeout(() => QueryLoop(url, car_id, order_id, during, times - 1, resolve, reject), during);
            });
        });
    });
}

function isPay(car_id, order_id, during, times) {//轮询订单支付状态
    if (global.settings["订单查询地址"].slice(-1) !== '/')
        global.settings["订单查询地址"] += '/';
    let url = global.settings["订单查询地址"] + order_id;
    return new Promise((resolve, reject) => {
        QueryLoop(url, car_id, order_id, during, times, resolve, reject);
    })
}

module.exports = {Order: Order, isPay: isPay};