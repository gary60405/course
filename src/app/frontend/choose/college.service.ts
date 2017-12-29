import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MainService } from './main/main.service';



@Injectable()
export class CollegeService {

  constructor(private mainService: MainService) { }

  public selectedCourse = [];
  public selectedSubject = new Subject;

  convertCourseCode(codeString: string) {
    const codeList = codeString.split(',');
    this.selectedCourse = this.mainService.CourseInfo.filter(course => {
      return codeList.find(code => course.code === code) !== undefined;
    });
    this.selectedSubject.next();
  }

}

