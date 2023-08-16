import React, { useRef, useState,useEffect } from 'react'
import { useDispatchCart } from './ContextReducer';

function Card({cardOptions,foodItem}) {

  let dispatch = useDispatchCart();
  
  const priceRef = useRef();

  const options = cardOptions;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("")

  useEffect(() => {
      setSize(priceRef.current.value)

  }, [])
  



  const handleAddToCart =async()=>{
    await dispatch({type:"ADD",id:foodItem._id,name:foodItem.name,price:finalPrice,qty:qty,size:size})
    
  }

 let finalPrice = qty*parseInt(options[size]);
  return (
    <div>
        <div className="card mt-3 mx-4" style={{'width':'18rem','maxHeight':'500px'}}>
  <img src={foodItem.img} className="card-img-top"style={{'height':'12rem',objectFit:'fill'}}  alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{foodItem.name}</h5>
    <p className="card-text">{foodItem.description}</p>
      <div className="container w-100">

      <select className='m-1 h-100 text-white bg-success rounded-2' onChange={(e)=>setQty(e.target.value)}>
          {Array.from(Array(6), (e,i)=>{
            return(
              <option key={i+1} value={i+1}>{i+1}</option>
            )
          })}

      </select>
      <select className='m-1 h-100 text-white  bg-success rounded-2' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
      {
        priceOptions.map((priceOption)=>{
       return (
        <option  value={priceOption}>{priceOption}</option>)
      })
        }
      </select>
          <div className='d-inline fs-5'>
          ₹{finalPrice}/-
          </div>
   
          <button className='btn btn-warning mt-3 mx-auto rounded-5' onClick={handleAddToCart}>Add To Cart</button>
      </div>
  </div>
</div>
</div>
  )
}

export default Card;