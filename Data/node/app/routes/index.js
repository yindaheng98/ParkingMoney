var express = require('express');
var router = express.Router();
const con = require('../controllers/connections');

router.use('/updated', require('./index/updated'));
router.use('/getCurrentCars', require('./index/getCurrentCars'));

router.get('/getHistoryCars', function (request, response, next) {
    con.mysql.query(
        "SELECT 车牌号,max(时间) AS 时间 FROM CarsData.Cars GROUP BY 车牌号 ORDER BY 时间 DESC LIMIT 1000",
        (error, results) => {
            let ids = [];
            if (error != null) {
                response.end(JSON.stringify(ids));
                console.log(error);
                return;
            }
            for (let i in results)
                ids.push(results[i]['车牌号']);
            response.end(JSON.stringify(ids));
        }
    );
});

router.get('/getCarHistorys/:id', function (request, response, next) {
    let id = request.params.id;
    con.mysql.query(
        "SELECT 时间,动作 FROM Cars WHERE 车牌号=? ORDER BY 时间 DESC LIMIT 1000",
        [id],
        (error, results) => {
            let history = [];
            if (error != null) {
                response.end(JSON.stringify(history));
                console.log(error);
                return;
            }
            for (let i in results) {
                let result = results[i];
                history.push(
                    [result['时间'], result['动作'] < 2 ? ['进入', '离开'][parseInt(result['动作'])] : 'error']
                );
            }
            response.end(JSON.stringify(history));
        }
    )
});

module.exports = router;
