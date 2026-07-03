import { Injectable } from '@angular/core';
import { Challenge } from '../models/challenge';
import { CHALLENGES } from '../data/challenges';
import { Progress } from '../models/progress';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private readonly STORAGE_KEY = 'angul-it-progress';
  
  // 👈 الكلمة السرية ديالك للتشفير (خبيها هنا والهكر ماغاديش يشوفها)
  private readonly SECRET_KEY = 'angul-it-secure-key-2026';

  private challenges: Challenge[] = CHALLENGES;
  private currentIndex = 0;
  private score = 0;
  private completed = false;

  constructor() {
    this.loadProgress();

    // 🚨 حماية من التلاعب المباشر (Real-time):
    // إيلا شي حد حل F12 وبدل localStorage وهو خدام، غنرجعو ليه القيمة الصحيحة
    window.addEventListener('storage', (event) => {
      if (event.key === this.STORAGE_KEY) {
        console.warn("Hacking attempt detected! Restoring real data...");
        this.saveProgress();
      }
    });
  }

  // 👈 خوارزمية التشفير (كتصاوب توقيع رقمي من الأرقام والكلمة السرية)
  private generateSignature(index: number, score: number, completed: boolean): string {
    const dataString = `${index}-${score}-${completed}-${this.SECRET_KEY}`;
    let hash = 5381;
    for (let i = 0; i < dataString.length; i++) {
      hash = (hash * 33) ^ dataString.charCodeAt(i);
    }
    return hash.toString(16);
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
    // 1. كنحسبو التوقيع قبل ما نسجلو
    const signature = this.generateSignature(this.currentIndex, this.score, this.completed);

    const progress: Progress = {
      currentIndex: this.currentIndex,
      score: this.score,
      completed: this.completed,
      signature: signature // 2. كنزيدو التوقيع للـ JSON
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

    try {
      const progress: Progress = JSON.parse(data);

      // 🚨 كنتأكدو من التوقيع لي كاين فـ localStorage واش أصلي
      const expectedSignature = this.generateSignature(
        progress.currentIndex,
        progress.score,
        progress.completed
      );

      // واش التوقيع لي حسبنا دابا كيطابق التوقيع لي مسجل؟
      if (progress.signature === expectedSignature) {
        this.currentIndex = progress.currentIndex;
        this.score = progress.score;
        this.completed = progress.completed;
      } else {
        // إيلا التوقيع غالط (يعني شي حد بدل السكور بـ يدو)
        console.error("Security Alert: Data tampered! Invalid signature.");
        this.restart(); // رجعو للزيرو
      }
    } catch (error) {
      this.restart();
    }
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
      if (this.score > 0) {
        this.score--;
      }
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
      return JSON.stringify(expected) === JSON.stringify(received);
    }

    return String(userAnswer).trim().toUpperCase() ===
           currentChallenge.answer.trim().toUpperCase();
  }
}