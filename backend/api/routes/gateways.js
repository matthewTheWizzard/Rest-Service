const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Gateway = require('../models/gateway')
const Device = require('../models/device')

router.get('/', async (req, res) => {
    const gateways = await Gateway.find().populate('devices');
    try {
        res.status(200).json(gateways)
    } catch(e) {
        res.status(500).json({
            error: e,
        })
    }
})

router.post('/', async (req, res, next) => {
    const gateway = new Gateway({
        serialNumber: req.body.serialNumber,
        name: req.body.name,
        ipv4: req.body.ipv4,
    });
    try {
        const result = await gateway.save();
        res.status(201).json(result)
    }
    catch(e){
        res.status(500).json({
            error: e
        })
    }
})

module.exports = router;