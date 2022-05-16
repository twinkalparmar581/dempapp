import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employeeService';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EmployeeDialogComponent } from '../employeeDialog/employeeDialogcomponent';

export interface Employee {
  employeeName: string;
  SrNo: number;
  designation: string; 
  department: string;
  contactNo : number
  emailId: string
  gender: string
}

const ELEMENT_DATA: Employee[] = [
  { SrNo: 1, employeeName: 'Twinkal', designation: "Manager", department: 'IT' ,contactNo:9924567687,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 2, employeeName: 'Riya', designation: "Developer", department: 'Service',contactNo:652367687 ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 3, employeeName: 'Neel', designation: "Tester", department: 'Development',contactNo:8724567687  ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 4, employeeName: 'Dhara', designation: "System Engineer", department: 'IT' ,contactNo:9424567687 ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 5, employeeName: 'Nikhil', designation: "Tester", department: 'Service',contactNo:9224567687  ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 6, employeeName: 'Gagan', designation: "Developer", department: 'HR' ,contactNo:8024567687 ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 7, employeeName: 'Chirayu', designation: "Manager", department: 'Management' ,contactNo:8976567687 ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 8, employeeName: 'Amruta', designation: "System Engineer", department: 'Testing' ,contactNo:2021567687 ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 9, employeeName: 'Divya', designation: "Manager", department: 'Development',contactNo:765267687  ,emailId:"test@gmail.com",gender:"Female"},
  { SrNo: 10, employeeName: 'Richa', designation: "Developer", department: 'Service' ,contactNo:2211567687 ,emailId:"test@gmail.com",gender:"Female"},
];

@Component({
  selector: 'app-employeeList',
  templateUrl: './employeeList.component.html',
  styleUrls: ['./employeeList.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeId: any; 
  employee: any;
  animal!: string ;
  employeeName!: string;
  employees: Observable<Employee[]> | undefined;

  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  isLoadingResults = false;
  
  constructor(

    public dialog: MatDialog,
     public _employeeService: EmployeeService,
   
 
  ) { } 

  ngOnInit(): void {
   

  
   
  }

 
  displayedColumns: string[] = ['SrNo', 'employeeName', 'designation', 'department','contactNo','emailId','gender','actions'];
  dataSource = ELEMENT_DATA;

 
  displayedColumns2: string[] = ['SrNo', 'employeeName', 'designation', 'department','contactNo','emailId','gender','actions'];
  dataSource2 = this._employeeService.getEmployeesList()
 
 
  deleteEmployee(employeeId: string): void {

   
            
                this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
                    disableClose: false
                });

                this.confirmDialogRef.componentInstance.confirmMessage = 'Delete Employee?';

                this.confirmDialogRef.afterClosed(); {
                    
                        this._employeeService.deleteEmployee(employeeId) .subscribe(
                            employee => {
                              this.reloadData();
                        });
                    
                  
                }
            
           
        
    
}


  reloadCurrentPage() {
    window.location.reload();
   }

  loadAddEditEmployee(employeeId: any,isView: boolean) {
        let dialogRef = this.dialog.open(EmployeeDialogComponent, {
            panelClass: 'employeeDialog',
            width: '800px',
           
            data: {
              id: employeeId,
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

        this._employeeService.getEmployeesList()
        .subscribe((employee: any) => {
          this.employees = employee;
        
        });
    
        
      }
}


