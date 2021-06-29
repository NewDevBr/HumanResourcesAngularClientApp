import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiService } from 'src/app/services/api/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-candidates',
  templateUrl: './admin-candidates.component.html',
  styleUrls: ['./admin-candidates.component.css']
})
export class AdminCandidatesComponent implements OnInit {

  candidatesData?: any;

  formCandidate = new FormGroup({
    parameter: new FormControl('code', [
      Validators.required
    ]),
    parameterValue: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(45)
    ])
  });

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
  }

  searchCandidate() {
    if (
      this.formCandidate.controls.parameter.value === "vacancycode" &&
      !(
        this.formCandidate.controls.parameterValue.value === "undefined" ||
        this.formCandidate.controls.parameterValue.value == ""
      )
    ) {
      this.api.getCandidateByVacancyId(this.formCandidate.controls.parameterValue.value).subscribe(
        (response) => {
          console.log("By vacancy");
          this.candidatesData = response;
        }, (response) => {
          this.toast.show('Error trying to get this vacancy candidates ' + response.error.message, {
            classname: 'bg-danger text-light',
            delay: 10000,
            autohide: true
          });
        }
      );
    } else {
      if (!(
        this.formCandidate.controls.parameterValue.value === "undefined" ||
        this.formCandidate.controls.parameterValue.value == ""
      )) {
        this.api.getCandidateById(this.formCandidate.controls.parameterValue.value).subscribe((response) => {
          console.log("By id");
          this.candidatesData = response;
        }, (response) => {
          this.toast.show('Error trying to get this candidates ' + response.error.message, {
            classname: 'bg-danger text-light',
            delay: 10000,
            autohide: true
          });
        });
      }
    }
  }

  seeCandidate(id: number) {
    this.formCandidate.controls['parameterValue'].setValue(id);
    this.formCandidate.controls['parameter'].setValue("code");
    this.searchCandidate();
  }

  public getSantizeUrl(path: string) {
    const host: string = "http://localhost:8000/storage/photos/";
    return this.sanitizer.bypassSecurityTrustUrl(host + path.substring(15, path.length));
  }

}
