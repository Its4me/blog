import { Angular2TokenService } from 'angular2-token';
import { MainService } from './../../servises/main.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../servises/user-service.service';
import { Post } from '../../clasess/Post';
import { User } from '../../clasess/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  
})
export class  UserPageComponent implements OnInit {
  @ViewChild('post_photo') post_photo: ElementRef;

  postText: string = '';

  postLoader: boolean = false;

  postImage: any = '';

  file: any = null;

  sub_string: string = 'Подписаться';

  subCount: number = 0;

  follower: number = 0;

  constructor(public userService: UserServiceService,
              public postService: PostServiceService,
              public router: Router,
              public main: MainService,
              public token: Angular2TokenService,
              public activatedRouter: ActivatedRoute
              ) { }


  ngOnInit() {
    this.activatedRouter.params.subscribe(params => { 
      if(params.id){
        this.init_page();
      }
     });
  }

   
  init_page(){
    let srcUser =  this.router.url.match(/[0-9]{1,}/g)[0];
    forkJoin(
      this.userService.getUser(srcUser),
      this.postService.getPosts(Number(srcUser))
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
        this.subCount = res1.subscriptions.length;                
        this.follower = res1.subscribers_count;           //user result
                                                          
        let id = localStorage.getItem('current_user_id'); //check sub or no

        if(this.userService.user.id != id ){
          res1.subscriptions.forEach(element => {
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
      post.owner_nick = this.userService.user.nickname;
      post.owner_photo = this.userService.user.photoSrc;
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
        this.postLoader = false;
        this.postImage = false;
        this._delete_img();
       },
       err => {
         this.main.client_error.togle_error('Какая-то там ошибка), извините');
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
  _navigate_follower(){
    this.router.navigate(['following']);
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
