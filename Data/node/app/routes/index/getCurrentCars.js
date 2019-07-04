var express = require('express');
let moment = require('moment');
var router = express.Router();
const con = require('../../controllers/connections');

function getAll() {
    return new Promise((resolve, reject) => {
        con.redis.keys('*', (error, keys) => {
            let data = {
                '剩余车位': global['settings']['车位总数'],
                '车辆列表': [],
                '付款列表': []
            };
            if (error !== null) {
                return reject(error);
            } else if (keys === null || keys.length < 1) {
                return resolve(data);
            }
            for (let i in keys) {
                let key = keys[i];
                if (key === global['settings'].cid_list_name)
                    continue;
                if (key === 'PayingCar') {
                    con.redis.hkeys('PayingCar', (error, keys) => {
                        data['付款列表'] = keys;
                        if (!(i < keys.length - 1))
                            resolve(data);
                    });
                } else {
                    con.redis.get(key, (error, value) => {
                        if (error !== null) console.log(error);
                        data['车辆列表'].push([key, value]);
                        if (!(i < keys.length - 1))
                            resolve(data);
                    });
                }
            }
        });
    })
}

router.get('/', function (request, response, next) {
    getAll().then((data) => {
        let cars = data['车辆列表'];
        cars.sort((a, b) => b[1] - a[1]);
        for (let i in cars) {
            cars[i] = [cars[i][0], moment(parseInt(cars[i][1]))];
        }
        data['车辆列表'] = cars;
        response.end(JSON.stringify(data));
    });
});

module.exports = router;
