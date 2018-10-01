import { FullPostComponent } from './components/full-post/full-post.component';
import { HeadersComponent } from './components/headers/headers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "", component: RegisterComponent, pathMatch: 'full'},
  {path: "user", component: HeadersComponent, children: [
      { path: ":id", component: UserPageComponent},
      
  ]},
  
  { path: ":id", outlet:"post" ,component: FullPostComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
