export const initialState = {
    isVisible: false,
    isLoading: false,
    items: [],
    isError: false,
    products: [],
    categories: [],
    selectedCategory: 'all',

};

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':

            return { ...state, products: action.payload, filteredProducts: action.payload };
        case "FETCH_CATEGORIES":
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
                // isError: false,
            };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };

        case 'SET_FILTER':
            return {
                ...state,
                selectedCategory: action.payload,
                // isLoading: true,
            };
        case "LOADING":
            return {
                ...state,
                isLoading: true,
            };
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'TOGGLE_CART':
            return { ...state, isVisible: !state.isVisible };
        case 'ADD_TO_CART':
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

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREMENT_QUANTITY':
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
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        // case 'CHANGE_QUANTITY':
        //     return {
        //         ...state,
        //         items: state.items.map(item =>
        //             item.id === action.payload.id
        //                 ? { ...item, quantity: action.payload.quantity }
        //                 : item
        //         ),
        //     };
        default:
            return state;
    }
};

export default  CartReducer;