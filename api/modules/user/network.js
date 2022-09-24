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

router.get('/empleados/', secure('list'), (req, resp) => {
    controller.getEmpleados().then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.get('/empleados/:id', secure('get'), (req, resp) => {
    controller.getEmpleadoById(req.params.id).then((data) => {
        response.Sucess(req, resp, data, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })

});

router.post('/empleados/', secure('insert'), (req, resp) => {
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
router.delete('/:id', secure('delete'), (req, resp) => {
    console.log(req.params.id)
    controller.remove(req.params.id).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((err) => {
        response.Error(req, resp, err.message, 500);
    })
})

router.post('/', secure('insert'), (req, resp) => {
    controller.insert(req.body).then((result) => {
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        response.Error(req, resp, error.message, 500);
    })
})


router.put('/', secure('update'),  (req, resp) => {
    controller.update(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
        response.Error(req, resp, error, 500);
    })
})

router.put('/perfil/', secure('update'),  (req, resp) => {
    controller.updatePerfil(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
        response.Error(req, resp, error, 500);
    })
})

router.put('/password/', secure('update'),  (req, resp) => {
    controller.updatePassword(req.body).then((result) => {
        console.log('succedd'+result);
        response.Sucess(req, resp, result, 200);
    }).catch((error) => {
        console.log('error'+error);
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