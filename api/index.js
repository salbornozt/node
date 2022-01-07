const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const user = require('./modules/user/network')
const auth = require('./modules/auth/network');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use('/api/login/', auth)
app.use('/api/user/', user);

app.listen(port, () => {
    console.log('api started');
})