import {Injectable, isDevMode} from '@angular/core';
import {ServiceUtil} from "../classes/services/service-util";
import {User} from "../classes/login/user";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class UserService {

  private serviceUtil: ServiceUtil
  private _user: User

  constructor(private http: HttpClient) {
    this.serviceUtil = new ServiceUtil(isDevMode(), location)
  }

  public get isAdminLoggedIn(): Observable<boolean> {
    if (!this.isLoggedIn) return of(false)

    let options = {
      headers: new HttpHeaders({
        'Authorization': `bearer ${this._user.token}`
      })
    }
    return this.http.get<any>(`${this.serviceUtil.apiUrl}/user/is-admin/${this._user.username}`, options)
      .pipe(catchError(ServiceUtil.handleError<boolean>('isAdminLoggedIn', false)))
  }

  public get isLoggedIn(): boolean {
    return !!this._user
  }

  public set user(v: User) {
    this._user = v
  }

  public get user(): User {
    return this._user
  }

  public logout() {
    this._user = undefined
  }

  public login(username, password): Observable<any> {
    let options = {}
    let body = {
      username: username,
      password: password
    }
    return this.http.post<any>(this.serviceUtil.apiUrl + '/login', body, options)
      .pipe(catchError(ServiceUtil.handleError<any>('login', [])))
  }
}
