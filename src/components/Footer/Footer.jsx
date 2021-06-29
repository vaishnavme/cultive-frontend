import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <section className={`${styles.footerSection}`}>
            <div className={`${styles.footer}`}>
                <div>
                    <div className={`h4 mb-2`}>GardnUp</div>
                    <a className={`${styles.socialLink} mb-3`} href="https://github.com/vaishnavme/gardnup-frontend" rel="noreferrer" target="_blank">
                        <i className={`bx bxl-github h4 mr-2`}></i> Source Code
                    </a>
                    <div>
                        Made by Vaishnav
                        <div>
                           <ul className={`${styles.sociallist}`}>
                                <li>
                                    <a href="https://github.com/vaishnavme" className={`${styles.socialLink}`} rel="noreferrer" target="_blank">
                                        <i className={`bx bxl-github h4`}></i> 
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/vaishnav-chandurkar" className={`${styles.socialLink}`} rel="noreferrer" target="_blank">
                                        <i className={`bx bxl-linkedin h4`}></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/vaishnavs0?=09" className={`${styles.socialLink}`} rel="noreferrer" target="_blank">
                                        <i className={`bx bxl-twitter h4`}></i>
                                    </a>
                                </li>
                           </ul>
                        </div>
                    </div>
                </div>

                <div className={`${styles.siteMenu}`}>
                    <h5>Menu</h5>
                    <ul className={`${styles.siteLinks}`}>
                        <li>
                            <NavLink to="/" className={`${styles.socialLink}`}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={`${styles.socialLink}`}>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/wishlist" className={`${styles.socialLink}`}>Wishlist</NavLink>
                        </li>
                        <li>
                            <NavLink to="/account" className={`${styles.socialLink}`}>Account</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5>Newsletter</h5>
                    <div className={`${styles.formGroup}`}>
                        <div>
                            <input className={`${styles.inputField}`} type="email" placeholder="Email Address" required/>
                        </div>
                        <button className={`${styles.btnSub}`}>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className={`${styles.footerBanner}`}>
                <h6>GardnUp</h6>
            </div>
        </section>
    )
}