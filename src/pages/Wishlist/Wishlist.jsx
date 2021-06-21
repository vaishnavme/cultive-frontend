import { useNavigate } from "react-router-dom";
import { useData } from "../../context";
import { ProductCard } from "../../components";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
    const navigate = useNavigate();
    const { wishListItems } = useData();
    
    return (
        <div className={`${styles.main}`}>
            {
                !wishListItems.length && (
                    <div className={`${styles.notify}`}>
                        <div className={`h3`}>Empty Wishlist!!</div>
                        <p>You have no item in wishlist.</p>
                        <button className={`btn btn-secondary`} onClick={() => navigate("/products")}>Start Adding</button>
                    </div>
                )
            }
            <div className={`${styles.productGrid} mt-4`}>
                {
                    wishListItems?.map((item) => (
                        <ProductCard key={item._id} product={item}/>
                    ))
                }
            </div>
        </div>
    )
}