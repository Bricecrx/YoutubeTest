import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritegestionService {
  private _serverURL = 'http://localhost:8000';

  constructor(private _httpClient: HttpClient) { }

  addToFavourite(url : string): Observable<any> {
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/addToFavourite", theObject)
  }

  findAllFavourites(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/findAllFavourites", theObject)
  }

  countFavourites(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/countFavourites", theObject)
  }

  deleteBookmark(url : string): Observable<any> {
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/deleteBookmark", theObject)
  }
}