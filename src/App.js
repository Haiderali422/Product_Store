
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DropDown from "./Component/DropDown/DropDown";
import Navbar from "./Component/Navbar/Navbar";
import Cart from "./Component/CartSection/Cart";
import ProductDetail  from "./Component/ProductDetail/ProductDetail";
import Home from "./Pages/Home/Home";
import AboutUS from "./Pages/AboutUs/AboutUS";
import ContactUs from "./Pages/ContactUS/ContactUS";




function App() {
  return (
    <>
        <Router>
            <Navbar />
            <Cart />
            <Routes>
                <Route path="/" element={<DropDown />} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/dropdown" element={<DropDown />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<AboutUS/>}/>
                <Route path="/contact" element={<ContactUs/>}/> />
            </Routes>
        </Router>
    </>
  );
}

export default App;
