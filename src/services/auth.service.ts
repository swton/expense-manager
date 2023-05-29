import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { AuthRequestData, AuthResponseData, User } from 'src/model/Model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }

  signup(authRequestData: AuthRequestData){
    return this.http.post<AuthResponseData>
    (environment.authUrl + 'signUp' + environment.apiKey, 
    {
        email:authRequestData.email,
        password: authRequestData.password,
        returnSecureToken: authRequestData.returnSecureToken 
    }
    ).
    pipe(
        catchError(this.handleError), 
        tap( resData => {
            this.handleAuthentication(resData.email, resData.localId
                , resData.idToken, +resData.expiresIn)
        })
    )
    ;
}

login(authRequestData: AuthRequestData){
    return this.http.post<AuthResponseData>
    (environment.authUrl + 'signInWithPassword' + environment.apiKey, 
        {
            email:authRequestData.email,
            password: authRequestData.password,
            returnSecureToken: authRequestData.returnSecureToken 
        }
    ).pipe(
        catchError(this.handleError), 
        tap( resData => {
            this.handleAuthentication(resData.email, resData.localId
                , resData.idToken, +resData.expiresIn)
        })
    );
}

autoLogin(){
    const userData: {
        email: string, 
        id: string, 
        _token: string, 
        _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    
    if(!userData){
        return;
    }

    const loadedUser = new User(userData.email, userData.id
        , userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
        this.userSubject.next(loadedUser);
        
        const experationDuration = new Date(userData._tokenExpirationDate).getTime() 
        - new Date().getTime();
        this.autoLogout(experationDuration)
    }
}

logout(){
  this.userSubject.next(null);
  localStorage.removeItem('userData')
  if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
  }
  this.tokenExpirationTimer = null;
  this.router.navigate(["/"]);
}

autoLogout(expirationDuration: number){
  this.tokenExpirationTimer = 
  setTimeout(() => {
      this.logout();
  }, expirationDuration);
}

private handleError(errorRes: HttpErrorResponse){
  let errorMsg = 'An unknow error occured!'
  if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMsg);
  }
  switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
          errorMsg = 'This email exists already';
          break;
      case 'OPERATION_NOT_ALLOWED':
          errorMsg = 'Password sign-in is disabled for this project';
          break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
      case 'EMAIL_NOT_FOUND':
          errorMsg = 'There is no user record corresponding to this identifier. The user may have been deleted';
          break;
      case 'INVALID_PASSWORD':
          errorMsg = 'The password is invalid or the user does not have a password';
          break;
      case 'USER_DISABLED':
          errorMsg = 'The user account has been disabled by an administrator';
          break;
      default:
          break;
  }
  return throwError(errorMsg);
}

private handleAuthentication(email: string, localId: string, token: string, expiresIn: number){
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, localId, token, expirationDate);
  this.userSubject.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));
}
}
