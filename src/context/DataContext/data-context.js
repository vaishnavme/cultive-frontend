import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth, useLoader, useToast } from "..";
import { dataReducer } from "./data-reducer";

const DataContext = createContext();

const initialState = {
    productData: [],
    cartItems: [],
    wishListItems: [],
    showInventoryAll: [],
    categories: [],
    rating: null,
    sortBy: null
}

export const DataProvider = ({children}) => {
    
    const { user } = useAuth();
    const { toastDispatch } = useToast();
    const {isLoading, setLoading} = useLoader();
    
    const [{
        productData,
        cartItems,
        wishListItems,
        showInventoryAll,
        categories,
        sortBy,
        rating
    }, dispatch] = useReducer(dataReducer, initialState)

    // data fetching operations
    const getProductData = async() => {
        try {
            setLoading(true);
            const {data: {product}} = await axios.get(`/products`);
            dispatch({type: "SET_DATA", payload: product});
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const getUserData = async () => {
        try {
            //get user cart items
            const  { data:{cart} } = await axios.get(`/cart/${user._id}`);
            const userCart = cart.cartItems;
            const userCartItems = userCart.map((item) => {
                return { ...item.product, quantity: item.quantity };
            });
            dispatch({type: "SET_CART", payload: userCartItems})

            //get user wishlist
            const  { data:{wishlist} } = await axios.get(`/wishlist/${user._id}`); 
            const userWishlist = wishlist.wishlist;
            dispatch({type: "SET_WISHLIST", payload: userWishlist})

        } catch(err) {
            console.log()
        }
    }

    useEffect(() => {
        getProductData();
        getUserData();
         // eslint-disable-next-line
    },[]);

    return (
        <DataContext.Provider value={{
            productData,
            cartItems,
            wishListItems,
            showInventoryAll,
            categories,
            sortBy,
            rating,
            dispatch,
            isLoading,
            setLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);