import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts=async()=>{
        let result=await fetch('http://localhost:5000/products');
         
        
        result=await result.json();
        setProducts(result);
    }
    console.warn("products",products);
    const deleteProduct= async(id)=>{
        console.warn(id)
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        });
        result =await result.json()
        if(result){
            alert("record is deleted")
            getProducts();
        }
    }
    //handles search input changes
    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
          try {
            //it fetches the product based on search key if no key is entered it calls getproduct to show full productlist again
            let result = await fetch(`http://localhost:5000/search/${key}`);
            if (result.ok) {
              result = await result.json();
              setProducts(result);
            } else {
              console.error('Search request failed:', result.statusText);
            }
          } catch (error) {
            console.error('Error searching products:', error);
          }
        } else {
          getProducts();
        }
      };
  return (
    <div className='product-list'>
      <h1>Product list</h1>
      <input  type="text" className='search-product-box' placeholder='search product' onChange={searchHandle}/>
      <ul>
        <li>S.NO</li>
        <li>Name
        </li>
        <li>Price</li>
        <li>category</li>
        <li>operations</li>
      </ul>
      {
        products.map((item,index)=>
            <ul key={item._id}>
        <li>{index}</li>
        <li>{item.name}
        </li>
        <li> $ {item.price}</li>
        <li>{item.category}</li>
        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
        <Link to={`/update/${item._id}`}>Update</Link>
        </li>
      </ul>
        )
      }

    </div>
  )
}
