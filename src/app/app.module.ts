import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MouseService} from "./services/mouse.service";
import {RouterModule} from "@angular/router";
import { CvComponent } from './cv/cv.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PersoWorksComponent } from './perso-works/perso-works.component';
import {WindowService} from "./services/window.service";

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    NotFoundComponent,
    PersoWorksComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [MouseService, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
