import { TestBed } from '@angular/core/testing';

import { CandidateInterceptor } from './candidate.interceptor';

describe('CandidateInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CandidateInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CandidateInterceptor = TestBed.inject(CandidateInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
