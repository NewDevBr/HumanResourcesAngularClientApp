import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsManagementComponent } from './admins-management.component';

describe('AdminsManagementComponent', () => {
  let component: AdminsManagementComponent;
  let fixture: ComponentFixture<AdminsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
