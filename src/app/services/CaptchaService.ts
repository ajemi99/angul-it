import { Injectable } from '@angular/core';
import { Challenge } from '../models/challenge';
import { CHALLENGES } from '../data/challenges';
import { Progress } from '../models/progress';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private readonly STORAGE_KEY = 'angul-it-progress';

  private challenges: Challenge[] = CHALLENGES;

  private currentIndex = 0;

  private score = 0;

  private completed = false;

  constructor() {

    this.loadProgress();

  }

  getChallenges(): Challenge[] {
    return this.challenges;
  }

  getCurrentChallenge(): Challenge {
    return this.challenges[this.currentIndex];
  }

  nextChallenge(): void {

    if (this.currentIndex < this.challenges.length - 1) {

      this.currentIndex++;

    } else {

      this.completed = true;

    }
    this.saveProgress();

  }

  isCompleted(): boolean {
    return this.completed;
  }

  getScore(): number {
    return this.score;
  }

  increaseScore(): void {
    this.score++;
    this.saveProgress();
    
  }

  restart(): void {

    this.currentIndex = 0;

    this.score = 0;

    this.completed = false;

    this.saveProgress();


  }
  saveProgress(): void {

  const progress: Progress = {

      currentIndex: this.currentIndex,

      score: this.score,

      completed: this.completed

    };

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(progress)
    );

  }

  loadProgress(): void {

  const data = localStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return;
    }

    const progress: Progress = JSON.parse(data);

    this.currentIndex = progress.currentIndex;

    this.score = progress.score;

    this.completed = progress.completed;

  }

  hasNextChallenge(): boolean {
    return this.currentIndex < this.challenges.length - 1;
  }
  hasPreviousChallenge(): boolean {
    return this.currentIndex > 0;
  }

  previousChallenge(): void {

    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    this.saveProgress();

  }

  checkAnswer(userAnswer: string | string[]): boolean {

    const currentChallenge = this.getCurrentChallenge();

  if (Array.isArray(currentChallenge.answer)) {

    if (!Array.isArray(userAnswer)) {
      return false;
    }

    const expected = [...currentChallenge.answer].sort();

    const received = [...userAnswer].sort();

    return JSON.stringify(expected) ===
          JSON.stringify(received);

  }

    return String(userAnswer).trim().toUpperCase() ===
          currentChallenge.answer.trim().toUpperCase();

  }
}
