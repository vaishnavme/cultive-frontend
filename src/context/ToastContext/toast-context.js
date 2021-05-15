import { createContext, useContext, useReducer } from "react";
import { toastReducer } from "./toast-reducer";

const ToastContext = createContext();

const initialToast = {
    isVisible: false,
    alertType: "",
    message: ""
}

export const ToastProvider = ({children}) => {
    const [toastBox, toastDispatch] = useReducer(toastReducer, initialToast)
    
    return (
        <ToastContext.Provider value={{
            toastBox, 
            toastDispatch
        }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);