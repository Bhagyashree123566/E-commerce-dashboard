import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
        navigate("/")
    }
  })
  const handleLogin= async()=>{
   
    
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify({  email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        
  
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
           
      
        navigate('/');
      

        }
        else{
            alert("please enter correct details")
        }
      
  }
  return (
    <div className='login'>
    <h1>Login</h1>
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
        onClick={handleLogin}
      >
        Login
      </button>
     
    </div>
  )
}
