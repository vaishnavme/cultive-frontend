import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Signup.module.css";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    const credHandler = () => {
        setUserEmail("");
        setUserPassword("");
    }

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Let's get your free account.</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <div className={`styled-input`}>
                            <input 
                                onChange={(e) =>setUsername(e.target.value)}
                                value={username}
                                type="text" 
                                placeholder="username" 
                                required/>
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => setUserEmail(e.target.value)}
                                value={userEmail}
                                type="email" 
                                placeholder="Enter your email" 
                                required/>
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input 
                                onChange={(e) =>setUserPassword(e.target.value)}
                                value={userPassword}
                                type="password" 
                                placeholder="Enter your password" 
                                required/>
                            <span></span>
                        </div>
                        <button
                            onClick={credHandler}
                            className={`btn btn-secondary ${styles.lognBtn}`}>
                                Sign Up
                        </button>
                    </form>
                    <p>Already have an account? <Link className={`f-primary`} to="/login">Log in</Link> here</p>
                    <small>Sign up is still under construstion</small>
                </div>
            </div>
        </div>
    )
}