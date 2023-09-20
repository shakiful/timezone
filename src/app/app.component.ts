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
  timezone: string = 'BST';
  time: string = '';

  getTime(): any {
    this.timeApi.getCurrentTime(this.timezone).subscribe((date) => {
      console.log(this.timezone, 'here');

      this.time = date.current_time;
      return date.current_time;
    });
  }
}
