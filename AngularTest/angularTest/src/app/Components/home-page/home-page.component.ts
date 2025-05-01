import { Component } from '@angular/core';
import { Post } from '../../Models/miniblog.model';
import { MiniblogService } from '../../miniBlogg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  post: Post[] = [];
  newPost: Post = {title: '', content: '', authorUsername: '', createdAt: new Date(), updatedAt: new Date()};
  postToUpdate: Post = {title: '', content: '', authorUsername: '', createdAt: new Date(), updatedAt: new Date()};
  selectedPostId: number | null = null;

  constructor(private miniblogService: MiniblogService) { } 

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.miniblogService.GetAllPosts().subscribe(posts => {
      this.post = posts; 
    });
  }

  createPost(): void {
    this.miniblogService.CreatePost(this.newPost).subscribe(post => {
      this.post.push(post);
      this.newPost = {title: '', content: '', authorUsername: '', createdAt: new Date(), updatedAt: new Date()};

    })
  }

  updatePost(): void {
    if(this.selectedPostId !== null) {
      const originalPost = this.post.find(p => p.id === this.selectedPostId);
      if(!originalPost) return;

      const updatedPost: Post = {
        ...this.postToUpdate,
        id: this.selectedPostId,
        createdAt: originalPost.createdAt,
        updatedAt: new Date()
      };

      this.miniblogService.UpdatePost(updatedPost, this.selectedPostId).subscribe(() => {
        const index = this.post.findIndex(p => p.id === this.selectedPostId);
        if(index !== -1) {
          this.post[index] = updatedPost;
        }
        this.selectedPostId = null;
        this.postToUpdate = {title: '', content: '', authorUsername: '', createdAt: new Date(), updatedAt: new Date()};
      })
    }
  }

  deletePost(id: number): void {
    this.miniblogService.DeletePost(id).subscribe(() => {
      this.post = this.post.filter(p => p.id !== id);
    })
  }

  selectPostToUpdate(id: number): void {
    const post = this.post.find(p => p.id === id);
    if(post) {
      this.selectedPostId = id;
      this.postToUpdate = {
        ...post,
        updatedAt: new Date()
      };
    }
  }

  


}
