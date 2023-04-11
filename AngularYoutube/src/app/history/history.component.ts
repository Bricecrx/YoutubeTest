import { Component, NgIterable } from '@angular/core';
import { UrlgestionService } from '../urlgestion.service';
import { HistorygestionService } from '../historygestion.service';
import { HistorykeepingupdateService } from '../historykeepingupdate.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  //List of the 10 last entries to the history table
  histories: { url_history_id: BigInt, url_history_time: string, url_video_url: string }[] = new Array();

  //Initializes services and variables
  constructor(private _historygestion: HistorygestionService, private _urlgestion: UrlgestionService, private _historylist : HistorykeepingupdateService) {
  }

  //On loading, search for the last 10 entries to the history table and gives value to entry
  ngOnInit() {
    //Get latest url in history (so latest submitted)
    this._historygestion.findAllHistoriesLimit10().subscribe(data => {
      for (let dat of data) {
        this.histories.push(dat);
      }
      //Making the timestamps more easily readable for human eye
      for (let history of this.histories) {
        history.url_history_time = history.url_history_time.split("Z")[0].split("T")[0] + " " + history.url_history_time.split("Z")[0].split("T")[1];
      }
      this._historylist.setHistories(this.histories);
    });
  }

  //Stays to update histories with history list values when updated

  //Allows to play a video when clicking on the history entry url
  joinFromHistory(event: Event, history: any) {
    let url = history.url_video_url;
    this._urlgestion.addCurrentURLtoHistory(url).subscribe(data => {
      this.histories.unshift(data[0]);
      this.histories[0].url_history_time = this.histories[0].url_history_time.split("Z")[0].split("T")[0] + " " + this.histories[0].url_history_time.split("Z")[0].split("T")[1];
      //Remove last history in array in order to always have 10
      this.histories.pop();
      this._historylist.setHistories(this.histories);
    }
    );
  }
}
