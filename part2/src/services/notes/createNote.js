import axios from "axios";

export default function createNote(newNote) {
    return axios.post('https://jsonplaceholder.typicode.com/posts', newNote)
        .then(({data}) => data)
}