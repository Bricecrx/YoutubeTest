import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { PotentiallyaddurlService } from '../potentiallyaddurl.service';
import { Router } from '@angular/router';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  histories: NgIterable<any>;

  constructor(private _historygestion: HistorygestionService, private _potentiallyaddurl : PotentiallyaddurlService,private router: Router) {
    this.histories = new Array();
  }

  ngOnInit() {
    //Get latest url in history (so latest submitted)
    this._historygestion.findAllHistoriesLimit10().subscribe(data => {
      this.histories = data;
    });
  }

  joinFromHistory(event:Event, history:any) {
    var url = history.url_video_url;
    this._potentiallyaddurl.addCurrentURLtoHistory(url).subscribe(data => console.log(data));
    window.location.reload();
  }
}
