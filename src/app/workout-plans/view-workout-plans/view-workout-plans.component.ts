import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-workout-plans',
  templateUrl: './view-workout-plans.component.html',
  styleUrls: ['./view-workout-plans.component.scss'],
})
export class ViewWorkoutPlansComponent implements OnInit {
  @Output() toggleViewSpecificPlan: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  createPlan(): void {
    this.toggleViewSpecificPlan.emit();
  }

}
