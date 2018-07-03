import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MouseService} from "./services/mouse.service";
import {RouterModule} from "@angular/router";
import { CvComponent } from './cv/cv.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersoWorksComponent } from './perso-works/perso-works.component';
import {WindowService} from "./services/window.service";
import { TransportSpeedCalculatorComponent } from './permaculture/transport-speed-calculator/transport-speed-calculator.component';
import { BlogComponent } from './blog/blog.component';
import {BlogService} from "./services/blog.service";
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import {UserService} from "./services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    NotFoundComponent,
    PersoWorksComponent,
    TransportSpeedCalculatorComponent,
    BlogComponent,
    LoginComponent,
    BlogEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'personal-works',
        component: PersoWorksComponent
      },
      {
        path: 'cv',
        component: CvComponent
      },
      {
        path: 'permaculture/transports/speed-calculator',
        component: TransportSpeedCalculatorComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog-edit/:id',
        component: BlogEditComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        redirectTo: '/cv',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [MouseService, WindowService, BlogService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
