const jwt = require("jsonwebtoken");

exports.adminVerify = async(req,res,next)=>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(200).json({status:0,msg:"Token is required"});
        }

        const decode = jwt.verify(token,process.env.JWT_KEY);
        if(!decode){
            return res.status(200).json({ status: 0, msg: "Token is not valied" });
        }
        if(decode.role =="admin"){
            // req.user = decode;
            next();
        }

    }catch(error){
        console.log(error);
        res.status(400).json({status:0,msg:"Something went wrong"});
    }
}

exports.userVerify = async(req,res,next)=>{
    try{
        const token = req.body.token;

        const decode = jwt.verify(token,process.env.JWT_KEY);
        if(!decode){
            return res.status(200).json({ status: 0, msg: "Token is not valied" });
        }
        if(decode.role =="user"){
            req.user = decode;
            next();
        }

    }catch(error){
        console.log(error);
        response.status(400).json({status:0,msg:"Something went wrong"});
    }
}