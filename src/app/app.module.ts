import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SignupComponent } from './views/pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api/api.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './views/components/toast/toast.component';
import { AuthAdminService } from './services/authAdminService/auth-admin.service';
import { AuthCandidateService } from './services/authCandidateService/auth-candidate.service';
import { AdminComponent } from './views/pages/admin/admin.component';
import { CandidateComponent } from './views/pages/candidate/candidate.component';
import { AdminNavBarComponent } from './views/template/adminTemplate/admin-nav-bar/admin-nav-bar.component';
import { AdminFooterComponent } from './views/template/adminTemplate/admin-footer/admin-footer.component';
import { CandidateFooterComponent } from './views/template/candidateTemplate/candidate-footer/candidate-footer.component';
import { CandidateNavBarComponent } from './views/template/candidateTemplate/candidate-nav-bar/candidate-nav-bar.component';
import { AdminVacanciesComponent } from './views/template/adminTemplate/admin-vacancies/admin-vacancies.component';
import { AdminProfileComponent } from './views/template/adminTemplate/admin-profile/admin-profile.component';
import { AdminInterceptor } from './interceptors/admin/admin.interceptor';
import { CandidateInterceptor } from './interceptors/candidate/candidate.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ToastComponent,
    AdminComponent,
    CandidateComponent,
    AdminNavBarComponent,
    AdminFooterComponent,
    CandidateFooterComponent,
    CandidateNavBarComponent,
    AdminVacanciesComponent,
    AdminProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CandidateInterceptor, multi: true },
    ApiService,
    AuthAdminService,
    AuthCandidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
