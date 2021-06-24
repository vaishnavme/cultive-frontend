import { useEffect } from "react";
import styles from "./Toast.module.css";
import { useToast } from "../../context";


export const Toast = () => {
    const { toastBox, toastDispatch } = useToast();

    useEffect(() => {
       const toastTimeOut = setTimeout(() => {
           toastDispatch({type: "INITIAL"});
       }, 2000);

       // eslint-disable-next-line
    }, [])
    
    const checkToastType = (type) => {
        switch(type) {
            case "SUCCESS":
                return { toastStyle: "alert-success", icon: "bx-check"}
            
            case "ERROR":
                return { toastStyle: "alert-danger", icon: "bx-error"}

            default:
                return { toastStyle: "alert-primary", icon: "bx-check"}
        }
    }

    const toastType = checkToastType(toastBox["alertType"])
    
    return (
        <div className={`alert ${toastType.toastStyle} ${styles.toastBox}`}>
            <i className={`bx ${toastType.icon}`}></i>
                {toastBox["message"]}
        </div>
    )
}