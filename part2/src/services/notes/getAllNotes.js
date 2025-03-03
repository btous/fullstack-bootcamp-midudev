import axios from 'axios';

export default function getAllNotes() {
    return axios.get('https://jsonplaceholder.typicode.com/posts#')
        .then(({data}) => data)
}