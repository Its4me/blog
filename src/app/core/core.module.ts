import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Angular2TokenService } from 'angular2-token';
import { SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MainService } from '../servises/main.service';
import { PostServiceService } from '../servises/post-service.service';
import { UserServiceService } from '../servises/user-service.service';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  speed: 600,
  direction: 'horizontal',
  slidesPerView: 3,
  navigation: { 
    nextEl: '.next',
    prevEl: '.prev',
  }
};

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserServiceService,
    PostServiceService,
    Angular2TokenService,
    MainService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  declarations: []
})
export class CoreModule { }
