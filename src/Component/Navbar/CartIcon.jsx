
import { useCart } from '../../Context/CartContext';
import { ShoppingCart } from 'lucide-react';
import './CartIcon.css';
const CartIcon = () => {
    const { state, dispatch } = useCart();
    return (
        <div className="cart-icon-wrapper" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
            <ShoppingCart size={35} />
            { state.items.length> 0 ? <span className="cart-badge">{state.items.length}</span> : <span className="cart-badge">{0}</span>}
        </div>
    );
};

export default CartIcon;
