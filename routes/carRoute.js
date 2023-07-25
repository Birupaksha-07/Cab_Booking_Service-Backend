const express = require('express');
const router = express.Router(); 
const {adminVerify} = require('../middlewares/tokenVerify')
const {adminAddCar,editCar,adminGetAllCar,deleteCar} = require("../controllers/carController")

router.post('/add-car',adminVerify,adminAddCar);
router.get('/get-all-car',adminVerify,adminGetAllCar);
router.put('/edit-car/:id',adminVerify,editCar);
router.delete('/delete-car/:id',adminVerify,deleteCar);

module.exports = router;