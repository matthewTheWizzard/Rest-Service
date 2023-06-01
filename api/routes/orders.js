const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order were created'
    })
})

router.post('/:orderID', (req, res, next) => {
    res.status(201).json({
        message: 'Order details were fetched',
        details: req.params.orderID
    })
})

router.delete('/:orderID', (req, res, next) => {
    res.status(201).json({
        message: 'Order was deleted'
    })
})




module.exports = router;