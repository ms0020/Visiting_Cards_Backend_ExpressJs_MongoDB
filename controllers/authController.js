const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { generateToken } = require('../config/jwt');
require("dotenv").config();

// User Registration
const userRegistration = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    if (!email || !mobile || !password) {
        return res.status(400).json({ message: "Email, mobile, and password are required." });
    }

    try {
        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or mobile already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registerUser = new User({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword
        });

        const addNewUser = await registerUser.save();

        return res.status(201).json({ message: "User registered successfully", user: addNewUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// User Sign-In
const userSignIn = async (req, res) => {
    const { email, mobile, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: email }, { mobile: mobile }]
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all users.', error });
    }
};


// Fetch user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const getUser = await User.findById(id);
        if (!getUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(getUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user.', error });
    }
};


// Update user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, mobile, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updatedUser = {};
    if (email) updatedUser.email = email;
    if (mobile) updatedUser.mobile = mobile;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(password, salt);
    }

    try {
        const updatedUserInfo = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!updatedUserInfo) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUserInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.', error });
    }
};


// Delete user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.', error });
    }
};


module.exports = {
    userRegistration,
    userSignIn,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};