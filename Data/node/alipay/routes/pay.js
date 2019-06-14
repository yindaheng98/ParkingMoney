let express = require('express');
let router = express.Router();

router.get('/:id', function (request, response, next) {
    let id = request.params.id;
    if (!(id in global.orders))
        return response.send('查无此订单');
    delete global.orders[id];//删除订单
    return response.send('付款成功');
});

module.exports = router;
