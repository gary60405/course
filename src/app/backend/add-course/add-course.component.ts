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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;

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
    this.mainService.getCollegeList();
    this.backendService.getSiteList();
    this.firstFormGroup = new FormGroup({
      college: new FormControl('', [Validators.required, ]),
      department: new FormControl('', [Validators.required, ]),
      level: new FormControl('', [Validators.required, ])
    });
    this.secondFormGroup = new FormGroup({
      code: new FormControl('', [Validators.required, this.checkCodeValidator.bind(this)]),
      courseName: new FormControl('', [Validators.required, ]),
      teacherName: new FormControl('', [Validators.required, ]),
      score: new FormControl('', [Validators.required, ]),
      require: new FormControl('', [Validators.required, ])
    });
    this.thirdFormGroup = new FormGroup({
      date: new FormControl('', [Validators.required, ]),
      startClass: new FormControl('', [Validators.required, ]),
      classNumber: new FormControl('', [Validators.required, ])
    });
    this.forthFormGroup = new FormGroup({
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
      console.log(this.avoidClassRoom.length);
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
    const classNumber = this.thirdFormGroup.value.classNumber - 1;
    const filterNumber = this.classList.length - classNumber;
    this.classList = this.classList.filter((item) => item.value <= filterNumber);
  }

  getClass() {
    const startClass = parseInt(this.thirdFormGroup.value.startClass, 10);
    const classNumber = parseInt(this.thirdFormGroup.value.classNumber, 10);
    this.classNumber = '';
    let hexNumber = startClass;
    let i = classNumber;
    while (i--) {
      const num = hexNumber.toString(16).toUpperCase();
      this.classNumber += num === '10' ? 'G' : num;
      hexNumber += 1;
    }
  }

  getCollegeInfo() {
    this.mainService.getCollegeList();
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
    sendObject['code'] = this.secondFormGroup.value.code;
    sendObject['courseName'] = this.secondFormGroup.value.courseName;
    sendObject['teacherName'] = this.secondFormGroup.value.teacherName;
    sendObject['site'] = this.forthFormGroup.value.site;
    sendObject['date'] = this.thirdFormGroup.value.date;
    sendObject['time'] = this.classNumber;
    sendObject['require'] = this.secondFormGroup.value.require;
    sendObject['score'] = this.secondFormGroup.value.score;
    sendObject['level'] = this.department + this.level;
    this.httpClient.post('http://127.0.0.1:8000/api/course/?format=json', sendObject)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.forthFormGroup.reset();
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
