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
  TECH_ROUTE: string = this.SERVER_ADDR + "/technology";
  VACANCY_ROUTE: string = this.SERVER_ADDR + "/vacancy";

  signup(parameters: any) {
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



  administrativeSaveAdmin(
    img: any,
    name: string,
    post: string,
    email: string,
    password : string,
    admin_id : number
  ){
    var formData: any = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("post", post);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("created_by_admin", admin_id);
    return this.http.post(this.ADMIN_ROUTE, formData, { observe: 'response' });
  }

  administrativeRevokePrivilegies(adminId: number){
    return this.http.delete(this.ADMIN_ROUTE + '/' + adminId);
  }

  administrativeGetAdmins(page: number) {
    return this.http.get(this.ADMIN_ROUTE + "?page=" + page);
  }

  administrativeLogin(email: string, password: string) {
    return this.http.post<any>(this.ADMIN_ROUTE + '/login',
      { email: email, password: password }
    );
  }

  administrativeLogout() {
    return this.http.post<any>(this.ADMIN_ROUTE + '/revokeToken', {}).subscribe();
  }

  candidateLogin(email: string, password: string) {
    return this.http.post<any>(this.CANDIDATE_ROUTE + '/login',
      { email: email, password: password }
    );
  }

  candidateLogout() {
    return this.http.post<any>(this.CANDIDATE_ROUTE + '/revokeToken', {}).subscribe();
  }

  updateAdminData(id: number, name: string, post: string, email: string) {
    return this.http.put<any>(this.ADMIN_ROUTE + "/" + id, {
      name: name,
      post: post,
      email: email
    });
  }

  updateAdminPassword(id: number, password: string) {
    return this.http.put(this.ADMIN_ROUTE + "/changePassword/" + id, {
      password: password
    })
  }

  deleteAdmin(id: number) {
    return this.http.delete(this.ADMIN_ROUTE + '/' + id);
  }

  createTechnology(name: string) {
    return this.http.post(this.TECH_ROUTE, {
      name: name
    });
  }

  getTechnologies(page?: number) {
    return this.http.get(this.TECH_ROUTE + "?page=" + page);
  }

  getTechnologiesSearchResult(searchedValue: string) {
    return this.http.get(this.TECH_ROUTE + '/like/' + searchedValue);
  }

  editTechonology(id: number, description: string) {
    return this.http.put(this.TECH_ROUTE + '/' + id, { name: description });
  }

  deleteTechnology(id: number) {
    return this.http.delete(this.TECH_ROUTE + '/' + id);
  }

  createVacancy(
    title: string,
    description: string,
    remote: number,
    hiring: string,
    admin_id: number,
    technologies: any
  ) {
    return this.http.post(this.VACANCY_ROUTE, {
      title: title,
      description: description,
      remote: remote,
      hiring: hiring,
      admin_id: admin_id,
      technologies: technologies
    });
  }


  getAVacancy(idVacancy: number) {
    return this.http.get(this.VACANCY_ROUTE + '/' + idVacancy);
  }

  getVacanciesList(page?: number) {
    return this.http.get(this.VACANCY_ROUTE + "?page=" + page);
  }

  updateVacancy(
    idVacancy: number,
    title: string,
    description: string,
    remote: number,
    hiring: string,
    admin_id: number,
    technologies: any) {
    return this.http.put(this.VACANCY_ROUTE + '/' + idVacancy, {
      title: title,
      description: description,
      remote: remote,
      hiring: hiring,
      admin_id: admin_id,
      technologies: technologies
    });
  }

  deleteVacancy(vacancyId: number) {
    return this.http.delete(this.VACANCY_ROUTE + '/' + vacancyId);
  }
}
