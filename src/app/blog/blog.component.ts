import { Component, OnInit } from '@angular/core';
import {Article} from "../classes/blog/article";
import {BlogService} from "../services/blog.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: Article[]

  constructor(private blogSvc: BlogService,
              private router: Router,
              private userSvc: UserService) { }

  ngOnInit() {
    this.blogSvc.allArticles.subscribe(articles => {
      this.articles = articles
    })
  }

  get adminLoggedIn() {
    return this.userSvc.isAdminLoggedIn
  }

  get noPostYet() {
    return !this.articles || this.articles.length === 0
  }

  createArticle() {
    this.router.navigate(['/blog-edit'])
  }

}
