import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Signup() {
  let navigate = useNavigate();
  const [isSubmit,setIsSubmit] = useState(null);
  const [errMsg,setErrMsg] = useState("");
const [user,setUser] = useState({
  name:'',
  password:'',
  email:'',
  address:'',
});
let name,value;
const handelClick = (e) =>{
  name = e.target.name;
  value = e.target.value;

  setUser({
    ...user,[name]:value
  });
}

const addData = async(e) =>{
  e.preventDefault();

  const {name, password, email,address} = user;

  const requestBody = {
    name:name,
  password:password,
  email:email,
  address:address,
  }

  const res = await fetch("http://localhost:3001/api/createuser",{
    method:"POST",
    headers:{"Content-Type":"application/json",},
    body:JSON.stringify(requestBody),
  });
  const result = await res.json();
  console.log(result.err);
 
  if(!result.error) 
  {
    if(result.err !== "user already exist!!!"){
      navigate("/login")}
      setIsSubmit(true);
    setErrMsg(result.err)
   setUser({
     name: '',
     password:'',
     email: '',
     address: '',
   });
  }else{
    setErrMsg(result.error[0].msg);
    setIsSubmit(true);
  }

}


  return (
    <div className="container-fluid vh-100 py-5 d-flex justify-content-center align-items-center bg-dark"
    style={{
        backgroundImage:'url("https://source.unsplash.com/random/800x600?indianfood")',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
        }}>
      <div className="container bg-white p-5 rounded w-75 p-5">
        {isSubmit && (
          <div class="alert alert-danger" role="alert">
{errMsg}
</div>
        )}


        <h1>Sign Up Here</h1>
        <form action="" method='POST'>
        <div className="d-flex gap-3">
          <div  className="py-4 d-flex flex-column w-50 gap-2" >
            <label className="pt-2">Your name</label>
            <input
              type="text"
              placeholder="Enter Your email"
              name="name"
              required
               onChange={handelClick}
              value={user.name}
            />
            <label className="pt-5">email</label>
            <input
              type="text"
              placeholder="Enter Your email "
              name="email"
              required
                onChange={handelClick}
               value={user.email}
            />
          </div>

          <div  className="py-4 d-flex flex-column w-50 gap-2" >
            <label className="pt-2">password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              required
               onChange={handelClick}
              value={user.password}
            />
            <label className="pt-5">Address</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              name="address"
              required
               onChange={handelClick}
              value={user.address}
            />
          </div>
        </div>
        </form>
        <button className="btn btn-danger rounded-5 my-5" onClick={addData}>Submit</button>
        
        <div className="text-black-50">
          For any question contact Zoro 24/7 call center
          <span className="text-danger">+91 7505149981</span>
          <Link to="/login">Already a User?</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
