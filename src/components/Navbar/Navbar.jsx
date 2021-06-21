import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth, useData } from "../../context";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { user } = useAuth();
    const { cartItems, wishListItems } = useData();
    const [isVisible, setVisible] = useState(false);

    const setNavVisible = () => {
        setVisible((prevState) => !prevState);
    }
    const activeStyle = {
            color: "#65c728",
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
                <i onClick={() => setNavVisible()} className={`bx bx-${isVisible ? "x" : "menu-alt-right"} ${styles.headerToggle}`}></i>
            </div>

            <nav className={`${styles.nav} ${isVisible && styles.show}`}>
                <div className={`${styles.navContent} `}>
                    <Link to="/" className={`${styles.navPerfil}`}>
                        <div className={`${styles.navBrand}`}>
                            GradnUp
                        </div>
                    </Link>
    
                    <div className={`${styles.navMenu}`}>
                        <ul onClick={() => setNavVisible()} className={`${styles.navList}`}>

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
                                <span className={`${styles.dropdownName}`}>{user ? "Account" : "Login"} <i className={`bx bx-chevron-down ${styles.dropdownIcon}`}></i></span>
                                    
                                <ul className={`${styles.dropdownMenu}`}>
                                    {user ? null : <li className={`${styles.dropdownItem} btn btn-secondary text-center`}>
                                        <NavLink to="/login" className={`${styles.navLink}`}> Log In</NavLink>
                                    </li>}

                                    <li className={`${styles.dropdownItem} ${styles.borderTop}`}>
                                        <NavLink to="/account" className={`${styles.navLink}`}>
                                            <i className='bx bx-user'></i> Account
                                        </NavLink>
                                    </li>
                                    <li className={`${styles.dropdownItem}`}>
                                        <NavLink to="/cart" className={`${styles.navLink}`}>
                                            <i className='bx bx-cart' ></i> Order <span className="f-warning">({cartItems.length})</span>
                                        </NavLink>
                                    </li>
                                    <li className={`${styles.dropdownItem}`}>
                                        <NavLink to="/wishlist" className={`${styles.navLink}`}>
                                            <i className='bx bx-shopping-bag' ></i> Wishlist <span className="f-warning">({wishListItems.length})</span>
                                        </NavLink>
                                    </li>
                                    <li className={`${styles.dropdownItem} ${styles.borderTop}`}>
                                       { user ? (
                                            <div className={`${styles.navLink}`}><i className='bx bx-log-out' ></i> Log Out </div>
                                        ) :
                                        <NavLink to="/signup" className={`${styles.navLink}`}><i className='bx bx-log-in' ></i> Sign Up</NavLink>}
                                    </li>
                                </ul>
                            </li>
    
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}