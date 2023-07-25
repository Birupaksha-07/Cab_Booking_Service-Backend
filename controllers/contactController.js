const { response } = require("express");
const contactModel = require("../models/contactModel");

exports.contact = async(req,res)=>{
    try{
        const {name,email,phone,subject,message} = req.body ?? {};
        if(!name || !email || !phone || !subject || !message){
            return res.status(200).json({status:0,msg:"All fields are required"})
        }

        const contact = await contactModel.create({
            name:name,
            email:email,
            phone:parseInt(phone),
            subject:subject,
            message:message
        })
        if(!contact){
            return res.status(200).json({ status: 0, msg: "Data not save" });
        }
        return res.status(200).json({ status: 1, data: contact });

    }catch(err){
        console.log(err);
        res.status(400).json("Something went wrong");
    }

}

exports.getContact = async(req,res)=>{
    try{
        const contactData = await contactModel.find();
        if(!contactData){
            return res.status(200).json({status:0,msg:"Data not found"})
        }
        return res.status(200).json({status:1,data:contactData});


    }catch(err){
        console.log(err);
        res.status(400).json("Something went wrong");
    }
}
