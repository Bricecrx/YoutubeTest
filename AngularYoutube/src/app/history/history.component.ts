import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { UrlgestionService } from '../urlgestion.service';
import { Router } from '@angular/router';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  //List of the 10 last entries to the history table
  histories: NgIterable<any>;

  //Initializes services and variables
  constructor(private _historygestion: HistorygestionService, private _urlgestion : UrlgestionService) {
    this.histories = new Array();
  }

  //On loading, search for the last 10 entries to the history table and gives value to entry
  ngOnInit() {
    //Get latest url in history (so latest submitted)
    this._historygestion.findAllHistoriesLimit10().subscribe(data => {
      this.histories = data;
    });
  }

  //Allows to play a video when clicking on the history entry url
  joinFromHistory(event:Event, history:any) {
    var url = history.url_video_url;
    this._urlgestion.addCurrentURLtoHistory(url).subscribe(data => console.log(data));
    window.location.reload();
  }
}
