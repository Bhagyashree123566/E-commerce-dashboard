import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      let response = await fetch(`http://localhost:5000/product/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let result = await response.json();
      setName(result.name);
      setPrice(result.price);
      setCompany(result.company);
      setCategory(result.category);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      setError('Failed to fetch product details');
    }
  };

  const updateProduct = async () => {
    try {
      let response = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, company, category }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let result = await response.json();
      console.log('Product updated successfully:', result);
      alert('Product updated successfully');
      navigate('/'); // Redirect to the product list or another appropriate page
    } catch (error) {
      console.error('Failed to update product:', error);
      setError('Failed to update product');
    }
  };


  return (
    <div className='product'>
      <h1>Update Product</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        className='inputBox'
        type='text'
        placeholder='Enter product name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className='inputBox'
        type='text'
        placeholder='Enter product price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className='inputBox'
        type='text'
        placeholder='Enter product company'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className='inputBox'
        type='text'
        placeholder='Enter product category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={updateProduct} className='appButton'>Update product</button>
    </div>
  );
}
