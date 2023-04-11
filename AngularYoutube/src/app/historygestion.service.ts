import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorygestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to get the last 10 addings to the history table
  findAllHistoriesLimit10(): Observable<any> {
    //We use an empty object
    var theObject = {};
    return this._httpClient.post(this._serverURL + "/findAllHistoriesLimit10", theObject)
  }
}