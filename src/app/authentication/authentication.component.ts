import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { UserData } from './../../services/auth.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showLoading: boolean = false;
  showLogin: boolean = true;
  userData: UserData = {
    email: '',
    password: '',
    full_name: ''
  };
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
    fullName: new FormControl(''),
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.showLoading = true;
    setTimeout(() => {
      this.showLoading = false;
    }, 2000)
  }

  goToPage(showLogin: boolean) {
    return this.showLogin = showLogin;
  }

  onRegister() {
    this.showLoading = true;

    this.userData.email = this.registerForm.value.email;
    this.userData.password = this.registerForm.value.password;
    this.userData.full_name = this.registerForm.value.fullName;
    this.authService.registerAccount(this.userData).subscribe({
      next: (response) => {
        console.log(response);
        
      }, error: () => {

      }, complete: () => {
        this.showLoading = false;
      }
    })
  }

}
