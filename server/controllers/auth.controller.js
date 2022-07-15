require('dotenv').config();
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserGame } = require('../models');
const controller = {};


const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


controller.signup = async (req, res, next) => {
    try {
        const newUser = await UserGame.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        });

        res.status(201).json({
            status: 'success',

            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

controller.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please provide email and password!"
            })
        }

        const foundUser = await UserGame.findOne({ where: { email: email } });
        
        if (!foundUser) throw { message: 'User Not Found', status: 'failed', code: 404 };
        
        const isValidPassword = bcrypt.compareSync(password, foundUser.password);
        
        if (isValidPassword) {

            const payload = {
                user_game_id: foundUser.user_game_id,
                username: foundUser.username,
                password: foundUser.password,
                email: foundUser.email,
                role: foundUser.role
            };
            console.log(payload)

            const token = signToken(payload);

            return res.status(200).json({
                status: 'success',
                token
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: "Wrong password"
            })
        }

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }
}

module.exports = controller;