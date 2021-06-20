import { useState } from "react";
import { useAuth } from "../../context";
import styles from "./Account.module.css";

export default function Login() {
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);

    const setPasswordFieldVisible = () => setVisible((prevState) => !prevState)
    
    return (
        <section className={`${styles.wrapper}`}>
            <div className={`${styles.formSection}`}>
                <div className={`${styles.header}`}>
                    <h5>Hi {user.name}</h5>
                </div>
                <div className={`mt-2 mb-2`}>
                    <p>Welcome to account setting. You can update your <br/> account details here.</p>
                    <div className={`mt-2 mb-2`}>
                        <label className={`${styles.label}`}>Your Name</label>
                        <input className={`${styles.inputField} mb-2`} type="text" defaultValue={user.name}/>
                        
                        <label className={`${styles.label}`}>Your Email</label>
                        <input className={`${styles.inputField} mb-4`} type="text" defaultValue={user.email}/>

                        {
                            visible && 
                            <div>
                                <label className={`${styles.label}`}>New Password</label>
                                <input 
                                    className={`${styles.inputField} mb-2`} 
                                    type="password" 
                                    placeholder="New Password"
                                />

                                <label className={`${styles.label}`}>Confirm Password</label>
                                <input 
                                    className={`${styles.inputField} mb-4`} 
                                    type="password" 
                                    placeholder="Confirm Password"
                                />
                        </div>
                        }

                        <button className={`btn btn-primary ${styles.btnSave}`}>Save</button>
                        <button onClick={() => setPasswordFieldVisible()} className={`btn btn-secondary`}>{visible ? "Cancel" : "Change Password"}</button>
                    </div>
                </div>
            </div>
            
        </section>
    )
}