import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const publicKey = process.env.PUBLIC_KEY_PATH.replace(/\\n/g, '\n');

export const actionsMiddleware = (req, res, next) => {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid authorization format' });
    }
    
    const token = header.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        });

        if (!decoded.sub || !decoded.role) {
            return res.status(401).json({ message: 'Malformed token' });
        } 

        req.user = {
            id: decoded.sub, 
            username: decoded.username,
            role: decoded.role
        };

        next();
    } catch (error) {
        console.error('JWT error:', error.message);
        const statusCode = error.name === 'TokenExpiredError' ? 401 : 403;
        res.status(statusCode).json({ message });
    }
};

export const authorizationAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

export const authorizationClient = (req, res, next) => {
    if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Client access required' });
    }
    next();
};