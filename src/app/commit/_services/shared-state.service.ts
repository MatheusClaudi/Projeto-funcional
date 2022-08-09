import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const API = 'https://api.github.com/repos/rails/rails/commits'

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  public currentSectionSource = new BehaviorSubject<string>('');
  public currentSection = this.currentSectionSource.asObservable();

  public rawCommitsSource = new BehaviorSubject<Array<any>>([]);
  public rawCommits = this.rawCommitsSource.asObservable();

  constructor(
    private http : HttpClient
  ) { }

  updateCurrentSection(section: string) {
    this.currentSectionSource.next(section)
  }

  getCommitsFromAPI() {
    this.http.get(API)
      .subscribe((res) => {
        this.rawCommitsSource.next(res as Array<any>)
      })
  }
}
