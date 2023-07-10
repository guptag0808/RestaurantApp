const jwt= require("jsonwebtoken")

const authentication = (req,res,next) => {
	const token = req.headers.authorization

	if(token){
		var decoded= jwt.verify(token,jwtToken)
		if(decoded){
			const userID= decoded.userID
			req.body.userID= userID
			next()
		}else{
			res.send("PLease Login First")
		}
	}else{
		res.send("PLease Login Second")
	}
}

module.exports={authentication}