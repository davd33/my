import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {Markdown} from "../../classes/markdown";

@Component({
  selector: 'app-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  private _mdText = '# title'
  private _mdHTML = ''

  writeMode = true

  private readonly DEFAULT_MSG = 'New Post'
  message: string = this.DEFAULT_MSG
  blinkingMsg = false

  @ViewChild('apercu') apercuEl: ElementRef

  constructor(private userSvc: UserService,
              private blogSvc: BlogService,
              private router: Router) { }

  ngOnInit() {
    if (!this.userSvc.isAdminLoggedIn) return this.router.navigate(['/blog'])

    this.updateApercu()
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
    this.blogSvc.editArticle(this._mdText)
      .subscribe(result => {
        if (result.result.ok === 1) {
          // document saved
          this.message = 'Post saved!'
          this.blinkingMsg = true
          setTimeout(() => {
            this.message = this.DEFAULT_MSG
            this.blinkingMsg = false
          }, 2000)
        }
      })
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
    return this.userSvc.isAdminLoggedIn
  }

}
