import { Injectable } from '@angular/core';
import { myError } from '../clasess/error';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = 'https://frozen-citadel-55909.herokuapp.com';

  tokenAuth: any;

  loader: boolean = false;

  client_error = new myError();

  constructor() { }
}
