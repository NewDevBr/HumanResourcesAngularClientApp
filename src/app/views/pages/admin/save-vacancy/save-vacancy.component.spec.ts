import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveVacancyComponent } from './save-vacancy.component';

describe('SaveVacancyComponent', () => {
  let component: SaveVacancyComponent;
  let fixture: ComponentFixture<SaveVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveVacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
