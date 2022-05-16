import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/Services/departmentService';
import { DepartmentDialogComponent } from '../departmentDialog/departmentDialogcomponent';
import { Action, Store } from "@ngrx/store";

export interface Department {
  departmentName: string;
  SrNo: number;
  designation: string; 
  department: string;
  contactNo : number
  emailId: string
  gender: string
}

@Component({
  selector: 'app-departmentList',
  templateUrl: './departmentList.component.html',
  styleUrls: ['./departmentList.component.scss']
})
export class DepartmentListComponent implements OnInit {

  departmentId: any; 
  department: any;
  animal!: string ;
  departmentName!: string;
  departments: Observable<Department[]> | undefined;

  

  isLoadingResults = false;
  
  constructor(
 
    public dialog: MatDialog,
  
     public _departmentService: DepartmentService,
   
 
  ) {  } 

  ngOnInit(): void {
   
  }


  displayedColumns: string[] = ['departmentName','actions'];
  dataSource2 = this._departmentService.getDepartmentList()
 

  deleteDepartment(id: string) {
    this._departmentService.deleteDepartment(id)
      .subscribe(
        department => {
          console.log(department);
          this.reloadData();
         
        },
        
        error => console.log(error));
  }

  loadAddEditDepartment(departmentId: any,isView: boolean) {
        let dialogRef = this.dialog.open(DepartmentDialogComponent, {
            panelClass: 'departmentDialog',
            width: '800px',
           
            data: {
              id: departmentId,
              isView: isView
            }
          });
    
        dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
              if (!response) {
                return;
              }

           
              this.reloadData();
            });
      }


      reloadData() {

        this._departmentService.getDepartmentList()
        .subscribe((department: any) => {
          this.departments = department;
        
        });
    
        
      }
}


