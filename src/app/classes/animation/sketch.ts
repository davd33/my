import {ElementRef} from "@angular/core";
import {DrawingFactory} from "./helpers/drawing-factory";
import {SketchFunc} from "./helpers/sketch-func";
import {P5} from "./helpers/p5";
import {Circle} from "./drawings/circle";

export class Sketch implements SketchFunc {

  private readonly p5: P5
  private _factory: DrawingFactory
  private _shapes: Circle[]

  constructor(private readonly animationContainer: ElementRef) {

    this.p5 = new P5(this)
  }

  public sketchFunc(): (p: any) => void {

    const self: Sketch = this

    return p => {

      p.setup = function () {
        // create canvas
        let container = self.animationContainer.nativeElement
        let canvas = p.createCanvas(container.clientWidth, container.clientHeight)
        canvas.parent(container)

        // create drawings
        self._factory = new DrawingFactory(self.p5)
        self._shapes = self._factory.newRandomShapes(1000)
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
