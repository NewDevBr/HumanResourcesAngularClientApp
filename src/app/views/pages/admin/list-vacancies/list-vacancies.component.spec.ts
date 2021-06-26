import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVacanciesComponent } from './list-vacancies.component';

describe('ListVacanciesComponent', () => {
  let component: ListVacanciesComponent;
  let fixture: ComponentFixture<ListVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVacanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
