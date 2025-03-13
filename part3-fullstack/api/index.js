import notes from '../notes.js'
import express from 'express'
import cors from 'cors'
import logger from '../middlewares/logger.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>Hola món</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find((note) => note.id.toString() === id)
  note
    ? response.json(note)
    : response.status(404).json({
      error: 'Note not found'
    })
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note) {
    return response.status(400).json({
      error: 'Note is missing'
    })
  }
  if (!note.content) {
    return response.status(400).json({
      error: 'Note content is required'
    })
  }
  const notesIds = notes.map((note) => note.id)
  const uniqueId = notesIds.length ? Math.max(...notesIds) + 1 : 1
  const newNote = {
    id: uniqueId,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important === 'boolean' ? note.important : false
  }
  notes.push(newNote)
  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const noteIndex = notes.findIndex((note) => note.id.toString() === id)
  if (noteIndex === -1) {
    return response.status(404).end()
  }
  notes.splice(noteIndex, 1)
  response.status(204).end()
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
