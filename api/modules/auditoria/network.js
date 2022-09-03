const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index');
//const secure = require('./secure');


router.get('/', (req, resp) => {
    console.log("hola >>>");
    controller.listAud().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});


router.post('/', (req, resp) => {
    console.log("entra a post");
    controller.insertAud(req.body).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })
})



module.exports = router;