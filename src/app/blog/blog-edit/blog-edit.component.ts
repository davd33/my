import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Markdown} from "../../classes/markdown";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  private _mdText = '# title'
  private _mdHTML = ''
  private _isPublished = false

  private _postId: string

  writeMode = true

  private readonly DEFAULT_MSG = 'New Post'
  _message: string = this.DEFAULT_MSG
  blinkingMsg = false

  private _adminLoggedIn = false

  @ViewChild('apercu') apercuEl: ElementRef

  constructor(private userSvc: UserService,
              private blogSvc: BlogService,
              private titleSvc: Title,
              private router: Router,
              private route: ActivatedRoute) {

    this.userSvc.isAdminLoggedIn
      .subscribe(r => {
        if (!r) return this.router.navigate(['/blog'])

        this._adminLoggedIn = r
      })
  }

  ngOnInit() {
    this.titleSvc.setTitle('David Rueda - Blog - Editing Post')

    // route id parameter
    this.route.paramMap
      .subscribe(params => {
        let id = params.get('id')
        if (id !== '-1') {
          this._postId = id
          this.blogSvc.getArticle(this._postId)
            .subscribe(r => {
              this._mdText = r.text
              this._isPublished = r.published
            })
        }
      })
  }

  togglePublish() {
    this.blogSvc.togglePublish(this._postId, this.isPublished)
      .subscribe(r => {
        if (r['nModified'] && r['ok']) {
          this._isPublished = !this._isPublished
        }
      })
  }

  get isPublished() {
    return this._isPublished;
  }

  get textareaClass() {
    return {
      'write-mode': this.writeMode,
      'see-mode': !this.writeMode
    }
  }

  get apercuClass() {
    return {
      'write-mode': this.writeMode,
      'see-mode': !this.writeMode
    }
  }

  toggleWriteMode() {
    this.writeMode = !this.writeMode
    if (!this.writeMode) this.updateApercu()
  }

  save() {
    this.blogSvc.editArticle(this._mdText, this._postId)
      .subscribe(r => {
        if ((r['ok'] === 1) || (r['result'] && r['result'].ok === 1)) {
          // document saved or modified
          if (r['insertedIds']) {
            this._postId = r['insertedIds'][0]
          }
          // display msg
          this._message = 'Post saved!';
          this.blinkingMsg = true
          setTimeout(() => {
            this._message = this.DEFAULT_MSG
            this.blinkingMsg = false
          }, 2000)
        }
      })
  }

  get message() {
    if (this._postId && this._message === this.DEFAULT_MSG)
      return `Post ID: ${this._postId}`

    return this._message
  }

  get messageClass() {
    return {
      'blinking-msg': this.blinkingMsg
    }
  }

  get mdText() {
    return this._mdText
  }

  set mdText(v: string) {
    this._mdText = v
  }

  updateApercu() {
    this.apercuEl.nativeElement.innerHTML = Markdown.toHTML(this._mdText)
  }

  get adminLoggedIn() {
    return this._adminLoggedIn
  }

}
