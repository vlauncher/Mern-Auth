const asynchandler = require('express-async-handler');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');


const protect = asynchandler(async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // veryfy token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findByPk(decoded.id,{attributes:{exclude:['password']}})

            next()
        } catch (error) {
            console.log(error);
            res.status(401).send({msg:'Not authorized'})
        }
    }
    if(!token){
        res.status(401).send({msg:'Not authorised no token'});
    }
})

module.exports = {
    protect
}