import { Component, NgIterable } from '@angular/core';
import { PlaylasthistoryService } from '../playlasthistory.service';
import { Router } from '@angular/router';
import { FavouritegestionService } from '../favouritegestion.service';

@Component({
  selector: 'app-videoview',
  templateUrl: './videoview.component.html',
  styleUrls: ['./videoview.component.css']
})
export class VideoviewComponent {
  //Boolean checking if the module allowing to play Youtube video by URL is activated
  apiLoaded = false;
  //url of the video to play in full form
  fullURL = '';
  //id of the video to play (useful to play the video thanks to youtube iframe api)
  videoId = '';
  //The last url added to history (so the one the app has to play)
  latesturl: NgIterable<any>;

  //Initializes services and variables
  constructor(private _playlasthistory: PlaylasthistoryService, private _favouritegestion: FavouritegestionService, private router: Router) {
    this.videoId = '';
    this.fullURL = '';
    this.latesturl = new Array();
  }

  //On loading, search for the url of the video to play and enter it into the variable that 
  //the module will use + initializes the youtube iframe module
  ngOnInit() {
    //Get latest url in history (so latest submitted) and copy it into variables
    this._playlasthistory.findlastURLFromHistory().subscribe(data => {
      this.latesturl = data;
      for (var late of this.latesturl) {
        this.fullURL = late.url_video_url;
        //process to get id only : 
        this.videoId = this.fullURL.split("v=")[1];
      }
    });
    
    //Load youtube iframe api
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  //When clicking on the star button below the video player, add the current played video to bookmarks
  addFavourite(event:Event): void {
    this._favouritegestion.addToFavourite(this.fullURL).subscribe(data => console.log(data));
    window.location.reload();
  }
}
