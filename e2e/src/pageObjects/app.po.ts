import {by, element} from 'protractor';
import {PageObject} from './page.object';

export class AppPage extends PageObject {

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getPageName(): string {
    return '';
  }
}
