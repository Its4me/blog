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

  subString: string = 'Подписаться';

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
        this.initPage();
      }
     });
  }

   
  initPage(){
    let srcUser =  this.router.url.match(/[0-9]{1,}/g)[0];
    forkJoin(
      this.userService.getUser(srcUser),
      this.postService.getPosts(Number(srcUser))
    ).subscribe(
      ([res1, res2]) => {

        this.subString = 'Подписаться';

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
          for (let i = 0; i < res1.subscriptions.length; i++) {
            if( res1.subscriptions[i].user_id == id){
              this.subString = 'Отписка';
              break;
            }   
          }
        }
        
        this.postService.posts = this.postService.getDataPost(res2); // posts result
      },
      err => {
        this.main.clientError.togleError('Ошибка загрузки, обновите страницу'); //error
      }
    );
  }
  _addPost(){
    let post: Post = new Post(
      '',
      this.postText.trim(), 
      '',
      this.userService.user.id,
      new Date()
      );

      post.photo = this.file;
      post.ownerNick = this.userService.user.nickname;
      post.ownerPhoto = this.userService.user.photoSrc;
      if(!post.description && !post.photo){
        return;
      }
    this.postLoader = true;
    this.postService.addPost(post).subscribe(
      res => {
        let new_res = this.main.getBody(res);
        post.back_id = new_res.id;
        post.likes_count = new_res.likes_count;
        post.photo_src = new_res.image.url;
        this.postService.posts.unshift(post); 
        this.postText = '';
        this.post_photo.nativeElement.value = null;
        this.postLoader = false;
        this.postImage = false;
        this._deleteImg();
       },
       err => {
         this.main.clientError.togleError('Какая-то там ошибка), извините');
         this.postLoader = false;
       }
    );
  }
  _subscribe(){
    if(!this.userService.currentUserId){
      this.main.clientError.togleError('Сначала войдите');
    } else{
      if(this.subString == 'Подписаться'){
        this.userService.subscribe().subscribe(
          res => {
            this.subString = 'Отписка';
            this.subCount += 1;
          },
          err => this.main.clientError.togleError('Ошибка, увы')
        );
      }else{
        this.userService.unsubscribe().subscribe(
          res => {
           this.subString = 'Подписаться';
           this.subCount -= 1;
          },
          err => this.main.clientError.togleError('Снова ошибка, простите')
        )
      }
    }
  }
  
  _navigateFollower(){
    this.router.navigate([`following/${this.userService.user.id}`]);
  }
  _navigateSubscribers(){
    this.router.navigate([`followers/${this.userService.user.id}`]); 
  }
  _uploadPhoto(e){
    this.file = e.target.files[0] || e.dataTransfer.files[0];
    let file =  new FileReader();
    file.readAsDataURL(this.file)
    file.onload = () =>{
      this.postImage = file.result;
      
    }
    
  }

  _updatePhoto(e){
    let file = e.target.files[0] || e.dataTransfer.files[0];
    
    this.userService.updatePhoto(file).subscribe(res => {
      let user = this.main.getBody(res).data;
      this.userService.user.photoSrc = user.avatar.url;
    },
    err => this.main.clientError.togleError('Ошибка при загрузке фото')
    );
  }
  _deleteImg(){
    this.postImage = null;
    this.post_photo.nativeElement.value = null;
    this.file = null;
  }
}
