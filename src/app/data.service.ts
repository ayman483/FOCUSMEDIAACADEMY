import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "http://localhost/Api/";

  constructor(private httpClient: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  // student
  public add_student(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'create_students', data, httpOptions);
  }

  public update_student(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'update_students', data, httpOptions);
  }

  public delete_student(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'delete_students', data, httpOptions);
  }
  public get_students_list() {
    return this.httpClient.get(this.REST_API_SERVER + 'get_students_list');
  }

  // class
  public add_class(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'create_class', data, httpOptions);
  }

  public update_class(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'update_class', data, httpOptions);
  }

  public delete_class(data: any) {
    return this.httpClient.post(this.REST_API_SERVER + 'delete_class', data, httpOptions);
  }
  public get_class_list() {
    return this.httpClient.get(this.REST_API_SERVER + 'get_class_list');
  }
}
