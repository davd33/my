import {ElementRef} from "@angular/core";
import {DrawingFactory} from "./helpers/drawing-factory";
import {SketchFunc} from "./helpers/sketch-func";
import {P5} from "./helpers/p5";
import {Circle} from "./drawings/circle";
import {WindowService} from "../../services/window.service";

export class Sketch implements SketchFunc {

  private p5: P5
  private _factory: DrawingFactory
  private _shapes: Circle[]

  constructor(private readonly animationContainer: ElementRef,
              private readonly windowSvc: WindowService) {

    this.p5 = new P5(this)

    windowSvc.obs.subscribe(e => {
      this.resizeCanvas()
      this.init()
    })
  }

  private init() {
    this._factory = new DrawingFactory(this.p5)
    let p = this.p5.instance
    let radius = 100, w = p.width, h = p.height
    let nCircles = (w / radius) * (h / radius) * 4
    this._shapes = this._factory.newRandomShapes(nCircles, radius)
  }

  private createCanvas() {
    let container = this.animationContainer.nativeElement
    let canvas = this.p5.instance.createCanvas(container.clientWidth, container.clientHeight)
    canvas.parent(container)
  }

  private resizeCanvas() {
    let container = this.animationContainer.nativeElement
    this.p5.instance.resizeCanvas(container.clientWidth, container.clientHeight)
  }

  public sketchFunc(): (p: any) => void {

    const self: Sketch = this

    return p => {

      p.setup = function () {
        self.createCanvas()
        self.init()
      }

      p.draw = function () {
        p.rect(0, 0, p.width, p.height)
        self._shapes.forEach(s => {
          s.draw()
        })
      }
    }
  }
}
