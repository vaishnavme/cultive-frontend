import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context";
import * as AIicons from "react-icons/ai";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { user } = useAuth();
    const activeStyle = {
        fontWeight: 500,
        color: "#000000",
    }
    return (
        <>
        <nav className={`${styles.navbar}`}>
            <div className={`${styles.brand} h2`}>
                <Link to="/">Cultive</Link>
            </div>
            <div className={`${styles.navItem}`}>
                <NavLink to="/" activeStyle={activeStyle} className={`${styles.navLink}`} end>
                    <AIicons.AiOutlineHome/>
                    <span className={`${styles.linkName}`}>HOME</span>
                </NavLink>
                <NavLink to="/products" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineShop/>
                    <span className={`${styles.linkName}`}>SHOP</span>
                </NavLink>
                <NavLink to="/cart" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineShoppingCart/>
                    <span className={`${styles.linkName}`}>CART</span>
                </NavLink>
                <NavLink to="/wishlist" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineHeart/>
                    <span className={`${styles.linkName}`}>WISHLIST</span>
                </NavLink>
                <NavLink to={user ? "/account" : "/login"} activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineUser/>
                    <span className={`${styles.linkName}`}>{user ? "ACCOUNT" : "LOGIN"}</span>
                </NavLink>
            </div>
        </nav>

        <nav className={`${styles.mobileNav}`}>
            <div className={`${styles.brand} h2`}>
                <Link to="/">Cultive</Link>
            </div>
            <div className={`${styles.navItem}`}>
                <NavLink to="/cart" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineShoppingCart/>
                    <span className={`${styles.linkName}`}>CART</span>
                </NavLink>
                <NavLink to="/wishlist" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineHeart/>
                    <span className={`${styles.linkName}`}>WISHLIST</span>
                </NavLink>
            </div>
        </nav>
            <div className={`${styles.navItem} ${styles.bottomNav}`}>
                <NavLink to="/" activeStyle={activeStyle} className={`${styles.navLink}`} end>
                    <AIicons.AiOutlineHome/>
                    <span className={`${styles.linkName}`}>HOME</span>
                </NavLink>
                <NavLink to="/products" activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineShop/>
                    <span className={`${styles.linkName}`}>SHOP</span>
                </NavLink>
                <NavLink to={user ? "/account" : "/login"} activeStyle={activeStyle} className={`${styles.navLink}`}>
                    <AIicons.AiOutlineUser/>
                    <span className={`${styles.linkName}`}>{user ? "ACCOUNT" : "LOGIN"}</span>
                </NavLink>
            </div>
        </> 
    )
}