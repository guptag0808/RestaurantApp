const express = require('express');	
const userRoute= express.Router()
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const {UserModel}= require("../model/userModel")

userRoute.get("/user",async(req,res)=>{
	const user= await UserModel.find()
	res.send(user)
})

userRoute.post("/register",async(req,res)=>{
   const {name,email,password,address}= req.body
   try{
	  const user= await UserModel.findOne({email})
	  if(user){
	 	res.send("User already exists")
	  }else{
		bcrypt.hash(password, 4, async(err, hash)=>{
			if(err) {
				res.send(err.message)
			}else{
				const newUser= new UserModel({name,email, password: hash, address})
				 await  newUser.save()
                res.status(201).send({"msg": "User successfully registered","newUser":newUser})
			}

		});
	  }
   }catch(err){
	res.status(500).send(err.message)
   }
   
})

userRoute.post("/login",async(req,res)=>{
	const {email,password}=req.body
	try{
		const user= await UserModel.findOne({email})
		if(!user){
			return res.status(403).send("User not found")
		}
		 bcrypt.compare(password, user.password, function(err, result) {
			
		  if(result){
			var token = jwt.sign({ userID: 'user._id' }, 'jwtToken');
		  res.status(201).send({"msg": "User successfully","Token": token})
		  }else{
			res.send({"msg":"Wrong password"})
		  }
		});
	}catch(err){
		res.send(err.message)
	}
})
userRoute.patch("/user/:id/reset",async(req,res)=>{
	const {password,newPass}=req.body
	const id= req.params.id
	
	try{
		const user= await UserModel.findById(id)
	
		if(!user){
			return res.status(403).send("User not found")
		}
		bcrypt.compare(password, user.password, async(err, result) =>{
			
			if(result){
			   user.password=newPass
			   const updatedUser= await user.save()

			res.status(204).send({"msg": "password successfully reset", "User":updatedUser})
			}else{
			  res.send({"msg":"Wrong password"})
			}
		  });
		
	}catch(err){
		res.send(err.message)
	}
})


module.exports= {
	userRoute
}