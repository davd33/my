
export class Transport {

  constructor(private _avgSpeed: number,
              private _annualCost: number) { }

  public get avgSpeed(): number {
    return this._avgSpeed
  }

  public set avgSpeed(v: number) {
    this._avgSpeed = v
  }

  public get annualCost(): number {
    return this._annualCost
  }

  public set annualCost(v: number) {
    this._annualCost = v
  }
}

export class Car extends Transport {
  constructor() {
    super(50, 800)
  }
}

export class Bicycle extends Transport {
  constructor() {
    super(15, 50)
  }
}
