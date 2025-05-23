import CartIcon from "./CartIcon";
import {Link} from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Fake API Store</h1>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/Home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <CartIcon/>

        </nav>
    );
};

export default Navbar;