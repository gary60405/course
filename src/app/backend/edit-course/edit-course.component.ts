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
    this.mainService.getAllCourseData();
    this.mainService.getCollegeData();
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

  searchCourseInfoNumber(id: number) {
    let i = this.mainService.CourseInfo.length;
    while (i--) {
      if (this.mainService.CourseInfo[i].id === id) {
        return i;
      }
    }
  }

  onSearch() {
    const formValue = this.courseForm.value;
    const level = formValue.department + formValue.level;
    const require = formValue.require;
    this.courseInfo = this.mainService.getCourseData(level, require);
    this.editForm.reset();
  }

  onUpdate() {
    if (this.courseInfo[this.currentIndex] !== undefined) {
      this.snackBar.open('成功更新該筆課程資料!', '確認', {
        duration: 3000,
      });
      const obj = this.editForm.value;
      obj.id = this.courseInfo[this.currentIndex].id;
      this.courseInfo[this.currentIndex] = obj;
      const index = this.searchCourseInfoNumber(obj.id);
      this.mainService.CourseInfo[index] = obj;
      console.log(this.courseInfo[this.currentIndex], this.mainService.CourseInfo[index]);
      this.httpClient.patch(`https://garycourse.herokuapp.com/api/course/${obj.id}/`, this.editForm.value)
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
    if (this.courseInfo[this.currentIndex] !== undefined) {
      this.snackBar.open('成功刪除該筆課程資料!', '確認', {
        duration: 3000,
      });
      const obj = this.editForm.value;
      obj.id = this.courseInfo[this.currentIndex].id;
      this.courseInfo.splice(this.currentIndex, 1);
      const index = this.searchCourseInfoNumber(obj.id);
      this.mainService.CourseInfo.splice(index, 1);
      this.httpClient.delete(`https://garycourse.herokuapp.com/api/course/${obj.id}/`, this.editForm.value)
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
    const course = this.courseInfo[num];
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
