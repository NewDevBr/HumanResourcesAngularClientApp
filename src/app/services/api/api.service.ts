import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  SERVER_ADDR: string = "http://localhost:8000/api";
  CANDIDATE_ROUTE: string = this.SERVER_ADDR + "/candidate";
  ADMIN_ROUTE: string = this.SERVER_ADDR + "/admin";

  signup(parameters : any){
    var formData: any = new FormData();
    formData.append("img", parameters.img);
    formData.append("name", parameters.name);
    formData.append("titration", parameters.titration);
    formData.append("birthDate", parameters.birthDate);
    formData.append("email", parameters.email);
    formData.append("password", parameters.password);
    formData.append("github", parameters.github);
    formData.append("linkedin", parameters.linkedin);
    formData.append("notify_email", parameters.notify_email ? true : false);
    return this.http.post(this.CANDIDATE_ROUTE, formData, { observe: 'response' });
  }

  administrativeLogin(email: string, password: string){
    return this.http.post<any>(this.ADMIN_ROUTE +'/login',
      { email: email, password: password }
    );
  }

  administrativeLogout(){
    return this.http.post<any>(this.ADMIN_ROUTE +'/revokeToken', {}).subscribe();
  }

  candidateLogin(email: string, password: string){
    return this.http.post<any>(this.CANDIDATE_ROUTE +'/login',
      { email: email, password: password }
    );
  }

  candidateLogout(){
    return this.http.post<any>(this.CANDIDATE_ROUTE +'/revokeToken', {}).subscribe();
  }
}
