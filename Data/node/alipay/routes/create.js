let express = require('express');
let router = express.Router();
const qrcode = require('../controllers/lib/qrcode');
const crypto = require('crypto');
const length = 16;
const pay_url = 'http://yindaheng98.top:3002/pay/';

router.get('/:money', function (request, response, next) {
    let id = '';
    do {
        id = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    } while (id in global.orders);//创建订单编号
    global.orders[id] = request.params.money;//创建订单

    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var qr = qrcode("0", 'M');//"0"表示自动判断要生成的QRCode的大小
    qr.addData(pay_url + id, 'Byte');
    qr.make();//生成二维码
    response.send(JSON.stringify({id: id, qr: qr.createSvgTag()}));
});

module.exports = router;
