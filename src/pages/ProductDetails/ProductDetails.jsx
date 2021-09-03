import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData, useAuth, useLoader } from '../../context';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { toggleWishlistItems } from '../../services';
import { ProductCard, alreadyExist, Loader, Modal } from '../../components';
import { addCartItems } from '../../services';
import styles from './ProductDetails.module.css';

export default function ProductDetails() {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState();
    const { productData, cartItems, wishListItems } = useData();
    const { isLoading, setLoading } = useLoader();
    const { user } = useAuth();
    const { dispatch } = useData();

    const { productID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const {
                    data: { product }
                } = await axios.get(`${BASE_URL}/products/${productID}`);
                setProduct(product);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line
    }, [productID]);

    const addToWishlist = (product) => {
        user
            ? alreadyExist(wishListItems, product._id)
                ? toggleWishlistItems({
                      product: product,
                      userID: user._id,
                      action: 'REMOVE',
                      dispatch
                  })
                : toggleWishlistItems({
                      product: product,
                      userID: user._id,
                      action: 'ADD',
                      dispatch
                  })
            : setShowModal(true);
    };

    const addToCart = (product) => {
        user
            ? alreadyExist(cartItems, product._id)
                ? navigate('/cart')
                : addCartItems({
                      product: product,
                      userID: user._id,
                      dispatch
                  })
            : setShowModal(true);
    };

    const setModelVisibility = () => {
        setShowModal(() => !showModal);
    };

    const similarProducts =
        product &&
        productData
            .filter((item) => item.category === product.category)
            .slice(1, 5);

    return (
        <div className={`${styles.container}`}>
            {isLoading && <Loader />}
            {showModal && <Modal setModelVisibility={setModelVisibility} />}
            {product && (
                <>
                    <div className={`${styles.productSummary}`}>
                        <div className={`${styles.productImage}`}>
                            <img
                                className={`${styles.image} ${
                                    product.inStock || styles.outOffStock
                                }`}
                                src={product.image}
                                alt={product.name}
                            />
                        </div>
                        <div className={`${styles.productInfo}`}>
                            <div className={`${styles.header} mb-2`}>
                                <div className={`h3`}>{product.name}</div>
                                <div className={`h4 f-light`}>
                                    ₹ {product.price}
                                </div>
                            </div>

                            <p className={`pl-1 f-light`}>
                                {product.description}
                            </p>

                            <div
                                className={`mt-3 mb-3 d-flex flex-justify-space-around flex-align-center`}
                            >
                                <span className={`${styles.tags}`}>
                                    ⭐ {product.rating}
                                </span>
                                <span className={`${styles.tags}`}>
                                    {product.size} size
                                </span>
                                <span className={`${styles.tags}`}>
                                    {product.inStock
                                        ? 'Available'
                                        : 'Not Available'}
                                </span>
                            </div>

                            <div className={`mt-2 mb-2`}>
                                <div className={`h6`}>Details & Care</div>
                                <ul className={`simple-list f-light`}>
                                    {product.details.map((detail) => (
                                        <li key={detail.length}>{detail}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`d-flex`}>
                                <button
                                    className={`btn ${styles.btnSecondary}`}
                                    onClick={() => addToWishlist(product)}
                                >
                                    {alreadyExist(
                                        wishListItems,
                                        product._id
                                    ) ? (
                                        <i
                                            className={`bx bxs-heart ${styles.fillWishlist}`}
                                        ></i>
                                    ) : (
                                        <i className="bx bx-heart"></i>
                                    )}
                                </button>
                                <button
                                    disabled={product.inStock ? false : true}
                                    className={`btn ${styles.btnPrimary}`}
                                    onClick={() => addToCart(product)}
                                >
                                    {product.inStock
                                        ? alreadyExist(cartItems, product._id)
                                            ? 'Go to Cart'
                                            : 'Buy'
                                        : 'Not Avaliable'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.containerNext}`}>
                        <div className={`h3`}>Similar Products</div>
                        <div className={`${styles.productGrid} mt-4`}>
                            {similarProducts?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
