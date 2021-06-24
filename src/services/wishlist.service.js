import axios from "axios";
import { successNotification, successRemoveNotification, errorNotification } from "../components";

export const toggleWishlistItems = async({
    product, userID, action, dispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`/wishlist/${userID}/${product._id}`, {
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