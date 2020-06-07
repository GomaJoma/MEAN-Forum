import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

import { PostService } from "../post.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  header: String;
  content: String;
  public posts: object[];
  timeout: Number = 3000;

  isEditFieldShown: Boolean;
  editFieldId: String;
  editedHeader: String;
  editedContent: String;

  constructor(
        public authService: AuthService,
        private flashMessages: FlashMessagesService,
        private router: Router,
        private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.isEditFieldShown = false;
  }

  sharePost() {
    const post = {
      header: this.header,
      content: this.content,
      // sender: User.getUserById
    }
    // console.log(post);

    this.postService.addPost(post).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: "alert-danger",
          timeout: this.timeout
        });
        // this.router.navigate(['/reg']);
      }
      else {
        this.flashMessages.show(data.message, {
          cssClass: "alert-success",
          timeout: this.timeout
        });
        this.getPosts();
      }
    });
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(res => {
      res = JSON.parse(res['_body']);
      // console.log(res);
      this.posts = res['data'];
    });
  }

  replacePostByEditForm(post) {
    this.isEditFieldShown = !this.isEditFieldShown;
    this.editFieldId = post._id;
    this.editedHeader = post.header;
    this.editedContent = post.content;
    console.log("Header :" + post.header);
  }

  cancelNewChanges() {
    this.isEditFieldShown = !this.isEditFieldShown;
  }

  editPost(id) {
    const newPost = {
      id: id,
      header: this.editedHeader,
      content: this.editedContent
    }
    // console.log("1",post);
    this.postService.editPost(newPost).subscribe(res => {
      this.getPosts();
    });
    this.isEditFieldShown = !this.isEditFieldShown;
  }

  deletePost(id) {
    this.postService.deletePost(id).subscribe(res => {
      this.getPosts();
    });
  }
}
