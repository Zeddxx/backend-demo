const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    // console.log(token);

    if(!token){
        return res.status(401).json("You are not authorized to access this")
    }
    jwt.verify(token, process.env.SECRET, async(error, data) => {
        if(error){
            return res.status(403).json("Token is not valid!")
        }

        req.userId = data._id
        // console.log("passed");


        next()
    })
}

module.exports = verifyToken