import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import  CartReducer,  {initialState} from "./Reducer";
import {FETCH_CATEGORIES , SET_PRODUCTS} from "./action";

const CartContext = createContext();

const Product_URL = process.env.REACT_APP_API_PRODUCT_URL;
const Category_URL = process.env.REACT_APP_API_CATEGORY_URL;




export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const {selectedCategory} = state;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "LOADING" });
            try {
                const categoryData = await axios.get(Category_URL);
                let productData ;
                 selectedCategory === 'all' ? productData = await axios.get(Product_URL) :
                     productData = await axios.get(`${Category_URL}?type=${selectedCategory}`);


                dispatch({ type: FETCH_CATEGORIES, payload: categoryData.data.categories });
                dispatch({ type: SET_PRODUCTS, payload: productData.data.products });

            } catch (err) {
                dispatch({ type: "ERROR" });
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, [selectedCategory ]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);
