import express from 'express';
//const express = require('express');
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import productRoute from './routes/productRoute';
import userRoute from './routes/userRoute';
import orderRoute from './routes/orderRoute';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch( error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(3004, () => {
    console.log("Server started at http://localhost:3005")
});

