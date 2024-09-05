import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  customSettings = {
    timeOut: 3000, // Custom timeout for this toast
    closeButton: true, // Show close button
    progressBar:true
  }

  constructor(private toastr: ToastrService) { }

  success(message: string, title?: string): void {
    this.toastr.success(message, title,this.customSettings);
  }

  error(message: string, title?: string): void {
    this.toastr.error(message, title,this.customSettings);
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title,this.customSettings);
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title,this.customSettings);
  }

}
