import axios from "axios";
import { BASE_URL } from "../api";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const addCartItems = async({
    product, userID, dispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`${BASE_URL}/cart/${userID}`, {
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
    productId, userID, action, quantity, dispatch
}) => {
    console.log("action ", action);
    const {data:{success}} = await axios.post(`${BASE_URL}/cart/${userID}/${productId}`, {
        quantity: action === "INC_QNT" ? quantity + 1 : quantity - 1
    })
    if(success) {
        dispatch({type: action, payload: productId})
    } else {
        dispatch({type: action, payload: productId})
    }
}

export const removeFromCart = async({
    productId, userID, dispatch
}) => {
    const {data: {success}} = await axios.delete(`${BASE_URL}/cart/${userID}/${productId}`)
    if(success) {
        successRemoveNotification("Removed from Cart")
        dispatch({type: "REMOVE_FROM_CART", payload: productId})
    } else {
        errorNotification("Error Occured!")
    }
}