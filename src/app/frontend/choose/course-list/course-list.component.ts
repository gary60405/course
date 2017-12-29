import { CoreService } from './../../../core/core.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CollegeService } from '../college.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListComponent implements OnInit {

  constructor(public collegeService: CollegeService,
              private authService: AuthService,
              private coreService: CoreService) { }

  score = 0;
  selectedCourse = [];
  ngOnInit() {
    this.collegeService.selectedSubject
      .subscribe(() => this.selectedCourse = this.collegeService.selectedCourse);
    this.collegeService.convertCourseCode(this.authService.userInfo['courseCode']);
    this.collegeService.selectedSubject.next();
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

  onDelete(index: number) {
    this.score = 0;
    this.deleteCourse(this.collegeService.selectedCourse[index].code);
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

  deleteCourse(code: string) {
    const course = {};
    const id = this.authService.userInfo['id'];
    let codeString = this.authService.userInfo['courseCode'];
    let codelist = codeString.split(',');
    codelist = codelist.filter(item => item !== code);
    codeString = '';
    codelist.forEach(item => codeString += item + ',');
    course['courseCode'] = codeString.slice(0, -1);
    this.authService.userInfo['courseCode'] = codeString.slice(0, -1);
    this.collegeService.convertCourseCode(codeString);
    this.coreService.updateCourse(id, course);
  }

}
