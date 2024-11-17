const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.recruiter = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = { protect };
