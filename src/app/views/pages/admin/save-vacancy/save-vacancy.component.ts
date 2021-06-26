import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Technology } from 'src/app/models/Technology.model';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';

@Component({
  selector: 'app-save-vacancy',
  templateUrl: './save-vacancy.component.html',
  styleUrls: ['./save-vacancy.component.css']
})
export class SaveVacancyComponent implements OnInit {

  admin_id?: number;
  vacancyId?: number;
  technologies: Technology[] = [];
  data?: any;

  formVacancy = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(3500)
    ]),
    hiring: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10)
    ]),
    remote: new FormControl('')
  });

  formTech = new FormGroup({
    tech: new FormControl('', [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private api: ApiService,
    private router: Router,
    private authAdmin: AuthAdminService
  ) {
    this.vacancyId = this.activatedRoute.snapshot.params.id;
    let isToCreate = (typeof this.vacancyId === "undefined");
    if(!isToCreate){
      this.api.getAVacancy(this.vacancyId!).subscribe(
        (response)=>{
          let vacancyDataToEdit : any = response;
          vacancyDataToEdit.technologies.forEach((element: { id: any; name: any; }) => {
            this.technologies.push({id: element.id, name: element.name});
          });
          this.formVacancy.controls['title'].setValue(vacancyDataToEdit.title);
          this.formVacancy.controls['description'].setValue(vacancyDataToEdit.description);
          this.formVacancy.controls['hiring'].setValue(vacancyDataToEdit.hiring);
          this.formVacancy.controls['remote'].setValue(vacancyDataToEdit.remote);
        },
        (response)=>{
          this.toastService.show(response.error.message, {
            classname:"bg-danger text-light",
            delay: 8000,
            autohide: true
          });
          this.router.navigate(['/admin/vacancies/new']);
        }
      );
    }
    this.authAdmin.currentAdmin.subscribe((val) => {
      this.admin_id = val.data.id;
    });
  }

  ngOnInit(): void {
  }

  vd() {
    return this.formVacancy.controls;
  }

  saveVacancy() {
    if(this.technologies.length){
      let technologiesId: any[] = [];
      (
        this.vd().remote.value === "undefined" ||
        this.vd().remote.value == "" ||
        this.vd().remote.value == false
      ) ?
        this.formVacancy.controls['remote'].setValue(0)
        : this.formVacancy.controls['remote'].setValue(1);
      let isToCreate = (typeof this.vacancyId === "undefined");
      if (isToCreate) {
        this.technologies.forEach((element) =>{
          technologiesId.push({ technology_id: element.id })
        });
        this.api.createVacancy(
          this.vd().title.value,
          this.vd().description.value,
          this.vd().remote.value,
          this.vd().hiring.value,
          this.admin_id!,
          technologiesId
        ).subscribe(() => {
          this.toastService.show('Vacancy successfully registered', {
            classname: "bg-success text-light",
            delay: 6000,
            autohide: true
          });
          this.router.navigate(['/admin/vacancies/list']);
        }, (response) => {
          console.log(response);
          this.toastService.show('Error trying to save a vacancy ' + response.message, {
            classname: "bg-danger text-light",
            delay: 6000,
            autohide: true
          });
        });
      } else {
        this.technologies.forEach((element) =>{
          technologiesId.push(element.id);
        });
        this.api.updateVacancy(
          this.vacancyId!,
          this.vd().title.value,
          this.vd().description.value,
          this.vd().remote.value,
          this.vd().hiring.value,
          this.admin_id!,
          technologiesId
        ).subscribe(()=>{
          this.toastService.show('Vacancy was successfully edited', {
            classname: "bg-success text-light",
            delay: 6000,
            autohide: true
          });
          this.router.navigate(['/admin/vacancies/list']);
        },(response)=>{
          this.toastService.show(response.error.message, {
            classname: 'bg-danger text-light',
            dalay: 8000,
            autohide: true
          });
        });
      }
    } else {
      this.toastService.show('Please, set the vacancy technologies',{
        classname: "bg-warning text-dark",
        delay: 8500,
        autohide: true
      });
    }
  }


  clearData() {
    this.data = undefined;
    this.formTech.controls['tech'].setValue('');
  }

  getTechnologies() {
    if (this.formTech.controls.tech.value != "undefined" && this.formTech.controls.tech.value != '') {
      this.api.getTechnologiesSearchResult(this.formTech.controls.tech.value).subscribe(
        (response) => {
          this.data = response;
          this.data = this.data.data;
        },
        (response) => {
          this.toastService.show('Error trying to search technologies ' + response.message, {
            classname: "bg-danger text-light",
            delay: 5000,
            autohide: true
          });
        }
      )
    }
  }

  addToTechnologies(tech: Technology) {
    let exists = this.technologies.find(element => tech.id == element.id);
    if (typeof exists === "undefined") this.technologies.push({ id: tech.id, name: tech.name });
  }

  removeToTechnologies(tech: Technology) {
    let index = this.technologies.indexOf(tech);
    this.technologies.splice(index, 1);
  }

}
