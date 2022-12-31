import { Subject } from 'rxjs'

export default class SubjectManager {
  subject$ = new Subject()

  getSubject() {
    return this.subject$.asObservable()
  }

  setSubject(value) {
    this.subject$.next(value)
  }
}
