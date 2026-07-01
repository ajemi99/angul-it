import { Component, input, output } from '@angular/core';

import { Challenge } from '../../models/challenge';
import { CaptchaService } from '../../services/CaptchaService';

@Component({
  selector: 'app-image-challenge',
  imports: [],
  templateUrl: './image-challenge.html',
  styleUrl: './image-challenge.css'
})
export class ImageChallenge {

  challenge = input.required<Challenge>();

  verified = output<boolean>();

  selectedImages: string[] = [];

  constructor(private captchaService: CaptchaService) {}

  toggleSelection(id: number): void {

    const value = id.toString();

    if (this.selectedImages.includes(value)) {

      this.selectedImages =
        this.selectedImages.filter(image => image !== value);

    } else {

      this.selectedImages.push(value);

    }

  }

  isSelected(id: number): boolean {

    return this.selectedImages.includes(id.toString());

  }

  verifyAnswer(): void {

    const isCorrect =
      this.captchaService.checkAnswer(this.selectedImages);

      this.verified.emit(isCorrect);

  }
}
