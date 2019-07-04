var express = require('express');
const con = require('../../controllers/connections');
var router = express.Router();

function updated(cid) {
    return new Promise((resolve, reject) => {
        (function loop(during, times) {
            con.redis.hget(global['settings'].cid_list_name, cid, (error, value) => {
                if (error !== null) reject(error);
                if (parseInt(value) === 1) {
                    con.redis.hset(global['settings'].cid_list_name, cid, 0, (error) => {
                        if (error !== null) return console.log(error)
                    });
                    return resolve('yes');
                }
                if (times <= 0) return reject('timeout');
                setTimeout(() => loop(during, times - 1), during);
            });
        })(500, 100);
    })
}

router.get('/', async (request, response, next) => {
    try {
        let result = await updated(request.cookies.cid);
        if (result === 'yes') response.end('yes');
    } catch (e) {
        response.end('no');
        console.log(e);
    }
});

module.exports = router;
