import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { TrainingPlanDto } from 'src/app/interfaces/training-plan.dto.interface';
import { TrainingPlanStorageService } from 'src/app/services/training-plan-storage-service';

@Component({
  selector: 'app-view-training-plans',
  templateUrl: './view-training-plans.component.html',
  styleUrls: ['./view-training-plans.component.scss'],
})
export class ViewTrainingPlansComponent implements OnInit {
  @Output() toggleViewSpecificPlan: EventEmitter<any> = new EventEmitter();

  trainingPlans: TrainingPlanDto[]

  constructor(private storage: TrainingPlanStorageService) { }

  ngOnInit() { 
    try {
      this.storage.state().pipe(
        switchMap(res => {
          if (res) {
            return this.storage.fetch();
          } else {
            return of([]); // Return an empty array when res is false
          }
        })
      ).subscribe(data => {
        this.trainingPlans = data; // Update the user list when the data changes
      });

    } catch(err) {
      throw new Error(`Error: ${err}`);
    }

  }

  createPlan(): void {
    this.toggleViewSpecificPlan.emit(null);
  }

  deletePlan(plan: TrainingPlanDto) {
    this.storage.deleteById(plan);
  }

}
