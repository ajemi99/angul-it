import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CaptchaService } from '../services/CaptchaService';

export const resultGuard: CanActivateFn = () => {
  const captchaService = inject(CaptchaService);
  const router = inject(Router);

  if (captchaService.isCompleted()) {
    return true; // خليه يدخل
  } else {
    router.navigate(['/captcha']); // رجعو للـ Captcha
    return false; // ممنوع الدخول
  }
};