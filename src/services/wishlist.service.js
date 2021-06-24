import axios from "axios";

export const toggleWishlistItems = async({
    product, userID, action, dispatch, toastDispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`/wishlist/${userID}/${product._id}`, {
            type: action
        });
        if(success) {
            if(action === "REMOVE") {
                toastDispatch({type:"SUCCESS", payload: "Removed from Wishlist!"});
                dispatch({type: "REMOVE_FROM_WISHLIST", payload: product._id})
            } else {
                toastDispatch({type:"SUCCESS", payload: "Added to Wishlist!"});
                dispatch({type: "ADD_TO_WISHLIST", payload: product})
            }
        }
    } catch(err) {
        console.log(err)
    }
}