import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { Subscription } from 'rxjs';
import { HistorygestionService } from '../historygestion.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  //List of all bookmarks
  bookmarks: string[] = new Array();
  bookmarksSub: Subscription = new Subscription();

  //Initialize services and variables
  constructor(private _favouritegestion: FavouritegestionService, private _historygestion: HistorygestionService) {

  }

  //On init, gives good values to variables thanks to services
  ngOnInit() {
    //Get list of all bookmarks
    this.bookmarksSub = this._favouritegestion.favourites.subscribe((data) => {
      this.bookmarks = data;
    });
    //Initialize list of all bookmarks
    let storedfavourites = this._favouritegestion.turnJsonIntoFavouritesArray(localStorage.getItem("favourites"));
      for (let storedfavourite of storedfavourites) {
        this._favouritegestion.addToFavourite(storedfavourite);
      }
  }

  //Onclick of delete button near a bookmark, delete the bookmark from the list and reload webpage
  deleteBookmark(event: Event, bookmark: any) {
    let url = bookmark;
    this._favouritegestion.deleteBookmark(url);
  }

  //Allows to play a video when clicking on the bookmark url
  joinFromBookmark(event: Event, bookmark: any) {
    let urlValue = bookmark;
    let theObject = { "url_history_time": this._historygestion.timestampConversion(new Date()), "url_video_url": urlValue };
    this._historygestion.addHistories(theObject);
    this._historygestion.replaceLastHistoryId(theObject.url_video_url);
  }

  //Stop subscription when component destroyed
  ngOnDestroy() {
    this.bookmarksSub.unsubscribe();
  }
}
