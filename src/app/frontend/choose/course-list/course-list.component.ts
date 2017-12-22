import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CollegeService } from '../college.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseListComponent implements OnInit {

  constructor(public collegeService: CollegeService) { }

  score = 0;
  ngOnInit() {
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

  onDelete(index: number) {
    this.collegeService.selectedCourse.splice(index, 1);
    this.score = 0;
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

}
