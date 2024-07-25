import React, { useState } from 'react';
import propertyServices from '../services/propertyServices';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProperty = { name, location, price, description };
      await propertyServices.addProperty(newProperty);
      navigate('/property-listing');
    } catch (error) {
      console.error('Failed to add property', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" value={name} onChange={(e) => 
            setName(e.target.value)} 
            placeholder="Property Name" required />
        </div>
        
        <div className="mb-3">
          <input type="text" value={location} onChange={(e) => 
            setLocation(e.target.value)} 
            placeholder="Location" required />
        </div>
        <div className="mb-3">
          <input type="number" value={price} onChange={(e) => 
            setPrice(e.target.value)} 
            placeholder="Price" required />
        </div>
        <div className="mb-3">
          <textarea value={description} onChange={(e) => 
            setDescription(e.target.value)} 
            placeholder="Description" required></textarea>
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
