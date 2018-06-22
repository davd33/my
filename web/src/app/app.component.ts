import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Sketch} from "./classes/animation/sketch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('canvasContainer') canvasContainer: ElementRef

  ngOnInit() {
    new Sketch(this.canvasContainer)
  }
}
