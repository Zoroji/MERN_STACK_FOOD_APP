import React, { useEffect } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

function Cart() {
 const navigate = useNavigate();
    let data = useCart();
 
    let dispatch = useDispatchCart();
    if(data.length === 0)
    {
        return(
            <>
                <div className="container-fluid text-center fs-3">The Cart is empty</div>
            </>
        )
    }
    let totalPrice = data.reduce((total,food)=> total+food.price,0)


const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3001/api/orders",{
      method:"POST",
      headers:{"Content-Type":"application/json",},
      body:JSON.stringify({
        email:userEmail,
        foodOrderData:data,
        order_date:new Date().toDateString
      })

    })
    let responseData = await response.json();
    if(responseData.success)
    {   
        navigate("/orders")
        dispatch({type:"DROP"})
    }
}



  return (
    <div>
        <div className="container-fluid bg-dark">
            <table className='table table-dark table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Size</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((food,index)=>(
                    <tr>
                        <th scope='row'>{index+1}</th>
                        <td>{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td>
                        <td><button className='btn btn-danger p-0' onClick={()=>{dispatch({type:"REMOVE",index:index})}}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
     
            <div className="text-white fs-4">Total:{" "}₹{totalPrice}</div>
            <button className='btn btn-success mt-3 ' onClick={handleCheckOut}>checkout</button>
           
        </div>

    </div>
  )
}

export default Cart;