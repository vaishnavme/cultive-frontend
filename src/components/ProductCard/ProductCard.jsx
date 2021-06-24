import { Link } from "react-router-dom";
import { useState } from "react";
import { useData, useAuth, useToast } from "../../context";
import { toggleWishlistItems } from "../../services";
import { alreadyExist, Modal } from "..";
import styles from "./ProductCard.module.css";

export const ProductCard = ({product}) => {
    const { wishListItems } = useData();
    const { user } = useAuth();
    const { dispatch } = useData();
    const { toastDispatch } = useToast();
    const [showModal, setShowModal] = useState(false);

    const addToWishlist = (product) => {
        user ? (
            alreadyExist(wishListItems, product._id) ?
            toggleWishlistItems({
                product: product, 
                userID: user._id,
                action: "REMOVE",
                dispatch,
                toastDispatch
            })
            : toggleWishlistItems({
                product: product, 
                userID: user._id,
                action: "ADD",
                dispatch,
                toastDispatch
            })
        ) : setShowModal(true)
    }

    const setModelVisibility = () => {
        setShowModal(() => !showModal);
    }

    return (
        <>
        {showModal && <Modal setModelVisibility={setModelVisibility}/>}
        <div className={`${styles.productContainer}`}>
            <Link to={`/products/${product._id}`}>
                <div className={`${styles.productCard}`}>
                    <img className={`${styles.productImg} ${product.inStock || styles.outOffStock}`} src={product.image} alt={product.name}/>
                    <div className={`${styles.productInfo}`}>
                        <div className={`h6`}>{product.name}</div>
                        <div className={`h6 f-light`}>₹ {product.price}</div>
                    </div>
                </div>
            </Link>
            <div>
                <button
                    className={`btn iconBtn ${styles.wishlistBtn}`} 
                    onClick={() => addToWishlist(product)}>
                    { 
                        alreadyExist(wishListItems, product._id) ? 
                            <i className={`bx bxs-heart ${styles.fillWishlist}`} ></i> 
                            : <i className='bx bx-heart' ></i>
                    }                
                </button>
            </div>
        </div>
        </>
    )
}