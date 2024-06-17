import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() { 
  const auth = localStorage.getItem('user');
  console.log('User Auth:', auth); // Debugging line
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <div>
    <img src="https://th.bing.com/th?id=OIP.s6RuZ2Cv4DtF-HuEFALqKwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"  alt="logo"    className='logo'/>
    { auth ? 
      <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        
        <li><Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link> </li>
        </ul>
        :
        <ul className=' nav-ul nav-right'>
        <li>
        <Link to="/signup">Sign Up</Link></li>
        <li>
        <Link to="/login">Login</Link></li>


        </ul>

      
       
    
    }
    </div>
  )
}
