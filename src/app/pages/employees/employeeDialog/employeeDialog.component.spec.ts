import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDialogComponent } from './employeeDialogcomponent';

describe('EmployeeListComponent', () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
