import { CollegeService } from './../college.service';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unroll',
  templateUrl: './unroll.component.html',
  styleUrls: ['./unroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UnrollComponent implements OnInit {

  constructor(public collegeService: CollegeService,
              private authService: AuthService,
              private httpClient: HttpClient,
              public el: ElementRef) { }
  score = 0;
  btnText: string;
  selectedCourse = [];
  ngOnInit() {
    this.collegeService.getUnrollData();
    const userID = this.authService.userInfo['studentID'];
    const unrollData = this.collegeService.UnrollData.filter(item => item.studentID === userID);
    this.collegeService.convertCourseCode(this.authService.userInfo['courseCode']);
    this.selectedCourse = this.collegeService.selectedCourse.map(course => {
      const isFind = unrollData.find(data => data.code === course.code);
      if (isFind !== undefined) {
        if (isFind.result === '核准') {
          course['btnColor'] = 'mat-raised-button bg-success text-white';
          course['btnText'] = '已核准';
          course['isDisabled'] = true;
        } else if (isFind.result === 'apply') {
          course['btnColor'] = 'mat-raised-button bg-secondary text-white';
          course['btnText'] = '審核中';
          course['isDisabled'] = true;
        } else {
          course['btnColor'] = 'mat-raised-button bg-warning text-white';
          course['btnText'] = '不核可';
          course['isDisabled'] = true;
        }
      } else {
          course['btnColor'] = 'mat-raised-button mat-accent';
          course['btnText'] = '退選';
          course['isDisabled'] = false;
      }
      return course;
    });
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

  unroll(index: number) {
    const data = {};
    data['code'] = this.collegeService.selectedCourse[index].code;
    data['studentID'] = this.authService.userInfo['studentID'];
    data['studentName'] = this.authService.userInfo['studentName'];
    data['result'] = 'apply';
    this.el.nativeElement.querySelector(`#btn_${index}`).innerHTML = '審核中';
    this.el.nativeElement.querySelector(`#btn_${index}`).setAttribute('disabled', 'true');
    this.el.nativeElement.querySelector(`#btn_${index}`).setAttribute('class', 'mat-raised-button bg-secondary text-white');
    this.httpClient.post('https://garycourse.herokuapp.com/api/deleteCourse/', data)
      .subscribe(
        res => res,
        err => err
      );
  }
}
