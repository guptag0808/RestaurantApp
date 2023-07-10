
const mongoose = require("mongoose")

const resturantSchema= mongoose.Schema({
	
	name: String,
	address: {
	  street: String,
	  city: String,
	  state: String,
	  country: String,
	  zip: String
	},
	menu: [{
		_id: String,
	  name: String,
	  description: String,
	  price: Number,
	  image: String
	}]
})

const ResturantModel= mongoose.model("resturant", resturantSchema)

module.exports = {ResturantModel}