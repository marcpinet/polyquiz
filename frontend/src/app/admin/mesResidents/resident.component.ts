import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-residents',
  templateUrl: './resident.component.html',
})
export class ResidentComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  navigateAddResident() {
    this.router.navigate(['/admin/add-resident']);
  }
}
