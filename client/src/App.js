import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./component/navbar";
import './App.css';
import Footer from "./component/footer";
import Signup from "./component/signup";
import PrivateComponent from "./component/privateComponent";
import Login from "./component/login";
import AddProduct from "./component/addProduct";
import ProductList from "./component/productList";
import UpdateProduct from "./component/updateProduct";
import Home from "./component/home"
import Profile from './component/profile'



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/update" element={<h1 style={{textAlign:'center',marginTop:'10%'}}>Please,click on product update button</h1>}/>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="*" element={<Signup />} />
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
