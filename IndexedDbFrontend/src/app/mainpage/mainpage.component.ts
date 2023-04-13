import { Component } from '@angular/core';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {

  //Empty constructor
  constructor(private _historygestion: HistorygestionService) {
  }

  //Open IndexeddB and see if it worked
  ngOnInit() {
    let dB: IDBDatabase;
    // Let us open our database
    const request = indexedDB.open("YoutubeIndexedDB", 8);

    //Waiting for request result
    request.onerror = (event) => {
      console.log("Error : we could not open database.");
    };

    request.onupgradeneeded = (event: any) => {
      console.log("Database opened");
      //Getting the dB
      dB = event.target.result;
      let bookmarks: IDBObjectStore;
      let histories: IDBObjectStore;

      //Add the object stores wanted if not already done
      if (!dB.objectStoreNames.contains('bookmarks')) {
        bookmarks = dB.createObjectStore('bookmarks', { keyPath: 'url_video_url' });
        bookmarks.createIndex('url_video_url', 'url_video_url', { unique: true });
      }
      else {
        bookmarks = new IDBObjectStore();
      }
      if (!dB.objectStoreNames.contains('histories')) {
        histories = dB.createObjectStore('histories', { keyPath: 'url_history_id', autoIncrement: true });
        histories.createIndex('url_video_url', 'url_video_url', { unique: false });
      }
      else {
        histories = new IDBObjectStore();
      }

      //Give a data to initialize history
      const historyData = { "url_history_time": this._historygestion.timestampConversion(new Date()), "url_video_url": "https://www.youtube.com/watch?v=feMd_GvZSf4" };

      histories.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.
        dB.transaction("histories", "readwrite").objectStore("histories").add(historyData);

        //Handling errors
        dB.onerror = (event: any) => {
          // Generic error handler for all errors targeted at this database's
          // requests!
          console.error(`Database error: ${event.target.errorCode}`);
        };
      };
    }
  }
}
