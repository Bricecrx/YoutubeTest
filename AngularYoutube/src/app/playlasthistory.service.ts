import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylasthistoryService {
  private _serverURL = 'http://localhost:8000';

  constructor(private _httpClient: HttpClient) { }

  findlastURLFromHistory(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/getlasturlfromhistory", theObject)
  }
}