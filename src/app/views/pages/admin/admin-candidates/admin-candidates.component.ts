import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-admin-candidates',
  templateUrl: './admin-candidates.component.html',
  styleUrls: ['./admin-candidates.component.css']
})
export class AdminCandidatesComponent implements OnInit {


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

  constructor() { }

  ngOnInit(): void {
  }

  searchCandidate(){
    console.log("parameter:   " + this.formCandidate.controls.parameter.value);
    console.log("value:   " + this.formCandidate.controls.parameterValue.value);
  }

}
