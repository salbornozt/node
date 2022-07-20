const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index');
const secure = require('./secure');


router.get('/', (req, resp) => {
    controller.list().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/:id', secure('get'), (req, resp) => {
    controller.get(req.params.id).then((data) => {
        response.Sucess(req, resp, data, 200);

    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})
router.delete('/', secure('delete'), (req, resp) => {
    controller.remove(req.query.id).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})

router.post('/', (req, resp) => {
    console.log('here 123');
    controller.insertToGetId(req.body.customer).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })
})


router.put('/', secure('update'), (req, resp) => {
    controller.update(req.body).then((result) => {
        console.log('succedd' + result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error' + error);
        response.Error(req, resp, error, 500);
    })
})

router.patch('/', secure('update'), (req, resp) => {
    console.log(req.body);


    controller.update(req.body).then((result) => {
        console.log('succedd' + result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error' + error);
        response.Error(req, resp, error, 500);
    })
})


module.exports = router;