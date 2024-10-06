import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_token = process.env.JWT_TOKEN;

const fetchUser = (req, res, next) => {
    console.log("JWT_token", JWT_token);
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).json({ Error: "Please enter correct auth token" });
        }
        const data = jwt.verify(token, JWT_token);
        console.log("data", data);
        req.user = data;
        next();
    } catch (error) {
        console.error(error);
    }

}

export default fetchUser;