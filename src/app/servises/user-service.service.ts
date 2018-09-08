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

  url: string = 'http://localhost:3000';


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
}
 