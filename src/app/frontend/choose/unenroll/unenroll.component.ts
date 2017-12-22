import { CollegeService } from './../college.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-unenroll',
  templateUrl: './unenroll.component.html',
  styleUrls: ['./unenroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UnenrollComponent implements OnInit {

  constructor(public collegeService: CollegeService) { }
  score = 0;
  ngOnInit() {
    let i = this.collegeService.selectedCourse.length;
    while (i--) {
      this.score += parseInt(this.collegeService.selectedCourse[i].score, 10);
    }
  }

}
