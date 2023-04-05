import { Component, NgIterable } from '@angular/core';
import { FindvideourlService } from '../findvideourl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videoview',
  templateUrl: './videoview.component.html',
  styleUrls: ['./videoview.component.css']
})
export class VideoviewComponent {

  apiLoaded = false;

  videoId = '';
  latesturl: NgIterable<any>;

  constructor(private _findvideourl: FindvideourlService, private router: Router) {
    this.videoId = '';
    this.latesturl = new Array();
  }

  ngOnInit() {
    //Get latest url in history (so latest submitted)
    this._findvideourl.findlastURLFromHistory().subscribe(data => {
      this.latesturl = data;
      for (var late of this.latesturl) {
        var fullURL = late.url_video_url;
        //process to get id only : 
        this.videoId = fullURL.split("v=")[1];
      }
      console.log(this.latesturl);
    });
    
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
