import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
export default function authorizeUser(req, res, next){
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if((decoded.exp*1000) < Date.now()){
            return res.status(401).json({ message: 'Access denied. Token expired.' });
        }
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

