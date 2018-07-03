import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmModalService} from "../services/confirm-modal.service";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  private _msg: string

  constructor(private route: ActivatedRoute,
              private confirmModalSvc: ConfirmModalService,
              private router: Router) {
    this.route.paramMap
      .subscribe(r => {
        this._msg = r.get('msg')
      })
    if (!this.confirmModalSvc.isBound) {
      this.router.navigate([{
        outlets: {
          modal: null
        }
      }])
    }
  }

  ngOnInit() {
  }

  get msg() {
    return this._msg
  }

  close(confirm) {
    this.confirmModalSvc.emit(confirm)
    this.router.navigate([{
      outlets: {
        modal: null
      }
    }])
  }

}
