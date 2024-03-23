import { TestBed } from '@angular/core/testing';

import { TrainingPlanStorageService } from './training-plan-storage.service';

describe('TrainingPlanStorageService', () => {
  let service: TrainingPlanStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPlanStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
