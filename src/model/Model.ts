export interface AuthRequestData{
    email: string,
    password: string,
    returnSecureToken: boolean 
  } 
  
  export interface AuthResponseData{
    idToken: string,
    email: string, 
    refreshToken: string,
    expiresIn: string, 
    localId: string
    registered?: string
  }
  
  export class User{
    constructor(
        public email: string,
        public id: string, 
        private _token: string,
        private _tokenExpirationDate: Date
    ){}
  
    get token(){
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
  }

  export enum ErrorType {
    SUCCESS,
    DANGER,
    WARNING
  }