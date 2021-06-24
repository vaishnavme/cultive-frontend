import axios from "axios";

export const addCartItems = async({
    product, userID, dispatch, toastDispatch
}) => {
    try {
        const {data: {success}} = await axios.post(`/cart/${userID}`, {
            productId: product._id
        }) 
        if(success) {
            toastDispatch({type:"SUCCESS", payload: "Added to Cart!"});
            dispatch({type:"ADD_TO_CART", payload: product})
        }
    } catch(err) {
        toastDispatch({type: "ERROR", payload: "ERROR Occured"})
    }
}