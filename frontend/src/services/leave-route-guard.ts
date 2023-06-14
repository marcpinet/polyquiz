import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LeaveRouteGuard implements CanDeactivate<any> {
  private guardActive = true;

  disableGuard() {
    this.guardActive = false;
  }

  enableGuard() {
    this.guardActive = true;
  }

  canDeactivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!this.guardActive) {
        observer.next(true); // Allow navigation
        observer.complete();
      } else {
        if (window.location.pathname.startsWith('/game')) {
          Swal.fire({
            title:
              '<div class="text-4xl font-bold text-[#2B3467]">Êtes-vous sûr de vouloir quitter la page ?</div><div class="text-3xl text-[#EB455F]">Vous perdrez votre progression</div>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            width: 1700,
            padding: '4em',
            confirmButtonText:
              '<span id="oui" style="font-size: 8vmin; padding: 50px 50px; ">Oui, quitter</span>',
            cancelButtonText:
              '<span id="non" style="font-size: 8vmin; padding: 50px 50px;">Non, rester</span>',
          }).then((result) => {
            if (result.isConfirmed) {
              observer.next(true); // Allow navigation
            } else {
              observer.next(false); // Prevent navigation
            }
            observer.complete();
          });
        } else {
          //other routes in admin
          Swal.fire({
            title: 'Êtes-vous sûr de vouloir quitter la page ?',
            text: 'Vous perdrez votre progression',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, quitter',
            cancelButtonText: 'Non, rester',
          }).then((result) => {
            if (result.isConfirmed) {
              observer.next(true); // Allow navigation
            } else {
              observer.next(false); // Prevent navigation
            }
            observer.complete();
          });
        }
      }
    });
  }
}
