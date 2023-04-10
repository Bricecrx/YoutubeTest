import { Component, NgIterable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlgestionService } from '../urlgestion.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  //Form group used to get information from html page
  videoURL: FormGroup;
  //List of all urls already used and stored in database
  urls: NgIterable<any>;

  //Initializes services and variables
  constructor(private _urlgestion : UrlgestionService) {
    this.videoURL = new FormGroup({ url: new FormControl()});
    this.urls = new Array();
  }

  //On loading, get all urls stored in database and initializes the formgroup
  ngOnInit() {
    this.videoURL = new FormGroup({ url: new FormControl()});
    //In order to check if entered url is already in db
    this._urlgestion.findallURL().subscribe(data => {
      this.urls = data;});
  }

  //Function that add url submitted to dB if it is not already done + add url submitted to history
  playVideo(): void {
    //Get url value from form in html
    var urlValue = this.videoURL.value.url;
    //Verify if value is not already in dB
    var isAlreadyInDB = false;
    for (var u of this.urls) {
      console.log(u);
      var uValue = u.url_video_url;
      if (urlValue == uValue) {
        isAlreadyInDB = true;
        console.log("url already in db");
      }
    }
    //If it is not, add it to dB
    if (!isAlreadyInDB) {
      this._urlgestion.addURL(urlValue).subscribe(data => console.log(data));
    }
    //Then add submission to history
    this._urlgestion.addCurrentURLtoHistory(urlValue).subscribe(data => console.log(data));
    window.location.reload();
  }
}
