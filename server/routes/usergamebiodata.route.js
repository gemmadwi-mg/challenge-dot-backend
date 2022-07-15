const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const validate = require('../middlewares/validate');
const validation = require('../validations/usergamebiodata');

const { protect, restrictTo } = require('../middlewares/auth');

router.get('/', controller.usergamebiodata.getAll);

router.post('/',
    protect,
    restrictTo('admin'),
    validation.create(), validate,
    controller.usergamebiodata.post);

router.get('/:user_game_biodata_id', validation.findById(), validate, controller.usergamebiodata.getUserGameBiodataById);

router.put('/:user_game_biodata_id',
    protect,
    restrictTo('admin'),
    validation.update(),
    validate,
    controller.usergamebiodata.put);

router.delete('/:user_game_biodata_id',
    protect,
    restrictTo('admin'),
    validation.destroy(),
    validate,
    controller.usergamebiodata.delete);

module.exports = router;