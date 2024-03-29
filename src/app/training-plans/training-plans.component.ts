import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.scss'],
})
export class TrainingPlansComponent implements OnInit {
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
