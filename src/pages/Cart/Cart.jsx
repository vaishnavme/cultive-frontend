import { useNavigate } from "react-router-dom";
import { useData, useAuth } from "../../context";
import { alreadyExist } from "../../components";
import { updateProductQuantity, removeFromCart, toggleWishlistItems } from "../../services";
import styles from "./Cart.module.css";

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const  { cartItems, wishListItems, dispatch } = useData();

    const totalPrice = (items) => {
        return items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    }
    const cartTotal = totalPrice(cartItems) || 0;

    const addToWishlist = (product) => {
        alreadyExist(wishListItems, product._id) ?
        toggleWishlistItems({
            product: product, 
            userID: user._id,
            action: "REMOVE",
            dispatch,
        })
        : toggleWishlistItems({
            product: product, 
            userID: user._id,
            action: "ADD",
            dispatch,
        })
    }

    const removeItem = ({product}) => {
        removeFromCart({
            productId: product,
            userID: user._id,
            dispatch,
        })
    }

    const quantityHandler = ({type, product, quantity}) => {
        updateProductQuantity({
            productId: product,
            userID: user._id,
            action: type,
            quantity,
            dispatch
        })
    }

    return (
        <section className={`${styles.cartSection}`}>
            {
                !cartItems.length ? 
                (
                    <div className={`${styles.centerBlock}`}>
                        <div>Your Cart is empty!</div>
                        <button onClick={() => navigate("/products")} className={`btn btn-secondary`}>Let's Shop</button>
                    </div>
                ) : (
                    <div>
                        <div className={`h4`}>Your Cart</div>
                        <div className={`${styles.container}`}>
                            <div className={`${styles.cartItems}`}>
                                <ul>
                                    {
                                        cartItems?.map((item) => (
                                            <li key={item._id} className={`${styles.productList}`}>
                                                <div className={`${styles.product}`}>
                                                    <div className={`${styles.productInfo}`}>
                                                        <img className={`${styles.productImage}`} src={item.image} alt={item.name}/>
                                                        <div className={`ml-2`}>{item.name}</div>    
                                                    </div>
                                                    <div className={`${styles.productQuantity}`}>
                                                        <button 
                                                            onClick={() => quantityHandler({type: "INC_QNT", product:item._id, quantity:item.quantity})} 
                                                            className={`btn ${styles.btnIcon}`}><i className='bx bx-plus'></i></button>
                                                        <span className={`ml-2 mr-2 h6`}>{item.quantity}</span>
                                                        <button 
                                                            disabled={item.quantity < 2 ? true : false} 
                                                            onClick={() => quantityHandler({type: "DEC_QNT", product:item._id, quantity:item.quantity})}  
                                                            className={`btn ${styles.btnIcon}`}><i className='bx bx-minus' ></i></button>
                                                    </div>
                                                    <div className={`${styles.productPrice} h6`}>
                                                        {item.price} ₹
                                                    </div>
                                                    <div className={`${styles.productAction}`}>
                                                        <button onClick={() => addToWishlist(item)} className={`btn ${styles.btnIcon}`}>
                                                        { 
                                                            alreadyExist(wishListItems, item._id) ? 
                                                                <i className={`bx bxs-heart ${styles.fillWishlist}`} ></i> 
                                                                : <i className='bx bx-heart' ></i>
                                                        }    
                                                        </button>
                                                        <button onClick={() => removeItem({product: item._id})} className={`btn ${styles.btnIcon}`}><i className='bx bx-x'></i></button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={`${styles.checkout}`}>
                                <div className={`${styles.cardCheck}`}>
                                    <label className={`${styles.lableName}`}>Payment Type</label>
                                    <div className={`${styles.select}`}>
                                        <button className={`${styles.btnSelect}`}><i className='bx bxl-visa' ></i></button>
                                        <button className={`${styles.btnSelect}`}><i className='bx bxl-paypal' ></i></button>
                                    </div>

                                    <div className={`${styles.formGroup} mt-2`}>
                                        <label className={`${styles.lableName}`}>Name on Card</label>
                                        <input type="text" className={`${styles.inputField} ${styles.inputFieldBlock}`} placeholder="Your Name"/>

                                        <div className={`${styles.cardDetails}`}>
                                            <div>
                                                <label className={`${styles.lableName}`}>Expiration Date</label>
                                                <input type="text" className={`${styles.inputField} ${styles.inputField}`} placeholder="MM/YY"/>
                                            </div>
                                            <div>
                                                <label className={`${styles.lableName}`}>CVV</label>
                                                <input type="text" className={`${styles.inputField} ${styles.inputField}`} placeholder="eg. 123"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.billing}`}>
                                        <div className={`${styles.billingLabel}`}>
                                            <ul>
                                                <li>Subtotal</li>
                                                <li>Shipping</li>
                                                <li>Total (Tax incl.)</li>
                                            </ul>
                                        </div>
                                        <div className={`${styles.billingTotal}`}>
                                            <ul>
                                                <li>{cartTotal}</li>
                                                <li>Free</li>
                                                <li>{cartTotal}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button className={`${styles.btnBlock}`}>
                                        <div>{cartTotal}</div>
                                        <div className={`d-flex flex-align-center`}>Checkout <i className='bx bxs-right-arrow-alt h5' ></i></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>  
    )
}