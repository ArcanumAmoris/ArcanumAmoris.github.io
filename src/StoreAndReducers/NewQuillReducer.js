export default function SetNewQuill(state = "", action) {
    switch (action.type) {
        case "SET_NEW_QUILL":
            return action.payload 
        default:
            return state
    }
}