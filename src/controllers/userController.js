const { register, login } = require('../services/userService');

exports.registerUser = async (req, res, next) => {
    try {
        const user = await register(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const response = await login(req.body);
        res.status(200).json({response});
    } catch (err) {
        next(err);
    }
};
