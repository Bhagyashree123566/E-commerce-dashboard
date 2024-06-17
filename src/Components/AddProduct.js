import React,{useState} from 'react'

export default function AddProduct() {

    const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const[error,setError]=useState(false);
  const addProduct=async ()=>{
    console.warn(!name);
    if(!name || !price || !category || !company){
        setError(true)
        return false;
    }


    console.warn(name,price,category,company)
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    console.warn(userId._id);
    let result = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: JSON.stringify({ name, price, company,category }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      console.log(result);
    

  }
  return (
    <div className='product'>
     <h1>Add Product</h1> 
     <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter  product name'
        value={name} 
        onChange={(e) => setName(e.target.value)}
       
      />
      {error && !name && <span className='invalid-input'> Enter valid name</span>}
       <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter product price'
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
       
      />
      {error && !price && <span className='invalid-input'> Enter valid price</span>}
       <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter product company'
        value={company} 
        onChange={(e) => setCompany(e.target.value)}
       
      />
      {error && !company && <span className='invalid-input'> Enter valid company name</span>}
       <input 
        className='inputBox' 
        type='text' 
        placeholder='Enter poduct category'
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
       
      />
      {error && !category && <span className='invalid-input'> Enter valid  category name</span>}
      <button onClick={addProduct} className='appButton'>Add product</button>
    </div>
  )
}
