const { UserGameHistory } = require('../models');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const allUserGameHistory = await UserGameHistory.findAll();

        if (allUserGameHistory.length > 0) {
            res.status(200).json({
                message: 'succes',
                data: allUserGameHistory
            })
        } else {
            res.status(200).json({
                message: 'tidak ada Data',
                data: allUserGameHistory
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getUserGameHistoryById = async function (req, res) {
    try {
        const { user_game_history_id } = req.params;

        const result = await UserGameHistory.findByPk(user_game_history_id);

        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameHistory with id ${user_game_history_id} not found`
            })
        }

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

};

controller.post = async function (req, res) {
    try {
        const { skor, user_game_id } = req.body;

        let createdGameHistory = await UserGameHistory.create({
            skor: skor,
            user_game_id: user_game_id
        })

        res.status(201).json({
            message: 'Sukses menambah Data User Game History',
            data: createdGameHistory
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.put = async function (req, res) {
    try {
        const { user_game_history_id } = req.params;

        const { skor, user_game_id } = req.body;

        const findUserGameHistoryId = await UserGameHistory.findOne({
            where: {
                user_game_history_id
            }
        })

        if (!findUserGameHistoryId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameHistory with id ${user_game_history_id} not found`
            })
        }

        if (skor) findUserGameHistoryId.skor = skor;
        if (user_game_id) findUserGameHistoryId.user_game_id = user_game_id;

        const updateUserGameHistory = await findUserGameHistoryId.save();

        if (!updateUserGameHistory) {
            return res.status(404).json({
                status: 'error',
                message: `data UserGameBioadata with id ${user_game_history_id} not found`
            })
        }


        res.status(201).json({
            status: 'success',
            data: updateUserGameHistory
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.delete = async function (req, res) {
    try {
        const { user_game_history_id } = req.params;

        const findUserGameHistoryId = await UserGameHistory.findByPk(user_game_history_id);

        if (!findUserGameHistoryId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameBioadata with id ${user_game_history_id} not found`
            })
        }

        const deleteGameHistory = findUserGameHistoryId.destroy();

        if(!deleteGameHistory) { 
            return res.status(503).json({ 
                status: 'error',
                message: `UserGameBioadata with id ${user_game_history_id} failed deleted`
            })
        }

        res.status(201).json({
            status: 'success',
            message: `UserGameBioadata with id ${user_game_history_id} deleted`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;