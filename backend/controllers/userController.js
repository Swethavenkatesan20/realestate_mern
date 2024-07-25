const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const userController = {
    register: async (request, response) => {
        try {
            const { email, password, name, location, role } = request.body;
            const isAdmin = role && role.toLowerCase() === 'admin';
            const user = await User.findOne({ email });

            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                passwordHash,
                name,
                location,
                role: isAdmin ? 'admin' : 'user'
            });

            const savedUser = await newUser.save();

            response.status(201).json({
                message: "User created successfully",
                user: savedUser
            });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    login: async (request, response) => {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email });

            if (!user) {
                return response.status(400).json({ message: 'User does not exist' });
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

            if (!isPasswordCorrect) {
                return response.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({
                email: user.email,
                id: user._id,
                name: user.name,
            }, config.JWT_SECRET);

            response.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                secure: true,
            });

            response.json({ message: 'Login successful', token });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getUser: async (request, response) => {
        try {
            const userId = request.userId;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            response.json({ message: 'User found', user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updateUser: async (request, response) => {
        try {
            const userId = request.userId;
            const { name, location } = request.body;
            const user = await User.findById(userId);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            if (name) user.name = name;
            if (location) user.location = location;

            const updatedUser = await user.save();

            response.json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // admins can access all users
    getAllUsers: async (request, response) => {
        try {
            if (request.userRole !== 'admin') {
                return response.status(403).json({ message: 'Access denied' });
            }
            const users = await User.find().select('-passwordHash');
            response.status(200).json(users);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    
    //admin can only delete user
    deleteUser: async (request, response) => {
        try {
            if (request.userRole !== 'admin') {
                return response.status(403).json({ message: 'Access denied' });
            }
            const userId = request.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }

            await user.remove();
            response.json({ message: 'User deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    logout: async (request, response) => {
        try {
            response.clearCookie('token');
            response.json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;
