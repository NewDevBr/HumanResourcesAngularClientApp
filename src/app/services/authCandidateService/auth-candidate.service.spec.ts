import { TestBed } from '@angular/core/testing';

import { AuthCandidateService } from './auth-candidate.service';

describe('AuthCandidateService', () => {
  let service: AuthCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
