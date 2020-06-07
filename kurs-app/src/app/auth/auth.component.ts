import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  login: String;
  password: String;
  timeout: Number = 3000;
  

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      login: this.login,
      password: this.password
    };

    if(user.password == undefined) {
      this.flashMessages.show("Enter password", {
        cssClass: "alert-danger",
        timeout: this.timeout
      });
      return false;
    }

    this.authService.authUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: "alert-danger",
          timeout: this.timeout
        });
      }
      else {
        this.flashMessages.show("You are successfully entered to dashboard", {
          cssClass: "alert-success",
          timeout: this.timeout
        });
        this.router.navigate(['dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }
}
