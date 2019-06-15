var express = require('express');
var router = express.Router();

function updated() {
    return new Promise((resolve, reject) => {
        (function loop(during, times) {
            if (global.updated) {
                global.updated = false;
                return resolve();
            }
            if (times <= 0) return reject('timeout');
            setTimeout(() => loop(during, times - 1), during);
        })(500, 100);
    })
}

router.get('/', function (request, response, next) {
    updated()
        .then(() => response.end('yes'))
        .catch((e) => {
            response.end('no');
            console.log(e);
        })
});

module.exports = router;
