import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  imageSource?: string;

  form = new FormGroup({
    img: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    titration: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    notify_email: new FormControl(''),
  });

  ngOnInit(): void {
  }

  onFileChange(event : any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
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
    console.log(this.imageSource);
    console.log(this.form.value);
    this.http.post("http://localhost:8000/api/candidate", this.form.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  navigateToLogin(){
    this.router.navigate(['login']);
  }

}
