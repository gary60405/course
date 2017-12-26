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
    this.codeList = this.CourseInfo.map(course => course = course.code);
  }

  getCourseData(level, require) {
    return this.CourseInfo.filter((course: Course) => {
      if (require === '不拘') {
        return course.level === level;
      } else {
        return course.level === level && course.require === require;
      }
    });
  }

  getAllCourseData() {
    this.httpClient.get<Course[]>('https://garycourse.herokuapp.com/api/course/')
      .map((courseList: Course[]) => {
        return courseList;
      })
      .subscribe((data) => {
        this.CourseInfo = data;
        return data;
      });
  }
  getCollegeData() {
    this.httpClient.get('https://garycourse.herokuapp.com/api/college/')
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
    this.httpClient.get('https://garycourse.herokuapp.com/api/department/')
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
  }
  getCollegeList() {
    this.CollegeList = [];
    // this.httpClient.get('https://garycourse.herokuapp.com/api/college/')
    //   .map((rows: any[]) => {
    //    let i = rows.length;
    //    while (i--) {
    //     rows[i] = rows[i].college;
    //    }
    //     return rows;
    //   })
    //   .subscribe((data) => {
    //     this.collegeList = data;
    //   });

    // this.httpClient.get('https://garycourse.herokuapp.com/api/department/')
    //   .map((rows: any[]) => {
    //     let i = rows.length;
    //     while (i--) {
    //       delete rows[i].id;
    //       rows[i].college = this.collegeList[rows[i].college - 1];
    //     }
    //     return rows.reverse();
    //   })
    //   .subscribe((data) => {
    //     this.departmentList = data;
    //   });

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
