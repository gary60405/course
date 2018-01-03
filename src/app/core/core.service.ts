import { Injectable } from '@angular/core';
import { Data, Course, StudentData } from './main.models';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CoreService {
  constructor(private httpClient: HttpClient) { }

  public studentDataList = [];

 getAllStudentData() {
  this.httpClient.get<StudentData[]>('https://garycourse.herokuapp.com/api/student/')
  .subscribe(list => {
    this.studentDataList = list;
  });
 }

 getStudentData(studentID) {
   return this.studentDataList.find(data => data.studentID === studentID);
 }

 updateCourse(id, course) {
  this.httpClient.patch(`https://garycourse.herokuapp.com/api/student/${id}/`, course)
    .subscribe(
      res => res,
      err => err
    );
 }



}
