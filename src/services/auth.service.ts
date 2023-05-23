import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface UserData {
  email: string,
  password: string,
  full_name?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerAccount(request: UserData) {
    return this.http.post(environment.apiUrl + 'user.json', {
        email: request.email,
        password: request.password,
        full_name: request.full_name,
    });
  }

  login(request: UserData) {
    return this.http.get(environment.apiUrl + 'user.json');
  }

  checkEmail() {

  }
}
