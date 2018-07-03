import {Injectable, isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Article} from "../classes/blog/article";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {ServiceUtil} from "../classes/services/service-util";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable()
export class BlogService {

  private serviceUtil: ServiceUtil

  constructor(private http: HttpClient,
              private router: Router,
              private userSvc: UserService) {
    this.serviceUtil = new ServiceUtil(isDevMode(), location)
  }

  public editArticle(mdText: string, id: string = undefined): Observable<any> {
    if (!this.userSvc.user) this.router.navigate(['/login'])

    let body = {
      text: mdText
    }
    let options = {
      headers: new HttpHeaders({
        'Authorization': `bearer ${this.userSvc.user.token}`
      })
    }

    if (!id) {
      return this.http.put(`${this.serviceUtil.apiUrl}/blog/edit`, body, options)
        .pipe(catchError(ServiceUtil.handleError<any>('get editArticle PUT', null)))
    }

    return this.http.post<any>(`${this.serviceUtil.apiUrl}/blog/edit/${id}`, body, options)
      .pipe(catchError(ServiceUtil.handleError<any>('get editArticle POST', null)))
  }

  public delete(id: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': `bearer ${this.userSvc.user.token}`
      })
    }
    return this.http.delete(`${this.serviceUtil.apiUrl}/blog/edit/${id}`, options)
      .pipe(catchError(ServiceUtil.handleError<any>('delete', {ok: false})))
  }

  public get allArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.serviceUtil.apiUrl + '/blog/all')
      .pipe(catchError(ServiceUtil.handleError<Article[]>('get allArticles', [])))
  }

  public getArticle(id: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': `bearer ${this.userSvc.user.token}`
      })
    }
    return this.http.get<any>(`${this.serviceUtil.apiUrl}/blog/edit/${id}`, options)
      .pipe(catchError(ServiceUtil.handleError<any>('getArticle', null)))
  }
}
