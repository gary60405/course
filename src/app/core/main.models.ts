export class Data {
  constructor(public college: string,
              public dep: {}[]) {}
}
export class Site {
  constructor(public district: string,
              public site: {name: '', classRoom: string[]}[],
              ) {}
}

export class Course {
  constructor(public code: string,
              public name: string,
              public teacher: string,
              public site: string,
              public time: string,
              public date: string,
              public require: string,
              public score: string,
              public level: string) {}
}

export class StudentData {
  constructor(public id: string,
              public studentName: string,
              public account: string,
              public studentID: string,
              public classLevel: string,
              public courseCode: string) {}
}
