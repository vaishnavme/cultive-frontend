import axios from "axios";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const addCartItems = async({
    product, userID, dispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`/cart/${userID}`, {
            productId: product._id
        }) 
        if(success) {
            successNotification("Added to Cart!");
            dispatch({type:"ADD_TO_CART", payload: product})
        }
    } catch(err) {
        errorNotification("Error Occured")
    }
}

export const updateProductQuantity = async({
    productID, userID, action, quantity, dispatch
}) => {
    console.log("action ", action);
    const {data:{success}} = await axios.post(`/cart/${userID}/${productID}`, {
        quantity: action === "INC_QNT" ? quantity + 1 : quantity - 1
    })
    if(success) {
        dispatch({type: action, payload: productID})
    } else {
        dispatch({type: action, payload: productID})
    }
}

export const removeFromCart = async({
    productID, userID, dispatch, toastDispatch
}) => {
    const {data: {success}} = await axios.delete(`/cart/${userID}/${productID}`)
    if(success) {
        successRemoveNotification("Removed from Cart")
        dispatch({type: "REMOVE_FROM_CART", payload: productID})
    } else {
        errorNotification("Error Occured!")
    }
}