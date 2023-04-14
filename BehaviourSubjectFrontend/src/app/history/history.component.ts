import { Component, NgIterable } from '@angular/core';
import { UrlgestionService } from '../urlgestion.service';
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
  historySub : Subscription = new Subscription();

  //Initializes services and variables
  constructor(private _historygestion: HistorygestionService, private _urlgestion: UrlgestionService) {
  }

  //On loading, search for the last 10 entries to the history table and gives value to entry
  ngOnInit() {
    //Initializes subscriber thanks to dB (10 last urls)
    this._historygestion.findAllHistoriesLimit10().subscribe(data => {
      for (let dat of data) {
        this._historygestion.addFirstHistories(dat);
      }
    });
    //Link service to our display list
    this.historySub = this._historygestion.histories.subscribe((data) => {
      this.histories = data;
    });
  }

  //Allows to play a video when clicking on the history entry url
  joinFromHistory(event: Event, history: any) {
    var url = history.url_video_url;
    this._urlgestion.addCurrentURLtoHistory(url).subscribe(data => {
      this._historygestion.addHistories(data[0]);
      this._historygestion.replaceLastHistoryId(data[0].url_video_url);
    }
    );

  }
}
