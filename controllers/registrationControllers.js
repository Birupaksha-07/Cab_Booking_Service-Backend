const registrationModel = require("../models/registrationModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registration = async(req,res)=>{
    try{
        const {name,email,phone,password,cpassword,gender} = req.body ?? {};
        console.log(req.body);
    
        if (!name || !email || !phone || !password || !cpassword || !gender){
            return res.status(200).json({status:0 , msg:"All fields are required"})
        }
    
        if (password != cpassword) {
            return res.status(200).json({status:0 , msg:"Password and confirm password does not match"})
        }
        
        const checkUserPhone = await registrationModel.findOne({phone:phone});
        if(checkUserPhone){
            return res.status(200).json({status:0 , msg:"You are already registered"})
        }
    
        const checkUserEmail = await registrationModel.findOne({email:email});
        if(checkUserEmail){
            return res.status(200).json({status:0 , msg:"You are already registered"})
        }
    
        const hasPass =  await bcryptjs.hash(password,10);
    
        const createUser = await registrationModel.create({
            name : name,
            email : email,
            phone : phone,
            password : hasPass,
            gender : gender,
            role: "user",
        })
        if(!createUser){
            return res.status(200).json({status:0 , msg:"User registration failed"})
        }

        const token = await jwt.sign({
            name: createUser.name,
            email: createUser.email,
            phone: createUser.phone,
            role: createUser.role
        }, process.env.JWT_KEY);
        console.log(token);

        return res.status(200).json({status:1 ,token, data: createUser});
    }catch(err){
        console.log(err);
        return res.status(400).json("Something went wrong")
    }
}

exports.login = async(req,res)=>{
    try{
        const {phone,password} = req.body ?? {};
        console.log(req.body);
    
        if(!phone || !password){
            return res.status(400).json({status:0 , msg:"Phone and Password are required"})
        }
    
        const getUser = await registrationModel.findOne({phone:phone});
        if(!getUser){
            return res.status(200).json({status:0,msg:"Phone no is not registered"})
        }
    
        let passStr = password.toString();
        const checkPass = await bcryptjs.compare(passStr,getUser.password);
    
        if(!checkPass){
            return res.status(200).json({status:0,msg:"Password doesnot matched"})
        }
        const token = await jwt.sign(
            {
              name: getUser.name,
              email: getUser.email,
              phone: getUser.phone,
              role: getUser.role,
            },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 * 24 * 365 }
          );
          getUser.password = null;
          return res.status(200).json({ status: 1, token, data: getUser });
    
    }catch(err){
        console.log(err);
        res.status(400).json("Something went wrong")
    }
    
}