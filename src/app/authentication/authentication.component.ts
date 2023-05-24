import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestData, AuthResponseData } from 'src/model/Model';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  title: string = 'Login';
  showLoading: boolean = false;
  showLogin: boolean = true;
  authReq: AuthRequestData = null;
  authResponseData: AuthResponseData = null;
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
  });
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.showLoading = true;
    this.authReq = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true
    }
    this.authService.login(this.authReq).subscribe({
      next: (response) => {
      }, error: (err) => {
        this.showLoading = false;
      }, complete: () => {
        this.showLoading = false;
        this.router.navigate(['home']);
      }
    })
  }

  goToPage(showLogin: boolean) {
    showLogin ? this.title = 'Login' : this.title = 'Sign Up';
    return this.showLogin = showLogin;
  }

  onRegister() {
    this.showLoading = true;
    this.authReq = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      returnSecureToken: true
    }

    this.authService.signup(this.authReq).subscribe({
      next: (response) => {
        console.log(response);
      }, error: (err) => {
        console.log(err);
        this.showLoading = false;
      }, complete: () => {
        this.showLoading = false;
      }
    })
  }

}
