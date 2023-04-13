import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorygestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  //Frontend list of last 10 history's entries that will serve for all components of the app
  private _histories$: { url_history_time: string, url_video_url: string }[] = new Array();
  public histories: Observable<any> = of(this._histories$);

  //Table of 1 element registering the id of the last url of history
  private _lastHistoryId$: string[] = new Array();
  public lastHistoryId: Observable<any> = of(this._lastHistoryId$);

  //Empty constructor
  constructor() { }

  //Add ONE entry to the history list when summoned + update local storage
  public addHistories(history: { url_history_time: string, url_video_url: string }) {
    //Add at the beginning of the list the history entry to be taken into account and maintain lenght of 10
    this._histories$.unshift(history);
    if (this._histories$.length > 10) {
      this._histories$.pop();
    }
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
      const request2 = objectStore.add(history);
      request2.onerror = (event) => {
        console.log("Error : couldn't add this history entry.");
      };
      request2.onsuccess = (event) => {
        console.log("History entry well added");
      };

      //Handling errors
      db.onerror = (event: any) => {
        // Generic error handler for all errors targeted at this database's
        // requests!
        console.error(`Database error: ${event.target.errorCode}`);
      };
    };
  }

  //Same function than before but uses push/shift and not unshift/pop (otherwise the history list is inverted at each initialization)
  public initializesHistories(history: { url_history_time: string, url_video_url: string }) {
    //Add at the end of the list the history entry to be taken into account and maintain lenght of 10
    this._histories$.push(history);
    if (this._histories$.length > 10) {
      this._histories$.shift();
    }
  }

  //Replaces the value of lasthistoryid thanks to the url corresponding to it
  public replaceLastHistoryId(fullURL: string) {
    //Get id and replace
    this._lastHistoryId$.unshift(fullURL.split("v=")[1]);
    //Pop ancient value in order to keep a length of 1
    this._lastHistoryId$.pop();
  }

  //Initializes (so no pop) the value of lasthistoryid thanks to the url corresponding to it
  public initializesLastHistoryId(fullURL: string) {
    this._lastHistoryId$.push(fullURL.split("v=")[1]);
  }

  //Convert the current date into the timestamp format to be displayed
  public timestampConversion(date : Date): string {
    const year = date.toLocaleDateString().split("/")[2];
    const month = date.toLocaleDateString().split("/")[1];
    const day = date.toLocaleDateString().split("/")[0];
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString()
    const second = date.getSeconds().toString();
    const milisecond = date.getMilliseconds().toString();
    const customTimestamp = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second+"."+milisecond;
    return customTimestamp; 
  }
}