import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/Candidate.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { Diploma } from 'src/app/models/Diplomas.model';
import { Technology } from 'src/app/models/Technology.model';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  hideDeleteAlert: boolean = true;
  hideSaveChanges: boolean = true;
  showDiplomasForm: boolean = false;
  diplomaId?: number;
  diplomas? : any;
  data?: any;
  technologies: Technology[] = [];

  host: string = "http://localhost:8000/storage/photos/";
  url: string = "";

  currentCandidate?: Candidate;

  formNewPassword = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.min(10)
    ]),
  });

  form = new FormGroup({
    birthDate: new FormControl('', [Validators.required]),
    notify_email: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    titration: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(45)
    ]),
    github: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
    linkedin: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
  });

  formUpdatePhoto = new FormGroup({
    img: new FormControl('', [
      Validators.required
    ])
  });

  formTech = new FormGroup({
    tech: new FormControl('', [])
  });

  formDiploma = new FormGroup({
    course: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    institution: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    initial_date: new FormControl('', [
      Validators.required
    ]),
    final_date: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private authCandidate: AuthCandidateService,
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private api: ApiService,
    private router: Router
  ) {

    this.authCandidate.currentCandidate.subscribe(val => {
      let candidateIsUndefined = (typeof val === "undefined");
      if (!candidateIsUndefined) {
        if (!!Object.values(val).length) {
          this.url = this.host + val.data.pathPhoto.substring(15, val.data.pathPhoto.length);
          this.currentCandidate = val;
          this.api.getTechnologiesThatCandidateKnows(this.currentCandidate!.data.id).subscribe((data)=>{
            let someData : any = data;
            someData.forEach((element : {id: number, name: string}) =>{
              this.technologies.push({id: element.id, name: element.name});
            });
            this.toastService.show('The list of technologies you know is available below.',{
              classname: 'bg-success text-light',
              delay: 5000,
              autohide: true  
            });
          },()=>{
            this.toastService.show('Error trying to get technologies list.',{
              classname: 'bg-danger text-light',
              delay: 5000,
              autohide: true  
            });
          });
          this.api.getDiplomasByCandidateId(this.currentCandidate.data.id).subscribe((response)=>{
            this.diplomas = response;
          });
        }
      }
    });

    let date: any = this.currentCandidate!.data.birthDate;
    date = date.substr(0, 10);
    this.form.controls['birthDate'].setValue(date);
    this.form.controls['notify_email'].setValue(this.currentCandidate!.data.notify_email);
    this.form.controls['name'].setValue(this.currentCandidate!.data.name);
    this.form.controls['titration'].setValue(this.currentCandidate!.data.titration);
    this.form.controls['email'].setValue(this.currentCandidate!.data.email);
    this.form.controls['github'].setValue(this.currentCandidate!.data.github);
    this.form.controls['linkedin'].setValue(this.currentCandidate!.data.linkedin);
  }

  ngOnInit(): void {
  }

  public getSantizeUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }

  showSaveChange() {
    this.hideSaveChanges = !(this.hideSaveChanges);
  }
  gfd() { return this.form.controls; }

  saveDataUpdates() {
    this.api.updateCandidateData(
      this.currentCandidate!.data.id,
      this.gfd().name.value,
      this.gfd().titration.value,
      this.gfd().birthDate.value,
      this.gfd().email.value,
      this.gfd().github.value,
      this.gfd().linkedin.value,
      this.gfd().notify_email.value ? 1 : 0
    ).subscribe(() => {
      this.toastService.show('your data was successfully changed', {
        classname: 'bg-success text-light',
        delay: 8000,
        autohide: true
      });
      this.hideSaveChanges = true;
      this.currentCandidate!.data.name = this.gfd().name.value,
        this.currentCandidate!.data.titration = this.gfd().titration.value,
        this.currentCandidate!.data.birthDate = this.gfd().birthDate.value,
        this.currentCandidate!.data.email = this.gfd().email.value,
        this.currentCandidate!.data.github = this.gfd().github.value,
        this.currentCandidate!.data.linkedin = this.gfd().linkedin.value,
        this.currentCandidate!.data.notify_email = this.gfd().notify_email.value;
      this.authCandidate.updateData(this.currentCandidate);
    }, (response) => {
      this.toastService.show(response.error.message, {
        classname: "bg-danger text-light",
        delay: 8000,
        autohide: true
      });
    });
  }

  photoUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formUpdatePhoto.patchValue({
          img: event.target.files[0]
        });
      };
    }
  }

  updatePhoto() {
    this.api.administrativeUpdateProfilePhoto(
      this.currentCandidate!.data.id,
      this.formUpdatePhoto.controls.img.value
    ).subscribe((response) => {
      let path: any = response;
      this.url = this.host + path.path.substring(15, path.path.length);
      this.currentCandidate!.data.pathPhoto = path.path;
      this.hideSaveChanges = true;
      this.currentCandidate!.data.pathPhoto = path.path;
      this.authCandidate.updateData(this.currentCandidate);
      this.formUpdatePhoto.controls['img'].setValue('');
      this.toastService.show('Your profile photo was changed', {
        classname: 'bg-success text-light',
        delay: 8000,
        autohide: true
      });
    }, (response) => {
      this.toastService.show('Error trying to update your profile photo ' + response.error.message, {
        classname: 'bd-danger text-light',
        delay: 5000,
        autohide: true
      });
    });
  }

  updatePassword() {
    this.api.updateCandidatePassword(
      this.currentCandidate!.data.id,
      this.formNewPassword.controls.newPassword.value
    ).subscribe(() => {
      this.toastService.show(
        'Your password was success changed', {
        classname: 'bg-success text-light',
        delay: 3000,
        autohide: true
      }
      );
      this.hideSaveChanges = true;
      this.formNewPassword.controls['newPassword'].setValue('');
    },
      (response) => {
        this.toastService.show(
          'Error trying to update your password ' + response.message, {
          classname: 'bg-danger text-light',
          delay: 3000,
          autohide: true
        }
        );
      });
  }

  gdip() { return this.formDiploma.controls; }

  saveDiploma() {
    let createNewDiploma = (typeof this.diplomaId === "undefined");
    if (createNewDiploma) {
      this.api.createNewDiploma(
        this.currentCandidate!.data.id,
        this.gdip().course.value,
        this.gdip().institution.value,
        this.gdip().initial_date.value,
        this.gdip().final_date.value
      ).subscribe(() => {
        window.location.reload();
      }, (response) => {
        this.toastService.show('Erro tryning to save this diploma ' + response.error.message, {
          classname: 'bg-danger txt-light',
          delay: 5000,
          autohide: true
        })
      });
    } else {
      this.api.updateDiploma(
        this.diplomaId!,
        this.gdip().course.value,
        this.gdip().institution.value,
        this.gdip().initial_date.value,
        this.gdip().final_date.value
      ).subscribe(()=>{
        window.location.reload();
      });
    }
  }

  deleteDiploma(diploma: Diploma) {
    this.api.deleteDiploma(diploma.id!).subscribe(()=>{
      window.location.reload();
      this.toastService.show("This diploma was successfully deleted", {
        classname: 'bg-success text-light',
        delay: 8000,
        autohide: true
      });
    },
    ()=>{
        this.toastService.show("Error trying to delete this diploma", {
          classname: 'bg-danger text-light',
          delay: 8000,
          autohide: true
        });
      }
    );
  }

  editDiploma(diploma: Diploma) {
    this.formDiploma.controls['course'].setValue(diploma.course);
    this.formDiploma.controls['institution'].setValue(diploma.institution);
    this.formDiploma.controls['initial_date'].setValue(diploma.initial_date);
    this.formDiploma.controls['final_date'].setValue(diploma.final_date);
    this.diplomaId = diploma.id;
    this.showDiplomasForm = true;
  }

  btnNewDiploma(){
    if(this.diplomas.length < 10){
      this.showDiplomasForm = !(this.showDiplomasForm);
    } else {
      this.showDiplomasForm = false;
      this.toastService.show('A candidate can only register up to 10 diplomas. Register your best diplomas.',{
        classname:"bg-warning",
        delay: 8000,
        autohide:true
      });
    }
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
    if (typeof exists === "undefined") {
      if(this.technologies.length < 10){
        this.technologies.push({ id: tech.id, name: tech.name });
      } else {
        this.toastService.show('The registration limit for the technologies you know has been reached. Enter only the ones you have experience.',{
          classname:"bg-warning",
          delay: 8000,
          autohide:true
        });
      }
    }
  }

  removeToTechnologies(tech: Technology) {
    let index = this.technologies.indexOf(tech);
    this.technologies.splice(index, 1);
  }

  saveTechnologiesThatCandidateKnows(){
    let technologiesId: any[] = [];
    this.technologies.forEach((element) =>{
      technologiesId.push({ technology_id: element.id })
    });
    this.api.saveTechnologiesThatCandidateKnows(
      this.currentCandidate!.data.id,
      technologiesId
    ).subscribe(()=>{
      this.toastService.show('Success in updating the list of technologies you know',{
        classname:"bg-success text-light",
        delay: 8000,
        autohide:true
      });
    },()=>{
      this.toastService.show('Error in updating the list of technologies you know',{
        classname:"bg-danger text-light",
        delay: 8000,
        autohide:true
      });
    });
  }

}
