import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorykeepingupdateService {

  histories: { url_history_id: BigInt, url_history_time: string, url_video_url: string }[] = new Array();

  constructor() { }

  getHistories() : { url_history_id: BigInt, url_history_time: string, url_video_url: string }[] {
    return this.histories;
  }

  setHistories(histories : { url_history_id: BigInt, url_history_time: string, url_video_url: string }[]) {
    this.histories = histories;
  }

  updateHistories(history : { url_history_id: BigInt, url_history_time: string, url_video_url: string }) {
    this.histories.unshift(history);
    this.histories.pop();
  }
}
