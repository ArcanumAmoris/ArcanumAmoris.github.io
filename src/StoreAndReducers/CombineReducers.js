import { combineReducers } from "redux";
import SetCurrentNote from "./CurNoteReducer"
import NotesReducer from "./NotesReducer";
import SetNewQuill from "./NewQuillReducer";
import SetMessage from "./MessageReducer";
import SetQuill from "./QuillReducer";

export default combineReducers({
    SetCurrentNote,
    NotesReducer,
    SetMessage,
    SetQuill,
    SetNewQuill
})