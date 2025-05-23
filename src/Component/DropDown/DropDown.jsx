import './DropDown.css'
import {useCart} from "../../Context/CartContext";
import {SET_FILTER} from "../../Context/action";


const DropDown = () => {
    const  {state , dispatch} = useCart()
    const {selectedCategory ,categories } = state;
    return (
        <>

            <select
                onChange={(e) => dispatch({ type: SET_FILTER, payload: e.target.value })}
                value= {selectedCategory}
            >
                <option value="all">All Products</option>
                {categories.map((cat , index) => (
                    <option key={index} value={cat}>{cat.toUpperCase()}</option>
                ))}
            </select>

        </>
    )
}
export default DropDown


