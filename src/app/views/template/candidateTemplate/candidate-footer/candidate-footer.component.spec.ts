import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFooterComponent } from './candidate-footer.component';

describe('CandidateFooterComponent', () => {
  let component: CandidateFooterComponent;
  let fixture: ComponentFixture<CandidateFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
