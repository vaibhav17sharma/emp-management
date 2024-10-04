import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function formatDate(date: Date, type: "date" | "time" = "date", variant : "short" | "long" = "long") {
  if (type === "date") {
    if(variant === "short") {
      const options: Intl.DateTimeFormatOptions = {
          month: 'short',
          day: 'numeric',
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    } else {
      const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
  } else {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}

export function generateTempPassword(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";
  let tempPassword = "";
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      tempPassword += charset[randomIndex];
  }
  return tempPassword;
}
