import {browser} from 'protractor';

export class LocalstorageHelper {
   static async setItem(key: string, value: string) {
     browser.executeScript(`window.localStorage.setItem('${key}', '${value}')`);
   }
   static async getItem(key: string) {
     return await browser.executeScript(`return window.localStorage.getItem('${key}')`);
   }
}
