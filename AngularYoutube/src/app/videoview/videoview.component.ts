import { Component, NgIterable, Input } from '@angular/core';
import { PlaylasthistoryService } from '../playlasthistory.service';
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
  fullURL: string = '';
  //id of the video to play (useful to play the video thanks to youtube iframe api)
  videoId: string = '';
  //The last url added to history (so the one the app has to play)
  latesturl: {url_video_url : string}[] = new Array();

  //Initializes services and variables
  constructor(private _playlasthistory: PlaylasthistoryService, private _favouritegestion: FavouritegestionService) {
  }

  //On loading, search for the url of the video to play and enter it into the variable that 
  //the module will use + initializes the youtube iframe module
  ngOnInit() {
    //Get latest url in history (so latest submitted) and copy it into variables
    this._playlasthistory.findlastURLFromHistory().subscribe(data => {
      console.log(data);
      this.latesturl = data;
        this.fullURL = this.latesturl[0].url_video_url;
        //process to get id only : 
        this.videoId = this.fullURL.split("v=")[1];
    });
    
    //Load youtube iframe api
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  //Need to update full url and video id when histories is updated

  //When clicking on the star button below the video player, add the current played video to bookmarks
  addFavourite(event:Event): void {
    this._favouritegestion.addToFavourite(this.fullURL).subscribe(data => data);
    //window.location.reload();
  }
}
