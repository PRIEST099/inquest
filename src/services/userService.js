const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (data) => {
    const { email, password } = data;

    const exists = await User.findOne({ email });

    if (exists) {
        throw new Error('Registration Failed');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hashedPassword
    });
    await user.save();
    return { id: user._id, email: user.email };
};

exports.login = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { 
            id: user.__id, 
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );
    return {
        token, 
        user: {
            id: user._id,
            email: user.email
        } 
    };
};