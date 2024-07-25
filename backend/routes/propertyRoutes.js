const express = require('express');
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth.verifyToken, propertyController.createProperty);
router.get('/', auth.verifyToken, propertyController.getProperties); 
router.get('/search', auth.verifyToken, propertyController.searchProperties);
router.get('/:id', auth.verifyToken, propertyController.getPropertyById);
router.put('/:id', auth.verifyToken, propertyController.updateProperty);
router.delete('/:id', auth.verifyToken, propertyController.deleteProperty);
router.get('/all', auth.verifyToken, propertyController.getAllProperties);

module.exports = router;
