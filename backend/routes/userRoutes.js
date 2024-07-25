const express = require('express');
const auth = require('../middleware/auth');

const userController = require('../controllers/userController');

const router = express.Router();

// public routes no authentication required
router.post('/register', userController.register);
router.post('/login', userController.login);

// protected routes used verifytoken 
router.get('/me', auth.verifyToken, userController.getUser);
router.put('/me', auth.verifyToken, userController.updateUser);
router.delete('/me', auth.verifyToken, userController.deleteUser);
router.post('/logout', auth.verifyToken, userController.logout);

// admin can only get all user details and delete user
router.get('/all', auth.verifyToken, auth.isAdmin, userController.getAllUsers);
router.delete('/user/:id', auth.verifyToken, auth.isAdmin, userController.deleteUser);

module.exports = router;
