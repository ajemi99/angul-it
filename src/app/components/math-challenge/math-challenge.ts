import { Component, input } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';
import { output } from '@angular/core';

@Component({
  selector: 'app-math-challenge',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './math-challenge.html',
  styleUrl: './math-challenge.css'
})
export class MathChallenge {

  challenge = input.required<Challenge>();
  verified = output<boolean>();

  answer = new FormControl('', [
    Validators.required
  ]);
  constructor(private captchaService: CaptchaService) {}
  verifyAnswer(): void {

  if (this.answer.invalid) {

      this.answer.markAsTouched();

      return;

    }

    const isCorrect = this.captchaService.checkAnswer(
      this.answer.value ?? ''
    );

    this.verified.emit(isCorrect);

  }
}