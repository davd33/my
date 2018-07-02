export class User {

  private _username: string
  private _token: string
  private _id: number

  constructor(id: number, username: string, token: string) {
    this._id = id
    this._username = username
    this._token = token
  }

  public get token(): string {
    return this._token
  }

  public get username(): string {
    return this._username
  }
}
