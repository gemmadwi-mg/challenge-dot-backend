const { UserGameBiodata } = require('../models');
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const allUserGameBiodata = await UserGameBiodata.findAll();

        if (allUserGameBiodata.length > 0) {
            res.status(200).json({
                message: 'success',
                data: allUserGameBiodata
            })
        } else {
            res.status(200).json({
                message: 'tidak ada Data',
                data: allUserGameBiodata
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.getUserGameBiodataById = async function (req, res) {
    try {
        const { user_game_biodata_id } = req.params;

        const result = await UserGameBiodata.findByPk(user_game_biodata_id);

        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameBioadata with id ${user_game_biodata_id} not found`
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
        const { usia, user_game_id } = req.body;

        let createdGameBiodata = await UserGameBiodata.create({
            usia: usia,
            user_game_id: user_game_id
        })
        res.status(201).json({
            message: 'Sukses menambah Data User Game Biodata',
            data: createdGameBiodata
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.put = async function (req, res) {
    try {
        const { user_game_biodata_id } = req.params;

        const { usia, user_game_id } = req.body;

        const findUserGameBioadataId = await UserGameBiodata.findOne({
            where: {
                user_game_biodata_id
            }
        })

        if (!findUserGameBioadataId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameBioadata with id ${user_game_biodata_id} not found`
            })
        }

        if (usia) findUserGameBioadataId.usia = usia;
        if (user_game_id) findUserGameBioadataId.user_game_id = user_game_id;

        const updateUserGameBiodata = await findUserGameBioadataId.save();

        if (!updateUserGameBiodata) {
            return res.status(404).json({
                status: 'error',
                message: `data UserGameBioadata with id ${user_game_biodata_id} not found`
            })
        }


        res.status(201).json({
            status: 'success',
            data: updateUserGameBiodata
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.delete = async function (req, res) {
    try {
        const { user_game_biodata_id } = req.params;

        const findUserGameBioadataId = await UserGameBiodata.findByPk(user_game_biodata_id);

        if (!findUserGameBioadataId) {
            return res.status(404).json({
                status: 'error',
                message: `UserGameBioadata with id ${user_game_biodata_id} not found`
            })
        }

        const deleteGameBioadata = findUserGameBioadataId.destroy();

        if (!deleteGameBioadata) {
            return res.status(503).json({
                status: 'error',
                message: `UserGameBioadata with id ${user_game_biodata_id} failed deleted`
            })
        }

        res.status(201).json({
            status: 'success',
            message: `UserGameBioadata with id ${user_game_biodata_id} deleted`
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = controller;