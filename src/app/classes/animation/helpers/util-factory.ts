import {Point} from "./point";
import {Line} from "./line";
import {MouseStatus} from "./mouse-status";

export class UtilFactory {

  public static newPoint(x: number, y: number): Point {
    return new Point(x, y)
  }

  public static newNullPoint(): Point {
    return UtilFactory.newPoint(0, 0)
  }

  public static newLine(A: Point, B: Point, lineWidth: number = 1): Line {
    let l = new Line(A, B)
    l.lineWidth = lineWidth
    return l
  }

  public static newMouseStatus(): MouseStatus {
    return new MouseStatus()
  }
}
