import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorygestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  private _histories$ : { url_history_id: number, url_history_time: string, url_video_url: string }[] = new Array();

  public histories : Observable<any> = of(this._histories$);

  private _lastHistoryId$ : string[] = new Array();
  
  public lastHistoryId : Observable<any> = of(this._lastHistoryId$);

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to get the last 10 addings to the history table
  findAllHistoriesLimit10(): Observable<any> {
    //We use an empty object
    var theObject = {};
    return this._httpClient.post(this._serverURL + "/findAllHistoriesLimit10", theObject);
  }

  //Send a request to servor in order to get the last url added to history
  findlastURLFromHistory(): Observable<any> {
    //We use an empty object
    var theObject = {};
    return this._httpClient.post(this._serverURL + "/getlasturlfromhistory", theObject)
  }

  public addFirstHistories(history : { url_history_id: number, url_history_time: string, url_video_url: string }) {
    history.url_history_time = history.url_history_time.split("Z")[0].split("T")[0] + " " + history.url_history_time.split("Z")[0].split("T")[1];
    this._histories$.push(history);
  }

  public addHistories(history : { url_history_id: number, url_history_time: string, url_video_url: string }) {
    history.url_history_time = history.url_history_time.split("Z")[0].split("T")[0] + " " + history.url_history_time.split("Z")[0].split("T")[1];
    this._histories$.unshift(history);
    this._histories$.pop();
  }

  public replaceLastHistoryId(fullURL : string) {
    this._lastHistoryId$.unshift(fullURL.split("v=")[1]);
    this._lastHistoryId$.pop();
  }

  public initializesLastHistoryId(fullURL: string) {
    this._lastHistoryId$.push(fullURL.split("v=")[1]);
  }
}