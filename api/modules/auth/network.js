const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index');


router.post('/', (req, resp) => {
    controller.login(req.body).then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.post('/token-refresh', (req, resp) => {
    controller.refresh(req.body).then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});





module.exports = router;