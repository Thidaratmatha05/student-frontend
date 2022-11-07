import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = "http://localhost:4000/api/v1/student";
  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  createNewStudent(data: Student): Observable<any> {
    return this.httpClient.post(this.API_URL, data);
  }
  getAllStudent() {
    return this.httpClient.get(this.API_URL);
  }
  deleteStudent(id: number): Observable<any> {
    let apiurl = `${this.API_URL}/${id}`;
    console.log(apiurl);
    return this.httpClient.delete(apiurl, { headers: this.httpHeader }).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent)
      errorMessage = error.error.message;
    else
      errorMessage = "error code:" + error.status + error.message;

    console.log(errorMessage);
    return errorMessage;
  }
}
