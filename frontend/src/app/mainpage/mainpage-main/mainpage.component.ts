import { Component, ViewChild, ElementRef } from '@angular/core';
import { OptionsScreenComponent } from 'src/app/settings/options-screen.component';
import { MesResultatsComponent } from 'src/app/mesResultats/mes-resultat.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/models/user.model';
import Swal from 'sweetalert2';
import { QuizListComponent } from 'src/app/quiz/quizlist/quizlist.component';
@Component({
  selector: 'app-main',
  templateUrl: './mainpage.component.html',
})
export class MainPage {
  user: User;
  currentTab = 'QUIZ';
  @ViewChild('resultBtn') resultBtn: ElementRef;

  ngAfterViewInit() {
    this.loadTabComponent('QUIZ');
  }

  components = {
    QUIZ: QuizListComponent,
    RESULTAT: MesResultatsComponent,
    PARAMETRES: OptionsScreenComponent,
  };

  constructor(public router: Router, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get selectedComponent() {
    return this.components[this.currentTab] || QuizListComponent;
  }

  loadTabComponent(tab: string) {
    this.currentTab = tab;
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach((button: any) => {
      button.style.backgroundColor = '#BAD7E9';
      button.style.color = '#2B3467';
    });
    // set the background and text color of the selected button
    const selectedButton = document.querySelector(
      `[data-tab=${tab}]`
    ) as HTMLElement;
    if (selectedButton) {
      selectedButton.style.backgroundColor = '#2B3467';
    }
  }

  navigateProfile() {
    this.router.navigate(['/profile']);
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
      width: 1700,
    });
  }
}
