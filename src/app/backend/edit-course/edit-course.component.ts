import { MainService } from './../../frontend/choose/main/main.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../share/backend.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditCourseComponent implements OnInit {

  constructor(public mainService: MainService,
              public backendService: BackendService,
              public snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  courseForm: FormGroup;
  editForm: FormGroup;
  selected: string;
  code: string;
  courseName: string;
  teacherName: string;
  site: string;
  date: string;
  time: string;
  require: string;
  score: string;
  level: string;
  currentIndex: number;
  courseInfo = [];

  ngOnInit() {
    this.backendService.getSiteList();
    this.mainService.getCourseData('', '不拘');
    this.mainService.getCollegeList();
    this.courseForm = new FormGroup({
      college : new FormControl(),
      department : new FormControl(),
      level : new FormControl(),
      require : new FormControl()
    });
    this.editForm = new FormGroup({
      code: new FormControl(),
      courseName: new FormControl(),
      teacherName: new FormControl(),
      site: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),
      require: new FormControl(),
      score: new FormControl(),
      level: new FormControl(),
    });
  }

  onOpen() {
    this.mainService.getCollegeList();
  }

  onSearch() {
    const formValue = this.courseForm.value;
    const level = formValue.department + formValue.level;
    const require = formValue.require;
    this.mainService.getCourseData(level, require);
    setTimeout(() => {
      this.mainService.getCourseData(level, require);
      this.courseInfo = this.mainService.CourseInfo;
    }, 100);
    this.editForm.reset();
  }

  onUpdate() {
    if (this.mainService.CourseInfo[this.currentIndex] !== undefined) {
      this.snackBar.open('成功更新該筆課程資料!', '確認', {
        duration: 3000,
      });
      const obj = this.editForm.value;
      obj.id = this.mainService.CourseInfo[this.currentIndex].id;
      this.courseInfo[this.currentIndex] = obj;
      this.mainService.CourseInfo[this.currentIndex] = obj;
      console.log(this.mainService.CourseInfo[this.currentIndex]);
      this.httpClient.patch(`http://127.0.0.1:8000/api/course/${obj.id}/`, this.editForm.value)
      .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      this.editForm.reset();
    } else {
      this.snackBar.open('無效的動作!', '確認', {
        duration: 3000,
      });
    }
  }

  onDelete() {
    if (this.mainService.CourseInfo[this.currentIndex] !== undefined) {
      this.snackBar.open('成功刪除該筆課程資料!', '確認', {
        duration: 3000,
      });
      const obj = this.editForm.value;
      obj.id = this.mainService.CourseInfo[this.currentIndex].id;
      this.courseInfo.splice(this.currentIndex, 1);
      this.mainService.CourseInfo.splice(this.currentIndex, 1);
      this.httpClient.delete(`http://127.0.0.1:8000/api/course/${obj.id}/`, this.editForm.value)
      .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      this.editForm.reset();
    } else {
      this.snackBar.open('無效的動作!', '確認', {
        duration: 3000,
      });
    }
  }

  onEdit(num: number) {
    const course = this.mainService.CourseInfo[num];
    this.currentIndex = num;
    this.code = course.code;
    this.courseName = course.courseName;
    this.teacherName = course.teacherName;
    this.site = course.site;
    this.date = course.date;
    this.time = course.time;
    this.require = course.require;
    this.score = course.score;
    this.level = course.level;
  }

}
