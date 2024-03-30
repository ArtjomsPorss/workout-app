import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-training-plans',
  templateUrl: './view-training-plans.component.html',
  styleUrls: ['./view-training-plans.component.scss'],
})
export class ViewTrainingPlansComponent implements OnInit {
  @Output() toggleViewSpecificPlan: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  createPlan(): void {
    this.toggleViewSpecificPlan.emit(null);
  }

}
