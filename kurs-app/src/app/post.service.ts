import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: Http) { }

  getAllPosts() {
    return this.http.post('posts/allposts',{});
  }

  addPost(post) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(
      'add',
       post,
       {headers: headers}).pipe(map(res => res.json()));
  }

  deletePost(id) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    // console.log(id);
    return this.http.post('posts/delete', {id}, {headers: headers}).pipe(map(res => res.json()));
  }

  editPost(post) {
    // console.log("2",post);

    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    // console.log(id);
    return this.http.post('posts/edit', {post});
  }
}
