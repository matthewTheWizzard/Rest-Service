const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/orders')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        .populate('product', 'price _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({
                error: err
            })
        })
})

router.post('/', async (req, res, next) => {
    try {
        const product = await Product.findById(req.body.productId);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            error: err
        })
    }
    try {
        const order = await new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        const result = await order.save();
        res.status(201).json(result)
    }
    catch(err){
        return res.status(500).json({
            error: err
        })
    }
})

router.get('/:orderID', async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.orderID)
            .populate('product')
        if(!order) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
})

router.delete('/:orderID', async(req, res, next) => {
    try{
        const order = await Order.deleteOne({ _id: req.params.orderID });
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'GET',
                url: "http://localhost:3000/orders"
            }
        })
    }
    catch(err){
        res.status(500).json({
            error: err
        })
    }
})




module.exports = router;