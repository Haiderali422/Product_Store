import {SET_PRODUCTS ,
 FETCH_CATEGORIES,
 SET_CATEGORIES ,
 SET_FILTER ,
 LOADING ,
 ERROR,
 TOGGLE_CART ,
 ADD_TO_CART,
 REMOVE_FROM_CART ,
INCREMENT_QUANTITY,
 DECREMENT_QUANTITY,
    SET_SINGLE_PRODUCT,
    SET_LOADING,
} from './action'




export const initialState = {
    isVisible: false,
    isLoading: false,
    items: [],
    isError: false,
    products: [],
    product:null,
    categories: [],
    selectedCategory: 'all',
    filteredProducts:[],
};
const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS :
            return { ...state,
                products: action.payload,
                filteredProducts: action.payload
            };

        case SET_SINGLE_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case FETCH_CATEGORIES:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
            };
        case SET_CATEGORIES:
            return { ...state, categories: action.payload };

        case SET_FILTER:
            return {
                ...state,
                selectedCategory: action.payload,
            };
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case TOGGLE_CART:
            return { ...state, isVisible: !state.isVisible };
        case ADD_TO_CART:
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                console.log('addToCart', existing);

                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }

        case INCREMENT_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case DECREMENT_QUANTITY:
            return {
                ...state,
                items: state.items
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter(item => item.quantity > 0),
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default  CartReducer;