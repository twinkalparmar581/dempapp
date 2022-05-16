import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {  Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class EmployeeService {

    private baseUrl = 'https://localhost:44338/api/Employees';


   httpOptions = {

    headers: new HttpHeaders({

      "Content-type": "Application/json",
      'Access-Control-Allow-Origin': '*',
      "ApiKey": "ECBB82291CEF372F0CBC66DD11D66DA5",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"

    })
  };
   
    constructor( private http: HttpClient) { }
  
    getEmployeeDetails(id: string): Observable<any> {
  
      return this.http.get(`${this.baseUrl}/${id}`,this.httpOptions);
    }

    saveEmployee(employee: Object): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, employee,this.httpOptions);
    }
  
    updateEmployeeDetails(Id: string, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${Id}`, value,this.httpOptions); 
    }

    checkEmployeeCanBeDeleted(Id: string): Observable<any> {
    
      return this.http.post(`${this.baseUrl}/${Id}`, this.httpOptions);
  }
    deleteEmployee(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions);
      }
    
      getEmployeesList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`,this.httpOptions);
      }
    }

