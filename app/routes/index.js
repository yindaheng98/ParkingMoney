var express = require('express');
var router = express.Router();
const con = require('../controllers/connections');

router.use('/updated', require('./index/updated'));
router.use('/getCurrentCars', require('./index/getCurrentCars'));
router.use('/getCarHistorys', require('./index/getCarHistorys'));

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

router.get('/getDetects', function (request, response, next) {
    con.mysql.query(
        "SELECT 时间,图片,识别结果 FROM 识别记录 ORDER BY 时间 DESC LIMIT 1000",
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
                    [result['时间'], result['图片'], JSON.parse(result['识别结果'])]
                );
            }
            response.end(JSON.stringify(history));
        }
    )
});

module.exports = router;
