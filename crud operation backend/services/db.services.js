
const mongoose=require('mongoose');
require('dotenv').config();
// const url='mongodb://127.0.0.1:27017/Product';
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB Atlas!"))
.catch(err => console.error("MongoDB Connection Error:", err));

// readdata

const readdata=async(schema)=>{
    const dbRes=await schema.find();
    return dbRes;
}
 const createData=async(data,schema)=>{
    const dbRes=await new schema(data).save();
    return dbRes;
}
 const updateData=async(id,data,schema)=>{
    const dbRes=await schema.findByIdAndUpdate(id,data,{new:true});
    return dbRes;
}

 const deleteData=async(id,schema)=>{
    const dbRes=await schema.findByIdAndDelete(id);
    return dbRes;
}

module.exports={
    readdata,
    createData,
    deleteData,
    updateData
}


