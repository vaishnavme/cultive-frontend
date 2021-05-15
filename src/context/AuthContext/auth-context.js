import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const BASE_URL = "https://cultivateneog.herokuapp.com"
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
    )

    const loginCredentialHandler = async (email, password) => {
        console.log("ema", email)
        try {
            const { data: {data, success} } = await axios.post(`${BASE_URL}/user/login`, {
                email,
                password
            })
            console.log("user", data)
            if(success) {
                setUser(data);
                localStorage?.setItem("authUser", JSON.stringify(data));
            }
            return { data, success };
        } catch (err) {
            console.log(err);
        }
    }

    const logOutUser = async () => {
        localStorage?.removeItem("authUser");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user, 
            loginCredentialHandler,
            logOutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);