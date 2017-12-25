import { CoreService } from './../../../core/core.service';
import { CollegeService } from './../college.service';
import { EventEmitter, Input, Component, OnInit, ElementRef, ViewEncapsulation, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MainService } from './main.service';
import { FormGroup, FormControl} from '@angular/forms';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.html',
})
export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mainService: MainService) {}

  onCheck() {
    this.mainService.dialogDisplaySubject.next();
  }
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public collegeService: CollegeService,
              public coreService: CoreService,
              public mainService: MainService,
              public dialog: MatDialog,
              public el: ElementRef) {}

  isDialogDisplay = false;
  isSelectSuccess = true;
  selected: string;
  index: number;
  message = '';
  displayedColumns = ['', 'code', 'name', 'time', 'site', 'teacher'];
  ELEMENT_DATA: Element[];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  courseForm: FormGroup;

  ngOnInit() {
    this.mainService.getCourseData('', '不拘');
    this.mainService.getCollegeList();
    this.mainService.dialogDisplaySubject
      .subscribe(() => {
        this.getRowData();
      });
    this.courseForm = new FormGroup({
      college : new FormControl(),
      department : new FormControl(),
      level : new FormControl(),
      require : new FormControl()
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      console.log(this.mainService.CourseInfo);
      this.ELEMENT_DATA = this.mainService.CourseInfo;
      this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  openDialog(index: number): void {
    this.index = index;
    const dialogRef = this.dialog.open(DialogDataComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  getRowData() {
    const code = this.el.nativeElement.querySelector(`#code_${this.index}`).innerHTML;
    const row = this.searchList(code);
    if (this.checkConflict(row)) {
      this.isSelectSuccess = true;
      this.displayAlert();
      this.collegeService.selectedCourse.push(row);
    } else {
      this.isSelectSuccess = false;
      this.displayAlert();
    }
    console.log(this.collegeService.selectedCourse);
  }

  searchList(code: string) {
    let i = this.ELEMENT_DATA.length;
    while (i--) {
      if (this.ELEMENT_DATA[i].code === code) {
        return this.ELEMENT_DATA[i];
      }
    }
  }
  checkConflict(row) {
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      if (this.collegeService.selectedCourse[i].code === row.code) {
        this.message = '請勿重複選課!';
        return false;
      }
      if (this.collegeService.selectedCourse[i].date === row.date) {
        if (this.checkTime(this.collegeService.selectedCourse[i].time, row.time)) {
          this.message = '請確認上課時段，該課程與您時間衝堂!';
          return false;
        }
      }
    }
    return true;
  }
  checkTime(listTime: string, rowTime: string) {
    let i = listTime.length;
    while (i--) {
      if (rowTime.indexOf(listTime[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  displayAlert() {
    this.isDialogDisplay = true;
    setTimeout(() => {
      this.isDialogDisplay = false;
    }, 5000);
  }
}

export interface Element {
  code: string;
  courseName: string;
  teacherName: string;
  site: string;
  time: string;
  date: string;
  require: string;
  score: string;
  level: string;
}







