const express = require('express');
const router = express.Router();
const response = require('../../../network/response')
const controller = require('./index');
const secure = require('./secure');


router.get('/', secure('list'), (req, resp) => {
    controller.list().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/empleados/', (req, resp) => {
    controller.getEmpleados().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/empleados/:id', (req, resp) => {
    controller.getEmpleadoById(req.params.id).then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.post('/empleados/', (req, resp) => {
    controller.insertEmpleadoById().then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })
})

router.get('/:id', secure('get'),(req, resp) => {
    controller.get(req.params.id).then((data) => {
        response.Sucess(req, resp, data, 200);

    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})
router.delete('/:id', (req, resp) => {
    console.log(req.params.id)
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


router.put('/',  (req, resp) => {
    controller.update(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
        response.Error(req, resp, error, 500);
    })
})

router.put('/perfil/',  (req, resp) => {
    controller.updatePerfil(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
        response.Error(req, resp, error, 500);
    })
})


router.patch('/', (req, resp) => {
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