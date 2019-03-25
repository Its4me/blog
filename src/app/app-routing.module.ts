import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { NewsComponent } from './components/news/news.component';
import { FullPostComponent } from './components/full-post/full-post.component';
import { HeadersComponent } from './components/headers/headers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { 
    path: "", component: RegisterComponent, pathMatch: 'full',children: []
  },
  {
    path: "", component: HeadersComponent, children: [
      { path: "user/:id", component: UserPageComponent },
      { path: "news", component: NewsComponent},
      { path: "followers/:id", component: SubscribersComponent },
      { path: "following/:id", component: SubscribersComponent },
      { path: "edit-profile", component: EditProfileComponent }
    ]
  },
  
  { path: ":id", outlet: "post", component: FullPostComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
