import { Fragment } from "react";
import { useNavigate } from "react-router";
import { useData } from "../../context";
import { Carousel } from "../../components";
import styles from "./Home.module.css";

export default function Home() {
    const { dispatch } = useData();
    const navigate = useNavigate();

    const bannerAction = (addFilter) => {
        dispatch({type: "TOGGLE_CATEGORY", payload: addFilter});
        navigate("/products")
    }

    return (
        <Fragment>
            <Carousel/>
            <section className={`${styles.bannerSection}`}>
                <div onClick={() => bannerAction("Indoor")} className={`${styles.banner}`}>
                    <img 
                        className={`${styles.bannerImg}`}
                        src="https://cdn.shopify.com/s/files/1/0317/0687/3992/files/banner-v4-1.jpg" 
                        alt="indoor"/>
                    <div className={`${styles.bannerInfo}`}>Indoor Plants</div>
                </div>
                <div onClick={() => bannerAction("Outdoor")} className={`${styles.banner}`}>
                    <img 
                        className={`${styles.bannerImg}`}
                        src="https://cdn.shopify.com/s/files/1/0317/0687/3992/files/banner-v4-2.jpg" 
                        alt="indoor"/>
                    <div className={`${styles.bannerInfo}`}>Outdoor Plants</div>
                </div>
            </section>
        </Fragment>
    )
}

