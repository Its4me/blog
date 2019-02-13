import { AsideComponent } from './../components/aside/aside.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { A2tUiModule } from 'angular2-token';
import { MatMenuModule } from '@angular/material/menu';
// swiper(slider)
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  imports: [
    CommonModule,
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
    MatSidenavModule,
    MatMenuModule
  ],
  declarations: [
    AsideComponent
  ],
  exports: [
    CommonModule,
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
    MatSidenavModule,
    AsideComponent,
    MatMenuModule
  ],
 
})
export class SharedModule { }
