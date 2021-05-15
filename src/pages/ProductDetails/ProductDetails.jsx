import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData, useAuth } from "../../context";
import axios from "axios";
import * as AIicons from "react-icons/ai";
import { checkIn, Loader, Modal } from "../../components";
import styles from "./ProductDetails.module.css";

export default function ProductDetails() {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState();
    const { cartItems, wishListItems, addToCartHandler, addToWishlist, removeFromWishlist, isLoading, setLoading } = useData();
    const  { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const {data: {product}} = await axios.get(`/products/${id}`)
                setProduct(product);
                setLoading(false)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line 
    },[id]);

    const wishBtnHandler = (productID) => {
        user ? (
            checkIn(wishListItems, productID) ?
            removeFromWishlist({product: productID})
            : addToWishlist({product: productID})
        ) : setShowModal(true)
    }

    const cartBtnHandler = (productID) => {
        user ? (
            checkIn(cartItems, productID) ? navigate("/cart")
            : addToCartHandler({product: productID})
        ) : setShowModal(true)
    }

    const modalCloseBtn = () => {
        setShowModal(() => !showModal);
    }

    return (
        <div className={`${styles.container}`}>
            {isLoading && <Loader/>}
            {showModal && <Modal modalCloseBtn={modalCloseBtn}/>}
            {
                product && 
                <div className={`${styles.productSummary}`}>
                    <div className={`${styles.productImage}`}>
                        <img 
                            className={`${styles.image}`}
                            src={product.image} 
                            alt={product.name}/>
                    </div>
                    <div className={`${styles.productInfo}`}>

                        <div className={`${styles.header} mb-2`}>
                            <div className={`h3`}>{product.name}</div>
                            <div className={`h4 f-light`}>₹ {product.price}</div>
                        </div>

                        <p className={`pl-1 f-light`}>{product.description}</p>
                        
                        <div className={`mt-3 mb-3 d-flex flex-justify-space-around flex-align-center`}>  
                            <span className={`${styles.tags}`}>⭐ {product.rating}</span>
                            <span className={`${styles.tags}`}>{product.size} size</span>
                            <span className={`${styles.tags}`}>{product.inStock ? "Available" : "Not Available"}</span>
                        </div>
                        
                        <div className={`mt-2 mb-2`}>
                            <div className={`h6`}>Details & Care</div>
                            <ul className={`simple-list f-light`}>
                                {
                                    product.details.map((detail) => (
                                        <li key={detail.length}>{detail}</li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className={`d-flex`}>
                            <button className={`btn ${styles.btnSecondary}`}
                                onClick={() => wishBtnHandler(product._id)}>
                            {checkIn(wishListItems, product._id) ? <AIicons.AiFillHeart className={`${styles.fillWishlist}`}/> : <AIicons.AiOutlineHeart/>}
                            </button>
                            <button 
                                disabled={product.inStock ? false : true}
                                className={`btn ${styles.btnPrimary}`}
                                onClick={() => cartBtnHandler(product._id)}>
                                {product.inStock ? 
                                    (checkIn(cartItems, product._id) ? "Go to Cart" : "Buy")
                                : "Not Avaliable"
                            }
                                      
                            </button> 
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}