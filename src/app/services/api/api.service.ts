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
  DIPLOMA_ROUTE: string = this.SERVER_ADDR + "/diploma";

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
    formData.append("notify_email", parameters.notify_email ? 1 : 0);
    return this.http.post(this.CANDIDATE_ROUTE, formData, { observe: 'response' });
  }

  administrativeUpdateProfilePhoto(idAdmin: number, img: any) {
    var formData: any = new FormData();
    formData.append("img", img);
    return this.http.post(this.ADMIN_ROUTE + '/photo/' + idAdmin, formData);
  }

  administrativeSaveAdmin(
    img: any,
    name: string,
    post: string,
    email: string,
    password: string,
    admin_id: number
  ) {
    var formData: any = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("post", post);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("created_by_admin", admin_id);
    return this.http.post(this.ADMIN_ROUTE, formData, { observe: 'response' });
  }

  administrativeRevokePrivilegies(adminId: number) {
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

  updateCandidateData(
    idCandidate: number,
    name: string,
    titration: string,
    birthDate: Date,
    email: string,
    github: string,
    linkedin: string,
    notify_email: number
  ) {
    return this.http.put(this.CANDIDATE_ROUTE + '/' + idCandidate, {
      name: name,
      titration: titration,
      birthDate: birthDate,
      email: email,
      github: github,
      linkedin: linkedin,
      notify_email: notify_email
    });
  }

  updateCandidatePassword(idCandidate: number, password: string) {
    return this.http.put(this.CANDIDATE_ROUTE + '/changePassword/' + idCandidate, {
      password: password
    });
  }

  candidateUpdateProfilePhoto(idCandidate: number, img: any) {
    var formData: any = new FormData();
    formData.append("img", img);
    return this.http.post(this.ADMIN_ROUTE + '/photo/' + idCandidate, formData);
  }

  createNewDiploma(
    idCandidate: number,
    course: string,
    institution: string,
    initial_date: Date,
    final_date: Date
  ) {
    return this.http.post(this.DIPLOMA_ROUTE + '/candidate/' + idCandidate, {
      course: course,
      institution: institution,
      initial_date: initial_date,
      final_date: final_date
    });
  }

  deleteDiploma(diplomaId: number) {
    return this.http.delete(this.DIPLOMA_ROUTE + '/' + diplomaId);
  }

  getDiplomasByCandidateId(idCandidate: number) {
    return this.http.get(this.DIPLOMA_ROUTE + '/candidate/' + idCandidate);
  }

  updateDiploma(
    diplomaId: number,
    course: string,
    institution: string,
    initial_date: Date,
    final_date: Date
  ) {
    return this.http.put(this.DIPLOMA_ROUTE + '/' + diplomaId, {
      course: course,
      institution: institution,
      initial_date: initial_date,
      final_date: final_date
    });
  }

  saveTechnologiesThatCandidateKnows(candidateId: number, technologies: any) {
    return this.http.post(this.CANDIDATE_ROUTE + '/TechnologiesThatCandidateKnows/' + candidateId, {
      technologies: technologies
    });
  }

  getTechnologiesThatCandidateKnows(candidateId: number) {
    return this.http.get(this.TECH_ROUTE + '/candidate/' + candidateId);
  }

  applyVacancy(candidateId: number, vacancyId: number) {
    return this.http.post(this.VACANCY_ROUTE + '/apply', {
      candidate_id: candidateId,
      vacancy_id: vacancyId
    });
  }

  getAppliedVacancies(candidateId: number) {
    return this.http.get(this.VACANCY_ROUTE + "/applied/" + candidateId);
  }

  getapplicableVacancies(candidateId: number) {
    return this.http.get(this.VACANCY_ROUTE + '/applicable/+' + candidateId);
  }

  getCandidateById(idCandidate: number){
    return this.http.get(this.CANDIDATE_ROUTE + '/'+ idCandidate);
  }

  getCandidateByVacancyId(vacancyId: number){
    return this.http.get(this.CANDIDATE_ROUTE + '/vacancy/'+ vacancyId);
  }

}
