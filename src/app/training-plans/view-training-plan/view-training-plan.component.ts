import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-training-plan',
  templateUrl: './view-training-plan.component.html',
  styleUrls: ['./view-training-plan.component.scss'],
})
export class ViewTrainingPlanComponent implements OnInit {

  @Output() toggleViewAllPlans: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  viewById(id: number): void {
    console.log(id)
  }

  savePlan(): void {
    this.toggleViewAllPlans.emit();
  }

}
