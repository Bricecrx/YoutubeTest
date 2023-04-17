import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { VideoviewComponent } from './videoview/videoview.component';
import { HistoryComponent } from './history/history.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  //Declaration of all components created
  declarations: [
    AppComponent,
    SearchbarComponent,
    VideoviewComponent,
    HistoryComponent,
    BookmarksComponent,
    MainpageComponent
  ],
  //Imports of all libraries used to run the app
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  //Use of bootstrap on all app
  bootstrap: [AppComponent]
})
export class AppModule { }
