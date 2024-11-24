const express = require('express');
const { userModal, purchaseModal } = require('../db');
const Router = express.Router;
const {
    z
} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    USER_JWT_SECRET
} = require('../config');
const {
    userAuth
} = require('../middlewares/user');

const userRouter = Router();


userRouter.post('/signup',async(req,res)=>{
    const validschema = z.object({
        email: z.string()
            .email()
            .includes('@')
            .min(8, {
                message: "email should be atleast 8 characters"
            })
            .max(50, {
                message: "email should be max 50 characters"
            }),
        password: z.string()
            .min(4, {
                message: "password should be atleast 2 characters"
            }).max(16, {
                message: "password should be max 16 characters"
            })
            .regex(/[a-zA-Z]/, "should contain characters")
            .regex(/[0-9]/, "should contain numbers")
            .regex(/[@$!%*?&#]/, "special character please"),
        name: z.string().min(2).max(20)
    })
    const parsedschema = validschema.safeParse(req.body);
    if (!parsedschema.success) {
        const error = parsedschema.error;
        res.json({
            error
        })
        return
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const hashedpassword = await bcrypt.hash(password, 5);
    try {
        await userModal.create({
            email,
            password: hashedpassword,
            name
        })
        res.json({
            message: "signed up"
        })
    } catch (err) {
        res.json({
            error: "failed to sign up",
            err
        })
    }

})

userRouter.post('/signin',async(req,res)=>{
    const validschema = z.object({
        email: z.string()
            .email()
            .includes('@')
            .min(8, {
                message: "email should be atleast 8 characters"
            })
            .max(50, {
                message: "email should be max 50 characters"
            }),
        password: z.string()
            .min(4, {
                message: "password should be atleast 2 characters"
            }).max(16, {
                message: "password should be max 16 characters"
            })
            .regex(/[a-zA-Z]/, "should contain characters")
            .regex(/[0-9]/, "should contain numbers")
            .regex(/[@$!%*?&#]/, "special character please"),
    })
    const parsedschema = validschema.safeParse(req.body);
    if (!parsedschema.success) {
        const error = parsedschema.error;
        res.json({
            error
        })
        return
    }
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await userModal.findOne({
            email
        })
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({
                error: "not able to sign in"
            })
            return
        }
        const token = jwt.sign({
            userId: user._id
        }, USER_JWT_SECRET)
        res.status(200).json({
            message: user.name,
            token
        })
    } catch (err) {
        res.json({
            error: "try not able to sign in",
            err
        })
    }
})

userRouter.get('/purchases',userAuth,async(req,res)=>{
    const userId = req.userId;
    try {
        const data = await purchaseModal.find({userId})
        res.json({
            message:"are all purchases",
            data,
            userId
        })
    } catch (err) {
        res.json({
            error:"failed to show purchases",
            err
        })
    }
})

module.exports = {
    userRouter
}