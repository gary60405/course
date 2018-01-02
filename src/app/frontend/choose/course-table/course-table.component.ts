import { CollegeService } from './../college.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseTableComponent implements OnInit {

  constructor(private collegeService: CollegeService,
              private authService: AuthService) { }
  date = new Date();
  year: number;
  semester: number;
  course: any = [];
  user: string;
  ngOnInit() {
    this.user = this.authService.userInfo['studentName'];
    this.collegeService.convertCourseCode(this.authService.userInfo['courseCode']);
    this.year = this.date.getFullYear() - 1911;
    this.semester = 6 < (this.date.getMonth() + 1) ? 1 : 2;
    let i = 16;
    while (i--) {
      let j = 6;
      const temp = [];
      while (j--) {
        temp.push('*');
      }
      this.course.push(temp);
    }
    console.log(this.course);
    this.updateCourse();
  }

  updateCourse() {
    let i = this.course.length;
    // console.log(i);
    while (i !== 0) {
      this.searchList(i);
      // console.log(this.course[i]);
      i--;
    }
  }

  searchList(index: number) {
    let i = 5;
    while (i !== -1) {
      let j = this.collegeService.selectedCourse.length - 1;
      while (j !== -1) {
        let strIndex = index.toString(16).toUpperCase();
        strIndex === '10' ? strIndex = 'G' : strIndex = strIndex;
        const isFind = this.collegeService.selectedCourse[j].time.indexOf(strIndex);
        const checkDate = '';
        if (isFind !== -1) {
          switch (this.collegeService.selectedCourse[j].date) {
            case '星期一':
              this.course[index - 1][0] = this.collegeService.selectedCourse[j];
              break;
            case '星期二':
              this.course[index - 1][1] = this.collegeService.selectedCourse[j];
              break;
            case '星期三':
              this.course[index - 1][2] = this.collegeService.selectedCourse[j];
              break;
            case '星期四':
              this.course[index - 1][3] = this.collegeService.selectedCourse[j];
              break;
            case '星期五':
              this.course[index - 1][4] = this.collegeService.selectedCourse[j];
              break;
            case '星期六':
              this.course[index - 1][5] = this.collegeService.selectedCourse[j];
              break;
          }
          // console.log(this.collegeService.selectedCourse[j].time, strIndex);
        }
        j--;
      }
      i--;
    }
  }




}
