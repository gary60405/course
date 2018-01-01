import { HttpClient } from '@angular/common/http';
import { CollegeService } from './../../frontend/choose/college.service';
import { CoreService } from './../../core/core.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainService } from '../../frontend/choose/main/main.service';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApprovalComponent implements OnInit {

  constructor(public mainService: MainService,
              private coreService: CoreService,
              private collegeService: CollegeService,
              private httpClient: HttpClient) { }
  selected: string;
  unrollForm: FormGroup;
  userInfo = [];
  panelOpenState = false;
  ngOnInit() {
    this.coreService.getAllStudentData();
    this.mainService.getCollegeData();
    this.collegeService.getUnrollData();
    this.unrollForm = new FormGroup({
      college : new FormControl(),
      department : new FormControl(),
      level : new FormControl(),
      require : new FormControl()
    });
  }

  onOpen() {
    this.mainService.getCollegeList();
  }

  onSearch() {
    this.userInfo = [];
    const studentIdSet = new Set();
    const level = this.unrollForm.value.department + this.unrollForm.value.level;
    const filterData = this.collegeService.UnrollData
                        .filter(data => this.getuserLevel(data.studentID) === level && data.result === 'apply');
    filterData.forEach(row => studentIdSet.add(row.studentID));
    studentIdSet.forEach(id => {
      const userData = {};
      const user = this.coreService.getStudentData(id);
      const applyData = filterData
                          .filter(data => data.studentID === id && data.result === 'apply')
                          .map(data => {
                            const course = this.mainService.searchCourseData(data.code);
                            data['courseName'] = course.courseName;
                            data['level'] = course.level;
                            data['teacherName'] = course.teacherName;
                            return data;
                          });
      userData['studentID'] = user.studentID;
      userData['studentName'] = user.studentName;
      userData['classLevel'] = user.classLevel;
      userData['applyData'] = applyData;
      userData['dataLength'] = applyData.length;
      this.userInfo.push(userData);
    });
    console.log(this.userInfo);
  }

  getuserLevel(studentID: string) {
    const user = this.coreService.studentDataList.find(data => data.studentID === studentID);
    return user.classLevel;
  }

  replyApproval(id, reply) {
    const unrollData = {};
    unrollData['result'] = reply;
    this.httpClient.patch(`https://garycourse.herokuapp.com/api/deleteCourse/${id}/`, unrollData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    this.collegeService.UnrollData = this.collegeService.UnrollData.filter(item => item.id !== id);
    this.onSearch();
  }


}
