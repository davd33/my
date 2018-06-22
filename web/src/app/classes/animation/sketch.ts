import {ElementRef} from "@angular/core";
import {DrawingFactory} from "./helpers/drawing-factory";
import {SketchFunc} from "./helpers/sketch-func";
import {P5} from "./helpers/p5";
import {Shape} from "./drawings/shape";

export class Sketch implements SketchFunc {

  private readonly p5: P5
  private _factory: DrawingFactory
  private _shapes: Shape[]

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
        self._shapes = self._factory.newRandomShapes(p.width * p.height * .1)
        console.log(self._shapes)
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
