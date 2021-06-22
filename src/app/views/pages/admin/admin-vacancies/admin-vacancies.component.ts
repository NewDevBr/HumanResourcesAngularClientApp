import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-vacancies',
  templateUrl: './admin-vacancies.component.html',
  styleUrls: ['./admin-vacancies.component.css']
})
export class AdminVacanciesComponent implements OnInit {

  showVacancyForm: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }


}
