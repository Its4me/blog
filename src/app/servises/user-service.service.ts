import { MainService } from './main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Angular2TokenService, SignInData } from "angular2-token";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethod, Headers } from '@angular/http';

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

  userPhotoSrc: string = 'assets/user-photo.jpg';

  currentUserId = localStorage.getItem('current_user_id');

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
    return this.token.get(`/search?user=${user_name}`);
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

  public exitAccount(): Observable<any> {
    return this.token.signOut();
  }
 
  public subscribe(id: number = Number(this.user.id)): Observable<any>{
    return this.token.get(`profiles/${id}/subscribe`);
  }
  public check_me(): boolean{
    return localStorage.getItem('current_user_id') == this.user.id;
  }
  public getSubscribers(): Observable<any>{
    let id = this.user.id || this.currentUserId; // КОСТЫЛЬ
    return this.token.get(`profiles/${id}/subscriptions_list`);
  }
  public unsubscribe(id: number = Number(this.user.id)): Observable<any>{
    return this.token.get(`profiles/${id}/unsubscribe`);
  }
  public getFollowing(): Observable<any>{
    let id = this.user.id || this.currentUserId; // КОСТЫЛЬ
    return this.token.get(`profiles/${id}/subscribers_list`);
  }
  public getUserPhoto(src: string): string{
    return (src == null)? this.userPhotoSrc :  src;
  }
  public getRecommendation(): Observable<any>{
    return this.token.get(`profile/recommendations`)
  }
  public update_photo(photo: any, user: User = this.user): Observable<any>{
    const formData = new FormData();
    formData.append('avatar', 
                    photo, 
                    'avatar');
    let header: Headers = this.main.get_token();
    
    return this.token.request({
      method: RequestMethod.Put,
      url: `${this.main.url}/auth`,
      body: formData,
      headers: header
    });
  }

  public update_user(user: User, file: any): Observable<any>{
    const formData = new FormData();
    formData.append('avatar', 
                    file, 
                    'avatar');

    formData.append('nickname', user.nickname);
    formData.append('name', user.name);
    formData.append('lastname', user.lastname);
    formData.append('email', user.email);        
    let header: Headers = this.main.get_token();
    return this.token.request({
      method: RequestMethod.Put,
      url: `${this.main.url}/auth`,
      body: formData,
      headers: header
    }); 
  }

}
