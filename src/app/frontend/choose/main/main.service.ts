import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Data, Course } from './../../../core/main.models';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

  constructor(private httpClient: HttpClient) { }
  public CourseInfo = [];
  public codeList = [];
  public CollegeList: Data[]= [];
  private collegeList = [];
  private departmentList = [];
  dialogDisplaySubject = new Subject();

  getCourseCode() {
    this.httpClient.get<any>('http://127.0.0.1:8000/api/course/?format=json')
    .map((courseList) => {
      let i = courseList.length;
      while (i--) {
        courseList[i] =  courseList[i].code;
      }
      return courseList;
    })
    .subscribe((data) => {
      this.codeList = data;
    });
  }

  getCourseData(level, require) {
    this.httpClient.get<Course[]>('http://127.0.0.1:8000/api/course/?format=json')
      .map((courseList: Course[]) => {
        if (require === '不拘') {
          courseList = courseList.filter(course => course.level === level);
          return courseList;
        } else {
          courseList = courseList.filter(course => course.level === level && course.require === require);
          return courseList;
        }
      })
      .subscribe((data) => {
        this.CourseInfo = data;
        return data;
      });
  }

  getAllCourseData() {
    this.httpClient.get<Course[]>('http://127.0.0.1:8000/api/course/?format=json')
      .map((courseList: Course[]) => {
        return courseList;
      })
      .subscribe((data) => {
        this.CourseInfo = data;
        return data;
      });
  }

  getCollegeList() {
    this.CollegeList = [];
    this.httpClient.get('http://127.0.0.1:8000/api/college/?format=json')
      .map((rows: any[]) => {
       let i = rows.length;
       while (i--) {
        rows[i] = rows[i].college;
       }
        return rows;
      })
      .subscribe((data) => {
        this.collegeList = data;
      });

    this.httpClient.get('http://127.0.0.1:8000/api/department/?format=json')
      .map((rows: any[]) => {
        let i = rows.length;
        while (i--) {
          delete rows[i].id;
          rows[i].college = this.collegeList[rows[i].college - 1];
        }
        return rows.reverse();
      })
      .subscribe((data) => {
        this.departmentList = data;
      });

      let j = this.collegeList.length;
      while (j--) {
        const data = {college: '', dep: []};
        data['college'] = this.collegeList[j];
        const department = [];
        let k = this.departmentList.length;
        while (k--) {
          if (this.collegeList[j] === this.departmentList[k].college) {
            delete this.departmentList[k].college;
            department.push(this.departmentList[k]);
          }
        }
        data['dep'] = department;
        this.CollegeList.push(data);
      }
      this.CollegeList = this.CollegeList.reverse();
  }

}
