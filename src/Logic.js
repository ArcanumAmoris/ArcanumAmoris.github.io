import store from './StoreAndReducers/ReduxStore'
import { SetActionForCurrentNote, SetActionForMessage, SetActionForNewQuill, SetActionForNotes } from './StoreAndReducers/Actions'

export function saveChanges(quill, noteIndex) {
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        if (key == noteIndex) {
            localStorage.setItem(key, JSON.stringify(quill.getContents().ops))
            setTimeout(() => {
                store.dispatch(SetActionForMessage(""))
                store.dispatch(SetActionForNewQuill(" "))
            }, 3000);
            store.dispatch(SetActionForNewQuill(""))
            store.dispatch(SetActionForMessage("Your changes have been saved!"))
            store.dispatch(SetActionForCurrentNote(null))
            getAllNotes()
            break
        }
    }
}

function keyGreaterThan(i) {
    const arr = Array.from(Object.keys(localStorage).join(" "))
    return arr.some(el => el > i)
}

export function saveNote(selectedNote, quill, noteIndex) {
    if (selectedNote) {
        saveChanges(quill, noteIndex)
    } else {
        for (let i = 0; i < 100000000; i++) {
            if (!localStorage.getItem(i) && !keyGreaterThan(i)) {
                localStorage.setItem(i, JSON.stringify(quill.getContents().ops))
                setTimeout(() => {
                    store.dispatch(SetActionForMessage(""))
                    store.dispatch(SetActionForNewQuill(" "))
                }, 3000);
                store.dispatch(SetActionForNewQuill(""))
                store.dispatch(SetActionForMessage("Your note has been saved!"))
                getAllNotes()
                break
            } else {
                continue
            }
        }
    }
}

export function getAllNotes() {
    const notes = Object.keys(localStorage).reduce((acc,key) => {
        return [...acc, {id: key, note: localStorage[key]}]
      }, [])
    sortNotes(notes)
    store.dispatch(SetActionForNotes((notes)))
}

export function selectNote(selectedNote, index) {
    store.dispatch(SetActionForCurrentNote(selectedNote, index))
    removeNote(index)
}

export function getNotes() {
    const notes = Object.keys(localStorage).reduce((acc,key) => {
        return [...acc, {id: key, note: localStorage[key]}]
      }, [])
    sortNotes(notes)
    return notes
}   

function sortNotes(notes) {
    return notes.sort((a, b) => a.id - b.id )
}

export function removeNote(index) {
    const newNotes = getNotes().filter((note) => note.id !== index)
    store.dispatch(SetActionForNotes(newNotes))
    }

 export function limitDisplayText(note) {
        const noteParsed = JSON.parse(note)
        const noteText = noteParsed[0].insert
        const shortenedText = noteText.split(" ", 10).join(" ") + (noteText.length > 20 ? "..." : " ")
        return shortenedText
    }

export function deleteNote(noteID, e) {
    e.stopPropagation()
    localStorage.removeItem(noteID)
    getAllNotes()
    setTimeout(() => {
        store.dispatch(SetActionForMessage(""))
    }, 4000);
    store.dispatch(SetActionForMessage("Your note has successfully been deleted!"))
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



