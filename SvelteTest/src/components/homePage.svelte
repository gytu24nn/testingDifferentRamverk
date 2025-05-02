<script>
    import { onMount } from 'svelte';
    import miniBlogService from '../lib/miniBlogService';
  import { get } from 'svelte/store';

    let posts = [];
    let newPost = {
        title: '',
        content: '',
        authorUsername: ''
    };

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


</script>


<div>
    <form on:submit|preventDefault={createPost}>
        <h2>skapa inlägg:</h2>
        <input type="text" bind:value={newPost.title} placeholder="Titel" required>
        <textarea placeholder="Content" bind:value={newPost.content} required></textarea>
        <input type="text" bind:value={newPost.authorUsername} required>
        <button type="submit">Create post</button>
    </form>

    <ul>
        {#each posts as post }
            <li>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>by: {post.authorUsername}</small>
            </li>
            
        {/each}
    </ul>
</div>