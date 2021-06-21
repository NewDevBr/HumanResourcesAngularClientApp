import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Admin } from 'src/app/models/Admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  
  hideDeleteAlert : boolean = true;
  hideSaveChanges: boolean = true;
  url: string;
  currentUser?: Admin;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    post: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(45)
    ]),
  });

  formNewPassword = new FormGroup({
    newPassword: new FormControl('', [
      Validators.min(10),
      Validators.required
    ])
  });

  constructor(
    private authAdmin: AuthAdminService,
    private sanitizer: DomSanitizer,
    private toastService: ToastService,
    private api: ApiService,
    private router: Router
  ) {
    this.url = "";
    this.authAdmin.currentAdmin.subscribe(val => {
      this.url = "http://localhost:8000/storage/photos/" + val.data.pathPhoto.substring(15, val.data.pathPhoto.length);
      this.currentUser = val;
    });
    this.form.controls['name'].setValue(this.currentUser!.data.name);
    this.form.controls['post'].setValue(this.currentUser!.data.post);
    this.form.controls['email'].setValue(this.currentUser!.data.email);
  }

  showSaveChanges() {
    this.hideSaveChanges = !(this.hideSaveChanges);
  }

  get formProfileData() { return this.form.controls; }
  get formNewPasswordData() { return this.formNewPassword.controls; }

  updateProfile() {
    this.api.updateAdminData(
      this.currentUser!.data.id,
      this.formProfileData.name.value,
      this.formProfileData.post.value,
      this.formProfileData.email.value
    ).subscribe(
      () => {
        this.toastService.show(
          'Changes to your profile data were made successfully',
          {
            classname: 'bg-success text-light',
            delay: 3000,
            autohide: true
          }
        );
        this.hideSaveChanges = true;
        this.currentUser!.data.name = this.formProfileData.name.value;
        this.currentUser!.data.post = this.formProfileData.post.value;
        this.currentUser!.data.email = this.formProfileData.email.value;
        this.authAdmin.updateData(this.currentUser);
      },
      (response) => {
        this.toastService.show(
          'Error trying to change your profile data, becuse ' + response.message,
          {
            classname: 'bg-danger text-light',
            delay: 3000,
            autohide: true
          }
        );
      }
    );
  }


  updatePassword() {
    this.api.updateAdminPassword(
      this.currentUser!.data.id,
      this.formNewPasswordData.newPassword.value)
    .subscribe(()=>{
      this.formNewPasswordData['newPassword'].setValue('');
      this.hideSaveChanges = true;
      this.toastService.show(
        'Your password was success changed',
        {
          classname: 'bg-success text-light',
          delay: 3000,
          autohide: true
        }
      );
    },
    (response)=>{
      this.toastService.show(
        'Error trying to update your password ' + response.message,
        {
          classname: 'bg-danger text-light',
          delay: 3000,
          autohide: true
        }
      );
    }
    );
  }

  deleteAccount(){
    this.api.deleteAdmin(this.currentUser!.data.id).subscribe(
      ()=>{
        this.toastService.show('Your account has been deleted',{
          classname: 'bg danger text-light',
          delay: 5000,
          autohide: true
        });
        this.authAdmin.logout();
        this.router.navigate(['login']);
      }
    )
  }

  public getSantizeUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }

  ngOnInit(): void {
  }

  showDeleteAlert(){
    this.hideDeleteAlert = !(this.hideDeleteAlert);
  }

}
