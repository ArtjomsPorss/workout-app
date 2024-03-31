import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanStateServiceService {

  planId: number | null
  weekId: number | null

  constructor() { }
}
