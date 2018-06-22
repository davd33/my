import {Sketch} from "./sketch";
import {ElementRef} from "@angular/core";

export class CanvasControls {

  private _animation: Sketch

  constructor(private readonly _controlsContainer: ElementRef) {}

  public get controlsContainer(): ElementRef {
    return this._controlsContainer
  }

  public set animation(animation: Sketch) {
    this._animation = animation
  }

  public get animation(): Sketch {
    return this._animation
  }
}
