import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService, SignInData } from "angular2-token";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";
import { User } from '../clasess/user';


export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url: string = 'https://frozen-citadel-55909.herokuapp.com';



  user: User = new User('email', 'Sanya_butilka_47', 'Тупоц ', 'из 63 ');

  tokenAuth: any;

  constructor(
    public http: HttpClient,
    public token: Angular2TokenService
  ) { 

    this.token.init(environment.token_auth_config);
  }

  public registerUser(user: User): Observable<any> {
    
    //return this.http.post(`${this.url}/users.json`, user, httpOptions);
    return this.token.registerAccount({
        email:                user.email,
        nickname:             user.nickname,
        name:                 user.name,
        lastname:             user.lastname,
        password:             user.password,
        passwordConfirmation: user.password
    })
  }
  public enterAccount(user: any): Observable<any> {
    //return this.http.post(`${this.url}/users/sign_in.json`, user, httpOptions); 
    return this.token.signIn({email: `${user.email}`, password: `${user.password}`});
 
  }

  public findUser(user_name: string): Observable<any> {
    return this.http.get(`${this.url}/search?user=${user_name}`);
  }


  public checkPosts(): Observable<any> {
    
    let hraders = {
      headers: new HttpHeaders({
        'access-token': this.tokenAuth[0],
        'client': this.tokenAuth[1],
        'expiry': this.tokenAuth[2],
        'uid': this.tokenAuth[3],
        'token-type': this.tokenAuth[4],
        'content-type': this.tokenAuth[5]
      })
    };
    
    return this.http.get(`${this.url}/posts`, hraders);
  }

}
