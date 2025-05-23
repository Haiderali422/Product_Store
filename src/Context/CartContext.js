import { createContext, useReducer, useContext, useEffect } from "react";
import  CartReducer,  {initialState} from "./Reducer";
import {FETCH_CATEGORIES , SET_PRODUCTS , ERROR , LOADING} from "./action";
import {fetchCategory , SelectedCategory , FetchProduct} from "../Nerwork/NetworkApi";

const CartContext = createContext();






export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);
    const {selectedCategory} = state;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: LOADING });
            try {
                const categoryData =  await fetchCategory();

                let productData ;
                selectedCategory === 'all' ? productData = await FetchProduct() :
                    productData = await SelectedCategory(selectedCategory);

                dispatch({ type: FETCH_CATEGORIES, payload: categoryData.categories });
                dispatch({ type: SET_PRODUCTS, payload: productData.products });

            } catch (err) {
                dispatch({ type: ERROR });
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



