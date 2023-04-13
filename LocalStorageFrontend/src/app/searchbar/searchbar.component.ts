import { Component, NgIterable, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  //Form group used to get information from html page
  videoURL: FormGroup = new FormGroup({ url: new FormControl() });
  //Error message if link is not a Youtube classic link 
  errorMessage: string = "";

  //Initializes services and variables
  constructor(private _historygestion: HistorygestionService) {
  }

  //On loading, get all urls stored in database and initializes the formgroup
  ngOnInit() {
    this.videoURL = new FormGroup({ url: new FormControl() });
  }

  //Function that add url submitted to dB if it is not already done (and if it is valid) + add url submitted to history
  playVideo(): void {
    //Get url value from form in html
    let urlValue: string = this.videoURL.value.url;
    //Proceed with the addition of url if the link seems valid
    if (/https:\/\/www\.youtube\.com\/watch\?v\=.+/.test(urlValue)) {
      //If precedent url was not valid, we reset the value of error message
      this.errorMessage = '';
      //add submission to history
      let theObject = { "url_history_time": this._historygestion.timestampConversion(new Date()), "url_video_url": urlValue };
      this._historygestion.addHistories(theObject);
      this._historygestion.replaceLastHistoryId(theObject.url_video_url);
    }
    //else display an error message
    else {
      this.errorMessage = "THE URL YOU PROVIDED IS NOT VALID.";
    }
  }
}
