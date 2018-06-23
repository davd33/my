import {Point} from "./point";

/**
 * A set of two points that is going to be drawn.
 */
export class Line {

  private _lineWidth: number

  private readonly _color: string
  private readonly _opacity: number
  private readonly _originalOpacity: number

  constructor(public A: Point,
              public B: Point) {
    this._opacity = this._originalOpacity = 1
    this._color = `rgba(0,0,0,${this._opacity})`
    this._lineWidth = 1
  }

  public set lineWidth(v: number) {
    this._lineWidth = v
  }

  public get lineWidth(): number {
    return this._lineWidth
  }

  public get color(): string {
    return this._color
  }
}
