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
    //Updating indexeddB
    let db: IDBDatabase;
    // Let us open our database
    const request = indexedDB.open("YoutubeIndexedDB", 8);

    //Waiting for request result
    request.onerror = (event) => {
      console.log("Error : we could not open database.");
    };

    request.onsuccess = (event: any) => {
      //Getting the db
      db = event.target.result;

      const transaction = db.transaction("bookmarks", "readwrite");
      const objectStore = transaction.objectStore("bookmarks");
      const request2 = objectStore.add({url_video_url: url});
      request2.onerror = (event) => {
        console.log("Error : couldn't add to favourite");
      };
      request2.onsuccess = (event) => {
        console.log("bookmark added well");
      };

      //Handling errors
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error(`Database error: ${event.target.errorCode}`);
      };
    };
  }
  //Add a favourite to our list if it is not already in + update local storage
  initializeFavourite(url : string) {
    //Push to list if not already in
    const index = this._favourites$.indexOf(url, 0);
      if (index === -1) {
        this._favourites$.push(url);
      }
  }

  //Delete a bookmark from our list + update local storage
  deleteBookmark(url : string){
    //Updating subscription
    const index = this._favourites$.indexOf(url, 0);
      if (index > -1) {
        this._favourites$.splice(index, 1);
      }
    //Updating indexeddB
    let db: IDBDatabase;
    // Let us open our database
    const request = indexedDB.open("YoutubeIndexedDB", 8);

    //Waiting for request result
    request.onerror = (event) => {
      console.log("Error : we could not open database.");
    };

    request.onsuccess = (event: any) => {
      //Getting the db
      db = event.target.result;

      const transaction = db.transaction("bookmarks", "readwrite");
      const objectStore = transaction.objectStore("bookmarks");
      const request2 = objectStore.delete(url);
      request2.onerror = (event) => {
        console.log("Error : couldn't remove this bookmark.");
      };
      request2.onsuccess = (event) => {
        console.log("bookmark removed well");
      };

      //Handling errors
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error(`Database error: ${event.target.errorCode}`);
      };
    };
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