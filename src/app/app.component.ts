import { Component, OnInit } from '@angular/core';
import { TimeApiService } from './time-api.service';
import * as moment from 'moment';
import 'moment-timezone';
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

  dhaka_hour = 0;
  dhaka_minute = 0;
  dhaka_second = 0;
  dhaka_time = '';

  berlin_hour = 0;
  berlin_minute = 0;
  berlin_second = 0;
  berlin_time = '';

  hourHandPosition = 0;
  minuteHandPosition = 0;
  secondHandPosition = 0;

  getTime() {
    this.timeApi.getCurrentTime(this.timezone).subscribe((date) => {
      this.time = date.current_time;

      const [hours, minutes, seconds] = this.time.split(':');

      // Assign the extracted values to your component properties
      this.secondHandPosition = Number(seconds);
      this.minuteHandPosition = Number(minutes);
      this.hourHandPosition = Number(hours);

      this.dhaka_hour =
        (moment().hour() > 11 ? moment().hour() - 12 : moment().hour()) * 30 +
        Math.floor(moment().hour() / 12) * 6;
      this.dhaka_minute = moment().minute() * 6;
      this.dhaka_second = moment().second() * 6;
      this.dhaka_time = moment().format('h:m:s:A');

      this.berlin_hour =
        (moment().tz('Europe/Berlin').hour() > 11
          ? moment().tz('Europe/Berlin').hour() - 12
          : moment().tz('Europe/Berlin').hour()) *
          30 +
        Math.floor(moment().tz('Europe/Berlin').hour() / 12) * 6;

      this.berlin_minute = moment().tz('Europe/Berlin').minute() * 6;
      this.berlin_second = moment().tz('Europe/Berlin').second() * 6;
      this.berlin_time = moment().tz('Europe/Berlin').format('h:m:s:A');

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
