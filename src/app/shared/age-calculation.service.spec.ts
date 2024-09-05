import { TestBed } from '@angular/core/testing';

import { AgeCalculationService } from './age-calculation.service';

describe('AgeCalculationService', () => {
  let service: AgeCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
