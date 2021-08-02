import { createContext, useContext, useState } from "react";
import axios from "axios";
import {BASE_URL}  from "../../api";
import { errorNotification } from "../../components";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
    )
    // eslint-disable-next-line
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("authToken"))
    )

    if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
    }

    const logInUser = async (email, password) => {
        try {
            const { data: {user, success, token} } = await axios.post(`${BASE_URL}/user/login`, {
                email,
                password
            })
            
            if(success) {
                setUser(user);
                setToken(token);
                axios.defaults.headers.common["Authorization"] = `${token}`
                localStorage.setItem("authUser", JSON.stringify(user));
                localStorage.setItem("authToken", JSON.stringify(token));
            }
            return { user, success };
        } catch (err) {
            errorNotification("Error Occured!")
        }
    }

    const signUpUser = async({name, email, password}) => {
        try {
            const { data: {success, user, token, message} } = await axios.post(`${BASE_URL}/user/signup`, {
                name: name,
                email: email,
                password: password
            })
            if(success) {
                setUser(user);
                setToken(token);
                axios.defaults.headers.common["Authorization"] = `${token}`
                localStorage.setItem("authUser", JSON.stringify(user));
                localStorage.setItem("authToken", JSON.stringify(token));
            } 
            return { success, message };
        } catch (err) {
            console.log(err);
        }
    }

    const logOutUser = () => {
        localStorage?.removeItem("authUser");
        localStorage?.removeItem("authToken");
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{
            user, 
            token,
            logInUser,
            signUpUser,
            logOutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);