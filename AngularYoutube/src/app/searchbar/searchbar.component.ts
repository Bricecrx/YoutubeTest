import { Component, NgIterable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PotentiallyaddurlService } from '../potentiallyaddurl.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  videoURL: FormGroup;
  urls: NgIterable<any>;

  constructor(private _potentiallyaddurl : PotentiallyaddurlService, private router: Router) {
    this.videoURL = new FormGroup({ url: new FormControl()});
    this.urls = new Array();
  }

  ngOnInit() {
    this.videoURL = new FormGroup({ url: new FormControl()});
    //In order to check uf entered url is already in db
    this._potentiallyaddurl.findallURL().subscribe(data => {
      this.urls = data;});
  }

  playVideo(): void {
    //Get value from form in html
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
      this._potentiallyaddurl.addURL(urlValue).subscribe(data => console.log(data));
    }
    //Add submission to history
    this._potentiallyaddurl.addCurrentURLtoHistory(urlValue).subscribe(data => console.log(data));
  }
}
