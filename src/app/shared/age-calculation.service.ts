import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeCalculationService {

  constructor() { }

  calculateAge(dob: Date): { years: number, months: number, days: number } {
    const today = new Date();
    const birthDate = new Date(dob);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust months and years if necessary
    if (days < 0) {
      months--;
      days += this.daysInMonth(today.getMonth() - 1, today.getFullYear());
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  private daysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

}
