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

  constructor() { }


  public get_body(body: any): any{
    return JSON.parse(body._body); 
  }
 
}
