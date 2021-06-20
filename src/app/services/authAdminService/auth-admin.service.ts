import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Admin } from 'src/app/models/Admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private currentAdminSubject: Subject<Admin> = new ReplaySubject<Admin>(undefined);
  public currentAdmin: Observable<Admin>;

  constructor(private api: ApiService) {
    this.currentAdminSubject = new BehaviorSubject<Admin>(
      JSON.parse(localStorage.getItem('currentAdmin') || '{}')
    );
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.api.administrativeLogin(email, password)
    .pipe(map(admin => {
      localStorage.setItem('currentAdmin', JSON.stringify(admin));
      this.currentAdminSubject.next(admin);
      return admin;
    }));
  }

  logout() {
    this.api.administrativeLogout();
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(undefined);
  }
}
