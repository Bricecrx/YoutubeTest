import { Component, NgIterable } from '@angular/core';
import { FavouritegestionService } from '../favouritegestion.service';
import { Router } from '@angular/router';
import { PotentiallyaddurlService } from '../potentiallyaddurl.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  bookmarks: NgIterable<any>;
  bookmarkCount : 0;

  constructor(private _favouritegestion: FavouritegestionService, private _potentiallyaddurl : PotentiallyaddurlService,private router: Router) {
    this.bookmarks = new Array();
    this.bookmarkCount = 0;
  }

  ngOnInit() {
    //Get latest url in history (so latest submitted)
    this._favouritegestion.findAllFavourites().subscribe(data => {
      this.bookmarks = data;
    });
    this._favouritegestion.countFavourites().subscribe(data => {
      this.bookmarkCount = data[0].count;
    })
  }

  deleteBookmark(event:Event, bookmark:any) {
    var url = bookmark.url_video_url;
    this._favouritegestion.deleteBookmark(url).subscribe(data => console.log(data));
    window.location.reload();
  }

  joinFromBookmark(event:Event, bookmark:any) {
    var url = bookmark.url_video_url;
    this._potentiallyaddurl.addCurrentURLtoHistory(url).subscribe(data => console.log(data));
    window.location.reload();
  }
}
