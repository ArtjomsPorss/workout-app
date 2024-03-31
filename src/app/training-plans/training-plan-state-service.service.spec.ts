import { TestBed } from '@angular/core/testing';

import { TrainingPlanStateServiceService } from './training-plan-state-service.service';

describe('TrainingPlanServiceService', () => {
  let service: TrainingPlanStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPlanStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
