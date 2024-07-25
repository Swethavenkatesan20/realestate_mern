const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

const auth = {
    verifyToken: (request, response, next) => {
        try {
            const token = request.cookies.token;

            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET);

                request.userId = decodedToken.id;
                request.userRole = decodedToken.role;

                next();
            } catch {
                response.status(401).json({ message: 'Invalid token' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    isAdmin: async (request, response, next) => {
        try {
            const userId = request.userId;

            const user = await User.findById(userId);

            if (!user || user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
};

module.exports = auth;
