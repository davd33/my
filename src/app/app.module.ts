import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MouseService} from "./services/mouse.service";
import {RouterModule} from "@angular/router";
import { CvComponent } from './cv/cv.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
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
  providers: [MouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
