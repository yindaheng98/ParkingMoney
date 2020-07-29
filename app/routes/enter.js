let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    if (id.length > 7) {
        return res.end('invalid');
    }
    if (global['settings']['车位总数'] < 1) {
        return res.end('no');
    }
    con.redis.get(id, function (err, value) {//先查一遍
        if (value != null) {//如果有值直接回ok
            return res.end('ok');
        }//如果无值
        let time = moment().valueOf();
        con.redis.set(id, time, function (err) {//就写入一个时间值
            global['settings'].updated();
            if (err == null) {//写入成功，返回ok
                res.end('ok:' + --global['settings']['车位总数']);
                global['settings'].updated();
                con.mysql.query(
                    "INSERT INTO Cars(时间,车牌号,动作)VALUES(FROM_UNIXTIME(?),?,0)",
                    [time / 1000, id],
                    (error) => {
                        if (error != null) console.log(error)
                    }
                );
                return;
            }//写入失败，返回error
            return res.end('error');
        });
    });
});

module.exports = router;
