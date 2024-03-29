import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';

import { AddSessionComponent } from '../add-session/add-session.component';
import { TrainingPlansComponent } from '../training-plans/training-plans.component';
import { ViewTrainingPlanComponent } from '../training-plans/view-training-plan/view-training-plan.component';
import { ViewTrainingPlansComponent } from '../training-plans/view-training-plans/view-training-plans.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page, TrainingPlansComponent, AddSessionComponent, ViewTrainingPlanComponent, ViewTrainingPlansComponent]
})
export class Tab2PageModule { }
