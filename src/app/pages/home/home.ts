import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
  export class Home {
    title = 'Angul-It';

    constructor(private router: Router) {}

    startChallenge(): void {
      this.router.navigate(['/captcha']);
    }
  }
