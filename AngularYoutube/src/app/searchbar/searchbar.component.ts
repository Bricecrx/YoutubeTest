import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  videoURL: FormGroup;

  constructor(private router: Router) {
    this.videoURL = new FormGroup({ url: new FormControl()});
  }

  ngOnInit() {
    this.videoURL = new FormGroup({ url: new FormControl()});
  }

  playVideo(): void {
    var urlValue = this.videoURL.value.url;
    console.log(JSON.stringify(urlValue));
  }
}
