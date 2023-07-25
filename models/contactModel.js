const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is required"]
    },
    email:{
        type:String,
        require:[true,"email is required"]
    },
    subject:{
        type:String,
    },
    phone:{
        type:Number,
    },
    message:{
        type:String,
        require:[true,"Message is required"]
    }
})

const contactModel = mongoose.model("contact",contactSchema);
module.exports = contactModel;