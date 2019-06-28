import {browser} from 'protractor';

export abstract class PageObject {
  abstract getPageName(): string;

  navigateTo() {
    return browser.get(browser.baseUrl + '/' + this.getPageName()) as Promise<any>;
  }
}
