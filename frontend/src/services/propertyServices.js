import { protectedInstance } from '../axiosConfig';

const getAllProperties = async () => 
    {
    return protectedInstance.get('/properties');
    };

const createProperty = async (property) => 
    {
    return protectedInstance.post('/properties', property);
    };

const updateProperty = async (id, property) => 
    {
     return protectedInstance.put(`/properties/${id}`, property);
    };

const deleteProperty = async (id) => 
    {
    return protectedInstance.delete(`/properties/${id}`);
    };

export default { getAllProperties, createProperty, updateProperty, deleteProperty };
