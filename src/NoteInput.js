import React, { useCallback, useEffect, useState } from 'react'
import * as Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./NoteInput.css"
import { useSelector } from "react-redux"
import * as Logic from "./Logic.js"
import store from './StoreAndReducers/ReduxStore'
import SetMessage from './StoreAndReducers/MessageReducer'
import { SetActionForQuill } from './StoreAndReducers/Actions'

function NoteInput() {
    const selectedNote = useSelector(state => state.SetCurrentNote.selectedNote)
    const noteIndex = useSelector(state => state.SetCurrentNote.index)
    const message = useSelector(state => state.SetMessage)
    const quill = useSelector(state => state.SetQuill)
    const [disabled, setDisabled] = useState(true)

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return 
        wrapper.innerHTML = ''
        const editor = document.createElement("div")
        wrapper.append(editor)
        var q = new Quill(editor, { modules: {toolbar: Logic.NOTEPAD_TOOLBAR }, theme: "snow" })  
        store.dispatch(SetActionForQuill(q))
    }, [message])

    useEffect(() => {
        if (quill == null) return 
        quill.on("text-change", (delta) => {
            const input = quill.getLength()
            if (input -1 == 0) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        })
    }, [quill])

    useEffect(() => { 
        if (quill == null) return 
        window.scroll(0,0)
        quill.setContents(JSON.parse(selectedNote), "user")
    }, [selectedNote])

    return ( 
        <>
        {message && <div className="message">{message}</div>}
        <div className="container" ref={wrapperRef}></div>
        <button className="save" onClick={() => Logic.saveNote(selectedNote, quill, noteIndex)} disabled={disabled}>Save</button>
        </>
    )  
}

export default NoteInput