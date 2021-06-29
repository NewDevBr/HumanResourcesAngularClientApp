import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/models/Candidate.model';

@Injectable({
  providedIn: 'root'
})
export class AuthCandidateService {

  private currentCandidateSubject: Subject<Candidate> = new ReplaySubject<Candidate>(undefined);
  public currentCandidate: Observable<Candidate>;

  constructor(private api: ApiService) {
    this.currentCandidateSubject = new BehaviorSubject<Candidate>(
      JSON.parse(localStorage.getItem('currentCandidate') || '{}')
    );
    this.currentCandidate = this.currentCandidateSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.api.candidateLogin(email, password)
    .pipe(map(candidate => {
      localStorage.setItem('currentCandidate', JSON.stringify(candidate));
      this.currentCandidateSubject.next(candidate);
      return candidate;
    }));
  }

  updateData(newCandidate: Candidate | undefined){
    localStorage.setItem('currentCandidate', JSON.stringify(newCandidate));
    this.currentCandidateSubject.next(newCandidate);
    return newCandidate;
  }

  logout() {
    this.api.candidateLogout();
    localStorage.removeItem('currentCandidate');
    this.currentCandidateSubject.next(undefined);
  }
}
