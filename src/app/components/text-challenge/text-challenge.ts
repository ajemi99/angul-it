import { Component, input, output } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-text-challenge',
 imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './text-challenge.html',
  styleUrl: './text-challenge.css'
})
export class TextChallenge {

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