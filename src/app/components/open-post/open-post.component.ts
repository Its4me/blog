import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-post',
  templateUrl: './open-post.component.html',
  styleUrls: ['./open-post.component.scss']
})
export class OpenPostComponent implements OnInit {

  constructor(public postService: PostServiceService) { }

  ngOnInit() {
  }

}
