const express = require('express')
const Router = express.Router;
const { courseModal, purchaseModal } = require('../db');
const { userAuth } = require('../middlewares/user');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/"); // Directory where files will be stored
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename file with unique name
//     },
//   });

// const upload = multer({ storage: storage });
// app.use("/uploads", express.static("uploads"));


  

const courseRouter = Router();



courseRouter.get('/preview',async(req,res)=>{
    try {
        const data = await courseModal.find({});
        res.json({
            message:"all the courses",
            data
        })
    } catch (err) {
        res.json({
            error:"failed to show all the courses",
            err
        })
    }
})

courseRouter.post('/purchase',userAuth,async(req,res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;
    try {
        await purchaseModal.create({
            userId,
            courseId
        })
        res.json({
            message:"courses is purchased",
            courseId
        })
    } catch (err) {
        res.json({
            error:"courses is purchased",
            err
        })
    }
})




module.exports = {
    courseRouter
}