import { Component, NgIterable, Input } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { HistorygestionService } from '../historygestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videoview',
  templateUrl: './videoview.component.html',
  styleUrls: ['./videoview.component.css']
})
export class VideoviewComponent {
  //Boolean checking if the module allowing to play Youtube video by URL is activated
  apiLoaded = false;
  //url of the video to play in full form
  fullURL: string = '';
  //id of the video to play (useful to play the video thanks to youtube iframe api)
  videoId: string[] = new Array();
  //Subscriber to get latest url from history
  videoIdSub : Subscription = new Subscription();

  //Initializes services and variables
  constructor(private _favouritegestion: FavouritegestionService, private _historygestion: HistorygestionService) {
  }

  //On loading, search for the url of the video to play and enter it into the variable that 
  //the module will use + initializes the youtube iframe module
  ngOnInit() {
    //Get the latest history submission thanks to subscribtion and service
    this.videoIdSub = this._historygestion.lastHistoryId.subscribe((data) => {
      this.videoId = data;
    });
    //Get info from IndexedDB (initialization)
    let db: IDBDatabase;
    let storedhistories: any[] = new Array();
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

      const transaction = db.transaction("histories", "readwrite");
      const objectStore = transaction.objectStore("histories");
      const request2 = objectStore.getAll();
      request2.onerror = (event) => {
        console.log("Error : couldn't find last history entry.");
      };
      request2.onsuccess = (event) => {
        storedhistories = request2.result;
        this._historygestion.initializesLastHistoryId(storedhistories[storedhistories.length-1].url_video_url);
      };

      //Handling errors
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error(`Database error: ${event.target.errorCode}`);
      };
    };

    //Load youtube iframe api
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  //When clicking on the star button below the video player, add the current played video to bookmarks
  addFavourite(event: Event): void {
    this._favouritegestion.addToFavourite("https://www.youtube.com/watch?v=" + this.videoId);
  }
}
