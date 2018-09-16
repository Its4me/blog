import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = 'https://frozen-citadel-55909.herokuapp.com';

  tokenAuth: any;

  loader: boolean = false;

  constructor() { }
}
