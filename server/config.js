require('dotenv').config();

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
    ADMIN_JWT_SECRET,
    USER_JWT_SECRET,
    DATABASE_URL
}