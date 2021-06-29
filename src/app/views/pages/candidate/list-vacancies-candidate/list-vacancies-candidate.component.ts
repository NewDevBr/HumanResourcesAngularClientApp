import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-list-vacancies-candidate',
  templateUrl: './list-vacancies-candidate.component.html',
  styleUrls: ['./list-vacancies-candidate.component.css']
})
export class ListVacanciesCandidateComponent implements OnInit {

  currentPage: number = 1;
  lastPage?: number;
  data?: any;
  idCandidate?: number;
  showMore: boolean[] = [];

  constructor(
    private toastService: ToastService,
    private api: ApiService,
    private authCandidate : AuthCandidateService
  ) {
    this.authCandidate.currentCandidate.subscribe(val => {
      let candidateIsUndefined = (typeof val === "undefined");
      if (!candidateIsUndefined) {
        if (!!Object.values(val).length) {
          this.idCandidate = val.data.id;
        }
      }
    });

    this.api.getapplicableVacancies(this.currentPage).subscribe((response) => {
      this.data = response;
      this.lastPage = this.data.last_page;
      this.data = this.data.data;
      this.generateShowVars(this.data.lenght);
      this.data.forEach((vacancy: any) => {
        vacancy.candidates.forEach((candidate : any) => {
          if(candidate.id == this.idCandidate){
            this.data.splice(this.data.indexOf(vacancy),1);
          }
        });
      });
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

  generateShowVars(lenght: number) {
    for (let i = 0; i < lenght; i++) {
      this.showMore.push(false);
    }
  }

  applyVacancy(vacancyId: number) {
    this.api.applyVacancy(this.idCandidate!, vacancyId).subscribe(()=>{
      window.location.reload();
    },(response) => {
      this.toastService.show("Error trying to apply vacancy " + response.error.message, {
        classname: "bg-danger text-light",
        delay: 5000,
        autohide: true
      });
    });
  }


}
