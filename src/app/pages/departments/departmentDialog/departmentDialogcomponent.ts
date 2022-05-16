import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/Services/departmentService';
import { Department } from '../departmentList/departmentList.component';

@Component({
  selector: 'departmentDialog',
  templateUrl: './departmentDialog.component.html',
  styleUrls: ['./departmentDialog.component.scss']
})
export class DepartmentDialogComponent implements OnInit {

  departmentForm!: FormGroup;
  isLoadingResults = false;
  isView!: boolean;
  _id: any;
  departmentId: any; 
  departmentDetails: any;
  pageTitle = "Department"
  public confirmMessage!: string;
  isDataSaving: boolean = false;

  departments: any[] = [
    { id: 'IT' },
    { id: 'Development' },
    { id: 'Management' },
    { id: 'Testing' },
    { id: 'Service' },

  ];

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

  // departments: Observable<Department[]> | undefined;

  constructor(

    public _departmentService: DepartmentService,
    public matDialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,

  ) {

    this.departmentId = _data.id;
    this.isView = _data.isView;

    console.log('isView', this.isView)

    console.log("id", this.departmentId)

    if (this.departmentId === undefined) {
      this.departmentId = '';
    }

    this.createDepartmentForm();
  }

  createDepartmentForm(): void {
    this.departmentForm = new FormGroup({
      id: new FormControl('0'),
      departmentName: new FormControl('', { validators: [Validators.required,] }),
     
    });
  }


  ngOnInit(): void {



    if (this.departmentId !== '') {
      this._departmentService.getDepartmentDetails(this.departmentId).subscribe((res) => {


        const tempDepartmentDetails = res;



        this.departmentId = tempDepartmentDetails.id;

        this.departmentForm.patchValue({

          id: tempDepartmentDetails.id || '',
          departmentName: tempDepartmentDetails.departmentName || '',
      

        });



        this.departmentDetails = tempDepartmentDetails;

      });
    }
  }



  onCancel(): void {
    this.closeDialog(false);
  }

  disableSubmitButton(): boolean {
    var isDisabled = false;

    if (this.departmentForm.invalid) {
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
    const formData = this.departmentForm.value;


    if (this.departmentId !== '') {
      this._departmentService

        .updateDepartmentDetails(this.departmentId, formData)
        .subscribe((res) => {

          this.isDataSaving = false;
          this.closeDialog(true);
        });
    }

    else {

      this._departmentService

        .saveDepartment(formData)
        .subscribe((res) => {

          this.isDataSaving = false;
          this.closeDialog(true);
        });

    }


  }

  closeDialog(withUpjoiningDate: boolean) {
    this.matDialogRef.close(withUpjoiningDate);
  }


}
