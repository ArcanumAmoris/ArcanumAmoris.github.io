import store from './StoreAndReducers/ReduxStore'
import { SetActionForCurrentNote, SetActionForMessage, SetActionForNotes, SetActionForQuill } from './StoreAndReducers/Actions'
import _ from "lodash"

export function saveChanges(quill, noteIndex) {
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var note = localStorage[key]
        if (key == noteIndex) {
            localStorage.setItem(key, JSON.stringify(quill.getContents().ops))
            setTimeout((Message) => {
                store.dispatch(SetActionForMessage(""))
            }, 4000);
            store.dispatch(SetActionForMessage("Your changes have been saved!"))
            getNoteKeys()
            break
        }
    }
}


export function saveNote(selectedNote, quill, noteIndex) {
    if (selectedNote) {
        saveChanges(quill, noteIndex)
    } else {
        for (let i = 0; i < 10000; i++) {
            if (!localStorage.getItem(i)) {
                localStorage.setItem(i, JSON.stringify(quill.getContents().ops))
                setTimeout((Message) => {
                    store.dispatch(SetActionForMessage(""))
                }, 4000);
                store.dispatch(SetActionForMessage("Your note has been saved!"))
                getNoteKeys()
                break
            }
        }
    }
}

export function getNoteKeys() {
    const notesObject = {}
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var value = localStorage[key]
        notesObject[key] = value
    }
    store.dispatch(SetActionForNotes(_.values(notesObject).sort(function(a, b) {
        return a > b
    })))
}

export function selectNote(selectedNote, index) {
    store.dispatch(SetActionForCurrentNote(selectedNote, index))
    return remove(index)
}

export function getNotes() {
    var notes = []
    for (var i = 0; i < localStorage.length; i++){
        notes.push(localStorage.getItem(localStorage.key(i)));
    }
    return notes
}

export function remove(index) {
    const newNotes = getNotes().filter((i, ind) => ind !== index)
    store.dispatch(SetActionForNotes(newNotes))
    }

function Message() {
    store.dispatch(SetActionForMessage("Your note has been saved!"))
}

export const NOTEPAD_TOOLBAR = [
    [{ 'font': [] }, { 'size': [] }],
    [ 'bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'header': [1, 2, 3, 4, 5] }, 'code-block' ],
    [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
    [ 'direction', { 'align': [] }],
    [ 'clean' ]
]