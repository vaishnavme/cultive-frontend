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
        toastDispatch({type:"SUCCESS", payload: "Removed from Cart!"});
        dispatch({type: "REMOVE_FROM_CART", payload: productID})
    } else {
        toastDispatch({type:"SUCCESS", payload: "Error Occured!"});
    }
}