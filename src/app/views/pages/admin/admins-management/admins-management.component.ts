import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthAdminService } from 'src/app/services/authAdminService/auth-admin.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admins-management',
  templateUrl: './admins-management.component.html',
  styleUrls: ['./admins-management.component.css']
})
export class AdminsManagementComponent implements OnInit {

  admin_id?: number;
  currentPage: number;
  lastPage?: number;
  imageSource?: string;
  data? : any;

  newAdminForm = new FormGroup({
    img: new FormControl('',[
      Validators.required
    ]
    ),
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    post: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(45)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.maxLength(45)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(45)
    ])
  });
  
  constructor(
    private api : ApiService,
    private authAdmin : AuthAdminService,
    private toastService : ToastService
  ) {
    this.currentPage = 1;
    this.authAdmin.currentAdmin.subscribe(val => {
      // this.url = "http://localhost:8000/storage/photos/" + val.data.pathPhoto.substring(15, val.data.pathPhoto.length);
      this.admin_id = val.data.id;
    });
    this.api.administrativeGetAdmins(this.currentPage).subscribe(
      (response)=>{
        this.data = response;
        this.lastPage = this.data.meta.last_page;
        this.data = this.data.data;
      }
    )
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSource = reader.result as string;
        this.newAdminForm.patchValue({
          img: event.target.files[0]
        });
      };
    }
  }

  nextPage() {
    this.currentPage++;
    this.data = undefined;
    this.api.administrativeGetAdmins(this.currentPage).subscribe((response) => {
      this.data = response;
      this.data = this.data.data;
    },
    () => {
      this.toastService.show('Error trying to load ' + this.currentPage + " page", {
        classname: "bg-dager text-light",
        delay: 5000,
        autohide: true
      });
    });
  }

  previousPage() {
    this.currentPage--;
    this.data = undefined;
    this.api.administrativeGetAdmins(this.currentPage).subscribe((response) => {
      this.data = response;
      this.data = this.data.data;
    },
    () => {
      this.toastService.show('Error trying to load ' + this.currentPage + " page", {
        classname: "bg-dager text-light",
        delay: 5000,
        autohide: true
      });
    });
  }

  gf(){ return this.newAdminForm.controls };

  revokePrivilegies(id : number){
    this.api.administrativeRevokePrivilegies(id).subscribe(()=>{
      this.toastService.show('Privilege successfully revoked',{
        classname: 'bg-success text-light',
        delay: 8000,
        autohide: true
      });
      window.location.reload();
    }, ()=>{
      this.toastService.show('Error trying to revoke this privilege', )
    });
  }

  saveNewAdmin(){
    console.log(this.newAdminForm.value);
    this.api.administrativeSaveAdmin(
      this.gf().img.value,
      this.gf().name.value,
      this.gf().post.value,
      this.gf().email.value,
      this.gf().password.value,
      this.admin_id!
    ).subscribe(()=>{
      this.toastService.show('Admin successfully stored', {
        classname: 'bg-success text-light',
        delay: 7500,
        autohide: true
      });
      window.location.reload();
    },
    (response)=>{
      this.toastService.show('Error trying to store this admin '+ response.error.message,{
        classname: 'bg-danger text-light',
        delay: 8000,
        autohide: true
      })
    });
  }

  ngOnInit(): void {
  }

}
