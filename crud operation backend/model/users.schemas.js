const mongo=require('mongoose');

const {Schema}=mongo;

const usersSchema=new Schema({
    name: String,
    email:{
        type: String,
        unique:true
    },
    password:String,
    profile:String
    
   
},{timestamps:true})


module.exports= mongo.model("users",usersSchema)