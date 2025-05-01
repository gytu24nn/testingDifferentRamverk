import axios from "axios";

const ApiMiniBlogUrlVue = 'http://localhost:5268/api/miniBlog';

const miniBlogService = {
    getPosts() {
        return axios.get(ApiMiniBlogUrlVue); // hämtar alla inlägg
    },

    createPost(post) {
        return axios.post(ApiMiniBlogUrlVue, post); // skapar ett nytt inlägg
    },

    updatePost(id, updatePost) {
        return axios.put(`${ApiMiniBlogUrlVue}/${id}`, updatePost); // uppdaterar ett inlägg
    },

    deletePost(id) {
        return axios.delete(`${ApiMiniBlogUrlVue}/${id}`); // tar bort ett inlägg
    }
};

export default miniBlogService;