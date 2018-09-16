import { MainService } from './main.service';
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

  user: User = new User();

  constructor(
    public http: HttpClient,
    public token: Angular2TokenService,
    public main: MainService
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
    return this.token.signIn({email: `${user.email}`,
                              password: `${user.password}`
                            });
 
  }

  public findUser(user_name: string): Observable<any> {
    return this.http.get(`${this.main.url}/search?user=${user_name}`);
  }

  public checkPosts(): Observable<any> {

    let headers = {
      headers: new HttpHeaders({
        'access-token': this.main.tokenAuth[0],
        'client': this.main.tokenAuth[1],
        'expiry': this.main.tokenAuth[2],
        'uid': this.main.tokenAuth[3],
        'token-type': this.main.tokenAuth[4],
        'content-type': this.main.tokenAuth[5]
      })
    };
    
    return this.http.get(`${this.main.url}/posts`, headers);
  }

}
