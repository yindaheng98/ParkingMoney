let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');
const Ispay = require('../controllers/pay');

function resolve(id, time, response) {//放行函数
    response.send('success');//先放行再说
    con.redis.del(id, (err) => {//删掉时间值
        if (err != null) console.log(err);//写入失败，返回error
    });
    con.mysql.query(//数据库记一哈
        "INSERT INTO Cars(时间,车牌号,动作)VALUES(FROM_UNIXTIME(?),?,1)",
        [time, id],
        (error) => {
            if (error != null) console.log(error)
        });
}

function reject(response) {
    response.send('error');
}

router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    let time = moment().valueOf() / 1000;
    con.redis.get(id, function (err, value) {//先查一遍
        if (value != null) {//如果redis里面有值就直接用
            let time_diff = time - value;
            Ispay(time_diff, res).then(() => resolve(id, time, res));
            return;
        }//如果无值就从数据库中查
        con.mysql.query(
            "SELECT 时间 FROM (SELECT max(时间) AS 时间,动作 FROM Cars WHERE 车牌号=?) AS T WHERE 动作=1",
            [id],
            (error, results) => {
                if (error != null || results.length === 0) {//如果数据库中也无值就报错
                    reject(res);
                    return;
                }//如果数据库中有值就用数据库中的值
                let time_diff = time - moment(results[0]["时间"], moment.ISO_8601);
                Ispay(time_diff, res).then(() => resolve(id, time, res));
            });
    });
});

module.exports = router;
