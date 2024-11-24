const { USER_JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken');



const userAuth = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        try {
            const decodedinformation = jwt.verify(token,USER_JWT_SECRET);
            const userId = decodedinformation.userId;
            req.userId = userId;
            next();
        } catch (error) {
            console.log("error is "+error);
        }
    } else {
        res.json({
            error: "user is unauthorized"
        })
        return
    }
}

module.exports = {
    userAuth
}