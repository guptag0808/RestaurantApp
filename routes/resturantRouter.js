const express = require('express');
const resRoute= express.Router()
const {ResturantModel}= require("../model/resturantModel")

resRoute.post("/restaurants",async(req,res)=>{
const {name,address,menu}  = req.body
try{
	const resturant= new ResturantModel({name,address,menu})
	resturant.save()
	res.status(200).send({"New-Resturant" : resturant})
}catch(error){
	res.status(500).send(error)
}
})


resRoute.get("/restaurants",async(req,res)=>{
	try{
		const resturant= await ResturantModel.find()
		res.status(200).send(resturant)
	}catch(err){
		res.status(500).send(err.message)
	}
})

resRoute.get("/restaurants/:id",async(req,res)=>{
	const id= req.params.id
	try{
		const resturant= await ResturantModel.findById(id)
		res.status(200).send(resturant)
	}catch(err){
		res.send(err.message)
	}
})




resRoute.get("/restaurants/:id/menu",async(req,res)=>{
	const id= req.params.id
	try{
		const resturant= await ResturantModel.findById(id)
		  const menu= resturant.menu
		res.status(200).send(menu)
	}catch(err){
		res.send(err.message)
	}
})

resRoute.delete("/restaurants/:id/menu/:menuId",async(req,res)=>{
	const id= req.params.id
	const itemId = req.params.menuId;
	try{
		const resturant= await ResturantModel.findById(id)
		
		if (!resturant) {
			return res.status(404).json({ error: 'Restaurant not found' });
		  }
		 
		   await  resturant.menu.forEach((item,i)=>{
				if(itemId==item._id){
				      console.log(item)
					resturant.menu.splice(resturant.menu.indexOf(itemId),1)
		   }
			})
		     resturant.save()
		  res.status(202).send({ message: 'Menu item deleted successfully' });
	}catch(err){
		res.send(err.message)
	}
})




  resRoute.post("/restaurants/:id/menu",async(req,res)=>{
	const id= req.params.id
	const newItem= req.body
	try{
		const resturant= await ResturantModel.findById(id)
		  const menu= resturant.menu;
		  await menu.push(newItem)
           resturant.save()
		res.status(200).send(menu)
	}catch(err){
		res.send(err.message)
	}
})

module.exports={
	resRoute
}