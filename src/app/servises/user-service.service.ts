import { MainService } from './main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService, SignInData } from "angular2-token";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethod } from '@angular/http';
import { throttleTime } from 'rxjs/operators';

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

  current_user: User = new User();

  constructor(
    public http: HttpClient,
    public token: Angular2TokenService,
    public main: MainService
  ) { 
    this.token.init(environment.token_auth_config); 
  }

  public registerUser(user: User): Observable<any> {
    
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

  public findUser(user_name: string): Observable<any>{
 
    return this.http.get(`${this.main.url}/search?user=${user_name}`);
  }

  public getPosts(): Observable<any> {
 
    return this.token.request({
      method: RequestMethod.Get,
      url:    `${this.main.url}/posts`
       });
  }


  public getUser(id: string): Observable<any> {
    return this.http.get(`${this.main.url}/profiles/${id}`)
  }

  public exit_account(): Observable<any> {
    return this.token.signOut();
  }
 
  public subscribe(): Observable<any>{
    return this.token.get(`profiles/${this.user.id}/subscribe`);
  }
  public check_me(): boolean{
    return this.current_user.email == this.user.email;
  }
  public getSubscribers(): Observable<any>{
    return this.token.get('profiles/subscribes_list');
  }

  public upload_photo(photo:any): Observable<any>{

    const formData = new FormData();
    formData.append('avatar', 
                    photo, 
                    'any');

    return this.http.post(`${this.main.url}/auth`, formData);
  }
}
