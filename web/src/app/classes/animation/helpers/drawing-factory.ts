import {P5} from "./p5";
import {Circle} from "../drawings/circle";
import {Point} from "./point";
import {Color} from "../../helpers/color";

export class DrawingFactory {

  constructor(private readonly p5: P5) {
  }

  private newCircleShape(): Circle {
    return new Circle(this.p5, Color.random(), Point.random(this.p5))
  }

  public newRandomShapes(n: number): Circle[] {
    let shapes: Circle[] = []
    for (let i = 0; i < n; i++) {
      shapes.push(this.newCircleShape())
    }
    return shapes
  }

}
