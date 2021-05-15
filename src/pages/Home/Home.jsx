import styles from "./Home.module.css";
import indoor from "../../assets/images/indoor-min.jpeg";
import outdoor from "../../assets/images/outdoor-min.jpeg";
import tropical from "../../assets/images/tropical-min.jpeg";

export default function Home() {
    return (
        <>
        <div className={`${styles.wallpaper}`}></div>
        <div className={`${styles.header}`}>
            <h1>Steps into Spring</h1>
            <h3>
                New Greenery to <br/> Refresh Your Home Inside and Out
            </h3>
        </div>
        <div className={`${styles.mainGrid}`}>
            <img className={`${styles.image}`} src={indoor} alt="indoor"/>
            <img className={`${styles.image}`} src={tropical} alt="indoor"/>
            <img className={`${styles.image}`} src={outdoor} alt="indoor"/>
        </div>
        </>
    )
}