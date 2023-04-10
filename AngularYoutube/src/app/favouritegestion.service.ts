import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritegestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to the servor in order to add the url in argument to favourites
  addToFavourite(url : string): Observable<any> {
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/addToFavourite", theObject)
  }

  //Send a request to the servor in order to find all favourites
  findAllFavourites(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/findAllFavourites", theObject)
  }

  //Send a request to the servor in order to count the number of bookmarks
  countFavourites(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/countFavourites", theObject)
  }

  //Send a request to the servor in order to delete a bookmark
  deleteBookmark(url : string): Observable<any> {
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/deleteBookmark", theObject)
  }
}