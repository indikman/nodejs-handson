const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//Setting the Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect("mongodb+srv://nodejs-handson:"
    +process.env.MONGO_ATLAS_PW
    +"@indikas-cluster-bpgpc.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
 
app.use(morgan('dev'));

//Parsing Requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handling CORS
app.use((req, res, next)=>{
    res.header("Access-Controll-Allow-Origin", "*");
    res.header(
        "Access-Controll-Allow-Headers",
        "Origin, Content-Type, Authorization, X-Requested-With, Accept"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Controll-Allow-Methods", "GET, POST, PUSH, DELETE, PATCH");
        res.status(200).json({});
    }

    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    }); 
});

module.exports = app;