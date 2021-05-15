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
    sortBy: null
}

export const DataProvider = ({children}) => {
    const BASE_URL = "https://cultivateneog.herokuapp.com"
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
    }, dispatch] = useReducer(dataReducer, initialState)
    
    // cart server operations
    const addToCartHandler = async ({product}) => {
        const {data: {success}} = await axios.post(`${BASE_URL}/cart/${user._id}`, {
            cartItems: {
                product: product
            }
        }) 
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Added to Cart!"});
            getCartItems();
        } else {
            toastDispatch({type: "ERROR", payload: "ERROR Occured"})
        }
    }

    const quantityHandler= async({type, product, quantity}) => {
        const {data:{success}} = await axios.post(`${BASE_URL}/cart/${user._id}/${product}`, {
            quantity: type === "INC_QNT" ? quantity + 1 : quantity - 1
        })
        if(success) {
            dispatch({type: type, payload: product})
        } else {
            dispatch({type: type, payload: product})
        }
    }

    const removeFromCart = async({product}) => {
        const {data: {success}} = await axios.delete(`${BASE_URL}/cart/${user._id}/${product}`)
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Removed from Cart!"});
            dispatch({type: "REMOVE_FROM_CART", payload: product})
        } else {
            toastDispatch({type:"SUCCESS", payload: "Error Occured!"});
        }
    }

    // wishlist operations
    const addToWishlist = async({product}) => {
        const {data: {success}} = await axios.post(`${BASE_URL}/wishlist/${user._id}`, {
            wishlistItems: {
                product: product
            }
        })
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Added to Wishlist!"});
            getWishlistItems();
        } else {
            toastDispatch({type: "DANGER", payload: "Error Occured!"})
        }
    }

    const removeFromWishlist = async({product}) => {
        const {data: {success}} = await axios.delete(`${BASE_URL}/wishlist/${user._id}/${product}`);
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Removed to Wishlist!"});
            getWishlistItems();
        } else {
            toastDispatch({type:"SUCCESS", payload: "Error Occured!"});
        }
    }

    // data fetching operations
    const getProductData = async() => {
        try {
            setLoading(true);
            const {data: {product}} = await axios.get(`${BASE_URL}/products`);
            dispatch({type: "SET_DATA", payload: product});
            setLoading(false);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    
    const getCartItems = async() => {
        if(user) {
            try {
                setLoading(true);
                const  { data:{cart} } = await axios.get(`${BASE_URL}/cart/${user._id}`);
                const userCart = cart.cartItems;
                const userCartItems = userCart.map((item) => {
                    return { ...item.product, quantity: item.quantity };
                });
                dispatch({type: "SET_CART", payload: userCartItems})
                setLoading(false);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }

    const getWishlistItems = async() => {
        if(user) {
            try {
                setLoading(true);
                const  { data:{wishlist} } = await axios.get(`${BASE_URL}/wishlist/${user._id}`); 
                const userWishlist = wishlist.wishlistItems;
                const userWishlistItems = userWishlist.map((item) => item.product)         
                dispatch({type: "SET_WISHLIST", payload: userWishlistItems})
                setLoading(false);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getProductData();
        getCartItems();
        getWishlistItems();
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
            dispatch,
            addToCartHandler,
            removeFromCart,
            quantityHandler,
            addToWishlist,
            removeFromWishlist,
            isLoading,
            setLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);