let express = require('express');
let router = express.Router();
const con = require('../controllers/connections');

function isPay(id, during, times) {
    return new Promise((resolve, reject) => {
        (function queryLoop(during, times) {
            if (times <= 0) return resolve('timeout');
            con.redis.get(id, (err, value) => {//先查一遍
                if (err !== null) return reject(err);
                if (value === null) return resolve('yes');
                setTimeout(() => queryLoop(during, times - 1), during);
            });
        })(during, times);
    })
}

router.get('/:id', async (request, response, next) => {
    let result = await isPay(request.params.id, 500, 10000);
    if (result === 'yes') return response.end('yes');
    response.end('error');
    console.log("来自树莓派请求，订单查询结果为" + result);
});

module.exports = router;
