let express = require('express');
let router = express.Router();

router.get('/:id', function (request, response, next) {
    let id = request.params.id;
    if (!(id in global.orders))
        return response.send('yes');
    return response.send('no');
});

module.exports = router;
