import axios from "axios";

const apiUrl = 'http://localhost:5268/api/miniBlog';

export default {
    getAllPosts() {
        return axios.get(apiUrl)
    },

    createPost(post) {
        return axios.post(apiUrl, post)
    }
}