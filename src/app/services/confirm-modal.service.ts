import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class ConfirmModalService {

  private _confirmed: Subject<boolean> = new Subject<boolean>()
  private _modalBound: boolean = false

  constructor() { }

  public emit(confirmed: boolean) {
    this._confirmed.next(confirmed)
  }

  public get isBound(): boolean {
    return this._modalBound
  }

  public unsubscribe() {
    if (this._modalBound) {
      this._modalBound = false
      this._confirmed.unsubscribe()
    }
  }

  public subscribe(cb) {
    if (!this._modalBound) {
      this._modalBound = true
      this._confirmed.subscribe(result => {
        cb(result)
      })
    }
  }
}
