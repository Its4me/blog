
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
import { OpenPostComponent } from './components/open-post/open-post.component';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MainService } from './servises/main.service';
import { PostServiceService } from './servises/post-service.service';
import { UserServiceService } from './servises/user-service.service';
import { AppComponent } from './app.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';
import { HeadersComponent } from './components/headers/headers.component';
import { PostComponent } from './components/post/post.component';
import { FullPostComponent } from './components/full-post/full-post.component';


@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    RegisterComponent,
    HeadersComponent,
    PostComponent,
    OpenPostComponent,
    FullPostComponent
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
    MatProgressBarModule
  ],
  providers: [
    UserServiceService,
    PostServiceService,
    Angular2TokenService,
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
