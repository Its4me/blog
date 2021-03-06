import { MainService } from './../../servises/main.service';
import { UserServiceService } from './../../servises/user-service.service';
import { User } from './../../clasess/user';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public userService: UserServiceService,
    public router:  Router,
    public main: MainService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  registerForm: FormGroup = this.formBuilder.group({
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
  
    'password': new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)])
    ),
    'password_confim': new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]))
  },{    validator: this.MustMatch('password', 'password_confim')  
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


  _register(): void {
    
    if (this.registerForm.invalid) { return; }
    let registerUser: User;
    registerUser = new User(
      this.registerForm.get("email").value,
      this.registerForm.get("nick").value,
      this.registerForm.get("name").value,
      this.registerForm.get("surname").value,
      this.registerForm.get("password").value,
      this.registerForm.get("password_confim").value,
    );

    this.userService.registerUser(registerUser)
      .subscribe(
        res => {
          this.main.loader = true;
          this.ititiall_user(res);
        },
        err => {
          let new_err = JSON.parse(err._body);
          this.main.clientError.togleError(
            new_err.errors.full_messages[0]
          );
          this.main.loader = false;          
        },
        () => {
          this.router.navigate([`user/${this.userService.user.id}`]);
          this.main.loader = false;
          localStorage.setItem('current_user_id', this.userService.user.id);
          this.userService.currentUserId = localStorage.getItem('current_user_id');
        });

  }

  _enter(): void {

    this.main.loader = true;
    let enterAccount = {
      email: this.enterForm.get('email').value,
      password: this.enterForm.get('password').value.toString()
      
    }

    let output: any;

    this.userService.enterAccount(enterAccount).subscribe(
      res => {
        this.ititiall_user(res);
      },
      err => {
        this.main.clientError.togleError(
          `Нет такой комбинации логина и пароля`
        );
        this.main.loader = false;
      },
      () => {
             
        this.router.navigate([`user/${this.userService.user.id}`]);
        this.main.loader = false;
        
        localStorage.setItem('current_user_id', this.userService.user.id);
        this.userService.currentUserId = localStorage.getItem('current_user_id');
      }
    )
  }

  private ititiall_user(res: any){
    let user = JSON.parse(res._body).data;

    this.userService.user = new User(
        user.email,
        user.nickname,
        user.name,
        user.lastname
    );
    this.userService.user.id = user.id;
  }

  public  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
