import { useCart } from '../../Context/CartContext';
import './cart.css';
import '../../App.css'
import Button from '../Button/Button';
import emptyCart from '../../assests/emptyCart.jpg';

const TAX_RATE = 0.1; // 10% tax
const Cart = () => {
    const { state, dispatch } = useCart();
    const totalPrice = state.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const tax = totalPrice * TAX_RATE;
    const grandTotal = totalPrice + tax;

    return (
        <div className={`cart-drawer ${state.isVisible ? 'open' : ''}`}>
            <Button text='✖' className='closeBtn' onClick={() => dispatch({ type: 'TOGGLE_CART' })}/>
            <h2>Cart Section</h2>
            {state.items.length === 0 ? (
                <img src={emptyCart} alt='Empty Cart Card' />
            ) : (
                state.items.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} />
                        <div>
                            <h4>{item.title}</h4>
                            <p>${item.price} x {item.quantity}</p>
                            <div key={item.id}>
                                <Button text='-' onClick={() => dispatch({ type: 'DECREMENT_QUANTITY', payload: item.id })}
                                       />
                                <Button text='+' onClick={() => dispatch({ type: 'INCREMENT_QUANTITY', payload: item.id })}/>
                               <Button text='Remove' onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}/>
                            </div>
                        </div>

                    </div>

                ))
            )}

            <div className="cart-summary">
                <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                <p>Tax (10%): ${tax.toFixed(2)}</p>
                <h3>Total: ${grandTotal.toFixed(2)}</h3>
            </div>

        </div>

    );
};

export default Cart;
