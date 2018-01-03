import { CoreService } from './../../core/core.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { MainService } from '../../frontend/choose/main/main.service';
import { BackendService } from '../share/backend.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherInfoComponent implements OnInit {

  constructor(public mainService: MainService,
              public backendService: BackendService,
              private coreService: CoreService) { }
  selected: string;
  teacherForm: FormGroup;
  teacherInfo = [];
  ngOnInit() {
    this.mainService.getAllCourseData();
    this.coreService.getAllStudentData();
    this.backendService.getAllTeacherList();
    this.teacherForm = new FormGroup({
      college : new FormControl(),
      department : new FormControl(),
      teacherName : new FormControl(),
    });
  }

  onOpen() {
    this.mainService.getCollegeList();
  }

  onSearch() {
    this.teacherInfo = [];
    const teacherName = this.teacherForm.value.teacherName;
    const courseList = this.mainService.CourseInfo
                        .filter(item => item.teacherName === teacherName);
    courseList.forEach(course => {
      const tempList = [];
      const teacherData = course;
      this.coreService.studentDataList.forEach(student => {
        const courseCode = student.courseCode.split(',');
        courseCode.forEach(code => {
          if (code === course.code) {
            tempList.push(student);
          }
        });
      });
      teacherData['students'] = tempList;
      teacherData['dataLength'] = tempList.length;
      this.teacherInfo.push(teacherData);
    });
  }

  getTeacherList() {
    const department = this.teacherForm.value.department;
    this.backendService.getTeacherList(department + '系');
  }
}
