import { useEffect } from "react";
import styles from "./Toast.module.css";
import { useToast } from "../../context";
import successIcon from "../../assets/images/alert-check.svg"
import errorIcon from "../../assets/images/alert-danger.svg"

export const Toast = () => {
    const { toastBox, toastDispatch } = useToast();

    useEffect(() => {
       const toastTimeOut = setTimeout(() => {
           toastDispatch({type: "INITIAL"});
       }, 1000);

       return () => {
           clearTimeout(toastTimeOut);
       }
       // eslint-disable-next-line
    }, [])
    
    const checkToastType = (type) => {
        switch(type) {
            case "SUCCESS":
                return { toastStyle: "alert-success", icon: successIcon}
            
            case "ERROR":
                return { toastStyle: "alert-danger", icon: errorIcon}

            default:
                return { toastStyle: "alert-primary", icon: successIcon}
        }
    }

    const toastType = checkToastType(toastBox["alertType"])
    
    return (
        <div className={`alert ${toastType.toastStyle} ${styles.toastBox}`}>
            <img className={`alert-icon`} src={toastType.icon} alt={toastType.toastStyle}/>
                {toastBox["message"]}
        </div>
    )
}