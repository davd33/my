import {P5} from "./p5";
import {Shape} from "../drawings/shape";
import {Point} from "./point";

export class DrawingFactory {

  constructor(private readonly p5: P5) {
  }

  private newRandomShape(): Shape {
    let s = new Shape(this.p5, Point.random(this.p5))
    let n = Math.random() * (10 - 3) + 3
    for (let i = 0; i < n; i++) {
      s.addPoint(Point.random(this.p5))
    }
    return s
  }

  public newRandomShapes(n: number): Shape[] {
    let shapes: Shape[] = []
    for (let i = 0; i < n; i++) {
      shapes.push(this.newRandomShape())
    }
    return shapes
  }

}
