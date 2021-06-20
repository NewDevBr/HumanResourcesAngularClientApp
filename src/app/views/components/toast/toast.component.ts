import { Component, TemplateRef, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {
  
  constructor(public toastService: ToastService) {}

  isTemplate(toast : any) { return toast.textOrTpl instanceof TemplateRef; }
}