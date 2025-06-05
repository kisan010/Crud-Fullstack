
const dbServices =require('../services/db.services');
const usersSchemas =require('../model/users.schemas')






const readRecord=async(req,res)=>{
    try{
        const dbRes=await dbServices.readdata(usersSchemas);
        res.status(200).json({data:dbRes})
    }
    catch(err)
    {
        res.status(500).json({
            message:'internal server Error',
            error:err
            
        })
    }
}
 const createRecord=async(req,res)=>{
    try{
        const data=req.body;
        const profile=req.file ? req.file.filename:null;
        data.profile=profile ? `/profile/${profile}`:'/profile/logo.png';
        const dbRes=await dbServices.createData(data,usersSchemas)
        res.status(200).json({message:'Record created',data:dbRes})
    }
    catch(err)
    {
        if(err.code==11000)
        {
            res.status(422).json({
                message:'Email already exist!', 
                code:err.code
            })
        }
        else{
            res.status(500).json({
                message:'internal server Error',
                error:err
                
            })
        }
       
    }
}
 const updateRecord=async(req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
          const profile=req.file ? req.file.filename:null;
        profile ? data.profile= `/profile/${profile}`:null;
        const dbRes=await dbServices.updateData(id,data,usersSchemas)
        res.status(200).json({message:'data updated'})
    }
    catch(err)
    {
        res.status(500).json({
            message:'internal server Error',
            error:err
            
        })
    }
}
const deleteRecord=async(req,res)=>{
    try{
        const id=req.params.id;
        const dbRes=await dbServices.deleteData(id,usersSchemas)
        res.status(200).json({message:'data deleted'})
    }
    catch(err)
    {
        res.status(500).json({
            message:'internal server Error',
            error:err
            
        })
    }
}

 module.exports ={
    readRecord,
    createRecord,
    updateRecord,
    deleteRecord,
}