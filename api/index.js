const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const clients = require('./modules/customer/network');
const naturaleza = require('./modules/naturaleza/network');
const campos = require('./modules/campos/network');
const seguro = require('./modules/seguros/network')
const proceso = require('./modules/procesos/network')
const anexProceso = require('./modules/anexo_proceso/network')
const compania = require('./modules/compania/network')
const ramo = require('./modules/ramo/network')
const producto = require('./modules/producto/network')
const cotizacion = require('./modules/cotizacion/network')
const excel = require('./modules/exports/network')


const user = require('./modules/user/network')
const auth = require('./modules/auth/network');
const errors = require('../network/errors');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');

    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}

console.log('here '+port)
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use('/api/login/', auth)
app.use('/api/user/', user);
app.use('/api/client/',clients);
app.use('/api/naturaleza/',naturaleza);
app.use('/api/campos/',campos);
app.use('/api/seguros/',seguro)
app.use('/api/procesos/',proceso)
app.use('/api/anexo_proceso/',anexProceso)
app.use('/api/compania/',compania)
app.use('/api/ramo/',ramo)
app.use('/api/producto/',producto)
app.use('/api/cotizacion/',cotizacion)
app.use('/api/exports', excel)
app.use(errors);

app.listen(port, () => {
    console.log('api started');
})