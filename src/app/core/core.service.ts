import { Injectable } from '@angular/core';
import { Data, Course, StudentData } from './main.models';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient) { }

  public studentDataList = [];

 getStudentData() {
  this.httpClient.get<StudentData[]>('http://127.0.0.1:8000/api/student/')
  .subscribe(list => {
    this.studentDataList = list;
  });
 }
}
