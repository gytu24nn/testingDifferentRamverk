import { HttpClient } from '@angular/common/http';
import { Post } from './Models/miniblog.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MiniblogService {
    private ApiMiniblogUrl =  'http://localhost:5268/api/miniBlog';

    constructor(private http: HttpClient) {}

   GetAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.ApiMiniblogUrl);
    }

    GetPostById(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.ApiMiniblogUrl}/${id}`);
    }

    CreatePost(post: Post): Observable<Post> {
        return this.http.post<Post>(this.ApiMiniblogUrl, post);
    }

    UpdatePost(post: Post, id: number): Observable<void> {
        return this.http.put<void>(`${this.ApiMiniblogUrl}/${id}`, post);
    }

    DeletePost(id:number): Observable<void> {
        return this.http.delete<void>(`${this.ApiMiniblogUrl}/${id}`);
    }

}
