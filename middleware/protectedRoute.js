import jwt from 'jsonwebtoken';

const protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            return res.status(401).json({error: 'Unauthorized - No token provided'});
        }
        
    } catch (error) {
        
    }
}

export default protectedRoute;