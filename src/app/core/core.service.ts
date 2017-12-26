import { Injectable } from '@angular/core';
import { Data, Course, StudentData } from './main.models';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient) { }

  public studentDataList = [];
  public userInfo = {};
 getStudentData() {
  this.httpClient.get<StudentData[]>('https://garycourse.herokuapp.com/api/student/')
  .subscribe(list => {
    this.studentDataList = list;
  });
 }
}
