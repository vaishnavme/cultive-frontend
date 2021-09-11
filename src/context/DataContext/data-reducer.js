export const initialState = {
    productData: [],
    cartItems: [],
    wishListItems: [],
    showInventoryAll: [],
    categories: [],
    sizeSelect: [],
    rating: null,
    sortBy: null
};

export const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_DATA':
            return { ...state, productData: payload };

        case 'SET_CART': {
            return { ...state, cartItems: payload || [] };
        }

        case 'SET_WISHLIST': {
            return { ...state, wishListItems: payload || [] };
        }
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, { ...payload, quantity: 1 }]
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item._id !== payload
                )
            };

        case 'INC_QNT':
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    return item._id === payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item;
                })
            };

        case 'DEC_QNT':
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    return item._id === payload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item;
                })
            };

        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishListItems: state.wishListItems.concat(payload)
            };

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishListItems: state.wishListItems.filter(
                    (item) => item._id !== payload
                )
            };

        case 'SORT':
            return { ...state, sortBy: payload };

        case 'FILTER_BY_RATING':
            return { ...state, rating: payload };

        case 'TOGGLE_INVENTORY':
            return {
                ...state,
                showInventoryAll: !state.showInventoryAll
            };

        case 'TOGGLE_CATEGORY':
            return {
                ...state,
                categories: state.categories.some((value) => value === payload)
                    ? state.categories.filter((value) => value !== payload)
                    : state.categories.concat(payload)
            };

        case 'TOGGLE_SIZE':
            return {
                ...state,
                sizeSelect: state.sizeSelect.some((value) => value === payload)
                    ? state.sizeSelect.filter((value) => value !== payload)
                    : state.sizeSelect.concat(payload)
            };

        case 'CLEAR_ALL_FILTERS':
            return {
                ...state,
                inStock: false,
                showInventoryAll: true,
                categories: [],
                sizeSelect: [],
                rating: null,
                sortBy: null
            };

        case 'LOGOUT_USER_STATES':
            return {
                productData: state.productData,
                cartItems: [],
                wishListItems: [],
                showInventoryAll: [],
                categories: [],
                sizeSelect: [],
                rating: null,
                sortBy: null
            };

        default:
            return state;
    }
};
