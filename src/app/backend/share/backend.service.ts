import { Site } from './../../core/main.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  constructor(private httpClient: HttpClient) { }
  public siteList: Site[];
  public teacherList: string[];

  private allTeacherData: any;
  private departmentList: any;

  getAllTeacherList() {
    this.httpClient.get('https://garycourse.herokuapp.com/api/department/')
    .map((items: any[]) => {
      let i = items.length;
      while (i--) {
        items[i] = items[i].department;
      }
      return items;
    })
    .subscribe((data) => {
      this.departmentList = data;
    });
    this.httpClient.get('https://garycourse.herokuapp.com/api/teacher/')
    .subscribe((data) => {
      this.allTeacherData = data;
    });
  }

  getTeacherList(department) {
    this.teacherList = this.allTeacherData
                        .filter(item => this.departmentList[item['department'] - 1] === department)
                        .map(item => item = item['teacherName']);
  }

  getSiteList() {
    this.httpClient.get('https://garycourse.herokuapp.com/api/site/')
      .map((rows: any[]) => {
        let wrapList = [];
        let wrapObject = {district: '', site: []};
        let site = {name: '', classRoom: []};
        let i = rows.length;
        while (i--) {
          if (wrapList.find(item => item.district === rows[i].district) !== undefined) {
            if (wrapObject.site.find(item => item.name === rows[i].site) !== undefined) {
              site.classRoom.push(rows[i].classRoom);
            } else {
              site = {name: '', classRoom: []};
              site.name = rows[i].site;
              site.classRoom.push(rows[i].classRoom);
              wrapObject.site.push(site);
            }
          } else {
            site = {name: '', classRoom: []};
            wrapObject = {district: '', site: []};
            wrapObject.district = rows[i].district;
            site.name = rows[i].site;
            site.classRoom.push(rows[i].classRoom);
            wrapObject.site.push(site);
            wrapList.push(wrapObject);
            wrapList = wrapList.reverse();
          }
        }
          wrapList.map((item) => {
            item.site.reverse();
            item.site.map(subItem => subItem.classRoom.reverse());
          });
          return wrapList;
      })
      .subscribe((data) => {
        this.siteList = data;
      });

  }
}
