import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-admin-vacancies',
  templateUrl: './admin-vacancies.component.html',
  styleUrls: ['./admin-vacancies.component.css']
})
export class AdminVacanciesComponent implements OnInit {

  showVacancyForm: boolean = false;


  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }


}
