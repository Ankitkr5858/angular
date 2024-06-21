import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeadlineService } from '../deadline.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  secondsLeft: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit() {
    this.subscription = interval(1000).pipe(
      switchMap(() => this.deadlineService.getSecondsLeft())
    ).subscribe(response => {
      this.secondsLeft = response.secondsLeft;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
