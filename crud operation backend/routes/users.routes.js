const express=require('express');
const userController=require('../controllers/user.controller.js');
const upload = require('../middleware/upload.middleware.js');
const router=express.Router();

router.get('/',userController.readRecord);
router.post('/',upload.single("profile"),userController.createRecord);
router.put('/:id',upload.single("profile"),userController.updateRecord);
router.delete('/:id',userController.deleteRecord)

module.exports=router;