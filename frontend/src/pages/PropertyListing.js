import React, { useEffect, useState } from 'react';
import propertyServices from '../services/propertyServices';

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    propertyServices.getAllProperties()
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='container'>
      <h1>Property Listings</h1>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <p>{property.location}</p>
            <p>{property.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyListing;
