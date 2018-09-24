const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message :'product id works!'
    });
});

router.get('/:productID', (req, res, next)=>{
    res.status(200).json({
        message :'product id works!',
        id : req.params.productID
    });
});

module.exports = router;