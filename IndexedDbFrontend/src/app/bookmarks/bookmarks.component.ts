import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { Subscription } from 'rxjs';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  //List of all bookmarks
  bookmarks: string[] = new Array();
  bookmarksSub: Subscription = new Subscription();

  //Initialize services and variables
  constructor(private _favouritegestion: FavouritegestionService, private _historygestion: HistorygestionService) {
  }

  //On init, gives good values to variables thanks to services
  ngOnInit() {
    //Get list of all bookmarks
    this.bookmarksSub = this._favouritegestion.favourites.subscribe((data) => {
      this.bookmarks = data;
    });
    //Get info from IndexedDB
    let db: IDBDatabase;
    let storedfavourites: any[] = new Array();
    // Let us open our database
    const request = indexedDB.open("YoutubeIndexedDB", 8);

    //Waiting for request result
    request.onerror = (event) => {
      console.log("Error : we could not open database.");
    };

    request.onsuccess = (event: any) => {
      console.log("Database opened");
      //Getting the db
      db = event.target.result;

      const transaction = db.transaction("bookmarks", "readwrite");
      const objectStore = transaction.objectStore("bookmarks");
      const request2 = objectStore.getAll();
      request2.onerror = (event) => {
        console.log("Error : couldn't get from bookmarks.");
      };
      request2.onsuccess = (event) => {
        storedfavourites = request2.result;
        //Initializes list of data
        for (let storedfavourite of storedfavourites) {
          this._favouritegestion.initializeFavourite(storedfavourite.url_video_url);
        }
      };

      //Handling errors
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error(`Database error: ${event.target.errorCode}`);
      };
    };
  }

  //Onclick of delete button near a bookmark, delete the bookmark from the list and reload webpage
  deleteBookmark(event: Event, bookmark: any) {
    let url = bookmark;
    this._favouritegestion.deleteBookmark(url);
  }

  //Allows to play a video when clicking on the bookmark url
  joinFromBookmark(event: Event, bookmark: any) {
    let urlValue = bookmark;
    let theObject = { "url_history_time": this._historygestion.timestampConversion(new Date()), "url_video_url": urlValue };
    this._historygestion.addHistories(theObject);
    this._historygestion.replaceLastHistoryId(theObject.url_video_url);
  }

  //Stop subscription when component destroyed
  ngOnDestroy() {
    this.bookmarksSub.unsubscribe();
  }
}
