

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index.js");
const app = express();
app.use(express.json());
const bcrypt = require('bcryptjs');
require('dotenv').config();

//connection to database
//sir I'm using a loacl database in my local machine
//I named it kodecampDB
mongoose.connect('mongodb://localhost:27017/kodecampDB', {},
    function (err) {
        if (err) console.log(err);
        console.log("Connected to database successfully");
    });

    

    

app.use('/', indexRouter);
//app.use('/', userRouter);


 const port = process.env.PORT || 7000;
 app.listen(port, () => console.log(`Josh Listening on port ${port}...`));
