const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const mongoose = require('mongoose')

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs)
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        res.status(201).json({
            message: 'Created product',
            createdProduct: {
                ...result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });

})

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;

    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if(doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({
                    message: "No product found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id: id}, {
        $set: updateOps
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router;