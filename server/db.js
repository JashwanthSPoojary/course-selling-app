const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema,model } = mongoose;

const userSchema = new Schema({
    email:{ type:String , required:true , unique:true },
    password:{ type:String , required:true  },
    name: { type:String , required:true }
})
const adminSchema = new Schema({
    email:{ type:String , required:true , unique:true },
    password:{ type:String , required:true  },
    name: { type:String , required:true }
})

const courseSchema = new Schema({
    title:{ type:String , required:true },
    description:{ type:String , required:true  },
    imageUrl: { type:String , required:true },
    adminId: { type:ObjectId , required:true}
})

const purchaseSchema = new Schema({
    userId : { type:ObjectId , required:true},
    courseId : { type:ObjectId , required:true},
})

const userModal = model('user',userSchema);
const adminModal = model('admin',adminSchema);
const courseModal = model('course',courseSchema);
const purchaseModal = model('purchase',purchaseSchema);



module.exports = {
    userModal,
    adminModal,
    courseModal,
    purchaseModal
}



