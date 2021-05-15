import { useNavigate } from "react-router-dom";
import { useData } from "../../context";
import * as AIicons from "react-icons/ai";
import styles from "./Cart.module.css";

export default function Cart() {
    const navigate = useNavigate();
    const  { cartItems, dispatch, removeFromCart, quantityHandler, addToWishlist } = useData();
    
    const totalPrice = (items) => {
        return items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    }

    const wishBtnHandler = (productID) => {
        addToWishlist({product: productID});
        dispatch({type: "REMOVE_FROM_CART", payload: productID})
    }

    return (
        <>
        {
            !!!cartItems.length ? (
                <div className={`${styles.notify}`}>
                    <div className={`h3`}>Empty Cart!!</div>
                    <p>You have no item in Cart.</p>
                    <button className={`btn btn-secondary`} onClick={() => navigate("/products")}>Let's Shop</button>
                </div>
            ) : (
                <div className={`${styles.main}`}>
            <div className={`${styles.cart}`}>
            <ul className={`simple-list ${styles.item}`}>
                {
                    cartItems &&
                    cartItems.map((item) => (               
                            <li key={item._id} className={`d-flex pb-2 ${styles.listItem}`}>
                                <img className={styles.itemImage} src={item.image} alt={item.name}/>
                                <div className={`ml-3`}>
                                    <div className={`h5`}>{item.name}</div>
                                    <div className={`h6`}>Rs. {item.price}</div>

                                    <div className={`d-flex flex-align-center mt-2`}>
                                        <button 
                                            className={`btn iconBtn`}
                                            disabled={item.quantity < 2 ? true : false} 
                                            onClick={() => quantityHandler({
                                                type: "DEC_QNT",
                                                product: item._id,
                                                quantity: item.quantity
                                            })}>
                                                <AIicons.AiOutlineMinus/>
                                        </button>
                                        <div className={`h6`}>Quantity: {item.quantity}</div>
                                        <button 
                                            className={`btn iconBtn`} 
                                            onClick={() => quantityHandler({
                                                type: "INC_QNT",
                                                product: item._id,
                                                quantity: item.quantity
                                            })}>
                                                <AIicons.AiOutlinePlus/>
                                        </button>
                                    </div>

                                    <div className={`mt-2`}>
                                        <button 
                                            className={`btn ${styles.actionBtn}`}
                                            onClick={() => removeFromCart({product: item._id})}>REMOVE
                                        </button>
                                        <button className={`btn ${styles.actionBtn}`}
                                        onClick={() => wishBtnHandler(item._id)}>
                                            MOVE TO WISHLIST
                                        </button> 
                                    </div>
                                </div>
                            </li>
                    ))
                }
                </ul>
            </div>
            <div className={`${styles.checkout}`}>
                <div className={`h5`}>Checkout</div>
                <ul>
                    {
                        cartItems.map((item) => (
                            <li key={item.name}>{item.name}</li>
                        ))
                    }
                </ul>
                <div className={`d-flex flex-justify-space-between flex-align-center ${styles.bill}`}>
                    <div>Total</div>
                    <div>Rs {totalPrice(cartItems)}</div>
                </div>
            </div>
        </div>
            )
        }
        
        </>
    )
}