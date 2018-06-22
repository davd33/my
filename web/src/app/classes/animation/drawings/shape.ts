import {Drawing} from "../drawing";
import {PointChain} from "../helpers/point-chain";
import {Line} from "../helpers/line";
import {P5} from "../helpers/p5";
import {Point} from "../helpers/point";

export class Shape implements Drawing {

  private _points: PointChain

  constructor(private p5: P5,
              point:  Point) {

    this._points = new PointChain(point)
  }

  public addPoint(p: Point) {
    this._points.addPoint(p)
  }

  public draw() {
    let p = this.p5.instance

    this._points.closeContour = true
    let lines: Line[] = this._points.getAllLines()
    for (let i = 0; i < lines.length; i++) {
      let line: Line = lines[i]
      p.stroke(line.color)
      p.line(line.A.x, line.A.y, line.B.x, line.B.y)
    }
  }
}
