import {SketchFunc} from "./sketch-func";

declare var p5

export class P5 {

  private readonly _instance

  constructor(private sketch: SketchFunc) {
    this._instance = new p5(sketch.sketchFunc())
  }

  public get instance(): any {
    return this._instance
  }
}
