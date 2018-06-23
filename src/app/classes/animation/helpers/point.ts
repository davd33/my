import {P5} from "./p5";

export class PointMath {

  constructor(private readonly point: Point) { }

  public add(p: Point) {
    this.point.x += p.x
    this.point.y += p.y
  }

  public subtract(p: Point) {
    this.point.x -= p.x
    this.point.y -= p.y
  }
}

export class Point {

  private readonly _math: PointMath

  constructor(public x: number,
              public y: number) {

    this._math = new PointMath(this)
  }

  public get math() {
    return this._math
  }

  public distance(from: Point) {
    return Math.sqrt(
      Math.pow(this.x - from.x, 2) +
      Math.pow(this.y - from.y, 2)
    )
  }

  public static random(p5: P5): Point {
    let p = p5.instance
    return new Point(
      Math.random() * p.width,
      Math.random() * p.height)
  }
}
