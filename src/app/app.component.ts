import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Sketch} from "./classes/animation/sketch";
import {MouseService} from "./services/mouse.service";
import {WindowService} from "./services/window.service";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('canvasContainer') canvasContainer: ElementRef
  @ViewChild('cvContainer') cvContainer: ElementRef

  constructor(private mouseSvc: MouseService,
              private windowSvc: WindowService,
              private router: Router,
              private userSvc: UserService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(e) {
    this.windowSvc.obs.next(e)
  }

  ngOnInit() {
    new Sketch(this.canvasContainer, this.windowSvc)
  }

  logout() {
    this.userSvc.logout()
    this.router.navigate(['/login'])
  }

  get userName(): string {
    return this.userSvc.user.username
  }

  get isUserLoggedIn(): boolean {
    return this.userSvc.isLoggedIn
  }
}
