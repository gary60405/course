import { BackendService } from './../share/backend.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../frontend/choose/main/main.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddCourseComponent implements OnInit {
  selected: string;
  isLinear = false;
  classList = [];
  currentIndex: number;
  oneFormGroup: FormGroup;
  twoFormGroup: FormGroup;
  threeFormGroup: FormGroup;
  fourFormGroup: FormGroup;

  constructor(public mainService: MainService,
              public backendService: BackendService,
              public httpClient: HttpClient,
              private router: Router) { }
  department: string;
  level: string;
  code: string;
  courseName: string;
  teacherName: string;
  score: string;
  require: string;
  date = '';
  site: string;

  district: string;
  districtSite = '';
  classRoom: string;
  classNumber: string;
  avoidClassRoom = [];


  ngOnInit() {
    this.classNumber = '';
    this.currentIndex = 0;
    this.mainService.getAllCourseData();
    this.mainService.getCourseCode();
    this.mainService.getCollegeData();
    this.backendService.getSiteList();
    this.backendService.getAllTeacherList();
    this.oneFormGroup = new FormGroup({
      college: new FormControl('', [Validators.required, ]),
      department: new FormControl('', [Validators.required, ]),
      level: new FormControl('', [Validators.required, ])
    });
    this.twoFormGroup = new FormGroup({
      code: new FormControl('', [Validators.required,
                                 Validators.pattern('^[0-9]{6}$'),
                                 this.checkCodeValidator.bind(this)]),
      courseName: new FormControl('', [Validators.required, Validators.pattern('^[\u4e00-\u9fa5a-zA-Z()]+$')]),
      teacherName: new FormControl('', [Validators.required, ]),
      score: new FormControl('', [Validators.required, ]),
      require: new FormControl('', [Validators.required, ])
    });
    this.threeFormGroup = new FormGroup({
      date: new FormControl('', [Validators.required, ]),
      startClass: new FormControl('', [Validators.required, ]),
      classNumber: new FormControl('', [Validators.required, ])
    });
    this.fourFormGroup = new FormGroup({
      district: new FormControl('', [Validators.required, ]),
      site: new FormControl('', [Validators.required, ]),
      classRoom: new FormControl('', [Validators.required, this.checkSiteValidator.bind(this)])
    });
    this.getClassList();
  }

  checkCodeValidator(control: FormControl) {
    this.mainService.getCourseCode();
    if (this.mainService.codeList.indexOf(control.value) !== -1) {
      return {'checkCode': true};
    }
    return null;
  }

  checkSiteValidator(control: FormControl) {
    this.mainService.getAllCourseData();
    this.backendService.getSiteList();
    let courseList = this.mainService.CourseInfo;
    courseList = courseList.filter(item => {
      const a = item.date === this.date;
      const b = this.getSite(item.site) === this.districtSite;
      let c = false;
      let i = item.time.length;
      while (i--) {
        if (this.classNumber.toString().indexOf(item.time[i]) !== -1) {
          c = true;
          break;
        }
      }
      return a && b && c;
    })
    .map(item => item = item.site);
    this.avoidClassRoom = courseList;
    if (this.avoidClassRoom.length !== 0) {
      this.avoidClassRoom = this.avoidClassRoom.map(item => item = item + '、');
      this.avoidClassRoom[this.avoidClassRoom.length - 1] = this.avoidClassRoom[this.avoidClassRoom.length - 1].slice(0, -1) + '。';
    }
    if (courseList.indexOf(control.value) !== -1) {
      return {'checkSite': true};
    }
    return null;
  }

  getSite(classRoom: string) {
    let siteName = '';
    this.backendService.siteList.forEach(site => {
      site.site.forEach(rows => {
        if (rows.classRoom.find(row => row === classRoom) !== undefined) {
          siteName = rows.name;
        }
      });
    });
    return siteName;
  }
  getClassList() {
    this.classList = [];
    let i = 16;
    while (i !== 0) {
      const object = {};
      object['value'] = i;
      i === 16 ? object['view_value'] = 'G' : object['view_value'] = i.toString(16).toUpperCase();
      this.classList.push(object);
      i--;
    }
    this.classList.reverse();
  }
  listFilter() {
    this.getClassList();
    const classNumber = this.threeFormGroup.value.classNumber - 1;
    const filterNumber = this.classList.length - classNumber;
    this.classList = this.classList.filter((item) => item.value <= filterNumber);
  }

  getClass() {
    const startClass = parseInt(this.threeFormGroup.value.startClass, 10);
    const classNumber = parseInt(this.threeFormGroup.value.classNumber, 10);
    this.classNumber = '';
    let hexNumber = startClass;
    let i = classNumber;
    while (i--) {
      const num = hexNumber.toString(16).toUpperCase();
      this.classNumber += num === '10' ? 'G' : num;
      hexNumber += 1;
    }
  }
  getTeacherList() {
    const department = this.oneFormGroup.value.department;
    this.backendService.getTeacherList(department + '系');
  }
  getCollegeInfo() {
    this.mainService.getCollegeList();
    // console.log(this.mainService.CollegeList);
  }
  districtValueChange() {
    this.districtSite = '';
    this.classRoom = '';
  }

  siteValueChange() {
    this.classRoom = '';
  }

  setCurrentIndex(num: number) {
    this.currentIndex = num;
  }

  submitForm() {
    const sendObject = {};
    sendObject['code'] = this.twoFormGroup.value.code;
    sendObject['courseName'] = this.twoFormGroup.value.courseName;
    sendObject['teacherName'] = this.twoFormGroup.value.teacherName;
    sendObject['site'] = this.fourFormGroup.value.classRoom;
    sendObject['date'] = this.threeFormGroup.value.date;
    sendObject['time'] = this.classNumber;
    sendObject['require'] = this.twoFormGroup.value.require;
    sendObject['score'] = this.twoFormGroup.value.score;
    sendObject['level'] = this.department + this.level;
    this.httpClient.post('https://garycourse.herokuapp.com/api/course/', sendObject)
      .subscribe(
        res => res,
        err => err
      );
    this.oneFormGroup.reset();
    this.twoFormGroup.reset();
    this.threeFormGroup.reset();
    this.fourFormGroup.reset();
    this.department = '';
    this.level = '';
    this.code = '';
    this.score = '';
    this.require = '';
    this.date = '';
    this.classNumber = '';
    this.districtSite = '';
    this.classRoom = '';
    this.currentIndex = 0;
  }

}
