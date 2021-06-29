import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVacanciesCandidateComponent } from './list-vacancies-candidate.component';

describe('ListVacanciesCandidateComponent', () => {
  let component: ListVacanciesCandidateComponent;
  let fixture: ComponentFixture<ListVacanciesCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVacanciesCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVacanciesCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
