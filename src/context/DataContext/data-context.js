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
    
    // cart server operations
    const updateCartProducts = async ({product}) => {
        try {
            const {data: {success}} = await axios.post(`/cart/${user._id}`, {
                cartItems: {
                    product: product._id
                }
            }) 
            if(success) {
                toastDispatch({type:"SUCCESS", payload: "Added to Cart!"});
                dispatch({type:"ADD_TO_CART", payload: product})
            }
        } catch(err) {
            toastDispatch({type: "ERROR", payload: "ERROR Occured"})
        }
    }

    const quantityHandler= async({type, product, quantity}) => {
        const {data:{success}} = await axios.post(`/cart/${user._id}/${product}`, {
            quantity: type === "INC_QNT" ? quantity + 1 : quantity - 1
        })
        if(success) {
            dispatch({type: type, payload: product})
        } else {
            dispatch({type: type, payload: product})
        }
    }

    const removeFromCart = async({product}) => {
        const {data: {success}} = await axios.delete(`/cart/${user._id}/${product}`)
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Removed from Cart!"});
            dispatch({type: "REMOVE_FROM_CART", payload: product})
        } else {
            toastDispatch({type:"SUCCESS", payload: "Error Occured!"});
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
            updateCartProducts,
            removeFromCart,
            quantityHandler,
            isLoading,
            setLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);