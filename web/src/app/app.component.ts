import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Sketch} from "./classes/animation/sketch";
import {MouseService} from "./services/mouse.service";
import {until} from "selenium-webdriver";
import titleContains = until.titleContains;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private titleFixed: boolean

  @ViewChild('canvasContainer') canvasContainer: ElementRef
  @ViewChild('cvContainer') cvContainer: ElementRef

  constructor(private mouseSvc: MouseService) {
    this.titleFixed = false
  }

  ngOnInit() {
    new Sketch(this.canvasContainer)
  }

  get titleClasses() {
    return {
      'fixed-title': this.titleFixed
    }
  }
}
