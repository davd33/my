import { Component, OnInit } from '@angular/core';
import {Article} from "../classes/blog/article";
import {BlogService} from "../services/blog.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Markdown} from "../classes/markdown";
import {Title} from "@angular/platform-browser";
import {ConfirmModalService} from "../services/confirm-modal.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: any[] = []

  private readonly LOADING_STR = 'Loading...'
  noPostsOrLoading = this.LOADING_STR

  constructor(private blogSvc: BlogService,
              private confirmModalSvc: ConfirmModalService,
              private titleSvc: Title,
              private router: Router,
              private userSvc: UserService) { }

  ngOnInit() {
    this.titleSvc.setTitle('David Rueda - Blog')

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

  get loading() {
    return this.noPostsOrLoading === this.LOADING_STR
  }

  get noPublishedPostYet() {
    let nPublishedPosts = 0
    for (let i = 0; i < this.articles.length; i++) {
      let a = this.articles[i]
      if (a.published) {
        nPublishedPosts++
        break
      }
    }
    return !this.articles || nPublishedPosts === 0
  }

  get noPostYet() {
    return !this.articles || this.articles.length === 0
  }

  createArticle() {
    this.router.navigate(['/blog-edit', -1])
  }

  delete(id: string) {
    this.router.navigate([{
      outlets: {
        'modal': ['confirm', 'Do you really want to delete this post?']
      }
    }])
    this.confirmModalSvc.subscribe(actionConfirmed => {
      if (actionConfirmed) {
        this.confirmModalSvc.unsubscribe()
        this.blogSvc.delete(id)
          .subscribe(result => {
            if (result.ok === 1 && result.n === 1) {
              // document has been removed
              this.articles = this.articles.filter(a => a._id !== id)
            }
          })
      }
    })
  }

  edit(id: string) {
    this.router.navigate(['/blog-edit', id])
  }

}
