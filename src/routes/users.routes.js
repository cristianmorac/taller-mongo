const { Router } = require('express');
const router = Router()
const User = require('../models/users')

router.get('/', async (req,res)=>{
    user = await User.find()
    res.status(200).json(user)
})

router.post('/', async (req,res)=>{
    try {
        const {name, password } = req.body
        await User.create({name,password})
        res.status(200).json({
            msg: true,
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router