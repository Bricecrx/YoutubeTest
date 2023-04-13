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
    //Update local storage
    localStorage.setItem("histories", JSON.stringify(this._histories$));
  }

  //Same function than before but uses push/shift and not unshift/pop (otherwise the history list is inverted at each initialization)
  public initializesHistories(history: { url_history_time: string, url_video_url: string }) {
    //Add at the end of the list the history entry to be taken into account and maintain lenght of 10
    this._histories$.push(history);
    if (this._histories$.length > 10) {
      this._histories$.shift();
    }
    //Update local storage
    localStorage.setItem("histories", JSON.stringify(this._histories$));
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

  //Turn the string data got when using local storage to a usable history array
  public turnJsonIntoHistoriesArray(jsonData : string | null) : {url_history_time: string, url_video_url: string }[] {
    //If data is not null, convert into array and return
    if (jsonData !== null) {
      let array = JSON.parse(jsonData);
      return array;
    }
    //Else, return empty array + warn in the console
    else {
      console.log("History : The argument given was null.");
      return new Array();
    }
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