import {Point} from "./point";

export class MouseStatus {

  private _down: boolean
  private _downPos: Point

  constructor() {
    this._down = false
  }

  /**
   * The position of the mouse when down was triggered.
   * @returns {Point}
   */
  public get downPos(): Point {
    return this._downPos
  }

  public set downPos(v: Point) {
    this._downPos = v
  }

  public get isDown(): boolean {
    return this._down
  }

  public set isDown(v: boolean) {
    this._down = v
  }

}
