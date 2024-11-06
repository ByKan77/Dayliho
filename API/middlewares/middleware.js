const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.authentification = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({success: false});
        windows.location.href = "../../pages/login.php";
    }
    else{
        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(401).json({success: false});
            }
            else{
                const user = await userModel.getUserByEmail(decoded.email);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.status(401).json({success: false});
                }
            }
        });
    }
}

exports.admin = async (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    }

}