import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';

// 👈 جبنا الموديلات ديال Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-math-challenge',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, // 👈 ضروري نزيدوهم هنا
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './math-challenge.html',
  styleUrl: './math-challenge.css'
})
export class MathChallenge {
  challenge = input.required<Challenge>();
  verified = output<boolean>();

  answer = new FormControl('', [Validators.required]);

  constructor(private captchaService: CaptchaService) {}

  verifyAnswer(): void {
    if (this.answer.invalid) {
      this.answer.markAsTouched();
      return;
    }

    const isCorrect = this.captchaService.checkAnswer(this.answer.value ?? '');
    this.verified.emit(isCorrect);
  }
}