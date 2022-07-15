const express = require('express');
const router = express.Router();
const controller = require('../controllers/index')
const validate = require('../middlewares/validate')
const validation = require('../validations/usergamehistory')

const { protect, restrictTo } = require('../middlewares/auth');


router.get('/', controller.usergamehistory.getAll);

router.post('/',
    protect,
    restrictTo('admin'),
    validation.create(),
    validate,
    controller.usergamehistory.post);

router.get('/:user_game_history_id', validation.findById(), validate, controller.usergamehistory.getUserGameHistoryById);

router.put('/:user_game_history_id',
    protect,
    restrictTo('admin'),
    validation.update(),
    validate,
    controller.usergamehistory.put);
    
router.delete('/:user_game_history_id',
    protect,
    restrictTo('admin'),
    validation.destroy(),
    validate,
    controller.usergamehistory.delete);

module.exports = router;