import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewTrainingPlanComponent } from './view-training-plan/view-training-plan.component';
import { ViewTrainingPlansComponent } from './view-training-plans/view-training-plans.component';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.scss'],
})
export class TrainingPlansComponent implements OnInit {
  viewAllPlans: boolean = true;
  viewSinglePlan: boolean = false;
  singlePlanId: number | any;

  // making sure the viewById is called on appViewTrainingPlan when it is initialised and if ID was passed
  @ViewChild('appViewTrainingPlan') set viewChild(appViewTrainingPlan: ViewTrainingPlanComponent) {
    if (appViewTrainingPlan) {
      appViewTrainingPlan.viewById(this.singlePlanId)
    }
  }
  @ViewChild('appViewTrainingPlans') appViewTrainingPlans: ViewTrainingPlansComponent;

  constructor() { }

  ngOnInit() { }

  toggleViewAllPlans(): void {
    this.viewAllPlans = true;
    this.viewSinglePlan = false;
  }

  toggleViewSinglePlan(id: number | any): void {
    this.viewAllPlans = false;
    this.viewSinglePlan = true;
    if (id) {
      this.singlePlanId = id
    }
  }

}
