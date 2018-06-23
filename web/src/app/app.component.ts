import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Sketch} from "./classes/animation/sketch";
import {MouseService} from "./services/mouse.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('canvasContainer') canvasContainer: ElementRef
  @ViewChild('cvContainer') cvContainer: ElementRef

  constructor(private mouseSvc: MouseService) {
  }

  ngOnInit() {
    new Sketch(this.canvasContainer)
  }
}
