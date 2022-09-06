const express= require ("express");
const bodyparser = require("body-parser")
const mongoose= require("mongoose")
const app=express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json())


//---
mongoose.connect( "mongodb://127.0.0.1:27017/ravi",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
console.log("Mongodb connected");
})

// //----

const  userSchema= new mongoose.Schema({
    uid:Number,
    uname:String,
    pws:Number
})


//---
const users =new mongoose.model("usernames",userSchema)


//---

app.get("/api/user",async(req,res)=>{

    let allusers= await users.find()
    res.status(200).json

    ({
        status:"success",
        message:"user found",
        user: allusers
       

    })
})
//----
app.post("/api/user",async(req,res)=>
{
    // var name=req.body;
    let name= await users.create(req.body)
    // console.log(name)
    
    res.status(201).json
    ({
        status:"success",
        user : name,
        message:"user added"
    })
    
})

app.delete("/api/user/:id",async(req,res)=>{
    let del=await users.deleteOne({_id:req.params.id})
    if (del.deletedCount==0){
        return res.status(404).json({
            status:"NOT found",
            message:"such user not found"
        })
    }
        res.status(200).json({
        status:"success",
        message:"user deleted",
        user:del

    })
})

//---



app.listen(9890,()=>{
    console.log("i am listening on port:9898")
})
