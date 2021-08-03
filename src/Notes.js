import React, { useEffect} from 'react'
import "./Notes.css"
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import * as Logic from "./Logic.js"



function Notes() {
    const notes = useSelector(state => state.NotesReducer)
    const numberOfNotes = localStorage.length
    
    useEffect(() => {
        Logic.getAllNotes()
    }, [])     

    return (
        <div className="notes">
            <div className="notes_header">
                <p>You have {numberOfNotes} notes</p>
            </div>

            <div>
               {notes.map((val) => {
                   return <div key={val.id} onClick={() => Logic.selectNote(val.note, val.id)}><ReactQuill className="note" value={JSON.parse(val.note)} readOnly={true}  /></div>
               })}
            </div>
        </div>
    )
}

export default Notes
