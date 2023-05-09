import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  isInGame(path: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Quitter le quiz ?',
      html: 'Attention : vous êtes sur le point de quitter le quiz en cours. Voulez-vous vraiment continuer ?',
      showDenyButton: true,
      showCancelButton: false,
      width: 1700,
      padding: '4em',
      confirmButtonText:
        '<span id="oui" style="font-size: 50px; padding: 50px 50px; ">Oui</span>',
      denyButtonText:
        '<span id="non" style="font-size: 50px; padding: 50px 50px;">Non</span>', // add non-breaking spaces between span tags to create more space between buttons
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Quiz abandonné.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate([path]);
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Vous restez sur le quiz.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  navigateMain() {
    if (this.user.userType == 'admin') {
      this.router.navigate(['/admin']);
    } else {
      if (this.router.url.match(/^\/game\//)) {
        this.isInGame('/');
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  navigateProfile() {
    if (this.router.url.match(/^\/game\//)) {
      this.isInGame('/profile');
    } else {
      this.router.navigate(['/profile']);
    }
  }

  navigateSettings() {
    if (this.router.url.match(/^\/game\//)) {
      this.isInGame('/settings');
    } else {
      this.router.navigate(['/settings']);
    }
  }

  // navigateHelp() {
  //   this.router.navigate(['/help']);
  // }

  helpPopup() {
    console.log('aaa');
    Swal.fire({
      html: `
        <div>
          <h1 class="text-4xl text-[#2B3467] font-bold mb-4">Aide</h1>
          <hr class="h-px mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

          <div class="mb-8">
            <h2 class="text-3xl text-[#2B3467] font-semibold mb-2">Comment modifier les paramètres ?</h2>
            <p class="text-[#2B3467] text-xl">
              Accédez à la page des paramètres en cliquant sur l'icône d'engrenage dans la barre de navigation. Vous pouvez personnaliser les options de clic de la souris, l'action du microphone, la confirmation avant de valider, et les clics avec la barre d'espace.
            </p>
          </div>

          <div class="mb-8">
            <h2 class="text-3xl text-[#2B3467] font-semibold mb-2">Comment suivre mes progrès ?</h2>
            <p class="text-[#2B3467] text-xl">
              Votre profil affiche votre score et votre taux de réussite aux quiz. Vous pouvez accéder à votre profil en cliquant sur votre nom d'utilisateur dans la barre de navigation.
            </p>
          </div>

          <div class="mb-8">
            <h2 class="text-3xl text-[#2B3467] font-semibold mb-2">Les différents paramètres</h2>
            <h3 class="text-2xl text-[#2B3467] font-semibold mb-1">Options de clics de souris :</h3>
            <ul class="list-disc pl-6 text-[#2B3467] text-xl">
              <li>Double clique = Toute action impliquant un clic en nécessitera deux pour être prise en compte</li>
              <li>Pression longue = Toute action impliquant un clic nécessitera une pression de 0,8 secondes pour être prise en compte</li>
              <li>Aucun = Les clics se comportent normalement comme sur n'importe quel autre site web</li>
            </ul>

            <h3 class="text-2xl text-[#2B3467] font-semibold mb-1 mt-4">Action au microphone :</h3>
            <p class="text-[#2B3467] text-xl">
              Vous pouvez répondre aux questions des quiz à l'aide de votre voix (en n'oubliant pas d'activer le micro !). Pour cela, deux manières possibles : soit en prononçant le nom de la réponse, soit en répondant par 1, 2, 3 ou 4 selon le nombre de réponses proposées.
            </p>

            <h3 class="text-2xl text-[#2B3467] font-semibold mb-1 mt-4">Confirmation avant de valider :</h3>
            <p class="text-[#2B3467] text-xl">
              Chaque action sera précédée par une boîte de confirmation afin d'éviter toute réponse non voulue. Vous n'aurez qu'à cliquer sur "oui" pour effectuer l'action ou "non" pour ne rien faire.
            </p>

            <h3 class="text-2xl text-[#2B3467] font-semibold mb-1 mt-4">Clics avec barre espace :</h3>
            <p class="text-[#2B3467] text-xl">
              Les clics de souris se retrouvent désactivés au profit de la barre espace avec laquelle vous serez en mesure de cliquer à la manière du clic gauche de votre souris.
            </p>
          </div>
        </div>
      `,
      showCancelButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      cancelButtonText:
        '<span style="font-size: 60px; padding: 56px 54px;">Fermer</span>',
      width: 1700, // add this line to set the width of the SweetAlert
      customClass: { container: 'z-50', popup: 'z-50' }, // add z-index to the popup class
    });
  }
}
