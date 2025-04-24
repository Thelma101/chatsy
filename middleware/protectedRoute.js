import jwt from 'jsonwebtoken';

const protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' })
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' })
    }
}


export default protectedRoute;