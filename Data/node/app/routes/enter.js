let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    if (global.runtime.parknum < 1) {
        res.send('no');
        return;
    }
    con.redis.get(id, function (err, value) {//先查一遍
        if (value != null) {//如果有值直接回ok
            res.send('ok');
            return;
        }//如果无值
        let time = moment().valueOf() / 1000;
        con.redis.set(id, time, function (err) {//就写入一个时间值
            if (err == null) {//写入成功，返回ok
                res.send('ok:' + --global.runtime.parknum);
                con.mysql.query(
                    "INSERT INTO Cars(时间,车牌号,动作)VALUES(FROM_UNIXTIME(?),?,0)",
                    [time, id],
                    (error) => {
                        if (error != null) console.log(error)
                    }
                );
                return;
            }//写入失败，返回error
            res.send('err');
        });
    });
});

module.exports = router;
