import { CoreService } from './../../../core/core.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Data, Course } from './../../../core/main.models';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class MainService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private coreService: CoreService) { }
  public CourseInfo = [];
  public codeList = [];
  public CollegeList: Data[]= [];
  private collegeList = [];
  private departmentList = [];
  dialogDisplaySubject = new Subject();

  getCourseCode() {
    this.codeList = this.CourseInfo.map(course => course = course.code);
  }

  searchCourseData(code) {
    return this.CourseInfo.find(item => item.code === code);
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

  appendCourse(code: string) {
    const course = {};
    const id = this.authService.userInfo['id'];
    let items = this.authService.userInfo['courseCode'];
    items === '' ? items = code : items += `,${code}`;
    course['courseCode'] = items;
    this.authService.userInfo['courseCode'] = items;
    this.coreService.updateCourse(id, course);
  }

}
