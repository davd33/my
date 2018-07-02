import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";

export class ServiceUtil {

  private hostname
  private protocol
  private port

  private _apiUrl

  constructor(isDevMode: boolean, location) {
    this.hostname = location.hostname
    this.protocol = location.protocol
    this.port = isDevMode ? '8080' : location.port
    this._apiUrl = `${this.protocol}//${this.hostname}${this.port ? ':' + this.port : ''}/api`
  }

  public get apiUrl(): string {
    return this._apiUrl
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
