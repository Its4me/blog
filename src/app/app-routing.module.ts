import { HeadersComponent } from './components/headers/headers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './components/user-page/user-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "", component: HeadersComponent, children: [
      { path: "userPage", component: UserPageComponent }
  ]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
