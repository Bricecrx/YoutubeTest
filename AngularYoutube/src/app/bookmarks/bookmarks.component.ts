import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { Router } from '@angular/router';
import { UrlgestionService } from '../urlgestion.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  //List of all bookmarks
  bookmarks: NgIterable<any>;
  //Number of bookmarks when the page is loaded
  bookmarkCount : 0;

  //Initialize services and variables
  constructor(private _favouritegestion: FavouritegestionService, private _urlgestion : UrlgestionService) {
    this.bookmarks = new Array();
    this.bookmarkCount = 0;
  }

  //On init, gives good values to variables thanks to services
  ngOnInit() {
    //Get list of all bookmarks
    this._favouritegestion.findAllFavourites().subscribe(data => {
      this.bookmarks = data;
    });
    //Get number of bookmarks
    this._favouritegestion.countFavourites().subscribe(data => {
      this.bookmarkCount = data[0].count;
    })
  }

  //Onclick of delete button near a bookmark, delete the bookmark from the list and reload webpage
  deleteBookmark(event:Event, bookmark:any) {
    var url = bookmark.url_video_url;
    this._favouritegestion.deleteBookmark(url).subscribe(data => console.log(data));
    window.location.reload();
  }

  //Allows to play a video when clicking on the bookmark url
  joinFromBookmark(event:Event, bookmark:any) {
    var url = bookmark.url_video_url;
    this._urlgestion.addCurrentURLtoHistory(url).subscribe(data => console.log(data));
    window.location.reload();
  }
}
