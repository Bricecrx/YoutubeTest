import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotentiallyaddurlService {
  private _serverURL = 'http://localhost:8000';

  constructor(private _httpClient: HttpClient) { }

  findallURL(): Observable<any> {
    //We use a crappy object
    var theObject = {"ok" : 0};
    return this._httpClient.post(this._serverURL + "/geturls", theObject)
  }

  addURL(url : string): Observable<any> {
    var theObject = { "url": url };
    return this._httpClient.post(this._serverURL + '/addurl', theObject);
  }

  addCurrentURLtoHistory(url:string): Observable<any> {
    var theObject = { "url": url, "timestamp": Date.now() };
    return this._httpClient.post(this._serverURL + '/addurlhistory', theObject);
  }
}
