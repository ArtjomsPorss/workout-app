import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-workout-plan',
  templateUrl: './view-workout-plan.component.html',
  styleUrls: ['./view-workout-plan.component.scss'],
})
export class ViewWorkoutPlanComponent implements OnInit {

  @Output() toggleViewAllPlans: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  savePlan(): void {
    this.toggleViewAllPlans.emit();
  }

}
