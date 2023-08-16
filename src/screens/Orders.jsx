import React, { useEffect, useState } from 'react';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/checkout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      const result = await response.json();
      setOrderData(result.foodOrderData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  }

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {orderData && Array.isArray(orderData) ? (
          orderData.map((itemArray, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                {itemArray[0].Order_date && (
                  <div className="m-auto mt-5">
                    <hr />
                    <div className="text-center fs-6">
                      DATE: {new Date(itemArray[0].Order_date.$date.$numberLong).toLocaleString()}
                    </div>
                  </div>
                )}
                <div className="card-body">
                  {itemArray.slice(1).map((arrayData, itemIndex) => (
                    <div key={itemIndex}>
                      <h5 className="card-title">{arrayData.name}</h5>
                      <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <span className='m-1'>Qty: {arrayData.qty}</span>
                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                          ₹{arrayData.price}/-
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center fs-2'>
          maintainance
            I will fix it in future 
          </div>
        )}
      </div>
    </div>
  );
}
