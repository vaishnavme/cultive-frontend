import { Fragment } from "react";
import { Carousel } from "../../components";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <Fragment>
            <Carousel/>
            <section className={`${styles.bannerSection}`}>
                <div className={`${styles.banner}`}>
                    <img 
                        className={`${styles.bannerImg}`}
                        src="https://cdn.shopify.com/s/files/1/0317/0687/3992/files/banner-v4-1.jpg" 
                        alt="indoor"/>
                    <div className={`${styles.bannerInfo}`}>Indoor Plants</div>
                </div>
                <div className={`${styles.banner}`}>
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

