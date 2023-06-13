import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LeaveRouteGuard implements CanDeactivate<any> {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      //if route is /game
      if (window.location.pathname.startsWith('/game')) {
        Swal.fire({
          title: 'Êtes-vous sûr de vouloir quitter la partie ?',
          text: 'Vous perdrez votre progression',
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
      }
    });
  }
}
