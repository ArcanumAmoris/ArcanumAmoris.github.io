export default function SetQuill(state = null, action) {
    switch (action.type) {
        case "SET_QUILL":
            return action.payload 
        default:
            return state
    }
}