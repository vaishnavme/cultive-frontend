import { createContext, useContext, useState } from "react";
import axios from "axios";
import { errorNotification, successNotification } from "../../components";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authUser"))
    )

    const logInUser = async (email, password) => {
        try {
            const { data: {data, success} } = await axios.post(`/user/login`, {
                email,
                password
            })
            console.log("user", data)
            if(success) {
                successNotification("LogIn!")
                setUser(data);
                localStorage?.setItem("authUser", JSON.stringify(data));
            }
            return { data, success };
        } catch (err) {
            errorNotification("Error Occured!")
            console.log(err);
        }
    }

    const signUpUser = async({name, email, password}) => {
        try {
            const { data: {data, success, message} } = await axios.post(`/user/signup`, {
                name: name,
                email: email,
                password: password
            })
            if(success) {
                successNotification("Account Created!")
                setUser(data);
                localStorage.setItem("authUser", JSON.stringify(data));
            } else {
                errorNotification(message)
            }
            return { data, success };
        } catch (err) {
            errorNotification("Account Creation Failed!")
            console.log(err);
        }
    }

    const logOutUser = () => {
        localStorage?.removeItem("authUser");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user, 
            logInUser,
            signUpUser,
            logOutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);