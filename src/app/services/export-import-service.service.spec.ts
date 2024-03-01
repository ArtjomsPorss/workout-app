import { TestBed } from '@angular/core/testing';

import { ExportImportServiceService } from './export-import-service.service';

describe('ExportImportServiceService', () => {
  let service: ExportImportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportImportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
