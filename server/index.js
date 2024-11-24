const express = require('express')
const app = express();
const { userRouter } = require('./routes/user') 
const { adminRouter } = require('./routes/admin') 
const { courseRouter } = require('./routes/course'); 
const mongoose  = require('mongoose');
const { userModal,courseModal,adminModal,purchaseModal} = require('./db');
const { DATABASE_URL } = require('./config');
const cors = require('cors')
app.use(cors());





app.use(express.json());
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/course',courseRouter);

const main = () =>{
    mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log("db conneted");
    }).catch((error)=>{
        console.log(error);
    })
    app.listen(3000);
}
main();
