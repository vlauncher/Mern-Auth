const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/auth')


/* Handle Register */
router.post('/register',async (req,res,next)=>{
    const{first_name,last_name,email,password} = req.body;
    try {
        // Check for empty fields.
        if(!first_name || !last_name || !email || !password ) {
            res.status(400).send({msg:"Fields cant be empty"});
            return
        }
        // Check for existing user
        const userExists = await User.findOne({where:{email:email}});

        if(userExists) {
            res.status(400).send({msg:"Email already exists"});
            return
        }
        const user = await User.create({
            first_name,last_name,email,password
        });
        if(user){
            res.status(201).send({
                first_name:first_name,
                last_name:last_name,
                email:email,
                token: generateToken(user.id),
                msg:"Registeration success",
            })
        }
    } catch (error) {
        throw error;
    }
});

/* Handle Login */
router.post('/login',async (req,res)=>{
    const{email,password} = req.body;
    try {
        if(!email || !password) {
            res.status(400).send({msg:"Fill in all fields"})
            return
        }
        const user = await User.findOne({where:{email:email}})

        if(user && (await bcrypt.compare(password,user.password))) {
            res.status(200).send({
                email:email,
                first_name:user.first_name,
                last_name:user.last_name,
                token:generateToken(user.id)
            })
        }
    } catch (error) {
        console.log(error)
    }
});

// Getme Private Route
router.get('/me', protect,(req,res)=>{
    res.json({msg:'This is me'});
});

/* Handle Logout */
router.post('/logout',(req,res)=>{
    res.send('Logout');
});

const generateToken = (id) => {
   return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn:"12h"});
}

module.exports = router;