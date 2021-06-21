import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <Footer>
            <div className={`${styles.footer}`}>
                <div>
                    <h1>Garden Up</h1>
                    <div>
                        Made by Vaishnav
                    </div>
                </div>

                <div>
                    <h5>Menu</h5>
                </div>
                <div>
                    <h5>Newsletter</h5>
                </div>
            </div>
        </Footer>
    )
}