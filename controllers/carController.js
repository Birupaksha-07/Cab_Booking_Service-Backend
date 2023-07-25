const carModel = require("../models/carModel");

exports.adminAddCar = async (req, res) => {
    try {
        const { name, type, price, sit, ac, carNumber } = req.body ?? {};
        if (!name || !type || !price || !sit || !ac || !carNumber) {

            return res.status(200).json({
                status: 0,
                msg: "name,type,price, sit,  ac, carNumber  fields are required",
            });
        }

        const addCar = await carModel.create({
            name: name,
            type: type,
            price: price,
            sit: sit,
            ac: ac,
            carNumber: carNumber,
        });
        if (!addCar) {
            return res.status(200).json({ status: 0, msg: "data has not saved" });
        }

        return res.status(200).json({ status: 1, data: addCar });

    } catch (err) {
        console.log(err);
        res.status(400).json("Something error");
    }
}

exports.editCar = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, type, price, sit, ac, carNumber } = req.body ?? {};
        if (!name || !type || !price || !sit || !ac || !carNumber) {
            return res.status(200).json({ status: 0, msg: "name,type,price, sit,  ac, carNumber  fields are required" });
        }

        const updateCar = await carModel.updateOne(
            { _id: id },
            {
                name: name,
                type: type,
                price: price,
                sit: sit,
                ac: ac,
                carNumber: carNumber,
            }
        )
        if(!updateCar){
            return res.status(200).json({
                status: 0,
                msg: "car not updated",
              });
        }
        return res.status(200).json({status:1, msg:"Update successfully"});

            
    } catch (err) {
        console.log(err);
        res.status(400).json("Something error");
    }

}

exports.adminGetAllCar = async(req,res)=>{
    try{
        const allCar = await carModel.find();
        if(!allCar){
            return res.status(200).json({status:0,msg:"Cra not found"});
        }
        
        return res.status(200).json({
        status: 1,
        data: allCar,
        });

    }catch (err) {
        console.log(err);
        res.status(400).json("Something error");
    }
}

exports.deleteCar = async(req,res)=>{
    try{
        const id = req.params.id;

        const deleteCar = await carModel.deleteOne({_id:id});
        if (!deleteCar)
        return res.status(200).json({
          status: 0,
          msg: "car not Deleted",
        });
        
        return res.status(200).json({status:1,msg:"Car deleted successfully"});


    }catch (err) {
    console.log(err);
    res.status(400).json("Something error");
  }
    
}