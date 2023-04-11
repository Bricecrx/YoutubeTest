import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { UrlgestionService } from '../urlgestion.service';
import { HistorykeepingupdateService } from '../historykeepingupdate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  //List of all bookmarks
  bookmarks: string[] = new Array();
  bookmarksSub : Subscription = new Subscription();

  //Initialize services and variables
  constructor(private _favouritegestion: FavouritegestionService, private _urlgestion: UrlgestionService, private _historylist : HistorykeepingupdateService) {

  }

  //On init, gives good values to variables thanks to services
  ngOnInit() {
    //Get list of all bookmarks
    this.bookmarksSub = this._favouritegestion.favourites.subscribe((data) => {
      this.bookmarks = data;
    });
    //Initialize list of all bookmarks
    this._favouritegestion.findAllFavourites().subscribe(data => {
      //for (let dat of data) {
        //this.bookmarks.push(dat.url_video_url);
      //}
      for (let dat of data) {
        this._favouritegestion.addToFavourite(dat.url_video_url);
      }
    });
  }

  //Stays to put favouritelist bookmarks value to bookmarks when updated

  //Onclick of delete button near a bookmark, delete the bookmark from the list and reload webpage
  deleteBookmark(event: Event, bookmark: any) {
    let url = bookmark;
    this._favouritegestion.deleteBookmark(url).subscribe(data => {
    });
  }

  //Allows to play a video when clicking on the bookmark url
  joinFromBookmark(event: Event, bookmark: any) {
    let url = bookmark;
    this._urlgestion.addCurrentURLtoHistory(url).subscribe(data => this._historylist.updateHistories(data[0]));
  }

  ngOnDestroy() {
    this.bookmarksSub.unsubscribe();
  }
}
