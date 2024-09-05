import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  apiKey = 'c6720ef0adc24d01ac852230777a0d89';
  ivKey = '831adb4d53e04f3c97b982429b121d99';
  constructor() { }

  encrypt(data: string): string {
    const key = CryptoJS.enc.Base64.parse(this.apiKey);
    const iv = CryptoJS.enc.Base64.parse(this.ivKey);
    const encrypted = CryptoJS.AES.encrypt(data, key, 
      {
         iv: iv
      }).toString();
    return encrypted;
  }

  decrypt(value: string): string {
    const key = CryptoJS.enc.Base64.parse(this.apiKey);
    const iv = CryptoJS.enc.Base64.parse(this.ivKey);
    const decrypt = CryptoJS.AES.decrypt(value, key, { iv: iv });
    return decrypt.toString(CryptoJS.enc.Utf8);
}
}
