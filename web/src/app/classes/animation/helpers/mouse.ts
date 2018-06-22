import {Point} from "./point";
import {UtilFactory} from "./util-factory";
import {MapMetadata} from "../map-metadata";
import {P5} from "./p5";

export class Mouse {

  /**
   * Return new point expressed in meters.
   * @param p5
   * @param mapMetadata
   * @returns {Point}
   */
  public static posMeters(p5: P5, mapMetadata: MapMetadata): Point {
    let p = p5.instance
    let P = UtilFactory.newPoint(p.mouseX, p.mouseY)
    P.math.add(mapMetadata.movePixelTranslation)
    P.math.add(mapMetadata.pixelTranslation)
    return mapMetadata.posToMeters(P)
  }

  public static moveDeltaPixel(p5: P5, start: Point): Point {
    let p = p5.instance
    return UtilFactory.newPoint(
      start.x - p.mouseX,
      start.y - p.mouseY)
  }

  public static posPixels(p5: P5): Point {
    let p = p5.instance
    return UtilFactory.newPoint(p.mouseX, p.mouseY)
  }
}
