import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin/admin.guard';
import { CandidateGuard } from './guards/candidate/candidate.guard';
import { AdminComponent } from './views/pages/admin/admin.component';
import { CandidateComponent } from './views/pages/candidate/candidate.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SignupComponent } from './views/pages/signup/signup.component';
import { AdminProfileComponent } from './views/template/adminTemplate/admin-profile/admin-profile.component';
import { AdminVacanciesComponent } from './views/template/adminTemplate/admin-vacancies/admin-vacancies.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      { path: 'profile', component: AdminProfileComponent },
      { path: 'vacancies', component: AdminVacanciesComponent } 
    ]
  },
  { path: 'candidate', component: CandidateComponent, canActivate: [CandidateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
