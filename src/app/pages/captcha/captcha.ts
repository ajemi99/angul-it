import { Component, OnInit } from '@angular/core';
import { MathChallenge } from '../../components/math-challenge/math-challenge';
import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';
import { Router } from '@angular/router';
import { TextChallenge } from '../../components/text-challenge/text-challenge';
import { ImageChallenge } from '../../components/image-challenge/image-challenge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-captcha',
  imports: [MathChallenge,TextChallenge,ImageChallenge,MatButtonModule,MatIconModule],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css',
})
export class Captcha implements OnInit {

  currentChallenge!: Challenge;
  showError: boolean = false;

  constructor(private captchaService: CaptchaService, private router: Router) {}

  ngOnInit(): void {
    if (this.captchaService.isCompleted()) {
      this.router.navigate(['/result']);
      return;
    }
    this.loadCurrentChallenge();
    //this.captchaService.restart();
  }

  loadCurrentChallenge(): void {
    this.currentChallenge = this.captchaService.getCurrentChallenge();
    this.showError = false
    //console.log(this.currentChallenge);
  }
  onAnswerVerified(isCorrect: boolean): void {

    if (!isCorrect) {
      this.showError = true;
      return;
    }

    this.captchaService.increaseScore();

    this.captchaService.nextChallenge();

    if (this.captchaService.isCompleted()) {
      this.router.navigate(['/result']);
    } else {
      this.loadCurrentChallenge();
    }

  }
  get hasPreviousChallenge(): boolean {
    return this.captchaService.hasPreviousChallenge();
  }
  goBack(): void {
    this.showError = false; // نحيدو الايرور فاش نرجعو
    this.captchaService.previousChallenge();
    this.loadCurrentChallenge();
  }
}