const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index');
const secure = require('./secure');
const axios = require('axios');


router.get('/', (req, resp) => {
    controller.list().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/tipo-seguro/', (req, resp) => {
    controller.listTipoSeguro().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/:id',(req, resp) => {
    controller.get(req.params.id).then((data) => {
        response.Sucess(req, resp, data, 200);

    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})
router.delete('/:id', (req, resp) => {
    controller.remove(req.params.id).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})

router.post('/', (req, resp) => {
    controller.insert(req.body).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })
})

router.post('/predict', (req, resp) => {
    let payload = {
        nom_seg : req.body.nom_seg
    }
    axios.post('http://127.0.0.1:3000/predict', payload).then(function (pResponse) {
        console.log(pResponse.data);
        response.Sucess(req, resp, pResponse.data, 200);

      })
      .catch(function (error) {
        console.log(error);
        response.Error(req, resp, error.message, 500);

      });
})


router.put('/', (req, resp) => {
    controller.update(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
        response.Error(req, resp, error, 500);
    })
})


module.exports = router;