import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlgestionService {
  //Gets to the emplacement of the servor
  private _serverURL = 'http://localhost:8000';

  //Empty constructor
  constructor(private _httpClient: HttpClient) { }

  //Send a request to the servor in order to get urls (no arguments needed)
  findallURL(): Observable<any> {
    //We use an empty object
    var theObject = {};
    return this._httpClient.post(this._serverURL + "/geturls", theObject)
  }

  //Send a request to the servor in order to add a url to the database
  addURL(url : string): Observable<any> {
    var theObject = { "url": url };
    return this._httpClient.post(this._serverURL + '/addurl', theObject);
  }

  //Send a request in order to add the url given in argument to history with current time as timestamp
  addCurrentURLtoHistory(url:string): Observable<any> {
    var theObject = { "url": url, "timestamp": Date.now() };
    return this._httpClient.post(this._serverURL + '/addurlhistory', theObject);
  }
}
