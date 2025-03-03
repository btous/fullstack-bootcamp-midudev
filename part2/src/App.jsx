import {useEffect, useRef, useState} from 'react'
import getAllNotes from "./services/notes/getAllNotes.js";
import createNote from "./services/notes/createNote.js";

function App() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(false)

    const newNoteTitle = useRef(null)
    const newNoteBody = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        const newNote = {
            userId: 1,
            title: newNoteTitle.current.value,
            body: newNoteBody.current.value,
        }

        createNote(newNote)
            .then((res) => {
                setNotes([...notes, res])
                resetForm()
            })
            .catch(err => console.error(err))

        function resetForm() {
            newNoteTitle.current.value = ''
            newNoteBody.current.value = ''
        }
    }

    useEffect(() => {
        setLoading(true)
        getAllNotes()
            .then(setNotes)
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <h1>Notes</h1>
            {loading && <p>Loading...</p>}
            {notes && (
                <ol>
                    {notes.map(note => (
                            <li key={note.id}>
                                <h3>{note.title}</h3>
                                <p>{note.body}</p>
                            </li>
                        )
                    )}
                </ol>
                )
            }
            <form onSubmit={handleSubmit}>
                <div><input ref={newNoteTitle} type="text" placeholder="Title" required /></div>
                <div><textarea ref={newNoteBody} placeholder="Body" required /></div>
                <button>Add</button>
            </form>
        </>
    )
}

export default App
