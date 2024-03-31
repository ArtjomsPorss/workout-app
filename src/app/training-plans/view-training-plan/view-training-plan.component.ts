import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrainingPlanDto } from 'src/app/interfaces/training-plan.dto.interface';
import { TrainingPlanStorageService } from 'src/app/services/training-plan-storage-service';

@Component({
  selector: 'app-view-training-plan',
  templateUrl: './view-training-plan.component.html',
  styleUrls: ['./view-training-plan.component.scss'],
})
export class ViewTrainingPlanComponent implements OnInit {

  @Output() toggleViewAllPlans: EventEmitter<any> = new EventEmitter();
  trainingPlan: TrainingPlanDto | null = null; 

  constructor(private trainingPlanStorage: TrainingPlanStorageService) { }

  ngOnInit() { }

  viewById(id: number): void {
    console.log(id)
    if (id) {
      this.trainingPlanStorage.getById(id).then(plans => this.trainingPlan = plans[0])
    } else {
      this.trainingPlanStorage.add({name: ''}).then(plans => this.trainingPlan = plans[0])
    }
  }

  savePlan(): void {
    this.toggleViewAllPlans.emit();
  }

}
