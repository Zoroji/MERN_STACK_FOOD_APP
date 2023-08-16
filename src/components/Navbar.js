import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {

  let data = useCart();
const [cartView,setCartView] = useState(false);

const navigate = useNavigate()
  const handlelogout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
      navigate("/")
  }
 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fw-bold fst-italic" to="/">FoodKings</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <Link className="nav-link fw-bold text-white active fs-5 border-bottom border-1" to="/">Home</Link>
            <div className=" ms-auto">
              <div className='d-flex gap-3 '>
                {localStorage.getItem('authToken') ?
                  (<>
                    <Link className="btn bg-white fw-semibold text-success" to="/orders" >My Orders</Link>
                    <button className="btn bg-white text-success fw-semibold "  onClick={()=>setCartView(true)}> 
                    My Cart <div class="badge bg-danger">{data.length}</div>
                    </button>
                    {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                    <Link className="btn btn-danger fw-semibold " to="/login" onClick={handlelogout}>Logout</Link>
                  </>) : (
                    <>
                      <Link className="btn bg-white text-success fw-semibold" to="/login">
                        Login
                      </Link>
                      <Link className="btn bg-white text-success fw-semibold" to="/createuser">
                        Signup
                      </Link>
                    </>
                  )}

              </div>


            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;