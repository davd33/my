import {Point} from "./helpers/point";
import {P5} from "./helpers/p5";
import {UtilFactory} from "./helpers/util-factory";

export class MapMetadata {

  private _metersPerUnit: number
  private _unit: number
  private _meterUnit: number
  private _movePixelTranslation: Point
  private _pixelTranslation: Point

  constructor(private p5: P5) {
    this.pixelTranslation = UtilFactory.newNullPoint()
    this.movePixelTranslation = UtilFactory.newNullPoint()
  }

  public get movePixelTranslation(): Point {
    return this._movePixelTranslation
  }

  public set movePixelTranslation(v: Point) {
    this._movePixelTranslation = v
  }

  private updateMeterUnit() {
    this._meterUnit = this.unit / this.metersPerUnit
  }

  public get pixelTranslation(): Point {
    return this._pixelTranslation
  }

  public set pixelTranslation(v: Point) {
    this._pixelTranslation = v
  }

  private get meterUnit(): number {
    return this._meterUnit
  }

  public get metersPerUnit(): number {
    return this._metersPerUnit
  }

  public set metersPerUnit(v: number) {
    this._metersPerUnit = v
    this.updateMeterUnit()
  }

  public get unit(): number {
    return this._unit
  }

  public set unit(v: number) {
    this._unit = v
    this.updateMeterUnit()
  }

  public toMeters(px: number): number {
    return px / this.meterUnit
  }

  public posToMeters(point: Point): Point {
    let p = this.p5.instance
    return UtilFactory.newPoint(
      (point.x - (p.width / 2)) / this.meterUnit,
      (point.y - (p.height / 2)) / this.meterUnit)
  }

  public calcPos(point: Point): Point {
    let p = this.p5.instance
    return UtilFactory.newPoint(
      (p.width / 2) + (point.x * this.meterUnit),
      (p.height / 2) + (point.y * this.meterUnit))
  }
}
