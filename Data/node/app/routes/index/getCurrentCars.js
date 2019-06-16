var express = require('express');
let moment = require('moment');
var router = express.Router();
const con = require('../../controllers/connections');

router.get('/', function (request, response, next) {
    con.redis.keys('*', (error, keys) => {
        let data = {
            '剩余车位': global['settings']['车位总数'],
            '车辆列表': []
        };
        if (error !== null || keys === null || keys.length < 1) {
            response.end(JSON.stringify(data));
            console.log(error);
            return;
        }
        let cars = [];
        for (let i in keys) {
            let key = keys[i];
            con.redis.get(key, (error, value) => {
                if (error !== null) console.log(error);
                cars.push([key, value]);
                if (!(i < keys.length - 1)) {
                    cars.sort((a, b) => b[1] - a[1]);
                    for (let i in cars) {
                        cars[i] = [cars[i][0], moment(parseInt(cars[i][1]))];
                    }
                    data['车辆列表'] = cars;
                    response.end(JSON.stringify(data));
                }
            })
        }
    });
});

module.exports = router;
