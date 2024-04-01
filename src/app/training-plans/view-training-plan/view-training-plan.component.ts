import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of, switchMap, throwError } from 'rxjs';
import { TrainingPlanDto } from 'src/app/interfaces/training-plan.dto.interface';
import { TrainingWeekDto } from 'src/app/interfaces/training-week.dto.interface';
import { TrainingWeek } from 'src/app/interfaces/training-week.interface';
import { TrainingPlanStorageService } from 'src/app/services/training-plan-storage.service';
import { TrainingWeekStorageService } from 'src/app/services/training-week-storage.service';

@Component({
  selector: 'app-view-training-plan',
  templateUrl: './view-training-plan.component.html',
  styleUrls: ['./view-training-plan.component.scss'],
})
export class ViewTrainingPlanComponent implements OnInit {

  @Output() toggleViewAllPlans: EventEmitter<any> = new EventEmitter();
  trainingPlan: TrainingPlanDto | null = null; 
  planName: string = ''

  weeks: TrainingWeekDto[] = [
  ];
  selectedWeekId: number | any = 1;

  constructor(private trainingPlanStorage: TrainingPlanStorageService,
    private trainingWeekStorage: TrainingWeekStorageService) { }

  ngOnInit() { 
  }

  viewById(id: number): void {
    console.log(id)
    if (id) {
      this.trainingPlanStorage.getById(id).then(plans => {
        this.trainingPlan = plans[0]; 
        this.populateLists(this.trainingPlan.id)
      })
    } else {
      this.trainingPlanStorage.add({name: ''}).then(planId => {
        this.trainingPlan = {id: planId, name: this.planName};
        this.populateLists(this.trainingPlan.id)
      })
    }
  }

  savePlan(): void {
    if (!this.planName) {
      return;
    } else if (!this.trainingPlan.name) {
      this.trainingPlan.name = this.planName
    }

    this.trainingPlanStorage.updateById(this.trainingPlan)
    this.toggleViewAllPlans.emit();
  }

  addWeek(): void {
    if (!this.trainingPlan.id) {
      throwError(() => new Error('training plan Id was not populated to add a training week'));
    }
    let existingWeekMaxNum: number = this.weeks.length === 0 ? 0 : this.weeks.reduce((a,b) => a.num > b.num ? a : b).num
    this.trainingWeekStorage.add({num: existingWeekMaxNum + 1, plan_id: this.trainingPlan.id});
  }
  populateLists(planId: number) {
     try {
      this.trainingWeekStorage.state(planId).pipe(
        switchMap(res => {
          if (res) {
            return this.trainingWeekStorage.fetch();
          } else {
            return of([]); // Return an empty array when res is false
          }
        })
      ).subscribe(data => {
        this.weeks = data; // Update the user list when the data changes
      });

    } catch (err) {
      throw new Error(`Error: ${err}`);
    }

  }
}
