import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrls: ['./list-vacancies.component.css']
})
export class ListVacanciesComponent implements OnInit {

  currentPage: number = 1;
  lastPage?: number;
  data?: any;
  showMore: boolean [] = [];

  constructor(
    private router: Router,
    private toastService: ToastService,
    private api: ApiService
  ) {
    this.api.getVacanciesList(this.currentPage).subscribe((response) => {
      this.data = response;
      this.lastPage = this.data.last_page;
      this.data = this.data.data;
      this.generateShowVars(this.data.lenght);
      this.toastService.show('The vacancies list are available bellow', {
        classname: "bg-success text-light",
        delay: 5000,
        autohide: true
      });
    },
      () => {

      });
  }

  ngOnInit(): void {
  }

  nextPage() {
    this.currentPage++;
    this.data = undefined;
    this.api.getVacanciesList(this.currentPage).subscribe(
      (response) => {
        this.data = response;
        this.data = this.data.data;
        this.showMore = [];
        this.generateShowVars(this.data.lenght);
      },
      () => {
        this.toastService.show('Error trying to load ' + this.currentPage + " page", {
          classname: "bg-dager text-light",
          delay: 5000,
          autohide: true
        });
      }
    );
  }

  editVacancy(id: number) {
    this.router.navigate(['/admin/vacancies/edit/' + id]);
  }

  previousPage() {
    this.currentPage--;
    this.data = undefined;
    this.api.getVacanciesList(this.currentPage).subscribe((response) => {
      this.data = response;
      this.data = this.data.data;
      console.log(this.data);
      this.showMore = [];
      this.generateShowVars(this.data.lenght);
    },
    () => {
      this.toastService.show('Error trying to load ' + this.currentPage + " page", {
        classname: "bg-dager text-light",
        delay: 5000,
        autohide: true
      });
    });
  }

  deleteVacancy(vacancyId: number) {
    this.api.deleteVacancy(vacancyId).subscribe(
      () => {
        this.toastService.show('Vacancy ' + vacancyId + " was successfully deleted",{
          classname: 'bg-success text-light',
          delay: 8000,
          autohide: true
        });
        window.location.reload();
      },
      (response) => {
        this.toastService.show('Error trying to load ' + response.error.message, {
          classname: "bg-dager text-light",
          delay: 5000,
          autohide: true
        });
      }
    );
  }

  generateShowVars(lenght : number){
    for(let i = 0; i < lenght; i++){
      this.showMore.push(false);
    }
  }

}
