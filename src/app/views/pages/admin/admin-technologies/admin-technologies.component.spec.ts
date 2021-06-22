import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnologiesComponent } from './admin-technologies.component';

describe('AdminTechnologiesComponent', () => {
  let component: AdminTechnologiesComponent;
  let fixture: ComponentFixture<AdminTechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTechnologiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
