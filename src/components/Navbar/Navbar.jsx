import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { user } = useAuth();
    const [isVisible, setVisible] = useState(false);

    const setNavVisible = () => {
        setVisible((prevState) => !prevState);
    }
    const activeStyle = {
            fontWeight: 500,
            color: "#00bbf9",
        }

    return (
        <header className={`${styles.header}`}>
            <Link to="/" className={`${styles.headerLogo}`}>GardnUp</Link>
            <div className={`${styles.headerLinks}`}>
                <NavLink to="/cart" activeStyle={activeStyle} className={`${styles.headerItem}`}>
                    <i className='bx bx-cart'></i>
                </NavLink>
                <NavLink to="/wishlist" activeStyle={activeStyle} className={`${styles.headerItem}`}>
                    <i className='bx bx-shopping-bag'></i>
                </NavLink>
                <i onClick={() => setNavVisible()} className={`bx bx-menu ${styles.headerToggle}`}></i>
            </div>

            <nav className={`${styles.nav} ${isVisible && styles.show}`}>
                <div className={`${styles.navContent} `}>
                    <Link to="/" className={`${styles.navPerfil}`}>
                        <div className={`${styles.navBrand}`}>
                            GradnUp
                        </div>
                    </Link>
    
                    <div className={`${styles.navMenu}`}>
                        <ul className={`${styles.navList}`}>

                            <li className={`${styles.navItem}`}>
                                <NavLink to="/" activeStyle={activeStyle} className={`${styles.navLink}`} end>Home</NavLink>
                            </li>

                            <li className={`${styles.navItem}`}>
                                <NavLink to="/cart" activeStyle={activeStyle} className={`${styles.navLink}`}>Cart</NavLink>
                            </li>

                            <li className={`${styles.navItem}`}>
                                <NavLink to="/wishlist" activeStyle={activeStyle} className={`${styles.navLink}`}>Wishlist</NavLink>
                            </li>
    
                            <li className={`${styles.navItem} ${styles.dropdown}`}>
                                <NavLink to="/login" activeStyle={activeStyle} className={`${styles.navLink} ${styles.dropdownLink}`}>Login <i className={`bx bx-chevron-down ${styles.dropdownIcon}`}></i></NavLink>
                                    
                                <ul className={`${styles.dropdownMenu}`}>
                                    <li className={`${styles.dropdownItem}`}><NavLink to="/" className={`${styles.navLink}`}>Account</NavLink></li>
                                    <li className={`${styles.dropdownItem}`}><NavLink to="/" className={`${styles.navLink}`}>Order</NavLink></li>
                                    <li className={`${styles.dropdownItem}`}><NavLink to="/" className={`${styles.navLink}`}>Wishlist</NavLink></li>
                                    <li className={`${styles.dropdownItem}`}><NavLink to="/" className={`${styles.navLink}`}>Log Out</NavLink></li>
                                </ul>
                            </li>
    
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}