import {Drawing} from "../drawing";
import {P5} from "../helpers/p5";
import {Point} from "../helpers/point";

export class Circle implements Drawing {

  constructor(private readonly p5: P5,
              private readonly color: string,
              private readonly center: Point) {
  }

  public draw() {
    let p = this.p5.instance

    p.noStroke()
    p.fill(this.color)
    p.ellipse(this.center.x, this.center.y, 100, 100)
  }
}
