import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import axios from 'axios';



function Home() {

  const [foodCat,setFoodCat] = useState([]);
  const [foodItems,setFoodItems] = useState([]);
  const [searchWord,setSearchWord] = useState("")

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/foodData");
     
      setFoodItems(response.data[0]); 
      setFoodCat(response.data[1]);   
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  


  useEffect(()=>{
    loadData();
  },[])




  return (
    <div>
       
        <Carousel/>
        <input class="form-control mx-auto w-50 my-2" type="search" placeholder="Search.." aria-label="Search" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} />

        <div className='container '>
        {
          foodCat !== []?
          foodCat.map((data)=>{
            return (
              <div className='row mb-3 '>
            
              <div key={data._id} className='fs-3 m-1'>{data.CategoryName}</div>
              
             { foodItems.filter((item)=>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(searchWord.toLowerCase())))
             .map((item)=>{
                return(
                  <div key={item._id} className='col-sm-12 col-md-6 col-lg-3'>
                    <Card 
                     foodItem= {item}
                      cardOptions={item.options[0]}
                    />
                    
                  </div>
                )
             })
             }
            
              <hr className=' my-4 border border-2  border-dark'/>
              </div>
            )
          }):""
        }
      
        </div>

        <Footer/>
    </div>
  )
}

export default Home