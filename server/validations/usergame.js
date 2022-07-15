const { body, param } = require('express-validator');

const create = () => [
    body('username')
        .notEmpty(),
    body('password')
        .notEmpty()
        .isLength({ min: 6 }),
    body('email')
        .notEmpty()
        .isEmail()
        .toLowerCase()
];

const findById = () => [
    param('id')
        .optional()
        .notEmpty()
        .isInt()
];

const update = () => [
    param('id')
        .optional()
        .notEmpty()
        .isInt(),
    body('username')
        .notEmpty(),
    body('password')
        .notEmpty()
        .isLength({ min: 6 }),
    body('email')
        .notEmpty()
        .isEmail()
        .toLowerCase()
];

const destroy = () => [
    param('id')
        .optional()
        .notEmpty()
        .isInt()
];

module.exports = { create, findById, update, destroy };

