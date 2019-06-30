let express = require('express');
let router = express.Router();
const con = require('../controllers/connections');

function isPay(id, during, times) {
    return new Promise((resolve, reject) => {
        (function queryLoop(during, times) {
            if (times <= 0) return reject('timeout');
            con.redis.get(id, (err, value) => {//先查一遍
                if (err !== null) return reject(err);
                if (value === null) return resolve();
                setTimeout(() => queryLoop(during, times - 1), during);
            });
        })(during, times);
    })
}

router.get('/:id', (request, response, next) => {
    isPay(request.params.id, 500, 10000)
        .then(() => response.end('yes'))
        .catch((e) => {
            if (e === 'timeout')
                response.end('no');
            response.end('error');
            console.log(e);
        })
});

module.exports = router;
