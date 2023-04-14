import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorygestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  private historiesList: { url_history_id: number, url_history_time: string, url_video_url: string }[] = new Array();
  
  private _histories$ = new BehaviorSubject<any>({});

  public histories = this._histories$.asObservable();

  private lastHistoryIdList: string[] = new Array();
  
  private _lastHistoryId$ = new BehaviorSubject<any>({});

  public lastHistoryId = this._lastHistoryId$.asObservable();

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

  public addFirstHistories(history: { url_history_id: number, url_history_time: string, url_video_url: string }) {
    history.url_history_time = history.url_history_time.split("Z")[0].split("T")[0] + " " + history.url_history_time.split("Z")[0].split("T")[1];
    this.historiesList.push(history);
    this._histories$.next(this.historiesList);
  }

  public addHistories(history: { url_history_id: number, url_history_time: string, url_video_url: string }) {
    history.url_history_time = history.url_history_time.split("Z")[0].split("T")[0] + " " + history.url_history_time.split("Z")[0].split("T")[1];
    this.historiesList.unshift(history);
    if (this.historiesList.length > 10) {
      this.historiesList.pop();
    }
    this._histories$.next(this.historiesList);
  }

  public replaceLastHistoryId(fullURL: string) {
    this.lastHistoryIdList.unshift(fullURL.split("v=")[1]);
    this.lastHistoryIdList.pop();
    this._lastHistoryId$.next(this.lastHistoryIdList);
  }

  public initializesLastHistoryId(fullURL: string) {
    this.lastHistoryIdList.push(fullURL.split("v=")[1]);
    this._lastHistoryId$.next(this.lastHistoryIdList);
  }
}