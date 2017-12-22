import { Injectable } from '@angular/core';



@Injectable()
export class CollegeService {

  constructor() { }

  selectedCourse = [
    // tslint:disable-next-line:max-line-length
    {code: '155033', courseName: '數位出版與典藏', teacherName: '方文杰', site: 'B308', time: '89A', date: '星期二', require: '選修', score: '3', level: '數位四'},
    {code: '155017', courseName: '資料庫系統', teacherName: '李建億', site: 'J101', time: '345', date: '星期五', require: '必修', score: '3', level: '數位三'},
    // tslint:disable-next-line:max-line-length
    {code: '155041', courseName: '畢業專題實作(二)', teacherName: '李建億', site: 'F301-1', time: 'FG', date: '星期一', require: '必修', score: '2', level: '數位四'},
    {code: '155035', courseName: '資料探勘', teacherName: '李建億', site: 'F302', time: '345', date: '星期三', require: '選修', score: '3', level: '數位四'},
    // tslint:disable-next-line:max-line-length
    {code: '155023', courseName: '物件導向程式設計', teacherName: '林奇賢', site: 'C201', time: '89A', date: '星期一', require: '選修', score: '3', level: '數位二'},
    {code: '155018', courseName: '網頁程式設計', teacherName: '林奇賢', site: 'J306', time: '345', date: '星期二', require: '必修', score: '3', level: '數位三'},
    {code: '155030', courseName: '統計學', teacherName: '林奇賢', site: 'C201', time: '89A', date: '星期四', require: '選修', score: '3', level: '數位三'}
  ];

}

