const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const deviceRoutes = require('./api/routes/device')
const gatewaysRoutes = require('./api/routes/gateways')

mongoose.connect('mongodb+srv://admin:admin@nodejs-rest.a03r9d4.mongodb.net/?retryWrites=true&w=majority');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

app.use('/device', deviceRoutes);
app.use('/gateways', gatewaysRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})

app.use((error, req, res) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;