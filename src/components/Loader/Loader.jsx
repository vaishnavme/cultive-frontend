import styles from "./Loader.module.css";

export const Loader = () => {
    return (   
    <div className={`${styles.fond}`}>
        <div className={`${styles.contenerGeneral}`}>
            <div className={`${styles.contenerMixte}`}><div className={`${styles.ballColor} ${styles.ball1}`} >&nbsp;</div></div>
            <div className={`${styles.contenerMixte}`}><div className={`${styles.ballColor} ${styles.ball2}`} >&nbsp;</div></div>
            <div className={`${styles.contenerMixte}`}><div className={`${styles.ballColor} ${styles.ball3}`} >&nbsp;</div></div>
            <div className={`${styles.contenerMixte}`}><div className={`${styles.ballColor} ${styles.ball4}`} >&nbsp;</div></div>
        </div>
    </div>
    )
}