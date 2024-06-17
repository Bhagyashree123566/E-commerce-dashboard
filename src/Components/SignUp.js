


import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  // State variables declared inside the function component
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  // user login then cant go to signin
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
        navigate("/")
    }
  })

  // Function to collect and log the data
  const collectionData = async () => {
    try {
      console.log(name, email, password);
      let result = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!result.ok) {
        throw new Error('Network response was not ok');
      }

      result = await result.json();
      console.log(result);
      localStorage.setItem("user",JSON.stringify(result));
      

      if (result) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
     
      <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter name'
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
    
      <input 
        className='inputBox' 
        type='password' 
        placeholder='Enter password'
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />

      <button 
        className='appButton' 
        type="button" 
        onClick={collectionData}
      >
        Sign Up
      </button>
    </div>
  );
}
