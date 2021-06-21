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
import { AdminInterceptor } from './interceptors/admin/admin.interceptor';
import { CandidateInterceptor } from './interceptors/candidate/candidate.interceptor';
import { FooterComponent } from './views/components/footer/footer.component';
import { NavbarComponent } from './views/components/navbar/navbar.component';
import { AdminVacanciesComponent } from './views/pages/admin/admin-vacancies/admin-vacancies.component';
import { PaginationComponent } from './views/components/pagination/pagination.component';
import { AdminProfileComponent } from './views/pages/admin/admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ToastComponent,
    FooterComponent,
    NavbarComponent,
    AdminVacanciesComponent,
    PaginationComponent,
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
