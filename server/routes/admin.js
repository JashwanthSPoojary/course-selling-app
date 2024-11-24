const express = require('express');
const {
    adminAuth
} = require('../middlewares/admin');
const {
    z
} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    adminModal,
    courseModal
} = require('../db');
const {
    ADMIN_JWT_SECRET
} = require('../config');
const Router = express.Router;

const adminRouter = Router();


adminRouter.post('/signup', async (req, res) => {
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
        await adminModal.create({
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

adminRouter.post('/signin', async (req, res) => {
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
        const user = await adminModal.findOne({
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
        }, ADMIN_JWT_SECRET)
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

adminRouter.post('/course', adminAuth, async (req, res) => {
    const validschema = z.object({
        title: z.string().min(2, {
            message: "title should be atleast 2 characters"
        }).max(20, {
            message: "title should be max 20 characters"
        }),
        description: z.string().min(4, {
            message: "description should be atleast 4 charaters"
        }).max(60, {
            message: "password should be max 60 characters"
        }),
        imageUrl: z.string(),
        adminId: z.string().optional()
    })
    const parsedschema = validschema.safeParse(req.body)
    if (!parsedschema.success) {
        const error = parsedschema.error;
        res.json({
            error
        })
        return
    }
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const adminId = req.userId;
    try {
        const data = await courseModal.create({
            title,
            description,
            imageUrl,
            adminId
        })
        const courseId = data._id
        res.json({
            message: "course is added",
            courseId
        })
    } catch (err) {
        res.json({
            error: "failed to add course",
            err
        })
    }
})

adminRouter.put('/course', adminAuth, async (req, res) => {
    const validschema = z.object({
        title: z.string().min(2, {
            message: "title should be atleast 2 characters"
        }).max(20, {
            message: "title should be max 20 characters"
        }).optional(),
        description: z.string().min(4, {
            message: "description should be atleast 4 charaters"
        }).max(60, {
            message: "password should be max 60 characters"
        }).optional(),
        imageUrl: z.string().optional(),
        courseId: z.string()
    })
    const parsedschema = validschema.safeParse(req.body)
    if (!parsedschema.success) {
        const error = parsedschema.error;
        res.json({
            error
        })
        return
    }
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const courseId = req.body.courseId;

    try {
        await courseModal.findByIdAndUpdate(courseId, {
            title,
            description,
            imageUrl
        })
        res.json({
            message: "course is updated"
        })
    } catch (err) {
        res.json({
            error: "failed to update course",
            err
        })
    }
})

adminRouter.get('/course/bulk',adminAuth, async (req, res) => {
    const adminId = req.userId;
    console.log(adminId);
    
    try {
        const data = await courseModal.find({
            adminId
        });
        res.json({
            message: "showing the courses",
            data
        })
    } catch (err) {
        res.json({
            error: "failed to showing the courses",
            err
        })
    }
})

module.exports = {
    adminRouter
}