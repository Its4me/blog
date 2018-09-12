import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../clasess/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url: string = 'https://boiling-gorge-94174.herokuapp.com';


  user: User = new User('email','Sanya_butilka_47','Тупоц ', 'из 63 ');


  constructor(
    public http: HttpClient
  ) { }

  public registerUser(user): Observable<any>{
    return this.http.post(`${this.url}/users.json`, user, httpOptions);
  }
  public enterAccount(user): Observable<any>{
    return this.http.post(`${this.url}/users/sign_in.json`, user, httpOptions);
  }

  public findUser(user_name: string): Observable<any>{
    return this.http.get(`${this.url}/profiles/search?${user_name}`)
  }
  public checkPosts(): Observable<any>{
    return this.http.get(`${this.url}/posts.json`)
  }
}
 