import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritegestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  private _favourites$ : string[] = new Array();

  public favourites: Observable<any> = of(this._favourites$);

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to the servor in order to add the url in argument to favourites
  addToFavourite(url : string): Observable<any> {
    //Push to list if not already
    const index = this._favourites$.indexOf(url, 0);
      if (index === -1) {
        this._favourites$.push(url);
      }
    //Update dB
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/addToFavourite", theObject)
  }

  //Send a request to the servor in order to find all favourites
  findAllFavourites(): Observable<any> {
    //We use an empty object
    var theObject = {};
    return this._httpClient.post(this._serverURL + "/findAllFavourites", theObject)
  }

  //Send a request to the servor in order to delete a bookmark
  deleteBookmark(url : string): Observable<any> {
    //Updating subscription
    const index = this._favourites$.indexOf(url, 0);
      if (index > -1) {
        this._favourites$.splice(index, 1);
      }
    //Updating dB
    var theObject = {"url" : url};
    return this._httpClient.post(this._serverURL + "/deleteBookmark", theObject)
  }
}