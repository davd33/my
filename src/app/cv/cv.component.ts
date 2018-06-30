import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  constructor(private titleSvc: Title) { }

  ngOnInit() {
    this.titleSvc.setTitle('David Rueda - Resumé')
  }

}
