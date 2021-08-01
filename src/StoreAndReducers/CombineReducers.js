import { combineReducers } from "redux";
import SetCurrentNote from "./SetCurrNoteReducer"
import NotesReducer from "./NotesReducer";
import SetMessage from "./MessageReducer";
import SetQuill from "./QuillReducer";

export default combineReducers({
    SetCurrentNote,
    NotesReducer,
    SetMessage,
    SetQuill,
})