import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";

@Injectable()
export class MouseService {

  private readonly _scroll: Subject<any>
  private readonly _move: Subject<any>
  private readonly _down: Subject<any>
  private readonly _up: Subject<any>
  private readonly _wheel: Subject<any>

  constructor() {
    this._scroll = new Subject<any>()
    this._move = new Subject<any>()
    this._down = new Subject<any>()
    this._up = new Subject<any>()
    this._wheel = new Subject<any>()
  }

  get wheel(): Subject<any> {
    return this._wheel
  }

  get up(): Subject<any> {
    return this._up
  }

  get down(): Subject<any> {
    return this._down
  }

  get move(): Subject<any> {
    return this._move
  }

  get scroll(): Subject<any> {
    return this._scroll;
  }

}
