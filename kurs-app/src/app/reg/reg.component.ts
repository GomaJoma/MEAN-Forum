import { Component, OnInit } from '@angular/core';
import { CheckFormService } from "../check-form.service";
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  login: String;
  email: String;
  password: String;
  timeout: Number = 3000;

  constructor(
     private checkForm: CheckFormService,
     private flashMessages: FlashMessagesService,
     private router: Router,
     private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  userRegistrClick() {
    const user = {
      login: this.login,
      email: this.email,
      password: this.password,
    };

    if (!this.checkForm.checkLogin(user.login)) {
      this.flashMessages.show("Not valid login", {
        cssClass: "alert-danger",
        timeout: this.timeout
      });
      return false;
    }else if (!this.checkForm.checkEmail(user.email)) {
      this.flashMessages.show("Not valid email", {
        cssClass: "alert-danger",
        timeout: this.timeout
      });
      return false;
    }else if (!this.checkForm.checkPassword(user.password)) {
      this.flashMessages.show("Not valid password", {
        cssClass: "alert-danger",
        timeout: this.timeout
      });
      return false;
    }

    this.authService.registrUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessages.show(data.message, {
          cssClass: "alert-danger",
          timeout: this.timeout
        });
        this.router.navigate(['/reg']);
      }
      else {
        this.flashMessages.show(data.message, {
          cssClass: "alert-success",
          timeout: this.timeout
        });
        this.router.navigate(['/auth']);

      }
    })
  }
}
