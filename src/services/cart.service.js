import axios from "axios";
import { BASE_URL } from "../api";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const addCartItems = async({
    product, dispatch
}) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart`, {
            productId: product._id
        }) 
        if(response.data.newResponse) {
            successNotification("Added to Cart!");
            dispatch({type:"ADD_TO_CART", payload: product})
        } 
    } catch(err) {
        console.log(err)
        errorNotification("Error Occured")
    }
}

export const updateProductQuantity = async({
    productId, action, quantity, dispatch
}) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart/${productId}`, {
            quantity: action === "INC_QNT" ? quantity + 1 : quantity - 1
        })
        dispatch({type: action, payload: response.data.productId})
    } catch(err) {
        console.log(err)
    }
}

export const removeFromCart = async({
    productId, dispatch
}) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cart/${productId}`)

        successRemoveNotification("Removed from Cart")
        dispatch({type: "REMOVE_FROM_CART", payload: response.data.productId})
    } catch(err) {
        console.log(err);
        errorNotification("Error Occured!")
    }
}