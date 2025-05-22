import CartIcon from "./CartIcon";
import './Navbar.css'


const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Fake API Store</h1>
            <CartIcon />

        </nav>
    );
};

export default Navbar;