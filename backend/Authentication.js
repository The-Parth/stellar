// Authentication middleware
import admin from "firebase-admin";

const authenticateUser = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default authenticateUser;