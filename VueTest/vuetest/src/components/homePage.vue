<template>
    <form @submit.prevent="selectedPostId ? updatePost() : createPost()">
        <h2>{{ selectedPostId ? 'Update post:' : 'Create post:' }}</h2>
        <label for="Title">Title</label>
        <input type="text" id="Title" v-model="newPost.title" required>

        <label for="Content">Content</label>
        <textarea type="text" id="Content" v-model="newPost.content" required></textarea>

        <label for="authorUsername">Username</label>
        <input type="text" id="authorUsername" v-model="newPost.authorUsername" required>

        <button type="submit">{{ selectedPostId ? 'Update Post' : 'Create Post' }}</button>
    </form>

    <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <small>Skapad av: {{ post.authorUsername }}</small>
        <small>Skapad: {{ post.createdAt }}</small>
        <small>senast uppdaterad: {{ post.updatedAt }}</small>

        <button @click="deletePost(post.id)" :disabled="selectedPostId !== null">Delete</button>
        <button @click="editPost(post)">Update</button>
    </div>
    
</template>

<script>
import miniBlogService from '../Services/miniBlogService.js';



export default {
    name: 'AppHomePage',
    data(){
        return {
            posts: [],
            newPost: {
                title: '',
                content: '',
                authorUsername: ''
            },
            postToUpdate: {
                title: '',
                content: '',
                authorUsername: ''
            },
            selectedPostId: null, // ID för det inlägg som ska uppdateras
        }
    }, 
    mounted() {
        this.getPosts(); //körs när komponenten laddas
    },
    methods: {
        getPosts() {
            miniBlogService.getPosts()
                .then(response => {
                    this.posts = response.data; //sätter posts till svaret från servern
                })
                .catch(error => {
                    console.error("Error fetching posts:", error);
                });
        }, 

        createPost() {
            miniBlogService.createPost(this.newPost)
                .then(() => {
                    this.newPost = { title: '', content: '', authorUsername: '' }; //rensar formuläret
                    this.getPosts(); //hämtar inläggen igen för att uppdatera listan
                })
        },

        editPost(post) {
            this.newPost = {...post}; //kopierar inlägget som ska uppdateras till formuläret
            this.selectedPostId = post.id; //sätter ID för det inlägg som ska uppdateras
        },

        updatePost() {
            if(!this.selectedPostId) {
                alert("Ingen post vald för uppdatering.");
                return;
            }

            miniBlogService.updatePost(this.selectedPostId, this.newPost) //skickar ID och det nya inlägget till servern
                .then(() => {
                    this.newPost = { title: '', content: '', authorUsername: '' }; //rensar formuläret
                    this.selectedPostId = null; //rensar ID för det inlägg som ska uppdateras
                    this.getPosts(); //hämtar inläggen igen för att uppdatera listan
                })
                .catch(error => {
                    console.error("error updating post:", error)
                })
        }, 

        deletePost(id) {
            miniBlogService.deletePost(id)
                .then(() => {
                    this.getPosts(); //hämtar inläggen igen för att uppdatera listan
                })
                .catch(error => {
                    console.error("Error deleting post:", error);
                });
        }

        
    }
};
</script>

<style scoped>

</style>