import { Component, NgIterable } from '@angular/core';
import { HistorygestionService } from '../historygestion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  //List of the 10 last entries to the history table
  histories: { url_history_id: number, url_history_time: string, url_video_url: string }[] = new Array();
  historySub: Subscription = new Subscription();

  //Initializes services and variables
  constructor(private _historygestion: HistorygestionService) {
  }

  //On loading, search for the last 10 entries to the history table and gives value to entry
  ngOnInit() {
    //Initializes our frontend list with local storage datas
    let storedhistories = this._historygestion.turnJsonIntoHistoriesArray(localStorage.getItem("histories"),);
    for (let storedhistory of storedhistories) {
      this._historygestion.initializesHistories(storedhistory);
    }
    //Link service to our display list
    this.historySub = this._historygestion.histories.subscribe((data) => {
      this.histories = data;
    });
  }

  //Allows to play a video when clicking on the history entry url
  joinFromHistory(event: Event, history: any) {
    let urlValue = history.url_video_url;
    let theObject = { "url_history_time": this._historygestion.timestampConversion(new Date()), "url_video_url": urlValue };
    this._historygestion.addHistories(theObject);
    this._historygestion.replaceLastHistoryId(theObject.url_video_url);
  }

  //Stop subscription when component destroyed
  ngOnDestroy() {
    this.historySub.unsubscribe();
  }
}
