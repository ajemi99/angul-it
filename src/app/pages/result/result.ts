import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from '../../services/CaptchaService';

// 👈 Imports د Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-result',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  captchaService = inject(CaptchaService);
  router = inject(Router);

  score: number = 0;
  totalChallenges: number = 0;

  ngOnInit(): void {
    this.score = this.captchaService.getScore();
    this.totalChallenges = this.captchaService.getChallenges().length;
  }

  restartChallenge(): void {
    this.captchaService.restart();
    this.router.navigate(['/captcha']);
  }
  
  goToHome(): void {
    this.router.navigate(['/']);
  }
}