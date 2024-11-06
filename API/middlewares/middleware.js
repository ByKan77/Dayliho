const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.authentification = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({success: false});
    }
    else{
        jwt.verify(token, 'enculer', async (err, decoded) => {
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