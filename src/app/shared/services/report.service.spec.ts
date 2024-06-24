import { TestBed } from '@angular/core/testing';
import { expect } from 'chai'; // Import the 'expect' function from the 'chai' library

import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).to.be.ok; // Use the 'expect' function to check if the service is truthy
  });
});
