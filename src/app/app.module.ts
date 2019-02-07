
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MainService } from './servises/main.service';
import { PostServiceService } from './servises/post-service.service';
import { UserServiceService } from './servises/user-service.service';
import { AppComponent } from './app.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';
import { HeadersComponent } from './components/headers/headers.component';
import { PostComponent } from './components/post/post.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { NewsComponent } from './components/news/news.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

// swiper(slider)
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AsideComponent } from './components/aside/aside.component';


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
  declarations: [
    AppComponent,
    UserPageComponent,
    RegisterComponent,
    HeadersComponent,
    PostComponent,
    FullPostComponent,
    NewsComponent,
    SubscribersComponent,
    EditProfileComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    A2tUiModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    SwiperModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
