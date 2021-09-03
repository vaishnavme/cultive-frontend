import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context';
import { errorNotification, successNotification } from '../../components';
import styles from './Login.module.css';

export default function Login() {
    const [loginCred, setloginCred] = useState({});
    const { logInUser } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const inputChangeHandler = (e) => {
        e.preventDefault();
        setloginCred((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const { success } = await logInUser(loginCred);
        if (success) {
            successNotification('Login Successfull!!');
            navigate(state?.from ? state.from : '/', { replace: true });
        } else {
            errorNotification('Error Ocuured');
        }
    };

    const loginAsGuest = async (e) => {
        e.preventDefault();
        const { success } = await logInUser('johnsnow@dev.com', 'Password@123');
        if (success) {
            successNotification('Login Successfull!!');
            navigate(state?.from ? state.from : '/', { replace: true });
        } else {
            errorNotification('Error Ocuured');
        }
    };

    return (
        <div className={`${styles.main}`}>
            <div className={`${styles.card} p-2`}>
                <div className={`${styles.header}`}>
                    <h6>Hi there👋</h6>
                    <h4>Welcome Back</h4>
                </div>
                <div className={`${styles.body}`}>
                    <form>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => inputChangeHandler(e)}
                                type="email"
                                placeholder="Enter your email"
                            />
                            <span></span>
                        </div>
                        <div className={`styled-input`}>
                            <input
                                onChange={(e) => inputChangeHandler(e)}
                                type="password"
                                placeholder="Enter your password"
                            />
                            <span></span>
                        </div>
                        <button
                            onClick={() => loginHandler()}
                            className={`btn btn-secondary ${styles.formBtn}`}
                        >
                            Log in
                        </button>
                        <button
                            onClick={(e) => loginAsGuest(e)}
                            className={`btn btn-secondary ${styles.formBtn}`}
                        >
                            Login As Guest
                        </button>
                    </form>
                    <p>
                        Don't have account?{' '}
                        <Link className="f-primary" to="/signup">
                            Sign Up
                        </Link>{' '}
                        here
                    </p>
                </div>
            </div>
        </div>
    );
}
