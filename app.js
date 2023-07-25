const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const registrationRoute = require("./routes/registrationRoute");
const contactRoute = require("./routes/contactRoute");
const carRoute = require("./routes/carRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user",registrationRoute);
app.use("/user",contactRoute);
app.use("/user",carRoute);

app.listen(process.env.PORT , ()=>{
    console.log(`Port is running at ${process.env.PORT}`);
});

mongoose
    .connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("DB connected successfully");
    }).catch((err)=>{
        console.log(err);
    })