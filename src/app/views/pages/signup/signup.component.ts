import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    public toastService: ToastService
  ) { }

  imageSource?: string;

  form = new FormGroup({
    img: new FormControl('', [Validators.required]),
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
    password: new FormControl('', [
      Validators.required,
      Validators.min(10)
    ]),
    github: new FormControl('', [
      Validators.required,
      Validators.maxLength(45),
      Validators.maxLength(200)
    ]),
    linkedin: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
  });

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSource = reader.result as string;
        this.form.patchValue({
          img: event.target.files[0]
        });
      };
    }
  }

  submit() {
    this.api.signup(this.form.value).subscribe(
      (response) => {
        this.toastService.show('Candidate user was registered with success', {
          classname: 'bg-success text-light',
          delay: 3000,
          autohide: true
        });
      },
      (error)=>{
        this.toastService.show('Candidate can\'t registered with success', {
          classname: 'bg-danger text-light',
          delay: 3000,
          autohide: true
        });
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

}
