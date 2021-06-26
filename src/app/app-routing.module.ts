import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin/admin.guard';
import { CandidateGuard } from './guards/candidate/candidate.guard';
import { AdminProfileComponent } from './views/pages/admin/admin-profile/admin-profile.component';
import { PaginationComponent } from './views/components/pagination/pagination.component';
import { AdminVacanciesComponent } from './views/pages/admin/admin-vacancies/admin-vacancies.component';
import { LoginComponent } from './views/pages/login/login.component';
import { SignupComponent } from './views/pages/signup/signup.component';
import { AdminTechnologiesComponent } from './views/pages/admin/admin-technologies/admin-technologies.component';
import { SaveVacancyComponent } from './views/pages/admin/save-vacancy/save-vacancy.component';
import { ListVacanciesComponent } from './views/pages/admin/list-vacancies/list-vacancies.component';
import { AdminCandidatesComponent } from './views/pages/admin/admin-candidates/admin-candidates.component';
import { AdminsManagementComponent } from './views/pages/admin/admins-management/admins-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: PaginationComponent, canActivate: [AdminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'technologies' },
      { path: 'vacancies', component: AdminVacanciesComponent, children:
        [
          { path: '', pathMatch: 'full', redirectTo: 'new' },
          { path: 'new', component: SaveVacancyComponent },
          { path:'edit/:id', component: SaveVacancyComponent },
          { path: 'list', component: ListVacanciesComponent },
        ]
      },
      { path: 'candidates', component: AdminCandidatesComponent },
      { path: 'management', component: AdminsManagementComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'technologies', component: AdminTechnologiesComponent },
    ]
  },
  //{ path: 'candidate', component: CandidateComponent, canActivate: [CandidateGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
