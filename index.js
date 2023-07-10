const express= require("express")
const {connection}= require("./db")
const {userRoute}= require("./routes/userRouter")
const {resRoute}= require("./routes/resturantRouter")
const app= express()
app.use(express.json())
require('dotenv').config()
app.use("/api",resRoute)
app.use("/api",userRoute)
app.get("/", (req, res)=>{
	res.send("this is home page")
})

app.listen(process.env.PORT,async()=>{
	try{
		await connection
		console.log(`Connected with DB at ${process.env.PORT} `)
	}
	catch(err){
		console.log("error in mongoDB")
	}
	console.log("server listening on 3000")
})