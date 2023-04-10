import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylasthistoryService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to servor in order to get the last url added to history
  findlastURLFromHistory(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/getlasturlfromhistory", theObject)
  }
}