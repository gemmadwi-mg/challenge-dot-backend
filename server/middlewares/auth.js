const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { UserGame } = require('../models');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {

        return next(
            res.status(401).json({
                status: "error",
                message: "You are not logged in! Please log in to get access."
            })
        );
    }

    // // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


    // Check if user still exists
    const currentUser = await UserGame.findByPk(decoded.user_game_id);


    if (!currentUser) {
        return next(
            res.status(401).json({
                status: "error",
                message: "The user belonging to this token does no longer exist."
            })
        );
    }

    req.user = currentUser;
    next()
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(401).json({
                    status: "error",
                    message: "You do not have permission to perform this action"
                })
            );
        }

        next();
    };
};


module.exports = {
    protect,
    restrictTo
};
