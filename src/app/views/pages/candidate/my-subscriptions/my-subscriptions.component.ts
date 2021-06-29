import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthCandidateService } from 'src/app/services/authCandidateService/auth-candidate.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit {

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
    this.api.getAppliedVacancies(this.idCandidate!).subscribe((response)=>{
      this.data = response;
      console.log(response);
    });
  }

  ngOnInit(): void {
  }

  generateShowVars(lenght: number) {
    for (let i = 0; i < lenght; i++) {
      this.showMore.push(false);
    }
  }


}
