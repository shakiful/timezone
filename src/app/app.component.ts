import { Component, OnInit } from '@angular/core';
import { TimeApiService } from './time-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
      this.getTime();
    }, 1000);

    this.getTime();
  }
  constructor(private timeApi: TimeApiService) {}

  title = 'timezone';
  timezone: string = 'UTC';
  time: string = '';
  digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  getTime() {
    this.timeApi.getCurrentTime(this.timezone).subscribe((date) => {
      this.time = date.current_time;
      return date.current_time;
    });
  }
}
