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

  client_error = new myError();

  current_user_id: string = '';

  constructor(
    public token: Angular2TokenService
  ) { }


  public get_body(body: any): any{
    return JSON.parse(body._body); 
  }
 
  public get_token(): Headers{
    let header = new Headers();
    header.append('access-token', this.token.currentAuthData.accessToken);
    header.append('client', this.token.currentAuthData.client);
    header.append('expiry', this.token.currentAuthData.expiry);
    header.append('tokenType', this.token.currentAuthData.tokenType);
    header.append('uid', this.token.currentAuthData.uid);
    return header;
  }
}
