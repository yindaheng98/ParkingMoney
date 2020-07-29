var path = require('path');
var fs = require('fs');
let moment = require('moment');
const con = require('../controllers/connections');

function InitData(path) {
    let settings = JSON.parse(fs.readFileSync(path));
    let SQL = "SELECT T.车牌号,T.时间 FROM (SELECT max(时间) AS 时间,车牌号 FROM Cars GROUP BY 车牌号) AS T INNER JOIN Cars ON T.时间=Cars.时间 AND T.车牌号=Cars.车牌号 WHERE 动作=0";
    con.mysql.query(SQL, (error, results) => {
        if (error != null) throw error;
        con.redis.flushall(() => {
            results.forEach((result) => {
                con.redis.set(result["车牌号"], moment(result["时间"], moment.ISO_8601).valueOf());
                settings["车位总数"]--;
            });
        });
    });
    settings.cid = 0;
    settings.cid_list_name = 'update_cid_list';
    settings.updated = function () {
        con.redis.hkeys(settings.cid_list_name, (error, keys) => {
            if (error !== null) return console.log(error);
            if (keys !== null)
                keys.forEach((key, i) => {
                    con.redis.hset(settings.cid_list_name, key, 1, (error) => {
                        if (error !== null) console.log(error);
                    })
                })
        })
    };
    return settings;
}

module.exports = InitData(path.join(__dirname, '设置.json'));