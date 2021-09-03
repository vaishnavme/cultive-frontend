import axios from "axios";
import { BASE_URL } from "../api";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const toggleWishlistItems = async({
    product, action, dispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`${BASE_URL}/wishlist/${product._id}`, {
            type: action
        });
        if(success) {
            if(action === "REMOVE") {
                successRemoveNotification("Removed from Wishlist!")
                dispatch({type: "REMOVE_FROM_WISHLIST", payload: product._id})
            } else {
                successNotification("Added to Wishlist!");
                dispatch({type: "ADD_TO_WISHLIST", payload: product})
            }
        }
    } catch(err) {
        errorNotification("Error Occured!")
        console.log(err)
    }
}