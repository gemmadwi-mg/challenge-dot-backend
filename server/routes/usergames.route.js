const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const validate = require('../middlewares/validate')
const validation = require('../validations/usergame')

const { protect, restrictTo } = require('../middlewares/auth');

router.post('/signup', validation.create(), validate, controller.auth.signup);
router.post('/login', controller.auth.login);

router.get('/', controller.usergame.getAll);

router.post('/',
    protect,
    restrictTo('admin'),
    validation.create(), validate,
    controller.usergame.post);

router.get('/:user_game_id',
    validation.findById(), validate,
    controller.usergame.getUserGameById);

router.put('/:user_game_id',
    protect,
    restrictTo('admin'),
    validation.update(),
    validate, controller.usergame.put);
    
router.delete('/:user_game_id',
    protect,
    restrictTo('admin'),
    validation.destroy(),
    validate,
    controller.usergame.delete);

module.exports = router;