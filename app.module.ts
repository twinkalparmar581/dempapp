import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './Services/employeeService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeDialogComponent } from './pages/employees/employeeDialog/employeeDialogcomponent';
import { EmployeeListComponent } from './pages/employees/employeeList/employeeList.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication,InteractionType, BrowserCacheLocation} from '@azure/msal-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DepartmentDialogComponent } from './pages/departments/departmentDialog/departmentDialogcomponent';
import { DepartmentListComponent } from './pages/departments/departmentList/departmentList.component';



export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '349efc46-600b-4694-b4ac-cc241e5bc425',
      authority: "https://login.microsoftonline.com/b48efe37-3a61-4b68-9eda-5b94b455d105",
      redirectUri: 'http://localhost:4200'
    }
  });
}
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDialogComponent,
    DepartmentDialogComponent,
    DepartmentListComponent
  
  ],
  imports: [

    FlexLayoutModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule, 
    PortalModule,
    ScrollingModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MsalModule
    
  ],
  exports: [
    EmployeeDialogComponent,
    
  ],
  providers: [
    EmployeeService ,
   

    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
    
  ],

  
    entryComponents: [
      EmployeeDialogComponent,
      DepartmentListComponent
    ],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
