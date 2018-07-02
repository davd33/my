import {Injectable, isDevMode} from '@angular/core';
import {ServiceUtil} from "../classes/services/service-util";
import {User} from "../classes/login/user";
import {Observable} from "rxjs/internal/Observable";
import {Article} from "../classes/blog/article";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  private serviceUtil: ServiceUtil
  private _user: User

  constructor(private http: HttpClient) {
    this.serviceUtil = new ServiceUtil(isDevMode(), location)
  }

  public get isAdminLoggedIn(): boolean {
    return !!this._user && this._user.username === 'davd33@gmail.com'
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
