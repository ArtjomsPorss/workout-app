import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { WorkoutPlansComponent } from '../workout-plans/workout-plans.component';
import { ViewWorkoutPlanComponent } from '../workout-plans/view-workout-plan/view-workout-plan.component';
import { ViewWorkoutPlansComponent } from '../workout-plans/view-workout-plans/view-workout-plans.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, WorkoutPlansComponent, AddWorkoutComponent, ViewWorkoutPlanComponent, ViewWorkoutPlansComponent]
})
export class Tab2PageModule { }
