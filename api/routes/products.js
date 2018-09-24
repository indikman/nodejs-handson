const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Importing product Model
const Product = require("../models/products");

// Get all the products
router.get('/', (req, res, next)=>{
    Product.find().exec().then(doc=>{
        console.log('From database', doc);
        res.status(200).json(doc);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//Get product with the ID
router.get('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    
    Product.findById(id).exec().then(
        doc=>{
            if(doc){
                console.log(doc);
                res.status(200).json(doc);
            }else{
                res.status(204);
            }
        }
    ).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//Add a new product
router.post('/add', (req, res, next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });

    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"New product generated!",
            product:product
        });
    }).catch(err=>console.log(err));
});

//Delete a product
router.delete('/:productID', (req, res, next)=>{
    const id = req.params.productID;
    Product.deleteOne({_id:id}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//Update a product
router.patch('/:productID', (req, res, next)=>{
    const id = req.params.productID;
 
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.key] = ops.value;
    }

    Product.updateOne({_id:id}, {$set:updateOps}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;