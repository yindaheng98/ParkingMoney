let express = require('express');
let moment = require('moment');
let router = express.Router();
const con = require('../controllers/connections');
const Pay = require('../controllers/pay');
let time = moment().valueOf();

function Exit(id) {
    return new Promise((resolve, reject) => {
        time = moment().valueOf();
        con.redis.get(id, function (err, value) {//先查一遍
            if (value != null) {//如果redis里面有值就直接用
                let time_diff = time - value;
                return resolve(time_diff);
            }//如果无值就从数据库中查
            con.mysql.query(
                "SELECT 时间 FROM (SELECT max(时间) AS 时间,动作 FROM Cars WHERE 车牌号=?) AS T WHERE 动作=1",
                [id],
                (error, results) => {
                    if (error != null || results.length === 0) {//如果数据库中也无值就报错
                        return reject('查无此车');
                    }//如果数据库中有值就用数据库中的值
                    let value = moment(results[0]["时间"], moment.ISO_8601).valueOf();
                    let time_diff = time - value;
                    con.redis.set(id, value, (err) => {
                        global.updated = true;
                        if (err !== null) return reject(err);
                        return resolve(time_diff);
                    });
                });
        });
    })
}

router.get('/:id', function (request, response, next) {
    let id = request.params.id;
    Exit(id).then((time_diff) => {
        //搞二维码
        return Pay.Order(time_diff / 1000);
    }).then((data) => {
        response.end(data['qr']);//发回二维码。然后轮询付款状态
        return Pay.isPay(data['id'], 500, 10000);

    }).then(() => {
        con.redis.del(id, (error) => {//删掉时间值
            ++global['settings']['车位总数'];
            if (error != null) console.log(error);//写入失败，记录error
            global.updated = true;
        });
        con.mysql.query(//数据库记一哈
            "INSERT INTO Cars(时间,车牌号,动作)VALUES(FROM_UNIXTIME(?),?,1)",
            [time / 1000, id],
            (error) => {
                if (error != null) console.log(error)//写入失败，记录error
            });
    }).catch((e) => {
        response.end('error');
        console.log(e);
    })
});

module.exports = router;
