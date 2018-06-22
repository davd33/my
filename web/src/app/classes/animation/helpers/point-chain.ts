import {Point} from "./point";
import {Line} from "./line";
import {UtilFactory} from "./util-factory";

/**
 * A set of points in a chained structure that
 * indicates the order to follow to draw lines between them.
 */
export class PointChain {

  private prev: PointChain
  private next: PointChain

  private _closeContour: boolean

  constructor(private point: Point) {
  }

  /**
   * Returns true if it exists another point in the chain.
   * @returns {boolean}
   */
  private hasNext(): boolean {
    return !!this.next
  }

  /**
   * Add a point at the end of the chain.
   * @param {Point} p
   */
  public addPoint(p: Point) {
    if (!this.next) {
      this.next = new PointChain(p)
      this.next.prev = this
    } else {
      this.next.addPoint(p)
    }
  }

  /**
   * Returns the first point in the chain.
   * @returns {any}
   */
  private getFirstPointChain(): PointChain {
    if (!this.prev) {
      return this
    } else {
      return this.prev.getFirstPointChain()
    }
  }

  /**
   * Returns the last point in the chain.
   * @returns {PointChain}
   */
  private getLastPointChain(): PointChain {
    if (!this.next) {
      return this
    } else {
      return this.next.getLastPointChain()
    }
  }

  /**
   * Whether or not to generate a last line
   * that connect the last point in the chain with the first.
   * @returns {boolean}
   */
  public get closeContour(): boolean {
    return this._closeContour
  }

  public set closeContour(v: boolean) {
    this._closeContour = v
  }

  /**
   * Get all the lines between each point of the chain.
   */
  public getAllLines(lineWidth?: number): Line[] {
    let pc: PointChain = this.getFirstPointChain()
    let lastPc: PointChain = undefined
    let allLines: Line[] = []

    while (pc.hasNext()) {

      if (lastPc)
        allLines.push(UtilFactory.newLine(lastPc.point, pc.point, lineWidth))

      if (pc.hasNext()) {
        lastPc = pc
        pc = pc.next
      }
    }

    if (lastPc) allLines.push(UtilFactory.newLine(lastPc.point, pc.point, lineWidth))
    if (this.closeContour) {
      let first = this.getFirstPointChain()
      let last = this.getLastPointChain()
      if (first !== last)
        allLines.push(UtilFactory.newLine(last.point, first.point, lineWidth))
    }

    return allLines
  }
}
