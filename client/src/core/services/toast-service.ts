import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(){
    this.createToastContainer();
  }

  private createToastContainer(){
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end z-50'
      document.body.appendChild(container)
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 5000){
    const tostContainer = document.getElementById('toast-container');
    if (!tostContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
      tostContainer.removeChild(toast);
    })

    tostContainer.append(toast);

    setTimeout(() => {
      if (tostContainer.contains(toast))
        tostContainer.removeChild(toast);
    }, duration);
  }

  succcess(message: string, duration?:number){
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?:number){
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?:number){
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?:number){
    this.createToastElement(message, 'alert-info', duration);
  }
}
