import { Component, OnInit } from '@angular/core';
import { MathChallenge } from '../../components/math-challenge/math-challenge';
import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';
import { TextChallenge } from '../../components/text-challenge/text-challenge';
import { ImageChallenge } from '../../components/image-challenge/image-challenge';

@Component({
  selector: 'app-captcha',
  imports: [MathChallenge,TextChallenge,ImageChallenge],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css',
})
export class Captcha implements OnInit {

  currentChallenge!: Challenge;

  constructor(private captchaService: CaptchaService) {}

  ngOnInit(): void {
    this.loadCurrentChallenge();
    this.captchaService.restart();
  }

  loadCurrentChallenge(): void {
    this.currentChallenge = this.captchaService.getCurrentChallenge();
    console.log(this.currentChallenge);
    
    
  }
  onAnswerVerified(isCorrect: boolean): void {

    if (!isCorrect) {
      return;
    }

    this.captchaService.increaseScore();

    this.captchaService.nextChallenge();

    this.loadCurrentChallenge();

  }

}