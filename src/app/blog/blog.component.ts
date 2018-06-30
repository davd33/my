import { Component, OnInit } from '@angular/core';
import {Article} from "../classes/blog/article";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: Article[]

  constructor() { }

  ngOnInit() {
  }

}
