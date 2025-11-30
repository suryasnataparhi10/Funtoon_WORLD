const jwt = require('jsonwebtoken');

exports.authMiddleware = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "Authorization header missing"
            })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}




exports.roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Forbidden: You don't have enough permission to access this resource"
            })
        }
        next()
    }
}