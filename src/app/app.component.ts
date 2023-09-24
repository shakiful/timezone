import { Component, OnInit } from '@angular/core';
import { TimeApiService } from './time-api.service';
import { Subscription, timer } from 'rxjs';

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

  hourHandPosition = 0;
  minuteHandPosition = 0;
  secondHandPosition = 0;
  meridiem = '';

  getTime() {
    this.timeApi.getCurrentTime(this.timezone).subscribe((date) => {
      this.time = date.current_time;

      const [hours, minutes, seconds, meridiem] = this.time.split(':');

      this.meridiem = meridiem;

      // Assign the extracted values to your component properties
      this.secondHandPosition = Number(seconds);
      this.minuteHandPosition = Number(minutes);
      this.hourHandPosition = Number(hours);
      //positioning the hands
      this.secondHandPosition = this.secondHandPosition * 6;
      this.minuteHandPosition = this.minuteHandPosition * 6;
      this.hourHandPosition =
        (this.hourHandPosition > 11
          ? this.hourHandPosition - 12
          : this.hourHandPosition) *
          30 +
        Math.floor(Number(minutes) / 12) * 6;

      return date.current_time;
    });
  }
}
