import {browser} from 'protractor';

export abstract class PageObject {
  abstract getPageName(): string;

  navigateTo(postfix?: string) {
    return browser.get(browser.baseUrl + this.getPageName() + postfix) as Promise<any>;
  }
}
