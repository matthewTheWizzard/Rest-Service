const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Device = require('../models/device')
const Gateway = require('../models/gateway')

router.get('/', async (req, res) => {
    try {
        const product = await Device.find();
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json(
            {error: e.message}
        );
    }
})

router.post('/:id_gateway', async (req, res) => {
    const gateway = await Gateway.findById(req.params.id_gateway);
    try {
      if (!gateway) {
          return res.status(404).json({
              message: "Gateway does not exist"
          })
      }

      if (gateway.devices.length >= 10) {
          return res.status(500).json({
              message: "Gateway is full"
          })
      }

      const device = new Device({
          uid: req.body.uid,
          vendor: req.body.vendor,
          status: req.body.status
      });

      try {
          const result = await device.save();
          gateway.devices.push(result);
          await gateway.save();
          res.status(201).json(result);
      }
      catch(e) {
          return res.status(500).json({
              error: e.message
          })
      }
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
})

router.delete('/:id_gateway/:id_device', async(req, res) => {
    const gateway = await Gateway.findById(req.params.id_gateway);
    try {
        if (!gateway) {
            return res.status(404).json({
                message: "Gateway does not exist"
            })
        }

        const device = await Device.findById(req.params.id_device);
        console.log(device)

        if (!device) {
            return res.status(404).json({
                message: "Device does not exist"
            })
        }

        try {
            const result = await device.deleteOne();
            await res.status(200).json({
                message: "Device removed"
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
        }
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
})

module.exports = router;