<script>
    import { onMount } from 'svelte';
    import miniBlogService from '../lib/miniBlogService';

    let posts = [];
    let newPost = {
        title: '',
        content: '',
        authorUsername: ''
    };
    let postToUpdate = {
        title: '',
        content: '',
        authorUsername: ''
    };

    let selectedPostId = null; // To track the post being updated

    onMount(() => {
        getPosts();
    })

    async function getPosts() {
        try {
            const res = await miniBlogService.getAllPosts();
            posts = res.data; 

        } catch (error) {
            console.error('Kunde inte hämta inlägg:', error);
        }
    }

    async function createPost() {
        try {
            await miniBlogService.createPost(newPost);
            newPost = {
                title: '',
                content: '',
                authorUsername: ''
            }
            await getPosts(); // Refresh the posts after creating a new one
        } catch (error) {
            console.error('Kunde inte skapa inlägg:', error);
        }

    }

    async function editPost(post) {
        newPost = { ...post }; // Populate the form with the selected post's data
        selectedPostId = post.id; // Set the ID of the post to be updated
    }

    async function updatePost() {
        if(!selectedPostId) {
            alert('Ingen post vald för uppdatering!');
            return;
        } // Ensure a post is selected for updating

        try {
            await miniBlogService.updatePost(selectedPostId, newPost);
            newPost = {
                title: '',
                content: '',
                authorUsername: ''
            }
            selectedPostId = null; // Reset the selected post ID after updating
            await getPosts(); // Refresh the posts after updating
        } catch (error) {
            console.error('Kunde inte uppdatera inlägg:', error);
        }
    }

    async function deletePost(id) {
       miniBlogService.deletePost(id)
            .then(() => {
                posts = posts.filter(post => post.id !== id);
            })
            .catch(error => {
                console.error('Kunde inte ta bort inlägg:', error);
            });
    }


</script>


<div>
    <form on:submit|preventDefault={selectedPostId ? updatePost : createPost}>
        <h2>{selectedPostId ? 'Uppdatera inlägg:' : 'Skapa inlägg:'}</h2>
        <input type="text" bind:value={newPost.title} placeholder="Titel" required>
        <textarea placeholder="Content" bind:value={newPost.content} required></textarea>
        <input type="text" bind:value={newPost.authorUsername} required>
        <button type="submit">{selectedPostId ? 'Update post' : 'Create Post'}</button>
    </form>
    
    

    <ul>
        {#each posts as post }
            <li>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>by: {post.authorUsername}</small> <br>
                <button on:click={() => editPost(post)}>Update</button>
                <button on:click={() => deletePost(post.id)}>Delete</button>
            </li>
            
        {/each}
    </ul>
</div>