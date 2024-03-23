import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-plans',
  templateUrl: './workout-plans.component.html',
  styleUrls: ['./workout-plans.component.scss'],
})
export class WorkoutPlansComponent implements OnInit {
  viewAllPlans: boolean = true;
  viewSinglePlan: boolean = false;

  constructor() { }

  ngOnInit() { }

  toggleViewAllPlans(): void {
    this.viewAllPlans = true;
    this.viewSinglePlan = false;
  }

  toggleViewSinglePlan(): void {
    this.viewAllPlans = false;
    this.viewSinglePlan = true;
  }

}
