const { UserGame, UserGameHistory, UserGameBiodata } = require('../models');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const options = {
            attributes: ['user_game_id', 'username', 'email', 'role'],
            include: [
                {
                    model: UserGameHistory,
                    attributes: ['user_game_history_id', 'skor', 'user_game_id']
                },
                {
                    model: UserGameBiodata,
                    attributes: ['user_game_biodata_id', 'usia', 'user_game_id']
                }
            ]
        };

        const allUserGames = await UserGame.findAll(options);

        if (allUserGames.length > 0) {
            res.status(200).json({
                message: 'succes',
                data: allUserGames
            })
        } else {
            res.status(200).json({
                message: 'tidak ada Data',
                data: allUserGames
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getUserGameById = async function (req, res) {
    try {
        const { user_game_id } = req.params;

        const result = await UserGame.findByPk(user_game_id);

        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: `UserGame with id ${user_game_id} not found`
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
        const { username, password, email, role} = req.body;

        let createdGame = await UserGame.create({
            username: username,
            password: password,
            email: email,
            role: role
        })
        res.status(201).json({
            message: 'Sukses menambah Data User Game',
            data: createdGame
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.put = async function (req, res) {
    try {
        const { user_game_id } = req.params;

        const { username, password, email } = req.body;

        const findUserGameId = await UserGame.findOne({
            where: {
                user_game_id
            }
        })

        if (!findUserGameId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGame with id ${user_game_id} not found`
            })
        }

        if (username) findUserGameId.username = username;
        if (password) findUserGameId.password = password;
        if (email) findUserGameId.email = email;

        const updateUserGame = await findUserGameId.save();

        if (!updateUserGame) {
            return res.status(404).json({
                status: 'error',
                message: `data UserGame with id ${user_game_id} not found`
            })
        }

        res.status(201).json({
            status: 'success',
            data: updateUserGame
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.delete = async function (req, res) {
    try {
        const { user_game_id } = req.params;

        const findUserGameId = await UserGame.findByPk(user_game_id);

        if (!findUserGameId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGame with id ${user_game_id} not found`
            })
        }

        const deleteUserGame = findUserGameId.destroy();

        if (!deleteUserGame) {
            return res.status(503).json({
                status: 'error',
                message: `UserGame with id ${user_game_id} failed deleted`
            })
        }

        res.status(201).json({
            status: 'success',
            message: `UserGame with id ${user_game_id} deleted`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;