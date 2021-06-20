import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateNavBarComponent } from './candidate-nav-bar.component';

describe('CandidateNavBarComponent', () => {
  let component: CandidateNavBarComponent;
  let fixture: ComponentFixture<CandidateNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
