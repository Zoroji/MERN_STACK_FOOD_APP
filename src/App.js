import Home from "./screens/Home";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from "./screens/Login";
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import Signup from "./screens/Signup";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/ContextReducer";
import Orders from "./screens/Orders";





function App() {
  return (
    <div >
    <CartProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser"  element={<Signup/>}/>
          <Route exact path="/orders"  element={<Orders/>}/>  
        </Routes>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
