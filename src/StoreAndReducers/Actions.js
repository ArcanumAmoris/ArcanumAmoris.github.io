export const SetActionForCurrentNote = (selectedNote, index) => ({
    type: "SET_CURRENT_NOTE",
    payload: {
      selectedNote: selectedNote,
      index: index
    }
  })

export const SetActionForMessage = (message) => ({
    type: "SET_MESSAGE",
    payload: message
})

export const SetActionForQuill = (q) => ({
    type: "SET_QUILL",
    payload: q
})

export const SetActionForNotes = noteArray => ({
    type: "SET_NOTES",
    payload: noteArray
})