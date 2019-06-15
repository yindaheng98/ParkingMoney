let express = require('express');
let router = express.Router();
const con = require('../controllers/connections');

router.get('/:id', function (request, response, next) {
    let id = request.params.id;
    con.redis.get(id, function (err, value) {//先查一遍
        if (err !== null) return response.end('error');
        return response.end(value === null ? 'yes' : 'no');
    });
});

module.exports = router;
