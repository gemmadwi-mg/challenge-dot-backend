const { body, param } = require('express-validator');

const create = () => [
    body('skor')
        .notEmpty()
        .isInt(),
    body('user_game_id')
        .notEmpty()
        .isInt()
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
    body('usia')
        .optional()
        .notEmpty()
        .isInt(),
    body('user_game_id')
        .optional()
        .notEmpty()
        .isInt()
];

const destroy = () => [
    param('id')
        .optional()
        .notEmpty()
        .isInt()
];

module.exports = { create, findById, update, destroy };

