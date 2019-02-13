import { Angular2TokenService } from 'angular2-token';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { myError } from '../clasess/error';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = 'https://frozen-citadel-55909.herokuapp.com';

  loader: boolean = false;

  clientError = new myError();

  currentUserId: string = '';

  constructor(
    public token: Angular2TokenService
  ) { }


  public getBody(body: any): any{
    return JSON.parse(body._body); 
  }
 
  public getToken(): Headers{
    let header = new Headers();
    header.append('access-token', this.token.currentAuthData.accessToken);
    header.append('client', this.token.currentAuthData.client);
    header.append('expiry', this.token.currentAuthData.expiry);
    header.append('tokenType', this.token.currentAuthData.tokenType);
    header.append('uid', this.token.currentAuthData.uid);
    return header;
  }
}
