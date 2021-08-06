import React, { useEffect, useState} from 'react'
import "./Notes.css"
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import * as Logic from "./Logic.js"
import { Delete } from '@material-ui/icons'

function Notes() {
    const notes = useSelector(state => state.NotesReducer)
    const [deleteSelected, setDelete] = useState(false)
    const numberOfNotes = localStorage.length
    
    useEffect((i) => {
        Logic.getAllNotes()
    }, [])  

    return (
        <div className="notes">
            <div className="notes_header">
                <Delete className="selectDlt" onClick={() => setDelete(!deleteSelected)}></Delete>
                <p>You have {numberOfNotes} notes</p>
            </div>

            <div>
               {notes.map((val) => {
                   return (
                   <div key={val.id} onClick={() => Logic.selectNote(val.note, val.id)} className="editorDiv">
                    {deleteSelected && <Delete className="delBtn" onClick={(e) => Logic.deleteNote(val.id, e)}></Delete>}
                    <ReactQuill className="note" value={Logic.limitDisplayText(val.note)} readOnly={true}  /></div>)
               })}
            </div>
        </div>
    )
}

export default Notes
