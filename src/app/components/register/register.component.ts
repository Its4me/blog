import { UserServiceService } from './../../servises/user-service.service';
import { User } from './../../clasess/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 



  diff_password: boolean = false;
  remember_me: boolean = false;


  constructor(
    public userService: UserServiceService
  ) { }

  ngOnInit(){
   
  }

  registerForm: FormGroup = new FormGroup({
    "email": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ])),
    "name": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "surname": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "nick": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "password": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)])
    ),
    "password_confim": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        ])
    ),

  });

  enterForm: FormGroup = new FormGroup({
    "email": new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.email,
      ])
    ),
    "password": new FormControl('', Validators.required)
  });



  fuck(){
    this.userService.checkPosts().subscribe(
      res => {
        console.log(res);
        
      }
    );
  }
  _register(): void {
    if(this.registerForm.invalid){return;}
    let registerUser: User;
    registerUser = new User(
      this.registerForm.get("email").value,
      this.registerForm.get("nick").value,
      this.registerForm.get("name").value,
      this.registerForm.get("surname").value,
      this.registerForm.get("password").value,
      this.registerForm.get("password_confim").value,
    );

      if(registerUser.password != registerUser.password_confirmation){
        this.diff_password= true;
        return;
      } else{
        this.diff_password = false;
      }

    

    let object = JSON.stringify({ user: registerUser });


    this.userService.registerUser(object)
      .subscribe(
        () => {
          console.log('done');
        });

  }

  _enter(): void {
    let enterAccount = {
      email: this.enterForm.get('email').value,
      password: this.enterForm.get('password').value,
      remember_me: this.remember_me
    }
    this.userService.enterAccount( JSON.stringify({user: enterAccount})).subscribe(
      () => {
        console.log('Лох на парах');
        
      }
      
    )
    

  }

   



}
