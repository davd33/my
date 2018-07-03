import { Component, OnInit } from '@angular/core';
import {Article} from "../classes/blog/article";
import {BlogService} from "../services/blog.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Markdown} from "../classes/markdown";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: any[]

  noPostsOrLoading = 'Loading...'

  constructor(private blogSvc: BlogService,
              private router: Router,
              private userSvc: UserService) { }

  ngOnInit() {
    this.blogSvc.allArticles.subscribe(articles => {
      this.articles = articles
      this.noPostsOrLoading = 'No post yet...'
    })
  }

  getHTML(text) {
    return Markdown.toHTML(text)
  }

  get adminLoggedIn() {
    return this.userSvc.isAdminLoggedIn
  }

  get noPostYet() {
    return !this.articles || this.articles.length === 0
  }

  createArticle() {
    this.router.navigate(['/blog-edit', -1])
  }

  delete(id: string) {
    this.blogSvc.delete(id)
      .subscribe(result => {
        if (result.ok === 1 && result.n === 1) {
          // document has been removed
          this.articles = this.articles.filter(a => a._id !== id)
        }
      })
  }

  edit(id: string) {
    this.router.navigate(['/blog-edit', id])
  }

}
