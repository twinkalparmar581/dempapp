import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/Services/departmentService';
import { EmployeeService } from 'src/app/Services/employeeService';
import { DepartmentDialogComponent } from '../../departments/departmentDialog/departmentDialogcomponent';
import { Department } from '../../departments/departmentList/departmentList.component';
import { Employee } from '../employeeList/employeeList.component';

@Component({
  selector: 'employeeDialog',
  templateUrl: './employeeDialog.component.html',
  styleUrls: ['./employeeDialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  employeeForm!: FormGroup;
  isLoadingResults = false;
  isView!: boolean;
  _id: any;
  employeeId: any; 
  employeeDetails: any;
  pageTitle = "Employee"
  department: any; 
  isDataSaving: boolean = false;

  // departments: any[] = [
  //   { id: 'IT' },
  //   { id: 'Development' },
  //   { id: 'Management' },
  //   { id: 'Testing' },
 

  // ];

  departments: any[] = []; 

  designations: any[] = [
    { id: 'IT Support' },
    { id: 'Developer' },
    { id: 'Manager' },
    { id: 'Tester' },
    { id: 'Service' },

  ];

  genders: any[] = [
    { id: 'Male' },
    { id: 'Female' },
    { id: 'Others' },

  ];

  employees: Observable<Employee[]> | undefined;

  constructor(

    public _employeeService: EmployeeService,
    public matDialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _departmentService : DepartmentService

  ) {

    this.employeeId = _data.id;
    this.isView = _data.isView;


    if (this.employeeId === undefined) {
      this.employeeId = '';
    }

    this.createEmployeeForm();
  }

  createEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      id: new FormControl('0'),
      joiningDate: new FormControl(''),
      employeeName: new FormControl('', { validators: [Validators.required,] }),
      contactNo: new FormControl('', { validators: [] }),
      emailId: new FormControl('', { validators: [Validators.email,] }),
      gender: new FormControl('', { validators: [Validators.required,] }),  
      designation: new FormControl('')  ,
      departmentId : new FormControl(null)
    });  
  }


  ngOnInit(): void {

    
     this._departmentService.getDepartmentList().subscribe((res) => {
      this.departments= res;
    });
    

    if (this.employeeId !== '') {
      this._employeeService.getEmployeeDetails(this.employeeId).subscribe((res) => {


        const tempEmployeeDetails = res;



        this.employeeId = tempEmployeeDetails.id;

        this.employeeForm.patchValue({

          id: tempEmployeeDetails.id || '',
          employeeName: tempEmployeeDetails.employeeName || '',
          contactNo: tempEmployeeDetails.contactNo || '',
          emailId: tempEmployeeDetails.emailId || '',
          departmentId: tempEmployeeDetails.departmentId || '',
          designation: tempEmployeeDetails.designation || '',
          gender: tempEmployeeDetails.gender || '',
          joiningDate: tempEmployeeDetails.joiningDate || '',

        });

   

       



        this.employeeDetails = tempEmployeeDetails;

      });
    }
  }


  reloadCurrentPage() {
    window.location.reload();
   }
  onCancel(): void {
    this.closeDialog(false);
  }

  disableSubmitButton(): boolean {
    var isDisabled = false;

    if (this.employeeForm.invalid) {
      isDisabled = true;
    }
    else if (this.isDataSaving === true) {
      isDisabled = true;
    }
    return isDisabled;
  }

  onSubmit(): void {
    // if (this.disableSubmitButton() === true) {
    //   return;
    // }
    this.isDataSaving = true;
    const formData = this.employeeForm.value;

    


    if (this.employeeId !== '') {
      this._employeeService

        .updateEmployeeDetails(this.employeeId, formData)
        .subscribe((res) => {

          this.isDataSaving = false;
          this.closeDialog(true);
          //this.reloadCurrentPage()
        });

        console.log(formData)
      
    }

    else {

      this._employeeService

        .saveEmployee(formData)
        .subscribe((res) => {

          this.isDataSaving = false;
          this.closeDialog(true);
          this.reloadCurrentPage()
        });

     

    }


  }

  closeDialog(withUpjoiningDate: boolean) {
    this.matDialogRef.close(withUpjoiningDate);
  }


}
