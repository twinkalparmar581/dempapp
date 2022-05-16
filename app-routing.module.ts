import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DepartmentListComponent } from './pages/departments/departmentList/departmentList.component';
import { EmployeeListComponent } from './pages/employees/employeeList/employeeList.component';

const routes: Routes = [

{path: 'employeeList', component: EmployeeListComponent},
{path: 'departmentList', component: DepartmentListComponent},

 {path: '**', component: AppComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
