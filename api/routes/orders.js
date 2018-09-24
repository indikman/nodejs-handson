const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message :'it works!'
    });
});

router.post('/', (req, res, next)=>{
    const product = {
        productID : req.body.productID,
        quantity : req.body.quantity
    };
    res.status(201).json({
        message :'Order Initiated',
        product : product
    });
});

module.exports = router;