import { Component, NgIterable, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UrlgestionService } from '../urlgestion.service';
import { HistorykeepingupdateService } from '../historykeepingupdate.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  //Form group used to get information from html page
  videoURL: FormGroup = new FormGroup({ url: new FormControl() });
  //List of all urls already used and stored in database
  urls: {url_video_url : string}[] = new Array();;
  //Error message if link is not a Youtube classic link 
  errorMessage : string = "";

  //Initializes services and variables
  constructor(private _urlgestion: UrlgestionService, private _historylist : HistorykeepingupdateService) {
  }

  //On loading, get all urls stored in database and initializes the formgroup
  ngOnInit() {
    this.videoURL = new FormGroup({ url: new FormControl() });
    //In order to check if entered url is already in db
    this._urlgestion.findallURL().subscribe(data => {
      for (let dat of data) {
        this.urls.push(data);
      }
    });
  }

  //Function that add url submitted to dB if it is not already done (and if it is valid) + add url submitted to history
  playVideo(): void {
    //Get url value from form in html
    let urlValue = this.videoURL.value.url;
    //Proceed with the addition of url if the link seems valid
    if (/https:\/\/www\.youtube\.com\/watch\?v\=.+/.test(urlValue)) {
      //Verify if value is not already in dB
      let isAlreadyInDB = false;
      for (let u of this.urls) {
        console.log(u);
        let uValue = u.url_video_url;
        if (urlValue === uValue) {
          isAlreadyInDB = true;
          console.log("url already in db");
        }
      }
      //If it is not, add it to dB
      if (!isAlreadyInDB) {
        this._urlgestion.addURL(urlValue).subscribe(data => data);
      }
      //Then add submission to history
      this._urlgestion.addCurrentURLtoHistory(urlValue).subscribe(data => this._historylist.updateHistories(data[0]));
      //Refresh page
      window.location.reload();
    }
    //else display an error message
    else {
      this.errorMessage = "THE URL YOU PROVIDED IS NOT VALID.";
    }

  }
}
