import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-technologies',
  templateUrl: './admin-technologies.component.html',
  styleUrls: ['./admin-technologies.component.css']
})
export class AdminTechnologiesComponent implements OnInit {
  
  showTechForm: boolean = false;
  disablePreviosPage: boolean = true;
  disableNextPage: boolean = true;
  idTech?: number;
  data?: any;
  firstPage?: number;
  lastPage?: number;
  currentPage: number;

  techFormGroup = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(45)
    ])
  });
  
  constructor(
    private api: ApiService,
    private toastService : ToastService
  )
  {
    this.currentPage = 1;
    this.api.getTechnologies(this.currentPage).subscribe(
      (data)=>{
        this.data = data;
        this.firstPage = this.data.meta.from;
        this.lastPage = this.data.meta.last_page;
        this.data = this.data.data;
        this.toastService.show('The technologies list are available bellow', {
          classname:"bg-success text-light",
          delay: 5000,
          autohide: true
        });
      },
      ()=>{
        this.toastService.show('Error trying to get all technologies',{
          classname:"bg-danger text-light",
          delay: 5000,
          autohide: true
        })
      }
    );
  }
  
  ngOnInit(): void {
  }

  getTechDescription(){
    return this.techFormGroup.controls.description.value;
  }

  saveTech(){
    let techName = this.getTechDescription();
    let isToSave = (typeof this.idTech === "undefined");
    if (isToSave) {
      this.api.createTechnology(techName).subscribe(
        ()=>{
          this.toastService.show("The " + techName + " was successfull created", {
            classname: "bg-success text-light",
            delay : 5000,
            autohide: true
          });
          window.location.reload();
        },
        (response)=>{
          this.toastService.show("Error trying to create " + techName + " technology " + response.message, {
            classname: "bg-danger text-light",
            delay : 5000,
            autohide: true
          });
        }
      )
    } else {
      let id = this.idTech!;
      this.api.editTechonology(id, techName).subscribe(
        ()=>{
          this.toastService.show(techName + " was successfull edited", {
            classname:"bg-success text-light",
            delay: 5000,
            autohide: true
          });
          window.location.reload();
        },
        (error)=>{
          this.toastService.show('Error trying to edit ' + techName + " " + error.message,{
            classname: "bg-danger text-light",
            delay: 5000,
            autohide: true
          });
        }
      );
    }
    this.idTech = undefined;
    this.techFormGroup.controls['description'].setValue("");
  }

  editTech(id:number, name:string){
    this.techFormGroup.controls['description'].setValue(name);
    this.idTech = id;
    document.getElementById('desc')?.focus();
  }

  deleteTech(id: number, description: string){
    this.api.deleteTechnology(id).subscribe(()=>{
      this.toastService.show("Success to delete "+ description +" tech", {
        classname: "bg-success text-light",
        delay: 5000,
        autohide: true
      });
      window.location.reload();
    },
    (response)=>{
      this.toastService.show("Error trying to delete " + description + response, {
        classname: "bg-danger text-light",
        delay: 5000,
        autohide: true
      });
    });
  }

  nextPage(){
    this.currentPage++;
    this.data = undefined;
    this.api.getTechnologies(this.currentPage).subscribe(
      (response)=>{
        this.data = response;
        this.data = this.data.data;
      },
      (response)=>{
        this.toastService.show('Error trying to load ' + this.currentPage, {
          classname:"bg-dager text-light",
          delay: 5000,
          autohide: true
        });
      }
    );
  }

  previousPage(){
    this.currentPage--;
    this.data = undefined;
    this.api.getTechnologies(this.currentPage).subscribe((response)=>{
      this.data = response;
      this.data = this.data.data;
    });
  }

}
