var express = require('express');
var moment = require('moment');
var router = express.Router();
const con = require('../../controllers/connections');

function getActions(id) {
    return new Promise((resolve, reject) => {
        con.mysql.query(
            "SELECT 时间,动作 FROM Cars WHERE 车牌号=? ORDER BY 时间 DESC LIMIT 1000",
            [id],
            (error, results) => {
                let history = [];
                if (error != null)
                    return reject(error);
                for (let i in results) {
                    let result = results[i];
                    history.push(
                        [result['时间'], result['动作'] < 2 ? ['开始计费', '结束计费'][parseInt(result['动作'])] : 'error']
                    );
                }
                resolve(history);
            }
        );
    })
}

function getPayments(id) {
    return new Promise((resolve, reject) => {
        con.mysql.query(
            "SELECT 时间,金额 FROM 付款记录 WHERE 车牌号=? ORDER BY 时间 DESC LIMIT 1000",
            [id],
            (error, results) => {
                let history = [];
                if (error != null)
                    return reject(error);
                for (let i in results) {
                    let result = results[i];
                    history.push(
                        [result['时间'], '付款' + result['金额'] + '元']
                    );
                }
                resolve(history)
            }
        );
    })

}

router.get('/:id', async (request, response, next) => {
    let id = request.params.id;
    let history = (await getPayments(id)).concat(await getActions(id));
    history.sort((a, b) => moment(b[0]) - moment(a[0]).valueOf());
    response.end(JSON.stringify(history));
});

module.exports = router;
