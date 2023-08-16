import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const [isSubmit,setIsSubmit] = useState(null);
  const [ErrMsg,seterrMsg] = useState("");


const [user,setUser] = useState({
  password:'',
  email:'',
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

  const { password,email} = user;

  const requestBody = {
  password:password,
  email:email,
  }

  const res = await fetch("http://localhost:3001/api/login",{
    method:"POST",
    headers:{"Content-Type":"application/json",},
    body:JSON.stringify(requestBody),
  });
  const result = await res.json();


 if(result.msg === "login success")
 {
  localStorage.setItem("userEmail",email);
  localStorage.setItem("authToken",result.authToken);
  console.log(localStorage.getItem("authToken"),localStorage.getItem("userEmail"));
  navigate('/');
 }
 else{
  setIsSubmit(true);
  seterrMsg(result.msg);
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
{ErrMsg}
</div>
        )}
        <h1>Login Here</h1>
        <form action="" method='POST'>
        <div className="d-flex gap-3">
          <div  className="py-4 d-flex flex-column w-50 gap-2" >
            
            <label className="pt-5">email</label>
            <input
              type="text"
              placeholder="Enter Your email "
              name="email"
              required
                onChange={handelClick}
               value={user.email}
            />
            <label className="pt-2">password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              required
               onChange={handelClick}
              value={user.password}
            />
          </div>

          <div  className=" d-flex flex-column w-50 " >
              <img src="https://source.unsplash.com/random/800x600?seafood" alt="" style={{maxHeight:'16rem'}}/>
           
          </div>
        </div>
        </form>
        <button className="btn btn-warning rounded-5 my-5" onClick={addData}>Login</button>
        
        <div className="text-black-50">
          For any question contact Zoro 24/7 call center
          <span className="text-danger">+91 7505149981</span>
          <Link to="/createuser">Create a new Account?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
