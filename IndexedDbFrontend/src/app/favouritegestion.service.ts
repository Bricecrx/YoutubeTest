import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritegestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';
  //Frontend list of favourites that will serve for all components of the app
  private _favourites$ : string[] = new Array();
  public favourites: Observable<any> = of(this._favourites$);

  //Empty constructor
  constructor() { }

  //Add a favourite to our list if it is not already in + update local storage
  addToFavourite(url : string) {
    //Push to list if not already in
    const index = this._favourites$.indexOf(url, 0);
      if (index === -1) {
        this._favourites$.push(url);
      }
    //Update Local Storage
    localStorage.setItem("favourites", JSON.stringify(this._favourites$));
  }

  //Delete a bookmark from our list + update local storage
  deleteBookmark(url : string){
    //Updating subscription
    const index = this._favourites$.indexOf(url, 0);
      if (index > -1) {
        this._favourites$.splice(index, 1);
      }
    //Updating localStorage
    localStorage.setItem("favourites", JSON.stringify(this._favourites$));
  }

  //Turn the string data got when using local storage to a usable favourite array
  public turnJsonIntoFavouritesArray(jsonData : string | null) : string[] {
    //If data is not null, convert into array and return
    if (jsonData !== null) {
      let array = JSON.parse(jsonData);
      return array;
    }
    //Else, return empty array + warn in the console
    else {
      console.log("The argument given was null.");
      return new Array();
    }
  }
}