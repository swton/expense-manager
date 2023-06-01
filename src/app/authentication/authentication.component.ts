import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequestData, AuthResponseData, ErrorType } from 'src/model/Model';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showError: boolean = false;
  title: string = 'Login';
  errType: ErrorType;
  errMsg: string;
  showLoading: boolean = false;
  showLogin: boolean = true;
  authReq: AuthRequestData = null;
  authResponseData: AuthResponseData = null;
  registerForm: FormGroup;
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
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
        this.errMsg = err;
        this.errType = ErrorType.DANGER;
        this.showLoading = false;
        this.showError = true;
      }, complete: () => {
        this.showLoading = false;
        this.showError = false;
        this.router.navigate(['home']);
      }
    })
  }

  goToPage(showLogin: boolean) {
    this.showError = false;
    showLogin ? this.title = 'Login' : this.title = 'Sign Up';
    return this.showLogin = showLogin;
  }

  onRegister() {
    this.showError = false;
    this.showLoading = true;
    this.authReq = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      returnSecureToken: true
    }

    this.authService.signup(this.authReq).subscribe({
      next: (response) => {
        this.errMsg = 'Account Successfully Created';
        this.errType = ErrorType.SUCCESS;
      }, error: (err) => {
        this.errMsg = err;
        this.errType = ErrorType.DANGER;
        this.showLoading = false;
        this.showError = true;
      }, complete: () => {
        this.showLoading = false;
      }
    })
  }

}
