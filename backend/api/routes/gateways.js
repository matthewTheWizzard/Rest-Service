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

router.get('/:id', async (req, res) => {
    const gateway = await Gateway.findById(req.params.id).populate('devices')
    try {
        if (!gateway) {
            return res.status(404).json({ error: 'Gateway not found.' });
        }
        res.status(200).json(gateway);
    }
    catch(e){
        res.status(500).json({ error: e.message });
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
            error: e.message
        })
    }
})

router.delete('/:id_gateway/', async(req, res) => {
    const gateway = await Gateway.findById(req.params.id_gateway);
    try {
        if (!gateway) {
            return res.status(404).json({
                message: "Gateway does not exist"
            })
        }

        await gateway.deleteOne();
        res.status(200).json({
            message: "Gateway removed"
        })
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
})

module.exports = router;