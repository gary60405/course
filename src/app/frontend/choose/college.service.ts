import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MainService } from './main/main.service';



@Injectable()
export class CollegeService {

  constructor(private mainService: MainService,
              private httpClient: HttpClient) { }

  public selectedCourse = [];
  public UnrollData = [];
  public selectedSubject = new Subject;

  convertCourseCode(codeString: string) {
    const codeList = codeString.split(',');
    this.selectedCourse = this.mainService.CourseInfo.filter(course => {
      return codeList.find(code => course.code === code) !== undefined;
    });
    this.selectedSubject.next();
  }

  getUnrollData() {
    this.httpClient.get('https://garycourse.herokuapp.com/api/deleteCourse/')
      .subscribe((data: string[]) => {
        this.UnrollData = data;
      });
  }

  deleteUnrollData(id) {
    this.httpClient.delete(`https://garycourse.herokuapp.com/api/deleteCourse/${id}/`)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }
}

