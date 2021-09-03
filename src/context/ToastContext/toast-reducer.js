export const toastReducer = (state, {type, payload}) => {
    switch(type) {
        case "INITIAL":
            return {
                isVisible: false,
                alert: "",
                message: ""
            }
        case "SUCCESS":
            return {
                isVisible: true,
                alertType: "SUCCESS",
                message: payload
            }

        case "ERROR":
            return {
                isVisible: true,
                alertType: "DANGER",
                message: payload
            }

        default: 
            return state;
    }
}