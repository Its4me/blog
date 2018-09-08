import { Injectable } from '@angular/core';
import { Post } from '../clasess/Post';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  posts: Post[] = [];

  constructor() { }
}
