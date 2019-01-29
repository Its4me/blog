import { Angular2TokenService } from 'angular2-token';
import { MainService } from './../../servises/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../servises/user-service.service';
import { Post } from '../../clasess/Post';
import { User } from '../../clasess/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @ViewChild('post_photo') post_photo: ElementRef;

  postText: string = '';

  postLoader: boolean = false;

  postImage: any = '';

  file: any = null;

  sub_string: string = 'Подписаться';

  subCount: number = 0;

  constructor(public userService: UserServiceService,
              public postService: PostServiceService,
              public router: Router,
              public main: MainService,
              public token: Angular2TokenService
              ) { }


  ngOnInit() {
    forkJoin(
      this.userService.getUser(this.router.url.slice(6)),
      this.postService.getPosts(Number(this.router.url.slice(6)))
    ).subscribe(
      ([res1, res2]) => {
        
        this.userService.user = new User(
          res1.user.email,
          res1.user.nickname,
          res1.user.name,
          res1.user.lastname
        );
        this.userService.user.id = res1.user.id; 
        this.userService.user.photoSrc = res1.user.avatar.url || this.userService.userPhotoSrc;
        this.subCount = res1.subscribe.length;                //user result
        
        let id = localStorage.getItem('current_user_id'); //check sub or no

        if(this.userService.user.id != id ){
          res1.subscribe.forEach(element => {
            if( element.user_id == id){
              this.sub_string = 'Отписка';
            }
          });
        }
        
        this.postService.posts = this.postService.get_data_post(res2); // posts result
      },
      err => {
        this.main.client_error.togle_error('Ошибка загрузки, обновите страницу'); //error
      }
    );

    this.router.events.subscribe(
      (e) =>{
        if(e instanceof NavigationEnd && e.url.slice(0,5) == '/user'){
          this.ngOnInit();
        }
      }
    );
  } 

  _add_post(){
    let post: Post = new Post(
      '',
      this.postText, 
      '',
      this.userService.user.id,
      new Date()
      );

      post.photo = this.file;
      
      if(!post.description && !post.photo){
        return;
      }
    this.postLoader = true;
    this.postService.addPost(post).subscribe(
      res => {
        let new_res = this.main.get_body(res);
        post.back_id = new_res.id;
        post.likes_count = new_res.likes_count;
        post.photo_src = new_res.image.url;
        this.postService.posts.unshift(post); 
        this.postText = '';
        this.post_photo.nativeElement.value = null;
       },
       err => {
         this.main.client_error.togle_error('Какая-то там ошибка), извините')
       },
       () =>{
        this.postLoader = false;
       }
    );
  }
  _subscribe(){
    if(this.sub_string == 'Подписаться'){
      this.userService.subscribe().subscribe(
        res => {
          this.sub_string = 'Отписка';
        },
        err => this.main.client_error.togle_error('Ошибка, увы')
      );
    }else{
      this.userService.unsubscribe().subscribe(
        res => {
         this.sub_string = 'Подписаться';
        },
        err => this.main.client_error.togle_error('Снова ошибка, простите')
      )
    }
    
    
  }
  _navigate_subscribers(){
    this.router.navigate(['followers']);
  }
  _upload_photo(e){
    this.file = e.target.files[0] || e.dataTransfer.files[0];
    let file =  new FileReader();
    file.readAsDataURL(this.file)
    file.onload = () =>{
      this.postImage = file.result;
      
    }
    
  }

  _update_photo(e){
    let file = e.target.files[0] || e.dataTransfer.files[0];
    this.userService.update_photo(file).subscribe(res => {
      let user = this.main.get_body(res).data;
      this.userService.user.photoSrc = user.avatar.url;
    },
    err => this.main.client_error.togle_error('Ошибка при загрузке фото')
    );
  }
  _delete_img(){
    this.postImage = null;
    this.post_photo.nativeElement.value = null;
    this.file = null;
  }
}
