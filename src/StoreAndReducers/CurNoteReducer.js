

export default function SetCurrentNote(state = [], action) {
    switch (action.type) {
        case "SET_CURRENT_NOTE":
            return action.payload
        default:
            return state
    }
}