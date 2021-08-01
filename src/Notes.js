import React, { useEffect} from 'react'
import "./Notes.css"
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux'
import * as Logic from "./Logic.js"



function Notes() {
    const notes = useSelector(state => state.NotesReducer)
    const numberOfNotes = localStorage.length



    useEffect(() => {
        Logic.getNoteKeys()
    }, [])       


    return (
        <div className="notes">
            <div className="notes_header">
                <p>You have {numberOfNotes} notes</p>
            </div>

            <div>
               {notes.map((note, index) => {
                   return <div key={index} onClick={() => Logic.selectNote(note, index)}><ReactQuill className="note" value={JSON.parse(note)} readOnly={true}  /></div>
               })}
            </div>
        </div>
    )
}

export default Notes
