import { CoreModule } from './core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';
import { HeadersComponent } from './components/headers/headers.component';
import { PostComponent } from './components/post/post.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { NewsComponent } from './components/news/news.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { AppRoutingModule } from './app-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SharedModule } from './shared/shared.module';




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
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
