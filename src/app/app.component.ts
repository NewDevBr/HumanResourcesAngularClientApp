import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Human Resources';
  constructor(private router: Router, public toastService: ToastService) { }
  
}
