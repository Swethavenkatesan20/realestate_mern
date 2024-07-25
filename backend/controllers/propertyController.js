const Property = require('../models/property');

const propertyController = {
    createProperty: async (request, response) => {
        try {
            const { type, location, price, description, status } = request.body;

            const newProperty = new Property({
                type,
                location,
                price,
                description,
                status
            });

            const savedProperty = await newProperty.save();

            response.status(201).json({
                message: "Property created successfully",
                property: savedProperty
            });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    getProperties: async (request, response) => {
        try {
            const properties = await Property.find({ userId: request.userId });
            response.status(200).json(properties);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    getPropertyById: async (request, response) => {
        try {
            const propertyId = request.params.id;
            const property = await Property.findById(propertyId);

            if (!property) {
                return response.status(404).json({ message: 'Property not found' });
            }

            response.status(200).json(property);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    // Admins can access all properties
    getAllProperties: async (request, response) => {
        try {
            const properties = await Property.find();
            response.status(200).json(properties);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    updateProperty: async (request, response) => {
        try {
            const propertyId = request.params.id;
            const { type, location, price, description, status } = request.body;
            const property = await Property.findById(propertyId);

            if (!property) {
                return response.status(404).json({ message: 'Property not found' });
            }

            if (type) property.type = type;
            if (location) property.location = location;
            if (price) property.price = price;
            if (description) property.description = description;
            if (status) property.status = status;

            const updatedProperty = await property.save();

            response.status(200).json({
                message: 'Property updated successfully',
                property: updatedProperty
            });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    deleteProperty: async (request, response) => {
        try {
            const propertyId = request.params.id;
            const property = await Property.findById(propertyId);

            if (!property) {
                return response.status(404).json({ message: 'Property not found' });
            }

            await property.remove();

            response.status(200).json({ message: 'Property deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    searchProperties: async (request, response) => {
        try {
            const { type, location, minPrice, maxPrice, status } = request.query;

            const searchQuery = {};
            if (type) searchQuery.type = type;
            if (location) searchQuery.location = location;
            if (minPrice) searchQuery.price = { $gte: minPrice };
            if (maxPrice) searchQuery.price = { ...searchQuery.price, $lte: maxPrice };
            if (status) searchQuery.status = status;

            const properties = await Property.find(searchQuery);

            response.status(200).json(properties);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = propertyController;
